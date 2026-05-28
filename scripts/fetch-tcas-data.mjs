#!/usr/bin/env node
// Snapshot TCAS Admission (Round 3) data from myTCAS.
// Outputs public/data/tcas-programs-{year}.json — used by the calculator at runtime.
// Cache lives in .tcas-cache/ (gitignored). Re-run is incremental thanks to cache.

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const API_BASE = 'https://my-tcas.s3.ap-southeast-1.amazonaws.com/mytcas'
const PREVIEW_BASE = 'https://tcas65.as.r.appspot.com'

const YEAR = 2569
const ROUND_3_TYPE = `3_${YEAR}`

const OUT_DIR = path.join(ROOT, 'public', 'data')
const OUT_FILE = path.join(OUT_DIR, `tcas-programs-${YEAR}.json`)
const CACHE_DIR = path.join(ROOT, '.tcas-cache')

const CONCURRENCY = 15
const MAX_RETRIES = 3

async function fetchJson(url, retries = MAX_RETRIES) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 TCAS-Snapshot' },
      })
      if (res.status === 403 || res.status === 404) {
        // Not retryable — programs without history return 403/404
        const err = new Error(`HTTP ${res.status}`)
        err.status = res.status
        throw err
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return await res.json()
    } catch (err) {
      if (err.status === 403 || err.status === 404) throw err
      if (attempt === retries) throw err
      await new Promise((r) => setTimeout(r, 300 * attempt))
    }
  }
}

async function readCacheOrFetch(cachePath, url) {
  try {
    return JSON.parse(await fs.readFile(cachePath, 'utf8'))
  } catch {
    const data = await fetchJson(url)
    await fs.writeFile(cachePath, JSON.stringify(data))
    return data
  }
}

async function pool(items, worker, concurrency, label = 'items') {
  const results = new Array(items.length)
  let idx = 0
  let done = 0
  let lastLogged = 0

  async function runOne() {
    while (idx < items.length) {
      const i = idx++
      try {
        results[i] = await worker(items[i], i)
      } catch (err) {
        results[i] = null
      }
      done++
      if (done - lastLogged >= 200 || done === items.length) {
        lastLogged = done
        process.stdout.write(`  ${label}: ${done}/${items.length}\n`)
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, runOne))
  return results
}

function pickProgramSummary(course) {
  return {
    program_id: course.program_id,
    university_id: course.university_id,
    university_name_th: course.university_name_th,
    university_name_en: course.university_name_en,
    campus_name_th: course.campus_name_th,
    faculty_name_th: course.faculty_name_th,
    field_name_th: course.field_name_th,
    program_name_th: course.program_name_th,
    program_name_en: course.program_name_en,
    program_type_name_th: course.program_type_name_th,
  }
}

async function main() {
  console.log(`TCAS ${YEAR} snapshot — Admission (Round 3) only`)
  console.log('=========================================')

  await fs.mkdir(OUT_DIR, { recursive: true })
  await fs.mkdir(CACHE_DIR, { recursive: true })

  console.log('\n[1/3] Courses list')
  const courses = await readCacheOrFetch(
    path.join(CACHE_DIR, 'courses.json'),
    `${API_BASE}/courses.json`,
  )
  console.log(`  ${courses.length} programs total`)

  console.log('\n[2/3] Program projects (filter Round 3)')
  const projectsResults = await pool(
    courses,
    async (course) => {
      const cache = path.join(CACHE_DIR, `pp_${course.program_id}.json`)
      let projects
      try {
        projects = await readCacheOrFetch(
          cache,
          `${PREVIEW_BASE}/program-projects/program-id/${course.program_id}`,
        )
      } catch {
        return null
      }
      if (!Array.isArray(projects)) return null
      const round3 = projects.find((p) => p.type === ROUND_3_TYPE)
      if (!round3) return null
      return { course, round3 }
    },
    CONCURRENCY,
    'projects',
  )

  const withRound3 = projectsResults.filter(Boolean)
  console.log(`  ${withRound3.length} programs offer Round 3`)

  console.log('\n[3/3] Historical scores (last year)')
  const programs = await pool(
    withRound3,
    async ({ course, round3 }) => {
      const cache = path.join(CACHE_DIR, `ly_${course.program_id}.json`)
      let historical = null
      try {
        historical = await readCacheOrFetch(
          cache,
          `${API_BASE}/ly-programs/${course.program_id}.json`,
        )
      } catch {
        historical = null
      }

      const lyAdmission = Array.isArray(historical)
        ? historical.find((h) => h.project_id === round3.project_id) ?? null
        : null

      return {
        ...pickProgramSummary(course),
        admission: {
          project_id: round3.project_id,
          project_name_th: round3.project_name_th ?? '',
          receive_student_number: round3.receive_student_number ?? null,
          min_total_score: round3.min_total_score ?? 0,
          scores: round3.scores ?? {},
          score_conditions: round3.score_conditions ?? {},
          interview_date: round3.interview_date ?? '',
          link: round3.link ?? '',
        },
        historical: lyAdmission
          ? {
              min_score: lyAdmission.min_score ?? null,
              max_score: lyAdmission.max_score ?? null,
              est_min_score_mean: lyAdmission.est_min_score_mean ?? null,
              est_min_score_regression:
                lyAdmission.est_min_score_regression ?? null,
              receive_student_number:
                lyAdmission.receive_student_number ?? null,
              scores: lyAdmission.scores ?? {},
            }
          : null,
      }
    },
    CONCURRENCY,
    'history',
  )

  const withHistory = programs.filter((p) => p.historical).length

  const snapshot = {
    _meta: {
      year: YEAR,
      generated_at: new Date().toISOString(),
      source: 'myTCAS (course.mytcas.com)',
      round: 'Admission (Round 3) only',
      total_programs: programs.length,
      programs_with_history: withHistory,
    },
    programs,
  }

  await fs.writeFile(OUT_FILE, JSON.stringify(snapshot))
  const stats = await fs.stat(OUT_FILE)

  console.log('\n=========================================')
  console.log(`Saved ${programs.length} programs (${withHistory} with history)`)
  console.log(`File: ${path.relative(ROOT, OUT_FILE)}`)
  console.log(`Size: ${(stats.size / 1024).toFixed(1)} KB`)
}

main().catch((err) => {
  console.error('\nFAILED:', err)
  process.exit(1)
})

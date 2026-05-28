import fs from 'node:fs'
import path from 'node:path'
import type { ProgramRecord, ProgramSnapshot } from '../domain/types'

const SNAPSHOT_YEAR = 2569

interface LoadedSnapshot {
  meta: ProgramSnapshot['_meta']
  programs: ProgramRecord[]
  byId: Map<string, ProgramRecord>
  searchIndex: Array<{ id: string; text: string }>
}

let cached: LoadedSnapshot | null = null

function loadSnapshot(): LoadedSnapshot {
  if (cached) return cached

  const filePath = path.resolve(
    process.cwd(),
    'public',
    'data',
    `tcas-programs-${SNAPSHOT_YEAR}.json`,
  )
  const raw = fs.readFileSync(filePath, 'utf8')
  const snap = JSON.parse(raw) as ProgramSnapshot

  const byId = new Map<string, ProgramRecord>()
  const searchIndex: Array<{ id: string; text: string }> = []
  for (const p of snap.programs) {
    byId.set(p.program_id, p)
    const text = [
      p.university_name_th,
      p.university_name_en,
      p.campus_name_th,
      p.faculty_name_th,
      p.field_name_th,
      p.program_name_th,
      p.program_name_en,
      p.program_type_name_th,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
    searchIndex.push({ id: p.program_id, text })
  }

  cached = {
    meta: snap._meta,
    programs: snap.programs,
    byId,
    searchIndex,
  }
  return cached
}

export function getProgramById(programId: string): ProgramRecord | null {
  return loadSnapshot().byId.get(programId) ?? null
}

export function getProgramsByIds(ids: string[]): ProgramRecord[] {
  const { byId } = loadSnapshot()
  const result: ProgramRecord[] = []
  for (const id of ids) {
    const p = byId.get(id)
    if (p) result.push(p)
  }
  return result
}

export interface SearchOptions {
  query?: string
  limit?: number
  offset?: number
}

export interface SearchResult {
  total: number
  programs: ProgramRecord[]
}

export function searchPrograms({
  query = '',
  limit = 30,
  offset = 0,
}: SearchOptions): SearchResult {
  const snap = loadSnapshot()
  const q = query.trim().toLowerCase()

  let matches: ProgramRecord[]
  if (q === '') {
    matches = snap.programs
  } else {
    const tokens = q.split(/\s+/).filter(Boolean)
    const matchedIds: string[] = []
    for (const entry of snap.searchIndex) {
      if (tokens.every((t) => entry.text.includes(t))) {
        matchedIds.push(entry.id)
      }
    }
    matches = matchedIds.map((id) => snap.byId.get(id)!).filter(Boolean)
  }

  return {
    total: matches.length,
    programs: matches.slice(offset, offset + limit),
  }
}

export function getMeta() {
  return loadSnapshot().meta
}

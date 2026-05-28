import { createFileRoute } from '@tanstack/react-router'
import {
  getMeta,
  getProgramsByIds,
  searchPrograms,
} from '@features/tcas/server/snapshot'
import { calculateAdmissionScore } from '@features/tcas/domain/calculator'
import { predictAdmission } from '@features/tcas/domain/predictor'
import type {
  CalculationResult,
  PredictionResult,
  ProbabilityLevel,
  ProgramListItem,
  ProgramRecord,
  UserScores,
} from '@features/tcas/domain/types'

export type ProgramSortKey =
  | 'relevance'
  | 'my_score_desc'
  | 'last_year_min_desc'
  | 'last_year_min_asc'
  | 'capacity_desc'
  | 'name_asc'

interface CalculateRequest {
  scores?: UserScores
  query?: string
  programIds?: string[]
  limit?: number
  offset?: number
  filters?: {
    probability?: ProbabilityLevel[]
    historyOnly?: boolean
    universities?: string[]
  }
  sort?: ProgramSortKey
}

interface CalculateResponseItem {
  program: ProgramListItem
  calculation: CalculationResult | null
  prediction: PredictionResult | null
}

interface CalculateResponse {
  meta: ReturnType<typeof getMeta>
  total: number
  filtered: number
  results: CalculateResponseItem[]
  availableUniversities: { id: string; name: string; count: number }[]
}

function toListItem(p: ProgramRecord): ProgramListItem {
  return {
    program_id: p.program_id,
    university_id: p.university_id,
    university_name_th: p.university_name_th,
    campus_name_th: p.campus_name_th,
    faculty_name_th: p.faculty_name_th,
    field_name_th: p.field_name_th,
    program_name_th: p.program_name_th,
    program_type_name_th: p.program_type_name_th,
    receive_student_number: p.admission.receive_student_number,
    has_history: p.historical !== null,
    last_year_min_score: p.historical?.min_score ?? null,
    last_year_max_score: p.historical?.max_score ?? null,
  }
}

function buildResult(
  program: ProgramRecord,
  scores: UserScores | undefined,
): { record: ProgramRecord; item: CalculateResponseItem } {
  if (!scores || Object.keys(scores).length === 0) {
    return {
      record: program,
      item: { program: toListItem(program), calculation: null, prediction: null },
    }
  }
  const calculation = calculateAdmissionScore(program, scores)
  const prediction = predictAdmission(program, calculation)
  return {
    record: program,
    item: { program: toListItem(program), calculation, prediction },
  }
}

function compareForSort(
  a: CalculateResponseItem,
  b: CalculateResponseItem,
  key: ProgramSortKey,
): number {
  switch (key) {
    case 'my_score_desc': {
      // Primary: user's calculated score (high → low).
      // Secondary fallback: last year's min score, so the order stays meaningful
      // even when the user hasn't entered scores yet.
      const aScore = a.calculation?.totalScore
      const bScore = b.calculation?.totalScore
      if (aScore != null || bScore != null) {
        return (bScore ?? -Infinity) - (aScore ?? -Infinity)
      }
      return (
        (b.program.last_year_min_score ?? -Infinity) -
        (a.program.last_year_min_score ?? -Infinity)
      )
    }
    case 'last_year_min_desc':
      return (
        (b.program.last_year_min_score ?? -Infinity) -
        (a.program.last_year_min_score ?? -Infinity)
      )
    case 'last_year_min_asc':
      return (
        (a.program.last_year_min_score ?? Infinity) -
        (b.program.last_year_min_score ?? Infinity)
      )
    case 'capacity_desc':
      return (
        (b.program.receive_student_number ?? -1) -
        (a.program.receive_student_number ?? -1)
      )
    case 'name_asc':
      return a.program.university_name_th.localeCompare(
        b.program.university_name_th,
        'th',
      )
    case 'relevance':
    default:
      return 0
  }
}

function filterItem(
  item: CalculateResponseItem,
  filters: CalculateRequest['filters'],
): boolean {
  if (!filters) return true
  if (filters.historyOnly && !item.program.has_history) return false
  if (filters.probability && filters.probability.length > 0) {
    if (!item.prediction) return false
    if (!filters.probability.includes(item.prediction.level)) return false
  }
  if (filters.universities && filters.universities.length > 0) {
    if (!filters.universities.includes(item.program.university_id)) return false
  }
  return true
}

function buildUniversityFacets(
  records: ProgramRecord[],
): { id: string; name: string; count: number }[] {
  const map = new Map<string, { id: string; name: string; count: number }>()
  for (const r of records) {
    const existing = map.get(r.university_id)
    if (existing) existing.count += 1
    else
      map.set(r.university_id, {
        id: r.university_id,
        name: r.university_name_th,
        count: 1,
      })
  }
  return [...map.values()].sort((a, b) => b.count - a.count)
}

export const Route = createFileRoute('/api/tcas/calculate')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: CalculateRequest
        try {
          body = (await request.json()) as CalculateRequest
        } catch {
          return Response.json(
            { error: 'รูปแบบข้อมูลไม่ถูกต้อง' },
            { status: 400 },
          )
        }

        const limit = Math.min(Math.max(body.limit ?? 30, 1), 100)
        const offset = Math.max(body.offset ?? 0, 0)
        const sort: ProgramSortKey = body.sort ?? 'relevance'

        let matchedRecords: ProgramRecord[]
        let unfilteredTotal: number

        if (body.programIds && body.programIds.length > 0) {
          matchedRecords = getProgramsByIds(body.programIds)
          unfilteredTotal = matchedRecords.length
        } else {
          const { total, programs } = searchPrograms({
            query: body.query,
            limit: 4501, // get all matches for filter/sort
            offset: 0,
          })
          matchedRecords = programs
          unfilteredTotal = total
        }

        const built = matchedRecords.map((r) => buildResult(r, body.scores))
        const items = built.map((b) => b.item)

        // Filter
        const filtered = items.filter((it) => filterItem(it, body.filters))

        // Sort
        if (sort !== 'relevance') {
          filtered.sort((a, b) => compareForSort(a, b, sort))
        }

        // Paginate
        const paginated = filtered.slice(offset, offset + limit)

        const response: CalculateResponse = {
          meta: getMeta(),
          total: unfilteredTotal,
          filtered: filtered.length,
          results: paginated,
          availableUniversities: buildUniversityFacets(matchedRecords),
        }
        return Response.json(response)
      },
    },
  },
})

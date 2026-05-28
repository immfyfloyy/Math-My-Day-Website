import type {
  CalculationResult,
  PredictionResult,
  ProbabilityLevel,
  ProgramListItem,
  UserScores,
} from '../domain/types'

export type ProgramSortKey =
  | 'relevance'
  | 'my_score_desc'
  | 'last_year_min_desc'
  | 'last_year_min_asc'
  | 'capacity_desc'
  | 'name_asc'

export interface ProgramFilters {
  probability?: ProbabilityLevel[]
  historyOnly?: boolean
  universities?: string[]
}

export interface TcasMeta {
  year: number
  generated_at: string
  source: string
  round: string
  total_programs: number
  programs_with_history: number
}

export interface CalculateItem {
  program: ProgramListItem
  calculation: CalculationResult | null
  prediction: PredictionResult | null
}

export interface UniversityFacet {
  id: string
  name: string
  count: number
}

export interface CalculateResponse {
  meta: TcasMeta
  total: number
  filtered: number
  results: CalculateItem[]
  availableUniversities: UniversityFacet[]
}

interface CalculateRequest {
  scores?: UserScores
  query?: string
  programIds?: string[]
  limit?: number
  offset?: number
  filters?: ProgramFilters
  sort?: ProgramSortKey
}

export class TcasApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message)
    this.name = 'TcasApiError'
  }
}

export async function calculatePrograms(
  req: CalculateRequest,
): Promise<CalculateResponse> {
  const res = await fetch('/api/tcas/calculate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new TcasApiError(text || 'ไม่สามารถโหลดข้อมูลได้', res.status)
  }
  return (await res.json()) as CalculateResponse
}

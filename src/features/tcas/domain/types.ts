import type { SubjectKey } from '../data/subjects'

// Raw snapshot shape (what the script writes to public/data/tcas-programs-{year}.json)

export interface ProgramAdmission {
  project_id: string
  project_name_th: string
  receive_student_number: number | null
  min_total_score: number
  scores: Record<string, number | string>
  score_conditions: Record<string, number | string>
  interview_date: string
  link: string
}

export interface ProgramHistorical {
  min_score: number | null
  max_score: number | null
  est_min_score_mean: number | null
  est_min_score_regression: number | null
  receive_student_number: number | null
  scores: Record<string, number>
}

export interface ProgramRecord {
  program_id: string
  university_id: string
  university_name_th: string
  university_name_en: string
  campus_name_th: string
  faculty_name_th: string
  field_name_th: string
  program_name_th: string
  program_name_en: string
  program_type_name_th: string
  admission: ProgramAdmission
  historical: ProgramHistorical | null
}

export interface ProgramSnapshot {
  _meta: {
    year: number
    generated_at: string
    source: string
    round: string
    total_programs: number
    programs_with_history: number
  }
  programs: ProgramRecord[]
}

// User-facing types

export type UserScores = Partial<Record<SubjectKey, number>>

export type ProbabilityLevel =
  | 'safe'
  | 'moderate'
  | 'risky'
  | 'unknown'
  | 'failed'

export interface SubjectContribution {
  key: string
  label: string
  weight: number
  rawScore: number | null
  weightedScore: number
}

export interface CalculationIssue {
  type: 'missing_subject' | 'below_min' | 'unsupported_criteria'
  subject?: string
  message: string
}

export interface CalculationResult {
  programId: string
  totalScore: number
  maxPossibleScore: number
  completeness: number // 0..1 — how much of the formula the user has data for
  contributions: SubjectContribution[]
  issues: CalculationIssue[]
  passesMinConditions: boolean
  meetsMinTotal: boolean
}

export interface PredictionResult {
  level: ProbabilityLevel
  label: string
  description: string
  lastYearMin: number | null
  lastYearMax: number | null
  failureReasons?: string[]
}

// Lightweight shape returned by search (avoids shipping full records)

export interface ProgramListItem {
  program_id: string
  university_id: string
  university_name_th: string
  campus_name_th: string
  faculty_name_th: string
  field_name_th: string
  program_name_th: string
  program_type_name_th: string
  receive_student_number: number | null
  has_history: boolean
  last_year_min_score: number | null
  last_year_max_score: number | null
}

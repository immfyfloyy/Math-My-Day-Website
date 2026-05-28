import { SUBJECTS, COMPOSITE_KEYS } from '../data/subjects'
import type { SubjectKey } from '../data/subjects'
import type {
  CalculationIssue,
  CalculationResult,
  ProgramRecord,
  SubjectContribution,
  UserScores,
} from './types'

// Keys that aren't real exam subjects — they shouldn't ask the user for input.
const PRIORITY_KEYS = new Set(['priority_score'])
const CAL_META_KEYS = new Set(['cal_type', 'cal_score_sum', 'cal_subject_name'])

// Normalize all raw scores onto a 0..100 scale before weighting.
function normalizeRawScore(key: string, raw: number): number {
  const meta = SUBJECTS[key as SubjectKey]
  if (!meta) return raw
  if (meta.maxValue === 100) return raw
  return (raw / meta.maxValue) * 100
}

function resolveSubjectScore(
  key: string,
  scores: UserScores,
): number | null {
  if (key === 'tgat') {
    const parts = COMPOSITE_KEYS.tgat
      .map((k) => scores[k])
      .filter((v): v is number => typeof v === 'number')
    if (parts.length === 0) return null
    return parts.reduce((a, b) => a + b, 0) / parts.length
  }
  const v = scores[key as SubjectKey]
  return typeof v === 'number' ? v : null
}

function parseCalSubjects(raw: unknown): string[] {
  if (typeof raw !== 'string') return []
  return raw.split(/[|\s,]+/).filter(Boolean)
}

function labelFor(key: string): string {
  if (key === 'tgat') return 'TGAT (เฉลี่ย 3 พาร์ท)'
  return SUBJECTS[key as SubjectKey]?.shortLabel ?? key
}

export function calculateAdmissionScore(
  program: ProgramRecord,
  userScores: UserScores,
): CalculationResult {
  const { scores: criteria, score_conditions: minConditions, min_total_score } =
    program.admission

  const contributions: SubjectContribution[] = []
  const issues: CalculationIssue[] = []
  let totalScore = 0
  let totalWeight = 0
  let coveredWeight = 0

  // Walk every entry in criteria.scores. Keys are either subject codes
  // with numeric weight, or meta keys (cal_*) that describe a "best of N" group.
  for (const [key, value] of Object.entries(criteria)) {
    if (CAL_META_KEYS.has(key)) continue
    if (PRIORITY_KEYS.has(key)) continue

    const weight = typeof value === 'number' ? value : Number(value)
    if (!Number.isFinite(weight) || weight <= 0) continue

    totalWeight += weight

    const rawScore = resolveSubjectScore(key, userScores)
    if (rawScore === null) {
      issues.push({
        type: 'missing_subject',
        subject: key,
        message: `ยังไม่ได้กรอก ${labelFor(key)}`,
      })
      contributions.push({
        key,
        label: labelFor(key),
        weight,
        rawScore: null,
        weightedScore: 0,
      })
      continue
    }

    const normalized = normalizeRawScore(key, rawScore)
    const weighted = (normalized * weight) / 100
    totalScore += weighted
    coveredWeight += weight
    contributions.push({
      key,
      label: labelFor(key),
      weight,
      rawScore,
      weightedScore: weighted,
    })
  }

  // Handle the cal_type "1" case: pick the highest user-provided score from a set.
  if (criteria.cal_type === '1' || criteria.cal_type === 1) {
    const calWeight = Number(criteria.cal_score_sum) || 0
    const candidateKeys = parseCalSubjects(criteria.cal_subject_name)
    if (calWeight > 0 && candidateKeys.length > 0) {
      totalWeight += calWeight

      const provided = candidateKeys
        .map((k) => ({ key: k, value: resolveSubjectScore(k, userScores) }))
        .filter((x): x is { key: string; value: number } => x.value !== null)

      const bestLabel = `เลือกคะแนนสูงสุดจาก: ${candidateKeys.map(labelFor).join(' / ')}`

      if (provided.length === 0) {
        issues.push({
          type: 'missing_subject',
          message: `ยังไม่ได้กรอกวิชาในกลุ่ม ${candidateKeys.map(labelFor).join(' / ')} (เลือกได้อย่างน้อย 1)`,
        })
        contributions.push({
          key: 'cal_group',
          label: bestLabel,
          weight: calWeight,
          rawScore: null,
          weightedScore: 0,
        })
      } else {
        const best = provided.reduce((a, b) => (a.value >= b.value ? a : b))
        const normalized = normalizeRawScore(best.key, best.value)
        const weighted = (normalized * calWeight) / 100
        totalScore += weighted
        coveredWeight += calWeight
        contributions.push({
          key: 'cal_group',
          label: `${bestLabel} → ใช้ ${labelFor(best.key)}`,
          weight: calWeight,
          rawScore: best.value,
          weightedScore: weighted,
        })
      }
    }
  }

  // Check per-subject minimum thresholds.
  let passesMinConditions = true
  for (const [condKey, condVal] of Object.entries(minConditions)) {
    if (!condKey.startsWith('min_')) continue
    const subjectKey = condKey.replace(/^min_/, '').replace(/_tscore$/, '')
    const userRaw = resolveSubjectScore(subjectKey, userScores)
    const threshold = typeof condVal === 'number' ? condVal : Number(condVal)
    if (!Number.isFinite(threshold)) continue
    if (userRaw === null) {
      passesMinConditions = false
      issues.push({
        type: 'below_min',
        subject: subjectKey,
        message: `ต้องมีคะแนน ${labelFor(subjectKey)} ขั้นต่ำ ${threshold} (ยังไม่ได้กรอก)`,
      })
      continue
    }
    if (userRaw < threshold) {
      passesMinConditions = false
      issues.push({
        type: 'below_min',
        subject: subjectKey,
        message: `${labelFor(subjectKey)} ต่ำกว่าขั้นต่ำ ${threshold} (ได้ ${userRaw})`,
      })
    }
  }

  const meetsMinTotal =
    !min_total_score || totalScore >= min_total_score

  const completeness = totalWeight > 0 ? coveredWeight / totalWeight : 0

  return {
    programId: program.program_id,
    totalScore: Math.round(totalScore * 1000) / 1000,
    maxPossibleScore: 100,
    completeness,
    contributions,
    issues,
    passesMinConditions,
    meetsMinTotal,
  }
}

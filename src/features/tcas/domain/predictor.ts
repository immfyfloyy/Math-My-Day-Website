import type {
  CalculationResult,
  PredictionResult,
  ProgramRecord,
} from './types'

const LEVEL_LABELS = {
  safe: 'ปลอดภัย',
  moderate: 'ลุ้น',
  risky: 'เสี่ยง',
  unknown: 'ไม่มีข้อมูล',
  failed: 'ไม่ผ่านเงื่อนไข',
} as const

export function predictAdmission(
  program: ProgramRecord,
  result: CalculationResult,
): PredictionResult {
  const hist = program.historical

  // Highest priority: program's minimum conditions are not met.
  // Distinct from "risky" — this is a hard fail regardless of total score.
  if (!result.passesMinConditions) {
    const failureReasons = result.issues
      .filter((i) => i.type === 'below_min')
      .map((i) => i.message)
    return {
      level: 'failed',
      label: LEVEL_LABELS.failed,
      description:
        failureReasons.length > 0
          ? `ไม่ผ่านเงื่อนไขขั้นต่ำของสาขา: ${failureReasons.join(' / ')}`
          : 'มีวิชาที่ต่ำกว่าคะแนนขั้นต่ำที่กำหนด',
      lastYearMin: hist?.min_score ?? null,
      lastYearMax: hist?.max_score ?? null,
      failureReasons,
    }
  }

  if (!hist || hist.min_score == null || hist.max_score == null) {
    return {
      level: 'unknown',
      label: LEVEL_LABELS.unknown,
      description: 'สาขานี้ยังไม่มีข้อมูลคะแนนต่ำสุด-สูงสุดของปีที่แล้ว',
      lastYearMin: hist?.min_score ?? null,
      lastYearMax: hist?.max_score ?? null,
    }
  }

  const score = result.totalScore
  const min = hist.min_score
  const max = hist.max_score
  const lowConfidence = result.completeness < 0.6

  if (score >= max) {
    return {
      level: 'safe',
      label: LEVEL_LABELS.safe,
      description: lowConfidence
        ? `คะแนนคุณสูงกว่าคะแนนสูงสุดปีที่แล้ว (${max.toFixed(2)}) แต่ยังกรอกข้อมูลไม่ครบ — โอกาสติดสูง`
        : `คะแนนของคุณสูงกว่าคะแนนสูงสุดปีที่แล้ว (${max.toFixed(2)}) — โอกาสติดสูงมาก`,
      lastYearMin: min,
      lastYearMax: max,
    }
  }

  if (score >= min) {
    return {
      level: 'moderate',
      label: LEVEL_LABELS.moderate,
      description: `คะแนนของคุณอยู่ในช่วงคะแนนปีที่แล้ว (${min.toFixed(2)} - ${max.toFixed(2)}) — มีลุ้นแต่ต้องระวัง`,
      lastYearMin: min,
      lastYearMax: max,
    }
  }

  return {
    level: 'risky',
    label: LEVEL_LABELS.risky,
    description: `คะแนนของคุณต่ำกว่าคะแนนต่ำสุดปีที่แล้ว (${min.toFixed(2)}) — โอกาสน้อย`,
    lastYearMin: min,
    lastYearMax: max,
  }
}

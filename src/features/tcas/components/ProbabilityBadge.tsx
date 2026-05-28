import type { PredictionResult, ProbabilityLevel } from '../domain/types'

const ICON: Record<ProbabilityLevel, string> = {
  safe: 'fa-circle-check',
  moderate: 'fa-circle-half-stroke',
  risky: 'fa-triangle-exclamation',
  unknown: 'fa-circle-question',
  failed: 'fa-ban',
}

export function ProbabilityBadge({
  prediction,
}: {
  prediction: PredictionResult
}) {
  return (
    <span className="tcas-badge" data-level={prediction.level}>
      <i className={`fas ${ICON[prediction.level]}`} aria-hidden />
      {prediction.label}
    </span>
  )
}

import { useMemo, useState } from 'react'
import { SUBJECT_GROUPS, SUBJECTS } from '../data/subjects'
import type { SubjectGroup, SubjectKey } from '../data/subjects'
import type { UserScores } from '../domain/types'

interface ScoreInputFormProps {
  scores: UserScores
  onChange: (key: SubjectKey, value: number | null) => void
  onReset: () => void
}

function clampValue(raw: string, max: number): number | null {
  if (raw.trim() === '') return null
  const num = Number(raw)
  if (!Number.isFinite(num)) return null
  if (num < 0) return 0
  if (num > max) return max
  return num
}

function GroupSection({
  group,
  scores,
  onChange,
}: {
  group: SubjectGroup
  scores: UserScores
  onChange: (key: SubjectKey, value: number | null) => void
}) {
  const [open, setOpen] = useState(group.defaultOpen)

  const filledCount = useMemo(
    () => group.subjects.filter((k) => typeof scores[k] === 'number').length,
    [group.subjects, scores],
  )

  return (
    <div className="tcas-subject-group" data-open={open}>
      <button
        type="button"
        className="tcas-subject-group-header"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="tcas-subject-group-title">
          <i className={`fas ${group.icon}`} aria-hidden />
          <span>{group.title}</span>
          <span className="tcas-subject-group-count">
            {filledCount > 0
              ? `(${filledCount}/${group.subjects.length})`
              : `(${group.subjects.length} วิชา)`}
          </span>
        </span>
        <i className="fas fa-chevron-down tcas-chevron" aria-hidden />
      </button>

      {open ? (
        <div className="tcas-subject-group-body">
          {group.subjects.map((key) => {
            const meta = SUBJECTS[key]
            const current = scores[key]
            return (
              <div key={key} className="tcas-input-row">
                <label htmlFor={`tcas-${key}`}>{meta.label}</label>
                <input
                  id={`tcas-${key}`}
                  type="number"
                  inputMode="decimal"
                  min={0}
                  max={meta.maxValue}
                  step={meta.step}
                  placeholder={meta.placeholder ?? `0 - ${meta.maxValue}`}
                  value={typeof current === 'number' ? current : ''}
                  onChange={(e) =>
                    onChange(key, clampValue(e.target.value, meta.maxValue))
                  }
                />
              </div>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

export function ScoreInputForm({
  scores,
  onChange,
  onReset,
}: ScoreInputFormProps) {
  const totalFilled = Object.values(scores).filter(
    (v) => typeof v === 'number',
  ).length

  return (
    <div className="tcas-score-panel">
      <div className="tcas-score-panel-header">
        <h2>
          <i
            className="fas fa-pen-to-square"
            style={{ color: 'var(--primary)', marginRight: 8 }}
          />
          คะแนนของฉัน
        </h2>
        {totalFilled > 0 ? (
          <button type="button" className="tcas-reset-btn" onClick={onReset}>
            <i className="fas fa-rotate-left" /> ล้างค่า
          </button>
        ) : null}
      </div>

      <p
        style={{
          fontSize: '0.85rem',
          color: 'var(--gray)',
          marginTop: 0,
          marginBottom: 16,
        }}
      >
        กรอกคะแนนที่มี (ข้ามได้ในวิชาที่ยังไม่สอบ)
      </p>

      {SUBJECT_GROUPS.map((group) => (
        <GroupSection
          key={group.id}
          group={group}
          scores={scores}
          onChange={onChange}
        />
      ))}
    </div>
  )
}

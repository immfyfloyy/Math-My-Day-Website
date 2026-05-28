import { useState } from 'react'
import type { ProbabilityLevel } from '../domain/types'
import type {
  ProgramFilters,
  ProgramSortKey,
  UniversityFacet,
} from '../services/tcas.api'

interface FilterSortBarProps {
  filters: ProgramFilters
  onFiltersChange: (filters: ProgramFilters) => void
  sort: ProgramSortKey
  onSortChange: (sort: ProgramSortKey) => void
  universities: UniversityFacet[]
  hasScores: boolean
}

const PROBABILITY_OPTIONS: { value: ProbabilityLevel; label: string }[] = [
  { value: 'safe', label: '🟢 ปลอดภัย' },
  { value: 'moderate', label: '🟡 ลุ้น' },
  { value: 'risky', label: '🔴 เสี่ยง' },
  { value: 'failed', label: '🚫 ไม่ผ่านเงื่อนไข' },
  { value: 'unknown', label: '⚪ ไม่มีข้อมูล' },
]

const SORT_OPTIONS: { value: ProgramSortKey; label: string }[] = [
  { value: 'my_score_desc', label: 'คะแนนสูง → ต่ำ (แนะนำ)' },
  { value: 'last_year_min_desc', label: 'คะแนนปีก่อน (สูง→ต่ำ)' },
  { value: 'last_year_min_asc', label: 'คะแนนปีก่อน (ต่ำ→สูง)' },
  { value: 'capacity_desc', label: 'จำนวนรับมากสุด' },
  { value: 'name_asc', label: 'ชื่อมหาวิทยาลัย (ก-ฮ)' },
  { value: 'relevance', label: 'ตรงกับคำค้น' },
]

export function FilterSortBar({
  filters,
  onFiltersChange,
  sort,
  onSortChange,
  universities,
  hasScores,
}: FilterSortBarProps) {
  const [open, setOpen] = useState(false)

  const toggleProbability = (level: ProbabilityLevel) => {
    const current = filters.probability ?? []
    const next = current.includes(level)
      ? current.filter((x) => x !== level)
      : [...current, level]
    onFiltersChange({
      ...filters,
      probability: next.length === 0 ? undefined : next,
    })
  }

  const toggleUniversity = (id: string) => {
    const current = filters.universities ?? []
    const next = current.includes(id)
      ? current.filter((x) => x !== id)
      : [...current, id]
    onFiltersChange({
      ...filters,
      universities: next.length === 0 ? undefined : next,
    })
  }

  const activeCount =
    (filters.probability?.length ?? 0) +
    (filters.universities?.length ?? 0) +
    (filters.historyOnly ? 1 : 0)

  const clearAll = () => {
    onFiltersChange({})
  }

  return (
    <div className="tcas-filter-bar">
      <div className="tcas-filter-row">
        <button
          type="button"
          className="tcas-filter-toggle"
          data-active={open || activeCount > 0}
          onClick={() => setOpen((v) => !v)}
        >
          <i className="fas fa-sliders" />
          <span>ตัวกรอง</span>
          {activeCount > 0 ? (
            <span className="tcas-filter-badge">{activeCount}</span>
          ) : null}
          <i
            className={`fas fa-chevron-${open ? 'up' : 'down'}`}
            style={{ fontSize: '0.7rem' }}
          />
        </button>

        <div className="tcas-sort-wrapper">
          <span className="tcas-sort-label">เรียงตาม</span>
          <select
            className="tcas-sort-select"
            value={sort}
            onChange={(e) => onSortChange(e.target.value as ProgramSortKey)}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {open ? (
        <div className="tcas-filter-panel">
          <div className="tcas-filter-section">
            <div className="tcas-filter-section-title">โอกาสติด</div>
            <div className="tcas-filter-chips">
              {PROBABILITY_OPTIONS.map((opt) => {
                const active = filters.probability?.includes(opt.value) ?? false
                return (
                  <button
                    key={opt.value}
                    type="button"
                    className="tcas-chip"
                    data-active={active}
                    onClick={() => toggleProbability(opt.value)}
                    disabled={!hasScores && opt.value !== 'unknown'}
                  >
                    {opt.label}
                  </button>
                )
              })}
            </div>
            {!hasScores ? (
              <div className="tcas-filter-hint">
                กรอกคะแนนทางซ้ายก่อนเพื่อใช้ตัวกรอง "โอกาสติด"
              </div>
            ) : null}
          </div>

          <div className="tcas-filter-section">
            <div className="tcas-filter-section-title">ข้อมูล</div>
            <div className="tcas-filter-chips">
              <button
                type="button"
                className="tcas-chip"
                data-active={Boolean(filters.historyOnly)}
                onClick={() =>
                  onFiltersChange({
                    ...filters,
                    historyOnly: !filters.historyOnly,
                  })
                }
              >
                ✅ เฉพาะที่มีคะแนนปีก่อน
              </button>
            </div>
          </div>

          {universities.length > 0 ? (
            <div className="tcas-filter-section">
              <div className="tcas-filter-section-title">
                มหาวิทยาลัย ({universities.length})
              </div>
              <div
                className="tcas-filter-chips"
                style={{ maxHeight: 180, overflowY: 'auto' }}
              >
                {universities.slice(0, 50).map((u) => {
                  const active = filters.universities?.includes(u.id) ?? false
                  return (
                    <button
                      key={u.id}
                      type="button"
                      className="tcas-chip"
                      data-active={active}
                      onClick={() => toggleUniversity(u.id)}
                    >
                      {u.name} <span className="tcas-chip-count">({u.count})</span>
                    </button>
                  )
                })}
              </div>
            </div>
          ) : null}

          {activeCount > 0 ? (
            <button type="button" className="tcas-filter-clear" onClick={clearAll}>
              <i className="fas fa-rotate-left" /> ล้างตัวกรองทั้งหมด
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { calculatePrograms } from '../services/tcas.api'
import type { CalculateItem } from '../services/tcas.api'
import type { UserScores } from '../domain/types'
import { ProbabilityBadge } from './ProbabilityBadge'

interface CompareDrawerProps {
  open: boolean
  onClose: () => void
  compareIds: string[]
  scores: UserScores
  onRemove: (id: string) => void
  onClearAll: () => void
}

export function CompareDrawer({
  open,
  onClose,
  compareIds,
  scores,
  onRemove,
  onClearAll,
}: CompareDrawerProps) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const { data } = useQuery({
    queryKey: ['tcas', 'compare', compareIds, scores],
    queryFn: () =>
      calculatePrograms({
        programIds: compareIds,
        scores,
        limit: 10,
      }),
    enabled: open && compareIds.length > 0,
    staleTime: 60_000,
  })

  if (!open) return null

  const items = data?.results ?? []
  const hasScores = Object.keys(scores).length > 0

  return (
    <>
      <div className="tcas-compare-overlay" onClick={onClose} aria-hidden />
      <div className="tcas-compare-drawer">
        <div className="tcas-compare-header">
          <div>
            <h2>เปรียบเทียบสาขา</h2>
            <span className="tcas-compare-sub">
              {items.length} สาขา · {hasScores ? 'รวมการคำนวณ' : 'ยังไม่ได้กรอกคะแนน'}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              type="button"
              className="tcas-reset-btn"
              onClick={onClearAll}
            >
              <i className="fas fa-rotate-left" /> ล้างทั้งหมด
            </button>
            <button
              type="button"
              className="mobile-drawer-close"
              onClick={onClose}
              aria-label="ปิด"
            >
              <i className="fas fa-times" />
            </button>
          </div>
        </div>

        <div className="tcas-compare-body">
          {items.length === 0 ? (
            <div className="tcas-empty">
              <i className="fas fa-scale-balanced" />
              <h3>ยังไม่มีสาขาในรายการเปรียบเทียบ</h3>
              <p>กดไอคอนตาชั่งที่การ์ดสาขาเพื่อเพิ่มเข้ามาเปรียบเทียบ (สูงสุด 4 สาขา)</p>
            </div>
          ) : (
            <div className="tcas-compare-table-wrapper">
              <table className="tcas-compare-table">
                <thead>
                  <tr>
                    <th></th>
                    {items.map((it) => (
                      <th key={it.program.program_id}>
                        <div className="tcas-compare-th-content">
                          <div className="tcas-compare-uni">
                            {it.program.university_name_th}
                          </div>
                          <div className="tcas-compare-program">
                            {it.program.faculty_name_th}
                          </div>
                          <div
                            style={{
                              fontSize: '0.78rem',
                              color: 'var(--text-secondary)',
                            }}
                          >
                            {it.program.program_name_th}
                          </div>
                          <button
                            type="button"
                            className="tcas-compare-remove"
                            onClick={() => onRemove(it.program.program_id)}
                          >
                            <i className="fas fa-times" /> นำออก
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <CompareRow
                    label="จำนวนรับ"
                    render={(it) =>
                      it.program.receive_student_number != null
                        ? `${it.program.receive_student_number} คน`
                        : '—'
                    }
                    items={items}
                  />
                  <CompareRow
                    label="คะแนนของคุณ"
                    render={(it) =>
                      it.calculation
                        ? `${it.calculation.totalScore.toFixed(2)} / 100`
                        : '— (ยังไม่ได้กรอก)'
                    }
                    items={items}
                    highlight
                  />
                  <CompareRow
                    label="โอกาสติด"
                    render={(it) => {
                      if (!it.prediction) return '—'
                      if (it.prediction.level === 'failed') {
                        return (
                          <div className="tcas-compare-failed">
                            <ProbabilityBadge prediction={it.prediction} />
                            <ul className="tcas-compare-fail-reasons">
                              {(it.prediction.failureReasons ?? []).map(
                                (reason, i) => (
                                  <li key={i}>
                                    <i className="fas fa-xmark" /> {reason}
                                  </li>
                                ),
                              )}
                              {(!it.prediction.failureReasons ||
                                it.prediction.failureReasons.length === 0) && (
                                <li>{it.prediction.description}</li>
                              )}
                            </ul>
                          </div>
                        )
                      }
                      return <ProbabilityBadge prediction={it.prediction} />
                    }}
                    items={items}
                  />
                  <CompareRow
                    label="คะแนนต่ำสุดปีก่อน"
                    render={(it) =>
                      it.prediction?.lastYearMin != null
                        ? it.prediction.lastYearMin.toFixed(2)
                        : '—'
                    }
                    items={items}
                  />
                  <CompareRow
                    label="คะแนนสูงสุดปีก่อน"
                    render={(it) =>
                      it.prediction?.lastYearMax != null
                        ? it.prediction.lastYearMax.toFixed(2)
                        : '—'
                    }
                    items={items}
                  />
                  <CompareRow
                    label="สูตรคำนวณ"
                    render={(it) =>
                      it.calculation ? (
                        <ul className="tcas-compare-formula">
                          {it.calculation.contributions.map((c, i) => (
                            <li key={i}>
                              <strong>{c.label}</strong> × {c.weight}%
                            </li>
                          ))}
                        </ul>
                      ) : (
                        '—'
                      )
                    }
                    items={items}
                  />
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

interface CompareRowProps {
  label: string
  items: CalculateItem[]
  render: (it: CalculateItem) => React.ReactNode
  highlight?: boolean
}

function CompareRow({ label, items, render, highlight }: CompareRowProps) {
  return (
    <tr className={highlight ? 'tcas-compare-row-highlight' : undefined}>
      <th scope="row">{label}</th>
      {items.map((it) => (
        <td key={it.program.program_id}>{render(it)}</td>
      ))}
    </tr>
  )
}

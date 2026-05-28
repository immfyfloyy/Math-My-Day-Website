import { useState } from 'react'
import { ProbabilityBadge } from './ProbabilityBadge'
import type {
  CalculateItem,
} from '../services/tcas.api'

interface ProgramResultCardProps {
  item: CalculateItem
  isFavorite: boolean
  onToggleFavorite: (id: string) => void
  isCompared?: boolean
  onToggleCompare?: (id: string) => void
}

export function ProgramResultCard({
  item,
  isFavorite,
  onToggleFavorite,
  isCompared = false,
  onToggleCompare,
}: ProgramResultCardProps) {
  const [expanded, setExpanded] = useState(false)
  const { program, calculation, prediction } = item

  const hasScores = calculation !== null
  const totalScore = calculation?.totalScore ?? null

  return (
    <article className="tcas-result-card">
      <div className="tcas-result-card-main">
        <div className="tcas-result-uni">
          <i className="fas fa-university" aria-hidden />{' '}
          {program.university_name_th}
          {program.campus_name_th ? ` · ${program.campus_name_th}` : ''}
        </div>
        <div className="tcas-result-faculty">{program.faculty_name_th}</div>
        <div className="tcas-result-program">
          {program.program_name_th}
          {program.program_type_name_th
            ? ` (${program.program_type_name_th})`
            : ''}
        </div>

        <div className="tcas-result-meta">
          {program.receive_student_number != null ? (
            <span>
              <i className="fas fa-users" /> รับ {program.receive_student_number}{' '}
              คน
            </span>
          ) : null}
          {!program.has_history ? (
            <span>
              <i className="fas fa-circle-info" /> ไม่มีคะแนนปีก่อน
            </span>
          ) : null}
          {prediction ? <ProbabilityBadge prediction={prediction} /> : null}
        </div>

        {hasScores ? (
          <button
            type="button"
            className="tcas-detail-toggle"
            onClick={() => setExpanded((v) => !v)}
          >
            <i
              className={`fas ${expanded ? 'fa-chevron-up' : 'fa-chevron-down'}`}
            />{' '}
            {expanded ? 'ซ่อนรายละเอียด' : 'ดูรายละเอียดการคำนวณ'}
          </button>
        ) : null}
      </div>

      <div className="tcas-result-card-side">
        {totalScore !== null ? (
          <div style={{ textAlign: 'right' }}>
            <div className="tcas-score-big">{totalScore.toFixed(2)}</div>
            <div className="tcas-score-label">คะแนนที่คำนวณได้ / 100</div>
          </div>
        ) : (
          <div style={{ textAlign: 'right', color: 'var(--gray)' }}>
            <div className="tcas-score-label">กรอกคะแนนเพื่อคำนวณ</div>
          </div>
        )}

        <div className="tcas-card-actions">
          {onToggleCompare ? (
            <button
              type="button"
              className="tcas-fav-btn"
              data-active={isCompared}
              onClick={() => onToggleCompare(program.program_id)}
              aria-label={isCompared ? 'นำออกจากเปรียบเทียบ' : 'เพิ่มเข้าเปรียบเทียบ'}
              title={isCompared ? 'นำออกจากเปรียบเทียบ' : 'เพิ่มเข้าเปรียบเทียบ'}
            >
              <i className="fas fa-scale-balanced" />
            </button>
          ) : null}

          <button
            type="button"
            className="tcas-fav-btn"
            data-active={isFavorite}
            onClick={() => onToggleFavorite(program.program_id)}
            aria-label={isFavorite ? 'นำออกจากรายการบันทึก' : 'บันทึกสาขานี้'}
            title={isFavorite ? 'นำออกจากรายการบันทึก' : 'บันทึกสาขานี้'}
          >
            <i className={`${isFavorite ? 'fas' : 'far'} fa-heart`} />
          </button>
        </div>
      </div>

      {expanded && calculation && prediction ? (
        <div className="tcas-result-detail">
          <div
            style={{
              fontWeight: 600,
              fontSize: '0.9rem',
              marginBottom: 8,
              color: 'var(--dark)',
            }}
          >
            สูตรคำนวณ (Admission รอบ 3)
          </div>

          {calculation.contributions.map((c, i) => (
            <div className="tcas-formula-row" key={i}>
              <span>
                <strong>{c.label}</strong> × {c.weight}%
              </span>
              <span className="raw">
                {c.rawScore !== null ? c.rawScore.toFixed(2) : '—'}
              </span>
              <span style={{ minWidth: 60, textAlign: 'right' }}>
                = {c.weightedScore.toFixed(2)}
              </span>
            </div>
          ))}

          {calculation.issues.length > 0 ? (
            <div style={{ marginTop: 10 }}>
              {calculation.issues.map((issue, i) => (
                <div
                  key={i}
                  className={`tcas-issue ${
                    issue.type === 'missing_subject' ? 'tcas-issue-warn' : ''
                  }`}
                >
                  <i className="fas fa-exclamation-circle" /> {issue.message}
                </div>
              ))}
            </div>
          ) : null}

          {prediction.lastYearMin !== null && prediction.lastYearMax !== null ? (
            <div className="tcas-history-row">
              <span>
                คะแนนต่ำสุด TCAS68:{' '}
                <strong>{prediction.lastYearMin.toFixed(2)}</strong>
              </span>
              <span>
                คะแนนสูงสุด TCAS68:{' '}
                <strong>{prediction.lastYearMax.toFixed(2)}</strong>
              </span>
            </div>
          ) : null}

          <div
            style={{
              marginTop: 10,
              fontSize: '0.85rem',
              color: 'var(--gray)',
            }}
          >
            {prediction.description}
          </div>

          {program.has_history ? null : (
            <div
              style={{
                marginTop: 8,
                fontSize: '0.78rem',
                color: 'var(--gray)',
              }}
            >
              <i className="fas fa-circle-info" /> สาขานี้ยังไม่มีข้อมูลคะแนนปีก่อน
              จึงแสดงเป็น "ไม่มีข้อมูล"
            </div>
          )}
        </div>
      ) : null}
    </article>
  )
}

import { useMemo } from 'react'
import { ProbabilityBadge } from './ProbabilityBadge'
import { ALL_SUBJECT_KEYS } from '../data/subjects'
import type { CalculateItem } from '../services/tcas.api'
import type { UserScores } from '../domain/types'

interface StatsGridProps {
  scores: UserScores
  results: CalculateItem[]
  filteredCount: number
  totalCount: number
  favoritesCount: number
  compareCount: number
  onOpenEditor: () => void
}

export function StatsGrid({
  scores,
  results,
  filteredCount,
  totalCount,
  favoritesCount,
  compareCount,
  onOpenEditor,
}: StatsGridProps) {
  const filledCount = useMemo(
    () => Object.values(scores).filter((v) => typeof v === 'number').length,
    [scores],
  )
  const totalSubjectCount = ALL_SUBJECT_KEYS.length

  const distribution = useMemo(() => {
    const counts = { safe: 0, moderate: 0, risky: 0, failed: 0, unknown: 0 }
    for (const r of results) {
      if (r.prediction) counts[r.prediction.level] += 1
    }
    return counts
  }, [results])

  const topMatch = useMemo(() => {
    if (results.length === 0) return null
    const eligible = results.filter(
      (r) =>
        r.calculation &&
        r.prediction &&
        r.prediction.level !== 'unknown' &&
        r.prediction.level !== 'failed',
    )
    if (eligible.length === 0) return null
    return eligible.reduce((best, cur) =>
      (cur.calculation!.totalScore ?? 0) > (best.calculation!.totalScore ?? 0)
        ? cur
        : best,
    )
  }, [results])

  const avgScore = useMemo(() => {
    const calcs = results
      .map((r) => r.calculation?.totalScore)
      .filter((s): s is number => typeof s === 'number')
    if (calcs.length === 0) return null
    return calcs.reduce((a, b) => a + b, 0) / calcs.length
  }, [results])

  return (
    <div className="tcas-bento-stats">
      {/* Score overview — biggest tile */}
      <div className="tcas-stat tcas-stat-hero">
        <div className="tcas-stat-label">
          <i className="fas fa-pen-to-square" /> คะแนนของคุณ
        </div>
        {filledCount > 0 ? (
          <>
            <div className="tcas-stat-value-row">
              <span className="tcas-stat-big">{filledCount}</span>
              <span className="tcas-stat-unit">/ {totalSubjectCount} วิชา</span>
            </div>
            <div className="tcas-stat-progress">
              <div
                className="tcas-stat-progress-bar"
                style={{ width: `${(filledCount / totalSubjectCount) * 100}%` }}
              />
            </div>
            <button
              type="button"
              className="tcas-stat-action"
              onClick={onOpenEditor}
            >
              <i className="fas fa-edit" /> แก้ไขคะแนน
            </button>
          </>
        ) : (
          <>
            <div className="tcas-stat-empty">
              ยังไม่ได้กรอกคะแนน — กรอกแล้วระบบจะคำนวณให้ทันที
            </div>
            <button
              type="button"
              className="tcas-stat-action primary"
              onClick={onOpenEditor}
            >
              <i className="fas fa-plus" /> เริ่มกรอกคะแนน
            </button>
          </>
        )}
      </div>

      {/* Top match */}
      <div className="tcas-stat tcas-stat-top">
        <div className="tcas-stat-label">
          <i className="fas fa-trophy" /> สาขาที่เหมาะกับคุณ
        </div>
        {topMatch && topMatch.calculation && topMatch.prediction ? (
          <>
            <div className="tcas-top-uni">
              {topMatch.program.university_name_th}
            </div>
            <div className="tcas-top-faculty">
              {topMatch.program.faculty_name_th}
            </div>
            <div className="tcas-top-program">
              {topMatch.program.program_name_th}
            </div>
            <div className="tcas-top-bottom">
              <div className="tcas-top-score">
                <span className="tcas-stat-big">
                  {topMatch.calculation.totalScore.toFixed(1)}
                </span>
                <span className="tcas-stat-unit">/ 100</span>
              </div>
              <ProbabilityBadge prediction={topMatch.prediction} />
            </div>
          </>
        ) : (
          <div className="tcas-stat-empty">
            {filledCount === 0
              ? 'กรอกคะแนนเพื่อหาสาขาที่เหมาะ'
              : 'ค้นหาสาขาเพื่อดูสาขาที่เหมาะกับคุณ'}
          </div>
        )}
      </div>

      {/* Probability distribution */}
      <div className="tcas-stat tcas-stat-distribution">
        <div className="tcas-stat-label">
          <i className="fas fa-chart-column" /> โอกาสติดในรายการนี้
        </div>
        {filledCount > 0 ? (
          <div className="tcas-dist-bars">
            <DistBar
              level="safe"
              count={distribution.safe}
              total={results.length}
              label="ปลอดภัย"
            />
            <DistBar
              level="moderate"
              count={distribution.moderate}
              total={results.length}
              label="ลุ้น"
            />
            <DistBar
              level="risky"
              count={distribution.risky}
              total={results.length}
              label="เสี่ยง"
            />
            {distribution.failed > 0 ? (
              <DistBar
                level="failed"
                count={distribution.failed}
                total={results.length}
                label="ไม่ผ่านเงื่อนไข"
              />
            ) : null}
            {distribution.unknown > 0 ? (
              <DistBar
                level="unknown"
                count={distribution.unknown}
                total={results.length}
                label="ไม่มีข้อมูล"
              />
            ) : null}
          </div>
        ) : (
          <div className="tcas-stat-empty">กรอกคะแนนเพื่อดูการกระจาย</div>
        )}
      </div>

      {/* Quick stats */}
      <div className="tcas-stat tcas-stat-mini">
        <div className="tcas-stat-label">
          <i className="fas fa-magnifying-glass" /> ผลการค้นหา
        </div>
        <div className="tcas-stat-mini-value">
          {filteredCount.toLocaleString()}
        </div>
        <div className="tcas-stat-mini-sub">
          {filteredCount !== totalCount
            ? `กรองจาก ${totalCount.toLocaleString()} สาขา`
            : `จากทั้งหมด ${totalCount.toLocaleString()} สาขา`}
        </div>
      </div>

      <div className="tcas-stat tcas-stat-mini">
        <div className="tcas-stat-label">
          <i className="fas fa-heart" /> บันทึกไว้
        </div>
        <div className="tcas-stat-mini-value">{favoritesCount}</div>
        <div className="tcas-stat-mini-sub">
          {avgScore !== null && favoritesCount > 0
            ? `เฉลี่ย ${avgScore.toFixed(1)} คะแนน`
            : 'กดหัวใจเพื่อบันทึกสาขาที่สนใจ'}
        </div>
      </div>

      <div className="tcas-stat tcas-stat-mini">
        <div className="tcas-stat-label">
          <i className="fas fa-scale-balanced" /> เปรียบเทียบ
        </div>
        <div className="tcas-stat-mini-value">{compareCount}</div>
        <div className="tcas-stat-mini-sub">
          {compareCount === 0
            ? 'เลือกได้สูงสุด 4 สาขา'
            : `${4 - compareCount} ช่องว่างเหลือ`}
        </div>
      </div>
    </div>
  )
}

function DistBar({
  level,
  count,
  total,
  label,
}: {
  level: 'safe' | 'moderate' | 'risky' | 'unknown' | 'failed'
  count: number
  total: number
  label: string
}) {
  const pct = total > 0 ? (count / total) * 100 : 0
  return (
    <div className="tcas-dist-row" data-level={level}>
      <span className="tcas-dist-label">{label}</span>
      <div className="tcas-dist-track">
        <div
          className="tcas-dist-fill"
          data-level={level}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="tcas-dist-count">{count}</span>
    </div>
  )
}

import { useEffect } from 'react'
import { ScoreInputForm } from './ScoreInputForm'
import type { SubjectKey } from '../data/subjects'
import type { UserScores } from '../domain/types'

interface ScoreEditorModalProps {
  open: boolean
  onClose: () => void
  scores: UserScores
  onChange: (key: SubjectKey, value: number | null) => void
  onReset: () => void
}

export function ScoreEditorModal({
  open,
  onClose,
  scores,
  onChange,
  onReset,
}: ScoreEditorModalProps) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <>
      <div className="tcas-modal-overlay" onClick={onClose} aria-hidden />
      <div
        className="tcas-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tcas-modal-title"
      >
        <div className="tcas-modal-header">
          <div>
            <h2 id="tcas-modal-title">กรอกคะแนนของคุณ</h2>
            <span className="tcas-modal-sub">
              ระบบจะคำนวณและบันทึกอัตโนมัติ
            </span>
          </div>
          <button
            type="button"
            className="mobile-drawer-close"
            onClick={onClose}
            aria-label="ปิด"
          >
            <i className="fas fa-times" />
          </button>
        </div>

        <div className="tcas-modal-body">
          <ScoreInputForm
            scores={scores}
            onChange={onChange}
            onReset={onReset}
          />
        </div>

        <div className="tcas-modal-footer">
          <button
            type="button"
            className="tcas-modal-done"
            onClick={onClose}
          >
            <i className="fas fa-check" />
            บันทึกแล้ว — กลับไปดูผล
          </button>
        </div>
      </div>
    </>
  )
}

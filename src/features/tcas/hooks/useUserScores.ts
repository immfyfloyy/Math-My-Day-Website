import { useCallback, useEffect, useState } from 'react'
import type { SubjectKey } from '../data/subjects'
import type { UserScores } from '../domain/types'

const STORAGE_KEY = 'mmd:tcas:user-scores:v1'

function readFromStorage(): UserScores {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed === 'object') return parsed as UserScores
    return {}
  } catch {
    return {}
  }
}

function persist(scores: UserScores) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(scores))
  } catch {
    // ignore
  }
}

export function useUserScores() {
  const [scores, setScores] = useState<UserScores>({})

  useEffect(() => {
    setScores(readFromStorage())
  }, [])

  const setScore = useCallback((key: SubjectKey, value: number | null) => {
    setScores((prev) => {
      const next = { ...prev }
      if (value === null || Number.isNaN(value)) {
        delete next[key]
      } else {
        next[key] = value
      }
      persist(next)
      return next
    })
  }, [])

  const applyAll = useCallback((newScores: UserScores) => {
    setScores(newScores)
    persist(newScores)
  }, [])

  const reset = useCallback(() => {
    setScores({})
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }, [])

  return { scores, setScore, applyAll, reset }
}

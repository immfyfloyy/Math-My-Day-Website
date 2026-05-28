import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'mmd:tcas:compare:v1'
const MAX_COMPARE = 4

function readFromStorage(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed.filter((x) => typeof x === 'string')
    return []
  } catch {
    return []
  }
}

function persist(ids: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  } catch {
    // ignore
  }
}

export function useCompare() {
  const [compareIds, setCompareIds] = useState<string[]>([])

  useEffect(() => {
    setCompareIds(readFromStorage())
  }, [])

  const toggle = useCallback((id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) {
        const next = prev.filter((x) => x !== id)
        persist(next)
        return next
      }
      if (prev.length >= MAX_COMPARE) {
        return prev
      }
      const next = [...prev, id]
      persist(next)
      return next
    })
  }, [])

  const clear = useCallback(() => {
    setCompareIds([])
    persist([])
  }, [])

  return { compareIds, toggle, clear, max: MAX_COMPARE }
}

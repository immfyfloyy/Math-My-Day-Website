import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'mmd:tcas:favorites:v1'

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

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    setFavorites(readFromStorage())
  }, [])

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites],
  )

  const toggle = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
      persist(next)
      return next
    })
  }, [])

  const remove = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = prev.filter((x) => x !== id)
      persist(next)
      return next
    })
  }, [])

  const applyAll = useCallback((ids: string[]) => {
    const clean = ids.filter((x) => typeof x === 'string')
    setFavorites(clean)
    persist(clean)
  }, [])

  return { favorites, isFavorite, toggle, remove, applyAll }
}

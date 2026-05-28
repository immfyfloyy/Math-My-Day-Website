import { useCallback } from 'react'
import type { UserScores } from '../domain/types'

interface SharePayload {
  scores?: UserScores
  favorites?: string[]
}

function encode(payload: SharePayload): string {
  const json = JSON.stringify(payload)
  if (typeof window === 'undefined') return ''
  return window.btoa(unescape(encodeURIComponent(json)))
}

function decode(encoded: string): SharePayload | null {
  if (typeof window === 'undefined') return null
  try {
    const json = decodeURIComponent(escape(window.atob(encoded)))
    const parsed = JSON.parse(json)
    if (parsed && typeof parsed === 'object') return parsed as SharePayload
    return null
  } catch {
    return null
  }
}

export function useShareLink() {
  const generateShareLink = useCallback(
    (scores: UserScores, favorites: string[]): string => {
      const trimmedScores = Object.fromEntries(
        Object.entries(scores).filter(([, v]) => typeof v === 'number'),
      ) as UserScores

      const payload: SharePayload = {
        scores:
          Object.keys(trimmedScores).length > 0 ? trimmedScores : undefined,
        favorites: favorites.length > 0 ? favorites : undefined,
      }
      const encoded = encode(payload)
      if (typeof window === 'undefined') return ''
      const url = new URL(window.location.href)
      url.searchParams.set('share', encoded)
      return url.toString()
    },
    [],
  )

  const applyShareFromUrl = useCallback((): SharePayload | null => {
    if (typeof window === 'undefined') return null
    const params = new URLSearchParams(window.location.search)
    const share = params.get('share')
    if (!share) return null
    const payload = decode(share)
    if (payload) {
      // Clear share param after consuming so it doesn't loop on reload.
      params.delete('share')
      const newSearch = params.toString()
      const newUrl =
        window.location.pathname + (newSearch ? `?${newSearch}` : '')
      window.history.replaceState({}, '', newUrl)
    }
    return payload
  }, [])

  return { generateShareLink, applyShareFromUrl }
}

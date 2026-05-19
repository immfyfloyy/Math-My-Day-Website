import { useCallback, useEffect, useRef } from 'react'

interface UseDragScrollOptions {
  itemWidth?: number
  scrollMultiplier?: number
  dragSpeed?: number
}

export function useDragScroll<T extends HTMLElement = HTMLDivElement>({
  itemWidth = 324,
  scrollMultiplier = 2,
  dragSpeed = 2,
}: UseDragScrollOptions = {}) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let isDown = false
    let startX = 0
    let scrollStart = 0

    const onMouseDown = (e: MouseEvent) => {
      isDown = true
      el.style.cursor = 'grabbing'
      startX = e.pageX - el.offsetLeft
      scrollStart = el.scrollLeft
    }
    const release = () => {
      isDown = false
      el.style.cursor = 'grab'
    }
    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - el.offsetLeft
      const walk = (x - startX) * dragSpeed
      el.scrollLeft = scrollStart - walk
    }

    el.style.cursor = 'grab'
    el.addEventListener('mousedown', onMouseDown)
    el.addEventListener('mouseleave', release)
    el.addEventListener('mouseup', release)
    el.addEventListener('mousemove', onMouseMove)

    return () => {
      el.removeEventListener('mousedown', onMouseDown)
      el.removeEventListener('mouseleave', release)
      el.removeEventListener('mouseup', release)
      el.removeEventListener('mousemove', onMouseMove)
    }
  }, [dragSpeed])

  const scrollPrev = useCallback(() => {
    ref.current?.scrollBy({
      left: -itemWidth * scrollMultiplier,
      behavior: 'smooth',
    })
  }, [itemWidth, scrollMultiplier])

  const scrollNext = useCallback(() => {
    ref.current?.scrollBy({
      left: itemWidth * scrollMultiplier,
      behavior: 'smooth',
    })
  }, [itemWidth, scrollMultiplier])

  return { ref, scrollPrev, scrollNext }
}

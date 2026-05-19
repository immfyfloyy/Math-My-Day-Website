import { useEffect, useRef, useState } from 'react'

export function useCountUp<T extends HTMLElement = HTMLDivElement>(
  target: number,
  duration = 2000,
) {
  const [value, setValue] = useState(0)
  const ref = useRef<T>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (!entry?.isIntersecting || startedRef.current) return

      startedRef.current = true
      observer.unobserve(entry.target)

      const increment = target / (duration / 16)
      let current = 0
      const tick = () => {
        current += increment
        if (current < target) {
          setValue(Math.floor(current))
          requestAnimationFrame(tick)
        } else {
          setValue(target)
        }
      }
      requestAnimationFrame(tick)
    })

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return { value, ref }
}

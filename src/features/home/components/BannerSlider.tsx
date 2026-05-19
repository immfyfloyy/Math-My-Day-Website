import { useCallback, useEffect, useRef, useState } from 'react'

const AUTO_INTERVAL = 6000
const SWIPE_THRESHOLD = 50

interface Slide {
  id: string
  image: string
  alt: string
}

const slides: Slide[] = [
  {
    id: 'slide-1',
    image: '/img/banner/slide-1.svg',
    alt: 'AI Math Mastery — คอร์สเรียนคณิต ป.1-ป.6 พร้อม AI ส่วนตัว',
  },
  {
    id: 'slide-2',
    image: '/img/banner/slide-2.svg',
    alt: 'Math 24 Premium — เกมคิดเลขเร็ว 24 รูปแบบ',
  },
  {
    id: 'slide-3',
    image: '/img/banner/slide-3.svg',
    alt: 'Live Class Pack — เรียนสด ม.4-ม.6',
  },
  {
    id: 'slide-4',
    image: '/img/banner/slide-4.svg',
    alt: 'Library Pro — 1,200+ บทเรียน ตลอดชีพ',
  },
  {
    id: 'slide-5',
    image: '/img/banner/slide-5.svg',
    alt: 'TCAS Bootcamp — เตรียมสอบเข้ามหาวิทยาลัย',
  },
]

export function BannerSlider() {
  const [index, setIndex] = useState(0)
  const total = slides.length
  const touchStartRef = useRef<number | null>(null)

  const goTo = useCallback(
    (n: number) => setIndex(((n % total) + total) % total),
    [total],
  )
  const next = useCallback(
    () => setIndex((i) => (i + 1) % total),
    [total],
  )
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + total) % total),
    [total],
  )

  useEffect(() => {
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % total),
      AUTO_INTERVAL,
    )
    return () => window.clearInterval(id)
  }, [total])

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartRef.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartRef.current
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      if (delta < 0) next()
      else prev()
    }
    touchStartRef.current = null
  }

  return (
    <section
      className="banner-slider"
      aria-roledescription="carousel"
      aria-label="Math My Day promotions"
    >
      <div className="banner-bg-shapes" aria-hidden="true">
        <div className="banner-blob blob-1" />
        <div className="banner-blob blob-2" />
        <div className="banner-blob blob-3" />
        <svg
          className="banner-curve"
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 C240,40 480,200 720,120 C960,40 1200,200 1440,120 L1440,220 L0,220 Z"
            fill="url(#banner-curve-grad)"
          />
          <defs>
            <linearGradient id="banner-curve-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(99,102,241,0.10)" />
              <stop offset="50%" stopColor="rgba(236,72,153,0.10)" />
              <stop offset="100%" stopColor="rgba(6,182,212,0.10)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="banner-floating" aria-hidden="true">
        <span className="float-symbol fs-1">π</span>
        <span className="float-symbol fs-2">∑</span>
        <span className="float-symbol fs-3">+</span>
        <span className="float-symbol fs-4">×</span>
        <span className="float-symbol fs-5">√</span>
        <span className="float-symbol fs-6">÷</span>
        <span className="float-symbol fs-7">∞</span>
        <span className="float-symbol fs-8">=</span>
      </div>

      <div
        className="banner-track-wrap"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="banner-stage">
          {slides.map((s, i) => (
            <article
              key={s.id}
              className={`banner-slide ${i === index ? 'is-active' : ''}`}
              aria-hidden={i !== index}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${total}`}
            >
              <img
                src={s.image}
                alt={s.alt}
                className="banner-image"
                loading={i === 0 ? 'eager' : 'lazy'}
                draggable={false}
              />
            </article>
          ))}
        </div>

        <button
          type="button"
          className="banner-nav banner-nav-prev"
          aria-label="Previous slide"
          onClick={prev}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M15 6l-6 6 6 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          className="banner-nav banner-nav-next"
          aria-label="Next slide"
          onClick={next}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M9 6l6 6-6 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="banner-dots" role="tablist">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Go to slide ${i + 1}`}
            className={`banner-dot ${i === index ? 'active' : ''}`}
            onClick={() => goTo(i)}
          >
            <span className="dot-fill" />
          </button>
        ))}
      </div>
    </section>
  )
}

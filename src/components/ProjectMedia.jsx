/**
 * Project preview carousel.
 *
 * Renders one or many screenshots in a single frame with a crossfade + Ken
 * Burns transition, an auto-advance timer, manual prev/next controls, dots,
 * and a progress bar. Falls back to the neutral wireframe when no image exists.
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const AUTOPLAY_MS = 4800

export default function ProjectMedia({ images = [], imageAlt }) {
  const slides = Array.isArray(images) ? images.filter(Boolean) : []
  const count = slides.length

  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef(null)

  const go = useCallback(
    (next) => {
      if (!count) return
      setIndex(((next % count) + count) % count)
    },
    [count],
  )

  const next = useCallback(() => go(index + 1), [go, index])
  const prev = useCallback(() => go(index - 1), [go, index])

  useEffect(() => {
    if (count <= 1 || paused) return
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % count)
    }, AUTOPLAY_MS)
    return () => clearInterval(timerRef.current)
  }, [count, paused])

  // Reset index if slides change.
  useEffect(() => {
    setIndex(0)
  }, [count])

  // Keyboard support.
  const onKeyDown = (e) => {
    if (count <= 1) return
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      prev()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      next()
    }
  }

  if (count === 0) {
    return (
      <div className="relative overflow-hidden rounded-md border border-line bg-surface-2">
        <div
          aria-hidden="true"
          className="aspect-[16/9] w-full overflow-hidden bg-[#0b1424] p-4 sm:p-5"
        >
          <div className="flex h-full flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-ink-3/40" />
              <span className="h-1.5 w-1.5 rounded-full bg-ink-3/30" />
              <span className="h-1.5 w-1.5 rounded-full bg-ink-3/20" />
              <span className="ml-2 h-1.5 w-16 rounded-full bg-ink-3/15" />
            </div>

            <div className="mt-1 flex flex-1 gap-3">
              <div className="hidden w-1/5 flex-col gap-2 rounded-sm border border-white/5 bg-white/[0.015] p-2 sm:flex">
                <span className="h-1.5 w-3/4 rounded-full bg-ink-3/25" />
                <span className="h-1.5 w-1/2 rounded-full bg-ink-3/15" />
                <span className="h-1.5 w-2/3 rounded-full bg-ink-3/15" />
                <span className="mt-auto h-1.5 w-1/2 rounded-full bg-accent/25" />
              </div>

              <div className="flex flex-1 flex-col gap-2">
                <div className="flex gap-2">
                  <span className="h-8 flex-1 rounded-sm border border-white/5 bg-white/[0.02]" />
                  <span className="h-8 flex-1 rounded-sm border border-white/5 bg-white/[0.02]" />
                  <span className="h-8 flex-1 rounded-sm border border-white/5 bg-white/[0.02]" />
                </div>

                <div className="flex-1 rounded-sm border border-white/5 bg-white/[0.02] p-2.5">
                  <span className="block h-1.5 w-1/3 rounded-full bg-accent/20" />
                  <span className="mt-2 block h-1.5 w-4/5 rounded-full bg-ink-3/15" />
                  <span className="mt-1.5 block h-1.5 w-2/3 rounded-full bg-ink-3/10" />
                  <span className="mt-1.5 block h-1.5 w-3/5 rounded-full bg-ink-3/10" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-white/5"
        />
      </div>
    )
  }

  if (count === 1) {
    return (
      <div className="relative overflow-hidden rounded-md border border-line bg-surface-2">
        <img
          src={slides[0]}
          alt={imageAlt}
          width="1200"
          height="675"
          loading="lazy"
          decoding="async"
          className="aspect-[16/9] w-full object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.015]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-white/5"
        />
      </div>
    )
  }

  return (
    <div
      className="relative overflow-hidden rounded-md border border-line bg-surface-2"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label={imageAlt || 'Project screenshots'}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        {slides.map((src, i) => {
          const active = i === index
          return (
            <div
              key={`${src}-${i}`}
              className={`absolute inset-0 transition-all duration-700 ease-soft ${
                active
                  ? 'opacity-100 scale-100 blur-0 brightness-100'
                  : 'opacity-0 scale-110 blur-md brightness-75'
              }`}
              aria-hidden={!active}
            >
              <img
                src={src}
                alt={active ? imageAlt : ''}
                width="1200"
                height="675"
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className={`h-full w-full object-cover ${
                  active ? 'animate-[kenburns_4.8s_ease-out_forwards]' : ''
                }`}
              />
            </div>
          )
        })}

        {/* Scan sweep on slide change */}
        <div
          key={`scan-${index}`}
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-accent/25 to-transparent mix-blend-screen animate-[scan_0.9s_ease-out_forwards]"
          aria-hidden="true"
        />

        {/* Vignette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(2,6,23,0.55)_100%)]"
        />
      </div>

      {/* Agentic auto-pilot badge */}
      <div className="absolute left-2 top-2 z-10 flex items-center gap-1.5 rounded-full border border-accent/30 bg-surface/70 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-accent backdrop-blur">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
        Agent · Auto
      </div>

      {/* Prev / Next */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous screenshot"
        className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface/70 text-ink-2 backdrop-blur transition-all duration-300 ease-soft opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:border-accent/60 hover:text-accent focus-visible:opacity-100"
      >
        <ChevronLeft size={16} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next screenshot"
        className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface/70 text-ink-2 backdrop-blur transition-all duration-300 ease-soft opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:border-accent/60 hover:text-accent focus-visible:opacity-100"
      >
        <ChevronRight size={16} aria-hidden="true" />
      </button>

      {/* Dots */}
      <div
        className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-line bg-surface/60 px-2 py-1 backdrop-blur"
        role="tablist"
        aria-label="Screenshot selector"
      >
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show screenshot ${i + 1} of ${count}`}
            onClick={() => go(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ease-soft ${
              i === index ? 'w-5 bg-accent' : 'w-1.5 bg-ink-3/70 hover:bg-ink-2'
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      {!paused && (
        <div
          key={`progress-${index}`}
          className="absolute bottom-0 left-0 z-10 h-0.5 bg-accent/80 animate-[carousel-progress_4.8s_linear_forwards]"
          style={{ width: '0%' }}
        />
      )}

      {/* Slide counter */}
      <div className="absolute right-2 top-2 z-10 rounded-md border border-line bg-surface/60 px-1.5 py-0.5 text-[10px] font-medium tabular-nums text-ink-2 backdrop-blur">
        {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-white/5"
      />
    </div>
  )
}

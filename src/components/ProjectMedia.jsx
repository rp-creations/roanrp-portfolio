/**
 * Project preview carousel.
 *
 * Renders one or many screenshots in a single frame with a crossfade + Ken
 * Burns transition, an auto-advance timer, manual prev/next controls, dots,
 * and a progress bar. Falls back to the neutral wireframe when no image exists.
 *
 * Autoplay is deliberately conservative: it never starts for reduced-motion
 * users, it pauses on hover, keyboard focus, off-screen cards, hidden tabs,
 * and via an explicit pause button. The dots are 24px targets and the arrow
 * buttons are 44px, so the controls stay usable on touch.
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'

const AUTOPLAY_MS = 5600

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return reduced
}

export default function ProjectMedia({ images = [], imageAlt }) {
  // A Set removes duplicate URLs if the same screenshot is imported twice.
  const slides = Array.from(new Set((Array.isArray(images) ? images : []).filter(Boolean)))
  const count = slides.length

  const reducedMotion = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [userPaused, setUserPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [visible, setVisible] = useState(true)
  const [pageVisible, setPageVisible] = useState(true)
  const regionRef = useRef(null)

  const go = useCallback(
    (next) => {
      if (!count) return
      setIndex(((next % count) + count) % count)
    },
    [count],
  )

  const next = useCallback(() => go(index + 1), [go, index])
  const prev = useCallback(() => go(index - 1), [go, index])

  const playing =
    count > 1 && !userPaused && !hovered && !focused && visible && pageVisible && !reducedMotion

  // Restart the timer whenever the slide changes so manual navigation gets a
  // full interval instead of advancing again a moment later.
  useEffect(() => {
    if (!playing) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [playing, count, index])

  // Reset if the slide list changes.
  useEffect(() => {
    setIndex(0)
  }, [count])

  // Pause when the card scrolls out of view.
  useEffect(() => {
    if (count <= 1) return
    const node = regionRef.current
    if (!node || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver((entries) => setVisible(entries[0].isIntersecting), {
      threshold: 0.2,
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [count])

  // Pause when the browser tab is hidden.
  useEffect(() => {
    const update = () => setPageVisible(!document.hidden)
    document.addEventListener('visibilitychange', update)
    return () => document.removeEventListener('visibilitychange', update)
  }, [])

  const onKeyDown = (event) => {
    if (count <= 1) return
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      prev()
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      next()
    } else if (event.key === 'Home') {
      event.preventDefault()
      go(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      go(count - 1)
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
      ref={regionRef}
      className="relative overflow-hidden rounded-md border border-line bg-surface-2"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false)
      }}
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
                  ? 'scale-100 opacity-100 blur-0 brightness-100'
                  : 'scale-110 opacity-0 blur-md brightness-75'
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
                  active && playing && !reducedMotion
                    ? 'animate-[kenburns_5.6s_ease-out_forwards]'
                    : ''
                }`}
              />
            </div>
          )
        })}

        {/* Scan sweep on slide change */}
        <div
          key={`scan-${index}`}
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-[scan_0.9s_ease-out_forwards] bg-gradient-to-r from-transparent via-accent/25 to-transparent mix-blend-screen"
          aria-hidden="true"
        />

        {/* Vignette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(2,6,23,0.55)_100%)]"
        />

        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-white/5"
        />
      </div>

      {/* Pause / play. Replaces the autoplay status badge with something useful. */}
      {!reducedMotion && (
        <button
          type="button"
          onClick={() => setUserPaused((paused) => !paused)}
          aria-label={userPaused ? 'Play screenshot slideshow' : 'Pause screenshot slideshow'}
          className="group/pause absolute left-1 top-1 z-10 flex h-11 w-11 items-center justify-center rounded-full"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-surface/75 text-ink-2 backdrop-blur transition-colors duration-300 ease-soft group-hover/pause:border-accent/60 group-hover/pause:text-accent">
            {userPaused ? (
              <Play size={14} aria-hidden="true" />
            ) : (
              <Pause size={14} aria-hidden="true" />
            )}
          </span>
        </button>
      )}

      {/* Prev / Next */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous screenshot"
        className="absolute left-1 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface/70 text-ink-2 opacity-100 backdrop-blur transition-all duration-300 ease-soft hover:border-accent/60 hover:text-accent focus-visible:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
      >
        <ChevronLeft size={18} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next screenshot"
        className="absolute right-1 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface/70 text-ink-2 opacity-100 backdrop-blur transition-all duration-300 ease-soft hover:border-accent/60 hover:text-accent focus-visible:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
      >
        <ChevronRight size={18} aria-hidden="true" />
      </button>

      {/* Dots: 24px hit areas around a 6px visual mark. */}
      <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 items-center rounded-full border border-line bg-surface/60 p-0.5 backdrop-blur">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => go(i)}
            aria-label={`Show screenshot ${i + 1} of ${count}`}
            aria-current={i === index ? 'true' : undefined}
            className="group/dot flex h-6 w-6 items-center justify-center"
          >
            <span
              aria-hidden="true"
              className={`block h-1.5 rounded-full transition-all duration-300 ease-soft ${
                i === index ? 'w-4 bg-accent' : 'w-1.5 bg-ink-3/70 group-hover/dot:bg-ink-2'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Progress bar */}
      {playing && (
        <div
          key={`progress-${index}`}
          aria-hidden="true"
          className="absolute bottom-0 left-0 z-10 h-0.5 bg-accent/80"
          style={{ animation: `carousel-progress ${AUTOPLAY_MS}ms linear forwards` }}
        />
      )}

      {/* Slide counter */}
      <div className="absolute right-2 top-2 z-10 rounded-md border border-line bg-surface/60 px-1.5 py-0.5 text-[10px] font-medium tabular-nums text-ink-2 backdrop-blur">
        {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
      </div>

      <p className="sr-only" aria-live={playing ? 'off' : 'polite'}>
        Screenshot {index + 1} of {count}
      </p>
    </div>
  )
}

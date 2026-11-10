import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { MapPin, Menu, X } from 'lucide-react'
import Navigation from './Navigation'
import ResumeLink from './ResumeLink'
import SocialLinks from './SocialLinks'

export default function MobileNavigation({ activeId }) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef(null)
  const panelRef = useRef(null)

  const close = useCallback(() => setOpen(false), [])

  // Move focus to the destination section instead of dropping it on <body>
  // when the drawer unmounts.
  const handleNavigate = useCallback((id) => {
    setOpen(false)
    window.requestAnimationFrame(() => {
      document.getElementById(id)?.focus({ preventScroll: true })
    })
  }, [])

  useEffect(() => {
    if (!open) return

    const { body } = document
    const previousOverflow = body.style.overflow
    body.style.overflow = 'hidden'

    const getFocusable = () =>
      Array.from(panelRef.current?.querySelectorAll('a[href], button:not([disabled])') ?? [])

    getFocusable()[0]?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        return
      }
      if (event.key !== 'Tab') return

      const focusable = getFocusable()
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    const desktop = window.matchMedia('(min-width: 1024px)')
    const onBreakpointChange = (event) => {
      if (event.matches) setOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onBreakpointChange)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onBreakpointChange)
      body.style.overflow = previousOverflow
      triggerRef.current?.focus()
    }
  }, [open])

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-md text-ink-2 transition-colors duration-300 hover:bg-white/5 hover:text-ink"
      >
        <Menu size={22} aria-hidden="true" />
        <span className="sr-only">Open navigation menu</span>
      </button>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="drawer-backdrop absolute inset-0 bg-[#070c17]/80 backdrop-blur-sm"
              onClick={close}
              aria-hidden="true"
            />

            <div
              id="site-menu"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              className="drawer-panel absolute inset-y-0 right-0 flex w-full max-w-[22rem] flex-col overflow-y-auto overscroll-contain border-l border-line bg-surface-2 px-6 pb-8 pt-4 shadow-[0_0_80px_rgba(0,0,0,0.55)]"
            >
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-2/80">
                  Menu
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-md text-ink-2 transition-colors duration-300 hover:bg-white/5 hover:text-ink"
                >
                  <X size={22} aria-hidden="true" />
                  <span className="sr-only">Close navigation menu</span>
                </button>
              </div>

              <Navigation variant="drawer" activeId={activeId} onNavigate={handleNavigate} />

              <div className="mt-auto flex flex-col items-start gap-6 border-t border-line pt-7">
                <div>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-2/80">
                    Elsewhere
                  </p>
                  <SocialLinks className="-ml-2.5" />
                </div>

                <ResumeLink />

                <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-ink-2/90">
                  <MapPin size={13} aria-hidden="true" />
                  Philippines
                </p>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}

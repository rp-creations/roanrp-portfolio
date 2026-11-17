import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

/**
 * Accessible modal dialog.
 *
 * Portalled to <body>, locks page scroll, traps Tab focus, closes on Escape
 * or backdrop click, and restores focus to the trigger on unmount.
 */
export default function Dialog({ open, onClose, labelledBy, closeLabel = 'Close dialog', children }) {
  const panelRef = useRef(null)
  const restoreRef = useRef(null)

  useEffect(() => {
    if (!open) return

    const { body } = document
    const previousOverflow = body.style.overflow
    restoreRef.current = document.activeElement
    body.style.overflow = 'hidden'

    const panel = panelRef.current
    panel?.focus()

    const getFocusable = () =>
      Array.from(
        panel?.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      )

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const focusable = getFocusable()
      if (focusable.length === 0) {
        event.preventDefault()
        panel?.focus()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      body.style.overflow = previousOverflow
      restoreRef.current?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <div
        className="drawer-backdrop absolute inset-0 bg-[#070c17]/85 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className="dialog-panel relative z-10 max-h-[92vh] w-full max-w-2xl overflow-y-auto overscroll-contain rounded-t-xl border border-line bg-surface-2 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.6)] focus:outline-none sm:max-h-[85vh] sm:rounded-xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-md text-ink-2 transition-colors duration-300 hover:bg-white/5 hover:text-ink"
        >
          <X size={20} aria-hidden="true" />
          <span className="sr-only">{closeLabel}</span>
        </button>

        {children}
      </div>
    </div>,
    document.body,
  )
}

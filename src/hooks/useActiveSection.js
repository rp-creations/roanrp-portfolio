import { useEffect, useState } from 'react'

/**
 * Tracks the section currently under the reader's eye.
 *
 * An IntersectionObserver with a narrow horizontal band (rootMargin
 * -45% / -50%) means the active section changes when its heading crosses the
 * upper-middle of the viewport, which feels far more natural than a
 * scroll listener. A sentinel at the end of the document keeps the final
 * section active when the page is scrolled to the bottom.
 */
export function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(ids[0] ?? null)
  const key = ids.join('|')

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((section) => section !== null)

    if (sections.length === 0) return
    if (typeof IntersectionObserver === 'undefined') return

    const inBand = new Set()

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inBand.add(entry.target.id)
          else inBand.delete(entry.target.id)
        }
        // Document order wins if two sections share the band.
        const next = sections.find((section) => inBand.has(section.id))
        if (next) setActiveId(next.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )

    sections.forEach((section) => sectionObserver.observe(section))

    const end = document.getElementById('page-end')
    const endObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setActiveId(sections[sections.length - 1].id)
        }
      },
      { threshold: 0 },
    )

    if (end) endObserver.observe(end)

    return () => {
      sectionObserver.disconnect()
      endObserver.disconnect()
    }
    // `key` captures the identity of the observed id list.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return activeId
}

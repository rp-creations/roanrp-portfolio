/**
 * Numbered section heading with a hairline rule. The numbering carries the
 * sidebar navigation language into the content column.
 */
export default function SectionHeading({ id, index, children }) {
  return (
    <div className="mb-8 flex items-center gap-4 sm:mb-10">
      <h2
        id={id}
        className="flex items-baseline gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-ink"
      >
        <span aria-hidden="true" className="tabular-nums text-accent">
          {String(index).padStart(2, '0')}
        </span>
        {children}
      </h2>
      <span aria-hidden="true" className="h-px flex-1 bg-line" />
    </div>
  )
}

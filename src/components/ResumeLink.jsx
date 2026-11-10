import { Download, FileText } from 'lucide-react'
import { profile } from '../data/portfolio'

/**
 * The résumé is only rendered as a link when a real file has been provided.
 * Until then it is inert text — a link to a missing PDF would be a broken
 * promise, so it is deliberately not clickable.
 */
export default function ResumeLink({ variant = 'button', className = '' }) {
  const { resume } = profile

  if (!resume) {
    return (
      <p
        data-placeholder="resume"
        title="Add public/resume.pdf, then set profile.resume in src/data/portfolio.js"
        className={`inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-2/80 ${className}`.trim()}
      >
        <FileText size={14} aria-hidden="true" />
        Résumé coming soon
      </p>
    )
  }

  if (variant === 'inline') {
    return (
      <a
        href={resume}
        download
        className={`group inline-flex items-center gap-2 text-sm font-medium text-ink-2 transition-colors duration-300 hover:text-accent ${className}`.trim()}
      >
        <Download
          size={16}
          aria-hidden="true"
          className="transition-transform duration-300 ease-soft group-hover:translate-y-0.5"
        />
        Download Résumé
        <span className="sr-only"> (PDF)</span>
      </a>
    )
  }

  return (
    <a
      href={resume}
      download
      className={`group inline-flex items-center gap-2.5 rounded-md border border-line px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink transition-colors duration-300 ease-soft hover:border-accent/50 hover:bg-accent/5 hover:text-accent ${className}`.trim()}
    >
      <Download
        size={14}
        aria-hidden="true"
        className="transition-transform duration-300 ease-soft group-hover:translate-y-0.5"
      />
      Download Résumé
      <span className="sr-only"> (PDF)</span>
    </a>
  )
}

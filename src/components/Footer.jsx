import { footer, profile } from '../data/portfolio'

export default function Footer({ className = '' }) {
  return (
    <footer className={`text-[11px] leading-relaxed text-ink-2/80 ${className}`.trim()}>
      <p>{footer.note}</p>
      <p className="mt-1.5 tabular-nums">
        &copy; {new Date().getFullYear()} {profile.name} All rights reserved.
      </p>
    </footer>
  )
}

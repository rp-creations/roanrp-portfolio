import { navItems } from '../data/portfolio'

/**
 * Shared section navigation.
 * - `sidebar`  → numbered rail with a growing accent line (desktop)
 * - `drawer`   → large tap targets for the mobile menu
 */
export default function Navigation({ activeId, variant = 'sidebar', onNavigate }) {
  if (variant === 'drawer') {
    return (
      <nav aria-label="Sections" className="mt-6">
        <ul>
          {navItems.map((item, index) => {
            const isActive = activeId === item.id
            return (
              <li key={item.id} className="border-b border-line last:border-b-0">
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={onNavigate ? () => onNavigate(item.id) : undefined}
                  className="group flex items-baseline gap-4 py-4"
                >
                  <span
                    aria-hidden="true"
                    className={`w-5 text-[11px] tabular-nums transition-colors duration-300 ${
                      isActive ? 'text-accent' : 'text-ink-3'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`text-xl font-medium tracking-tight transition-colors duration-300 ${
                      isActive ? 'text-accent' : 'text-ink-2 group-hover:text-ink'
                    }`}
                  >
                    {item.label}
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    )
  }

  return (
    <nav aria-label="Section navigation">
      <ul className="space-y-0.5">
        {navItems.map((item, index) => {
          const isActive = activeId === item.id
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? 'true' : undefined}
                className="group flex items-center gap-4 py-2"
              >
                <span
                  aria-hidden="true"
                  className={`h-px shrink-0 transition-all duration-300 ease-soft ${
                    isActive
                      ? 'w-10 bg-accent'
                      : 'w-6 bg-ink-3/70 group-hover:w-10 group-hover:bg-ink-2'
                  }`}
                />
                <span
                  aria-hidden="true"
                  className={`text-[11px] tabular-nums transition-colors duration-300 ${
                    isActive ? 'text-accent' : 'text-ink-3 group-hover:text-ink-2'
                  }`}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span
                  className={`text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${
                    isActive ? 'text-accent' : 'text-ink-2 group-hover:text-ink'
                  }`}
                >
                  {item.label}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

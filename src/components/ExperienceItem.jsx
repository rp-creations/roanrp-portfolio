import Reveal from './Reveal'

export default function ExperienceItem({ experience }) {
  const { role, project, context, period, description, highlights, technologies } = experience

  return (
    <li className="group">
      <Reveal className="-mx-4 rounded-lg px-4 py-1 transition-colors duration-300 ease-soft group-hover:bg-white/[0.025]">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {period && (
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] tabular-nums text-ink-2/90">
              {period}
            </p>
          )}
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-2/90">
            {context}
          </p>
        </div>

        <h3 className="mt-2 text-[0.98rem] font-medium leading-snug tracking-tight text-ink transition-colors duration-300 group-hover:text-accent">
          {role}
        </h3>
        <p className="mt-1 text-sm text-ink-2">{project}</p>

        <p className="mt-3 text-sm leading-relaxed text-ink-2">{description}</p>

        {highlights.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex gap-2.5 text-sm leading-relaxed text-ink-2">
                <span
                  aria-hidden="true"
                  className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-accent/70"
                />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        <ul
          className="mt-4 flex flex-wrap items-baseline gap-x-1.5 gap-y-1"
          aria-label="Technologies used"
        >
          {technologies.map((tech, index) => (
            <li
              key={tech}
              className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-2/90"
            >
              {tech}
              {index < technologies.length - 1 ? ',' : ''}
            </li>
          ))}
        </ul>
      </Reveal>
    </li>
  )
}

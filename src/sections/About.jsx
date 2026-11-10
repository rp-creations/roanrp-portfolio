import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { about } from '../data/portfolio'

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      tabIndex={-1}
      className="scroll-mt-24 focus:outline-none lg:scroll-mt-28"
    >
      <SectionHeading id="about-heading" index={about.index}>
        {about.label}
      </SectionHeading>

      <Reveal>
        <div className="space-y-5">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="text-[0.95rem] leading-relaxed text-ink-2">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-9 border-t border-line pt-6">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-3">
            Current focus
          </h3>
          <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-3">
            {about.focus.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-ink-2">
                <span
                  aria-hidden="true"
                  className="mt-[0.6rem] h-px w-3 shrink-0 bg-accent/70"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  )
}

import ExperienceItem from '../components/ExperienceItem'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { awards, experiences } from '../data/portfolio'

export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      tabIndex={-1}
      className="scroll-mt-24 focus:outline-none lg:scroll-mt-28"
    >
      <SectionHeading id="experience-heading" index={2}>
        Experience
      </SectionHeading>

      <ol className="timeline space-y-12">
        {experiences.map((experience) => (
          <ExperienceItem key={experience.id} experience={experience} />
        ))}
      </ol>

      {awards.length > 0 && (
        <Reveal className="mt-12 border-t border-line pt-6">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-2/90">
            Awards &amp; recognition
          </h3>

          <ul className="mt-4 space-y-3.5">
            {awards.map((award) => (
              <li key={award.id ?? award.title} className="flex gap-2.5">
                <span
                  aria-hidden="true"
                  className="mt-[0.55rem] h-px w-2.5 shrink-0 bg-accent/70"
                />
                <div>
                  <p className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 text-sm">
                    <span className="font-medium text-ink">{award.title}</span>
                    {award.issuer && <span className="text-ink-2">{award.issuer}</span>}
                    {award.year && (
                      <span className="text-[11px] uppercase tabular-nums tracking-[0.16em] text-ink-2/80">
                        {award.year}
                      </span>
                    )}
                  </p>
                  {award.note && (
                    <p className="mt-1 text-[13px] leading-relaxed text-ink-2">{award.note}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </section>
  )
}

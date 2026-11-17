import { useCallback, useState } from 'react'
import { ArrowUpRight, FileText, Lock } from 'lucide-react'
import Dialog from './Dialog'
import ProjectMedia from './ProjectMedia'
import Reveal from './Reveal'
import { GithubIcon } from './BrandIcons'

export default function ProjectCard({ project, delay = 0 }) {
  const {
    index,
    slug,
    title,
    subtitle,
    context,
    description,
    highlights,
    technologies,
    images,
    imageAlt,
    links,
    privateSourceNote,
    accessRequest,
    caseStudy,
  } = project

  const [caseStudyOpen, setCaseStudyOpen] = useState(false)
  const closeCaseStudy = useCallback(() => setCaseStudyOpen(false), [])

  const github = links?.github ?? null
  const demo = links?.demo ?? null
  const hasLinks = Boolean(github || demo)

  return (
    <li className="group">
      <Reveal
        delay={delay}
        className="rounded-lg border border-transparent p-2 transition-colors duration-300 ease-soft group-hover:border-line group-hover:bg-white/[0.025] sm:p-3"
      >
        <article aria-labelledby={`project-${slug}-title`}>
          <ProjectMedia images={images} imageAlt={imageAlt} />

          <div className="px-1.5 pb-1.5 pt-5 sm:px-2.5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                  Project {index}
                </p>
                <h3
                  id={`project-${slug}-title`}
                  className="mt-2 text-lg font-semibold tracking-tight text-ink transition-colors duration-300 group-hover:text-accent"
                >
                  {title}
                </h3>
                <p className="mt-1 text-sm text-ink-2">{subtitle}</p>
              </div>

              {hasLinks && (
                <div className="flex shrink-0 items-center gap-1">
                  {github && (
                    <a
                      href={github}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${title} source on GitHub (opens in a new tab)`}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ink-2 transition-colors duration-300 hover:text-accent"
                    >
                      <GithubIcon size={18} />
                    </a>
                  )}
                  {demo && (
                    <a
                      href={demo}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${title} live demo (opens in a new tab)`}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ink-2 transition-colors duration-300 hover:text-accent"
                    >
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </a>
                  )}
                </div>
              )}
            </div>

            <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-ink-2/90">{context}</p>

            <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-2">{description}</p>

            {highlights.length > 0 && (
              <ul className="mt-4 grid gap-x-6 gap-y-1.5">
                {highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-2.5 text-sm leading-relaxed text-ink-2"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.55rem] h-px w-2.5 shrink-0 bg-accent/70"
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            )}

            {caseStudy && (
              <button
                type="button"
                onClick={() => setCaseStudyOpen(true)}
                className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-md border border-accent/30 bg-accent/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent transition-colors duration-300 ease-soft hover:border-accent/60 hover:bg-accent/10"
              >
                <FileText size={14} aria-hidden="true" />
                Read case study
              </button>
            )}

            {privateSourceNote && (
              <div className="mt-5 flex gap-2.5 rounded-md border border-line bg-surface-2/50 px-3.5 py-3">
                <Lock size={13} aria-hidden="true" className="mt-0.5 shrink-0 text-accent/80" />
                <div>
                  <p className="text-xs leading-relaxed text-ink-2">{privateSourceNote}</p>
                  {accessRequest && (
                    <a
                      href={accessRequest.href}
                      className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent transition-colors duration-300 hover:text-accent/80"
                    >
                      {accessRequest.label}
                      <ArrowUpRight size={12} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            )}

            <ul className="mt-5 flex flex-wrap gap-x-2 gap-y-2" aria-label="Technologies used">
              {technologies.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-line bg-surface-2/60 px-2.5 py-1 text-[10.5px] font-medium uppercase tracking-[0.1em] text-ink-2"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </Reveal>

      {caseStudy && (
        <Dialog
          open={caseStudyOpen}
          onClose={closeCaseStudy}
          labelledBy={`case-study-${slug}-title`}
          closeLabel={`Close ${title} case study`}
        >
          <p className="pr-14 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
            Case study · {title}
          </p>

          <h2
            id={`case-study-${slug}-title`}
            className="mt-4 text-xl font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-2xl"
          >
            {caseStudy.title}
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-ink-2">{caseStudy.intro}</p>

          <div className="mt-7 space-y-6">
            {caseStudy.sections.map((section) => (
              <section key={section.heading}>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-2">
                  {section.heading}
                </h3>

                {section.body && (
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">{section.body}</p>
                )}

                {section.items && (
                  <ul className="mt-2.5 space-y-2">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-ink-2">
                        <span
                          aria-hidden="true"
                          className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-accent/70"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-6">
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink transition-colors duration-300 hover:text-accent"
              >
                Open the live site
                <ArrowUpRight size={15} aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
            {accessRequest && (
              <a
                href={accessRequest.href}
                className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink-2 transition-colors duration-300 hover:text-accent"
              >
                {accessRequest.label}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            )}
          </div>
        </Dialog>
      )}
    </li>
  )
}

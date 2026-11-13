import { ArrowUpRight } from 'lucide-react'
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
  } = project

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
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md text-ink-2 transition-colors duration-300 hover:text-accent"
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
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md text-ink-2 transition-colors duration-300 hover:text-accent"
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
    </li>
  )
}

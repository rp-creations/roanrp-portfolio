import { ArrowRight, MapPin } from 'lucide-react'
import Reveal from '../components/Reveal'
import { hero, profile } from '../data/portfolio'

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      tabIndex={-1}
      className="scroll-mt-24 focus:outline-none"
    >
      <Reveal>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-medium uppercase tracking-[0.18em]">
          <span className="inline-flex items-center gap-2 text-accent">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/50 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {hero.availability}
          </span>
          <span aria-hidden="true" className="hidden h-3 w-px bg-line-strong sm:block" />
          <span className="inline-flex items-center gap-1.5 text-ink-2">
            <MapPin size={12} aria-hidden="true" />
            {hero.location}
          </span>
        </div>

        <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-2 lg:hidden">
          {profile.role}
        </p>

        <h2
          id="hero-title"
          className="mt-4 text-[1.75rem] font-semibold leading-[1.18] tracking-[-0.02em] text-ink sm:text-4xl lg:text-[2.3rem]"
        >
          {hero.headline}
        </h2>

        <p className="mt-5 max-w-[34rem] text-[0.98rem] leading-relaxed text-ink-2">
          {hero.description}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
          <a
            href={hero.primaryCta.href}
            className="group inline-flex items-center gap-2.5 rounded-md bg-accent px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#052e2b] transition-colors duration-300 ease-soft hover:bg-[#7df0dd]"
          >
            {hero.primaryCta.label}
            <ArrowRight
              size={15}
              aria-hidden="true"
              className="transition-transform duration-300 ease-soft group-hover:translate-x-1"
            />
          </a>

          <a
            href={hero.secondaryCta.href}
            className="group relative inline-flex items-center gap-2 py-1 text-sm font-medium text-ink transition-colors duration-300 hover:text-accent"
          >
            {hero.secondaryCta.label}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-soft group-hover:scale-x-100"
            />
          </a>
        </div>
      </Reveal>
    </section>
  )
}

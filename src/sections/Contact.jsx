import { ArrowUpRight, MapPin } from 'lucide-react'
import Reveal from '../components/Reveal'
import ResumeLink from '../components/ResumeLink'
import SectionHeading from '../components/SectionHeading'
import SocialLinks from '../components/SocialLinks'
import { contact, profile } from '../data/portfolio'

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      tabIndex={-1}
      className="scroll-mt-24 focus:outline-none lg:scroll-mt-28"
    >
      <SectionHeading id="contact-heading" index={contact.index}>
        {contact.label}
      </SectionHeading>

      <Reveal>
        <h3 className="max-w-md text-2xl font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-[1.75rem]">
          {contact.heading}
        </h3>

        <p className="mt-4 max-w-lg text-[0.95rem] leading-relaxed text-ink-2">
          {contact.description}
        </p>

        <a
          href={`mailto:${profile.email}`}
          className="group mt-9 inline-flex items-center gap-3 text-lg font-medium tracking-tight text-ink transition-colors duration-300 hover:text-accent sm:text-xl"
        >
          <span className="relative">
            {profile.email}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-soft group-hover:scale-x-100"
            />
          </span>
          <ArrowUpRight
            size={18}
            aria-hidden="true"
            className="transition-transform duration-300 ease-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>

        <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-5 border-t border-line pt-7">
          <SocialLinks className="-ml-2.5" />
          <ResumeLink variant="inline" />
        </div>

        <p className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-ink-2/90">
          <MapPin size={13} aria-hidden="true" />
          Based in {profile.location}
        </p>

      </Reveal>
    </section>
  )
}

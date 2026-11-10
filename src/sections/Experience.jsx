import ExperienceItem from '../components/ExperienceItem'
import SectionHeading from '../components/SectionHeading'
import { experiences } from '../data/portfolio'

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
    </section>
  )
}

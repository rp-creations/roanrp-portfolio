import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import SkillGroup from '../components/SkillGroup'
import { skillGroups } from '../data/portfolio'

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      tabIndex={-1}
      className="scroll-mt-24 focus:outline-none lg:scroll-mt-28"
    >
      <SectionHeading id="skills-heading" index={4}>
        Skills
      </SectionHeading>

      <Reveal className="border-t border-line">
        {skillGroups.map((group) => (
          <SkillGroup key={group.label} group={group} />
        ))}
      </Reveal>
    </section>
  )
}

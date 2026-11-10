import ProjectCard from '../components/ProjectCard'
import SectionHeading from '../components/SectionHeading'
import { projects } from '../data/portfolio'

export default function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      tabIndex={-1}
      className="scroll-mt-24 focus:outline-none lg:scroll-mt-28"
    >
      <SectionHeading id="projects-heading" index={3}>
        Projects
      </SectionHeading>

      <ul className="space-y-10 sm:space-y-12">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} delay={index * 70} />
        ))}
      </ul>
    </section>
  )
}

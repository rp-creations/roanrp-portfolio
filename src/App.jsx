import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import { navItems } from './data/portfolio'
import { useActiveSection } from './hooks/useActiveSection'
import About from './sections/About'
import Contact from './sections/Contact'
import Experience from './sections/Experience'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import Skills from './sections/Skills'

const sectionIds = navItems.map((item) => item.id)

export default function App() {
  const activeId = useActiveSection(sectionIds)

  return (
    <div
      id="top"
      className="mx-auto min-h-screen w-full max-w-[80rem] px-6 sm:px-10 lg:px-14 xl:px-20"
    >
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <div className="lg:flex lg:items-start lg:justify-between lg:gap-10 xl:gap-14">
        <Sidebar activeId={activeId} />

        <main
          id="main"
          tabIndex={-1}
          className="w-full min-w-0 max-w-[40rem] pt-20 focus:outline-none sm:pt-24 lg:w-[56%] lg:max-w-[38rem] lg:pb-24 lg:pt-[clamp(2.5rem,6vh,6rem)]"
        >
          <div className="space-y-24 pb-20 sm:space-y-28 lg:space-y-32 lg:pb-0">
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Contact />
          </div>

          <Footer className="mt-24 pb-10 lg:hidden" />
        </main>
      </div>

      <div id="page-end" aria-hidden="true" className="h-px w-full" />
    </div>
  )
}

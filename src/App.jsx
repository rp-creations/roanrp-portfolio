import { useEffect } from 'react'
import { profile, projects, skills } from './data/portfolio.js'
import heroArtwork from './assets/hero.png'
import './App.css'

const currentYear = new Date().getFullYear()

function ArrowIcon({ diagonal = false }) {
  return (
    <svg aria-hidden="true" className="arrow-icon" viewBox="0 0 20 20" fill="none">
      {diagonal ? (
        <path d="M5 15 15 5M6 5h9v9" />
      ) : (
        <path d="M3.5 10h12m-5-5 5 5-5 5" />
      )}
    </svg>
  )
}

function updateHeroPointer(event) {
  if (event.pointerType === 'touch') return

  const bounds = event.currentTarget.getBoundingClientRect()
  const x = (event.clientX - bounds.left) / bounds.width
  const y = (event.clientY - bounds.top) / bounds.height
  const art = event.currentTarget

  art.style.setProperty('--hero-pointer-x', `${(x - 0.5) * 12}px`)
  art.style.setProperty('--hero-pointer-y', `${(y - 0.5) * 10}px`)
  art.style.setProperty('--glow-x', `${x * 100}%`)
  art.style.setProperty('--glow-y', `${y * 100}%`)
}

function resetHeroPointer(event) {
  const art = event.currentTarget
  art.style.setProperty('--hero-pointer-x', '0px')
  art.style.setProperty('--hero-pointer-y', '0px')
  art.style.setProperty('--glow-x', '50%')
  art.style.setProperty('--glow-y', '46%')
}

function ProjectGraphic({ variant, name }) {
  return (
    <div className={`project-graphic project-graphic--${variant}`} aria-hidden="true">
      <span className="project-graphic__index">{name}</span>
      {variant === 'tandem' && (
        <div className="tandem-scene">
          <div className="tandem-orbit"><i /><i /><span>+</span></div>
          <div className="tandem-task tandem-task--one"><b>THIS WEEK</b><span>Make space<br />for good work</span><i>✓</i></div>
          <div className="tandem-task tandem-task--two"><span className="avatar-stack"><i /><i /><i /></span><span>On the same page</span><b>3 / 4</b></div>
          <span className="graphic-spark graphic-spark--one">✳</span>
        </div>
      )}
      {variant === 'atelier' && (
        <div className="atelier-scene">
          <div className="atelier-paper atelier-paper--back"><i /><i /><i /></div>
          <div className="atelier-paper atelier-paper--front"><b>FIELD<br />NOTES</b><span>collect / connect / create</span><i /></div>
          <span className="atelier-sticker">A—Z</span>
          <span className="graphic-spark graphic-spark--two">✳</span>
        </div>
      )}
      {variant === 'ground' && (
        <div className="ground-scene">
          <div className="ground-sun" />
          <svg className="ground-plant" viewBox="0 0 280 300" fill="none">
            <path d="M139 278C140 214 131 166 144 114 150 89 163 66 183 44M140 230c-22-35-43-48-76-58m79-12c18-28 39-41 74-50" />
            <path d="M180 48c22-23 51-19 57-18-1 27-16 46-46 47M67 172c-29-17-55-8-64-4 11 26 33 37 61 29m119-80c21-26 49-30 61-28-3 28-23 45-52 46" />
          </svg>
          <span className="ground-caption">GROW AT YOUR PACE</span>
          <span className="graphic-spark graphic-spark--three">✳</span>
        </div>
      )}
      <span className="project-graphic__caption">A product concept</span>
    </div>
  )
}

function App() {
  useEffect(() => {
    const root = document.documentElement
    const targets = document.querySelectorAll('[data-reveal]')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    root.classList.add('motion-ready')

    if (reducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('is-visible'))
      return () => root.classList.remove('motion-ready')
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          currentObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.14, rootMargin: '0px 0px -36px 0px' })
    targets.forEach((target) => observer.observe(target))

    const artwork = document.querySelector('.hero-art__image')
    let frameId = 0
    const updateParallax = () => {
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(() => {
        if (!artwork) return
        const bounds = artwork.parentElement.getBoundingClientRect()
        const progress = (bounds.top + bounds.height / 2 - window.innerHeight / 2) / window.innerHeight
        const offset = Math.max(-22, Math.min(22, progress * -34))
        artwork.style.setProperty('--parallax-y', `${offset}px`)
      })
    }

    window.addEventListener('scroll', updateParallax, { passive: true })
    updateParallax()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', updateParallax)
      cancelAnimationFrame(frameId)
      root.classList.remove('motion-ready')
    }
  }, [])

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header page-wrap" id="top">
        <a className="wordmark" href="#top" aria-label={`${profile.name}, home`}>
          <span className="wordmark__mark">RP</span>
          <span className="wordmark__name">Roan Pantalla<span>Independent designer &amp; developer</span></span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#work">Selected work</a>
          <a href="#skills">Capabilities</a>
          {profile.email && <a className="nav-status" href="#contact"><span /> Get in touch</a>}
        </nav>
      </header>

      <main id="main-content">
        <section className="hero page-wrap" id="hero" aria-labelledby="hero-title">
          <div className="hero__copy" data-reveal>
            <p className="eyebrow hero__eyebrow"><span className="hero__eyebrow-index">01</span> Product thinking <i>·</i> Visual craft <i>·</i> Frontend</p>
            <h1 id="hero-title"><span>Frontend</span><span>Developer</span><em>&amp; UI/UX Designer</em></h1>
            <p className="hero__intro">{profile.intro}</p>
            <div className="hero__actions">
              <a className="button button--primary" href="#work">See selected work <ArrowIcon /></a>
              <a className="text-link" href="#approach">How I work <ArrowIcon diagonal /></a>
            </div>
            <p className="hero__availability"><span /> {profile.availability}</p>
          </div>
          <aside className="hero-art" aria-label="Abstract layered form in purple" data-reveal onPointerMove={updateHeroPointer} onPointerLeave={resetHeroPointer}>
            <div className="hero-art__halo" />
            <div className="hero-art__glow" aria-hidden="true" />
            <div className="hero-art__orbit" />
            <img className="hero-art__image" src={heroArtwork} alt="" />
            <span className="hero-art__label"><i /> FORM STUDY <b>001</b></span>
            <span className="hero-art__sticker">THINK<br /><b>MAKE</b><br />REFINE</span>
            <span className="hero-art__chip hero-art__chip--top">INTERFACE <b>↗</b></span>
            <span className="hero-art__chip hero-art__chip--bottom">IDEA → INTERACTION</span>
            <span className="hero-art__side-note">DESIGN / BUILD / REFINE</span>
          </aside>
          <div className="hero__footnote"><span>PORTFOLIO — {currentYear}</span><a href="#work">Scroll to explore <span aria-hidden="true">↓</span></a></div>
        </section>

        <section className="approach-section page-wrap" id="approach" aria-labelledby="approach-title">
          <div className="approach-section__heading" data-reveal>
            <div className="section-label"><span>01</span><p className="eyebrow">A considered process</p></div>
            <div>
              <h2 id="approach-title">From first question<br />to <em>finished detail.</em></h2>
              <p>A practical loop that keeps the problem, the people, and the final interface connected.</p>
            </div>
          </div>
          <ol className="stepper">
            <li className="stepper__step" data-reveal>
              <span className="stepper__marker"><b>01</b></span>
              <div><p className="stepper__eyebrow">Listen &amp; learn</p><h3>Understand the real need</h3><p>Start with context, constraints, and the people the product is meant to serve.</p></div>
              <span className="stepper__aside">01 / DISCOVER</span>
            </li>
            <li className="stepper__step" data-reveal>
              <span className="stepper__marker"><b>02</b></span>
              <div><p className="stepper__eyebrow">Frame &amp; focus</p><h3>Make the complex clear</h3><p>Turn scattered information into a useful structure, a clear flow, and a shared direction.</p></div>
              <span className="stepper__aside">02 / DEFINE</span>
            </li>
            <li className="stepper__step" data-reveal>
              <span className="stepper__marker"><b>03</b></span>
              <div><p className="stepper__eyebrow">Design &amp; build</p><h3>Bring the idea into view</h3><p>Explore the interface, test the interaction, and build responsive components with care.</p></div>
              <span className="stepper__aside">03 / CREATE</span>
            </li>
            <li className="stepper__step" data-reveal>
              <span className="stepper__marker"><b>04</b></span>
              <div><p className="stepper__eyebrow">Test &amp; refine</p><h3>Finish the details that matter</h3><p>Check accessibility, clarity, and behavior across devices—then refine what needs work.</p></div>
              <span className="stepper__aside">04 / REFINE</span>
            </li>
          </ol>
        </section>

        <section className="about-section" id="about" aria-labelledby="about-title">
          <div className="page-wrap about-section__inner">
            <div className="section-label"><span>01</span><p className="eyebrow">Professional summary</p></div>
            <div className="about-section__copy" data-reveal>
              <h2 id="about-title">Professional Summary</h2>
              <p className="about-section__headline">I move between <em>product thinking, visual design,</em> and frontend engineering.</p>
              <div className="about-section__details">
                <p>{profile.about}</p>
                <p className="about-section__location"><span>BASED IN</span>{profile.location}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="work-section page-wrap" id="work" aria-labelledby="work-title">
          <div className="section-heading" data-reveal>
            <div className="section-label"><span>02</span><p className="eyebrow">Selected projects</p></div>
            <div className="section-heading__copy">
              <h2 id="work-title">Selected projects</h2>
              <p>Self-initiated product concepts exploring product design, UX research, prototyping, React, and accessible interaction. These are concept case studies, not shipped client projects.</p>
            </div>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <article className={`project-card project-card--${project.variant}`} key={project.name} data-reveal style={{ '--reveal-delay': `${index * 100}ms` }}>
                <ProjectGraphic variant={project.variant} name={`0${index + 1}`} />
                <div className="project-card__details">
                  <div className="project-card__meta"><span>Personal concept</span><span>{String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span></div>
                  <div className="project-card__title-row">
                    <h3>{project.name}</h3>
                    <span className="project-card__arrow" aria-hidden="true"><ArrowIcon diagonal /></span>
                  </div>
                  <p className="project-card__description">{project.description}</p>
                  <ul className="tag-list" aria-label={`${project.name} disciplines`}>
                    {project.skills.map((skill) => <li key={skill}>{skill}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="skills-section" id="skills" aria-labelledby="skills-title">
          <div className="page-wrap skills-section__inner">
            <div className="skills-section__intro" data-reveal>
              <div className="section-label"><span>03</span><p className="eyebrow">Core skills</p></div>
              <h2 id="skills-title">Core skills</h2>
              <p>From the first rough sketch to the last detail in the browser.</p>
            </div>
            <div className="skills-grid">
              {skills.map((group, index) => (
                <article className="skill-group" key={group.title} data-reveal style={{ '--reveal-delay': `${index * 90}ms` }}>
                  <span className="skill-group__index">0{index + 1}</span>
                  <h3>{group.title}</h3>
                  <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {profile.email && (
          <section className="contact-section page-wrap" id="contact" aria-labelledby="contact-title">
            <div className="contact-section__inner">
              <p className="eyebrow">04 — Next up</p>
              <h2 id="contact-title">Have a thoughtful<br />thing in mind?</h2>
              <p className="contact-section__note">I’m open to select opportunities and remote collaboration.</p>
              <a className="button button--light" href={`mailto:${profile.email}`}>Get in touch <ArrowIcon diagonal /></a>
              <span className="contact-section__ornament" aria-hidden="true">✳</span>
            </div>
          </section>
        )}
      </main>

      <footer className="site-footer page-wrap">
        <a className="wordmark wordmark--footer" href="#top" aria-label="Back to top">
          <span className="wordmark__mark">RP</span>
          <span className="wordmark__name">Roan Pantalla<span>Designed &amp; built with care</span></span>
        </a>
        <div className="footer-bottom">
          <span>© {currentYear} {profile.name}</span>
          <span>{profile.location}</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </>
  )
}

export default App

import { profile } from '../data/portfolio'
import Footer from './Footer'
import MobileNavigation from './MobileNavigation'
import Navigation from './Navigation'
import ResumeLink from './ResumeLink'
import SocialLinks from './SocialLinks'

/**
 * One DOM tree for both breakpoints so the page keeps exactly one <h1>.
 * Below `lg` it becomes a fixed 64px top bar (brand + menu); from `lg` up it
 * is a full-height sticky column that stays in view while the content
 * scrolls. Sticky rather than fixed keeps a single scroll context, which is
 * friendlier to touch, keyboard and anchor navigation.
 */
export default function Sidebar({ activeId }) {
  return (
    <aside
      aria-label="Introduction"
      className="fixed inset-x-0 top-0 z-40 border-b border-line bg-surface/90 backdrop-blur-md lg:sticky lg:top-0 lg:z-0 lg:flex lg:h-screen lg:w-[42%] lg:shrink-0 lg:flex-col lg:justify-between lg:overflow-y-auto lg:border-0 lg:bg-transparent lg:py-[clamp(2.5rem,6vh,6rem)] lg:backdrop-blur-none"
    >
      <div className="flex h-16 items-center justify-between px-6 sm:h-20 sm:px-10 lg:h-auto lg:px-0">
        <a
          href="#top"
          className="group inline-flex items-baseline transition-opacity duration-300 hover:opacity-80"
        >
          <h1 className="text-lg font-semibold tracking-tight text-ink sm:text-xl lg:text-[2rem] lg:font-bold lg:leading-none lg:tracking-[-0.045em]">
            {profile.name}
          </h1>
        </a>

        <div className="flex items-center lg:hidden">
          <MobileNavigation activeId={activeId} />
        </div>
      </div>

      <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-between lg:gap-8 lg:pt-8">
        <div className="max-w-[23rem]">
          <p className="text-lg font-medium tracking-tight text-ink">{profile.role}</p>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2">{profile.intro}</p>

          <div className="mt-10">
            <Navigation activeId={activeId} />
          </div>
        </div>

        <div className="max-w-[23rem] space-y-5">
          <SocialLinks className="-ml-2.5" />
          <ResumeLink />
          <Footer className="pt-2" />
        </div>
      </div>
    </aside>
  )
}

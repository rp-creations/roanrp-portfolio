# BAN. — Developer Portfolio

A minimalist, typography-driven developer portfolio built with React, Vite and
Tailwind CSS v4. Fixed-feeling sidebar, scrollable content column, scroll-spy
navigation, and restrained motion.

## Stack

| Concern     | Choice                                                 |
| ----------- | ------------------------------------------------------ |
| Framework   | React 19 + Vite 8                                      |
| Styling     | Tailwind CSS v4 (`@theme` design tokens)               |
| Icons       | `lucide-react` + inline brand marks                    |
| Type        | Self-hosted Inter Variable (`@fontsource-variable`)     |
| Interaction | IntersectionObserver + CSS transitions (no animation lib) |
| Routing     | None — it is a single scrolling document, so hash links + scroll-spy are the correct tool |

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
npm run preview  # serve the production build
```

## Editing content

Everything lives in **`src/data/portfolio.js`**. Components never hard-code
personal information, so content changes never require touching JSX.

### Before publishing

- [ ] `profile.email` — replace `hello@example.com`
- [ ] `profile.github` — replace `https://github.com/your-handle`
- [ ] `profile.linkedin` — replace `https://linkedin.com/in/your-handle`
- [ ] `profile.resume` — add the PDF to `public/`, then set `profile.resume = '/resume.pdf'`
- [ ] `projects[].links.github` / `.demo` — set real URLs, or leave `null` to hide the icon
- [ ] Add project screenshots to `src/assets/projects/` (see that folder's README)

Until `profile.resume` is set, the résumé buttons render as inert
"Résumé coming soon" text — the site never links to a file that does not exist.
Unknown URLs and the placeholder email are also flagged inline with
`TODO(replace)` comments and, while running in dev mode, by a note in the
Contact section.

### Adding project screenshots

Drop `casamie.webp`, `barbershop.webp` or `java-gui.webp` into
`src/assets/projects/`. A glob import picks them up by filename, so no code
changes are needed. Missing images fall back to an abstract wireframe frame.

## Structure

```
src/
  components/       Sidebar, MobileNavigation, Navigation, SectionHeading,
                    ExperienceItem, ProjectCard, ProjectMedia, SkillGroup,
                    SocialLinks, Footer, Reveal, ResumeLink, BrandIcons
  sections/         Hero, About, Experience, Projects, Skills, Contact
  hooks/            useActiveSection (IntersectionObserver scroll-spy)
  data/             portfolio.js — all copy, links, projects, skills
  assets/projects/  optional screenshots
  App.jsx  main.jsx  index.css
```

## Design notes

- **Layout:** sticky full-height sidebar (42%) + content column on desktop.
  Sticky rather than `position: fixed` keeps one scroll context, which is
  better for touch, keyboard scrolling and anchor offsets.
- **Tokens:** colour, type and easing live in the `@theme` block of
  `src/index.css`. Palette: `#0F172A` / `#111C30` surfaces, `#E2E8F0` text,
  `#94A3B8` secondary, `#5EEAD4` accent.
- **Contrast:** `#64748B` is reserved for decorative marks only (rules, dots,
  aria-hidden numerals). Anything a reader needs uses `#94A3B8` or brighter,
  which clears WCAG AA on the navy background.
- **Motion:** reveals are one-shot IntersectionObserver animations that
  disconnect after firing. `prefers-reduced-motion: reduce` disables them and
  forces every reveal to its visible state.

## Accessibility

- Semantic landmarks, one `<h1>`, ordered heading levels.
- Skip link, visible focus rings, `aria-current` on the active nav item.
- Mobile drawer: `role="dialog"`, `aria-modal`, focus trap, Escape to close,
  scroll lock, focus restored to the trigger, focus moved to the target section
  after navigating.
- Decorative graphics are `aria-hidden`; project images carry alt text.
- Touch targets are 44px; reduced-motion and no-JS states are both handled.

## Known placeholders

The build is complete and functional, but these are intentionally unset:
email, GitHub, LinkedIn, résumé PDF, project links and screenshots. See the
checklist above.

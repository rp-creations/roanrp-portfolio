# Roan Pantalla — Developer Portfolio

A typography-driven developer portfolio built with React, Vite, and Tailwind CSS v4.
A sticky profile column on desktop, a single scrolling content column, scroll-spy
navigation, and deliberately restrained motion.

**Live:** [roanrp-portfolio.vercel.app](https://roanrp-portfolio.vercel.app/)

## Stack

| Concern     | Choice                                                       |
| ----------- | ------------------------------------------------------------ |
| Framework   | React 19 + Vite 8                                            |
| Styling     | Tailwind CSS v4 (`@theme` design tokens)                     |
| Icons       | `lucide-react` + inline brand marks                          |
| Type        | Self-hosted Inter Variable (`@fontsource-variable`)          |
| Interaction | IntersectionObserver + CSS transitions (no animation library) |
| Routing     | None — one scrolling document; hash links + scroll-spy       |
| Hosting     | Vercel, static output                                        |

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
npm run preview  # serve the production build
```

Node 22 is pinned in `package.json` (`.nvmrc`-style `engines`).

## Editing content

All copy, links, projects, and skills live in **`src/data/portfolio.js`**.
Components never hard-code personal information.

| Task                     | Where                                              |
| ------------------------ | -------------------------------------------------- |
| Update bio / hero        | `profile`, `hero`, `about`                         |
| Add a project            | `projects[]`                                       |
| Update work history      | `experiences[]`                                    |
| Change availability      | `profile.availability`, `hero.availability`        |
| Replace the résumé       | `public/resume.pdf` — already wired to `profile.resume` |
| Add project screenshots  | `src/assets/projects/` (see its README)            |

Project links are nullable: `github: null` or `demo: null` hides that icon rather
than rendering a dead link.

### Project case studies

A project can include a `caseStudy` object (`title`, `intro`, `sections[]`). When
present, the card renders a **Read case study** button that opens an accessible
modal with focus trapping, Escape-to-close, and scroll lock. `privateSourceNote`
and `accessRequest` render a privacy notice instead of a repository link.

CASMIE uses all three: the repository is intentionally private because the system
holds records about minors. The case study documents the architecture and access
decisions without publishing source, schema, or resident data.

## Project screenshots

Drop `casamie.webp`, `barbershop.webp`, or `java-gui.webp` into
`src/assets/projects/`. A glob import picks files up by filename, so no code
changes are needed. Missing images fall back to an abstract wireframe frame.
Multiple `*.webp` files sharing a project name are shown as a carousel.

## Structure

```text
src/
  components/   Sidebar, Navigation, MobileNavigation, ProjectCard, ProjectMedia,
                Dialog, ExperienceItem, SkillGroup, SectionHeading, Reveal,
                ResumeLink, SocialLinks, Footer, BrandIcons
  sections/     Hero, About, Experience, Projects, Skills, Contact
  hooks/        useActiveSection (IntersectionObserver scroll-spy)
  data/         portfolio.js — all content
  assets/       project screenshots
  App.jsx  main.jsx  index.css
```

## Design notes

- **Layout:** sticky full-height sidebar (42%) + content column on desktop. Sticky
  rather than `position: fixed` keeps one scroll context, which is better for
  touch, keyboard scrolling, and anchor offsets.
- **Tokens:** colour, type, and easing live in the `@theme` block of
  `src/index.css`. Palette: `#0F172A` / `#111C30` surfaces, `#E2E8F0` primary
  text, `#94A3B8` secondary, `#5EEAD4` accent.
- **Contrast:** `#64748B` is reserved for decorative marks only (rules, dots,
  `aria-hidden` numerals). Readable text uses `#94A3B8` or brighter, which clears
  WCAG AA on the navy background.
- **Motion:** reveals are one-shot IntersectionObserver animations that disconnect
  after firing. `prefers-reduced-motion` disables reveals and carousel autoplay.

## Accessibility

- Semantic landmarks, one `<h1>`, ordered heading levels.
- Skip link, visible focus rings, `aria-current` on the active nav item.
- Mobile drawer: `role="dialog"`, `aria-modal`, focus trap, Escape to close,
  scroll lock, focus restored to the trigger, focus moved to the target section.
- Case study modal: same dialog contract, labelled by its heading.
- Carousel: no autoplay under reduced motion; pauses on hover, focus, off-screen,
  and hidden tabs; explicit pause/play button; 44px arrows and 24px dot targets;
  Home/End/arrow keys; polite live counter only while paused.
- Decorative graphics are `aria-hidden`; project images carry descriptive alt text.
- A `<noscript>` summary keeps the key content and links reachable without JS.

## Performance

Production build: ~84 KB gzipped JS, ~9 KB gzipped CSS, self-hosted Inter with
`unicode-range` subsets. Images are lazy-loaded with explicit dimensions. No
client-side routing or animation dependencies.

## Deploy

Vercel is configured in `vercel.json` (static Vite output, immutable asset
caching, and baseline security headers). Any static host works — run
`npm run build` and serve `dist/`.

Before changing domains, update the canonical/OG URLs in `index.html`,
`public/robots.txt`, and `public/sitemap.xml`.

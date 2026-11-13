/* ==================================================================
   PORTFOLIO CONTENT — the only file you need to edit.

  REPLACE BEFORE PUBLISHING
   [ ] projects[].links  → real repository / demo URLs (null = hidden)
   [ ] projects[].image  → automatic; drop casamie.webp, barbershop.webp
                           or java-gui.webp into src/assets/projects/
   ================================================================== */

/**
 * Screenshots are picked up automatically by filename, so adding one is a
 * pure asset drop — no component or data edits required.
 *   src/assets/projects/casamie.webp      → project slug 'casamie'
 */
const projectImages = import.meta.glob('../assets/projects/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
})

function imageFor(slug) {
  const aliases = {
    casamie: ['casamie', 'casmie', 'casmie-project1-screenshot'],
    barbershop: ['barbershop', 'lantin', 'lantin-project2-screenshot'],
    'java-gui': ['java-gui'],
  }

  const match = Object.entries(projectImages).find(([path]) => {
    const file = path.split('/').pop() ?? ''
    const base = file.replace(/\.[^.]+$/, '').toLowerCase()
    return (aliases[slug] ?? [slug]).some((alias) => {
      const normalizedAlias = alias.toLowerCase().replace(/[^a-z0-9]+/g, '')
      const normalizedBase = base.replace(/[^a-z0-9]+/g, '')
      return normalizedBase === normalizedAlias || normalizedBase.includes(normalizedAlias)
    })
  })

  return match ? match[1] : null
}

export const profile = {
  name: 'Roan Pantalla',
  role: 'IT Support & Systems | Full-Stack Developer',
  intro:
    'I build, test, and support practical digital solutions across software, systems, and creative media.',
  location: 'Philippines',
  availability: 'Open to internships',
  email: 'roan.rpantalla@gmail.com',
  github: 'https://github.com/rp-creations',
  facebook: 'https://facebook.com/roan.rpantalla',
  resume: '/resume.pdf',
}

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export const hero = {
  availability: 'Open to internships',
  location: 'Philippines',
  headline: 'Building digital experiences through code and creativity.',
  description:
    'I build and test web applications, integrate AI services, and bring hands-on interest in technical support and system administration.',
  primaryCta: { label: 'View Projects', href: '#projects' },
  secondaryCta: { label: 'Contact Me', href: '#contact' },
}

export const about = {
  index: 1,
  label: 'About',
  paragraphs: [
    "I'm Roan Pantalla, an Information Technology student who builds and improves practical digital solutions. I turn project requirements into usable applications, then test the workflows and refine the details that make them dependable.",
    'My experience spans full-stack development, software QA, AI provider API integration, technical troubleshooting, and system administration fundamentals. I work with PHP, MySQL, JavaScript, and React, and I approach unfamiliar problems by investigating, testing, and documenting what I find.',
    'I also bring a creative side through video editing and hands-on work with Adobe Photoshop and Illustrator. I value clear communication, reliable implementation, and work that solves a real need.',
  ],
  focus: [
    'Technical support & systems',
    'Software QA & AI integration',
    'Full-stack development',
    'Mobile app development',
  ],
}

/**
 * Project-based experience, led by the type of work rather than the project name.
 * No employment history is implied.
 * `period` is intentionally null — no dates have been verified, so the
 * component omits the field rather than inventing a timeline.
 */
export const experiences = [
  {
    id: 'casamie',
    role: 'Full-Stack Web Development',
    project: 'Casa Miani Management Portal',
    context: 'Academic capstone',
    period: '2026-Present',
    description:
      'Built and tested core application workflows for an academic capstone, translating administrative needs into a secure, database-backed platform and adding AI-provider API integration.',
    highlights: [
      'Designed and implemented role-based permissions for administrative, staff, and finance workflows, restricting access to sensitive records by user role.',
      'Modeled the relational database for child, staff, donation, and financial records, centralizing information used across the platform.',
      'Integrated an external AI provider API to connect CASMIE with AI-powered capabilities.',
      'Tested key workflows and role permissions, identified defects, and refined behavior during project validation.',
      'Added PWA support and audit logging to improve access during unreliable connectivity and trace important record changes.',
    ],
    technologies: ['PHP', 'JavaScript', 'MySQL/MariaDB', 'Tailwind CSS', 'PWA', 'AI Provider API'],
  },
  {
    id: 'rp-creations',
    role: 'Independent Web Developer',
    project: 'RP Creations',
    context: 'Paid project work',
    period: '2024-Present',
    description:
      'Ran small paid web projects under the RPCreations name — some built from scratch, others repaired and extended from existing code. Each brief carried its own requirements, deadline, and handover, from booking flows to records-management systems.',
    highlights: [
      'Scoped and delivered small builds end to end: requirements, Figma UI, implementation, and handover.',
      'Built full-stack features with PHP, MySQL, and HTML/CSS/JavaScript.',
      'Repaired and extended existing codebases, isolating faults without breaking surrounding behavior.',
      'Adapted delivery across different briefs rather than repeating a single template.',
    ],
    technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS', 'Figma'],
  },
  {
    id: 'barbershop',
    role: 'Locally Hosted Web Application',
    project: 'Barbershop Management System',
    context: 'Collaborative project',
    period: null,
    description:
      'Delivered full-stack booking features as part of a collaborative project, replacing manual scheduling steps with a centralized appointment workflow.',
    highlights: [
      'Implemented appointment scheduling and booking-management flows for customers and staff.',
      'Added server-side availability checks to reject overlapping bookings and reduce scheduling conflicts.',
      'Connected services, staff, and booking history to the database for consistent records.',
    ],
    technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    id: 'video-editing',
    role: 'Video Editing',
    project: 'Independent Video Editing',
    context: 'Independent creative work',
    period: '2025-Present',
    description:
      'Edited video content by assembling footage, shaping pacing, and refining the visual and audio flow for a more polished final piece.',
    highlights: [
      'Selected and arranged clips into clear, engaging sequences.',
      'Refined pacing, transitions, and audio continuity during editing.',
    ],
    technologies: ['Video Editing'],
  },
  {
    id: 'java-gui',
    role: 'Java Application Development',
    project: 'Java GUI Application',
    context: 'Independent coursework',
    period: null,
    description:
      'A desktop application built independently in Java to practice GUI construction, event handling, and structured program design outside of the browser.',
    highlights: [],
    technologies: ['Java', 'Swing'],
  },
]

/**
 * Awards &amp; recognition, shown as a compact block beneath the Experience
 * timeline. Leave the array empty to hide the block entirely — nothing
 * renders until there is real content, so no placeholder is ever shown.
 *
 * Only list things you can back up if asked: a placement, a distinction,
 * a judged result. Attending a seminar is not an award.
 *
 * Shape: { id, title, issuer, year, note? }
 * Example:
 *   {
 *     id: 'capstone-2026',
 *     title: 'Best Capstone Project',
 *     issuer: 'CBSAA IT Department',
 *     year: '2026',
 *     note: 'Selected from 12 competing teams',
 *   },
 */
export const awards = [
  {
    id: 'outstanding-computer-programming',
    title: 'Outstanding in Computer Programming',
  },
  {
    id: 'outstanding-database-management',
    title: 'Outstanding in Database Management',
  },
  {
    id: 'outstanding-data-structures',
    title: 'Outstanding in Data Structure & Algorithm',
  },
  {
    id: 'deans-lister',
    title: "Dean's Lister",
    year: '2024–2025',
    note: 'Four consecutive terms',
  },
]

export const projects = [
  {
    index: '01',
    slug: 'casamie',
    title: 'CASMIE',
    subtitle: 'Casa Miani Management System',
    context: 'Academic capstone',
    description:
      'Built and validated core workflows for child, staff, donation, and financial records, including role-based access, audit logging, PWA support, and AI provider API integration.',
    highlights: [
      'Role-based access control.',
      'Database-driven management.',
      'Progressive Web App functionality.',
      'Audit logging and security-focused features.',
      'Structured child and staff management.',
      'AI provider API integration and workflow testing.',
    ],
    technologies: ['PHP', 'JavaScript', 'MySQL/MariaDB', 'Tailwind CSS', 'AI Provider API'],
    image: imageFor('casamie'),
    imageAlt: 'CASMIE management system dashboard',
    links: {
      github: null, // TODO(replace): repository URL
      demo: 'https://casmie.cbsuait2026.com',
    },
  },
  {
    index: '02',
    slug: 'barbershop',
    title: 'Barbershop Management System',
    subtitle: 'Appointment Scheduling Platform',
    context: 'Collaborative project · full-stack responsibilities',
    description:
      'A web-based appointment scheduling and management platform designed to replace manual booking processes and reduce scheduling conflicts.',
    highlights: [
      'Online appointment scheduling.',
      'Booking management.',
      'Prevention of double bookings.',
      'Database integration.',
    ],
    technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
    image: imageFor('barbershop'),
    imageAlt: 'Barbershop appointment scheduling interface',
    links: {
      github: 'https://github.com/rp-creations/lantin-barbershop', // TODO(replace): repository URL
      demo: null, // TODO(replace): live demo URL
    },
  },
  {
    index: '03',
    slug: 'java-gui',
    title: 'Java GUI Application',
    subtitle: 'Desktop Application',
    context: 'Independent project',
    description:
      'A Java desktop application developed independently, demonstrating GUI development, application logic, and structured programming.',
    highlights: [],
    technologies: ['Java', 'Swing'],
    image: imageFor('java-gui'),
    imageAlt: 'Java desktop application interface',
    links: {
      github: null, // TODO(replace): repository URL
      demo: null, // TODO(replace): live demo URL
    },
  },
]

export const skillGroups = [
  {
    label: 'Programming',
    items: ['PHP', 'JavaScript', 'SQL', 'HTML5', 'CSS3'],
  },
  {
    label: 'Frameworks & Libraries',
    items: ['React', 'Tailwind CSS', 'Bootstrap'],
  },
  {
    label: 'Databases',
    items: ['MySQL', 'MariaDB'],
  },
  {
    label: 'Development',
    items: [
      'Full-Stack Web Development',
      'API Integration',
      'Responsive Web Development',
      'Progressive Web Applications',
      'Role-Based Access Control',
      'Database Design',
      'Debugging & Testing',
    ],
  },
  {
    label: 'Tools',
    items: ['Git', 'GitHub', 'VS Code', 'Capcut', 'Figma', 'Adobe Photoshop', 'Adobe Illustrator'],
  },
  {
    label: 'IT & Quality',
    items: [
      'Technical Support & Troubleshooting',
      'System Administration',
      'Software QA Testing',
      'AI Provider API Integration',
    ],
  },
  {
    label: 'Other',
    items: ['UI/UX Design', 'Video Editing', 'Content Creation'],
  },
]

export const contact = {
  index: 5,
  label: 'Contact',
  heading: "Let's build something meaningful.",
  description:
    "I'm open to internship opportunities, collaborative projects, and opportunities to grow as a developer. If you have something in mind, my inbox is open.",
}

export const footer = {
  note: 'Designed and developed with care.',
}

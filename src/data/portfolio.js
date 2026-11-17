
const projectImages = import.meta.glob('../assets/projects/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
})

function imagesFor(slug) {
  const aliases = {
    casamie: ['casamie', 'casmie'],
    barbershop: ['barbershop', 'lantin'],
    'java-gui': ['java-gui'],
  }

  return Object.entries(projectImages)
    .filter(([path]) => {
      const file = path.split('/').pop() ?? ''
      const base = file.replace(/\.[^.]+$/, '').toLowerCase()
      return (aliases[slug] ?? [slug]).some((alias) => {
        const normalizedAlias = alias.toLowerCase().replace(/[^a-z0-9]+/g, '')
        const normalizedBase = base.replace(/[^a-z0-9]+/g, '')
        return normalizedBase === normalizedAlias || normalizedBase.includes(normalizedAlias)
      })
    })
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, url]) => url)
}

export const profile = {
  name: 'Roan Pantalla',
  role: 'Full-Stack Developer & IT Student',
  intro:
    'I build, test, and support practical web systems — from database design to deployment and handover.',
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
  headline: 'I build database-backed web systems that hold up in daily use.',
  description:
    'Full-stack work in PHP, MySQL, and React — including a 29-table management portal with role-based access, audit logging, and AI integration. I also handle QA, troubleshooting, and technical support.',
  primaryCta: { label: 'View Projects', href: '#projects' },
  secondaryCta: { label: 'Contact Me', href: '#contact' },
}

export const about = {
  index: 1,
  label: 'About',
  paragraphs: [
    "I'm a BS Information Technology student at Central Bicol State University of Agriculture – Sipocot, graduating in 2027. I build full-stack web applications, handling both the database and the user interface. My projects include CASMIE, a multi-role management system for a child-care home, and a booking app for a photography business.",
    "I work mainly with PHP, MySQL, JavaScript, and React. Beyond development, I have experience in software QA and basic troubleshooting. When I hit an unfamiliar problem, I investigate, test, and document what I find so the next person can follow it.",
    "Outside of code, I edit video and design in Adobe Photoshop and Illustrator. I'm looking for an internship or OJT role where I can keep building real systems and learn from experienced developers.",
  ],
  focus: [
    'Full-stack web development',
    'Software QA & troubleshooting',
    'Technical support & systems',
    'Third-party LLM API integration',
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
    role: 'Freelance Software Development',
    project: 'RP Creations',
    context: 'Paid project work',
    period: '2024-Present',
    description:
      'Ran small paid web projects under the RPCreations name — some built from scratch, others repaired and extended from existing code. Each brief carried its own requirements, deadline, and handover, from booking flows to records-management systems.',
    highlights: [
      'Delivered project-based software development and technical assistance within 6+ client projects.',
      'Built full-stack features with PHP, MySQL, and HTML/CSS/JavaScript.',
      'Developed application features, modules, and functionality based on client requirements.',
      'Collaborated with clients throughout development to refine requirements and deliver working solutions.',
    ],
    technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS', 'Figma'],
  },
  {
    id: 'barbershop',
    role: 'Full-Stack Web Development',
    project: 'Lantin Barbershop Management System',
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
    project: 'Photography Booking Desktop App',
    context: 'Coursework project',
    period: null,
    description:
      'A desktop appointment booking application for a photography business, built in Java to practise GUI construction, event handling, and structured program design outside of the browser.',
    highlights: [],
    technologies: ['Java', 'Swing'],
  },
]


export const awards = [
  {
    id: 'outstanding-computer-programming',
    title: 'Outstanding in Computer Programming',
    year: '2023–2024',
  },
  {
    id: 'outstanding-database-management',
    title: 'Outstanding in Database Management',
    year: '2024–2025',
  },
  {
    id: 'outstanding-data-structures',
    title: 'Outstanding in Data Structure & Algorithm',
    year: '2024–2025',
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
    context: 'Academic capstone · deployed',
    description:
      'A web-based management system for a residential child-care home, built as a Progressive Web App. It runs on a 29-table MySQL database and supports three user roles (Director, Social Worker, and Religious), each with its own access. Built with PHP, JavaScript, Tailwind CSS, and MySQL.',
    highlights: [
      'Role-based access control.',
      'Database-driven management.',
      'Progressive Web App functionality.',
      'Audit logging and security-focused features.',
      'Structured child and staff management.',
      'AI integration and workflow testing.',
    ],
    technologies: ['PHP', 'JavaScript', 'MySQL/MariaDB', 'Tailwind CSS', 'AI Provider API'],
    images: imagesFor('casamie'),
    imageAlt: 'Casa Miani public portal landing page',
    links: {
      github: null, // Intentionally private: the system holds records about minors.
      demo: 'https://casmie.cbsuait2026.com',
    },
    privateSourceNote:
      'Source is private. This is a deployed system for a child-care organization, so the repository and resident records stay closed. The screenshot shows the public landing page only — no resident data is published.',
    accessRequest: {
      label: 'Request a code walkthrough',
      href: 'mailto:roan.rpantalla@gmail.com?subject=CASMIE%20code%20walkthrough',
    },
    caseStudy: {
      title: 'A records system built for accountability',
      intro:
        'Casa Miani MRV Jr. is a residential child-care home. CASMIE replaces scattered records with one workspace for child profiles, weekly behaviour observations, donations, finances, and staff accountability.',
      sections: [
        {
          heading: 'The problem',
          body:
            'The home needed child records, behaviour observations, donations, and expenses in one place — with a clear answer to who changed what. Information spread across separate files makes handover harder and accountability weaker.',
        },
        {
          heading: 'Constraints that shaped the design',
          items: [
            'Records concern minors, so access had to be scoped by role rather than filtered in the interface.',
            'Three distinct roles — Director, Social Worker, and Religious — each needed a different view of the same data.',
            'Connectivity at the site is unreliable, so the portal had to stay usable when the network drops.',
            'The work ran on an academic capstone timeline alongside coursework.',
          ],
        },
        {
          heading: 'What I built',
          items: [
            'A 29-table MySQL schema covering children, staff, donations, expenses, behaviour observations, users, roles, and audit logs.',
            'Role-based permissions across administrative, staff, and finance workflows.',
            'A Progressive Web App shell so the portal remains usable on weak connections.',
            'Audit logging for record changes, plus security-focused hardening.',
            'An external AI provider API integration to add assisted capabilities.',
            'Workflow and permission testing ahead of project validation.',
          ],
        },
        {
          heading: 'Privacy decisions',
          items: [
            'The repository stays private. No source, schema, or configuration is published.',
            'Screenshots show the public landing page only — never child profiles, case notes, or financial records.',
            'The staff portal sits behind authentication; walkthroughs are shared on request rather than through a public demo account.',
            'Any future admin-UI screenshots would use a seeded dataset with identifying fields removed first.',
          ],
        },
        {
          heading: 'Outcome',
          body:
            'Deployed and publicly reachable, and submitted as the capstone project. It is the project that taught me the most about designing for accountability — permissions, audit trails, and data handling are features, not afterthoughts.',
        },
      ],
    },
  },
  {
    index: '02',
    slug: 'barbershop',
    title: 'Lantin Barbershop',
    subtitle: 'Management & Sales System',
    context: 'Collaborative project · full-stack responsibilities',
    description:
      'A management system for a local barbershop, built as the sole full-stack developer on a two-person team. Covers appointments, barber staffing, inventory, and daily sales. Built with PHP and MySQL.',
    highlights: [
      'Online appointment scheduling.',
      'Booking management.',
      'Prevention of double bookings.',
      'Inventory and sales tracking.',
      'Database integration.',
    ],
    technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
    images: imagesFor('barbershop'),
    imageAlt: 'Lantin Barbershop dashboard overview',
    links: {
      github: 'https://github.com/rp-creations/lantin-barbershop',
      demo: null,
    },
  },
  {
    index: '03',
    slug: 'java-gui',
    title: 'Photography Booking App',
    subtitle: 'Java Swing desktop application',
    context: 'Coursework · collaborative',
    description:
      'A desktop appointment booking app for a photography business, with booking categories such as weddings and birthdays. Built with Java Swing as a two-person coursework project.',
    highlights: [],
    technologies: ['Java', 'Swing'],
    images: imagesFor('java-gui'),
    imageAlt: 'Java desktop application interface',
    links: {
      github: null,
      demo: null,
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

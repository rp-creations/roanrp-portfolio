import { Mail } from 'lucide-react'
import { profile } from '../data/portfolio'
import { FacebookIcon, GithubIcon } from './BrandIcons'

const links = [
  {
    key: 'github',
    label: 'GitHub',
    href: profile.github,
    Icon: GithubIcon,
    external: true,
  },
  {
    key: 'facebook',
    label: 'Facebook',
    href: profile.facebook,
    Icon: FacebookIcon,
    external: true,
  },
  {
    key: 'email',
    label: 'Email',
    href: profile.email ? `mailto:${profile.email}` : null,
    Icon: Mail,
    external: false,
  },
]

export default function SocialLinks({ className = '' }) {
  const available = links.filter((link) => Boolean(link.href))

  if (available.length === 0) return null

  return (
    <ul className={`flex items-center gap-1 ${className}`.trim()}>
      {available.map(({ key, label, href, Icon, external }) => (
        <li key={key}>
          <a
            href={href}
            {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ink-2 transition-colors duration-300 ease-soft hover:bg-white/5 hover:text-accent"
          >
            <Icon size={19} />
            <span className="sr-only">
              {label}
              {external ? ' (opens in a new tab)' : ''}
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}

'use client'

import { Heart, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/common/Icons'
import aboutData from '@/data/about.json'

const iconByKey = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  mail: Mail,
} as const

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="mt-20 border-t font-mono transition-colors duration-300"
      style={{
        borderColor: 'var(--border-tertiary)',
        backgroundColor: 'var(--bg-elevated)',
      }}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <div className="flex flex-col items-center gap-1 text-center sm:items-start sm:text-left">
          <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
            Fabio Santana
          </p>
          <p className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>
            Engenharia de Software • Desenvolvedor Independente
          </p>
        </div>

        <ul className="flex items-center gap-3">
          {aboutData.socialLinks.map((link) => {
            const Icon = iconByKey[link.icon as keyof typeof iconByKey] ?? Mail
            const isMail = link.icon === 'mail'

            return (
              <li key={link.label}>
                <a
                  href={link.url}
                  {...(isMail ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                  aria-label={isMail ? 'Enviar e-mail' : `Perfil no ${link.label}`}
                  className="block rounded-lg border p-2 transition-all duration-200 outline-none hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[var(--border-primary)]"
                  style={{
                    backgroundColor: 'var(--bg-elevated-solid)',
                    borderColor: 'var(--border-transparent)',
                    color: 'var(--text-primary)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-primary)'
                    e.currentTarget.style.boxShadow = 'var(--shadow-hover-sm)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-transparent)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <Icon className="size-4" aria-hidden="true" />
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-1 text-[11px]" style={{ color: 'var(--text-quaternary)' }}>
          <span>© {currentYear} • Construído com</span>
          <Heart className="size-3 fill-red-500 text-red-500" aria-hidden="true" />
        </div>
      </div>
    </footer>
  )
}

export default Footer

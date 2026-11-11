'use client'

import { Clock, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/common/Icons'
import aboutData from '@/data/about.json'

const iconByKey = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  mail: Mail,
} as const

export function ContactChannels() {
  return (
    <div className="flex h-full flex-col justify-between gap-6">
      <div>
        <h3 className="mb-2 text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
          Canais diretos
        </h3>

        <p className="mb-4 text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Prefere falar sem formulário? Me encontre por aqui:
        </p>

        <ul className="flex flex-col gap-2.5">
          {aboutData.socialLinks.map((link) => {
            const Icon = iconByKey[link.icon as keyof typeof iconByKey] ?? Mail
            const isMail = link.icon === 'mail'

            return (
              <li key={link.label}>
                <a
                  href={link.url}
                  {...(isMail ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                  className="flex items-center gap-3 rounded-lg border p-3 text-xs transition-all duration-200 outline-none hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[var(--border-primary)]"
                  style={{
                    backgroundColor: 'var(--bg-elevated)',
                    borderColor: 'var(--border-tertiary)',
                    color: 'var(--text-primary)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-primary)'
                    e.currentTarget.style.boxShadow = 'var(--shadow-hover-sm)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-tertiary)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <Icon className="size-4 shrink-0" aria-hidden="true" />
                  <span className="flex min-w-0 flex-col">
                    <span className="font-semibold">{link.label}</span>
                    <span className="truncate text-[11px]" style={{ color: 'var(--text-tertiary)' }}>
                      {link.url.replace(/^mailto:/, '')}
                    </span>
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>

      <p
        className="flex items-center gap-2 rounded-lg border p-3 text-[11px] leading-relaxed"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border-tertiary)',
          color: 'var(--text-tertiary)',
        }}
      >
        <Clock className="size-3.5 shrink-0" aria-hidden="true" />
        Respondo geralmente em até 24 horas úteis.
      </p>
    </div>
  )
}

export default ContactChannels

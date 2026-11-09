'use client'

import { ArrowRight, Mail, Globe, Code2 } from 'lucide-react'
import Mascote from '@/components/Mascot/Menon'

type UnderConstructionProps = {
  pageName?: string
  description?: string
}

export function UnderConstruction({
  pageName,
  description = 'A better version is being developed right now.',
}: UnderConstructionProps) {
  return (
    <main className="mx-auto max-w-3xl px-6 pt-15 pb-12">
      <div className="flex flex-col items-center text-center">
        <div
          className="page-enter"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            marginBottom: 20,
            transform: 'scale(0.82)',
            transformOrigin: 'center',
          }}
        >
          <Mascote estado="trabalhando" tamanho={70} />
         
        </div>

        <h1 className="mb-3 text-2xl font-bold tracking-tight sm:text-4xl" style={{ color: 'var(--text-primary)' }}>
          {pageName ? `${pageName} em construção` : 'Under construction'}
        </h1>

      <p className="mb-8 max-w-md text-sm leading-relaxed sm:text-base" style={{ color: 'var(--text-tertiary)' }}>
          Volte e veja o resultado depois.
        </p>

        <p className="mb-2 max-w-md text-sm leading-relaxed sm:text-base" style={{ color: 'var(--text-tertiary)' }}>
          {description}
        </p>

        

        <div className="mb-12 flex flex-wrap justify-center gap-4">
          <a
            href="https://github.com/fabiosantanarp"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm transition-all duration-300"
            style={{
              backgroundColor: 'var(--bg-elevated-solid)',
              borderColor: 'var(--border-transparent)',
              color: 'var(--text-primary)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-primary)'
              e.currentTarget.style.boxShadow = 'var(--shadow-hover)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-transparent)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <Code2 className="size-4" style={{ color: 'var(--icon-primary)' }} />
            <span>GitHub</span>
          </a>

          <a
            href="https://fabiosantana.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm transition-all duration-300"
            style={{
              backgroundColor: 'var(--bg-elevated-solid)',
              borderColor: 'var(--border-transparent)',
              color: 'var(--text-primary)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-primary)'
              e.currentTarget.style.boxShadow = 'var(--shadow-hover)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-transparent)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <Globe className="size-4" style={{ color: 'var(--icon-primary)' }} />
            <span>Portfólio</span>
          </a>

          <a
            href="mailto:contato@fabiosantana.dev"
            className="group flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm transition-all duration-300"
            style={{
              backgroundColor: 'var(--bg-elevated-solid)',
              borderColor: 'var(--border-transparent)',
              color: 'var(--text-primary)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-primary)'
              e.currentTarget.style.boxShadow = 'var(--shadow-hover)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-transparent)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <Mail className="size-4" style={{ color: 'var(--icon-primary)' }} />
            <span>Contato</span>
          </a>
        </div>

        <div
          className="flex items-center gap-2 rounded-full border px-4 py-2 text-xs"
          style={{
            borderColor: 'var(--border-tertiary)',
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-secondary)',
          }}
        >
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Desenvolvendo nova interface • Previsão em breve</span>
          <ArrowRight className="size-3" />
        </div>
      </div>
    </main>
  )
}

export default UnderConstruction

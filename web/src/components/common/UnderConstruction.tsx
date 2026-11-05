import { ArrowRight, Mail, Globe, Code2 } from 'lucide-react'
import Mascote from '@/components/Mascote/Mascote'

type UnderConstructionProps = {
  pageName?: string
  description?: string
}

export function UnderConstruction({
  pageName,
  description = 'A better version is being developed right now.',
}: UnderConstructionProps) {
  return (
    <main className="mx-auto max-w-3xl px-6 pt-20 pb-12">
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
          <Mascote estado="trabalhando" tamanho={120} />
          <div
            aria-hidden="true"
            style={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              border: '5px solid var(--mascote-b)',
              background: 'var(--bg-secondary)',
              boxShadow: 'inset 0 0 0 4px var(--bg-tertiary)',
              animation: 'construcao-engrenagem 3s linear infinite',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 15,
                borderRadius: '50%',
                border: '4px solid var(--mascote-y)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 6,
                borderRadius: '50%',
                border: '2px solid var(--mascote-r)',
              }}
            />
          </div>
        </div>

        <h1 className="mb-3 text-2xl font-bold tracking-tight sm:text-4xl" style={{ color: 'var(--text-primary)' }}>
          {pageName ? `${pageName} under construction` : 'Under construction'}
        </h1>

        <p className="mb-2 max-w-md text-sm leading-relaxed sm:text-base" style={{ color: 'var(--text-tertiary)' }}>
          {description}
        </p>

        <p className="mb-8 max-w-md text-sm leading-relaxed sm:text-base" style={{ color: 'var(--text-tertiary)' }}>
          Come back soon to see the result.
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
            GitHub
            <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" style={{ color: 'var(--icon-tertiary)' }} />
          </a>

          <a
            href="https://linkedin.com/in/fabiosantanarp"
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
            LinkedIn
            <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" style={{ color: 'var(--icon-tertiary)' }} />
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
            Contact
            <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" style={{ color: 'var(--icon-tertiary)' }} />
          </a>
        </div>

        <div className="w-full border-t pt-10" style={{ borderColor: 'var(--border-tertiary)' }}>
          <p className="text-xs" style={{ color: 'var(--text-quaternary)' }}>
            &copy; 2026 Fabio Santana. Built with React, TypeScript &amp; Tailwind.
          </p>
        </div>
      </div>
    </main>
  )
}

export default UnderConstruction

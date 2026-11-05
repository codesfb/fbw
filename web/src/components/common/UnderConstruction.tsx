import { Construction, ArrowRight, Mail, Globe, Code2 } from 'lucide-react'

type UnderConstructionProps = {
  pageName?: string
  description?: string
}

export function UnderConstruction({
  pageName,
  description = 'Uma versão melhor está sendo desenvolvida agora mesmo.',
}: UnderConstructionProps) {
  return (
    <main className="mx-auto max-w-3xl px-6 pt-32 pb-20">
      <div className="page-enter flex flex-col items-center text-center">
        <div
          className="mb-8 rounded-lg border p-4"
          style={{
            backgroundColor: 'var(--bg-elevated-solid)',
            borderColor: 'var(--border-primary)',
            boxShadow: 'var(--shadow-hover)',
          }}
        >
          <Construction className="size-10" style={{ color: 'var(--icon-primary)' }} />
        </div>

        <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-5xl" style={{ color: 'var(--text-primary)' }}>
          {pageName ? `${pageName} em construção` : 'Em construção'}
        </h1>

        <p className="mb-2 max-w-md text-sm leading-relaxed sm:text-base" style={{ color: 'var(--text-tertiary)' }}>
          {description}
        </p>

        <p className="mb-10 max-w-md text-sm leading-relaxed sm:text-base" style={{ color: 'var(--text-tertiary)' }}>
          Volte em breve para ver o resultado.
        </p>

        <div className="mb-16 flex flex-wrap justify-center gap-4">
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
            Contato
            <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" style={{ color: 'var(--icon-tertiary)' }} />
          </a>
        </div>

        <div className="w-full border-t pt-10" style={{ borderColor: 'var(--border-tertiary)' }}>
          <p className="text-xs" style={{ color: 'var(--text-quaternary)' }}>
            &copy; 2026 Fabio Santana. Desenvolvido com React, TypeScript &amp; Tailwind.
          </p>
        </div>
      </div>
    </main>
  )
}

export default UnderConstruction

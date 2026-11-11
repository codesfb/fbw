'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight, Mail, Code2 } from 'lucide-react'
import MascotWithGears from '@/components/Mascot/MascotWithGears'
import Button from '@/components/ui/Button'

type UnderConstructionProps = {
  pageName?: string
  description?: string
}

export function UnderConstruction({
  pageName,
  description = 'Uma nova versão está sendo desenvolvida com muito carinho.',
}: UnderConstructionProps) {
  return (
    <main className="mx-auto max-w-3xl px-6 pt-16 pb-16 font-mono">
      <div className="flex flex-col items-center text-center">
        <div
          className="page-enter"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            marginBottom: 20,
            transform: 'scale(0.9)',
            transformOrigin: 'center',
          }}
        >
          <MascotWithGears size={80} />
        </div>

        <h1 className="mb-3 text-2xl font-bold tracking-tight sm:text-4xl" style={{ color: 'var(--text-primary)' }}>
          {pageName ? `${pageName} em construção` : 'Em construção'}
        </h1>

        <p className="mb-2 max-w-md text-sm leading-relaxed sm:text-base" style={{ color: 'var(--text-secondary)' }}>
          {description}
        </p>

        <p className="mb-8 max-w-md text-xs leading-relaxed sm:text-sm" style={{ color: 'var(--text-tertiary)' }}>
          Volte em breve para conferir as novidades.
        </p>

        <div className="mb-8 flex flex-wrap justify-center gap-3">
          <Link href="/">
            <Button variant="black" size="md" className="gap-2">
              <ArrowLeft className="size-4" />
              <span>Voltar para o Início</span>
            </Button>
          </Link>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          <a
            href="https://github.com/codesfb"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-lg border px-4 py-2 text-xs transition-all duration-300"
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
            <Code2 className="size-3.5" style={{ color: 'var(--icon-primary)' }} />
            <span>GitHub</span>
          </a>

          <a
            href="mailto:contato@fabiosantana.dev"
            className="group flex items-center gap-2 rounded-lg border px-4 py-2 text-xs transition-all duration-300"
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
            <Mail className="size-3.5" style={{ color: 'var(--icon-primary)' }} />
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
          <span>Em desenvolvimento • Previsão em breve</span>
          <ArrowRight className="size-3" />
        </div>
      </div>
    </main>
  )
}

export default UnderConstruction

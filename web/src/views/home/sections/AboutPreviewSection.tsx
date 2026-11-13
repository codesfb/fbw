'use client'

import Link from 'next/link'
import { ArrowRight, User } from 'lucide-react'
import Button from '@/components/ui/Button'
import Timeline from '@/components/Timeline'
import timelineDataRaw from '@/data/timeline.json'
import type { TimelineItem } from '@/types'
import { useMascot } from '@/context/MascotContext'

const timelineData = timelineDataRaw as TimelineItem[]

export function AboutPreviewSection() {
  const { setHint } = useMascot()

  return (
    <section
      id="sobre"
      className="scroll-mt-20 border-t px-4 py-20 font-mono transition-colors duration-300 sm:px-6"
      style={{
        borderColor: 'var(--border-tertiary)',
        backgroundColor: 'var(--bg-page)',
      }}
    >
      <div className="mx-auto max-w-5xl">
        {/* Cabeçalho da Seção */}
        <div className="mb-8 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <div
              className="mb-2 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs"
              style={{
                backgroundColor: 'var(--bg-elevated)',
                borderColor: 'var(--border-tertiary)',
                color: 'var(--text-tertiary)',
              }}
            >
              <User className="size-3" />
              <span>Trajetória</span>
            </div>
            <h2
              className="text-2xl font-bold tracking-tight sm:text-3xl"
              style={{ color: 'var(--text-primary)' }}
            >
              Linha do Tempo
            </h2>
            <p className="mt-1 text-xs sm:text-sm" style={{ color: 'var(--text-tertiary)' }}>
              Do marketing à Engenharia de Software: as etapas que construíram minha bagagem.
            </p>
          </div>

          <Link href="/sobre" className="hidden sm:inline-flex">
            <Button
              variant="black"
              size="md"
              className="gap-2"
              onMouseEnter={() => setHint('Quer ver todos os detalhes da minha trajetória? Clique aqui!')}
              onMouseLeave={() => setHint(null)}
            >
              <span>Ver mais</span>
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>

        {/* Linha do tempo horizontal com efeito de blur na borda direita */}
        <div className="relative overflow-hidden rounded-2xl border p-4 sm:p-6"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-secondary)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <Timeline items={timelineData} layout="horizontal" />

          {/* Efeito desfocado (blur) sobre o final da trilha horizontal */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-28 sm:w-44 backdrop-blur-[3px]"
            style={{
              background: 'linear-gradient(to left, var(--bg-card) 20%, rgba(255,255,255,0.05) 100%)',
            }}
          />

          {/* Botão flutuante sobre a área desfocada */}
          <div className="absolute inset-y-0 right-4 flex items-center justify-center">
            <Link href="/sobre">
              <Button
                variant="black"
                size="md"
                className="gap-2 shadow-lg"
                onMouseEnter={() => setHint('Quer ver todos os detalhes da minha trajetória? Clique aqui!')}
                onMouseLeave={() => setHint(null)}
              >
                <span>Ver mais</span>
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Botão no Mobile abaixo da caixa */}
        <div className="mt-6 flex justify-center sm:hidden">
          <Link href="/sobre">
            <Button
              variant="black"
              size="md"
              className="gap-2"
              onMouseEnter={() => setHint('Quer ver todos os detalhes da minha trajetória? Clique aqui!')}
              onMouseLeave={() => setHint(null)}
            >
              <span>Ver trajetória completa</span>
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default AboutPreviewSection

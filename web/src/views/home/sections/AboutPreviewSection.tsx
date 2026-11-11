'use client'

import Link from 'next/link'
import { ArrowRight, User, Calendar } from 'lucide-react'
import Button from '@/components/ui/Button'
import aboutData from '@/data/about.json'
import timelineDataRaw from '@/data/timeline.json'
import type { TimelineItem } from '@/types'

const timelineData = timelineDataRaw as TimelineItem[]

export function AboutPreviewSection() {
  // Exibe os primeiros 3 a 4 marcos na prévia
  const previewMilestones = timelineData.slice(0, 4)

  return (
    <section
      id="sobre"
      className="scroll-mt-20 border-t px-4 py-20 font-mono transition-colors duration-300 sm:px-6"
      style={{
        borderColor: 'var(--border-tertiary)',
        backgroundColor: 'var(--bg-page)',
      }}
    >
      <div className="mx-auto max-w-4xl">
        {/* Cabeçalho da Seção */}
        <div className="mb-10 text-center sm:text-left">
          <div
            className="mb-2 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs"
            style={{
              backgroundColor: 'var(--bg-elevated)',
              borderColor: 'var(--border-tertiary)',
              color: 'var(--text-tertiary)',
            }}
          >
            <User className="size-3" />
            <span>Sobre Mim</span>
          </div>
          <h2
            className="text-2xl font-bold tracking-tight sm:text-3xl"
            style={{ color: 'var(--text-primary)' }}
          >
            {aboutData.greeting}
          </h2>
        </div>

        {/* Texto de Apresentação lido de about.json */}
        <div
          className="mb-12 rounded-xl border p-6 backdrop-blur-xl sm:p-8"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-secondary)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <div className="flex flex-col gap-4 text-xs leading-relaxed sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
            {aboutData.bioParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Prévia da Timeline (3 ou 4 marcos) */}
        <div className="mb-10">
          <h3
            className="mb-6 text-sm font-semibold tracking-wider uppercase text-center sm:text-left"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Principais Marcos
          </h3>

          <div className="relative border-l-2 pl-6 ml-3 sm:ml-4 flex flex-col gap-8" style={{ borderColor: 'var(--border-secondary)' }}>
            {previewMilestones.map((item) => (
              <div key={item.id} className="relative group">
                {/* Marcador do nó da timeline */}
                <span
                  className={`absolute -left-[31px] top-1 size-3.5 rounded-full border-2 transition-transform duration-300 group-hover:scale-125 ${
                    item.current ? 'bg-emerald-500 animate-pulse' : ''
                  }`}
                  style={{
                    backgroundColor: item.current ? 'var(--status-success)' : 'var(--bg-page)',
                    borderColor: 'var(--border-primary)',
                  }}
                />

                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span
                    className="inline-flex items-center gap-1 text-[11px] font-medium"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    <Calendar className="size-3" />
                    {item.period}
                  </span>
                  {item.current && (
                    <span
                      className="rounded border px-1.5 py-0.2 text-[9px] font-bold"
                      style={{
                        backgroundColor: 'var(--status-success-bg)',
                        borderColor: 'var(--status-success-border)',
                        color: 'var(--status-success-text)',
                      }}
                    >
                      Em andamento
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                  {item.title}
                  {item.organization && (
                    <span className="font-normal text-xs ml-1.5" style={{ color: 'var(--text-tertiary)' }}>
                      • {item.organization}
                    </span>
                  )}
                </h4>

                <p className="mt-1 text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {item.description}
                </p>

                {item.tags && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded border px-2 py-0.5 text-[10px]"
                        style={{
                          backgroundColor: 'var(--bg-elevated)',
                          borderColor: 'var(--border-tertiary)',
                          color: 'var(--text-tertiary)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Botão Ver Mais -> /sobre */}
        <div className="flex justify-center sm:justify-start">
          <Link href="/sobre">
            <Button variant="black" size="md" className="gap-2">
              <span>Ver mais sobre mim</span>
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default AboutPreviewSection

'use client'

import { useRef } from 'react'
import { Calendar, Building2, ChevronLeft, ChevronRight } from 'lucide-react'
import type { TimelineItem } from '@/types'
import timelineDataRaw from '@/data/timeline.json'

const timelineData = timelineDataRaw as TimelineItem[]

export interface TimelineProps {
  items?: TimelineItem[]
  layout?: 'horizontal' | 'vertical'
}

export function Timeline({ items = timelineData, layout = 'horizontal' }: TimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -320 : 320
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' })
    }
  }

  if (layout === 'horizontal') {
    return (
      <div className="relative w-full font-mono">
        {/* Controles de rolagem se houver muitos itens */}
        <div className="mb-3 hidden sm:flex items-center justify-end gap-1.5">
          <button
            type="button"
            onClick={() => scroll('left')}
            aria-label="Rolar linha do tempo para a esquerda"
            className="cursor-pointer rounded-md border p-1.5 transition-all outline-none hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[var(--border-primary)]"
            style={{
              backgroundColor: 'var(--bg-elevated)',
              borderColor: 'var(--border-tertiary)',
              color: 'var(--text-secondary)',
            }}
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            aria-label="Rolar linha do tempo para a direita"
            className="cursor-pointer rounded-md border p-1.5 transition-all outline-none hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[var(--border-primary)]"
            style={{
              backgroundColor: 'var(--bg-elevated)',
              borderColor: 'var(--border-tertiary)',
              color: 'var(--text-secondary)',
            }}
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        {/* Trilho horizontal */}
        <div
          ref={scrollRef}
          className="relative flex gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth no-scrollbar"
          style={{ scrollSnapType: 'x mandatory' }}
          role="region"
          aria-label="Linha do tempo horizontal"
        >
          {/* Linha horizontal contínua que 'carrega' os itens */}
          <span
            aria-hidden="true"
            className="absolute top-5 left-0 right-0 h-0.5 w-full min-w-[1000px]"
            style={{ backgroundColor: 'var(--border-secondary)' }}
          />

          {items.map((item) => (
            <div
              key={item.id}
              className="relative flex min-w-[280px] max-w-[320px] shrink-0 flex-col pt-8 sm:min-w-[300px]"
              style={{ scrollSnapAlign: 'start' }}
            >
              {/* Nó no trilho horizontal */}
              <span
                aria-hidden="true"
                className={`absolute top-5 left-6 -translate-x-1/2 -translate-y-1/2 z-10 ${
                  item.current ? 'size-4' : 'size-3'
                }`}
              >
                <span
                  className={`block size-full rounded-full border-2 ${
                    item.current ? 'animate-pulse' : ''
                  }`}
                  style={{
                    backgroundColor: item.current ? 'var(--status-success)' : 'var(--bg-page)',
                    borderColor: 'var(--border-primary)',
                  }}
                />
              </span>

              {/* Card do marco */}
              <div
                className="flex h-full flex-col justify-between rounded-xl border p-5 transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  backgroundColor: item.current ? 'var(--bg-elevated)' : 'var(--bg-card)',
                  borderColor: item.current ? 'var(--border-primary)' : 'var(--border-secondary)',
                  boxShadow: item.current ? 'var(--shadow-hover-sm)' : 'var(--shadow-card)',
                }}
              >
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span
                      className="inline-flex items-center gap-1 text-[11px] font-medium"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      <Calendar className="size-3" aria-hidden="true" />
                      {item.period}
                    </span>

                    {item.current && (
                      <span
                        className="inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[9px] font-bold"
                        style={{
                          backgroundColor: 'var(--status-success-bg)',
                          borderColor: 'var(--status-success-border)',
                          color: 'var(--status-success-text)',
                        }}
                      >
                        <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                        Em andamento
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold leading-snug" style={{ color: 'var(--text-primary)' }}>
                    {item.title}
                  </h3>

                  {item.organization && (
                    <p
                      className="mt-1 flex items-center gap-1 text-[11px]"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      <Building2 className="size-3" aria-hidden="true" />
                      {item.organization}
                    </p>
                  )}

                  <p className="mt-2 text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {item.description}
                  </p>
                </div>

                {item.tags && item.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5 border-t pt-2.5" style={{ borderColor: 'var(--border-tertiary)' }}>
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded border px-1.5 py-0.5 text-[9px]"
                        style={{
                          backgroundColor: 'var(--bg-page)',
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
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Layout vertical alternado (opcional como fallback)
  return (
    <ol className="relative mx-auto w-full max-w-4xl font-mono" aria-label="Linha do tempo da trajetória">
      <span
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-3 w-px md:left-1/2"
        style={{ backgroundColor: 'var(--border-secondary)' }}
      />

      {items.map((item, index) => {
        const isLeft = index % 2 === 0

        return (
          <li
            key={item.id}
            className="relative mb-10 pl-10 md:mb-14 md:last:mb-0 md:grid md:grid-cols-2 md:gap-10 md:pl-0"
          >
            <span
              aria-hidden="true"
              className={`absolute top-2 left-3 z-10 -translate-x-1/2 md:left-1/2 ${
                item.current ? 'size-4' : 'size-3'
              }`}
            >
              <span
                className={`block size-full rounded-full border-2 ${
                  item.current ? 'animate-pulse' : ''
                }`}
                style={{
                  backgroundColor: item.current ? 'var(--status-success)' : 'var(--bg-page)',
                  borderColor: 'var(--border-primary)',
                }}
              />
            </span>

            <div className={isLeft ? 'md:pr-10 md:text-right' : 'md:col-start-2 md:pl-10'}>
              <div
                className="rounded-xl border p-5 transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  backgroundColor: item.current ? 'var(--bg-elevated)' : 'var(--bg-card)',
                  borderColor: item.current ? 'var(--border-primary)' : 'var(--border-secondary)',
                  boxShadow: item.current ? 'var(--shadow-hover-sm)' : 'var(--shadow-card)',
                }}
              >
                <div className={`mb-2 flex flex-wrap items-center gap-2 ${isLeft ? 'md:justify-end' : ''}`}>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium" style={{ color: 'var(--text-tertiary)' }}>
                    <Calendar className="size-3" aria-hidden="true" />
                    {item.period}
                  </span>
                  {item.current && (
                    <span
                      className="inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[9px] font-bold"
                      style={{
                        backgroundColor: 'var(--status-success-bg)',
                        borderColor: 'var(--status-success-border)',
                        color: 'var(--status-success-text)',
                      }}
                    >
                      <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                      Em andamento
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold leading-snug" style={{ color: 'var(--text-primary)' }}>
                  {item.title}
                </h3>

                {item.organization && (
                  <p className={`mt-1 flex items-center gap-1 text-[11px] ${isLeft ? 'md:justify-end' : ''}`} style={{ color: 'var(--text-tertiary)' }}>
                    <Building2 className="size-3" aria-hidden="true" />
                    {item.organization}
                  </p>
                )}

                <p className="mt-2 text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {item.description}
                </p>
              </div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

export default Timeline

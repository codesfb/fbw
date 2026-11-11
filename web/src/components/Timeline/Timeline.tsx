'use client'

import { Calendar, Building2 } from 'lucide-react'
import type { TimelineItem } from '@/types'
import timelineDataRaw from '@/data/timeline.json'

const timelineData = timelineDataRaw as TimelineItem[]

export interface TimelineProps {
  items?: TimelineItem[]
}

export function Timeline({ items = timelineData }: TimelineProps) {
  return (
    <ol className="relative mx-auto w-full max-w-4xl" aria-label="Linha do tempo da trajetória">
      {/* Linha vertical central no desktop, alinhada à esquerda no mobile */}
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
            {/* Marcador do nó */}
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

            {/* Card do marco */}
            <div
              className={isLeft ? 'md:pr-10 md:text-right' : 'md:col-start-2 md:pl-10'}
            >
              <div
                className="rounded-xl border p-5 transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  backgroundColor: item.current ? 'var(--bg-elevated)' : 'var(--bg-card)',
                  borderColor: item.current ? 'var(--border-primary)' : 'var(--border-secondary)',
                  boxShadow: item.current ? 'var(--shadow-hover-sm)' : 'var(--shadow-card)',
                }}
              >
                <div
                  className={`mb-2 flex flex-wrap items-center gap-2 ${
                    isLeft ? 'md:justify-end' : ''
                  }`}
                >
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
                    className={`mt-1 flex items-center gap-1 text-[11px] ${
                      isLeft ? 'md:justify-end' : ''
                    }`}
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    <Building2 className="size-3" aria-hidden="true" />
                    {item.organization}
                  </p>
                )}

                <p className="mt-2 text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {item.description}
                </p>

                {item.tags && item.tags.length > 0 && (
                  <div
                    className={`mt-3 flex flex-wrap gap-1.5 ${isLeft ? 'md:justify-end' : ''}`}
                  >
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded border px-2 py-0.5 text-[10px]"
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
          </li>
        )
      })}
    </ol>
  )
}

export default Timeline

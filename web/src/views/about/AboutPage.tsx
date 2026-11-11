'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Mail, MapPin, Sparkles, Terminal } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/common/Icons'
import Timeline from '@/components/Timeline'
import fabioImg from '@/assets/fabio.jpg'
import aboutData from '@/data/about.json'
import type { TimelineItem } from '@/types'
import timelineDataRaw from '@/data/timeline.json'

const timelineData = timelineDataRaw as TimelineItem[]

const iconByKey = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  mail: Mail,
} as const

export function AboutPage() {
  return (
    <main className="px-4 pt-10 pb-16 font-mono sm:px-6">
      <div className="mx-auto max-w-4xl">
        {/* Voltar */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 rounded-md text-[11px] outline-none transition-opacity hover:opacity-70 focus-visible:ring-2 focus-visible:ring-[var(--border-primary)]"
          style={{ color: 'var(--text-tertiary)' }}
        >
          <ArrowLeft className="size-3" aria-hidden="true" />
          <span>Voltar para a Home</span>
        </Link>

        {/* Apresentação */}
        <header className="mb-14 flex flex-col items-center gap-8 sm:flex-row sm:items-start">
          <div
            className="relative size-28 shrink-0 overflow-hidden rounded-2xl border-2 transition-transform duration-300 hover:scale-105 sm:size-36"
            style={{
              borderColor: 'var(--border-primary)',
              boxShadow: 'var(--shadow-hover)',
            }}
          >
            <Image
              src={fabioImg}
              alt="Foto de Fabio Santana"
              fill
              priority
              sizes="(max-width: 640px) 112px, 144px"
              className="object-cover"
            />
          </div>

          <div className="text-center sm:text-left">
            <p className="text-[11px] tracking-wide" style={{ color: 'var(--text-tertiary)' }}>
              {aboutData.role}
            </p>

            <h1
              className="mt-1 text-2xl font-extrabold tracking-tight sm:text-4xl"
              style={{ color: 'var(--text-primary)' }}
            >
              {aboutData.greeting}
            </h1>

            <p
              className="mt-2 inline-flex items-center gap-1.5 text-[11px]"
              style={{ color: 'var(--text-tertiary)' }}
            >
              <MapPin className="size-3" aria-hidden="true" />
              {aboutData.location}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              {aboutData.socialLinks.map((link) => {
                const Icon = iconByKey[link.icon as keyof typeof iconByKey] ?? Mail
                const isMail = link.icon === 'mail'

                return (
                  <a
                    key={link.label}
                    href={link.url}
                    {...(isMail ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                    className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[11px] transition-all duration-200 outline-none hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[var(--border-primary)]"
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
                    <Icon className="size-3.5" aria-hidden="true" />
                    <span>{link.label}</span>
                  </a>
                )
              })}
            </div>
          </div>
        </header>

        {/* Texto de apresentação */}
        <section aria-labelledby="about-text" className="mb-16">
          <h2
            id="about-text"
            className="mb-4 text-xs font-bold tracking-wider uppercase"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Quem sou
          </h2>

          <div
            className="rounded-xl border p-6 sm:p-8"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-secondary)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <div
              className="flex flex-col gap-4 text-xs leading-relaxed sm:text-sm"
              style={{ color: 'var(--text-secondary)' }}
            >
              {aboutData.bioParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div
              className="mt-6 flex flex-wrap gap-2 border-t pt-4"
              style={{ borderColor: 'var(--border-tertiary)' }}
            >
              <span
                className="inline-flex items-center gap-1.5 rounded border px-2 py-1 text-[10px]"
                style={{
                  backgroundColor: 'var(--bg-elevated)',
                  borderColor: 'var(--border-tertiary)',
                  color: 'var(--text-secondary)',
                }}
              >
                <Terminal className="size-3" aria-hidden="true" />
                Linux &amp; Neovim
              </span>
              <span
                className="inline-flex items-center gap-1.5 rounded border px-2 py-1 text-[10px]"
                style={{
                  backgroundColor: 'var(--bg-elevated)',
                  borderColor: 'var(--border-tertiary)',
                  color: 'var(--text-secondary)',
                }}
              >
                <Sparkles className="size-3" aria-hidden="true" />
                Java &amp; Spring • React &amp; TypeScript
              </span>
            </div>
          </div>
        </section>

        {/* Linha do tempo */}
        <section aria-labelledby="about-timeline">
          <h2
            id="about-timeline"
            className="mb-2 text-xs font-bold tracking-wider uppercase"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Trajetória
          </h2>
          <p className="mb-10 max-w-xl text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Do marketing ao código, cada etapa moldou a forma como construo e comunico o que faço.
          </p>

          <Timeline items={timelineData} />
        </section>
      </div>
    </main>
  )
}

export default AboutPage

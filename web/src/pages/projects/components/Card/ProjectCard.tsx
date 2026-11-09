'use client'

import { forwardRef, useRef, useState, type ReactNode, type CSSProperties } from 'react'
import Image from 'next/image'
import {
  Code2,
  ExternalLink,
  Download,
  BookOpen,
  Layers,
  Terminal,
  Cpu,
  Boxes,
  FileCode2,
  Atom,
  Server,
  FileText,
} from 'lucide-react'
import ProjectModal from '../../../../components/ui/Modal/ProjectModal'

export type ProjectStatus = 'concluido' | 'em-andamento' | 'arquivado'

export interface ProjectCardProps {
  title: string
  description: string
  repoUrl: string
  languages: string[]
  updatedAt: Date | string
  status: ProjectStatus

  siteUrl?: string
  downloadUrl?: string
  detailsUrl?: string
  readme?: string
  media?: { type: 'image' | 'video'; src: string; alt?: string }
  tags?: string[]
  featured?: boolean
  stars?: number
  className?: string
}

const statusConfig: Record<
  ProjectStatus,
  { label: string; dotVar: string; bgVar: string; borderVar: string; textVar: string }
> = {
  concluido: {
    label: 'Concluído',
    dotVar: '--status-success',
    bgVar: '--status-success-bg',
    borderVar: '--status-success-border',
    textVar: '--status-success-text',
  },
  'em-andamento': {
    label: 'Em andamento',
    dotVar: '--status-warning',
    bgVar: '--status-warning-bg',
    borderVar: '--status-warning-border',
    textVar: '--status-warning-text',
  },
  arquivado: {
    label: 'Arquivado',
    dotVar: '--status-archived',
    bgVar: '--status-archived-bg',
    borderVar: '--status-archived-border',
    textVar: '--status-archived-text',
  },
}

function getLanguageIcon(lang: string): ReactNode {
  const normalized = lang.toLowerCase()
  if (normalized.includes('react') || normalized.includes('native')) {
    return <Atom className="size-2.5" />
  }
  if (normalized.includes('typescript') || normalized.includes('ts')) {
    return <FileCode2 className="size-2.5" />
  }
  if (normalized.includes('javascript') || normalized.includes('js')) {
    return <FileText className="size-2.5" />
  }
  if (normalized.includes('rust') || normalized.includes('c++') || normalized.includes('c#')) {
    return <Cpu className="size-2.5" />
  }
  if (normalized.includes('shell') || normalized.includes('bash') || normalized.includes('sh')) {
    return <Terminal className="size-2.5" />
  }
  if (normalized.includes('java') || normalized.includes('go') || normalized.includes('python')) {
    return <Server className="size-2.5" />
  }
  return <Boxes className="size-2.5" />
}

function formatUpdatedDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export const ProjectCard = forwardRef<HTMLElement, ProjectCardProps>(
  (
    {
      title,
      description,
      repoUrl,
      languages,
      updatedAt,
      status,
      siteUrl,
      downloadUrl,
      readme,
      media,
      tags = [],
      featured = false,
      stars: _stars,
      className = '',
    },
    ref
  ) => {
    void _stars
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const currentStatus = statusConfig[status] ?? statusConfig.arquivado
    
    const cardRef = useRef<HTMLElement>(null)

    const handleMouseEnter = () => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {})
      }
      if (cardRef.current) {
        cardRef.current.style.borderColor = 'var(--border-primary)'
        cardRef.current.style.boxShadow = 'var(--shadow-hover)'
      }
    }

    const handleMouseLeave = () => {
      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      }
      if (cardRef.current && !featured) {
        cardRef.current.style.borderColor = 'var(--border-secondary)'
        cardRef.current.style.boxShadow = 'var(--shadow-card)'
      }
    }

    const cardStyle: CSSProperties = {
      backgroundColor: 'var(--bg-card)',
      borderColor: featured ? 'var(--border-primary)' : 'var(--border-secondary)',
      boxShadow: featured ? 'var(--shadow-hover)' : 'var(--shadow-card)',
    }

    return (
      <>
        <article
          ref={(node) => {
            cardRef.current = node
            if (typeof ref === 'function') {
              ref(node)
            } else if (ref) {
              ref.current = node
            }
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`group flex flex-col overflow-hidden rounded-lg border font-mono backdrop-blur-xl transition-all duration-300 ${className}`}
          style={cardStyle}
        >
          {/* Mídia (16:9) */}
          <div
            className="relative aspect-video w-full overflow-hidden border-b"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-tertiary)',
            }}
          >
            {featured && (
              <span
                className="absolute top-2 left-2 z-10 rounded border px-1.5 py-0.5 text-[9px] font-bold"
                style={{
                  backgroundColor: 'var(--bg-elevated-solid)',
                  borderColor: 'var(--border-primary)',
                  color: 'var(--text-primary)',
                  boxShadow: 'var(--shadow-hover-sm)',
                }}
              >
                Destaque
              </span>
            )}

            {media?.type === 'image' && (
              <Image
                src={media.src}
                alt={media.alt || `Imagem do projeto ${title}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}

            {media?.type === 'video' && (
              <video
                ref={videoRef}
                src={media.src}
                muted
                loop
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              />
            )}

            {!media && (
              <div
                className="flex h-full w-full items-center justify-center"
                style={{
                  background: `linear-gradient(to bottom right, var(${currentStatus.bgVar}), var(--bg-secondary), var(--bg-tertiary))`,
                }}
              >
                <Layers className="size-7 stroke-[1.5]" style={{ color: 'var(--icon-tertiary)' }} />
              </div>
            )}

            {/* Botão 'Visitar site' flutuando no canto inferior direito da imagem */}
            {siteUrl && (
              <a
                href={siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Visitar site oficial"
                className="group/visit absolute right-2 bottom-2 z-10 inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[10px] font-medium backdrop-blur-sm transition-all hover:-translate-y-0.5"
                style={{
                  backgroundColor: 'var(--bg-elevated-solid)',
                  borderColor: 'var(--border-transparent)',
                  color: 'var(--text-primary)',
                  boxShadow: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-primary)'
                  e.currentTarget.style.boxShadow = 'var(--shadow-hover-sm)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-transparent)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <span>Visitar</span>
                <ExternalLink className="size-2.5 transition-transform group-hover/visit:translate-x-0.5" style={{ color: 'var(--text-secondary)' }} />
              </a>
            )}
          </div>

          {/* Corpo do card mais compacto */}
          <div className="flex flex-1 flex-col p-3">
            {/* Título e Status */}
            <div className="mb-1 flex items-start justify-between gap-1.5">
              <h3 className="text-xs font-bold tracking-tight line-clamp-1 sm:text-sm" style={{ color: 'var(--text-primary)' }}>
                {title}
              </h3>
              <span
                className="inline-flex shrink-0 items-center gap-1 rounded border px-1.5 py-0.2 text-[9px] font-medium"
                style={{
                  backgroundColor: `var(${currentStatus.bgVar})`,
                  borderColor: `var(${currentStatus.borderVar})`,
                  color: `var(${currentStatus.textVar})`,
                }}
              >
                <span className="size-1 rounded-full" style={{ backgroundColor: `var(${currentStatus.dotVar})` }} />
                {currentStatus.label}
              </span>
            </div>

            {/* Descrição em 2 linhas */}
            <p className="mb-2 text-[11px] leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
              {description}
            </p>

            {/* Stack de Linguagens com Ícones e Tags */}
            <div className="mt-auto mb-2.5 flex flex-wrap items-center gap-1">
              {languages.map((lang) => (
                <span
                  key={lang}
                  className="inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[9px]"
                  style={{
                    backgroundColor: 'var(--bg-elevated)',
                    borderColor: 'var(--border-secondary)',
                    color: 'var(--text-primary)',
                  }}
                >
                  {getLanguageIcon(lang)}
                  {lang}
                </span>
              ))}
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-dashed px-1.5 py-0.5 text-[9px]"
                  style={{
                    borderColor: 'var(--border-secondary)',
                    color: 'var(--text-tertiary)',
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Ações / Botões */}
            <div className="flex flex-wrap items-center gap-1.5 border-t pt-2" style={{ borderColor: 'var(--border-tertiary)' }}>
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[10px] transition-all"
                style={{
                  backgroundColor: 'var(--bg-elevated)',
                  borderColor: 'var(--border-transparent)',
                  color: 'var(--text-primary)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-primary)'
                  e.currentTarget.style.boxShadow = 'var(--shadow-hover-sm)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-transparent)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <Code2 className="size-3" />
                <span className="border-b border-transparent group-hover/btn:border-[var(--border-primary)]">
                  Repositório
                </span>
              </a>

              {downloadUrl && (
                <a
                  href={downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[10px] transition-all"
                  style={{
                    backgroundColor: 'var(--bg-elevated)',
                    borderColor: 'var(--border-transparent)',
                    color: 'var(--text-primary)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-primary)'
                    e.currentTarget.style.boxShadow = 'var(--shadow-hover-sm)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-transparent)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <Download className="size-3" />
                  <span className="border-b border-transparent group-hover/btn:border-[var(--border-primary)]">
                    Baixar
                  </span>
                </a>
              )}

              {/* Botão Ler mais que abre o modal */}
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="group/btn cursor-pointer inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[10px] transition-all"
                style={{
                  backgroundColor: 'var(--bg-elevated)',
                  borderColor: 'var(--border-transparent)',
                  color: 'var(--text-primary)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-primary)'
                  e.currentTarget.style.boxShadow = 'var(--shadow-hover-sm)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-transparent)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <BookOpen className="size-3" />
                <span className="border-b border-transparent group-hover/btn:border-[var(--border-primary)]">
                  Ler mais
                </span>
              </button>
            </div>

            {/* Rodapé: Data de Modificação */}
            <div className="mt-2 border-t pt-1.5 text-[9px]" style={{ borderColor: 'var(--border-tertiary)', color: 'var(--text-quaternary)' }}>
              Atualizado em {formatUpdatedDate(updatedAt)}
            </div>
          </div>
        </article>

        {/* Modal de Detalhes / README */}
        <ProjectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={title}
          readme={readme}
          description={description}
          repoUrl={repoUrl}
          siteUrl={siteUrl}
        />
      </>
    )
  }
)

ProjectCard.displayName = 'ProjectCard'

export default ProjectCard

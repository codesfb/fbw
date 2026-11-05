import { forwardRef, useRef, useState, type ReactNode } from 'react'
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
  { label: string; dotClass: string; badgeClass: string }
> = {
  concluido: {
    label: 'Concluído',
    dotClass: 'bg-emerald-500',
    badgeClass: 'border-emerald-600/30 bg-emerald-50 text-emerald-800',
  },
  'em-andamento': {
    label: 'Em andamento',
    dotClass: 'bg-amber-500',
    badgeClass: 'border-amber-600/30 bg-amber-50 text-amber-800',
  },
  arquivado: {
    label: 'Arquivado',
    dotClass: 'bg-neutral-400',
    badgeClass: 'border-neutral-400/30 bg-neutral-100 text-neutral-600',
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

    const handleMouseEnter = () => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {})
      }
    }

    const handleMouseLeave = () => {
      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      }
    }

    return (
      <>
        <article
          ref={ref}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`group flex flex-col overflow-hidden rounded-lg border bg-white/50 font-mono backdrop-blur-xl transition-all duration-300 hover:border-black hover:shadow-[3px_4px_0px_0px_rgba(0,0,0,1)] ${
            featured
              ? 'border-neutral-900 shadow-[3px_4px_0px_0px_rgba(0,0,0,1)]'
              : 'border-transparent not-hover:border-neutral-300/80 not-hover:shadow-[2px_3px_0px_0px_rgba(0,0,0,0.15)]'
          } ${className}`}
        >
          {/* Mídia (16:9) */}
          <div className="relative aspect-video w-full overflow-hidden border-b border-neutral-200/80 bg-neutral-100/60">
            {featured && (
              <span className="absolute top-2 left-2 z-10 rounded border border-black bg-white px-1.5 py-0.5 text-[9px] font-bold text-black shadow-[1px_2px_0px_0px_rgba(0,0,0,1)]">
                Destaque
              </span>
            )}

            {media?.type === 'image' && (
              <img
                src={media.src}
                alt={media.alt || `Imagem do projeto ${title}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-200/60">
                <Layers className="size-7 text-neutral-400 stroke-[1.5]" />
              </div>
            )}

            {/* Botão 'Visitar site' flutuando no canto inferior direito da imagem */}
            {siteUrl && (
              <a
                href={siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Visitar site oficial"
                className="group/visit absolute right-2 bottom-2 z-10 inline-flex items-center gap-1 rounded border border-black bg-white/95 px-2 py-0.5 text-[10px] font-medium text-neutral-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] backdrop-blur-sm transition-all hover:bg-white hover:-translate-y-0.5"
              >
                <span>Visitar</span>
                <ExternalLink className="size-2.5 text-neutral-700 transition-transform group-hover/visit:translate-x-0.5" />
              </a>
            )}
          </div>

          {/* Corpo do card mais compacto */}
          <div className="flex flex-1 flex-col p-3">
            {/* Título e Status */}
            <div className="mb-1 flex items-start justify-between gap-1.5">
              <h3 className="text-xs font-bold tracking-tight text-neutral-900 line-clamp-1 sm:text-sm">
                {title}
              </h3>
              <span
                className={`inline-flex shrink-0 items-center gap-1 rounded border px-1.5 py-0.2 text-[9px] font-medium ${currentStatus.badgeClass}`}
              >
                <span className={`size-1 rounded-full ${currentStatus.dotClass}`} />
                {currentStatus.label}
              </span>
            </div>

            {/* Descrição em 2 linhas */}
            <p className="mb-2 text-[11px] leading-relaxed text-neutral-600 line-clamp-2">
              {description}
            </p>

            {/* Stack de Linguagens com Ícones e Tags */}
            <div className="mt-auto mb-2.5 flex flex-wrap items-center gap-1">
              {languages.map((lang) => (
                <span
                  key={lang}
                  className="inline-flex items-center gap-1 rounded border border-neutral-300 bg-white/80 px-1.5 py-0.5 text-[9px] text-neutral-800"
                >
                  {getLanguageIcon(lang)}
                  {lang}
                </span>
              ))}
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-dashed border-neutral-300 px-1.5 py-0.5 text-[9px] text-neutral-500"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Ações / Botões */}
            <div className="flex flex-wrap items-center gap-1.5 border-t border-neutral-200/80 pt-2">
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center gap-1 rounded border border-transparent bg-white/70 px-2 py-0.5 text-[10px] text-neutral-800 transition-all hover:border-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                <Code2 className="size-3" />
                <span className="border-b border-transparent group-hover/btn:border-black">
                  Repositório
                </span>
              </a>

              {downloadUrl && (
                <a
                  href={downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-1 rounded border border-transparent bg-white/70 px-2 py-0.5 text-[10px] text-neutral-800 transition-all hover:border-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  <Download className="size-3" />
                  <span className="border-b border-transparent group-hover/btn:border-black">
                    Baixar
                  </span>
                </a>
              )}

              {/* Botão Ler mais que abre o modal */}
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="group/btn cursor-pointer inline-flex items-center gap-1 rounded border border-transparent bg-white/70 px-2 py-0.5 text-[10px] text-neutral-800 transition-all hover:border-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                <BookOpen className="size-3" />
                <span className="border-b border-transparent group-hover/btn:border-black">
                  Ler mais
                </span>
              </button>
            </div>

            {/* Rodapé: Data de Modificação */}
            <div className="mt-2 border-t border-neutral-100 pt-1.5 text-[9px] text-neutral-400">
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

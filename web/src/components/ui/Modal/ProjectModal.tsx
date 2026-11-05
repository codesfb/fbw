import { useEffect } from 'react'
import { X, BookOpen, ExternalLink, Code2 } from 'lucide-react'

export interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  readme?: string
  description?: string
  repoUrl?: string
  siteUrl?: string
}

export function ProjectModal({
  isOpen,
  onClose,
  title,
  readme,
  description,
  repoUrl,
  siteUrl,
}: ProjectModalProps) {
  // Fecha com ESC e trava o scroll da página enquanto aberto
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const content = readme || description || 'Nenhum detalhe adicional fornecido para este projeto.'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      style={{ backgroundColor: 'var(--bg-modal-overlay)' }}
      onClick={onClose}
    >
      <div
        className="relative max-h-[85vh] w-full max-w-2xl overflow-hidden rounded-xl border font-mono flex flex-col"
        style={{
          backgroundColor: 'var(--bg-elevated-solid)',
          borderColor: 'var(--border-primary)',
          boxShadow: 'var(--shadow-modal)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho do modal */}
        <div
          className="flex items-center justify-between border-b px-5 py-3.5"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--border-tertiary)',
          }}
        >
          <div className="flex items-center gap-2">
            <BookOpen className="size-4" style={{ color: 'var(--icon-primary)' }} />
            <h2 id="modal-title" className="text-sm font-bold line-clamp-1" style={{ color: 'var(--text-primary)' }}>
              {title} — Detalhes
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar modal"
            className="cursor-pointer rounded-md border p-1 transition-all"
            style={{
              borderColor: 'var(--border-transparent)',
              color: 'var(--text-tertiary)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-primary)'
              e.currentTarget.style.color = 'var(--text-primary)'
              e.currentTarget.style.boxShadow = 'var(--shadow-hover-sm)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-transparent)'
              e.currentTarget.style.color = 'var(--text-tertiary)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Conteúdo / README */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 text-xs sm:text-sm leading-relaxed space-y-4" style={{ color: 'var(--text-secondary)' }}>
          <div
            className="rounded-lg border p-4 whitespace-pre-wrap font-mono"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-tertiary)',
            }}
          >
            {content}
          </div>
        </div>

        {/* Rodapé com ações */}
        <div
          className="flex items-center justify-between border-t px-5 py-3"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--border-tertiary)',
          }}
        >
          <div className="flex gap-2">
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition-all duration-200"
                style={{
                  backgroundColor: 'var(--bg-elevated-solid)',
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
                <Code2 className="size-3.5" />
                Repositório
              </a>
            )}
            {siteUrl && (
              <a
                href={siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition-all duration-200"
                style={{
                  backgroundColor: 'var(--bg-elevated-solid)',
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
                <ExternalLink className="size-3.5" />
                Site
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            type="button"
            className="cursor-pointer rounded-lg border px-4 py-1.5 text-xs transition-all duration-200"
            style={{
              backgroundColor: 'var(--bg-elevated-solid)',
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
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProjectModal

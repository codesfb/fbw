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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/40"
      onClick={onClose}
    >
      <div
        className="relative max-h-[85vh] w-full max-w-2xl overflow-hidden rounded-xl border border-black bg-white font-mono shadow-[6px_7px_0px_0px_rgba(0,0,0,1)] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho do modal */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-3.5 bg-neutral-50/50">
          <div className="flex items-center gap-2">
            <BookOpen className="size-4 text-black" />
            <h2 id="modal-title" className="text-sm font-bold text-neutral-900 line-clamp-1">
              {title} — Detalhes
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar modal"
            className="cursor-pointer rounded-md border border-transparent p-1 text-neutral-500 hover:border-black hover:text-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Conteúdo / README */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 text-xs sm:text-sm text-neutral-700 leading-relaxed space-y-4">
          <div className="rounded-lg border border-neutral-200 bg-neutral-50/60 p-4 whitespace-pre-wrap font-mono">
            {content}
          </div>
        </div>

        {/* Rodapé com ações */}
        <div className="flex items-center justify-between border-t border-neutral-200 px-5 py-3 bg-neutral-50/50">
          <div className="flex gap-2">
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-transparent bg-white px-3 py-1.5 text-xs text-neutral-800 transition-all duration-200 hover:border-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
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
                className="inline-flex items-center gap-1.5 rounded-lg border border-transparent bg-white px-3 py-1.5 text-xs text-neutral-800 transition-all duration-200 hover:border-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                <ExternalLink className="size-3.5" />
                Site
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            type="button"
            className="cursor-pointer rounded-lg border border-transparent bg-white px-4 py-1.5 text-xs text-neutral-800 transition-all duration-200 hover:border-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProjectModal

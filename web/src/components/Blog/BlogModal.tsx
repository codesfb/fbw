'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { X, BookOpen, Calendar, Clock, ArrowUpRight } from 'lucide-react'
import type { BlogPost } from '@/data/blog'

export interface BlogModalProps {
  isOpen: boolean
  onClose: () => void
  post: BlogPost | null
}

export function BlogModal({ isOpen, onClose, post }: BlogModalProps) {
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

  if (!isOpen || !post) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="blog-modal-title"
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
          <div className="flex items-center gap-2 min-w-0">
            <BookOpen className="size-4 shrink-0" style={{ color: 'var(--icon-primary)' }} />
            <span className="text-xs font-bold uppercase tracking-wider line-clamp-1" style={{ color: 'var(--text-tertiary)' }}>
              Prévia do Artigo
            </span>
          </div>

          <button
            onClick={onClose}
            type="button"
            aria-label="Fechar prévia do artigo"
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

        {/* Conteúdo do artigo */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 text-xs sm:text-sm leading-relaxed space-y-4" style={{ color: 'var(--text-secondary)' }}>
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-3 text-[11px]" style={{ color: 'var(--text-tertiary)' }}>
              <span className="inline-flex items-center gap-1">
                <Calendar className="size-3" />
                {post.date}
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3" />
                {post.readTime}
              </span>
            </div>

            <h2 id="blog-modal-title" className="text-base sm:text-lg font-bold leading-snug" style={{ color: 'var(--text-primary)' }}>
              {post.title}
            </h2>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded border px-2 py-0.5 text-[10px]"
                  style={{
                    backgroundColor: 'var(--bg-elevated)',
                    borderColor: 'var(--border-tertiary)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div
            className="rounded-lg border p-4 font-mono leading-relaxed whitespace-pre-line text-xs sm:text-sm"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-tertiary)',
              color: 'var(--text-secondary)',
            }}
          >
            {post.content}
          </div>
        </div>

        {/* Rodapé com botão 'Abrir página completa' */}
        <div
          className="flex flex-wrap items-center justify-between gap-3 border-t px-5 py-3"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--border-tertiary)',
          }}
        >
          <p className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>
            Gostou do assunto? Leia a publicação completa no blog.
          </p>

          <div className="flex items-center gap-2">
            <Link
              href="/blog"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all duration-200 outline-none hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[var(--border-primary)]"
              style={{
                backgroundColor: 'var(--text-primary)',
                color: 'var(--text-inverse)',
                borderColor: 'var(--border-primary)',
                boxShadow: 'var(--shadow-hover-sm)',
              }}
            >
              <span>Abrir página completa</span>
              <ArrowUpRight className="size-3.5" />
            </Link>

            <button
              onClick={onClose}
              type="button"
              className="cursor-pointer rounded-lg border px-3.5 py-1.5 text-xs transition-all duration-200 outline-none hover:border-[var(--border-primary)] focus-visible:ring-2 focus-visible:ring-[var(--border-primary)]"
              style={{
                backgroundColor: 'var(--bg-elevated-solid)',
                borderColor: 'var(--border-tertiary)',
                color: 'var(--text-secondary)',
              }}
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogModal

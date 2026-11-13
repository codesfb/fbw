'use client'

import { useState } from 'react'
import { Calendar, Clock, BookOpen, Newspaper } from 'lucide-react'
import type { BlogPost } from '@/data/blog'
import BlogModal from './BlogModal'
import { useMascot } from '@/context/MascotContext'

export interface BlogCardProps {
  post: BlogPost
  className?: string
}

export function BlogCard({ post, className = '' }: BlogCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { setHint } = useMascot()

  const handleMouseEnter = () => {
    setHint('Clique no card para abrir a prévia do artigo!')
  }

  const handleMouseLeave = () => {
    setHint(null)
  }

  const handleCardClick = () => {
    setIsModalOpen(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setIsModalOpen(true)
    }
  }

  return (
    <>
      <article
        tabIndex={0}
        role="button"
        aria-label={`Ver prévia do artigo ${post.title}`}
        onClick={handleCardClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`group flex flex-col overflow-hidden rounded-lg border font-mono backdrop-blur-xl transition-all duration-300 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-primary)] ${className}`}
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-secondary)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        {/* Placeholder de mídia com gradiente técnico e proporção 16:9 */}
        <div
          className="relative aspect-video w-full overflow-hidden border-b flex items-center justify-center p-4 transition-transform duration-500 group-hover:scale-102"
          style={{
            background: `linear-gradient(135deg, ${post.coverGradient.from}, ${post.coverGradient.to})`,
            borderColor: 'var(--border-tertiary)',
          }}
        >
          <div className="flex flex-col items-center gap-1.5 text-center">
            <Newspaper className="size-6 text-white/80" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/90">
              {post.coverGradient.label}
            </span>
          </div>

          <span
            className="absolute top-2 right-2 rounded border border-white/20 px-1.5 py-0.5 text-[9px] text-white/90 backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.35)' }}
          >
            {post.readTime}
          </span>
        </div>

        {/* Corpo do card */}
        <div className="flex flex-1 flex-col p-3.5">
          <div className="mb-1.5 flex items-center gap-2 text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
            <Calendar className="size-3" />
            <span>{post.date}</span>
            <span>•</span>
            <Clock className="size-3" />
            <span>{post.readTime}</span>
          </div>

          <h3
            className="mb-1 text-xs sm:text-sm font-bold tracking-tight line-clamp-2 leading-snug group-hover:underline"
            style={{ color: 'var(--text-primary)' }}
          >
            {post.title}
          </h3>

          <p
            className="mb-3 text-[11px] leading-relaxed line-clamp-2"
            style={{ color: 'var(--text-secondary)' }}
          >
            {post.summary}
          </p>

          {/* Tags */}
          <div className="mt-auto mb-3 flex flex-wrap gap-1">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded border px-1.5 py-0.5 text-[9px]"
                style={{
                  backgroundColor: 'var(--bg-elevated)',
                  borderColor: 'var(--border-secondary)',
                  color: 'var(--text-tertiary)',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Ação: Botão Prévia */}
          <div className="border-t pt-2" style={{ borderColor: 'var(--border-tertiary)' }}>
            <span
              className="inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[10px] font-medium transition-all"
              style={{
                backgroundColor: 'var(--bg-elevated)',
                borderColor: 'var(--border-transparent)',
                color: 'var(--text-primary)',
              }}
            >
              <BookOpen className="size-3" />
              <span>Ver prévia</span>
            </span>
          </div>
        </div>
      </article>

      <BlogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        post={post}
      />
    </>
  )
}

export default BlogCard

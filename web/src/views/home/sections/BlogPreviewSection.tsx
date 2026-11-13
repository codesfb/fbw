'use client'

import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import Button from '@/components/ui/Button'
import BlogCard from '@/components/Blog/BlogCard'
import { mockBlogPosts } from '@/data/blog'
import { useMascot } from '@/context/MascotContext'

export function BlogPreviewSection() {
  const { setHint } = useMascot()

  return (
    <section
      id="blog"
      className="scroll-mt-20 border-t px-4 py-20 font-mono transition-colors duration-300 sm:px-6"
      style={{
        borderColor: 'var(--border-tertiary)',
        backgroundColor: 'var(--bg-page)',
      }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Cabeçalho da Seção com botão 'Ver tudo →' */}
        <div className="mb-8 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <div
              className="mb-2 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs"
              style={{
                backgroundColor: 'var(--bg-elevated)',
                borderColor: 'var(--border-tertiary)',
                color: 'var(--text-tertiary)',
              }}
            >
              <BookOpen className="size-3" />
              <span>Publicações</span>
            </div>
            <h2
              className="text-2xl font-bold tracking-tight sm:text-3xl"
              style={{ color: 'var(--text-primary)' }}
            >
              Artigos &amp; Pensamentos
            </h2>
            <p className="mt-1 text-xs sm:text-sm" style={{ color: 'var(--text-tertiary)' }}>
              Estudos práticos, reflexões de carreira e anotações sobre engenharia de software e terminal.
            </p>
          </div>

          <Link href="/blog" className="hidden sm:inline-flex">
            <Button
              variant="black"
              size="md"
              className="gap-2"
              onMouseEnter={() => setHint('Quer ver todos os artigos? Clique em Ver tudo!')}
              onMouseLeave={() => setHint(null)}
            >
              <span>Ver tudo</span>
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>

        {/* Grid dos 3 artigos mockados */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockBlogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* Botão Ver tudo no Mobile */}
        <div className="mt-8 flex justify-center sm:hidden">
          <Link href="/blog">
            <Button
              variant="black"
              size="md"
              className="gap-2"
              onMouseEnter={() => setHint('Quer ver todos os artigos? Clique em Ver tudo!')}
              onMouseLeave={() => setHint(null)}
            >
              <span>Ver tudo</span>
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default BlogPreviewSection

'use client'

import Link from 'next/link'
import { ArrowRight, Code2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import ProjectCard from '@/views/projects/components/Card/ProjectCard'
import { useProjects } from '@/hooks/useProjects'
import { useMascot } from '@/context/MascotContext'

export function ProjectsPreviewSection() {
  const { projects, loading } = useProjects()
  const { setHint } = useMascot()

  // Seleciona até 4 projetos para o grid idêntico ao da página /projetos
  const previewProjects = projects.slice(0, 4)

  return (
    <section
      id="projetos"
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
              <Code2 className="size-3" />
              <span>Portfólio</span>
            </div>
            <h2
              className="text-2xl font-bold tracking-tight sm:text-3xl"
              style={{ color: 'var(--text-primary)' }}
            >
              Projetos em Destaque
            </h2>
            <p className="mt-1 text-xs sm:text-sm" style={{ color: 'var(--text-tertiary)' }}>
              Aplicações web, softwares, visualizadores e ferramentas de código aberto.
            </p>
          </div>

          <Link href="/projetos" className="hidden sm:inline-flex">
            <Button
              variant="black"
              size="md"
              className="gap-2"
              onMouseEnter={() => setHint('Quer ver todos os projetos? Clique em Ver tudo!')}
              onMouseLeave={() => setHint(null)}
            >
              <span>Ver tudo</span>
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>

        {/* Grid de Cards dos Projetos — exatamente o mesmo grid e proporção da página /projetos */}
        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-lg border"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--border-tertiary)',
                }}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {previewProjects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        )}

        {/* Botão Ver tudo no Mobile */}
        <div className="mt-8 flex justify-center sm:hidden">
          <Link href="/projetos">
            <Button
              variant="black"
              size="md"
              className="gap-2"
              onMouseEnter={() => setHint('Quer ver todos os projetos? Clique em Ver tudo!')}
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

export default ProjectsPreviewSection

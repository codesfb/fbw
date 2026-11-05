import Navbar from '@/app/layout/Navbar/Navbar'
import ProjectCard from '@/pages/projects/components/Card/ProjectCard'
import { useProjects } from '@/hooks/useProjects'

export function ProjetosPage() {
  const { projects, loading } = useProjects()

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pt-6 pb-12 sm:px-6">
        <header className="page-enter mb-4 text-center sm:text-left">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            Projetos
          </h1>
          <p className="mt-1.5 text-xs text-neutral-500 sm:text-sm">
            Aplicações web, softwares, contribuições e ferramentas de código aberto.
          </p>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-72 animate-pulse rounded-lg border border-neutral-200 bg-neutral-100/50"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default ProjetosPage

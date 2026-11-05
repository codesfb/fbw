import { useEffect } from 'react'
import Navbar from '@/app/layout/Navbar/Navbar'
import ProjectCard from '@/pages/projects/components/Card/ProjectCard'
import { NotificationContainer } from '@/components/ui/Notification'
import { useProjects } from '@/hooks/useProjects'
import { useNotifications } from '@/hooks/useNotifications'

export function ProjetosPage() {
  const { projects, loading, syncStatus } = useProjects()
  const { notifications, addNotification, removeNotification } = useNotifications()

  useEffect(() => {
    if (!loading) {
      if (syncStatus === 'synced') {
        addNotification({
          type: 'success',
          title: 'Sincronizado com API',
          message: 'Cards carregados com sucesso',
          duration: 4000,
        })
      } else if (syncStatus === 'fallback') {
        addNotification({
          type: 'warning',
          title: 'Dados locais',
          message: 'API retornou vazio, usando mock',
          duration: 6000,
        })
      } else if (syncStatus === 'error') {
        addNotification({
          type: 'error',
          title: 'Erro de sincronização',
          message: 'API indisponível, usando dados locais',
          duration: 6000,
        })
      }
    }
  }, [loading, syncStatus, addNotification])

  return (
    <div className="min-h-screen">
      <Navbar />
      <NotificationContainer notifications={notifications} onClose={removeNotification} />

      <main className="mx-auto max-w-7xl px-4 pt-6 pb-12 sm:px-6">
        <header className="page-enter mb-4 text-center sm:text-left">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: 'var(--text-primary)' }}>
            Projetos
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm" style={{ color: 'var(--text-tertiary)' }}>
            Aplicações web, softwares, contribuições e ferramentas de código aberto.
          </p>
        </header>

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

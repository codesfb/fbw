import type { Metadata } from 'next'
import { ProjetosPage } from '@/pages/projects/ProjectsPage'

export const metadata: Metadata = {
  title: 'Projetos — Fabio Santana',
  description: 'Aplicações web, softwares, contribuições e ferramentas de código aberto.',
}

export default function Page() {
  return <ProjetosPage />
}

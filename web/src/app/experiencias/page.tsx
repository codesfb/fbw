import type { Metadata } from 'next'
import { Home } from '@/pages/home/Home'

export const metadata: Metadata = {
  title: 'Experiências — Fabio Santana',
  description: 'Minha trajetória profissional, cargos e aprendizados.',
}

export default function ExperienciasPage() {
  return <Home title="Experiências" description="Minha trajetória profissional, cargos e aprendizados." />
}

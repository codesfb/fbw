import type { Metadata } from 'next'
import { Home } from '@/views/home/Home'

export const metadata: Metadata = {
  title: 'Sobre — Fabio Santana',
  description: 'Um pouco mais sobre mim, interesses e objetivos.',
}

export default function SobrePage() {
  return <Home title="Sobre" description="Um pouco mais sobre mim, interesses e objetivos." />
}

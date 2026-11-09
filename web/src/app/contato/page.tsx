import type { Metadata } from 'next'
import { Home } from '@/pages/home/Home'

export const metadata: Metadata = {
  title: 'Contato — Fabio Santana',
  description: 'Canais para entrarmos em contato e trocarmos ideias.',
}

export default function ContatoPage() {
  return <Home title="Contato" description="Canais para entrarmos em contato e trocarmos ideias." />
}

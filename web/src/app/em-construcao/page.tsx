import type { Metadata } from 'next'
import PaginaConstrucao from '@/components/Mascot/MenonUnderConstruction'

export const metadata: Metadata = {
  title: 'Em Construção — Fabio Santana',
  description: 'Página temporariamente em construção.',
}

export default function EmConstrucaoPage() {
  return <PaginaConstrucao />
}

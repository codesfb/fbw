import type { Metadata } from 'next'
import { Home } from '@/pages/home/Home'

export const metadata: Metadata = {
  title: 'Blog — Fabio Santana',
  description: 'Artigos e pensamentos sobre tecnologia e desenvolvimento.',
}

export default function BlogPage() {
  return <Home title="Blog" description="Artigos e pensamentos sobre tecnologia e desenvolvimento." />
}

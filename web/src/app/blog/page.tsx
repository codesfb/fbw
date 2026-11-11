import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import UnderConstruction from '@/components/common/UnderConstruction'

export const metadata: Metadata = {
  title: 'Blog — Fabio Santana',
  description: 'Artigos e pensamentos sobre tecnologia, desenvolvimento e engenharia de software.',
}

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1">
        <UnderConstruction
          pageName="Blog"
          description="Espaço para artigos, estudos de caso e reflexões sobre software e tecnologia."
        />
      </div>
      <Footer />
    </div>
  )
}

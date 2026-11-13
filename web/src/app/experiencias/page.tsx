import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import UnderConstruction from '@/components/common/UnderConstruction'

export const metadata: Metadata = {
  title: 'Experiências — Fabio Santana',
  description: 'Minha trajetória profissional, cargos e aprendizados.',
}

export default function ExperienciasPage() {
  return (
    <div className="flex min-h-screen flex-col font-mono">
      <Navbar />
      <div className="flex-1">
        <UnderConstruction
          pageName="Experiências"
          description="Minha trajetória profissional, cargos e aprendizados."
        />
      </div>
      <Footer />
    </div>
  )
}

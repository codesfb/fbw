import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import UnderConstruction from '@/components/common/UnderConstruction'

export const metadata: Metadata = {
  title: 'Sobre — Fabio Santana',
  description: 'Um pouco mais sobre mim, interesses e trajetória profissional.',
}

export default function SobrePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1">
        <UnderConstruction
          pageName="Sobre"
          description="Página detalhada com trajetória completa e timeline interativa em desenvolvimento."
        />
      </div>
      <Footer />
    </div>
  )
}

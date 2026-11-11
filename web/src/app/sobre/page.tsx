import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { AboutPage } from '@/views/about/AboutPage'

export const metadata: Metadata = {
  title: 'Sobre — Fabio Santana',
  description: 'Um pouco mais sobre mim, interesses e trajetória profissional.',
}

export default function SobrePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1">
        <AboutPage />
      </div>
      <Footer />
    </div>
  )
}

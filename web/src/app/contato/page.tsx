import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ContactPage } from '@/views/contact/ContactPage'

export const metadata: Metadata = {
  title: 'Contato — Fabio Santana',
  description: 'Canais para entrarmos em contato e trocarmos ideias.',
}

export default function ContatoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1">
        <ContactPage />
      </div>
      <Footer />
    </div>
  )
}

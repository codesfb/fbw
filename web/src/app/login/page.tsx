import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import UnderConstruction from '@/components/common/UnderConstruction'

export const metadata: Metadata = {
  title: 'Login — Fabio Santana',
  description: 'Área restrita e autenticação de usuário.',
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1">
        <UnderConstruction
          pageName="Login"
          description="Área administrativa para autenticação e gerenciamento de conteúdo."
        />
      </div>
      <Footer />
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Home } from '@/pages/home/Home'
import { ProjetosPage } from '@/pages/projects/ProjectsPage'
import PaginaConstrucao from '@/components/Mascot/MenonUnderConstruction'
import Mascote from '@/components/Mascot/Menon'

function App() {
  const location = useLocation()
  const timeoutRef = useRef<number | null>(null)
  const [estadoMascote, setEstadoMascote] = useState<'idle' | 'dormindo'>('dormindo')
  const esconderMascote = location.pathname === '/em-construcao'
  const modoConstrucao = import.meta.env.VITE_MODO_CONSTRUCAO === 'true'

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleMascoteClick = () => {
    if (estadoMascote === 'dormindo') {
      setEstadoMascote('idle')

      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = window.setTimeout(() => setEstadoMascote('dormindo'), 5000)
    }
  }

  if (modoConstrucao && location.pathname !== '/em-construcao') {
    return <Navigate to="/em-construcao" replace />
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projetos" element={<ProjetosPage />} />
        <Route path="/contato" element={<Home title="Contato" description="Canais para entrarmos em contato e trocarmos ideias." />} />
        <Route path="/experiencias" element={<Home title="Experiências" description="Minha trajetória profissional, cargos e aprendizados." />} />
        <Route path="/blog" element={<Home title="Blog" description="Artigos e pensamentos sobre tecnologia e desenvolvimento." />} />
        <Route path="/sobre" element={<Home title="Sobre" description="Um pouco mais sobre mim, interesses e objetivos." />} />
        <Route path="/em-construcao" element={<PaginaConstrucao />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!esconderMascote && (
        <div className="mascote-fixo">
          <Mascote estado={estadoMascote} tamanho={86} onClick={handleMascoteClick} />
        </div>
      )}
    </>
  )
}

export default App

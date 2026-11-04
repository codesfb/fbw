import { Navigate, Route, Routes } from 'react-router-dom'
import { Home } from '@/pages/home/Home'
import { ProjetosPage } from '@/pages/projetos/ProjetosPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projetos" element={<ProjetosPage />} />
      <Route path="/contato" element={<Home title="Contato" description="Canais para entrarmos em contato e trocarmos ideias." />} />
      <Route path="/experiencias" element={<Home title="Experiências" description="Minha trajetória profissional, cargos e aprendizados." />} />
      <Route path="/blog" element={<Home title="Blog" description="Artigos e pensamentos sobre tecnologia e desenvolvimento." />} />
      <Route path="/sobre" element={<Home title="Sobre" description="Um pouco mais sobre mim, interesses e objetivos." />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App

import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Search, Moon, Sun } from 'lucide-react'

export type SitePage = 'projetos' | 'contato' | 'experiencias' | 'blog' | 'sobre'

type NavbarProps = {
  activePage?: SitePage
  onNavigate?: (page: SitePage) => void
  onLoginClick?: () => void
}

const links: { label: string; page: SitePage }[] = [
  { label: 'Projetos', page: 'projetos' },
  { label: 'Contato', page: 'contato' },
  { label: 'Experiências', page: 'experiencias' },
  { label: 'Blog', page: 'blog' },
  { label: 'Sobre', page: 'sobre' },
]

function Navbar({ activePage, onNavigate, onLoginClick }: NavbarProps) {
  const [darkMode, setDarkMode] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // Determina a página ativa a partir da rota atual se não for passada explicitamente
  const currentPath = location.pathname.replace('/', '') as SitePage
  const currentPage = activePage || currentPath || 'projetos'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handlePageClick = (page: SitePage) => {
    if (onNavigate) {
      onNavigate(page)
    } else {
      navigate(`/${page}`)
    }
  }

  const handleLogoClick = () => {
    navigate('/')
  }

  return (
    <header
      className={`sticky top-0 z-30 px-2 pt-2 transition-all duration-300 sm:px-6 ${
        scrolled
          ? 'bg-white/60 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.08)]'
          : 'bg-white'
      }`}
    >
      <div className="mx-auto flex flex-wrap items-center justify-between gap-2 p-2">
        <button
          aria-label="Ir para a página inicial"
          className="flex cursor-pointer items-center gap-3 text-left transition-opacity hover:opacity-80"
          onClick={handleLogoClick}
          type="button"
        >
          <span>
            <strong className="block text-sm font-semibold text-neutral-900">Fabio Santana</strong>
            <span className="text-xs text-neutral-500">Software Developer</span>
          </span>
        </button>

        <nav
          aria-label="Navegação principal"
          className="order-3 flex w-full items-center justify-center gap-1 rounded-lg border border-transparent bg-white/50 p-1 backdrop-blur-xl transition-all duration-300 hover:border-black hover:shadow-[3px_4px_0px_0px_rgba(0,0,0,1)] sm:order-none sm:w-auto"
        >
          {links.map(({ label, page }) => {
            const isActive = currentPage === page
            return (
              <button
                aria-current={isActive ? 'page' : undefined}
                className={`cursor-pointer px-8 py-1 text-xs transition sm:text-sm ${
                  isActive ? 'text-neutral-500' : 'text-neutral-900 hover:text-neutral-900'
                }`}
                key={page}
                onClick={() => handlePageClick(page)}
                type="button"
              >
                <span
                  className={`border-b-2 pb-0.5 transition ${
                    isActive ? 'border-neutral-900' : 'border-transparent hover:border-neutral-900'
                  }`}
                >
                  {label}
                </span>
              </button>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-transparent bg-white/50 px-3 py-1.5 backdrop-blur-xl transition-all duration-200 focus-within:border-neutral-300 focus-within:ring-1 focus-within:ring-neutral-300">
            <Search className="size-5 shrink-0 text-black" />
            <input
              type="text"
              placeholder="Pesquisar..."
              className="w-28 bg-transparent text-xs text-neutral-700 outline-none placeholder:text-neutral-400 sm:w-36 sm:text-sm"
              readOnly
            />
          </div>

          <button
            aria-label={darkMode ? 'Modo claro' : 'Modo escuro'}
            className="cursor-pointer rounded-lg border border-transparent bg-white/50 p-2 backdrop-blur-xl transition-all duration-300 hover:border-black hover:shadow-[3px_4px_0px_0px_rgba(0,0,0,1)]"
            onClick={() => setDarkMode(!darkMode)}
            type="button"
          >
            {darkMode ? <Sun className="size-5 text-black" /> : <Moon className="size-5 text-black" />}
          </button>

          <button
            className="cursor-pointer rounded-lg border border-transparent bg-white/50 px-4 py-1.5 text-sm text-neutral-800 backdrop-blur-xl transition-all duration-300 hover:border-black hover:shadow-[3px_4px_0px_0px_rgba(0,0,0,1)]"
            onClick={() => onLoginClick?.()}
            type="button"
          >
            <span className="border-b-2 border-transparent pb-0.5 transition hover:border-neutral-900">
              Login
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar

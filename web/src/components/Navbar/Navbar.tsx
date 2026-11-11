'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Moon, Sun, Menu, X, ArrowUpRight } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'

export type NavItemKey = 'inicio' | 'sobre' | 'projetos' | 'blog' | 'contato' | 'login'

export interface NavLink {
  id: NavItemKey
  label: string
  path: string
  hash: string
  isSectionOnHome: boolean
}

export const navLinks: NavLink[] = [
  { id: 'inicio', label: 'Home', path: '/', hash: '#inicio', isSectionOnHome: true },
  { id: 'sobre', label: 'Sobre', path: '/sobre', hash: '#sobre', isSectionOnHome: true },
  { id: 'projetos', label: 'Projetos', path: '/projetos', hash: '#projetos', isSectionOnHome: true },
  { id: 'blog', label: 'Blog', path: '/blog', hash: '#blog', isSectionOnHome: false },
  { id: 'contato', label: 'Contato', path: '/contato', hash: '#contato', isSectionOnHome: true },
  { id: 'login', label: 'Login', path: '/login', hash: '#login', isSectionOnHome: false },
]

function getActiveFromPath(pathname: string | null): NavItemKey {
  if (!pathname || pathname === '/') return 'inicio'
  const match = navLinks.find((item) => item.path === pathname)
  if (match) return match.id
  const clean = pathname.replace(/^\//, '').split('/')[0]
  const fallback = navLinks.find((item) => item.id === clean)
  return fallback ? fallback.id : 'inicio'
}

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()

  const isHome = pathname === '/'
  const [homeActiveSection, setHomeActiveSection] = useState<NavItemKey>('inicio')
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const activeId: NavItemKey = isHome ? homeActiveSection : getActiveFromPath(pathname)

  // Medidas para a linha deslizante
  const navContainerRef = useRef<HTMLDivElement>(null)
  const buttonRefs = useRef<{ [key in NavItemKey]?: HTMLButtonElement | HTMLAnchorElement | null }>({})
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  })

  // Detecta rolagem para alterar o estilo do header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scrollspy com IntersectionObserver na Home
  useEffect(() => {
    if (!isHome) return

    const sectionIds: NavItemKey[] = ['inicio', 'sobre', 'projetos', 'contato']
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Encontra a seção com maior interseção visível
        const visibleEntries = entries.filter((entry) => entry.isIntersecting)
        if (visibleEntries.length > 0) {
          visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio)
          const targetId = visibleEntries[0].target.id as NavItemKey
          setHomeActiveSection(targetId)

          // Atualiza hash na URL sem acionar reload
          if (window.location.hash !== `#${targetId}`) {
            window.history.replaceState(null, '', `#${targetId}`)
          }
        }
      },
      {
        rootMargin: '-20% 0px -40% 0px',
        threshold: [0.1, 0.3, 0.6],
      }
    )

    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [isHome])

  // Atualiza posição da linha deslizante (sliding indicator)
  const updateIndicator = useCallback(() => {
    const activeButton = buttonRefs.current[activeId]
    const container = navContainerRef.current

    if (activeButton && container) {
      const containerRect = container.getBoundingClientRect()
      const buttonRect = activeButton.getBoundingClientRect()

      setIndicatorStyle({
        left: buttonRect.left - containerRect.left + 8,
        width: Math.max(buttonRect.width - 16, 16),
        opacity: 1,
      })
    } else {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }))
    }
  }, [activeId])

  useEffect(() => {
    updateIndicator()

    // Recalcula depois que as fontes carregarem, pois a largura dos itens muda
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(updateIndicator).catch(() => {})
    }

    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [updateIndicator])

  // Trata clique nos links
  const handleItemClick = (item: NavLink) => {
    setMobileMenuOpen(false)

    if (isHome && item.isSectionOnHome) {
      const targetElement = document.getElementById(item.id)
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' })
        window.history.replaceState(null, '', `#${item.id}`)
        setHomeActiveSection(item.id)
      }
      return
    }

    // Fora da Home, ou destinos que não são seções da Home: navega para a rota real
    router.push(item.path)
  }

  // Cor da linha deslizante:
  // - Na Home (preview de seção): cinza
  // - Na página real: alto contraste (preto no tema claro, branco no escuro)
  const indicatorColor = isHome ? 'var(--text-tertiary)' : 'var(--border-primary)'

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 font-mono ${
        scrolled
          ? 'backdrop-blur-xl shadow-[0_1px_0_0_var(--shadow-secondary)]'
          : 'bg-transparent'
      }`}
      style={{
        backgroundColor: scrolled ? 'var(--bg-elevated)' : 'var(--bg-page)',
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logotipo / Nome com role de apresentação */}
        <button
          onClick={() => {
            if (isHome) {
              const el = document.getElementById('inicio')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
              window.history.replaceState(null, '', '/')
              setHomeActiveSection('inicio')
            } else {
              router.push('/')
            }
          }}
          type="button"
          aria-label="Fabio Santana - Início"
          className="group flex cursor-pointer items-center gap-2 text-left outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-[var(--border-primary)] rounded-md px-1"
        >
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Fabio Santana
            </span>
            <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
              Software Developer
            </span>
          </div>
        </button>

        {/* Menu Desktop com Linha Deslizante */}
        <nav
          ref={navContainerRef}
          aria-label="Navegação principal"
          className="relative hidden items-center rounded-xl border p-1 backdrop-blur-xl transition-all duration-300 md:flex"
          style={{
            backgroundColor: 'var(--bg-elevated)',
            borderColor: 'var(--border-tertiary)',
          }}
        >
          {/* Linha Deslizante (Sliding Indicator) */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-1 h-[2px] rounded-full transition-all duration-300 ease-out"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
              backgroundColor: indicatorColor,
              opacity: indicatorStyle.opacity,
            }}
          />

          {navLinks.map((item) => {
            const isActive = activeId === item.id
            return (
              <button
                key={item.id}
                ref={(node) => {
                  buttonRefs.current[item.id] = node
                }}
                onClick={() => handleItemClick(item)}
                type="button"
                aria-current={isActive ? 'true' : undefined}
                className="group relative cursor-pointer px-3.5 py-1.5 text-xs font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-primary)] rounded-lg"
                style={{
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                }}
              >
                <span>{item.label}</span>

                {/* Linha cinza clara no hover */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-1 left-2 right-2 h-[1px] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  style={{
                    backgroundColor: 'var(--border-secondary)',
                  }}
                />
              </button>
            )
          })}
        </nav>

        {/* Ações: Alternador de tema & Menu Hamburguer */}
        <div className="flex items-center gap-2">
          {/* Botão de Tema */}
          <button
            onClick={toggleTheme}
            type="button"
            aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
            className="cursor-pointer rounded-lg border p-2 backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-primary)]"
            style={{
              backgroundColor: 'var(--bg-elevated)',
              borderColor: 'var(--border-tertiary)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-primary)'
              e.currentTarget.style.boxShadow = 'var(--shadow-hover-sm)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-tertiary)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {theme === 'dark' ? (
              <Sun className="size-4" style={{ color: 'var(--icon-primary)' }} />
            ) : (
              <Moon className="size-4" style={{ color: 'var(--icon-primary)' }} />
            )}
          </button>

          {/* Botão Hamburguer no Mobile */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            type="button"
            aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            aria-expanded={mobileMenuOpen}
            className="cursor-pointer rounded-lg border p-2 backdrop-blur-xl transition-all duration-200 md:hidden outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-primary)]"
            style={{
              backgroundColor: 'var(--bg-elevated)',
              borderColor: 'var(--border-tertiary)',
            }}
          >
            {mobileMenuOpen ? (
              <X className="size-4" style={{ color: 'var(--icon-primary)' }} />
            ) : (
              <Menu className="size-4" style={{ color: 'var(--icon-primary)' }} />
            )}
          </button>
        </div>
      </div>

      {/* Menu Gaveta Responsivo no Mobile */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-label="Menu móvel"
          className="border-b px-4 py-4 backdrop-blur-xl md:hidden transition-all duration-300"
          style={{
            backgroundColor: 'var(--bg-elevated)',
            borderColor: 'var(--border-secondary)',
          }}
        >
          <nav className="flex flex-col gap-1">
            {navLinks.map((item) => {
              const isActive = activeId === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  type="button"
                  aria-current={isActive ? 'true' : undefined}
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 text-xs font-medium transition-colors text-left"
                  style={{
                    backgroundColor: isActive ? 'var(--bg-secondary)' : 'transparent',
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  }}
                >
                  <span>{item.label}</span>
                  {!item.isSectionOnHome && (
                    <ArrowUpRight className="size-3" style={{ color: 'var(--text-tertiary)' }} />
                  )}
                </button>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar

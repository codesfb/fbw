'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Search, Moon, Sun } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useTheme } from '@/hooks/useTheme'

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

export function Navbar({ activePage, onNavigate, onLoginClick }: NavbarProps) {
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Determina a página ativa a partir da rota atual se não for passada explicitamente
  const currentPath = (pathname ? pathname.replace(/^\//, '') : '') as SitePage
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
      router.push(`/${page}`)
    }
  }

  const handleLogoClick = () => {
    router.push('/')
  }

  return (
    <header
      className={`sticky top-0 z-30 px-2 pt-2 transition-all duration-300 sm:px-6 ${
        scrolled ? 'backdrop-blur-xl shadow-[0_1px_0_0_var(--shadow-secondary)]' : ''
      }`}
      style={{
        backgroundColor: 'var(--bg-page)',
      }}
    >
      <div className="mx-auto flex flex-col gap-2 p-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <button
          aria-label="Ir para a página inicial"
          className="flex cursor-pointer items-center gap-3 text-left transition-opacity hover:opacity-80"
          onClick={handleLogoClick}
          type="button"
        >
          <span>
            <strong className="block text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              Fabio Santana
            </strong>
            <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
              Software Developer
            </span>
          </span>
        </button>

        <nav
          aria-label="Navegação principal"
          className="order-3 flex w-full items-center justify-center gap-1 overflow-x-auto rounded-lg border p-1 backdrop-blur-xl transition-all duration-300 sm:order-none sm:w-auto"
          style={{
            backgroundColor: 'var(--bg-elevated)',
            borderColor: 'var(--border-transparent)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-primary)'
            e.currentTarget.style.boxShadow = 'var(--shadow-hover)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-transparent)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          {links.map(({ label, page }) => {
            const isActive = currentPage === page
            return (
              <button
                aria-current={isActive ? 'page' : undefined}
                className="cursor-pointer px-2 py-1 text-[10px] transition sm:px-8 sm:text-xs"
                style={{
                  color: isActive ? 'var(--text-tertiary)' : 'var(--text-primary)',
                }}
                key={page}
                onClick={() => handlePageClick(page)}
                type="button"
              >
                <span
                  className="border-b-2 pb-0.5 transition"
                  style={{
                    borderColor: isActive ? 'var(--border-primary)' : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = 'var(--border-primary)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = 'transparent'
                    }
                  }}
                >
                  {label}
                </span>
              </button>
            )
          })}
        </nav>

        <div className="flex items-center justify-end gap-2 sm:gap-3">
          <div
            className="hidden items-center gap-2 rounded-lg border px-3 py-1.5 backdrop-blur-xl transition-all duration-200 sm:flex"
            style={{
              backgroundColor: 'var(--bg-elevated)',
              borderColor: 'var(--border-transparent)',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-secondary)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-transparent)'
            }}
          >
            <Search className="size-5 shrink-0" style={{ color: 'var(--icon-primary)' }} />
            <input
              type="text"
              placeholder="Pesquisar..."
              className="w-28 bg-transparent text-xs outline-none sm:w-36 sm:text-sm"
              style={{
                color: 'var(--text-secondary)',
              }}
              readOnly
            />
          </div>

          <button
            aria-label={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
            className="cursor-pointer rounded-lg border p-2 backdrop-blur-xl transition-all duration-300"
            style={{
              backgroundColor: 'var(--bg-elevated)',
              borderColor: 'var(--border-transparent)',
            }}
            onClick={toggleTheme}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-primary)'
              e.currentTarget.style.boxShadow = 'var(--shadow-hover)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-transparent)'
              e.currentTarget.style.boxShadow = 'none'
            }}
            type="button"
          >
            {theme === 'dark' ? (
              <Sun className="size-5" style={{ color: 'var(--icon-primary)' }} />
            ) : (
              <Moon className="size-5" style={{ color: 'var(--icon-primary)' }} />
            )}
          </button>

          <Button
            size="md"
            variant="glass"
            className="hidden sm:inline-flex"
            onClick={() => onLoginClick?.()}
          >
            Login
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Navbar

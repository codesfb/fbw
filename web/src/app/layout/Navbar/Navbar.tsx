import profilePhoto from '../../../assets/fabio.jpg'

export type SitePage = 'projetos' | 'contato' | 'experiencias' | 'blog' | 'sobre'

type NavbarProps = {
  activePage: SitePage
  onNavigate: (page: SitePage) => void
  onLoginClick: () => void
}

const links: { label: string; page: SitePage }[] = [
  { label: 'Projetos', page: 'projetos' },
  { label: 'Contato', page: 'contato' },
  { label: 'Experiências', page: 'experiencias' },
  { label: 'Blog', page: 'blog' },
  { label: 'Sobre', page: 'sobre' },
]

function Navbar({ activePage, onNavigate, onLoginClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 px-2 pt-2 sm:px-6">
      <div className="mx-auto flex flex-wrap items-center justify-between gap-3 p-2">
        <button
          aria-label="Ir para projetos"
          className="flex items-center gap-3 text-left"
          onClick={() => onNavigate('projetos')}
          type="button"
        >
          <img
            className="size-11 rounded-full border-2 border-white object-cover shadow-sm"
            src={profilePhoto}
            alt=""
          />
          <span>
            <strong className="block text-sm font-semibold text-neutral-900">Fabio Santana</strong>
            <span className="text-xs text-neutral-500">Software Developer</span>
          </span>
        </button>

        <nav
          aria-label="Navegação principal"
          // Substitua somente o className atual do <nav> por:
            className="order-3 flex w-full items-center justify-center gap-1 rounded-lg border-x border-t border-b-[3px] border-white/80 border-b-neutral-500/70 bg-white/50 p-1 backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-b-neutral-800 hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)] sm:order-none sm:w-auto"
        >
          {links.map(({ label, page }) => (
            <button
              aria-current={activePage === page ? 'page' : undefined}
              className={`rounded-full px-3 py-2 text-xs transition sm:text-sm ${activePage === page ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-600 hover:bg-white/70 hover:text-neutral-900'}`}
              key={page}
              onClick={() => onNavigate(page)}
              type="button"
            >
              {label}
            </button>
          ))}
        </nav>

        <button
          className="rounded-xl bg-white/60 px-4 py-2 text-sm text-neutral-800 transition hover:bg-white sm:rounded-full"
          onClick={onLoginClick}
          type="button"
        >
          Login
        </button>
      </div>
    </header>
  )
}

export default Navbar
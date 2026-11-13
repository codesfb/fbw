'use client'

import Image from 'next/image'
import { ArrowRight, BookOpen, Code2 } from 'lucide-react'
import fabioImg from '@/assets/fabio.jpg'
import Button from '@/components/ui/Button'
import { GithubIcon, LinkedinIcon } from '@/components/common/Icons'
import aboutData from '@/data/about.json'
import { useMascot } from '@/context/MascotContext'

export function HeroSection() {
  const { setHint } = useMascot()

  const githubLink = aboutData.socialLinks.find((l) => l.icon === 'github')?.url || 'https://github.com/codesfb'
  const linkedinLink = aboutData.socialLinks.find((l) => l.icon === 'linkedin')?.url || 'https://www.linkedin.com/in/[seu-usuario]'

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      window.history.replaceState(null, '', `#${id}`)
    }
  }

  return (
    <section
      id="inicio"
      className="relative flex min-h-[calc(100vh-80px)] scroll-mt-20 flex-col items-center justify-center px-4 py-12 sm:px-6"
    >
      {/* Bloco 'Sobre' do tamanho de um modal, cercado por borda e centralizado na Home */}
      <div
        className="relative mx-auto w-full max-w-2xl rounded-2xl border p-6 font-mono backdrop-blur-xl sm:p-8"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-primary)',
          boxShadow: 'var(--shadow-modal)',
        }}
      >
        {/* Cabeçalho do modal com foto no canto superior esquerdo e título elegante */}
        <div className="flex items-start gap-4 sm:gap-5">
          {/* Minha foto menor, com bordas arredondadas, no canto superior esquerdo */}
          <div
            className="relative size-16 shrink-0 overflow-hidden rounded-xl border-2 transition-transform duration-300 hover:scale-105 sm:size-20"
            style={{
              borderColor: 'var(--border-primary)',
              boxShadow: 'var(--shadow-hover-sm)',
            }}
          >
            <Image
              src={fabioImg}
              alt="Foto de Fabio Santana"
              fill
              priority
              sizes="(max-width: 640px) 64px, 80px"
              className="object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <span
              className="text-[11px] font-semibold tracking-wide uppercase"
              style={{ color: 'var(--text-tertiary)' }}
            >
              {aboutData.role}
            </span>

            {/* Título em fonte elegante, itálica, contrastando com o mono */}
            <h1
              className="font-serif-elegant mt-1 text-2xl font-normal italic tracking-tight sm:text-3xl lg:text-4xl leading-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              Fabio Santana
            </h1>
          </div>
        </div>

        {/* Texto de apresentação junto ao bloco, discreto (fonte pequena, cor suave) */}
        <div
          className="mt-5 space-y-2.5 text-xs sm:text-[13px] leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          <p>
            Olá! Sou estudante de Engenharia de Software no IFSP e desenvolvedor independente.
            Gosto de construir back-end robusto com Java e Spring, interfaces funcionais com React e TypeScript,
            e passar o tempo no terminal com Linux e Neovim.
          </p>
          <p>
            Antes do código, passei cerca de 6 anos no marketing — experiência que levo comigo para criar sistemas que não apenas funcionam com precisão técnica, mas que também comunicam com clareza.
          </p>
        </div>

        {/* Botões: GitHub, Ver projetos, Blog, LinkedIn padronizados */}
        <div
          className="mt-6 flex flex-wrap items-center gap-2.5 border-t pt-5"
          style={{ borderColor: 'var(--border-tertiary)' }}
        >
          <Button
            variant="black"
            size="md"
            onClick={() => scrollToSection('projetos')}
            onMouseEnter={() => setHint('Quer ver os projetos em destaque? Clique aqui!')}
            onMouseLeave={() => setHint(null)}
            className="gap-2"
          >
            <Code2 className="size-3.5" />
            <span>Ver projetos</span>
            <ArrowRight className="size-3.5" />
          </Button>

          <Button
            variant="glass"
            size="md"
            onClick={() => scrollToSection('blog')}
            onMouseEnter={() => setHint('Explore artigos e pensamentos sobre tecnologia!')}
            onMouseLeave={() => setHint(null)}
            className="gap-2"
          >
            <BookOpen className="size-3.5" />
            <span>Blog</span>
          </Button>

          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHint('Acesse meus repositórios no GitHub!')}
            onMouseLeave={() => setHint(null)}
          >
            <Button variant="solid" size="md" className="gap-2">
              <GithubIcon className="size-3.5" />
              <span>GitHub</span>
            </Button>
          </a>

          <a
            href={linkedinLink}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHint('Conecte-se comigo no LinkedIn!')}
            onMouseLeave={() => setHint(null)}
          >
            <Button variant="solid" size="md" className="gap-2">
              <LinkedinIcon className="size-3.5" />
              <span>LinkedIn</span>
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

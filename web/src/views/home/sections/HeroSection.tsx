'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Code2, BookOpen, MapPin, Sparkles } from 'lucide-react'
import fabioImg from '@/assets/fabio.jpg'
import MascotSlot from '@/components/Mascot/MascotSlot'
import Button from '@/components/ui/Button'

export function HeroSection() {
  const scrollToProjects = () => {
    const el = document.getElementById('projetos')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      window.history.replaceState(null, '', '#projetos')
    }
  }

  return (
    <section
      id="inicio"
      className="relative flex min-h-[calc(100vh-80px)] scroll-mt-20 flex-col items-center justify-center px-4 py-12 sm:px-6"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center font-mono">
        {/* Badge de localização / status */}
        <div
          className="mb-6 inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs"
          style={{
            backgroundColor: 'var(--bg-elevated)',
            borderColor: 'var(--border-tertiary)',
            color: 'var(--text-secondary)',
          }}
        >
          <MapPin className="size-3 text-red-500" />
          <span>São Carlos, SP • Brasil</span>
          <span className="size-1 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            Disponível para novos projetos
          </span>
        </div>

        {/* Foto de Perfil com moldura neobrutalista */}
        <div className="relative mb-6">
          <div
            className="relative size-28 overflow-hidden rounded-2xl border-2 sm:size-32 transition-transform duration-300 hover:scale-105"
            style={{
              borderColor: 'var(--border-primary)',
              boxShadow: 'var(--shadow-hover)',
            }}
          >
            <Image
              src={fabioImg}
              alt="Foto de Fabio Santana"
              fill
              priority
              sizes="(max-width: 640px) 112px, 128px"
              className="object-cover"
            />
          </div>
          <div
            className="absolute -bottom-2 -right-2 rounded-full border p-1"
            style={{
              backgroundColor: 'var(--bg-elevated-solid)',
              borderColor: 'var(--border-primary)',
            }}
            title="Desenvolvedor & Engenheiro de Software"
          >
            <Sparkles className="size-4 text-amber-500" />
          </div>
        </div>

        {/* Título & Mensagem de Boas-vindas */}
        <h1
          className="mb-3 text-3xl font-extrabold tracking-tight sm:text-5xl"
          style={{ color: 'var(--text-primary)' }}
        >
          Olá, mundo! Eu sou o Fabio.
        </h1>

        <p
          className="mb-6 max-w-2xl text-sm leading-relaxed sm:text-base"
          style={{ color: 'var(--text-secondary)' }}
        >
          Estudante de Engenharia de Software no IFSP e desenvolvedor independente.
          Construo aplicações web modernas, explorador de sistemas e apaixonado por código limpo,
          Java, Spring, React e ferramentas de terminal.
        </p>

        {/* Botões de Ação para Projetos e Blog */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          <Button
            variant="black"
            size="lg"
            onClick={scrollToProjects}
            className="gap-2"
          >
            <Code2 className="size-4" />
            <span>Ver Projetos</span>
            <ArrowRight className="size-4" />
          </Button>

          <Link href="/blog">
            <Button
              variant="glass"
              size="lg"
              className="gap-2"
            >
              <BookOpen className="size-4" />
              <span>Explorar o Blog</span>
            </Button>
          </Link>
        </div>

        {/* MascotSlot: robô animado com fala fixa estruturado para futura IA */}
        <div className="w-full max-w-xl">
          <MascotSlot
            initialMessage="Bem-vindo ao meu espaço digital! 🤖 Sou o Menon. Navegue pelas seções para me conhecer melhor!"
          />
        </div>
      </div>
    </section>
  )
}

export default HeroSection

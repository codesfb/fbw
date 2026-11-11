'use client'

import { useState } from 'react'
import Mascote from '@/components/Mascot/Menon'
import { Sparkles, Bot } from 'lucide-react'

export interface MascotSlotProps {
  initialMessage?: string
  /**
   * Flag para ativação do assistente com IA generativa real no futuro.
   * // TODO: plugar endpoint de streaming ou LLM para chat interativo
   */
  isAIActive?: boolean
  className?: string
}

export function MascotSlot({
  initialMessage = 'Olá! Eu sou o Menon, o assistente virtual do Fabio. 🤖 Fique à vontade para explorar os projetos e a trajetória dele!',
  isAIActive = false,
  className = '',
}: MascotSlotProps) {
  const [estado, setEstado] = useState<'idle' | 'falando' | 'pensando'>('idle')

  const handleMascotClick = () => {
    // Interação simples no clique
    setEstado('falando')
    setTimeout(() => {
      setEstado('idle')
    }, 3000)
  }

  return (
    <div
      className={`relative flex flex-col items-center gap-3 sm:flex-row sm:items-start ${className}`}
      data-testid="mascot-slot"
    >
      {/* Container do Mascote */}
      <div
        className="group relative cursor-pointer"
        onClick={handleMascotClick}
        title="Clique para interagir com o Menon"
      >
        <div className="transition-transform duration-300 group-hover:scale-105">
          <Mascote estado={estado} tamanho={72} />
        </div>
      </div>

      {/* Balão de Fala do Mascote */}
      <div
        className="relative max-w-sm rounded-xl border p-3.5 text-xs font-mono shadow-sm backdrop-blur-md transition-all duration-300"
        style={{
          backgroundColor: 'var(--bg-elevated)',
          borderColor: 'var(--border-secondary)',
          color: 'var(--text-secondary)',
        }}
      >
        {/* Triângulo / Seta do balão para o mascote */}
        <div
          className="hidden sm:block absolute -left-2 top-4 size-3 rotate-45 border-b border-l"
          style={{
            backgroundColor: 'var(--bg-elevated)',
            borderColor: 'var(--border-secondary)',
          }}
        />

        <div className="mb-1 flex items-center gap-1.5 font-bold" style={{ color: 'var(--text-primary)' }}>
          <Bot className="size-3.5" />
          <span>Menon</span>
          <span
            className="ml-auto inline-flex items-center gap-1 rounded-full px-2 py-0.2 text-[9px] font-medium"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-tertiary)',
            }}
          >
            <Sparkles className="size-2.5 text-amber-500" />
            {isAIActive ? 'IA Ativa' : 'Assistente'}
          </span>
        </div>

        <p className="leading-relaxed">{initialMessage}</p>

        {!isAIActive && (
          <div
            className="mt-2 border-t pt-1.5 text-[10px]"
            style={{ borderColor: 'var(--border-tertiary)', color: 'var(--text-quaternary)' }}
          >
            Em breve: converse com a IA sobre o Fabio.
          </div>
        )}
      </div>
    </div>
  )
}

export default MascotSlot

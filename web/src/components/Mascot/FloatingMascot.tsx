'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Mascote from './Menon'
import { useMascot } from '@/context/MascotContext'

export function FloatingMascot() {
  const pathname = usePathname()
  const router = useRouter()
  const { estado, bubbleMessage, wakeUp } = useMascot()

  const modoConstrucao = process.env.NEXT_PUBLIC_MODO_CONSTRUCAO === 'true'
  const esconderMascote = pathname === '/em-construcao'

  useEffect(() => {
    if (modoConstrucao && pathname !== '/em-construcao') {
      router.replace('/em-construcao')
    }
  }, [modoConstrucao, pathname, router])

  if (esconderMascote) {
    return null
  }

  return (
    <aside
      aria-label="Mascote Menon"
      className="mascote-fixo pointer-events-auto select-none"
    >
      {/* Balão de fala do Menon */}
      {bubbleMessage && (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-none absolute bottom-full right-0 mb-3 w-max max-w-[240px] sm:max-w-[290px] rounded-xl border p-3 text-xs font-mono backdrop-blur-md transition-all duration-300"
          style={{
            backgroundColor: 'var(--bg-elevated-solid)',
            borderColor: 'var(--border-primary)',
            color: 'var(--text-primary)',
            boxShadow: 'var(--shadow-hover-sm)',
          }}
        >
          <p className="leading-relaxed text-[11px] sm:text-xs font-medium">{bubbleMessage}</p>
          {/* Seta do balão */}
          <span
            aria-hidden="true"
            className="absolute -bottom-1.5 right-8 size-2.5 rotate-45 border-r border-b"
            style={{
              backgroundColor: 'var(--bg-elevated-solid)',
              borderColor: 'var(--border-primary)',
            }}
          />
        </div>
      )}

      <Mascote
        estado={estado}
        tamanho={86}
        onClick={() => wakeUp(5000)}
      />
    </aside>
  )
}

export default FloatingMascot

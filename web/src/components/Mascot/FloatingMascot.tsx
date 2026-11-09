'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Mascote from './Menon'

export function FloatingMascot() {
  const pathname = usePathname()
  const router = useRouter()
  const timeoutRef = useRef<number | null>(null)
  const [estadoMascote, setEstadoMascote] = useState<'idle' | 'dormindo'>('dormindo')

  const modoConstrucao = process.env.NEXT_PUBLIC_MODO_CONSTRUCAO === 'true'
  const esconderMascote = pathname === '/em-construcao'

  useEffect(() => {
    if (modoConstrucao && pathname !== '/em-construcao') {
      router.replace('/em-construcao')
    }
  }, [modoConstrucao, pathname, router])

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

  if (esconderMascote) {
    return null
  }

  return (
    <div className="mascote-fixo">
      <Mascote estado={estadoMascote} tamanho={86} onClick={handleMascoteClick} />
    </div>
  )
}

export default FloatingMascot

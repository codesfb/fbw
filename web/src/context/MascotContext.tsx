'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
} from 'react'
import { usePathname } from 'next/navigation'

export type MascoteEstado = 'idle' | 'dormindo' | 'trabalhando' | 'falando' | 'pensando'

export interface MascotContextType {
  estado: MascoteEstado
  bubbleMessage: string | null
  setHint: (message: string | null) => void
  wakeUp: (durationMs?: number) => void
  showWelcome: (message: string, durationMs?: number) => void
}

const MascotContext = createContext<MascotContextType | null>(null)

export function MascotProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [estado, setEstado] = useState<MascoteEstado>('dormindo')
  const [bubbleMessage, setBubbleMessage] = useState<string | null>(null)
  
  // Rastreia timers ativos
  const sleepTimerRef = useRef<number | null>(null)
  const isHintActiveRef = useRef(false)

  const clearSleepTimer = () => {
    if (sleepTimerRef.current !== null) {
      window.clearTimeout(sleepTimerRef.current)
      sleepTimerRef.current = null
    }
  }

  // Acorda temporariamente o Menon
  const wakeUp = useCallback((durationMs: number = 5000) => {
    clearSleepTimer()
    setEstado('idle')
    sleepTimerRef.current = window.setTimeout(() => {
      setEstado('dormindo')
    }, durationMs)
  }, [])

  // Exibe mensagem de boas-vindas na entrada da Home
  const showWelcome = useCallback((message: string, durationMs: number = 6000) => {
    clearSleepTimer()
    setBubbleMessage(message)
    setEstado('falando')

    sleepTimerRef.current = window.setTimeout(() => {
      // Se nenhuma dica de hover tomou o controle, volta a dormir
      if (!isHintActiveRef.current) {
        setBubbleMessage(null)
        setEstado('dormindo')
      }
    }, durationMs)
  }, [])

  // Dica acionada ao passar o mouse em cards e botões
  const setHint = useCallback((message: string | null) => {
    if (message) {
      isHintActiveRef.current = true
      clearSleepTimer()
      setBubbleMessage(message)
      setEstado('falando')
    } else {
      isHintActiveRef.current = false
      setBubbleMessage(null)
      // Pequeno debounce antes de adormecer para transição suave
      clearSleepTimer()
      sleepTimerRef.current = window.setTimeout(() => {
        if (!isHintActiveRef.current) {
          setEstado('dormindo')
        }
      }, 400)
    }
  }, [])

  // Boas-vindas automáticas ao acessar a Home
  useEffect(() => {
    if (pathname !== '/') {
      // Fora da Home, limpa timers pendentes
      clearSleepTimer()
      return
    }

    // Pequeno delay inicial para a página renderizar suavemente
    const timer = window.setTimeout(() => {
      showWelcome('Olá! Bem-vindo ao meu espaço digital. 👾', 5500)
    }, 800)

    return () => {
      window.clearTimeout(timer)
      clearSleepTimer()
    }
  }, [pathname, showWelcome])

  // Limpeza geral no unmount
  useEffect(() => {
    return () => {
      clearSleepTimer()
    }
  }, [])

  return (
    <MascotContext.Provider
      value={{
        estado,
        bubbleMessage,
        setHint,
        wakeUp,
        showWelcome,
      }}
    >
      {children}
    </MascotContext.Provider>
  )
}

export function useMascot() {
  const context = useContext(MascotContext)
  if (!context) {
    throw new Error('useMascot deve ser usado dentro de MascotProvider')
  }
  return context
}

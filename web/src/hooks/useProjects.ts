import { useState, useEffect, useCallback } from 'react'
import type { ProjectCardProps } from '@/components/ui/Card/ProjectCard'
import { mockProjects } from '@/data/projects'

export interface UseProjectsResult {
  projects: ProjectCardProps[]
  loading: boolean
  error: Error | null
  isFallback: boolean
  refetch: () => Promise<void>
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export function useProjects(): UseProjectsResult {
  const [projects, setProjects] = useState<ProjectCardProps[]>(mockProjects)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  const [isFallback, setIsFallback] = useState<boolean>(true)

  const loadData = useCallback(async (isInitial = false) => {
    if (!isInitial) {
      setLoading(true)
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/projects`, {
        headers: {
          Accept: 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status} ${response.statusText}`)
      }

      const data: ProjectCardProps[] = await response.json()

      if (Array.isArray(data)) {
        // Se a API retornou array vazio, usa mocks
        if (data.length === 0) {
          setProjects(mockProjects)
          setIsFallback(true)
        } else {
          // API retornou dados reais
          setProjects(data)
          setIsFallback(false)
        }
        setError(null)
      } else {
        throw new Error('Formato de resposta inválido')
      }
    } catch (err) {
      // Em caso de erro na API (offline, etc), usa mocks
      setError(err instanceof Error ? err : new Error('Falha ao comunicar com a API'))
      setProjects(mockProjects)
      setIsFallback(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let ignore = false

    const run = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/projects`, {
          headers: {
            Accept: 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error(`Erro na API: ${response.status} ${response.statusText}`)
        }

        const data: ProjectCardProps[] = await response.json()
        if (ignore) return

        if (Array.isArray(data)) {
          // Se a API retornou array vazio, usa mocks
          if (data.length === 0) {
            setProjects(mockProjects)
            setIsFallback(true)
          } else {
            // API retornou dados reais
            setProjects(data)
            setIsFallback(false)
          }
          setError(null)
        } else {
          throw new Error('Formato de resposta inválido')
        }
      } catch (err) {
        if (ignore) return
        // Em caso de erro na API (offline, etc), usa mocks
        setError(err instanceof Error ? err : new Error('Falha ao comunicar com a API'))
        setProjects(mockProjects)
        setIsFallback(true)
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    run()

    return () => {
      ignore = true
    }
  }, [])

  return {
    projects,
    loading,
    error,
    isFallback,
    refetch: () => loadData(false),
  }
}

export default useProjects

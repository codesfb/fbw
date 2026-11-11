import type { ProjectCardProps } from '@/views/projects/components/Card/ProjectCard'

export const mockProjects: ProjectCardProps[] = [
  {
    title: 'Algorithms Visualizer & Performance Explorer',
    description:
      'Ferramenta interativa para visualização em tempo real de algoritmos de ordenação, grafos e árvores com métricas comparativas de desempenho.',
    repoUrl: 'https://github.com/codesfb/algorithms-v',
    siteUrl: 'https://algorithms.fabiosantana.dev',
    languages: ['TypeScript', 'React', 'Tailwind'],
    tags: ['algoritmos', 'visualização', 'educação'],
    status: 'em-andamento',
    updatedAt: '2026-11-08T14:00:00Z',
    featured: true,
    stars: 84,
    readme: `# Algorithms Visualizer & Performance Explorer

Visualizador interativo de algoritmos e estruturas de dados desenvolvido para análise didática e exploração de complexidade temporal e espacial.

### Algoritmos suportados
- Ordenação: QuickSort, MergeSort, HeapSort, TimSort
- Busca e Grafos: Dijkstra, A*, BFS, DFS
- Árvores: AVL, Red-Black, B-Tree
`,
    media: {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1516116211227-bbc154ba4b9e?auto=format&fit=crop&w=1200&q=80',
      alt: 'Interface do visualizador de algoritmos',
    },
  },
  {
    title: 'Fabio Santana — Portfolio & Web Hub',
    description:
      'Site pessoal e hub de projetos construído com Next.js 16, React 19, TypeScript e arquitetura moderna com mascote e suporte a IA.',
    repoUrl: 'https://github.com/codesfb/fbw',
    siteUrl: 'https://fabiosantana.dev',
    languages: ['TypeScript', 'React', 'Next.js'],
    tags: ['portfolio', 'web', 'open-source'],
    status: 'concluido',
    updatedAt: '2026-11-10T10:00:00Z',
    featured: true,
    stars: 32,
    readme: `# Fabio Santana — Portfólio Pessoal

Monorepo com front-end em Next.js (App Router) e back-end Spring Boot para sincronização automática com a API do GitHub e showcase de projetos.
`,
    media: {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      alt: 'Interface do site pessoal',
    },
  },
  {
    title: 'Explain — Terminal Assistant',
    description:
      'Utilitário CLI para Linux que analisa comandos, pipelines e logs diretamente no terminal, traduzindo opções enigmáticas em linguagem clara.',
    repoUrl: 'https://github.com/codesfb/explain-cli',
    languages: ['Rust', 'Shell'],
    tags: ['cli', 'terminal', 'linux', 'neovim'],
    status: 'em-andamento',
    updatedAt: '2026-11-02T16:20:00Z',
    featured: true,
    stars: 56,
    readme: `# Explain CLI ⚡

Utilitário de linha de comando para ambientes Linux que desmistifica pipelines complexos e comandos Unix em tempo real.
`,
    media: {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1200&q=80',
      alt: 'Interface de terminal com utilitário CLI',
    },
  },
  {
    title: 'Portal Dev Community',
    description:
      'Plataforma completa para compartilhamento de artigos, snippets e discussões entre desenvolvedores.',
    repoUrl: 'https://github.com/codesfb/dev-community',
    siteUrl: 'https://dev-community.demo.app',
    languages: ['React', 'TypeScript', 'Tailwind'],
    tags: ['web', 'fullstack'],
    status: 'concluido',
    updatedAt: '2026-10-15T12:00:00Z',
    stars: 128,
  },
]

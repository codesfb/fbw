import type { ProjectCardProps } from '@/views/projects/components/Card/ProjectCard'

export const mockProjects: ProjectCardProps[] = [
  {
    title: 'Portal Dev Community',
    description:
      'Plataforma completa para compartilhamento de artigos, snippets e discussões entre desenvolvedores.',
    repoUrl: 'https://github.com/codesfb/dev-community',
    siteUrl: 'https://dev-community.demo.app',
    languages: ['React', 'TypeScript', 'Tailwind'],
    tags: ['web', 'fullstack'],
    status: 'concluido',
    updatedAt: '2026-11-04T12:00:00Z',
    featured: true,
    stars: 128,
    readme: `# Portal Dev Community

## Visão Geral
Uma plataforma moderna desenhada para que desenvolvedores possam publicar tutoriais, criar snippets com syntax highlighting e interagir por comentários estruturados.

### Tecnologias
- React 19 + TypeScript
- Tailwind CSS v4
- Vite e Rolldown
- Supabase para autenticação e banco PostgreSQL

### Como rodar localmente
\`\`\`bash
git clone https://github.com/codesfb/dev-community.git
cd dev-community
npm install
npm run dev
\`\`\`
`,
    media: {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      alt: 'Interface do portal com editor de código',
    },
  },
  {
    title: 'HyperCLI Tool',
    description:
      'Ferramenta CLI desktop para automação de builds e sincronização com streaming de logs em alta velocidade.',
    repoUrl: 'https://github.com/codesfb/hyper-cli',
    downloadUrl: 'https://github.com/codesfb/hyper-cli/releases',
    languages: ['Rust', 'Shell'],
    tags: ['cli', 'tools'],
    status: 'em-andamento',
    updatedAt: '2026-10-28T18:30:00Z',
    stars: 42,
    readme: `# HyperCLI Tool ⚡

Utilitário de linha de comando de alto desempenho feito em Rust para automatizar rotinas de engenharia de software e deploy local.

### Funcionalidades
- Sincronização concorrente de arquivos
- Pipeline local com hot-reload de containers
- Exportação de telemetria em formato JSON

### Instalação
\`\`\`bash
cargo install hyper-cli
hyper --version
\`\`\`
`,
    media: {
      type: 'video',
      src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    },
  },
  {
    title: 'Legacy Parser Engine',
    description:
      'Compilador e parser para migração de templates legados legíveis em XML/XSLT para componentes JSX.',
    repoUrl: 'https://github.com/codesfb/legacy-parser',
    languages: ['Java'],
    tags: ['parser', 'ast'],
    status: 'arquivado',
    updatedAt: '2024-03-15T09:15:00Z',
    stars: 15,
    readme: `# Legacy Parser Engine

Compilador construído em Java para processamento e reescrita de sintaxes legadas XML/XSLT em componentes funcionais React/JSX mantendo fidelidade semântica.
`,
  },
]

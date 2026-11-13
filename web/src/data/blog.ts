export interface BlogPost {
  id: string
  slug: string
  title: string
  date: string
  summary: string
  content: string
  tags: string[]
  readTime: string
  coverGradient: {
    from: string
    to: string
    label: string
  }
}

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'construindo-clis-eficientes-java-graalvm',
    title: 'Construindo CLIs rápidas em Java com GraalVM Native Image',
    date: '10 de nov. de 2026',
    readTime: '5 min de leitura',
    tags: ['Java', 'GraalVM', 'Linux'],
    summary:
      'Como compilar aplicações Java para binários nativos com tempo de inicialização instantâneo e baixo consumo de memória no terminal.',
    content: `Java historicamente teve a fama de ser lento para inicializar no terminal devido ao tempo de aquecimento da JVM. No entanto, com o GraalVM e o recurso Native Image (AOT - Ahead-of-Time compilation), conseguimos gerar executáveis nativos independentes que iniciam em milissegundos.

Neste estudo, exploramos como estruturar um utilitário de linha de comando usando Picocli e compilar com Maven/GraalVM para atingir desempenho comparável a ferramentas escritas em C ou Go no ecossistema Linux.`,
    coverGradient: {
      from: '#1e3a8a',
      to: '#0f172a',
      label: 'CLI & GraalVM',
    },
  },
  {
    id: '2',
    slug: 'por-que-escolhi-neovim',
    title: 'Por que o Neovim se tornou meu ambiente principal de desenvolvimento',
    date: '28 de out. de 2026',
    readTime: '4 min de leitura',
    tags: ['Neovim', 'Produtividade', 'Terminal'],
    summary:
      'A transição de IDEs pesadas para um fluxo focado no teclado com Neovim, Lua, LSP e navegação modal.',
    content: `A troca de IDEs convencionais para um fluxo puramente modal e orientado a teclado traz uma curva inicial acentuada, mas compensa exponencialmente em velocidade de pensamento e precisão.

Configurar o Neovim em Lua com Tree-sitter para realce sintático, Telescope para busca fuzzy e Mason para gerenciamento de LSPs (Java, TypeScript, Rust) me proporcionou um ambiente leve, sem distrações e com latência praticamente zero.`,
    coverGradient: {
      from: '#064e3b',
      to: '#022c22',
      label: 'Neovim & Workflow',
    },
  },
  {
    id: '3',
    slug: 'do-marketing-a-engenharia-de-software',
    title: 'Da redação publicitária à Engenharia de Software: lições da transição',
    date: '15 de out. de 2026',
    readTime: '6 min de leitura',
    tags: ['Carreira', 'Engenharia de Software'],
    summary:
      'O que seis anos no marketing e no copywriting me ensinaram sobre arquitetura de software, interfaces e comunicação técnica.',
    content: `Transicionar de carreira não significa descartar a bagagem anterior. Anos trabalhando com copywriting e estratégia digital me ensinaram que o melhor código é aquele que resolve um problema real de forma compreensível tanto para máquinas quanto para pessoas.

Neste artigo, discuto a interseção entre clareza de comunicação, design de APIs intuitivas e a construção de produtos que pessoas realmente conseguem utilizar com facilidade.`,
    coverGradient: {
      from: '#701a75',
      to: '#3b0764',
      label: 'Carreira & Engenharia',
    },
  },
]

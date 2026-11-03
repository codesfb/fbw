export const routes = {
  home: '/',
  projetos: '/projetos',
  contato: '/contato',
  experiencias: '/experiencias',
  blog: '/blog',
  sobre: '/sobre',
} as const

export type AppRoute = keyof typeof routes

export interface TimelineItem {
  id: string
  period: string
  title: string
  organization?: string
  description: string
  current?: boolean
  tags?: string[]
  /** Nota para preenchimento manual dos dados. Não é renderizada na interface. */
  todo?: string
}

export interface ContactFormData {
  name: string
  email: string
  message: string
  honeypot?: string
}

export interface ContactResponse {
  success: boolean
  message: string
}

export type NavItem = {
  label: string
  id: 'inicio' | 'sobre' | 'projetos' | 'blog' | 'contato' | 'login'
  href: string
  isRouteOnly?: boolean
}

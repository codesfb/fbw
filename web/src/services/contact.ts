import type { ContactFormData, ContactResponse } from '@/types'

/**
 * Envia uma mensagem através do formulário de contato.
 * Implementação mock resiliente pronta para substituição por Formspree, Resend ou endpoint REST.
 *
 * // TODO: plugar endpoint real da API (/api/contact) ou serviço terceiro (Resend / Formspree)
 */
export async function sendContact(data: ContactFormData): Promise<ContactResponse> {
  // Verificação de honeypot: se preenchido, é bot/spam
  if (data.honeypot && data.honeypot.trim() !== '') {
    // Retorna silenciosamente sucesso falso para despistar bots
    return {
      success: true,
      message: 'Mensagem recebida com sucesso.',
    }
  }

  // Validação básica no client
  if (!data.name || data.name.trim().length < 2) {
    throw new Error('Por favor, informe seu nome com pelo menos 2 caracteres.')
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!data.email || !emailRegex.test(data.email)) {
    throw new Error('Por favor, informe um endereço de e-mail válido.')
  }

  if (!data.message || data.message.trim().length < 10) {
    throw new Error('Por favor, escreva uma mensagem com pelo menos 10 caracteres.')
  }

  // Simulação de latência de rede (600ms)
  await new Promise((resolve) => setTimeout(resolve, 600))

  return {
    success: true,
    message: 'Obrigado pelo contato! Sua mensagem foi enviada com sucesso.',
  }
}

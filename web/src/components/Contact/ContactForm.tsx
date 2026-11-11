'use client'

import { useState, type FormEvent, type ChangeEvent } from 'react'
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import { sendContact } from '@/services/contact'
import type { ContactFormData } from '@/types'

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
    honeypot: '',
  })

  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({})

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }

    if (status !== 'idle') {
      setStatus('idle')
      setFeedbackMessage('')
    }
  }

  const validate = (): boolean => {
    const errors: { [key: string]: string } = {}

    if (!formData.name.trim()) {
      errors.name = 'Nome é obrigatório'
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Nome deve ter no mínimo 2 caracteres'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      errors.email = 'E-mail é obrigatório'
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Informe um e-mail válido'
    }

    if (!formData.message.trim()) {
      errors.message = 'Mensagem é obrigatória'
    } else if (formData.message.trim().length < 10) {
      errors.message = 'A mensagem deve ter pelo menos 10 caracteres'
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    setLoading(true)
    setStatus('idle')
    setFeedbackMessage('')

    try {
      const response = await sendContact(formData)
      setStatus('success')
      setFeedbackMessage(response.message)
      setFormData({
        name: '',
        email: '',
        message: '',
        honeypot: '',
      })
    } catch (err) {
      setStatus('error')
      setFeedbackMessage(
        err instanceof Error
          ? err.message
          : 'Ocorreu um erro ao enviar a mensagem. Tente novamente mais tarde.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="rounded-xl border p-6 font-mono backdrop-blur-xl transition-all duration-300 sm:p-8"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-secondary)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        {/* Campo Honeypot oculto para proteção contra bots */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="form-honeypot">Deixe este campo em branco</label>
          <input
            id="form-honeypot"
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Nome */}
        <div>
          <label
            htmlFor="contact-name"
            className="mb-1.5 block text-xs font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            Nome <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Seu nome ou apelido"
            aria-invalid={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? 'name-error' : undefined}
            className="w-full rounded-lg border px-3.5 py-2.5 text-xs outline-none transition-all duration-200 focus:ring-1 focus:ring-[var(--border-primary)] sm:text-sm"
            style={{
              backgroundColor: 'var(--bg-input)',
              borderColor: fieldErrors.name
                ? 'var(--status-error)'
                : 'var(--border-tertiary)',
              color: 'var(--text-primary)',
            }}
          />
          {fieldErrors.name && (
            <p
              id="name-error"
              className="mt-1 text-[11px]"
              style={{ color: 'var(--status-error-text)' }}
            >
              {fieldErrors.name}
            </p>
          )}
        </div>

        {/* E-mail */}
        <div>
          <label
            htmlFor="contact-email"
            className="mb-1.5 block text-xs font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            E-mail <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="seu.email@exemplo.com"
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? 'email-error' : undefined}
            className="w-full rounded-lg border px-3.5 py-2.5 text-xs outline-none transition-all duration-200 focus:ring-1 focus:ring-[var(--border-primary)] sm:text-sm"
            style={{
              backgroundColor: 'var(--bg-input)',
              borderColor: fieldErrors.email
                ? 'var(--status-error)'
                : 'var(--border-tertiary)',
              color: 'var(--text-primary)',
            }}
          />
          {fieldErrors.email && (
            <p
              id="email-error"
              className="mt-1 text-[11px]"
              style={{ color: 'var(--status-error-text)' }}
            >
              {fieldErrors.email}
            </p>
          )}
        </div>

        {/* Mensagem */}
        <div>
          <label
            htmlFor="contact-message"
            className="mb-1.5 block text-xs font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            Mensagem <span className="text-red-500">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            value={formData.message}
            onChange={handleChange}
            placeholder="Como posso te ajudar? Ideias, propostas, dúvidas..."
            aria-invalid={!!fieldErrors.message}
            aria-describedby={fieldErrors.message ? 'message-error' : undefined}
            className="w-full resize-y rounded-lg border px-3.5 py-2.5 text-xs outline-none transition-all duration-200 focus:ring-1 focus:ring-[var(--border-primary)] sm:text-sm"
            style={{
              backgroundColor: 'var(--bg-input)',
              borderColor: fieldErrors.message
                ? 'var(--status-error)'
                : 'var(--border-tertiary)',
              color: 'var(--text-primary)',
            }}
          />
          {fieldErrors.message && (
            <p
              id="message-error"
              className="mt-1 text-[11px]"
              style={{ color: 'var(--status-error-text)' }}
            >
              {fieldErrors.message}
            </p>
          )}
        </div>

        {/* Feedback visual de Sucesso ou Erro */}
        {status === 'success' && (
          <div
            role="status"
            className="flex items-center gap-2 rounded-lg border p-3 text-xs"
            style={{
              backgroundColor: 'var(--status-success-bg)',
              borderColor: 'var(--status-success-border)',
              color: 'var(--status-success-text)',
            }}
          >
            <CheckCircle2 className="size-4 shrink-0" />
            <span>{feedbackMessage}</span>
          </div>
        )}

        {status === 'error' && (
          <div
            role="alert"
            className="flex items-center gap-2 rounded-lg border p-3 text-xs"
            style={{
              backgroundColor: 'var(--status-error-bg)',
              borderColor: 'var(--status-error-border)',
              color: 'var(--status-error-text)',
            }}
          >
            <AlertCircle className="size-4 shrink-0" />
            <span>{feedbackMessage}</span>
          </div>
        )}

        {/* Botão de Envio */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="black"
            size="md"
            disabled={loading}
            className="w-full gap-2 py-3 text-xs sm:w-auto sm:text-sm"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Enviando...</span>
              </>
            ) : (
              <>
                <Send className="size-3.5" />
                <span>Enviar mensagem</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm

'use client'

import { Mail } from 'lucide-react'
import ContactForm from '@/components/Contact/ContactForm'
import ContactChannels from '@/components/Contact/ContactChannels'

export function ContactSection() {
  return (
    <section
      id="contato"
      className="scroll-mt-20 border-t px-4 py-20 font-mono transition-colors duration-300 sm:px-6"
      style={{
        borderColor: 'var(--border-tertiary)',
        backgroundColor: 'var(--bg-page)',
      }}
    >
      <div className="mx-auto max-w-4xl">
        {/* Cabeçalho da Seção */}
        <div className="mb-10 text-center sm:text-left">
          <div
            className="mb-2 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs"
            style={{
              backgroundColor: 'var(--bg-elevated)',
              borderColor: 'var(--border-tertiary)',
              color: 'var(--text-tertiary)',
            }}
          >
            <Mail className="size-3" aria-hidden="true" />
            <span>Contato</span>
          </div>
          <h2
            className="text-2xl font-bold tracking-tight sm:text-3xl"
            style={{ color: 'var(--text-primary)' }}
          >
            Vamos conversar?
          </h2>
          <p className="mt-1 text-xs sm:text-sm" style={{ color: 'var(--text-tertiary)' }}>
            Tem uma oportunidade, ideia de projeto ou apenas quer bater um papo sobre tecnologia? Mande uma mensagem.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          <div className="md:col-span-2">
            <ContactChannels />
          </div>

          <div className="md:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection

'use client'

import Link from 'next/link'
import { ArrowLeft, Mail } from 'lucide-react'
import ContactForm from '@/components/Contact/ContactForm'
import ContactChannels from '@/components/Contact/ContactChannels'

export function ContactPage() {
  return (
    <main className="px-4 pt-10 pb-16 font-mono sm:px-6">
      <div className="mx-auto max-w-4xl">
        {/* Voltar */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 rounded-md text-[11px] outline-none transition-opacity hover:opacity-70 focus-visible:ring-2 focus-visible:ring-[var(--border-primary)]"
          style={{ color: 'var(--text-tertiary)' }}
        >
          <ArrowLeft className="size-3" aria-hidden="true" />
          <span>Voltar para a Home</span>
        </Link>

        {/* Cabeçalho */}
        <header className="mb-10">
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

          <h1
            className="text-2xl font-extrabold tracking-tight sm:text-4xl"
            style={{ color: 'var(--text-primary)' }}
          >
            Vamos conversar?
          </h1>

          <p
            className="mt-2 max-w-xl text-xs leading-relaxed sm:text-sm"
            style={{ color: 'var(--text-secondary)' }}
          >
            Tem uma oportunidade, uma ideia de projeto ou só quer trocar ideia sobre
            Java, React e terminal? Escreva abaixo ou use um dos canais diretos.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          <div className="md:col-span-2">
            <ContactChannels />
          </div>

          <div className="md:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  )
}

export default ContactPage

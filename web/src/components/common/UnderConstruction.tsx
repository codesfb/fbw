import { Construction, ArrowRight, Mail, Globe, Code2 } from 'lucide-react'

type UnderConstructionProps = {
  pageName?: string
  description?: string
}

export function UnderConstruction({
  pageName,
  description = 'Uma versão melhor está sendo desenvolvida agora mesmo.',
}: UnderConstructionProps) {
  return (
    <main className="mx-auto max-w-3xl px-6 pt-32 pb-20">
      <div className="page-enter flex flex-col items-center text-center">
        <div className="mb-8 rounded-lg border border-black bg-white p-4 shadow-[4px_5px_0px_0px_rgba(0,0,0,1)]">
          <Construction className="size-10 text-black" />
        </div>

        <h1 className="mb-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
          {pageName ? `${pageName} em construção` : 'Em construção'}
        </h1>

        <p className="mb-2 max-w-md text-sm leading-relaxed text-neutral-500 sm:text-base">
          {description}
        </p>

        <p className="mb-10 max-w-md text-sm leading-relaxed text-neutral-500 sm:text-base">
          Volte em breve para ver o resultado.
        </p>

        <div className="mb-16 flex flex-wrap justify-center gap-4">
          <a
            href="https://github.com/fabiosantanarp"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-lg border border-transparent bg-white px-5 py-2.5 text-sm text-neutral-800 transition-all duration-300 hover:border-black hover:shadow-[3px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <Code2 className="size-4 text-black" />
            GitHub
            <ArrowRight className="size-3 text-neutral-400 transition-transform group-hover:translate-x-0.5" />
          </a>

          <a
            href="https://linkedin.com/in/fabiosantanarp"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-lg border border-transparent bg-white px-5 py-2.5 text-sm text-neutral-800 transition-all duration-300 hover:border-black hover:shadow-[3px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <Globe className="size-4 text-black" />
            LinkedIn
            <ArrowRight className="size-3 text-neutral-400 transition-transform group-hover:translate-x-0.5" />
          </a>

          <a
            href="mailto:contato@fabiosantana.dev"
            className="group flex items-center gap-2 rounded-lg border border-transparent bg-white px-5 py-2.5 text-sm text-neutral-800 transition-all duration-300 hover:border-black hover:shadow-[3px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <Mail className="size-4 text-black" />
            Contato
            <ArrowRight className="size-3 text-neutral-400 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="w-full border-t border-neutral-200 pt-10">
          <p className="text-xs text-neutral-400">
            &copy; 2026 Fabio Santana. Desenvolvido com React, TypeScript &amp; Tailwind.
          </p>
        </div>
      </div>
    </main>
  )
}

export default UnderConstruction

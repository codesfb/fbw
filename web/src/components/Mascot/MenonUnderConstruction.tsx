import Mascote from './Menon'
import './MenonUnderConstruction.css'

interface PaginaConstrucaoProps {
  titulo?: string
  mensagem?: string
}

export default function PaginaConstrucao({
  titulo = 'Site em construção',
  mensagem = 'Estou trabalhando duro por aqui. Volte em breve!',
}: PaginaConstrucaoProps) {
  return (
    <main className="construcao">
      <div className="construcao__fita" aria-hidden="true" />

      <section className="construcao__conteudo">
        <div className="construcao__grupo">
          <Mascote estado="trabalhando" tamanho={180} />
          <span className="construcao__engrenagem" aria-hidden="true" />
        </div>
        <h1>{titulo}</h1>
        <p>{mensagem}</p>
        <div className="construcao__barra" role="progressbar" aria-label="Em construção">
          <span />
        </div>
      </section>

      <div className="construcao__fita" aria-hidden="true" />
    </main>
  )
}

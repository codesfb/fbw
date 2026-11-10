import MascotWithGears from './MascotWithGears'
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
          <MascotWithGears size={180} />
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

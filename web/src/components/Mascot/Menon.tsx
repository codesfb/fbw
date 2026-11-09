'use client'

import './Menon.css'

type MascoteEstado = 'idle' | 'dormindo' | 'trabalhando' | 'falando' | 'pensando'

interface MascoteProps {
  estado?: MascoteEstado
  tamanho?: number
  className?: string
  onClick?: () => void
}

interface Bloco {
  c: string
  x: number
  y: number
  w: number
}

// Cada letra = 1 pixel. "." = transparente.
const CORES: Record<string, string> = {
  K: 'var(--mascote-k)', // contorno
  B: 'var(--mascote-b)', // azul principal
  L: 'var(--mascote-l)', // brilho
  V: 'var(--mascote-v)', // visor
  W: 'var(--mascote-w)', // olhos
  R: 'var(--mascote-r)', // luz da antena
  C: 'var(--mascote-c)', // luz do peito
  Y: 'var(--mascote-y)', // amarelo
  O: 'var(--mascote-o)',
  F: 'var(--mascote-f)', // madeira / detalhes
  G: 'var(--mascote-g)', // cinza
}

// Partes animadas separadamente
const PARTES: Record<string, string> = { W: 'olhos', R: 'antena-luz', C: 'luz-peito' }

const GRADE = [
  '......RR................',
  '......RR................',
  '.......K................',
  '.......K................',
  '.......KKKKKKKKKK.......',
  '.....KLLLLBBBBBBBBK.....',
  '....KLLBBBBBBBBBBBBK....',
  '....KLBVVVVVVVVVVBBK....',
  '..KKKLVVVVVVVVVVVVBKKK..',
  '..KGKLVVVVVVVVVVVVBKGK..',
  '..KGKLVVWWVVVVWWVVBKGK..',
  '..KGKLVVWWVVVVWWVVBKGK..',
  '..KKKLVVWWVVVVWWVVBKKK..',
  '....KLVVVVVVVVVVVVBK....',
  '....KBBVVVVVVVVVVBBK....',
  '....KBBBBBBBBBBBBBBK....',
  '.....KKKKKKKKKKKKKK.....',
  '......KKKKKKKKKKKK......',
  '...KKK.KLBBBBBBBK.KKK...',
  '...KGK.KBBBBBBBBK.KGK...',
  '...KGK.KBBBCCBBBK.KGK...',
  '...KGK.KBBBCCBBBK.KGK...',
  '...KGK.KBBBBBBBBK.KGK...',
  '...KKK.KYYYYYYYYK.KKK...',
  '.......KFBBBBBBFK.......',
  '.......KKKKKKKKKK.......',
  '........KFK..KFK........',
  '........KGK..KGK........',
  '.......KGGK..KGGK.......',
  '.......KKKK..KKKK.......',
]

// Picareta (origem x=15, y=24) — presa ao braço direito
const PICARETA = [
  '....O....',
  '....O....',
  '....O....',
  '....O....',
  '..KKKKK..',
  'KGGGGGGGK',
  '.KKKKKKK.',
]

// Pedra que ele quebra (origem x=23, y=27)
const ROCHA = [
  '..KKK..',
  '.KGLGK.',
  'KKKKKKK',
]

// Fagulhas [x, y, cor]
const FAGULHAS = [[24, 26, 'Y'], [27, 25, 'Y'], [28, 27, 'G'], [26, 24, 'Y']]

// Pálpebras fechadas: linha do meio de cada olho (linha 11) [x, y, largura]
const PALPEBRAS = [[8, 11, 2], [14, 11, 2]]

const COLUNAS = GRADE[0].length
const LINHAS = GRADE.length

// Junta pixels iguais da mesma linha em um retângulo só
function gerarBlocos(grade: string[], ox = 0, oy = 0): Bloco[] {
  const blocos: Bloco[] = []
  grade.forEach((linha: string, y: number) => {
    let x = 0
    while (x < linha.length) {
      const c = linha[x]
      if (c === '.') { x++; continue }
      let fim = x
      while (fim + 1 < linha.length && linha[fim + 1] === c) fim++
      blocos.push({ c, x: x + ox, y: y + oy, w: fim - x + 1 })
      x = fim + 1
    }
  })
  return blocos
}

const BLOCOS: Bloco[] = gerarBlocos(GRADE)
const BLOCOS_PICARETA: Bloco[] = gerarBlocos(PICARETA, 15, 24)
const BLOCOS_ROCHA: Bloco[] = gerarBlocos(ROCHA, 23, 27)

// Braço direito (animado separado para a picareta)
const ehBracoDir = (b: Bloco) => b.x >= 18 && b.x <= 20 && b.y >= 18 && b.y <= 23

const Bloco = ({ b }: { b: Bloco }) => <rect x={b.x} y={b.y} width={b.w} height={1} fill={CORES[b.c]} />

const Blocos = ({ lista }: { lista: Bloco[] }) => lista.map((b, i) => <Bloco key={i} b={b} />)

// "Z" em pixel art (5x5)
const Z = ({ className }: { className: string }) => (
  <svg className={`mascote__z ${className}`} viewBox="0 0 5 5" shapeRendering="crispEdges" aria-hidden="true">
    {[[0, 0, 5], [3, 1, 1], [2, 2, 1], [1, 3, 1], [0, 4, 5]].map(([x, y, w], i) => (
      <rect key={i} x={x} y={y} width={w} height={1} fill="currentColor" />
    ))}
  </svg>
)

/**
 * estado: 'idle' | 'dormindo' | 'trabalhando' | 'falando' | 'pensando'
 * tamanho: largura em px
 */
export default function Mascote({ estado = 'idle', tamanho = 140, className = '', onClick }: MascoteProps) {
  const trabalhando = estado === 'trabalhando'
  const dormindo = estado === 'dormindo'

  return (
    <div
      className={`mascote mascote--${estado} ${className}`.trim()}
      style={{ width: tamanho }}
      role="img"
      aria-label="Mascote robô do site"
      onClick={onClick}
    >
      {dormindo && (
        <>
          <Z className="z1" />
          <Z className="z2" />
          <Z className="z3" />
        </>
      )}

      <svg viewBox={`0 0 ${COLUNAS} ${LINHAS}`} shapeRendering="crispEdges" width="100%">
        {trabalhando && <Blocos lista={BLOCOS_ROCHA} />}

        <Blocos lista={BLOCOS.filter((b) => !PARTES[b.c] && !ehBracoDir(b))} />

        {Object.entries(PARTES).map(([letra, classe]) => (
          <g key={letra} className={classe}>
            <Blocos lista={BLOCOS.filter((b: Bloco) => b.c === letra)} />
          </g>
        ))}

        <g className="palpebras">
          {PALPEBRAS.map(([x, y, w], i) => (
            <rect key={i} x={x} y={y} width={w} height={1} fill="var(--mascote-k)" />
          ))}
        </g>

        <g className="braco-dir">
          <Blocos lista={BLOCOS.filter((b: Bloco) => ehBracoDir(b))} />
          {trabalhando && <Blocos lista={BLOCOS_PICARETA} />}
        </g>

        {trabalhando && (
          <g className="fagulhas">
            {FAGULHAS.map(([x, y, c], i) => (
              <rect key={i} x={x} y={y} width={1} height={1} fill={CORES[c]} />
            ))}
          </g>
        )}
      </svg>

      <div className="mascote__sombra" />
    </div>
  )
}
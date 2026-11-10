import Image from 'next/image'
import Mascote from './Menon'
import './MascotWithGears.css'

type MascotWithGearsProps = {
  size: number
}

export default function MascotWithGears({ size }: MascotWithGearsProps) {
  const largeGearSize = Math.max(28, Math.round(size * 0.36))
  const smallGearSize = Math.max(20, Math.round(size * 0.23))

  return (
    <div
      className="mascote-engrenagens"
      style={{ width: size + largeGearSize + 12, height: size + 24 }}
    >
      <Mascote estado="trabalhando" tamanho={size} />
      <Image
        src="/gear.svg"
        alt=""
        aria-hidden="true"
        width={largeGearSize}
        height={largeGearSize}
        className="mascote-engrenagens__engrenagem"
        style={{ top: Math.round(size * 0.13), right: 0 }}
      />
      <Image
        src="/gear.svg"
        alt=""
        aria-hidden="true"
        width={smallGearSize}
        height={smallGearSize}
        className="mascote-engrenagens__engrenagem mascote-engrenagens__engrenagem--pequena"
        style={{ bottom: Math.round(size * 0.17), left: Math.round(size * 0.05) }}
      />
    </div>
  )
}

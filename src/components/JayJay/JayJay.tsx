import betkingBase from '../../assets/illustrations/jay-jay-betking-base.svg'
import betkingOverlay from '../../assets/illustrations/jay-jay-betking-overlay.svg'
import greenBase from '../../assets/illustrations/jay-jay-green-base.svg'
import greenOverlay from '../../assets/illustrations/jay-jay-green-overlay.svg'
import redBase from '../../assets/illustrations/jay-jay-red-base.svg'
import redOverlay from '../../assets/illustrations/jay-jay-red-overlay.svg'
import whiteBase from '../../assets/illustrations/jay-jay-white.svg'
import './JayJay.css'

export type JayJayVariant = 'white' | 'Betking' | 'Red' | 'Green'

type JayJayProps = {
  variant: JayJayVariant
}

const bases: Record<JayJayVariant, string> = {
  white: whiteBase,
  Betking: betkingBase,
  Red: redBase,
  Green: greenBase,
}

const overlays: Partial<Record<JayJayVariant, string>> = {
  Betking: betkingOverlay,
  Red: redOverlay,
  Green: greenOverlay,
}

const variantClass: Record<JayJayVariant, string> = {
  white: 'jay-jay--white',
  Betking: 'jay-jay--betking',
  Red: 'jay-jay--red',
  Green: 'jay-jay--green',
}

export function JayJay({ variant }: JayJayProps) {
  const overlaySrc = overlays[variant]
  return (
    <div className={`jay-jay ${variantClass[variant]}`}>
      <img src={bases[variant]} alt="" className="jay-jay__base" />
      {overlaySrc && (
        <img src={overlaySrc} alt="" className="jay-jay__overlay" />
      )}
    </div>
  )
}

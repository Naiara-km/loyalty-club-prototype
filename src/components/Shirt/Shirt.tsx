import shirtBetking from '../../assets/illustrations/shirt-betking.svg'
import shirtDefault from '../../assets/illustrations/shirt-default.svg'
import shirtGreen from '../../assets/illustrations/shirt-green.svg'
import shirtLock from '../../assets/illustrations/shirt-lock.svg'
import shirtRed from '../../assets/illustrations/shirt-red.svg'
import shirtWhite from '../../assets/illustrations/shirt-white.svg'
import './Shirt.css'

export type ShirtVariant = 'Default' | 'white' | 'Betking' | 'Red' | 'Green' | 'lock'

type ShirtProps = {
  variant: ShirtVariant
}

const shirtSrc: Record<ShirtVariant, string> = {
  Default: shirtDefault,
  white: shirtWhite,
  Betking: shirtBetking,
  Red: shirtRed,
  Green: shirtGreen,
  lock: shirtLock,
}

// Default and lock ship as 36x36 SVGs centred inside a 64x64 frame; the
// four team variants ship as full 64x64 SVGs filling the frame.
const isCentred = (v: ShirtVariant): boolean => v === 'Default' || v === 'lock'

export function Shirt({ variant }: ShirtProps) {
  return (
    <div className="shirt">
      <img
        src={shirtSrc[variant]}
        alt=""
        className={`shirt__img ${isCentred(variant) ? 'shirt__img--centred' : 'shirt__img--full'}`}
      />
    </div>
  )
}

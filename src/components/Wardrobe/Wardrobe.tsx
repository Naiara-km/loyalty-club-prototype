import type { ReactNode } from 'react'
import { Shirt, type ShirtVariant } from '../Shirt/Shirt'
import './Wardrobe.css'

export type WardrobeVariant = 'Locked' | 'Selected' | 'Available' | 'Won'

type WardrobeProps = {
  variant: WardrobeVariant
  shirt?: ShirtVariant
  title?: string
  status?: ReactNode
  bordered?: boolean
}

/** Renders "Shirt N · Won" in the mixed weight the Won state uses. */
export const WonStatus = ({ n }: { n: number }) => (
  <>
    <span className="wardrobe__status-bold">Shirt {n}</span>
    <span>{' · '}</span>
    <span className="wardrobe__status-bold">Won</span>
  </>
)

type PresetConfig = {
  shirt: ShirtVariant
  title: string
  status: ReactNode
  statusModifier: 'secondary' | 'gold' | 'gold-mixed'
}

const presets: Record<WardrobeVariant, PresetConfig> = {
  Locked: {
    shirt: 'lock',
    title: 'Mistery shirt',
    status: 'Win mission 2',
    statusModifier: 'secondary',
  },
  Selected: {
    shirt: 'Default',
    title: 'Club White',
    status: 'Wearing now',
    statusModifier: 'secondary',
  },
  Available: {
    shirt: 'Red',
    title: 'Club Red',
    status: 'Exclusive',
    statusModifier: 'gold',
  },
  Won: {
    shirt: 'Default',
    title: 'Club White',
    status: <WonStatus n={1} />,
    statusModifier: 'gold-mixed',
  },
}

const variantClass: Record<WardrobeVariant, string> = {
  Locked: 'wardrobe--locked',
  Selected: 'wardrobe--selected',
  Available: 'wardrobe--available',
  Won: 'wardrobe--won',
}

export function Wardrobe({
  variant,
  shirt,
  title,
  status,
  bordered = true,
}: WardrobeProps) {
  const preset = presets[variant]
  const classes = [
    'wardrobe',
    variantClass[variant],
    bordered ? '' : 'wardrobe--no-border',
  ]
    .filter(Boolean)
    .join(' ')
  return (
    <div className={classes}>
      <div className="wardrobe__shirt-frame">
        <Shirt variant={shirt ?? preset.shirt} />
      </div>
      <div className="wardrobe__text">
        <div className="wardrobe__title-row">
          <p className="wardrobe__title">{title ?? preset.title}</p>
        </div>
        <div className="wardrobe__status-row">
          <p className={`wardrobe__status wardrobe__status--${preset.statusModifier}`}>
            {status ?? preset.status}
          </p>
        </div>
      </div>
    </div>
  )
}

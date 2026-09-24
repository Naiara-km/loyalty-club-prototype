import type { ReactNode } from 'react'
import { Shirt, type ShirtVariant } from '../Shirt/Shirt'
import './Wardrobe.css'

export type WardrobeVariant = 'Locked' | 'Selected' | 'Available' | 'Won'

type WardrobeProps = {
  variant: WardrobeVariant
}

type VariantConfig = {
  shirt: ShirtVariant
  title: string
  status: ReactNode
  statusModifier: 'secondary' | 'gold' | 'gold-mixed'
}

const config: Record<WardrobeVariant, VariantConfig> = {
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
    status: (
      <>
        <span className="wardrobe__status-bold">Shirt 1</span>
        <span>{' · '}</span>
        <span className="wardrobe__status-bold">Won</span>
      </>
    ),
    statusModifier: 'gold-mixed',
  },
}

const variantClass: Record<WardrobeVariant, string> = {
  Locked: 'wardrobe--locked',
  Selected: 'wardrobe--selected',
  Available: 'wardrobe--available',
  Won: 'wardrobe--won',
}

export function Wardrobe({ variant }: WardrobeProps) {
  const { shirt, title, status, statusModifier } = config[variant]
  return (
    <div className={`wardrobe ${variantClass[variant]}`}>
      <div className="wardrobe__shirt-frame">
        <Shirt variant={shirt} />
      </div>
      <div className="wardrobe__text">
        <div className="wardrobe__title-row">
          <p className="wardrobe__title">{title}</p>
        </div>
        <div className="wardrobe__status-row">
          <p className={`wardrobe__status wardrobe__status--${statusModifier}`}>
            {status}
          </p>
        </div>
      </div>
    </div>
  )
}

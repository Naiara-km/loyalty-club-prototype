import type { ReactNode } from 'react'
import './Chip.css'

export type ChipVariant = 'Shirt' | 'XP' | 'disabled' | 'Variant4'

type ChipProps = {
  variant: ChipVariant
  children: ReactNode
}

const variantClass: Record<ChipVariant, string> = {
  Shirt: 'chip--shirt',
  XP: 'chip--xp',
  disabled: 'chip--disabled',
  Variant4: 'chip--variant4',
}

export function Chip({ variant, children }: ChipProps) {
  return (
    <span className={`chip ${variantClass[variant]}`}>
      <span className="chip__label">{children}</span>
    </span>
  )
}

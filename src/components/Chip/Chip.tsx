import type { ReactNode } from 'react'
import './Chip.css'

export type ChipVariant = 'Shirt' | 'XP' | 'disabled'

type ChipProps = {
  variant: ChipVariant
  children: ReactNode
}

const variantClass: Record<ChipVariant, string> = {
  Shirt: 'chip--shirt',
  XP: 'chip--xp',
  disabled: 'chip--disabled',
}

export function Chip({ variant, children }: ChipProps) {
  return (
    <span className={`chip ${variantClass[variant]}`}>
      <span className="chip__label">{children}</span>
    </span>
  )
}

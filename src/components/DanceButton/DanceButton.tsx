import './DanceButton.css'

export type DanceButtonVariant = 'Active' | 'Pending'

type DanceButtonProps = {
  variant: DanceButtonVariant
  label?: string
  onClick?: () => void
}

const defaultLabels: Record<DanceButtonVariant, string> = {
  Active: '🕺🏾 Jay Jay dance',
  Pending: '🕺🏾Next dance 4:45',
}

const variantClass: Record<DanceButtonVariant, string> = {
  Active: 'dance-button--active',
  Pending: 'dance-button--pending',
}

export function DanceButton({ variant, label, onClick }: DanceButtonProps) {
  return (
    <button
      type="button"
      className={`dance-button ${variantClass[variant]}`}
      onClick={onClick}
    >
      <span className="dance-button__label">{label ?? defaultLabels[variant]}</span>
    </button>
  )
}

import type { ReactNode } from 'react'
import './Button.css'

type ButtonProps = {
  children: ReactNode
  onClick?: () => void
  /** When true, a diagonal white shimmer sweeps across the button on
   *  a loop. Used in the Loyalty Club prototype to draw the eye to
   *  CLAIM SHIRT NOW and NEED A HINT — the two calls-to-action that
   *  progress the mission flow. Respects prefers-reduced-motion. */
  shimmer?: boolean
}

export function Button({ children, onClick, shimmer = false }: ButtonProps) {
  return (
    <button
      type="button"
      className={`button${shimmer ? ' button--shimmer' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

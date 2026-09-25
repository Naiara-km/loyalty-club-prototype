import { useEffect, useMemo, useState } from 'react'
import { Button } from '../Button/Button'
import { JayJay, type JayJayVariant } from '../JayJay/JayJay'
import type { ShirtColour } from '../../state/clubState'
import './CelebrationModal.css'

/** Shirt-claim celebration dialog. Figma node 270:43201.
 *
 *  Anchored to the viewport as a fixed overlay + centered dialog. Fires
 *  confetti when it opens. */

type CelebrationModalProps = {
  open: boolean
  onClose: () => void
  shirtColour: ShirtColour
  xpAwarded: number
  shirtsLeft: number
}

const jayJayByColour: Record<ShirtColour, JayJayVariant> = {
  White: 'white',
  Green: 'Green',
  Red: 'Red',
  Blue: 'Betking',
}

/** 32 confetti pieces with deterministic-ish random offsets so that
 *  every open of the modal spawns a fresh scatter but the render is
 *  stable within a mount. */
type ConfettiPiece = {
  left: number
  colour: string
  delay: number
  duration: number
  rotateStart: number
  rotateEnd: number
  width: number
  height: number
  xDrift: number
}

const confettiPalette = [
  'var(--ui-value-main)',            // gold
  'var(--ui-primary-main)',          // navy
  'var(--ui-hybrid-actions-selected-main)', // blue
  'var(--ui-semantic-colours-success-main)', // green
  'var(--ui-notification-main)',     // red
  'var(--ui-common-white-white-100p)',
]

function buildConfetti(seed: number, count = 32): ConfettiPiece[] {
  // Small LCG so the confetti scatter is stable per open (seed = timestamp).
  let s = seed % 2147483647 || 1
  const rand = () => {
    s = (s * 48271) % 2147483647
    return s / 2147483647
  }
  return Array.from({ length: count }, () => ({
    left: rand() * 100,
    colour: confettiPalette[Math.floor(rand() * confettiPalette.length)]!,
    delay: rand() * 0.3,
    duration: 1.6 + rand() * 1.2,
    rotateStart: rand() * 360,
    rotateEnd: rand() * 720 - 360,
    width: 6 + rand() * 6,
    height: 10 + rand() * 8,
    xDrift: (rand() - 0.5) * 60,
  }))
}

export function CelebrationModal({
  open,
  onClose,
  shirtColour,
  xpAwarded,
  shirtsLeft,
}: CelebrationModalProps) {
  // Bump the seed each time the modal opens so the confetti scatter is
  // a fresh scatter but stable across re-renders while open.
  const [seed, setSeed] = useState(0)
  useEffect(() => {
    if (open) setSeed(Date.now())
  }, [open])
  const confetti = useMemo(
    () => (open ? buildConfetti(seed) : []),
    [open, seed],
  )

  // Escape closes.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="celebration-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="celebration-modal-title"
    >
      <div className="celebration-modal__backdrop" onClick={onClose} />

      {/* Confetti sits above the backdrop but behind the dialog. */}
      <div className="celebration-modal__confetti" aria-hidden>
        {confetti.map((p, i) => (
          <span
            key={i}
            className="celebration-modal__confetto"
            style={{
              left: `${p.left}%`,
              width: `${p.width}px`,
              height: `${p.height}px`,
              backgroundColor: p.colour,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              // Custom props consumed by the keyframes.
              ['--x-drift' as string]: `${p.xDrift}px`,
              ['--rotate-start' as string]: `${p.rotateStart}deg`,
              ['--rotate-end' as string]: `${p.rotateEnd}deg`,
            }}
          />
        ))}
      </div>

      <div className="celebration-modal__dialog" role="document">
        <div className="celebration-modal__title-block">
          <h2 id="celebration-modal-title" className="celebration-modal__title">
            Congrats King!
          </h2>
          <p className="celebration-modal__subtitle">
            Club {shirtColour} Shirt is yours
          </p>
        </div>

        <div className="celebration-modal__content">
          <div className="celebration-modal__illustration">
            <JayJay variant={jayJayByColour[shirtColour]} />
          </div>
          <p className="celebration-modal__reward">
            <span className="celebration-modal__reward-xp">
              + {xpAwarded}XP
            </span>
            <span>
              {' · '}
              {shirtsLeft} shirt{shirtsLeft === 1 ? '' : 's'} left
            </span>
          </p>
        </div>

        <div className="celebration-modal__actions">
          <Button onClick={onClose}>NEXT MISSION</Button>
        </div>
      </div>
    </div>
  )
}

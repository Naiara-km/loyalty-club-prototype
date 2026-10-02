import { useEffect } from 'react'
import { Button } from '../Button/Button'
import { JayJay } from '../JayJay/JayJay'
import './CaughtJayJayModal.css'

/** "Mission 2 Complete!" — Figma 373:54932. Opens after the user
 *  catches Jay Jay from the Find Jay Jay strip. Shows the white-shirt
 *  Jay Jay with a small tilted "CAUGHT" stamp pinned across his chest
 *  and a "GO TO THE CLUB" primary CTA. */

type CaughtJayJayModalProps = {
  open: boolean
  onClose: () => void
  /** GO TO THE CLUB primary CTA. Defaults to `onClose` for cases (like
   *  the story) where nav isn't wired. */
  onGoToClub?: () => void
}

export function CaughtJayJayModal({ open, onClose, onGoToClub }: CaughtJayJayModalProps) {
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
      className="caught-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="caught-modal-title"
    >
      <div className="caught-modal__backdrop" onClick={onClose} />

      <div className="caught-modal__dialog" role="document">
        <div className="caught-modal__body">
          <div className="caught-modal__text">
            <h2 id="caught-modal-title" className="caught-modal__title">
              Mission 2 Complete!
            </h2>
            <p className="caught-modal__subtitle">
              You are sharp, You Caught Jay Jay!
            </p>
          </div>

          <div className="caught-modal__figure">
            <div className="caught-modal__figure-jj">
              <JayJay variant="white" />
            </div>
            <span className="caught-modal__figure-stamp" aria-hidden="true">
              CAUGHT
            </span>
          </div>

          <p className="caught-modal__foot">
            Go to the Club to claim your shirt and get your XP!
          </p>
        </div>

        <div className="caught-modal__actions">
          <Button onClick={onGoToClub ?? onClose}>GO TO THE CLUB</Button>
        </div>
      </div>
    </div>
  )
}

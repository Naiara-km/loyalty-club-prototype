import { useEffect } from 'react'
import closeFilled from '../../assets/icons/close-filled.svg'
import { Button } from '../Button/Button'
import { JayJay } from '../JayJay/JayJay'
import './HintModal.css'

/** "Where's Jay Jay?" hint dialog — Figma 337:23136.
 *
 *  Opens from the M2 active card's "Need a hint?" CTA. Shows a
 *  playful peek-a-boo Jay Jay above two text blocks: a yellow-tinted
 *  "Hint" quote and a short "Your task" instruction. BACK TO MISSIONS
 *  dismisses without changing state (M2 stays active until the user
 *  finds Jay Jay via the dev-panel / condition_met event). */

type HintModalProps = {
  open: boolean
  onClose: () => void
}

export function HintModal({ open, onClose }: HintModalProps) {
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
      className="hint-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="hint-modal-title"
    >
      <div className="hint-modal__backdrop" onClick={onClose} />

      <div className="hint-modal__dialog" role="document">
        <button
          type="button"
          className="hint-modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          <img
            src={closeFilled}
            alt=""
            className="hint-modal__close-icon"
          />
        </button>

        <div className="hint-modal__title-block">
          <h2 id="hint-modal-title" className="hint-modal__title">
            Where&rsquo;s Jay Jay?
          </h2>
        </div>

        <div className="hint-modal__content">
          {/* Peeking Jay Jay illustration — the top of the JayJay
            *  figure is clipped by the parent so only the head +
            *  shoulders overhang the hint block below. */}
          <div className="hint-modal__peek" aria-hidden>
            <div className="hint-modal__peek-figure">
              <JayJay variant="white" />
            </div>
          </div>

          <div className="hint-modal__stack">
            <div className="hint-modal__hint">
              <p className="hint-modal__hint-text">
                <span className="hint-modal__hint-label">Hint:</span>
                {' '}
                &ldquo;Where I am, the football never stops. New game
                every minute, all day, and the teams are all called
                Kings. That&rsquo;s all you&rsquo;re getting&hellip;&rdquo;
              </p>
            </div>

            <div className="hint-modal__task">
              <p className="hint-modal__task-title">Your task:</p>
              <p className="hint-modal__task-body">
                Find where he&rsquo;s hiding and tap him. No need to
                play or bet &mdash; he&rsquo;s just watching from the
                sidelines.
              </p>
            </div>
          </div>
        </div>

        <div className="hint-modal__actions">
          <Button onClick={onClose}>BACK TO MISSIONS</Button>
        </div>
      </div>
    </div>
  )
}

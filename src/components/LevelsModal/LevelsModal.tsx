import { useEffect } from 'react'
import checkFilled from '../../assets/icons/check-filled.svg'
import closeFilled from '../../assets/icons/close-filled.svg'
import { Button } from '../Button/Button'
import './LevelsModal.css'

/** "Your path in the Club" dialog — Figma node 81:14105.
 *
 *  Opens from the MissionProgress bar. Explains the loyalty ladder:
 *  the current Starter tier (0-500 XP, three missions), the upcoming
 *  Level 1 reward, and a placeholder for future levels. Static content
 *  for the prototype — the timeline shows Starter as complete-in-progress
 *  regardless of live XP so users see the same explanation at any stage. */

type LevelsModalProps = {
  open: boolean
  onClose: () => void
}

export function LevelsModal({ open, onClose }: LevelsModalProps) {
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
      className="levels-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="levels-modal-title"
    >
      <div className="levels-modal__backdrop" onClick={onClose} />

      <div className="levels-modal__dialog" role="document">
        <button
          type="button"
          className="levels-modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          <img
            src={closeFilled}
            alt=""
            className="levels-modal__close-icon"
          />
        </button>

        <div className="levels-modal__title-block">
          <h2 id="levels-modal-title" className="levels-modal__title">
            Your path in the Club
          </h2>
          <p className="levels-modal__subtitle">
            Do missions &rarr; Win XP + gifts &nbsp;&rarr; Level up!
          </p>
        </div>

        <div className="levels-modal__content">
          <div className="levels-modal__path" aria-hidden>
            {/* Starter — currently active (all users start here). */}
            <div className="levels-modal__dot levels-modal__dot--active">
              <img
                src={checkFilled}
                alt=""
                className="levels-modal__dot-icon"
              />
            </div>
            <div className="levels-modal__line levels-modal__line--active" />
            <div className="levels-modal__line" />
            <div className="levels-modal__dot levels-modal__dot--locked">
              <span className="levels-modal__dot-label">L1</span>
            </div>
            <div className="levels-modal__line" />
            <div className="levels-modal__line" />
            <div className="levels-modal__dot levels-modal__dot--locked">
              <span className="levels-modal__dot-label">&hellip;</span>
            </div>
          </div>

          <div className="levels-modal__blocks">
            <LevelBlock
              title="Starter · 0-500 XP"
              body="Three missions, three of Jay Jay's shirts. Finish them and you're through."
            />
            <LevelBlock
              title="Level 1"
              body="What's inside is under wraps until you get there. We'll tell you the moment you do."
            />
            <LevelBlock
              title="More to come"
              body="The Club keeps going. Every level you reach stays yours."
            />
          </div>
        </div>

        <div className="levels-modal__actions">
          <Button onClick={onClose}>BACK TO MISSIONS</Button>
        </div>
      </div>
    </div>
  )
}

function LevelBlock({ title, body }: { title: string; body: string }) {
  return (
    <div className="levels-modal__block">
      <p className="levels-modal__block-title">{title}</p>
      <p className="levels-modal__block-body">{body}</p>
    </div>
  )
}

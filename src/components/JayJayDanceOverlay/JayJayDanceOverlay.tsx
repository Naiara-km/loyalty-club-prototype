import { useCallback, useEffect, useRef, useState } from 'react'
import closeFilled from '../../assets/icons/close-filled.svg'
import danceVideo from '../../assets/illustrations/jayjay-dance.mp4'
import './JayJayDanceOverlay.css'

type JayJayDanceOverlayProps = {
  open: boolean
  onClose: () => void
}

const AUTO_CLOSE_MS = 10_000
const FADE_OUT_MS = 350

export function JayJayDanceOverlay({ open, onClose }: JayJayDanceOverlayProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  // Two-stage dismissal so we can run the fade before unmounting.
  // 'closing' triggers the CSS opacity transition; the timer that
  // follows calls onClose when the fade finishes.
  const [closing, setClosing] = useState(false)

  const startClose = useCallback(() => {
    setClosing((already) => already || true)
  }, [])

  // Reset the closing flag whenever the parent reopens the overlay.
  useEffect(() => {
    if (open) setClosing(false)
  }, [open])

  // Auto-dismiss 10s after opening. Pause the video when the overlay
  // leaves the screen so it stops decoding behind ClubHome.
  useEffect(() => {
    if (!open) {
      videoRef.current?.pause()
      return
    }
    const id = window.setTimeout(startClose, AUTO_CLOSE_MS)
    return () => window.clearTimeout(id)
  }, [open, startClose])

  // When the fade starts, wait for it to finish then notify the parent.
  useEffect(() => {
    if (!closing) return
    const id = window.setTimeout(onClose, FADE_OUT_MS)
    return () => window.clearTimeout(id)
  }, [closing, onClose])

  // Escape closes too — matches the rest of the Club modals.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') startClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, startClose])

  if (!open) return null

  return (
    <div
      className={`jayjay-dance-overlay${closing ? ' jayjay-dance-overlay--closing' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Jay Jay's got moves"
      onClick={startClose}
    >
      {/* Confetti layer sits above the gradient but below the panel.
       *  Low-density, CSS-only — nine pieces drifting up at offset
       *  delays. Reduced-motion hides the whole layer via CSS. */}
      <div className="jayjay-dance-overlay__confetti" aria-hidden="true">
        {Array.from({ length: 9 }).map((_, i) => (
          <span
            key={i}
            className={`jayjay-dance-overlay__confetto jayjay-dance-overlay__confetto--${i}`}
          />
        ))}
      </div>

      <button
        type="button"
        className="jayjay-dance-overlay__close"
        onClick={startClose}
        aria-label="Close"
      >
        <img src={closeFilled} alt="" className="jayjay-dance-overlay__close-icon" />
      </button>

      <p className="jayjay-dance-overlay__caption">Jay Jay&rsquo;s got moves</p>

      <div className="jayjay-dance-overlay__panel">
        <video
          ref={videoRef}
          className="jayjay-dance-overlay__video"
          src={danceVideo}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    </div>
  )
}

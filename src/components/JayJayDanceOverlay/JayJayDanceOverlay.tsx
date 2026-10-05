import { useCallback, useEffect, useRef, useState } from 'react'
import closeFilled from '../../assets/icons/close-filled.svg'
import { danceClips, type DanceShirt } from '../../data/mock'
import './JayJayDanceOverlay.css'

type JayJayDanceOverlayProps = {
  open: boolean
  onClose: () => void
  /** Shirt Jay Jay is wearing — drives which clip plays and the title /
   *  caption copy. */
  shirt: DanceShirt
  /** True when all three mission shirts have been won; swaps the caption
   *  to the collected-everything message. */
  allWon?: boolean
}

const AUTO_CLOSE_MS = 10_000
const FADE_OUT_MS = 350

/** All shipped dance clips, keyed by their bundle path. Missing files
 *  (e.g. the red/green/blue variants, which don't exist yet) simply
 *  won't appear here — resolveClip falls back to the white URL. */
const bundledClips = import.meta.glob(
  '../../assets/illustrations/jayjay-dance*.mp4',
  { eager: true, query: '?url', import: 'default' },
) as Record<string, string>

const WHITE_KEY = `../../assets/illustrations/${danceClips.white}`

function resolveClip(shirt: DanceShirt): string {
  const key = `../../assets/illustrations/${danceClips[shirt]}`
  return bundledClips[key] ?? bundledClips[WHITE_KEY]
}

/** "white" → "White" etc. Shirt names in copy are capitalised. */
function shirtName(shirt: DanceShirt): string {
  return shirt[0].toUpperCase() + shirt.slice(1)
}

export function JayJayDanceOverlay({ open, onClose, shirt, allWon = false }: JayJayDanceOverlayProps) {
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

  const name = shirtName(shirt)
  const title = `Jay Jay's ${name} dance`
  const caption = allWon
    ? 'Every shirt has its own moves. Change his shirt, change the dance.'
    : `This is his ${name} dance. Win a shirt to see the next one.`

  return (
    <div
      className={`jayjay-dance-overlay${closing ? ' jayjay-dance-overlay--closing' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={title}
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

      <p className="jayjay-dance-overlay__title">{title}</p>

      <div className="jayjay-dance-overlay__panel">
        <video
          ref={videoRef}
          key={shirt}
          className="jayjay-dance-overlay__video"
          src={resolveClip(shirt)}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      <p className="jayjay-dance-overlay__caption">{caption}</p>
    </div>
  )
}

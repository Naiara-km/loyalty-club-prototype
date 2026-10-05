import { useCallback, useEffect, useRef, useState } from 'react'
import closeFilled from '../../assets/icons/close-filled.svg'
import danceMusic from '../../assets/audio/dokta-brain-bikyaganye.mp3'
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
  const audioRef = useRef<HTMLAudioElement | null>(null)
  // Two-stage dismissal so we can run the fade before unmounting.
  // 'closing' triggers the CSS opacity transition; the timer that
  // follows calls onClose when the fade finishes.
  const [closing, setClosing] = useState(false)
  // Soundtrack toggle — defaults to unmuted since the overlay only ever
  // opens from a direct user tap on the dance button, which satisfies
  // browser autoplay-with-sound policies.
  const [muted, setMuted] = useState(false)

  const startClose = useCallback(() => {
    setClosing((already) => already || true)
  }, [])

  // Reset the closing flag whenever the parent reopens the overlay.
  useEffect(() => {
    if (open) setClosing(false)
  }, [open])

  // Auto-dismiss 10s after opening. Pause both video and audio when
  // the overlay leaves the screen so nothing keeps running in the
  // background behind ClubHome.
  useEffect(() => {
    if (!open) {
      videoRef.current?.pause()
      const a = audioRef.current
      if (a) {
        a.pause()
        a.currentTime = 0
      }
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

  // Keep the <audio> element's muted property in sync with React state
  // so the toggle button works mid-playback.
  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted
  }, [muted])

  if (!open) return null

  const name = shirtName(shirt)
  const title = `Jay Jay's ${name} dance`
  const caption = allWon
    ? 'Every shirt has its own moves. Change his shirt, change the dance.'
    : `This is his ${name} dance. Win a shirt to see the next one.`

  // Start the soundtrack the first time the video reports it's playing
  // — pairs the music with the visible dance regardless of how long
  // the clip takes to decode.
  const onVideoPlay = () => {
    const a = audioRef.current
    if (!a) return
    // play() rejects silently when the browser blocks it; the mute
    // button lets the user retry by toggling.
    void a.play().catch(() => {})
  }

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

      <audio ref={audioRef} src={danceMusic} loop preload="auto" />

      <button
        type="button"
        className="jayjay-dance-overlay__mute"
        onClick={(e) => {
          e.stopPropagation()
          setMuted((m) => !m)
        }}
        aria-label={muted ? 'Unmute music' : 'Mute music'}
        aria-pressed={muted}
      >
        {muted ? (
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
              fill="currentColor"
              d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.2l2.45 2.45c.03-.2.05-.41.05-.62zM19 12c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.95 8.95 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
              fill="currentColor"
              d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05A4.5 4.5 0 0 0 16.5 12zM14 3.23v2.06A7 7 0 0 1 14 18.71v2.06a9 9 0 0 0 0-17.54z"
            />
          </svg>
        )}
      </button>

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
          onPlay={onVideoPlay}
        />
      </div>

      <p className="jayjay-dance-overlay__caption">{caption}</p>
    </div>
  )
}

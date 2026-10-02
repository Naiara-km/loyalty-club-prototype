import { useEffect, useRef, useState } from 'react'
import findJayJayFace from '../../assets/illustrations/find-jay-jay-face.svg'
import './FindJayJay.css'

/** Find Jay Jay strip — Figma 362:44558.
 *
 *  Idle behaviour is scroll-driven, not a time loop: the head peeks
 *  when the strip sits in the periphery of the viewport (near top or
 *  bottom) and hides when the strip is pinned to the centre. So as
 *  the user scrolls the page, Jay Jay pops up as the strip enters the
 *  viewport, ducks down while it's centred (as if trying not to be
 *  spotted), and pops up again as it exits.
 *
 *  When `caught` is true (parent-controlled), scroll behaviour is
 *  suspended: the head snaps to peek, the pill fades, and the
 *  "CAUGHT!" stamp slams in. */

type FindJayJayProps = {
  onCatch?: () => void
  caught?: boolean
}

/** Half-height of the viewport's "hide" zone as a fraction of viewport
 *  height. 0.2 means: when the strip's centre is within 20% of the
 *  viewport centre, Jay Jay hides. Outside that band → peek. */
const CENTER_HIDE_BAND = 0.2

export function FindJayJay({ onCatch, caught = false }: FindJayJayProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [hiding, setHiding] = useState(true)

  useEffect(() => {
    if (caught) return
    if (typeof window === 'undefined') return

    // Respect reduced-motion: skip scroll listeners, leave face at peek.
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setHiding(false)
      return
    }

    let rafId = 0
    let ticking = false

    const check = () => {
      ticking = false
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const center = (rect.top + rect.bottom) / 2
      const viewportCenter = vh / 2
      const distanceFromCenter = Math.abs(center - viewportCenter)
      const offScreen = rect.bottom <= 0 || rect.top >= vh
      const inCenterBand = distanceFromCenter < vh * CENTER_HIDE_BAND
      // Off screen → hidden (nothing to show anyway). Centre band →
      // hidden (tries to duck when spotted). Elsewhere → peek.
      setHiding(offScreen || inCenterBand)
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      rafId = window.requestAnimationFrame(check)
    }

    check()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.cancelAnimationFrame(rafId)
    }
  }, [caught])

  const handleTap = () => {
    if (caught) return
    onCatch?.()
  }

  const classes = [
    'find-jayjay',
    caught ? 'find-jayjay--caught' : hiding ? 'find-jayjay--hiding' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section ref={sectionRef} className={classes} aria-label="Find Jay Jay">
      <button
        type="button"
        className="find-jayjay__face"
        onClick={handleTap}
        aria-label="Catch Jay Jay"
      >
        <img
          src={findJayJayFace}
          alt=""
          className="find-jayjay__face-img"
        />
      </button>

      {caught && (
        <span className="find-jayjay__stamp" aria-hidden="true">
          CAUGHT!
        </span>
      )}

      <button
        type="button"
        className="find-jayjay__catch"
        onClick={handleTap}
      >
        <span className="find-jayjay__catch-pill">TAP TO CATCH</span>
      </button>
    </section>
  )
}

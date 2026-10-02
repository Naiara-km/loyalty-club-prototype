import { useEffect, useRef, useState } from 'react'
import arrowBackFilled from '../assets/icons/arrow-back-filled.svg'
import personFilled from '../assets/icons/person-filled.svg'
import { CaughtJayJayModal } from '../components/CaughtJayJayModal/CaughtJayJayModal'
import { FindJayJay } from '../components/FindJayJay/FindJayJay'
import { InstantLeagues } from '../components/InstantLeagues/InstantLeagues'
import { LatestWinners } from '../components/LatestWinners/LatestWinners'
import { ScheduledLeagues } from '../components/ScheduledLeagues/ScheduledLeagues'
import { ScheduledTournaments } from '../components/ScheduledTournaments/ScheduledTournaments'
import { TrendingBets } from '../components/TrendingBets/TrendingBets'
import { useClubState } from '../state/ClubStateContext'
import './Virtuals.css'

/** Delay between the CAUGHT! stamp slam-in and the modal appearing —
 *  long enough to read the stamp comfortably, short enough that the
 *  user doesn't wonder why nothing is happening. */
const CAUGHT_MODAL_DELAY_MS = 1000

/** Virtuals lobby page — Figma frame 362:44041. Rendered mobile-first
 *  with breakpoints at 600 and 1200 per the design. Dark navy page
 *  background; each content section is either a dark-navy or white
 *  card matching the Figma section-by-section design.
 *
 *  Section order matches Figma top-to-bottom:
 *    1  Header
 *    2  Jackpot banner strip
 *    3  Scheduled Leagues (dark navy card)
 *    4  Trending Bets (tan card)
 *    5  Scheduled Tournaments (white card, blue promo)
 *    6  Latest Winners (white card)
 *    7  Instant Leagues (white card, 6-tile grid)  ← Jay Jay hides
 *    8  West Corner (white card, 3 photo tiles)
 *    9  Betting Virtuals info (white section)
 *   10  Frequently Asked Questions (white section)
 *
 *  Fidelity note: stylised approximation, not a pixel-perfect rebuild.
 *  Coloured gradients, section shapes and copy hierarchy follow Figma;
 *  league artwork uses placeholder icons instead of the Figma symbol
 *  set (out of scope to extract them all). */

type VirtualsProps = {
  onBack: () => void
  onGoToClub: () => void
}

export function Virtuals({ onBack, onGoToClub }: VirtualsProps) {
  const { dispatch } = useClubState()

  // Catch flow: tap → stamp appears immediately (caught=true) →
  // after CAUGHT_MODAL_DELAY_MS the modal opens. Closing the modal
  // resets both. Extra taps mid-flow are ignored by FindJayJay itself
  // via its `caught` prop; the ref-guarded timer here prevents any
  // double-schedule if `handleCatch` were called twice on the same
  // tick. Timer is cleared on unmount.
  const [caught, setCaught] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const timerRef = useRef<number | null>(null)

  const clearPendingTimer = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  const handleCatch = () => {
    if (caught) return
    setCaught(true)
    dispatch({ type: 'find_jay_jay' })
    clearPendingTimer()
    timerRef.current = window.setTimeout(() => {
      setModalOpen(true)
      timerRef.current = null
    }, CAUGHT_MODAL_DELAY_MS)
  }

  const handleModalClose = () => {
    setModalOpen(false)
    setCaught(false)
    clearPendingTimer()
  }

  const handleGoToClub = () => {
    // Close + reset, then navigate. State stays at M2 condition_met
    // (set by find_jay_jay at the moment of tap), so ClubHome shows
    // the Find Jay Jay card with FOUND badge + CLAIM SHIRT NOW! CTA.
    // Tapping that CTA opens the existing shirt-2 CelebrationModal,
    // which is where M3 actually transitions to "Place a bet".
    setModalOpen(false)
    setCaught(false)
    clearPendingTimer()
    onGoToClub()
  }

  useEffect(() => clearPendingTimer, [])

  return (
    <div className="virtuals">
      {/* --- Header --- */}
      <header className="virtuals__header">
        <button
          type="button"
          className="virtuals__header-icon-btn"
          onClick={onBack}
          aria-label="Back"
        >
          <img
            src={arrowBackFilled}
            alt=""
            className="virtuals__header-icon"
          />
        </button>
        <span className="virtuals__brand">
          <span className="virtuals__brand-mark">K</span>
          <span className="virtuals__brand-name">Betking</span>
        </span>
        <nav className="virtuals__nav" aria-label="Primary">
          <a className="virtuals__nav-item">Sport</a>
          <a className="virtuals__nav-item">Live</a>
          <a className="virtuals__nav-item virtuals__nav-item--active">Virtuals</a>
          <a className="virtuals__nav-item">Casino</a>
        </nav>
        <button
          type="button"
          className="virtuals__header-icon-btn"
          aria-label="Account"
        >
          <img
            src={personFilled}
            alt=""
            className="virtuals__header-icon"
          />
        </button>
      </header>

      <main className="virtuals__page">
        {/* --- 2. Jackpot banner strip --- */}
        <section className="virtuals__jackpots" aria-label="Jackpots">
          <div className="virtuals__jackpot virtuals__jackpot--fastpot">
            <p className="virtuals__jackpot-brand">FASTPOT</p>
            <div className="virtuals__jackpot-body">
              <div className="virtuals__jackpot-prize-col">
                <p className="virtuals__jackpot-prize-label">Prize</p>
                <p className="virtuals__jackpot-prize">₦50,000</p>
              </div>
              <div className="virtuals__jackpot-timer-col">
                <p className="virtuals__jackpot-note">Draws soon!</p>
                <p className="virtuals__jackpot-timer">
                  <span aria-hidden>⚡</span> 9m 59s
                </p>
              </div>
            </div>
            <div className="virtuals__jackpot-footer">
              <p className="virtuals__jackpot-tickets">
                You have 128 tickets in this Jackpot
              </p>
              <button type="button" className="virtuals__jackpot-buy">BUY</button>
            </div>
          </div>
          <div className="virtuals__jackpot virtuals__jackpot--trillwin">
            <p className="virtuals__jackpot-brand">TRILLWIN</p>
            <div className="virtuals__jackpot-body">
              <div className="virtuals__jackpot-prize-col">
                <p className="virtuals__jackpot-prize-label">Prize</p>
                <p className="virtuals__jackpot-prize">₦1million!</p>
              </div>
              <div className="virtuals__jackpot-timer-col">
                <p className="virtuals__jackpot-note">Draws soon!</p>
                <p className="virtuals__jackpot-timer">
                  <span aria-hidden>⚡</span> 9m 59s
                </p>
              </div>
            </div>
            <div className="virtuals__jackpot-footer">
              <p className="virtuals__jackpot-tickets">
                You have 628 tickets in this Jackpot
              </p>
              <button type="button" className="virtuals__jackpot-buy">BUY</button>
            </div>
          </div>
          <div className="virtuals__jackpot virtuals__jackpot--minutewin">
            <p className="virtuals__jackpot-brand">MINUTEWIN</p>
            <div className="virtuals__jackpot-body">
              <div className="virtuals__jackpot-prize-col">
                <p className="virtuals__jackpot-prize-label">Prize</p>
                <p className="virtuals__jackpot-prize">₦250,000</p>
              </div>
              <div className="virtuals__jackpot-timer-col">
                <p className="virtuals__jackpot-note">Draws soon!</p>
                <p className="virtuals__jackpot-timer">
                  <span aria-hidden>⚡</span> 4m 32s
                </p>
              </div>
            </div>
            <div className="virtuals__jackpot-footer">
              <p className="virtuals__jackpot-tickets">
                You have 84 tickets in this Jackpot
              </p>
              <button type="button" className="virtuals__jackpot-buy">BUY</button>
            </div>
          </div>
        </section>

        {/* --- 3. Scheduled Leagues — Figma 362:44063 --- */}
        <ScheduledLeagues />

        {/* --- 4. Trending Bets — Figma 362:44103 --- */}
        <TrendingBets />

        {/* --- 5. Scheduled Tournaments — Figma 362:44507 --- */}
        <ScheduledTournaments />

        {/* --- 6. Latest Winners — Figma 362:44517 --- */}
        <LatestWinners />

        {/* --- 6b. Find Jay Jay strip — Figma 362:44558. Tapping the
          *  button (or the head crop) fires find_jay_jay so that M2
          *  can advance from active to condition_met the next time
          *  the user opens the Club. */}
        <FindJayJay onCatch={handleCatch} caught={caught} />

        {/* --- 7. Instant Leagues — Figma 362:44563 ---
          *  White card with 2×2 gradient tiles. Jay Jay hides here. */}
        <InstantLeagues />

        {/* --- 8. West Corner — white card with 3 photo tiles --- */}
        <section className="virtuals__card" aria-label="West Corner">
          <div className="virtuals__card-header">
            <h2 className="virtuals__card-title">West Corner</h2>
            <p className="virtuals__card-subtitle">
              The best pre-match promos on virtuals
            </p>
          </div>
          <div className="virtuals__westcorner-tiles">
            <div className="virtuals__westcorner-tile virtuals__westcorner-tile--1" />
            <div className="virtuals__westcorner-tile virtuals__westcorner-tile--2" />
            <div className="virtuals__westcorner-tile virtuals__westcorner-tile--3" />
          </div>
          <button type="button" className="virtuals__westcorner-cta">
            SEE ALL PROMOTIONS
          </button>
        </section>

        {/* --- 9. Betting Virtuals info --- */}
        <section className="virtuals__card virtuals__info" aria-label="Betting Virtuals">
          <h2 className="virtuals__card-title">Betting Virtuals</h2>
          <p className="virtuals__info-body">
            Virtual betting is a type of online betting where players
            wager on outcomes generated by software rather than real-life
            events. Games run every minute, so you never have to wait
            long. Explore the leagues above, pick your side, and cash in
            on the excitement — no schedules, no delays, just football.
          </p>
          <ul className="virtuals__info-links">
            <li>Introduction to virtual football</li>
            <li>Schedules of virtual football leagues</li>
            <li>Latest virtual football payouts</li>
            <li>Betting glossary</li>
          </ul>
        </section>

        {/* --- 10. FAQ --- */}
        <section className="virtuals__card virtuals__faq" aria-label="Frequently Asked Questions">
          <h2 className="virtuals__card-title">Frequently Asked Questions</h2>
          <ul className="virtuals__faq-list">
            <li>How to bet on Virtual Football odds?</li>
            <li>What's the minimum bet on virtual leagues?</li>
            <li>What happens if my game is cancelled?</li>
            <li>Are virtual outcomes random?</li>
            <li>Where can I find match statistics?</li>
          </ul>
        </section>
      </main>

      <CaughtJayJayModal
        open={modalOpen}
        onClose={handleModalClose}
        onGoToClub={handleGoToClub}
      />
    </div>
  )
}

import arrowBackFilled from '../assets/icons/arrow-back-filled.svg'
import kLogo from '../assets/icons/k-logo.svg'
import personFilled from '../assets/icons/person-filled.svg'
import './Virtuals.css'

/** Virtuals lobby page — Figma frame 362:44041 (1200PX). The prototype
 *  serves this as the destination when the user leaves the account /
 *  club pages. Rendered mobile-first with breakpoints at 600 and 1200
 *  per the design.
 *
 *  Fidelity note: this is a stylised approximation of the full lobby,
 *  not a pixel-perfect rebuild. The main goal is to give the user a
 *  plausible Virtuals context so the "Find Jay Jay" section (below,
 *  Instant Leagues) can host the hide/seek interaction. Sections
 *  outside Instant Leagues use placeholder copy + layout that
 *  approximates the design's visual rhythm. */

type VirtualsProps = {
  onBack: () => void
}

export function Virtuals({ onBack }: VirtualsProps) {
  return (
    <div className="virtuals">
      {/* --- Header --- */}
      <header className="virtuals__header">
        <button
          type="button"
          className="virtuals__header-back"
          onClick={onBack}
          aria-label="Back"
        >
          <img
            src={arrowBackFilled}
            alt=""
            className="virtuals__header-back-icon"
          />
        </button>
        <img src={kLogo} alt="" className="virtuals__header-logo" />
        <span className="virtuals__header-brand">Betking</span>
        <button
          type="button"
          className="virtuals__header-account"
          aria-label="Account"
        >
          <img
            src={personFilled}
            alt=""
            className="virtuals__header-account-icon"
          />
        </button>
      </header>

      <main className="virtuals__page">
        {/* --- Jackpot banner strip --- */}
        <section
          className="virtuals__jackpots"
          aria-label="Jackpots"
        >
          <div className="virtuals__jackpot virtuals__jackpot--fastest">
            <div className="virtuals__jackpot-logo">EXPOT</div>
            <p className="virtuals__jackpot-prize-label">Prize</p>
            <p className="virtuals__jackpot-prize">₦50,000</p>
            <p className="virtuals__jackpot-note">Draws soon!</p>
            <p className="virtuals__jackpot-timer">⚡ 9m 59s</p>
            <p className="virtuals__jackpot-tickets">
              You have 128 tickets in this Jackpot
            </p>
          </div>
          <div className="virtuals__jackpot virtuals__jackpot--trillwin">
            <div className="virtuals__jackpot-logo">TRILLWIN</div>
            <p className="virtuals__jackpot-prize-label">Prize</p>
            <p className="virtuals__jackpot-prize">₦1million!</p>
            <p className="virtuals__jackpot-note">Draws soon!</p>
            <p className="virtuals__jackpot-timer">⚡ 9m 59s</p>
            <p className="virtuals__jackpot-tickets">
              You have 628 tickets in this Jackpot
            </p>
          </div>
          <div className="virtuals__jackpot virtuals__jackpot--minutewin">
            <div className="virtuals__jackpot-logo">MINUTE WIN</div>
            <p className="virtuals__jackpot-prize-label">Prize</p>
            <p className="virtuals__jackpot-prize">₦250,000</p>
            <p className="virtuals__jackpot-note">Draws soon!</p>
            <p className="virtuals__jackpot-timer">⚡ 4m 32s</p>
            <p className="virtuals__jackpot-tickets">
              You have 84 tickets in this Jackpot
            </p>
          </div>
        </section>

        {/* --- Instant Leagues (main card) — this is the container
          *  Jay Jay will hide behind in the follow-up interaction. */}
        <section className="virtuals__card virtuals__instant-leagues" aria-label="Instant Leagues">
          <div className="virtuals__card-header">
            <h2 className="virtuals__card-title">Instant Leagues</h2>
            <p className="virtuals__card-subtitle">
              Virtual football, kicking off every minute
            </p>
          </div>
          <div className="virtuals__instant-grid">
            <div className="virtuals__league-tile virtuals__league-tile--large virtuals__league-tile--fastkickoff">
              <div className="virtuals__league-icon">⚽</div>
              <div className="virtuals__league-meta">
                <p className="virtuals__league-name">Fast Kick-Off</p>
                <p className="virtuals__league-countdown">3:42</p>
                <button type="button" className="virtuals__league-cta">PLAY</button>
              </div>
            </div>
            <div className="virtuals__league-tile virtuals__league-tile--large virtuals__league-tile--westcorner">
              <div className="virtuals__league-icon">🏟️</div>
              <div className="virtuals__league-meta">
                <p className="virtuals__league-name">West Corner</p>
                <p className="virtuals__league-countdown">2:15</p>
                <button type="button" className="virtuals__league-cta">PLAY</button>
              </div>
            </div>
            <div className="virtuals__league-tile virtuals__league-tile--small">
              <div className="virtuals__league-icon virtuals__league-icon--small">⚽</div>
              <p className="virtuals__league-name">Kings League</p>
              <button type="button" className="virtuals__league-cta">GO</button>
            </div>
            <div className="virtuals__league-tile virtuals__league-tile--small">
              <div className="virtuals__league-icon virtuals__league-icon--small">🎯</div>
              <p className="virtuals__league-name">Penalty Kicks</p>
              <button type="button" className="virtuals__league-cta">GO</button>
            </div>
            <div className="virtuals__league-tile virtuals__league-tile--small">
              <div className="virtuals__league-icon virtuals__league-icon--small">🏆</div>
              <p className="virtuals__league-name">Cup Final</p>
              <button type="button" className="virtuals__league-cta">GO</button>
            </div>
          </div>
        </section>

        {/* --- Trending Bets --- */}
        <section className="virtuals__card virtuals__trending" aria-label="Trending Bets">
          <div className="virtuals__card-header">
            <h2 className="virtuals__card-title virtuals__card-title--white">Trending Bets</h2>
          </div>
          <div className="virtuals__trending-grid">
            <div className="virtuals__trending-tile">
              <p className="virtuals__trending-title">Kings vs Titans</p>
              <p className="virtuals__trending-line">Kings to win</p>
              <p className="virtuals__trending-odds">3.20</p>
            </div>
            <div className="virtuals__trending-tile">
              <p className="virtuals__trending-title">Corner Kings vs FC</p>
              <p className="virtuals__trending-line">Over 2.5 Goals</p>
              <p className="virtuals__trending-odds">1.85</p>
            </div>
          </div>
        </section>

        {/* --- Scheduled Tournaments --- */}
        <section className="virtuals__card virtuals__tournaments" aria-label="Scheduled Tournaments">
          <h2 className="virtuals__card-title">Scheduled Tournaments</h2>
          <div className="virtuals__tournament-tile">
            <p className="virtuals__tournament-name">Weekly Kings Cup</p>
            <p className="virtuals__tournament-info">Starts in 2h 14m · Entry ₦500</p>
            <button type="button" className="virtuals__tournament-cta">ENTER</button>
          </div>
        </section>

        {/* --- Latest Winners --- */}
        <section className="virtuals__card virtuals__winners" aria-label="Latest Winners">
          <h2 className="virtuals__card-title">Latest Winners</h2>
          <ul className="virtuals__winners-list">
            <li className="virtuals__winner">
              <span className="virtuals__winner-avatar" aria-hidden>👤</span>
              <span className="virtuals__winner-name">Player_1394</span>
              <span className="virtuals__winner-amount">₦1,250,000</span>
            </li>
            <li className="virtuals__winner">
              <span className="virtuals__winner-avatar" aria-hidden>👤</span>
              <span className="virtuals__winner-name">Player_2087</span>
              <span className="virtuals__winner-amount">₦375,000</span>
            </li>
            <li className="virtuals__winner">
              <span className="virtuals__winner-avatar" aria-hidden>👤</span>
              <span className="virtuals__winner-name">Player_5511</span>
              <span className="virtuals__winner-amount">₦82,500</span>
            </li>
          </ul>
        </section>

        {/* --- Instant Leagues (grid) --- */}
        <section className="virtuals__card virtuals__leagues-grid-section" aria-label="More leagues">
          <h2 className="virtuals__card-title">Explore all leagues</h2>
          <div className="virtuals__leagues-grid">
            {(['Fast Kick-Off', 'Kings League', 'Penalty Kicks', 'Cup Final', 'Corner Kings', 'Trophy Cup'] as const).map(
              (name, i) => (
                <div key={name} className={`virtuals__leagues-grid-tile virtuals__leagues-grid-tile--${i + 1}`}>
                  <span className="virtuals__leagues-grid-icon" aria-hidden>⚽</span>
                  <p className="virtuals__leagues-grid-name">{name}</p>
                </div>
              ),
            )}
          </div>
        </section>

        {/* --- West Corner promo --- */}
        <section className="virtuals__card virtuals__west-corner" aria-label="West Corner">
          <h2 className="virtuals__card-title virtuals__card-title--white">West Corner</h2>
          <p className="virtuals__card-subtitle virtuals__card-subtitle--muted">
            The best pre-match promo on virtuals — start your day here.
          </p>
          <div className="virtuals__west-tiles">
            <div className="virtuals__west-tile" />
            <div className="virtuals__west-tile" />
            <div className="virtuals__west-tile" />
          </div>
        </section>

        {/* --- Betting Virtuals long copy --- */}
        <section className="virtuals__card virtuals__info" aria-label="Betting Virtuals">
          <h2 className="virtuals__card-title">Betting Virtuals</h2>
          <p className="virtuals__info-body">
            Virtual betting is a type of online betting where players wager on
            outcomes generated by software rather than real-life events. Games
            run every minute, so you never have to wait long. Explore the
            leagues above, pick your side, and cash in on the excitement.
          </p>
          <ul className="virtuals__info-links">
            <li>Introduction to virtual football</li>
            <li>Schedules of virtual football leagues</li>
            <li>Latest virtual football payouts</li>
            <li>Betting glossary</li>
          </ul>
        </section>

        {/* --- FAQ --- */}
        <section className="virtuals__card virtuals__faq" aria-label="Frequently Asked Questions">
          <h2 className="virtuals__card-title">Frequently Asked Questions</h2>
          <ul className="virtuals__faq-list">
            <li>How do I play virtual football?</li>
            <li>What's the minimum bet on virtual leagues?</li>
            <li>What happens if my game is cancelled?</li>
            <li>Are virtual outcomes random?</li>
            <li>Where can I find match statistics?</li>
          </ul>
        </section>
      </main>
    </div>
  )
}

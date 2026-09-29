import arrowBackFilled from '../assets/icons/arrow-back-filled.svg'
import personFilled from '../assets/icons/person-filled.svg'
import './Virtuals.css'

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
}

export function Virtuals({ onBack }: VirtualsProps) {
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

        {/* --- 3. Scheduled Leagues — dark navy card --- */}
        <section className="virtuals__card virtuals__scheduled" aria-label="Scheduled Leagues">
          <div className="virtuals__card-header">
            <h2 className="virtuals__card-title virtuals__card-title--white">
              Scheduled Leagues
            </h2>
            <p className="virtuals__card-subtitle virtuals__card-subtitle--muted">
              Virtual football, kicking off every minute
            </p>
          </div>
          <div className="virtuals__scheduled-grid">
            <div className="virtuals__scheduled-col virtuals__scheduled-col--large">
              <div className="virtuals__league-large virtuals__league-large--blue">
                <div className="virtuals__league-icon-lg" aria-hidden>⚽</div>
                <div className="virtuals__league-meta">
                  <p className="virtuals__league-name">Fast Kick-Off</p>
                  <p className="virtuals__league-countdown">3:42</p>
                </div>
                <button type="button" className="virtuals__league-cta">PLAY</button>
              </div>
              <div className="virtuals__league-large virtuals__league-large--orange">
                <div className="virtuals__league-icon-lg" aria-hidden>🏟️</div>
                <div className="virtuals__league-meta">
                  <p className="virtuals__league-name">Fast Kick-Off</p>
                  <p className="virtuals__league-countdown">1:15</p>
                </div>
                <button type="button" className="virtuals__league-cta">PLAY</button>
              </div>
            </div>
            <div className="virtuals__scheduled-col">
              <div className="virtuals__league-small">
                <div className="virtuals__league-icon-sm" aria-hidden>⚽</div>
                <div className="virtuals__league-small-meta">
                  <p className="virtuals__league-name">Kings League</p>
                  <p className="virtuals__league-countdown-sm">4:20</p>
                </div>
                <button type="button" className="virtuals__league-cta virtuals__league-cta--dark">GO</button>
              </div>
              <div className="virtuals__league-small">
                <div className="virtuals__league-icon-sm" aria-hidden>🥅</div>
                <div className="virtuals__league-small-meta">
                  <p className="virtuals__league-name">Penalty Kicks</p>
                  <p className="virtuals__league-countdown-sm">1:03</p>
                </div>
                <button type="button" className="virtuals__league-cta virtuals__league-cta--dark">GO</button>
              </div>
              <div className="virtuals__league-small">
                <div className="virtuals__league-icon-sm" aria-hidden>🏆</div>
                <div className="virtuals__league-small-meta">
                  <p className="virtuals__league-name">Cup Final</p>
                  <p className="virtuals__league-countdown-sm">2:47</p>
                </div>
                <button type="button" className="virtuals__league-cta virtuals__league-cta--dark">GO</button>
              </div>
            </div>
          </div>
        </section>

        {/* --- 4. Trending Bets — tan card --- */}
        <section className="virtuals__card virtuals__trending" aria-label="Trending Bets">
          <div className="virtuals__card-header">
            <h2 className="virtuals__card-title">Trending Bets</h2>
            <p className="virtuals__card-subtitle">Top picks right now</p>
          </div>
          <div className="virtuals__trending-grid">
            <div className="virtuals__trending-tile">
              <div className="virtuals__trending-header">
                <span className="virtuals__trending-team">Kings United</span>
                <span className="virtuals__trending-vs">vs</span>
                <span className="virtuals__trending-team">Titans FC</span>
              </div>
              <p className="virtuals__trending-line">1X2 · Kings win</p>
              <p className="virtuals__trending-odds">4.16</p>
            </div>
            <div className="virtuals__trending-tile">
              <div className="virtuals__trending-header">
                <span className="virtuals__trending-team">Corner FC</span>
                <span className="virtuals__trending-vs">vs</span>
                <span className="virtuals__trending-team">Kings Cup</span>
              </div>
              <p className="virtuals__trending-line">Over 2.5 Goals</p>
              <p className="virtuals__trending-odds">1.85</p>
            </div>
          </div>
        </section>

        {/* --- 5. Scheduled Tournaments — white card, blue promo --- */}
        <section className="virtuals__card" aria-label="Scheduled Tournaments">
          <h2 className="virtuals__card-title">Scheduled Tournaments</h2>
          <div className="virtuals__tournament-promo">
            <div className="virtuals__tournament-avatar" aria-hidden>🏆</div>
            <div className="virtuals__tournament-info">
              <p className="virtuals__tournament-name">Weekly Kings Cup</p>
              <p className="virtuals__tournament-meta">
                Starts in 2h 14m · Entry ₦500
              </p>
            </div>
            <button type="button" className="virtuals__tournament-cta">ENTER</button>
          </div>
        </section>

        {/* --- 6. Latest Winners — white card --- */}
        <section className="virtuals__card" aria-label="Latest Winners">
          <div className="virtuals__card-header">
            <h2 className="virtuals__card-title">Latest Winners</h2>
            <p className="virtuals__card-subtitle">
              See who's just cashed out on virtuals
            </p>
          </div>
          <div className="virtuals__winners-highlight">
            <span className="virtuals__winners-highlight-icon" aria-hidden>👑</span>
            <span className="virtuals__winners-highlight-amount">
              ₦20,000,000
            </span>
            <span className="virtuals__winners-highlight-trophies" aria-hidden>
              🏆
            </span>
          </div>
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

        {/* --- 7. Instant Leagues — white card, 6-tile grid ---
          *  This is the section Jay Jay will hide behind. */}
        <section className="virtuals__card virtuals__instant-leagues" aria-label="Instant Leagues">
          <div className="virtuals__card-header">
            <h2 className="virtuals__card-title">Instant Leagues</h2>
            <p className="virtuals__card-subtitle">
              Fresh matches every minute
            </p>
          </div>
          <div className="virtuals__instant-grid">
            {[
              { name: 'Fast Kick-Off', modifier: 'red' },
              { name: 'Kings League', modifier: 'orange' },
              { name: 'Penalty Kicks', modifier: 'pink' },
              { name: 'Cup Final', modifier: 'green' },
              { name: 'Corner Kings', modifier: 'purple' },
              { name: 'Trophy Cup', modifier: 'blue' },
            ].map((tile) => (
              <div
                key={tile.name}
                className={`virtuals__instant-tile virtuals__instant-tile--${tile.modifier}`}
              >
                <span className="virtuals__instant-icon" aria-hidden>⚽</span>
                <p className="virtuals__instant-name">{tile.name}</p>
              </div>
            ))}
          </div>
        </section>

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
    </div>
  )
}

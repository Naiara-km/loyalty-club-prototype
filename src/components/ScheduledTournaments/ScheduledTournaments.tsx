import jackpotIcon from '../../assets/virtuals/jackpot-icon.svg'
import raysLarge from '../../assets/virtuals/rays-large.svg'
import raysSmall from '../../assets/virtuals/rays-small.svg'
import timerPulse from '../../assets/virtuals/timer-pulse.svg'
import './ScheduledTournaments.css'

/** Scheduled Tournaments section — Figma 362:44507. Same header
 *  pattern as Scheduled Leagues (title + subtitle + jackpot icon)
 *  above a two-column layout: one full-height large tile on the
 *  left plus two 76 px small tiles stacked on the right.
 *
 *  Note: the Figma design uses per-tournament crest artwork inside
 *  each tile. The prototype renders neutral centred name labels
 *  instead so the section can ship without the crest artwork.
 *  Everything else — gradients, rays background, layout, countdowns
 *  — matches Figma verbatim. */

export function ScheduledTournaments() {
  return (
    <section className="sched-tournaments" aria-label="Scheduled Tournaments">
      <header className="sched-tournaments__header">
        <div className="sched-tournaments__titles">
          <p className="sched-tournaments__title">Scheduled Tournaments</p>
          <p className="sched-tournaments__subtitle">
            Virtual kup football, with fast knock-outs
          </p>
        </div>
        <img
          src={jackpotIcon}
          alt=""
          className="sched-tournaments__jackpot-icon"
        />
      </header>

      <div className="sched-tournaments__grid">
        {/* --- Left: large hero tile --- */}
        <div className="sched-tournaments__hero">
          <img
            src={raysLarge}
            alt=""
            className="sched-tournaments__rays sched-tournaments__rays--large"
            aria-hidden
          />
          <div className="sched-tournaments__countdown sched-tournaments__countdown--top">
            <span className="sched-tournaments__countdown-time">88:88</span>
            <img
              src={timerPulse}
              alt=""
              className="sched-tournaments__countdown-icon"
            />
          </div>
          <div className="sched-tournaments__hero-mark">
            <span className="sched-tournaments__hero-name">
              Kings<br />Champions
            </span>
          </div>
          <button type="button" className="sched-tournaments__play sched-tournaments__play--large">
            Play NOW
          </button>
        </div>

        {/* --- Right: two small stacked tiles --- */}
        <div className="sched-tournaments__col">
          <div className="sched-tournaments__tile sched-tournaments__tile--afkon">
            <img
              src={raysSmall}
              alt=""
              className="sched-tournaments__rays sched-tournaments__rays--small"
              aria-hidden
            />
            <div className="sched-tournaments__tile-mark">
              <span className="sched-tournaments__tile-name">
                Kings<br />Afkon
              </span>
            </div>
            <div className="sched-tournaments__tile-meta">
              <div className="sched-tournaments__countdown">
                <span className="sched-tournaments__countdown-time">88:88</span>
                <img
                  src={timerPulse}
                  alt=""
                  className="sched-tournaments__countdown-icon"
                />
              </div>
              <button type="button" className="sched-tournaments__play">Play</button>
            </div>
          </div>

          <div className="sched-tournaments__tile sched-tournaments__tile--eurokup">
            <img
              src={raysSmall}
              alt=""
              className="sched-tournaments__rays sched-tournaments__rays--small sched-tournaments__rays--centered"
              aria-hidden
            />
            <div className="sched-tournaments__tile-mark">
              <span className="sched-tournaments__tile-name">
                Kings<br />Euro Kup
              </span>
            </div>
            <div className="sched-tournaments__tile-meta">
              <div className="sched-tournaments__countdown">
                <span className="sched-tournaments__countdown-time">88:88</span>
                <img
                  src={timerPulse}
                  alt=""
                  className="sched-tournaments__countdown-icon"
                />
              </div>
              <button type="button" className="sched-tournaments__play">Play</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

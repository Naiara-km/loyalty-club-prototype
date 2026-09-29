import jackpotIcon from '../../assets/virtuals/jackpot-icon.svg'
import timerPulse from '../../assets/virtuals/timer-pulse.svg'
import timerPulseLive from '../../assets/virtuals/timer-pulse-live.svg'
import './ScheduledLeagues.css'

/** Scheduled Leagues section — Figma 362:44063. Two-column grid:
 *  left column stacks two large tiles, right column stacks three
 *  small tiles. Each tile shows a neutral league mark on the left
 *  and a countdown + Play pill on the right.
 *
 *  Note: the Figma design uses per-league crest artwork for the tile
 *  marks. The prototype renders a neutral text badge with the league
 *  name in its place so the code doesn't carry the crest artwork.
 *  Everything else — gradients, layout, spacing, countdown behaviour
 *  — matches Figma verbatim. */

type TileProps = {
  name: string
  countdown: string
  isLive?: boolean
  size: 'large' | 'small'
  modifier: string
}

function LeagueTile({ name, countdown, isLive, size, modifier }: TileProps) {
  return (
    <div className={`sched-leagues__tile sched-leagues__tile--${size} sched-leagues__tile--${modifier}`}>
      <div className="sched-leagues__tile-mark">
        <span className="sched-leagues__tile-name">{name}</span>
      </div>
      <div className="sched-leagues__tile-meta">
        <div className="sched-leagues__countdown">
          <span className="sched-leagues__countdown-time">{countdown}</span>
          <img
            src={isLive ? timerPulseLive : timerPulse}
            alt=""
            className="sched-leagues__countdown-icon"
          />
        </div>
        <button type="button" className="sched-leagues__play">Play</button>
      </div>
    </div>
  )
}

export function ScheduledLeagues() {
  return (
    <section className="sched-leagues" aria-label="Scheduled Leagues">
      <header className="sched-leagues__header">
        <div className="sched-leagues__titles">
          <p className="sched-leagues__title">Scheduled Leagues</p>
          <p className="sched-leagues__subtitle">
            Virtual football, kicking off every minute
          </p>
        </div>
        <img
          src={jackpotIcon}
          alt=""
          className="sched-leagues__jackpot-icon"
        />
      </header>

      <div className="sched-leagues__grid">
        <div className="sched-leagues__col sched-leagues__col--large">
          <LeagueTile
            name="Kings League"
            countdown="02:00"
            size="large"
            modifier="league"
          />
          <LeagueTile
            name="Kings Champions"
            countdown="01:30"
            size="large"
            modifier="champions"
          />
        </div>
        <div className="sched-leagues__col sched-leagues__col--small">
          <LeagueTile
            name="Kings Liga"
            countdown="02:00"
            size="small"
            modifier="liga"
          />
          <LeagueTile
            name="Kings Italiano"
            countdown="01:30"
            size="small"
            modifier="italiano"
          />
          <LeagueTile
            name="Kings Bundliga"
            countdown="LIVE"
            isLive
            size="small"
            modifier="bundliga"
          />
        </div>
      </div>
    </section>
  )
}

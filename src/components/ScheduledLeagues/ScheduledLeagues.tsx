import jackpotIcon from '../../assets/virtuals/jackpot-icon.svg'
import kingsLeagueIcon from '../../assets/virtuals/kings-league-icon.svg'
import kingsLeagueLabel from '../../assets/virtuals/kings-league-label.svg'
import kingsChampionsIcon from '../../assets/virtuals/kings-champions-icon.svg'
import kingsChampionsLabel from '../../assets/virtuals/kings-champions-label.svg'
import kingsLigaIcon from '../../assets/virtuals/kings-liga-icon.svg'
import kingsLigaLabel from '../../assets/virtuals/kings-liga-label.svg'
import kingsItalianoIcon from '../../assets/virtuals/kings-italiano-icon.svg'
import kingsItalianoLabel from '../../assets/virtuals/kings-italiano-label.svg'
import kingsBundligaIcon from '../../assets/virtuals/kings-bundliga-icon.svg'
import kingsBundligaLabel from '../../assets/virtuals/kings-bundliga-label.svg'
import timerPulse from '../../assets/virtuals/timer-pulse.svg'
import timerPulseLive from '../../assets/virtuals/timer-pulse-live.svg'
import './ScheduledLeagues.css'

/** Scheduled Leagues section — Figma 362:44063. Two-column grid:
 *  left column stacks two large tiles (Kings League, Kings Champions),
 *  right column stacks three small tiles (Kings Liga, Kings Italiano,
 *  Kings Bundliga). Each tile shows a country/league mark on the left
 *  and a countdown + Play pill on the right. Icons/labels come from
 *  the Figma export in src/assets/virtuals/. */

type TileProps = {
  icon: string
  label: string
  countdown: string
  isLive?: boolean
  size: 'large' | 'small'
  modifier: string
}

function LeagueTile({ icon, label, countdown, isLive, size, modifier }: TileProps) {
  return (
    <div className={`sched-leagues__tile sched-leagues__tile--${size} sched-leagues__tile--${modifier}`}>
      <div className="sched-leagues__tile-mark">
        <div className="sched-leagues__tile-icon">
          <img src={icon} alt="" />
        </div>
        <div className="sched-leagues__tile-label">
          <img src={label} alt="" />
        </div>
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
            icon={kingsLeagueIcon}
            label={kingsLeagueLabel}
            countdown="02:00"
            size="large"
            modifier="league"
          />
          <LeagueTile
            icon={kingsChampionsIcon}
            label={kingsChampionsLabel}
            countdown="01:30"
            size="large"
            modifier="champions"
          />
        </div>
        <div className="sched-leagues__col sched-leagues__col--small">
          <LeagueTile
            icon={kingsLigaIcon}
            label={kingsLigaLabel}
            countdown="02:00"
            size="small"
            modifier="liga"
          />
          <LeagueTile
            icon={kingsItalianoIcon}
            label={kingsItalianoLabel}
            countdown="01:30"
            size="small"
            modifier="italiano"
          />
          <LeagueTile
            icon={kingsBundligaIcon}
            label={kingsBundligaLabel}
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

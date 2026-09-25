import chevronRightFilled from '../../assets/icons/chevron-right-filled.svg'
import './MissionProgress.css'

export type MissionProgressVariant = 'Start' | 'Mission 1' | 'Mission 2' | 'Mission 3'

type MissionProgressProps = {
  variant: MissionProgressVariant
  onClick?: () => void
}

/** XP earned at each variant. Max XP is 500 for this bar. */
const xpPerVariant: Record<MissionProgressVariant, number> = {
  Start: 0,
  'Mission 1': 100,
  'Mission 2': 200,
  'Mission 3': 500,
}

const MAX_XP = 500

export function MissionProgress({ variant, onClick }: MissionProgressProps) {
  const xp = xpPerVariant[variant]
  const pct = Math.min(100, (xp / MAX_XP) * 100)
  return (
    <button
      type="button"
      className="mission-progress"
      onClick={onClick}
    >
      <div className="mission-progress__row">
        <span className="mission-progress__label">Starter</span>
        <div className="mission-progress__bar" aria-hidden>
          <div
            className="mission-progress__bar-fill"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="mission-progress__value">{xp}/{MAX_XP} XP</span>
      </div>
      <img
        src={chevronRightFilled}
        alt=""
        className="mission-progress__chevron"
      />
    </button>
  )
}

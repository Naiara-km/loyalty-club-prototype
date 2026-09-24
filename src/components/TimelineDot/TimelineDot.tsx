import checkFilled from '../../assets/icons/check-filled.svg'
import './TimelineDot.css'

export type TimelineDotState = 'Locked' | 'Active' | 'Completed'
export type TimelineDotStep = 1 | 2 | 3

type TimelineDotProps = {
  state: TimelineDotState
  step?: TimelineDotStep
}

const stateClass: Record<TimelineDotState, string> = {
  Locked: 'timeline-dot--locked',
  Active: 'timeline-dot--active',
  Completed: 'timeline-dot--completed',
}

export function TimelineDot({ state, step }: TimelineDotProps) {
  return (
    <div className={`timeline-dot ${stateClass[state]}`}>
      {state === 'Completed' && (
        <img src={checkFilled} alt="" className="timeline-dot__icon" />
      )}
      {state === 'Active' && step != null && (
        <span className="timeline-dot__label">{step}</span>
      )}
      {state === 'Locked' && (
        <span className="timeline-dot__label">?</span>
      )}
    </div>
  )
}

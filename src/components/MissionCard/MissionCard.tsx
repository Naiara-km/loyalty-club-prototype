import playArrowFilled from '../../assets/icons/play-arrow-filled.svg'
import { Button } from '../Button/Button'
import { Chip } from '../Chip/Chip'
import './MissionCard.css'

export type MissionCardVariant = 'Active' | 'pending' | 'Completed'

type MissionCardProps = {
  variant: MissionCardVariant
  title?: string
  subtitle?: string
  xpLabel?: string
  shirtLabel?: string
  buttonLabel?: string
  completedText?: string
  nextStepLabel?: string
  onButtonClick?: () => void
}

export function MissionCard(props: MissionCardProps) {
  if (props.variant === 'Active') {
    const {
      title = 'Mission title',
      subtitle = 'subtitle',
      xpLabel = '+ 100 XP',
      shirtLabel = 'Shirt 1',
      buttonLabel = 'Button',
      nextStepLabel = 'NEXT STEP',
      onButtonClick,
    } = props
    return (
      <div className="mission-card mission-card--active">
        <div className="mission-card__meta">
          <div className="mission-card__meta-col">
            <div className="mission-card__title-and-subtitle">
              <p className="mission-card__title mission-card__title--active">{title}</p>
              <p className="mission-card__subtitle">{subtitle}</p>
            </div>
            <div className="mission-card__badges mission-card__badges--active">
              <Chip variant="XP">{xpLabel}</Chip>
              <Chip variant="Shirt">{shirtLabel}</Chip>
            </div>
          </div>
        </div>
        <Button onClick={onButtonClick}>{buttonLabel}</Button>
        <div className="mission-card__next-step">
          <img
            src={playArrowFilled}
            alt=""
            className="mission-card__next-step-icon"
          />
          <span className="mission-card__next-step-label">{nextStepLabel}</span>
        </div>
      </div>
    )
  }

  if (props.variant === 'pending') {
    const {
      title = 'Mistery mission',
      subtitle = 'subtitle',
      xpLabel = '+100 XP',
      shirtLabel = 'Shirt 1',
    } = props
    return (
      <div className="mission-card mission-card--pending">
        <svg
          className="mission-card__pending-border"
          aria-hidden
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            rx="11.5"
            ry="11.5"
            fill="none"
            strokeWidth="1"
            strokeDasharray="5 5"
            style={{
              width: 'calc(100% - 1px)',
              height: 'calc(100% - 1px)',
              stroke: 'var(--ui-text-disabled)',
            }}
          />
        </svg>
        <div className="mission-card__meta">
          <div className="mission-card__meta-col">
            <div className="mission-card__title-and-subtitle">
              <p className="mission-card__title mission-card__title--pending">{title}</p>
              <p className="mission-card__subtitle">{subtitle}</p>
            </div>
            <div className="mission-card__badges mission-card__badges--pending">
              <Chip variant="disabled">{xpLabel}</Chip>
              <Chip variant="disabled">{shirtLabel}</Chip>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const {
    title = 'Mistery mission',
    completedText = 'Done · Nigeria Pride of 96 collected · +100 XP',
  } = props
  return (
    <div className="mission-card mission-card--completed">
      <div className="mission-card__meta">
        <div className="mission-card__meta-col">
          <p className="mission-card__title mission-card__title--completed">{title}</p>
          <p className="mission-card__completed-text">{completedText}</p>
        </div>
      </div>
    </div>
  )
}

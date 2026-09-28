import playArrowFilled from '../../assets/icons/play-arrow-filled.svg'
import { Button } from '../Button/Button'
import { Chip } from '../Chip/Chip'
import './MissionCard.css'

export type MissionCardVariant = 'Active' | 'pending' | 'Completed'

/** Decorative pattern layered on top of the Active card's gold
 *  gradient. `chevron` is the current default — a subtle
 *  forward-motion wash. The others (`rings`, `voxels`, `dot-grid`,
 *  `aurora`) are alternates kept for stakeholder Storybook reviews. */
export type MissionCardShader =
  | 'chevron'
  | 'rings'
  | 'voxels'
  | 'dot-grid'
  | 'aurora'

/** Only meaningful when `shader === 'chevron'`. Chooses between the
 *  repeating chevron tile (default), a single large decorative
 *  chevron, and a designer-authored multi-chevron graphic laid
 *  over a solid-yellow background (Figma 290:48194). */
export type MissionCardTexture = 'chevrons' | 'single' | 'graphic'

type MissionCardProps = {
  variant: MissionCardVariant
  title?: string
  subtitle?: string
  /** Bold gold prefix rendered before the subtitle (e.g. "Mission 2").
   *  Figma 272:46479 splits the subtitle into an accent run + body. */
  subtitleAccent?: string
  xpLabel?: string
  shirtLabel?: string
  buttonLabel?: string
  /** When true, the primary Button renders a looping shimmer. Wired
   *  from ClubHome only for CLAIM SHIRT NOW and NEED A HINT. */
  buttonShimmer?: boolean
  /** When set on an Active card, replaces the Button with a dark
   *  display-only countdown ("Unlocks in HH:MM:SS"). Used for M2 in the
   *  unlocking state — Figma node 66:8460. */
  countdownText?: string
  completedText?: string
  nextStepLabel?: string
  /** Icon rendered inside the yellow next-step pill. Defaults to the
   *  play-arrow. Pass `null` to hide the icon entirely (M3 uses no icon
   *  next to "LAST MISSION" per Figma 272:46066). */
  nextStepIcon?: string | null
  /** Active variant only — swap the decorative shader pattern. */
  shader?: MissionCardShader
  /** Active variant only, meaningful when `shader === 'chevron'`.
   *  Defaults to the repeating tile. */
  texture?: MissionCardTexture
  onButtonClick?: () => void
}

export function MissionCard(props: MissionCardProps) {
  if (props.variant === 'Active') {
    const {
      title = 'Mission title',
      subtitle,
      subtitleAccent,
      xpLabel = '+ 100 XP',
      shirtLabel = 'Shirt 1',
      buttonLabel = 'Button',
      buttonShimmer = false,
      countdownText,
      nextStepLabel = 'NEXT STEP',
      nextStepIcon = playArrowFilled,
      shader = 'chevron',
      texture = 'chevrons',
      onButtonClick,
    } = props
    const hasSubtitle = Boolean(subtitle || subtitleAccent)
    return (
      <div
        className={`mission-card mission-card--active mission-card--shader-${shader} mission-card--texture-${texture}`}
      >
        <div className="mission-card__meta">
          <div className="mission-card__meta-col">
            <div className="mission-card__title-and-subtitle">
              <p className="mission-card__title mission-card__title--active">{title}</p>
              {hasSubtitle && (
                <p className="mission-card__subtitle">
                  {subtitleAccent && (
                    <span className="mission-card__subtitle-accent">
                      {subtitleAccent}
                    </span>
                  )}
                  {subtitleAccent && subtitle && ' '}
                  {subtitle}
                </p>
              )}
            </div>
            <div className="mission-card__badges mission-card__badges--active">
              <Chip variant="XP">{xpLabel}</Chip>
              <Chip variant="Shirt">{shirtLabel}</Chip>
            </div>
          </div>
        </div>
        {countdownText ? (
          <div className="mission-card__countdown" aria-live="polite">
            <span className="mission-card__countdown-label">Unlocks In </span>
            <span className="mission-card__countdown-time">{countdownText}</span>
          </div>
        ) : (
          <Button onClick={onButtonClick} shimmer={buttonShimmer}>
            {buttonLabel}
          </Button>
        )}
        <div className="mission-card__next-step">
          {nextStepIcon && (
            <img
              src={nextStepIcon}
              alt=""
              className="mission-card__next-step-icon"
            />
          )}
          <span className="mission-card__next-step-label">{nextStepLabel}</span>
        </div>
      </div>
    )
  }

  if (props.variant === 'pending') {
    const {
      title = 'Mistery mission',
      subtitle,
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
              {subtitle && <p className="mission-card__subtitle">{subtitle}</p>}
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

import iconRight from '../../assets/icons/icon-right.svg'
import type { ShirtVariant } from '../Shirt/Shirt'
import { Wardrobe, WonStatus } from '../Wardrobe/Wardrobe'
import './MainCard.css'

export type MainCardVariant = '0/3' | '1/3' | '2/3' | '3/3'

type MainCardProps = {
  variant: MainCardVariant
  onChangeShirt?: () => void
}

const wonCount: Record<MainCardVariant, number> = {
  '0/3': 0,
  '1/3': 1,
  '2/3': 2,
  '3/3': 3,
}

/** Per-slot shirt + title used when the shirt has been won. Position 0..2
 * maps to slots left-to-right. Titles come verbatim from Figma. */
const slots: Array<{ shirt: ShirtVariant; title: string }> = [
  { shirt: 'Green', title: 'Club White' },
  { shirt: 'Red', title: 'Club Red' },
  { shirt: 'Betking', title: 'Club Blue' },
]

export function MainCard({ variant, onChangeShirt }: MainCardProps) {
  const won = wonCount[variant]
  return (
    <div className="main-card">
      <div className="main-card__items-row">
        {slots.map((slot, i) => {
          const isWon = i < won
          const stepNum = i + 1
          if (isWon) {
            return (
              <Wardrobe
                key={i}
                variant="Won"
                shirt={slot.shirt}
                title={slot.title}
                status={<WonStatus n={stepNum} />}
                bordered={false}
              />
            )
          }
          return (
            <Wardrobe
              key={i}
              variant="Locked"
              shirt="Default"
              title="Mistery Shirt"
              status={`Win mission ${stepNum}`}
              bordered={false}
            />
          )
        })}
      </div>
      <div className="main-card__footer">
        <p className="main-card__status-text">{`${won} / 3 collected`}</p>
        <button
          type="button"
          className="main-card__change-btn"
          onClick={onChangeShirt}
        >
          <span className="main-card__change-btn-label">Change Shirt</span>
          <img
            src={iconRight}
            alt=""
            className="main-card__change-btn-icon"
          />
        </button>
      </div>
    </div>
  )
}

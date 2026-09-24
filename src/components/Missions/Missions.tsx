import { Chip } from '../Chip/Chip'
import './Missions.css'

type MissionsProps = {
  title?: string
  subtitle?: string
  chipLabel?: string
}

export function Missions({
  title = 'Complete missions',
  subtitle = 'Finish 3 missions to unlock 3 limited-edition shirts. Each one earns XP and moves you closer to the next level.',
  chipLabel = '14 DAYS LEFT',
}: MissionsProps) {
  return (
    <div className="missions">
      <div className="missions__block">
        <div className="missions__title-row">
          <h2 className="missions__title">{title}</h2>
        </div>
        <p className="missions__subtitle">{subtitle}</p>
      </div>
      <div className="missions__chip">
        <Chip variant="Variant4">{chipLabel}</Chip>
      </div>
    </div>
  )
}

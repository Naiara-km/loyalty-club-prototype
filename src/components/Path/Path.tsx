import {
  TimelineDot,
  type TimelineDotState,
  type TimelineDotStep,
} from '../TimelineDot/TimelineDot'
import './Path.css'

export type PathVariant = '1' | '2' | '3' | 'all'

type PathProps = {
  variant: PathVariant
}

type DotSpec = { state: TimelineDotState; step: TimelineDotStep }

const dotsPerVariant: Record<PathVariant, [DotSpec, DotSpec, DotSpec]> = {
  '1': [
    { state: 'Active', step: 1 },
    { state: 'Locked', step: 2 },
    { state: 'Locked', step: 3 },
  ],
  '2': [
    { state: 'Completed', step: 1 },
    { state: 'Active', step: 2 },
    { state: 'Locked', step: 3 },
  ],
  '3': [
    { state: 'Completed', step: 1 },
    { state: 'Completed', step: 2 },
    { state: 'Active', step: 3 },
  ],
  all: [
    { state: 'Completed', step: 1 },
    { state: 'Completed', step: 2 },
    { state: 'Completed', step: 3 },
  ],
}

export function Path({ variant }: PathProps) {
  const [d1, d2, d3] = dotsPerVariant[variant]
  return (
    <div className="path">
      <TimelineDot state={d1.state} step={d1.step} />
      <div
        className={`path__line${d2.state === 'Completed' ? ' path__line--completed' : ''}`}
      />
      <TimelineDot state={d2.state} step={d2.step} />
      <div
        className={`path__line${d3.state === 'Completed' ? ' path__line--completed' : ''}`}
      />
      <TimelineDot state={d3.state} step={d3.step} />
    </div>
  )
}

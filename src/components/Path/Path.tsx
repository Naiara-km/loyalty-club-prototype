import {
  TimelineDot,
  type TimelineDotState,
  type TimelineDotStep,
} from '../TimelineDot/TimelineDot'
import './Path.css'

export type PathDot = { state: TimelineDotState; step?: TimelineDotStep }

type PathProps = {
  /** Three dots stacked top-to-bottom, matching the order of the
   *  mission cards rendered alongside the path. */
  dots: [PathDot, PathDot, PathDot]
}

/** True when both endpoints of a segment are Completed — colours the
 *  connecting line green. Any other pairing keeps the default grey. */
function isCompletedSegment(a: PathDot, b: PathDot): boolean {
  return a.state === 'Completed' && b.state === 'Completed'
}

export function Path({ dots }: PathProps) {
  const [d1, d2, d3] = dots
  return (
    <div className="path">
      <TimelineDot state={d1.state} step={d1.step} />
      <div
        className={`path__line${
          isCompletedSegment(d1, d2) ? ' path__line--completed' : ''
        }`}
      />
      <TimelineDot state={d2.state} step={d2.step} />
      <div
        className={`path__line${
          isCompletedSegment(d2, d3) ? ' path__line--completed' : ''
        }`}
      />
      <TimelineDot state={d3.state} step={d3.step} />
    </div>
  )
}

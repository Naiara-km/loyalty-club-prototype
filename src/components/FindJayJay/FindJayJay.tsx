import { JayJay } from '../JayJay/JayJay'
import './FindJayJay.css'

/** Find Jay Jay strip — Figma 362:44558. A shallow horizontal band
 *  where Jay Jay's head peeks out from the left and a highlight
 *  "TAP TO CATCH" pill sits on the right. This is the section that
 *  hosts the mission-2 hide/seek interaction: tapping the button
 *  (or Jay Jay himself) fires the find_jay_jay event that advances
 *  M2 from active to condition_met.
 *
 *  The face is rendered by clipping the shared JayJay figure to the
 *  head area so we don't ship a separate face-only asset. */

type FindJayJayProps = {
  onCatch?: () => void
}

export function FindJayJay({ onCatch }: FindJayJayProps) {
  return (
    <section className="find-jayjay" aria-label="Find Jay Jay">
      <button
        type="button"
        className="find-jayjay__face"
        onClick={onCatch}
        aria-label="Catch Jay Jay"
      >
        <div className="find-jayjay__figure">
          <JayJay variant="white" />
        </div>
      </button>
      <button
        type="button"
        className="find-jayjay__catch"
        onClick={onCatch}
      >
        TAP TO CATCH
      </button>
    </section>
  )
}

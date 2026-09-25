import { useState } from 'react'
import { stageLabels, type Stage } from '../../state/clubReducer'
import { useClubState } from '../../state/ClubStateContext'
import './DevPanel.css'

/** Prototype-only overlay for state controls. Fires reducer events that
 *  the app can't trigger via normal clicks (12h wait, "found Jay Jay",
 *  "bet placed"), and lets the reviewer jump to any stage or scrub the
 *  days-left countdown. */
export function DevPanel() {
  const { state, dispatch } = useClubState()
  const { missions, countdownDaysLeft } = state
  const [open, setOpen] = useState(false)

  return (
    <div className={`dev-panel${open ? ' dev-panel--open' : ''}`}>
      <button
        type="button"
        className="dev-panel__handle"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close dev panel' : 'Open dev panel'}
      >
        DEV
      </button>

      {open && (
        <div className="dev-panel__body">
          <div className="dev-panel__title">Dev · state controls</div>

          <div className="dev-panel__group">
            <label className="dev-panel__field-label" htmlFor="dev-stage">
              Jump to stage
            </label>
            <select
              id="dev-stage"
              className="dev-panel__select"
              onChange={(e) => {
                dispatch({ type: 'jump_to_stage', stage: e.target.value as Stage })
              }}
              value=""
            >
              <option value="" disabled>
                — choose —
              </option>
              {stageLabels.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <div className="dev-panel__group">
            <div className="dev-panel__field-label">Simulate events</div>
            <div className="dev-panel__button-col">
              <button
                type="button"
                className="dev-panel__btn"
                disabled={missions.m2.state !== 'unlocking'}
                onClick={() => dispatch({ type: 'twelve_hours_elapsed' })}
              >
                Skip 12h wait (M2)
              </button>
              <button
                type="button"
                className="dev-panel__btn"
                disabled={missions.m2.state !== 'active'}
                onClick={() => dispatch({ type: 'find_jay_jay' })}
              >
                Find Jay Jay (M2)
              </button>
              <button
                type="button"
                className="dev-panel__btn"
                disabled={missions.m3.state !== 'active'}
                onClick={() => dispatch({ type: 'place_bet' })}
              >
                Place a bet (M3)
              </button>
            </div>
          </div>

          <div className="dev-panel__group">
            <label className="dev-panel__field-label" htmlFor="dev-days">
              Days left
            </label>
            <input
              id="dev-days"
              className="dev-panel__number"
              type="number"
              min={0}
              max={30}
              value={countdownDaysLeft}
              onChange={(e) => {
                const n = Number(e.target.value)
                if (Number.isFinite(n)) dispatch({ type: 'set_days_left', days: n })
              }}
            />
          </div>

          <button
            type="button"
            className="dev-panel__btn dev-panel__btn--reset"
            onClick={() => dispatch({ type: 'reset' })}
          >
            Reset to Start
          </button>
        </div>
      )}
    </div>
  )
}

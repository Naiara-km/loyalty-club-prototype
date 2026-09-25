import { useState } from 'react'
import { useClubState } from '../../state/ClubStateContext'
import './DevPanel.css'

/** Overlay dev widget for prototype-only state toggles. Currently exposes
 *  a single toggle: whether the Betking Club row shows the notification
 *  (Mission 1 in 'active' with a claim pending) or not (Mission 1
 *  'completed' — 100 XP earned, no pending claim). */
export function DevPanel() {
  const { hasPendingClaim, setState } = useClubState()
  const [open, setOpen] = useState(false)

  const toggleClaim = () => {
    setState((s) => {
      if (s.missions.m1.state === 'active') {
        // Mark M1 completed → hasPendingClaim false, +100 XP
        return {
          ...s,
          missions: {
            ...s.missions,
            m1: { ...s.missions.m1, state: 'completed', completedAt: Date.now() },
          },
        }
      }
      // Reset M1 back to active → hasPendingClaim true, 0 XP
      return {
        ...s,
        missions: {
          ...s.missions,
          m1: { ...s.missions.m1, state: 'active', completedAt: null },
        },
      }
    })
  }

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
          <div className="dev-panel__title">Dev · state toggles</div>

          <label className="dev-panel__row">
            <span className="dev-panel__label">Claim pending</span>
            <button
              type="button"
              className={`dev-panel__switch${
                hasPendingClaim ? ' dev-panel__switch--on' : ''
              }`}
              role="switch"
              aria-checked={hasPendingClaim}
              onClick={toggleClaim}
            >
              <span className="dev-panel__switch-thumb" />
            </button>
          </label>

          <div className="dev-panel__hint">
            {hasPendingClaim
              ? 'Row shows red dot + “1 reward ready”'
              : 'Row shows plain XP only'}
          </div>
        </div>
      )}
    </div>
  )
}

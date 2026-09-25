import arrowBackFilled from '../assets/icons/arrow-back-filled.svg'
import './ClubHome.css'

type ClubHomeProps = {
  onBack: () => void
}

/** Placeholder Club home screen — the entry-point routing task only needs
 *  the back arrow returning to My Account. Full home layout is built in
 *  the next task. */
export function ClubHome({ onBack }: ClubHomeProps) {
  return (
    <div className="club-home">
      <div className="club-home__app-bar">
        <button
          type="button"
          className="club-home__back"
          aria-label="Back"
          onClick={onBack}
        >
          <img src={arrowBackFilled} alt="" className="club-home__back-icon" />
        </button>
        <span className="club-home__title">My Betking Club</span>
      </div>
      <div className="club-home__placeholder">
        <p>Club home — coming next.</p>
      </div>
    </div>
  )
}

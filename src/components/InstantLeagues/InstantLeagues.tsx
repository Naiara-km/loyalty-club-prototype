import jackpotIcon from '../../assets/virtuals/jackpot-icon.svg'
import chevronOverlay from '../../assets/virtuals/chevron-overlay.png'
import findJayJayHands from '../../assets/illustrations/find-jay-jay-hands.png'
import './InstantLeagues.css'

/** Instant Leagues section — Figma 362:44563. White card, 2×2 grid
 *  of gradient tiles. Each tile has a chevron overlay pattern, a
 *  neutral league mark on the left and a white outline PLAY pill on
 *  the right. Bottom divider closes the section.
 *
 *  Note: the Figma design uses per-league crest artwork inside each
 *  tile mark. To stay consistent with ScheduledLeagues, this
 *  component renders a neutral centred text badge in that slot. */

type TileProps = {
  name: string
  modifier: string
}

function InstantTile({ name, modifier }: TileProps) {
  return (
    <div className={`instant-leagues__tile instant-leagues__tile--${modifier}`}>
      <img
        src={chevronOverlay}
        alt=""
        className="instant-leagues__chevron"
      />
      <div className="instant-leagues__tile-mark">
        <span className="instant-leagues__tile-name">{name}</span>
      </div>
      <div className="instant-leagues__tile-meta">
        <button type="button" className="instant-leagues__play">Play</button>
      </div>
    </div>
  )
}

export function InstantLeagues() {
  return (
    <section className="instant-leagues" aria-label="Instant Leagues">
      {/* Jay Jay hands — Figma 373:55309. Absolutely positioned so the
        * hands "grip" the top edge of the Instant Leagues card, poking
        * up 10px into the Find Jay Jay strip above. */}
      <img
        src={findJayJayHands}
        alt=""
        className="instant-leagues__hands"
      />
      <header className="instant-leagues__header">
        <div className="instant-leagues__titles">
          <p className="instant-leagues__title">Instant Leagues</p>
          <p className="instant-leagues__subtitle">
            Try our faster, on demand Virtual football
          </p>
        </div>
        <img
          src={jackpotIcon}
          alt=""
          className="instant-leagues__jackpot-icon"
        />
      </header>

      <div className="instant-leagues__grid">
        <InstantTile name="Kings Instaleague" modifier="league" />
        <InstantTile name="Kings Instaliga" modifier="liga" />
        <InstantTile name="Kings Instaitaliano" modifier="italiano" />
        <InstantTile name="Kings Instabundliga" modifier="bundliga" />
      </div>

      <div className="instant-leagues__divider" />
    </section>
  )
}

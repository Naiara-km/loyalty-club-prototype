import fireFlame from '../../assets/virtuals/fire-flame.png'
import clock from '../../assets/virtuals/clock.svg'
import overUnder from '../../assets/virtuals/over-under.svg'
import sportsSoccer from '../../assets/virtuals/sports-soccer.svg'
import virtualsBadgeAway from '../../assets/virtuals/virtuals-badge-away.png'
import flagBrazil from '../../assets/virtuals/flag-brazil.svg'
import flagRsa from '../../assets/virtuals/flag-rsa.png'
import flagEngland from '../../assets/virtuals/flag-england.svg'
import './TrendingBets.css'

/** Trending Bets section — Figma 362:44103. Horizontal snap-scroll
 *  strip of six accumulator ("Trending Acca") tiles, each themed to
 *  the league it belongs to. Fully data-driven from the config below. */

type Selection = {
  icon: string
  title: string
  market: string
  match: string
  odds: string
}

type TileConfig = {
  league: string
  week: string
  initials: string
  time: string
  gradient: string
  timeBg: string
  oddsColor: string
  selections: Selection[]
  more: number
  fold: string
  totalOdds: string
}

const tiles: TileConfig[] = [
  {
    league: 'Kings League',
    week: 'Week 28',
    initials: 'KL',
    time: '0:30',
    gradient: 'linear-gradient(256deg, rgb(176, 7, 180) 0%, rgb(113, 3, 118) 100%)',
    timeBg: '#710376',
    oddsColor: '#b007b4',
    selections: [
      { icon: virtualsBadgeAway, title: 'LIV', market: '1X2', match: 'LIV v BRE', odds: '1.38' },
      { icon: overUnder, title: 'Over', market: 'O/U 2.5', match: 'MUN v FUL', odds: '1.78' },
      { icon: sportsSoccer, title: 'GG', market: 'GG/NG', match: 'CHE v MCI', odds: '1.74' },
    ],
    more: 2,
    fold: '5 Fold',
    totalOdds: '42.20',
  },
  {
    league: 'Kings WorldKup',
    week: 'Week 28',
    initials: 'KW',
    time: '1:30',
    gradient: 'linear-gradient(256deg, rgb(232, 198, 125) 0%, rgb(185, 133, 45) 100%)',
    timeBg: '#b9852d',
    oddsColor: '#b9852d',
    selections: [
      { icon: flagBrazil, title: 'BRA', market: '1X2', match: 'BRA v MOR', odds: '2.10' },
      { icon: flagRsa, title: 'RSA', market: '1X2', match: 'MEX v RSA', odds: '2.40' },
      { icon: flagEngland, title: 'ENG', market: '1X2', match: 'ENG v JPN', odds: '1.80' },
    ],
    more: 6,
    fold: '9 Fold',
    totalOdds: '65.00',
  },
  {
    league: 'Kings Liga',
    week: 'Week 28',
    initials: 'KLg',
    time: '2:00',
    gradient: 'linear-gradient(256deg, rgb(250, 175, 0) 0%, rgb(222, 134, 1) 50%, rgb(189, 101, 0) 100%)',
    timeBg: '#bd6500',
    oddsColor: '#de8601',
    selections: [
      { icon: virtualsBadgeAway, title: 'LIV', market: '1X2', match: 'LIV v BRE', odds: '1.38' },
      { icon: overUnder, title: 'Over 2.5', market: 'Total Goals', match: 'MUN v FUL', odds: '1.78' },
      { icon: sportsSoccer, title: 'GG', market: 'GG/NG', match: 'CHE v MCI', odds: '1.74' },
    ],
    more: 2,
    fold: '5 Fold',
    totalOdds: '42.20',
  },
  {
    league: 'Kings Champions',
    week: 'Week 28',
    initials: 'KC',
    time: '2:30',
    gradient: 'linear-gradient(256deg, rgb(3, 44, 234) 0%, rgb(2, 28, 151) 100%)',
    timeBg: '#021c97',
    oddsColor: '#032cea',
    selections: [
      { icon: virtualsBadgeAway, title: 'LIV', market: '1X2', match: 'LIV v BRE', odds: '1.38' },
      { icon: overUnder, title: 'Over 2.5', market: 'Total Goals', match: 'MUN v FUL', odds: '1.78' },
      { icon: sportsSoccer, title: 'GG', market: 'GG/NG', match: 'CHE v MCI', odds: '1.74' },
    ],
    more: 2,
    fold: '5 Fold',
    totalOdds: '42.20',
  },
  {
    league: 'Kings Italiano',
    week: 'Week 28',
    initials: 'KI',
    time: '3:00',
    gradient: 'linear-gradient(256deg, rgb(38, 157, 217) 0%, rgb(40, 101, 181) 100%)',
    timeBg: '#2865b5',
    oddsColor: '#269dd9',
    selections: [
      { icon: virtualsBadgeAway, title: 'LIV', market: '1X2', match: 'LIV v BRE', odds: '1.38' },
      { icon: overUnder, title: 'Over 2.5', market: 'Total Goals', match: 'MUN v FUL', odds: '1.78' },
      { icon: sportsSoccer, title: 'GG', market: 'GG/NG', match: 'CHE v MCI', odds: '1.74' },
    ],
    more: 2,
    fold: '5 Fold',
    totalOdds: '42.20',
  },
  {
    league: 'Kings Bundliga',
    week: 'Week 28',
    initials: 'KB',
    time: '3:30',
    gradient: 'linear-gradient(256deg, rgb(229, 28, 62) 0%, rgb(149, 3, 65) 100%)',
    timeBg: '#950341',
    oddsColor: '#e51c3e',
    selections: [
      { icon: virtualsBadgeAway, title: 'LIV', market: '1X2', match: 'LIV v BRE', odds: '1.38' },
      { icon: overUnder, title: 'Over 2.5', market: 'Total Goals', match: 'MUN v FUL', odds: '1.78' },
      { icon: sportsSoccer, title: 'GG', market: 'GG/NG', match: 'CHE v MCI', odds: '1.74' },
    ],
    more: 2,
    fold: '5 Fold',
    totalOdds: '42.20',
  },
]

function AccaTile({ tile }: { tile: TileConfig }) {
  return (
    <div className="trending-bets__tile">
      <div
        className="trending-bets__tile-header"
        style={{ backgroundImage: tile.gradient }}
      >
        <div className="trending-bets__tile-logo" aria-hidden>
          {tile.initials}
        </div>
        <div className="trending-bets__tile-league">
          <p className="trending-bets__tile-name">{tile.league}</p>
          <p className="trending-bets__tile-week">{tile.week}</p>
        </div>
        <div
          className="trending-bets__tile-time"
          style={{ backgroundColor: tile.timeBg }}
        >
          <img src={clock} alt="" className="trending-bets__tile-clock" />
          <span className="trending-bets__tile-time-text">{tile.time}</span>
        </div>
      </div>

      <div className="trending-bets__tile-content">
        <div className="trending-bets__selections">
          {tile.selections.map((sel, i) => (
            <div key={i} className="trending-bets__row">
              <img
                src={sel.icon}
                alt=""
                className="trending-bets__row-icon"
              />
              <div className="trending-bets__row-meta">
                <p className="trending-bets__row-title">{sel.title}</p>
                <p className="trending-bets__row-market">
                  {sel.market} <span>-</span> {sel.match}
                </p>
              </div>
              <p
                className="trending-bets__row-odds"
                style={{ color: tile.oddsColor }}
              >
                {sel.odds}
              </p>
            </div>
          ))}
          <p className="trending-bets__more">
            + {tile.more} more selections
          </p>
        </div>

        <div className="trending-bets__footer">
          <p className="trending-bets__fold">
            <span>{tile.fold}</span>
            <span className="trending-bets__fold-sep">|</span>
            <span style={{ color: tile.oddsColor }}>{tile.totalOdds}</span>
          </p>
          <button type="button" className="trending-bets__view">View</button>
        </div>
      </div>
    </div>
  )
}

export function TrendingBets() {
  return (
    <section className="trending-bets" aria-label="Trending Bets">
      <header className="trending-bets__header">
        <img
          src={fireFlame}
          alt=""
          className="trending-bets__flame"
        />
        <div className="trending-bets__titles">
          <p className="trending-bets__title">Trending Bets</p>
          <p className="trending-bets__subtitle">
            The most popular selections right now
          </p>
        </div>
      </header>

      <div className="trending-bets__strip">
        {tiles.map((tile) => (
          <AccaTile key={tile.league} tile={tile} />
        ))}
      </div>
    </section>
  )
}

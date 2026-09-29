import './LatestWinners.css'

/** Latest Winners section — Figma 362:44517. Header row + horizontal
 *  snap-scroll strip of winner cards. Each card shows an emoji, the
 *  winner's masked phone number, the prize amount, the game they won
 *  on, a coloured badge ("Just Now" / "Lucky Win" / "Big Win!") and
 *  a View Bet link — all colour-themed per card. Unicode emojis are
 *  used inline in place of Figma's exported emoji PNGs. */

type WinnerConfig = {
  emoji: string
  masked: string
  amount: string
  game: string
  badge: string
  color: string
}

const winners: WinnerConfig[] = [
  {
    emoji: '🎉',
    masked: '07******123',
    amount: '₦20,000,000',
    game: 'on Kings Insta Italiano',
    badge: 'Just Now',
    color: '#ff4141',
  },
  {
    emoji: '🍀',
    masked: '07******123',
    amount: '₦20,000,000',
    game: 'on Instant Leagues',
    badge: 'Lucky Win',
    color: '#14d42a',
  },
  {
    emoji: '🤩',
    masked: '07******123',
    amount: '₦20,000,000',
    game: 'on Kings Insta Italiano',
    badge: 'Big Win!',
    color: '#fa9f00',
  },
]

export function LatestWinners() {
  return (
    <section className="latest-winners" aria-label="Latest Winners">
      <header className="latest-winners__header">
        <p className="latest-winners__title">Latest Winners</p>
        <p className="latest-winners__subtitle">
          Don&rsquo;t miss out, 2,563 people won in the last hour!
        </p>
      </header>

      <div className="latest-winners__strip">
        {winners.map((w, i) => (
          <article key={i} className="latest-winners__card">
            <span className="latest-winners__emoji" aria-hidden>
              {w.emoji}
            </span>

            <div className="latest-winners__body">
              <p className="latest-winners__masked">{w.masked} won</p>
              <p
                className="latest-winners__amount"
                style={{ color: w.color }}
              >
                {w.amount}
              </p>
              <p className="latest-winners__game">{w.game}</p>
            </div>

            <div className="latest-winners__aside">
              <span
                className="latest-winners__badge"
                style={{ backgroundColor: w.color }}
              >
                {w.badge}
              </span>
              <button
                type="button"
                className="latest-winners__view"
                style={{ color: w.color }}
              >
                View Bet
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

import bannerSparkle from '../../assets/illustrations/banner-sparkle.svg'
import bannerStar from '../../assets/illustrations/banner-star.svg'
import shirtBlue from '../../assets/illustrations/shirt-tile-blue.svg'
import shirtGreen from '../../assets/illustrations/shirt-tile-green.svg'
import shirtLocked1 from '../../assets/illustrations/shirt-tile-1-locked.svg'
import shirtLocked2 from '../../assets/illustrations/shirt-tile-2-locked.svg'
import shirtLocked3 from '../../assets/illustrations/shirt-tile-3-locked.svg'
import shirtRed from '../../assets/illustrations/shirt-tile-red.svg'
import { DanceButton } from '../DanceButton/DanceButton'
import { JayJay, type JayJayVariant } from '../JayJay/JayJay'
import './ClubBanner.css'

export type ClubBannerVariant = 'White' | 'Red' | 'Green' | 'Blue'

type ClubBannerProps = {
  variant: ClubBannerVariant
}

type Config = {
  jayJay: JayJayVariant
  collected: number
  tiles: [string, string, string]
}

/** Progressive-unlock config per variant: how many shirts collected, which
 *  team Jay Jay wears, and which tile art each slot renders. */
const config: Record<ClubBannerVariant, Config> = {
  White: {
    jayJay: 'white',
    collected: 0,
    tiles: [shirtLocked1, shirtLocked2, shirtLocked3],
  },
  Red: {
    jayJay: 'Red',
    collected: 1,
    tiles: [shirtRed, shirtLocked2, shirtLocked3],
  },
  Green: {
    jayJay: 'Green',
    collected: 2,
    tiles: [shirtRed, shirtGreen, shirtLocked3],
  },
  Blue: {
    jayJay: 'Betking',
    collected: 3,
    tiles: [shirtRed, shirtGreen, shirtBlue],
  },
}

export function ClubBanner({ variant }: ClubBannerProps) {
  const cfg = config[variant]
  return (
    <div className="club-banner">
      <div className="club-banner__content">
        <div className="club-banner__board">
          <div className="club-banner__board-center">
            <div className="club-banner__rotate">
              <div className="club-banner__card-stack">
                <div className="club-banner__card-shadow" aria-hidden />
                <div className="club-banner__offer-card">
                  <div className="club-banner__title">
                    <p className="club-banner__title-line">Win Jay Jay&rsquo;s</p>
                    <p className="club-banner__title-line club-banner__title-line--accent">
                      3 Exclusive Shirts!
                    </p>
                  </div>
                  <div className="club-banner__rewards">
                    <div className="club-banner__shirts">
                      {cfg.tiles.map((src, i) => (
                        <div
                          key={i}
                          className={`club-banner__shirt-slot club-banner__shirt-slot--${i}`}
                        >
                          <div className="club-banner__shirt-tile">
                            <img src={src} alt="" className="club-banner__shirt-img" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <img src={bannerStar} alt="" className="club-banner__star" />
                  <div className="club-banner__sparkle-wrap">
                    <div className="club-banner__sparkle-inner">
                      <img
                        src={bannerSparkle}
                        alt=""
                        className="club-banner__sparkle-img"
                      />
                    </div>
                  </div>
                </div>
                <div className="club-banner__badge">
                  <p className="club-banner__badge-text">{cfg.collected}/3 COLLECTED</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="club-banner__cta">
          <DanceButton variant="Active" />
        </div>
      </div>
      <div className="club-banner__jayjay">
        <div className="club-banner__jayjay-figure">
          <JayJay variant={cfg.jayJay} />
        </div>
      </div>
    </div>
  )
}

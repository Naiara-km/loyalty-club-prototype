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
export type CollectedCount = 0 | 1 | 2 | 3

/** ClubBanner props are decoupled:
 *  - `jayJayShirt` controls the character (matches whichever shirt the
 *    user is wearing — unchanged by mission progress unless they change
 *    it manually).
 *  - `collectedCount` controls the tile row + "N/3 COLLECTED" badge.
 *  - `variant` remains as a shortcut preset that sets both. Existing
 *    stories keep passing `variant` and still render identically.
 *  - `allDone` swaps the copy for the empty-state after all 3 shirts
 *    are claimed: "New missions. / Coming soon..!" + NEXT MISSIONS
 *    badge + three locked (?) tiles. Figma 493:58147.
 *  Explicit `jayJayShirt` or `collectedCount` overrides the preset. */
type ClubBannerProps = {
  variant?: ClubBannerVariant
  jayJayShirt?: JayJayVariant
  collectedCount?: CollectedCount
  allDone?: boolean
  onDanceClick?: () => void
}

type Preset = { jayJayShirt: JayJayVariant; collectedCount: CollectedCount }

const variantPresets: Record<ClubBannerVariant, Preset> = {
  White: { jayJayShirt: 'white', collectedCount: 0 },
  Red: { jayJayShirt: 'Red', collectedCount: 1 },
  Green: { jayJayShirt: 'Green', collectedCount: 2 },
  Blue: { jayJayShirt: 'Betking', collectedCount: 3 },
}

const tilesByCount: Record<CollectedCount, [string, string, string]> = {
  0: [shirtLocked1, shirtLocked2, shirtLocked3],
  1: [shirtRed, shirtLocked2, shirtLocked3],
  2: [shirtRed, shirtGreen, shirtLocked3],
  3: [shirtRed, shirtGreen, shirtBlue],
}

export function ClubBanner({ variant, jayJayShirt, collectedCount, allDone = false, onDanceClick }: ClubBannerProps) {
  const preset = variant ? variantPresets[variant] : variantPresets.White
  const finalJayJay = jayJayShirt ?? preset.jayJayShirt
  const finalCount = collectedCount ?? preset.collectedCount
  // Empty-state hides the collected count by locking all three tiles;
  // otherwise show tiles matching the current progress.
  const tiles = allDone
    ? [shirtLocked1, shirtLocked2, shirtLocked3]
    : tilesByCount[finalCount]

  return (
    <div className="club-banner">
      <div className="club-banner__inner">
      <div className="club-banner__content">
        <div className="club-banner__board">
          <div className="club-banner__board-center">
            <div className="club-banner__rotate">
              <div className="club-banner__card-stack">
                <div className="club-banner__card-shadow" aria-hidden />
                <div className="club-banner__offer-card">
                  <div className="club-banner__title">
                    {allDone ? (
                      <>
                        <p className="club-banner__title-line">New missions.</p>
                        <p className="club-banner__title-line club-banner__title-line--accent">
                          Coming soon..!
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="club-banner__title-line">Win Jay Jay&rsquo;s</p>
                        <p className="club-banner__title-line club-banner__title-line--accent">
                          3 Exclusive Shirts!
                        </p>
                      </>
                    )}
                  </div>
                  <div className="club-banner__rewards">
                    <div className="club-banner__shirts">
                      {tiles.map((src, i) => (
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
                  <p className="club-banner__badge-text">
                    {allDone ? 'NEXT MISSIONS' : `${finalCount}/3 COLLECTED`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="club-banner__cta">
          <DanceButton variant="Active" onClick={onDanceClick} />
        </div>
      </div>
      <div className="club-banner__jayjay">
        <div className="club-banner__jayjay-figure">
          <JayJay variant={finalJayJay} />
        </div>
      </div>
      </div>
    </div>
  )
}

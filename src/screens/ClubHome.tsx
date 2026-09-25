import arrowBackFilled from '../assets/icons/arrow-back-filled.svg'
import { ClubBanner, type CollectedCount } from '../components/ClubBanner/ClubBanner'
import type { JayJayVariant } from '../components/JayJay/JayJay'
import { MainCard, type MainCardVariant } from '../components/MainCard/MainCard'
import { MissionCard, type MissionCardVariant } from '../components/MissionCard/MissionCard'
import { Missions } from '../components/Missions/Missions'
import {
  MissionProgress,
  type MissionProgressVariant,
} from '../components/MissionProgress/MissionProgress'
import { Path, type PathVariant } from '../components/Path/Path'
import { useClubState } from '../state/ClubStateContext'
import type { Mission, ShirtColour } from '../state/clubState'
import './ClubHome.css'

/** Real Club home screen. Renders against ClubState — every variant is
 *  derived from `state`. Reference: Figma home screens 66:8187 through
 *  72:9126 (the 7 progression states share this layout). */
type ClubHomeProps = {
  onBack: () => void
}

/** ---- state → component variant mappings ---- */

const jayJayByColour: Record<ShirtColour, JayJayVariant> = {
  White: 'white',
  Green: 'Green',
  Red: 'Red',
  Blue: 'Betking',
}

function xpToProgressVariant(xp: number): MissionProgressVariant {
  if (xp >= 500) return 'Mission 3'
  if (xp >= 200) return 'Mission 2'
  if (xp >= 100) return 'Mission 1'
  return 'Start'
}

function missionsToPathVariant(
  m1: Mission,
  m2: Mission,
  m3: Mission,
): PathVariant {
  if (m1.state === 'completed' && m2.state === 'completed' && m3.state === 'completed') {
    return 'all'
  }
  if (m3.state === 'active' || m3.state === 'condition_met') return '3'
  if (m2.state === 'active' || m2.state === 'condition_met' || m2.state === 'unlocking') {
    return '2'
  }
  return '1'
}

function collectedToMainVariant(count: number): MainCardVariant {
  return `${count}/3` as MainCardVariant
}

function missionCardVariant(state: Mission['state']): MissionCardVariant {
  if (state === 'completed') return 'Completed'
  if (state === 'active' || state === 'condition_met') return 'Active'
  return 'pending' // locked + unlocking
}

/** Build MissionCard props derived from the mission's state, the mission
 *  number (1/2/3), the countdown for M2 unlocking, and the dispatch fn. */
function missionCardProps(
  mission: Mission,
  missionNo: 1 | 2 | 3,
  countdownDaysLeft: number,
  onClaim?: () => void,
  onHint?: () => void,
): React.ComponentProps<typeof MissionCard> {
  const variant = missionCardVariant(mission.state)
  const shirtName = ({ 1: 'Green', 2: 'Red', 3: 'Blue' } as const)[missionNo]

  // Titles + subtitles per state
  if (mission.state === 'completed') {
    return {
      variant: 'Completed',
      title: `Mission ${missionNo}`,
      completedText: `Done · Shirt ${shirtName} collected · +${mission.xpReward} XP`,
    }
  }

  if (mission.state === 'locked') {
    return {
      variant: 'pending',
      title: 'Mystery mission',
      subtitle: `Revealed when mission ${missionNo - 1} is done`,
      xpLabel: `+${mission.xpReward} XP`,
      shirtLabel: `Shirt ${shirtName}`,
    }
  }

  if (mission.state === 'unlocking') {
    return {
      variant: 'pending',
      title: 'Mystery mission',
      subtitle: `Unlocks in ${countdownDaysLeft} days`,
      xpLabel: `+${mission.xpReward} XP`,
      shirtLabel: `Shirt ${shirtName}`,
    }
  }

  // active or condition_met — the Active card variant with a CTA
  const ctaLabel = (() => {
    if (mission.state === 'condition_met') return 'CLAIM SHIRT NOW!'
    if (missionNo === 1) return 'CLAIM SHIRT NOW!'
    if (missionNo === 2) return 'Need a hint?'
    return 'BET NOW'
  })()

  const onClick = (() => {
    if (mission.state === 'condition_met') return onClaim
    if (missionNo === 1) return onClaim // M1 active → claim
    if (missionNo === 2) return onHint // M2 active → open hint modal (once built)
    return undefined // M3 active BET NOW — dev-panel simulates the bet
  })()

  return {
    variant,
    title: `Mission ${missionNo}`,
    subtitle:
      missionNo === 1
        ? 'Claim your first shirt!'
        : missionNo === 2
          ? 'Find Jay Jay in Virtuals'
          : 'Place any bet',
    xpLabel: `+${mission.xpReward} XP`,
    shirtLabel: `Shirt ${shirtName}`,
    buttonLabel: ctaLabel,
    onButtonClick: onClick,
  }
}

export function ClubHome({ onBack }: ClubHomeProps) {
  const { state, totalXp, collectedCount, dispatch } = useClubState()
  const { missions, wardrobe, countdownDaysLeft } = state

  const wornSlot = wardrobe.slots[wardrobe.wearing]!
  const jayJayShirt: JayJayVariant = jayJayByColour[wornSlot.colour]
  const banner: CollectedCount = Math.min(3, collectedCount) as CollectedCount
  const allDone = totalXp === 500

  return (
    <div className="club-home">
      {/* Header */}
      <header className="club-home__header">
        <button
          type="button"
          className="club-home__back"
          onClick={onBack}
          aria-label="Back"
        >
          <img src={arrowBackFilled} alt="" className="club-home__back-icon" />
        </button>
        <span className="club-home__title">My Betking Club</span>
      </header>

      {/* Banner — Jay Jay reflects worn shirt, tiles reflect collected count */}
      <ClubBanner jayJayShirt={jayJayShirt} collectedCount={banner} />

      {/* Content sheet */}
      <div className="club-home__content">
        {!allDone && (
          <>
            <MissionProgress variant={xpToProgressVariant(totalXp)} />
            <Missions chipLabel={`${countdownDaysLeft} DAYS LEFT`} />
          </>
        )}

        <div className="club-home__missions-row">
          <Path variant={missionsToPathVariant(missions.m1, missions.m2, missions.m3)} />
          <div className="club-home__mission-cards">
            <MissionCard
              {...missionCardProps(
                missions.m1,
                1,
                countdownDaysLeft,
                () => dispatch({ type: 'claim_shirt_1' }),
              )}
            />
            <MissionCard
              {...missionCardProps(
                missions.m2,
                2,
                countdownDaysLeft,
                () => dispatch({ type: 'claim_shirt_2' }),
                // Need a hint? — modal opens next task; for now a no-op.
                undefined,
              )}
            />
            <MissionCard
              {...missionCardProps(
                missions.m3,
                3,
                countdownDaysLeft,
                () => dispatch({ type: 'claim_shirt_3' }),
              )}
            />
          </div>
        </div>

        <section className="club-home__collection">
          <h2 className="club-home__collection-title">Jay Jay&rsquo;s collection</h2>
          <MainCard variant={collectedToMainVariant(collectedCount)} />
        </section>
      </div>
    </div>
  )
}

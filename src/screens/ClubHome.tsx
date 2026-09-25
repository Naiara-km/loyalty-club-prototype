import { useEffect, useState } from 'react'
import arrowBackFilled from '../assets/icons/arrow-back-filled.svg'
import { CelebrationModal } from '../components/CelebrationModal/CelebrationModal'
import { ClubBanner, type CollectedCount } from '../components/ClubBanner/ClubBanner'
import type { JayJayVariant } from '../components/JayJay/JayJay'
import { MainCard, type MainCardVariant } from '../components/MainCard/MainCard'
import { MissionCard } from '../components/MissionCard/MissionCard'
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

/** Format ms remaining as "HH:MM:SS" (00:00:00 floor). */
function formatCountdown(msRemaining: number): string {
  const total = Math.max(0, Math.floor(msRemaining / 1000))
  const h = String(Math.floor(total / 3600)).padStart(2, '0')
  const m = String(Math.floor((total % 3600) / 60)).padStart(2, '0')
  const s = String(total % 60).padStart(2, '0')
  return `${h}:${m}:${s}`
}

/** Titles per mission number — Figma node 66:8200. Note "Mistery" is
 *  the Figma spelling (kept verbatim). */
const missionTitles = {
  1: { active: 'Claim Jay Jay first shirt!', locked: 'Mistery mission' },
  2: { active: 'Find Jay Jay', locked: 'Mistery mission' },
  3: { active: 'Place a bet', locked: 'Mistery mission' },
} as const

/** Subtitles for the Active card per mission — Figma 66:8460 (M2)
 *  and 66:8809 (M3). M1's active card doesn't show a subtitle. */
const missionSubtitles: Record<1 | 2 | 3, string | undefined> = {
  1: undefined,
  2: "Jay Jay's hiding in one of our games.",
  3: 'Sports, Virtuals or Casino',
}

/** Build MissionCard props derived from the mission's state, the mission
 *  number (1/2/3), the current tick (for M2's countdown), and the
 *  dispatch fns. */
function missionCardProps(
  mission: Mission,
  missionNo: 1 | 2 | 3,
  now: number,
  onClaim?: () => void,
  onHint?: () => void,
): React.ComponentProps<typeof MissionCard> {
  const shirtName = ({ 1: 'Green', 2: 'Red', 3: 'Blue' } as const)[missionNo]

  // Completed
  if (mission.state === 'completed') {
    return {
      variant: 'Completed',
      title: missionTitles[missionNo].active,
      completedText: `Done · Shirt ${shirtName} collected · +${mission.xpReward} XP`,
    }
  }

  // Locked — dashed pending card with reveal subtitle (Figma 66:8200)
  if (mission.state === 'locked') {
    return {
      variant: 'pending',
      title: missionTitles[missionNo].locked,
      subtitle: `Revealed when mission ${missionNo - 1} is done`,
      xpLabel: `+${mission.xpReward} XP`,
      shirtLabel: `Shirt ${shirtName}`,
    }
  }

  // Unlocking — Active-style card with real title and a countdown pill
  // instead of the primary button (Figma 66:8460).
  if (mission.state === 'unlocking') {
    const msLeft = (mission.unlockedAt ?? now) - now
    return {
      variant: 'Active',
      title: missionTitles[missionNo].active,
      subtitle: missionSubtitles[missionNo],
      xpLabel: `+ ${mission.xpReward} XP`,
      shirtLabel: `Shirt ${shirtName}`,
      countdownText: formatCountdown(msLeft),
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
    variant: 'Active',
    title: missionTitles[missionNo].active,
    subtitle: missionSubtitles[missionNo],
    // M3 is the final mission — Figma 66:8809 labels its step chip
    // "LAST STEP".
    nextStepLabel: missionNo === 3 ? 'LAST STEP' : 'NEXT STEP',
    xpLabel: `+ ${mission.xpReward} XP`,
    shirtLabel: `Shirt ${shirtName}`,
    buttonLabel: ctaLabel,
    onButtonClick: onClick,
  }
}

/** Which mission the user just claimed → drives the celebration modal. */
type ClaimedMissionNo = 1 | 2 | 3

const shirtColourByMission: Record<ClaimedMissionNo, ShirtColour> = {
  1: 'Green',
  2: 'Red',
  3: 'Blue',
}

export function ClubHome({ onBack }: ClubHomeProps) {
  const { state, totalXp, collectedCount, dispatch } = useClubState()
  const { missions, wardrobe, countdownDaysLeft } = state

  // Tick every second while M2 is unlocking so the countdown pill updates.
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    if (missions.m2.state !== 'unlocking') return
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [missions.m2.state])

  // Celebration modal: opens on CLAIM SHIRT NOW, dispatches the claim
  // when the user taps NEXT MISSION (defers state advance until then).
  const [celebrating, setCelebrating] = useState<ClaimedMissionNo | null>(null)
  const claim = (missionNo: ClaimedMissionNo) => setCelebrating(missionNo)
  const confirmClaim = () => {
    if (!celebrating) return
    const type = (
      { 1: 'claim_shirt_1', 2: 'claim_shirt_2', 3: 'claim_shirt_3' } as const
    )[celebrating]
    dispatch({ type })
    setCelebrating(null)
  }

  const wornSlot = wardrobe.slots[wardrobe.wearing]!
  const jayJayShirt: JayJayVariant = jayJayByColour[wornSlot.colour]
  const banner: CollectedCount = Math.min(3, collectedCount) as CollectedCount
  const allDone = totalXp === 500

  // Copies for the celebration modal. M1/M2 use the per-shirt variant
  // (Figma 270:43201) — "Congrats King!" + "Club X Shirt is yours" +
  // "N shirts left" tail + NEXT MISSION button. M3, the final claim,
  // uses the full-collection variant (Figma 186:28774) — different
  // title, no subtitle, "Level 2 reached!" tail (bold), CLOSE button.
  const modalCopy = (() => {
    if (!celebrating) {
      return {
        colour: 'Green' as ShirtColour,
        title: '',
        subtitle: undefined as string | undefined,
        xp: 0,
        tail: '',
        tailBold: false,
        button: 'NEXT MISSION',
      }
    }
    const colour = shirtColourByMission[celebrating]
    const xp = missions[`m${celebrating}` as const].xpReward
    if (celebrating === 3) {
      return {
        colour,
        title: 'Congrats King! You have the full collection!',
        subtitle: undefined,
        xp,
        tail: 'Level 2 reached!',
        tailBold: true,
        button: 'CLOSE',
      }
    }
    const shirtsLeft = Math.max(0, 3 - collectedCount - 1)
    return {
      colour,
      title: 'Congrats King!',
      subtitle: `Club ${colour} Shirt is yours`,
      xp,
      tail: `${shirtsLeft} shirt${shirtsLeft === 1 ? '' : 's'} left`,
      tailBold: false,
      button: 'NEXT MISSION',
    }
  })()

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
              {...missionCardProps(missions.m1, 1, now, () => claim(1))}
            />
            <MissionCard
              {...missionCardProps(
                missions.m2,
                2,
                now,
                () => claim(2),
                // Need a hint? — modal opens next task; for now a no-op.
                undefined,
              )}
            />
            <MissionCard
              {...missionCardProps(missions.m3, 3, now, () => claim(3))}
            />
          </div>
        </div>

        <section className="club-home__collection">
          <h2 className="club-home__collection-title">Jay Jay&rsquo;s collection</h2>
          <MainCard variant={collectedToMainVariant(collectedCount)} />
        </section>
      </div>

      <CelebrationModal
        open={celebrating !== null}
        onClose={confirmClaim}
        shirtColour={modalCopy.colour}
        title={modalCopy.title}
        subtitle={modalCopy.subtitle}
        xpAwarded={modalCopy.xp}
        rewardTail={modalCopy.tail}
        rewardTailBold={modalCopy.tailBold}
        buttonLabel={modalCopy.button}
      />
    </div>
  )
}

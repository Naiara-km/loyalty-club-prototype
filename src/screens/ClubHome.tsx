import { useEffect, useState } from 'react'
import arrowBackFilled from '../assets/icons/arrow-back-filled.svg'
import personCheckFilled from '../assets/icons/person-check-filled.svg'
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
import { Path, type PathDot } from '../components/Path/Path'
import type { TimelineDotState, TimelineDotStep } from '../components/TimelineDot/TimelineDot'
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

/** Map a mission's state to the dot state next to its card. */
function missionToDotState(mission: Mission): TimelineDotState {
  if (mission.state === 'completed') return 'Completed'
  if (
    mission.state === 'active' ||
    mission.state === 'unlocking' ||
    mission.state === 'condition_met'
  ) {
    return 'Active'
  }
  return 'Locked'
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

/** Titles per mission number — Figma nodes 272:44292 (M1), 272:46474
 *  (M2), 272:46066 (M3). "Mistery" is the Figma spelling. */
const missionTitles: Record<1 | 2 | 3, { active: string; locked: string }> = {
  1: { active: 'Claim Jay Jay first shirt!', locked: 'Mistery mission 1' },
  2: { active: 'Find Jay Jay', locked: 'Mistery mission 2' },
  3: { active: 'Place a bet', locked: 'Mistery mission 3' },
}

/** Body of the Active-card subtitle. The bold gold "Mission N" prefix
 *  is applied via the `subtitleAccent` prop. Figma 272:46479 / 272:46066. */
const missionSubtitles: Record<1 | 2 | 3, string | undefined> = {
  1: undefined,
  2: "He's hiding somewhere",
  3: 'Any amount on Sports, Virtuals or Casino.',
}

/** Yellow next-step pill label per mission — Figma renames per state:
 *  M1 "READY", M2 "FOUND" (once located), M3 "LAST MISSION". */
const nextStepLabels: Record<1 | 2 | 3, string> = {
  1: 'READY',
  2: 'FOUND',
  3: 'LAST MISSION',
}

/** Icon shown in the next-step pill. M3 renders without an icon
 *  (Figma 272:46066). */
const nextStepIcons: Record<1 | 2 | 3, string | null> = {
  1: null, // M1 uses the default play-arrow — set via component default
  2: personCheckFilled,
  3: null, // M3 has no icon
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
  // Completed — Figma 272:45692 / 272:46867 render "Done · Club shirt N
  // collected · +N XP" (mission number, no shirt colour).
  if (mission.state === 'completed') {
    return {
      variant: 'Completed',
      title: missionTitles[missionNo].active,
      completedText: `Done · Club shirt ${missionNo} collected · +${mission.xpReward} XP`,
    }
  }

  // Locked — dashed pending card with reveal subtitle (Figma 272:44293)
  if (mission.state === 'locked') {
    return {
      variant: 'pending',
      title: missionTitles[missionNo].locked,
      subtitle: `Revealed when mission ${missionNo - 1} is done`,
      xpLabel: `+${mission.xpReward} XP`,
      shirtLabel: `Shirt ${missionNo}`,
    }
  }

  // Unlocking — Active-style card with real title and a countdown pill
  // instead of the primary button (Figma 66:8460).
  if (mission.state === 'unlocking') {
    const msLeft = (mission.unlockedAt ?? now) - now
    return {
      variant: 'Active',
      title: missionTitles[missionNo].active,
      subtitleAccent: `Mission ${missionNo}`,
      subtitle: missionSubtitles[missionNo],
      xpLabel: `+ ${mission.xpReward} XP`,
      shirtLabel: `Shirt ${missionNo}`,
      countdownText: formatCountdown(msLeft),
      nextStepLabel: nextStepLabels[missionNo],
      nextStepIcon: nextStepIcons[missionNo],
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
    subtitleAccent: `Mission ${missionNo}`,
    subtitle: missionSubtitles[missionNo],
    nextStepLabel: nextStepLabels[missionNo],
    nextStepIcon: nextStepIcons[missionNo],
    xpLabel: `+ ${mission.xpReward} XP`,
    shirtLabel: `Shirt ${missionNo}`,
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

  // Card ordering — Figma section 272:47393 restacks the cards so that
  // the currently-active/unlocking mission is always at the top,
  // followed by remaining locked missions in ascending number order,
  // then completed missions in reverse completion order (newest first).
  const missionRank = (m: Mission): 0 | 1 | 2 => {
    if (m.state === 'active' || m.state === 'unlocking' || m.state === 'condition_met') return 0
    if (m.state === 'locked') return 1
    return 2 // completed
  }
  const orderedMissions: Array<{ no: 1 | 2 | 3; mission: Mission }> = (
    [
      { no: 1, mission: missions.m1 },
      { no: 2, mission: missions.m2 },
      { no: 3, mission: missions.m3 },
    ] as const
  )
    .slice()
    .sort((a, b) => {
      const ra = missionRank(a.mission)
      const rb = missionRank(b.mission)
      if (ra !== rb) return ra - rb
      // Same bucket. Completed: newest first (larger completedAt on top).
      if (ra === 2) {
        return (b.mission.completedAt ?? 0) - (a.mission.completedAt ?? 0)
      }
      // Locked / active: ascending mission number.
      return a.no - b.no
    })

  const claimHandlerByNo: Record<1 | 2 | 3, () => void> = {
    1: () => claim(1),
    2: () => claim(2),
    3: () => claim(3),
  }

  // Path dots mirror the card order — each dot sits next to its card.
  // Active gets the mission number, completed shows a check, locked "?".
  const pathDots: [PathDot, PathDot, PathDot] = [
    {
      state: missionToDotState(orderedMissions[0].mission),
      step: orderedMissions[0].no as TimelineDotStep,
    },
    {
      state: missionToDotState(orderedMissions[1].mission),
      step: orderedMissions[1].no as TimelineDotStep,
    },
    {
      state: missionToDotState(orderedMissions[2].mission),
      step: orderedMissions[2].no as TimelineDotStep,
    },
  ]

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
          <Path dots={pathDots} />
          <div className="club-home__mission-cards">
            {orderedMissions.map(({ no, mission }) => (
              <MissionCard
                key={no}
                {...missionCardProps(mission, no, now, claimHandlerByNo[no])}
              />
            ))}
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

import { useEffect, useState } from 'react'
import arrowBackFilled from '../assets/icons/arrow-back-filled.svg'
import circleNotificationsFilled from '../assets/icons/circle-notifications-filled.svg'
import hourglassEmptyFilled from '../assets/icons/hourglass-empty-filled.svg'
import personCheckFilled from '../assets/icons/person-check-filled.svg'
import { Button } from '../components/Button/Button'
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
import { HintModal } from '../components/HintModal/HintModal'
import { JayJayDanceOverlay } from '../components/JayJayDanceOverlay/JayJayDanceOverlay'
import { LevelsModal } from '../components/LevelsModal/LevelsModal'
import { WardrobeModal } from '../components/WardrobeModal/WardrobeModal'
import { useClubState } from '../state/ClubStateContext'
import type { Mission, ShirtColour, ShirtId } from '../state/clubState'
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

/** Yellow next-step pill label per mission per state. M1 always
 *  shows "READY". M2 reads "NEXT MISSION" while unlocking or active,
 *  flipping to "FOUND" once Jay Jay has been located
 *  (condition_met). M3 stays "LAST MISSION". */
function nextStepLabelFor(
  missionNo: 1 | 2 | 3,
  state: Mission['state'],
): string {
  if (missionNo === 1) return 'READY'
  if (missionNo === 3) return 'LAST MISSION'
  return state === 'condition_met' ? 'FOUND' : 'NEXT MISSION'
}

/** Icon shown in the next-step pill. M2 unlocking (dim countdown card)
 *  and M2 condition_met (found) skip the play-arrow — the former per
 *  Figma 293:48332, the latter uses PersonCheckFilled. M3 has no icon
 *  (Figma 272:46066). */
function nextStepIconFor(
  missionNo: 1 | 2 | 3,
  state: Mission['state'],
): string | null | undefined {
  if (missionNo === 3) return null
  if (missionNo === 2 && state === 'unlocking') return null
  if (missionNo === 2 && state === 'condition_met') return personCheckFilled
  return undefined // fall through to MissionCard default (play-arrow)
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
  // instead of the primary button. Rendered dim (opacity 0.6) to signal
  // it's not actionable yet (Figma 293:48332).
  if (mission.state === 'unlocking') {
    const msLeft = (mission.unlockedAt ?? now) - now
    return {
      variant: 'Active',
      texture: 'graphic',
      dimmed: true,
      title: missionTitles[missionNo].active,
      subtitleAccent: `Mission ${missionNo}`,
      subtitle: missionSubtitles[missionNo],
      xpLabel: `+ ${mission.xpReward} XP`,
      shirtLabel: `Shirt ${missionNo}`,
      countdownText: formatCountdown(msLeft),
      nextStepLabel: nextStepLabelFor(missionNo, mission.state),
      nextStepIcon: nextStepIconFor(missionNo, mission.state),
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

  // Every active/condition_met CTA shimmers — CLAIM SHIRT NOW,
  // Need a hint? and BET NOW — so the currently-actionable button
  // always draws the eye regardless of which mission is active.
  const buttonShimmer = true

  return {
    variant: 'Active',
    texture: 'graphic',
    title: missionTitles[missionNo].active,
    subtitleAccent: `Mission ${missionNo}`,
    subtitle: missionSubtitles[missionNo],
    nextStepLabel: nextStepLabelFor(missionNo, mission.state),
    nextStepIcon: nextStepIconFor(missionNo, mission.state),
    xpLabel: `+ ${mission.xpReward} XP`,
    shirtLabel: `Shirt ${missionNo}`,
    buttonLabel: ctaLabel,
    buttonShimmer,
    onButtonClick: onClick,
  }
}

/** Which mission the user just claimed → drives the celebration modal. */
type ClaimedMissionNo = 1 | 2 | 3

const shirtColourByMission: Record<ClaimedMissionNo, ShirtColour> = {
  1: 'Red',
  2: 'Green',
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

  // Wardrobe modal — opens from the MainCard "Change Shirt" footer.
  const [wardrobeOpen, setWardrobeOpen] = useState(false)

  // Levels modal — opens when the Starter progress bar is tapped.
  const [levelsOpen, setLevelsOpen] = useState(false)

  // Hint modal — opens from the M2 active card's "Need a hint?" CTA.
  const [hintOpen, setHintOpen] = useState(false)

  // Jay Jay dance overlay — opens from the banner's Jay Jay Dance CTA.
  // Full-screen above ClubHome; scroll position is preserved because
  // it's a sibling, not a route change.
  const [danceOpen, setDanceOpen] = useState(false)

  // Spotlight — on entry to ClubHome, dim everything except the top
  // (actionable) mission card for ~1.5s to pull the eye to the CTA.
  // Skipped when there's nothing to act on (top card is completed or
  // locked). Stage machine covers the fade-out cleanly so the card
  // stays raised until the overlay is fully invisible.
  const [spotlightStage, setSpotlightStage] = useState<
    'showing' | 'fading' | 'done'
  >('showing')

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

  useEffect(() => {
    const fade = window.setTimeout(() => setSpotlightStage('fading'), 1500)
    const done = window.setTimeout(() => setSpotlightStage('done'), 1500 + 400)
    return () => {
      window.clearTimeout(fade)
      window.clearTimeout(done)
    }
  }, [])

  const wornSlot = wardrobe.slots[wardrobe.wearing]!
  const jayJayShirt: JayJayVariant = jayJayByColour[wornSlot.colour]
  const banner: CollectedCount = Math.min(3, collectedCount) as CollectedCount
  const allDone = totalXp === 500 && !state.timeExpired
  const timeExpired = state.timeExpired

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

  // Only show the spotlight when the top card is genuinely actionable
  // (something to claim or engage with). Completed / locked → skip.
  const topState = orderedMissions[0].mission.state
  const spotlightEligible =
    topState === 'active' || topState === 'condition_met'
  const spotlightOn = spotlightEligible && spotlightStage !== 'done'
  const spotlightFading = spotlightStage === 'fading'

  const rootClass = `club-home${spotlightOn ? ' club-home--spotlight' : ''}`

  return (
    <div className={rootClass}>
      {spotlightOn && (
        <div
          className={`club-home__spotlight${spotlightFading ? ' club-home__spotlight--out' : ''}`}
          aria-hidden="true"
        />
      )}
      {/* Header — Figma 272:44279 */}
      <header className="club-home__header">
        <div className="club-home__header-left">
          <button
            type="button"
            className="club-home__icon-btn"
            onClick={onBack}
            aria-label="Back"
          >
            <img src={arrowBackFilled} alt="" className="club-home__back-icon" />
          </button>
          <span className="club-home__title">
            The Betking
            <span className="club-home__title-accent"> Club</span>
          </span>
        </div>
        <button
          type="button"
          className="club-home__icon-btn club-home__icon-btn--help"
          aria-label="Help"
        >
          {/* Inlined so the fill can inherit currentColor (yellow in
           *  this header, per Figma). The MyAccount FAQ row keeps
           *  using the standalone blue SVG. */}
          <svg
            className="club-home__help-icon"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M10 1.66667C5.4 1.66667 1.66667 5.4 1.66667 10C1.66667 14.6 5.4 18.3333 10 18.3333C14.6 18.3333 18.3333 14.6 18.3333 10C18.3333 5.4 14.6 1.66667 10 1.66667ZM10.8333 15.8333H9.16667V14.1667H10.8333V15.8333ZM12.5583 9.375L11.8083 10.1417C11.2083 10.75 10.8333 11.25 10.8333 12.5H9.16667V12.0833C9.16667 11.1667 9.54167 10.3333 10.1417 9.725L11.175 8.675C11.4833 8.375 11.6667 7.95833 11.6667 7.5C11.6667 6.58333 10.9167 5.83333 10 5.83333C9.08333 5.83333 8.33333 6.58333 8.33333 7.5H6.66667C6.66667 5.65833 8.15833 4.16667 10 4.16667C11.8417 4.16667 13.3333 5.65833 13.3333 7.5C13.3333 8.23333 13.0333 8.9 12.5583 9.375Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </header>

      {/* Banner — Jay Jay reflects worn shirt, tiles reflect collected count.
        * When allDone, banner swaps to the "New missions. Coming soon..!"
        * empty-state copy (Figma 493:58147). */}
      <ClubBanner
        jayJayShirt={jayJayShirt}
        collectedCount={banner}
        allDone={allDone}
        onDanceClick={() => setDanceOpen(true)}
      />

      {/* Content sheet */}
      <div className="club-home__content">
        {timeExpired ? (
          <>
            <MissionProgress
              variant={xpToProgressVariant(totalXp)}
              onClick={() => setLevelsOpen(true)}
            />

            {/* --- "Want another chance?" restart banner — Figma 496:60724. */}
            <section
              className="club-home__notify-banner club-home__notify-banner--left"
              aria-label="Want another chance?"
            >
              <h2 className="club-home__notify-title">
                Want another chance?
              </h2>
              <p className="club-home__notify-body">
                Restart your missions and get extra 14 days. Shirts and XP you
                do. will stay yours.
              </p>
              <div className="club-home__notify-actions">
                <Button onClick={() => dispatch({ type: 'restart_missions' })}>
                  RESTART MY MISSIONS
                </Button>
              </div>
            </section>

            {/* --- Compact expired-missions list — Figma 496:60731.
              *  Hourglass for not-yet-completed, green check + strikethrough
              *  for completed. Non-interactive. M3's name stays "Mistery
              *  mission" since it's never revealed in the three expiration
              *  snapshots (user never claims M2 → never unlocks M3's name). */}
            <section className="club-home__completed">
              <h2 className="club-home__section-title">Your missions</h2>
              <ul className="club-home__expired-list">
                {(
                  [
                    { no: 1, label: 'Free Claim Jay Jay First Shirt' },
                    { no: 2, label: 'Find Jay Jay' },
                    { no: 3, label: 'Mistery mission' },
                  ] as const
                ).map(({ no, label }) => {
                  const done =
                    missions[`m${no}` as const].state === 'completed'
                  return (
                    <li
                      key={no}
                      className={`club-home__expired-item${done ? ' club-home__expired-item--done' : ''}`}
                    >
                      {done ? (
                        <svg
                          className="club-home__expired-icon"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden
                        >
                          <circle cx="12" cy="12" r="10" fill="#357a38" />
                          <path
                            d="M10 14.17l-3.59-3.58L5 12l5 5 9-9-1.41-1.41L10 14.17z"
                            fill="white"
                          />
                        </svg>
                      ) : (
                        <img
                          src={hourglassEmptyFilled}
                          alt=""
                          className="club-home__expired-icon"
                        />
                      )}
                      <span className="club-home__expired-label">{label}</span>
                    </li>
                  )
                })}
              </ul>
            </section>

            <section className="club-home__collection">
              <h2 className="club-home__section-title">
                Jay Jay&rsquo;s collection
              </h2>
              <MainCard
                variant={collectedToMainVariant(collectedCount)}
                onChangeShirt={() => setWardrobeOpen(true)}
              />
            </section>
          </>
        ) : allDone ? (
          <>
            {/* --- "More missions coming soon" notify banner — Figma 493:59097.
              *  Yellow-tinted card with bell icon, title/body, NOTIFY ME CTA.
              *  Only shown in the all-done empty state. */}
            <section
              className="club-home__notify-banner"
              aria-label="More missions coming soon"
            >
              <img
                src={circleNotificationsFilled}
                alt=""
                className="club-home__notify-icon"
              />
              <h2 className="club-home__notify-title">
                More missions coming soon
              </h2>
              <p className="club-home__notify-body">
                Be the first to play when missions are available fot you.
              </p>
              <div className="club-home__notify-actions">
                <Button>NOTIFY ME</Button>
              </div>
            </section>

            <MissionProgress
              variant="Mission 3"
              allDone
              onClick={() => setLevelsOpen(true)}
            />

            {/* --- Compact completed-missions list — Figma 493:58165.
              *  Three slim cards, strikethrough titles, light green border.
              *  Reads as a recap, not an interactive mission list. */}
            <section className="club-home__completed">
              <h2 className="club-home__section-title">Your missions</h2>
              <ul className="club-home__completed-list">
                <li className="club-home__completed-item">
                  Claim Jay Jay first shirt!
                </li>
                <li className="club-home__completed-item">
                  Find Jay Jay in the Website
                </li>
                <li className="club-home__completed-item">Place a bet</li>
              </ul>
            </section>

            <section className="club-home__collection">
              <h2 className="club-home__section-title">
                Jay Jay&rsquo;s collection
              </h2>
              <MainCard
                variant="3/3"
                onChangeShirt={() => setWardrobeOpen(true)}
              />
            </section>
          </>
        ) : (
          <>
            <MissionProgress
              variant={xpToProgressVariant(totalXp)}
              onClick={() => setLevelsOpen(true)}
            />
            <Missions chipLabel={`${countdownDaysLeft} DAYS LEFT`} />

            <div className="club-home__missions-row">
              <Path dots={pathDots} />
              <div className="club-home__mission-cards">
                {orderedMissions.map(({ no, mission }) => (
                  <MissionCard
                    key={no}
                    {...missionCardProps(
                      mission,
                      no,
                      now,
                      claimHandlerByNo[no],
                      no === 2 ? () => setHintOpen(true) : undefined,
                    )}
                  />
                ))}
              </div>
            </div>

            <section className="club-home__collection">
              <h2 className="club-home__collection-title">
                Jay Jay&rsquo;s collection
              </h2>
              <MainCard
                variant={collectedToMainVariant(collectedCount)}
                onChangeShirt={() => setWardrobeOpen(true)}
              />
            </section>
          </>
        )}
      </div>

      <WardrobeModal
        open={wardrobeOpen}
        onClose={() => setWardrobeOpen(false)}
        slots={wardrobe.slots}
        wearing={wardrobe.wearing}
        onWear={(id: ShirtId) => dispatch({ type: 'wear_shirt', id })}
      />

      <LevelsModal open={levelsOpen} onClose={() => setLevelsOpen(false)} />

      <HintModal open={hintOpen} onClose={() => setHintOpen(false)} />

      <JayJayDanceOverlay open={danceOpen} onClose={() => setDanceOpen(false)} />

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

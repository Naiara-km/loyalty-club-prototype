/**
 * Club state model. Missions, wardrobe, and derived selectors that the UI
 * reads. This module is state-only — no React, no actions yet (added in the
 * next task alongside the reducer).
 */

export type MissionState = 'locked' | 'unlocking' | 'active' | 'condition_met' | 'completed'

export type Mission = {
  state: MissionState
  xpReward: number
  unlockedAt: number | null
  completedAt: number | null
}

export type ShirtId = 0 | 1 | 2 | 3
export type ShirtColour = 'White' | 'Green' | 'Red' | 'Blue'

export type ShirtSlot = {
  id: ShirtId
  colour: ShirtColour
  won: boolean
}

export type ClubState = {
  missions: {
    m1: Mission
    m2: Mission
    m3: Mission
  }
  wardrobe: {
    slots: [ShirtSlot, ShirtSlot, ShirtSlot, ShirtSlot]
    wearing: ShirtId
  }
  countdownDaysLeft: number
}

export const MAX_XP = 500

/** Initial state per the flow plan:
 *  - M1 is Active by default (user only has to tap CLAIM SHIRT NOW)
 *  - M2 and M3 are Locked
 *  - Wardrobe holds the default White shirt (Shirt 0), 3 mission slots empty
 *  - User is wearing the default white shirt
 *  - 14 days remain on the campaign countdown
 */
export const initialClubState: ClubState = {
  missions: {
    m1: { state: 'active', xpReward: 100, unlockedAt: null, completedAt: null },
    m2: { state: 'locked', xpReward: 100, unlockedAt: null, completedAt: null },
    m3: { state: 'locked', xpReward: 300, unlockedAt: null, completedAt: null },
  },
  wardrobe: {
    slots: [
      { id: 0, colour: 'White', won: true  },
      { id: 1, colour: 'Green', won: false },
      { id: 2, colour: 'Red',   won: false },
      { id: 3, colour: 'Blue',  won: false },
    ],
    wearing: 0,
  },
  countdownDaysLeft: 14,
}

/** Selectors — derived values the UI reads. Not memoised; state is small. */

export function selectTotalXp(state: ClubState): number {
  return Object.values(state.missions)
    .filter(m => m.state === 'completed')
    .reduce((sum, m) => sum + m.xpReward, 0)
}

/** True when any mission is waiting for the user to tap CLAIM SHIRT NOW.
 *  Sequential missions mean at most one is ever pending at a time. */
export function selectHasPendingClaim(state: ClubState): boolean {
  return (
    state.missions.m1.state === 'active' ||
    state.missions.m2.state === 'condition_met' ||
    state.missions.m3.state === 'condition_met'
  )
}

/** Count of shirts collected from missions (0-3). Excludes the default White. */
export function selectCollectedCount(state: ClubState): number {
  return state.wardrobe.slots.filter(s => s.id !== 0 && s.won).length
}

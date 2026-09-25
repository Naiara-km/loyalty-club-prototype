/**
 * Club state reducer. All state transitions live here. Events are
 * dispatched from mission-card CTAs, dev-panel controls, or the change-
 * shirt modal (once built).
 */

import {
  initialClubState,
  MAX_XP,
  type ClubState,
  type ShirtId,
  type ShirtSlot,
} from './clubState'

export type Stage =
  | 'start'
  | 'm1_claimed'
  | 'm2_active'
  | 'm2_condition_met'
  | 'm3_active'
  | 'm3_condition_met'
  | 'all_done'

export type ClubEvent =
  | { type: 'reset' }
  | { type: 'jump_to_stage'; stage: Stage }
  | { type: 'claim_shirt_1' }
  | { type: 'claim_shirt_2' }
  | { type: 'claim_shirt_3' }
  | { type: 'twelve_hours_elapsed' }
  | { type: 'find_jay_jay' }
  | { type: 'place_bet' }
  | { type: 'wear_shirt'; id: ShirtId }
  | { type: 'set_days_left'; days: number }

const HOUR = 60 * 60 * 1000

type Slots = ClubState['wardrobe']['slots']

function withSlotWon(slots: Slots, id: ShirtId): Slots {
  return slots.map((s: ShirtSlot) => (s.id === id ? { ...s, won: true } : s)) as Slots
}

/** Handles every event except `jump_to_stage` and `reset` (which the top
 *  reducer resolves). Guards silently no-op when preconditions fail. */
function applyEvent(state: ClubState, event: ClubEvent): ClubState {
  switch (event.type) {
    case 'claim_shirt_1': {
      if (state.missions.m1.state !== 'active') return state
      const now = Date.now()
      return {
        ...state,
        missions: {
          ...state.missions,
          m1: { ...state.missions.m1, state: 'completed', completedAt: now },
          m2: { ...state.missions.m2, state: 'unlocking', unlockedAt: now + 12 * HOUR },
        },
        wardrobe: {
          ...state.wardrobe,
          slots: withSlotWon(state.wardrobe.slots, 1),
        },
      }
    }
    case 'twelve_hours_elapsed': {
      if (state.missions.m2.state !== 'unlocking') return state
      return {
        ...state,
        missions: {
          ...state.missions,
          m2: { ...state.missions.m2, state: 'active' },
        },
      }
    }
    case 'find_jay_jay': {
      if (state.missions.m2.state !== 'active') return state
      return {
        ...state,
        missions: {
          ...state.missions,
          m2: { ...state.missions.m2, state: 'condition_met' },
        },
      }
    }
    case 'claim_shirt_2': {
      if (state.missions.m2.state !== 'condition_met') return state
      const now = Date.now()
      return {
        ...state,
        missions: {
          ...state.missions,
          m2: { ...state.missions.m2, state: 'completed', completedAt: now },
          m3: { ...state.missions.m3, state: 'active', unlockedAt: now },
        },
        wardrobe: {
          ...state.wardrobe,
          slots: withSlotWon(state.wardrobe.slots, 2),
        },
      }
    }
    case 'place_bet': {
      if (state.missions.m3.state !== 'active') return state
      return {
        ...state,
        missions: {
          ...state.missions,
          m3: { ...state.missions.m3, state: 'condition_met' },
        },
      }
    }
    case 'claim_shirt_3': {
      if (state.missions.m3.state !== 'condition_met') return state
      return {
        ...state,
        missions: {
          ...state.missions,
          m3: { ...state.missions.m3, state: 'completed', completedAt: Date.now() },
        },
        wardrobe: {
          ...state.wardrobe,
          slots: withSlotWon(state.wardrobe.slots, 3),
        },
      }
    }
    case 'wear_shirt': {
      const slot = state.wardrobe.slots[event.id]
      if (!slot?.won) return state
      return {
        ...state,
        wardrobe: { ...state.wardrobe, wearing: event.id },
      }
    }
    case 'set_days_left': {
      return { ...state, countdownDaysLeft: event.days }
    }
    default:
      return state
  }
}

/** Sequence of events to reach each stage from the initial state. */
const stageEvents: Record<Stage, ClubEvent[]> = {
  start: [],
  m1_claimed: [{ type: 'claim_shirt_1' }],
  m2_active: [{ type: 'claim_shirt_1' }, { type: 'twelve_hours_elapsed' }],
  m2_condition_met: [
    { type: 'claim_shirt_1' },
    { type: 'twelve_hours_elapsed' },
    { type: 'find_jay_jay' },
  ],
  m3_active: [
    { type: 'claim_shirt_1' },
    { type: 'twelve_hours_elapsed' },
    { type: 'find_jay_jay' },
    { type: 'claim_shirt_2' },
  ],
  m3_condition_met: [
    { type: 'claim_shirt_1' },
    { type: 'twelve_hours_elapsed' },
    { type: 'find_jay_jay' },
    { type: 'claim_shirt_2' },
    { type: 'place_bet' },
  ],
  all_done: [
    { type: 'claim_shirt_1' },
    { type: 'twelve_hours_elapsed' },
    { type: 'find_jay_jay' },
    { type: 'claim_shirt_2' },
    { type: 'place_bet' },
    { type: 'claim_shirt_3' },
  ],
}

function computeStage(stage: Stage): ClubState {
  return stageEvents[stage].reduce(
    (acc, ev) => applyEvent(acc, ev),
    initialClubState,
  )
}

export function clubReducer(state: ClubState, event: ClubEvent): ClubState {
  if (event.type === 'reset') return initialClubState
  if (event.type === 'jump_to_stage') return computeStage(event.stage)
  return applyEvent(state, event)
}

/** Human-readable stage labels for the dev panel dropdown. */
export const stageLabels: Array<{ id: Stage; label: string }> = [
  { id: 'start', label: '1 · Start' },
  { id: 'm1_claimed', label: '2 · M1 claimed (M2 unlocking)' },
  { id: 'm2_active', label: '3 · M2 active (12h skipped)' },
  { id: 'm2_condition_met', label: '4 · M2 condition met (found)' },
  { id: 'm3_active', label: '5 · M3 active (M2 claimed)' },
  { id: 'm3_condition_met', label: '6 · M3 condition met (bet placed)' },
  { id: 'all_done', label: `7 · All done (${MAX_XP}/${MAX_XP} XP)` },
]

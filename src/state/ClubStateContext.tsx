import { createContext, useContext, useReducer, type ReactNode } from 'react'
import { clubReducer, type ClubEvent } from './clubReducer'
import {
  initialClubState,
  selectCollectedCount,
  selectHasPendingClaim,
  selectTotalXp,
  type ClubState,
} from './clubState'

type ClubStateContextValue = {
  state: ClubState
  totalXp: number
  hasPendingClaim: boolean
  collectedCount: number
  dispatch: (event: ClubEvent) => void
}

const ClubStateContext = createContext<ClubStateContextValue | null>(null)

export function ClubStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(clubReducer, initialClubState)
  return (
    <ClubStateContext.Provider
      value={{
        state,
        totalXp: selectTotalXp(state),
        hasPendingClaim: selectHasPendingClaim(state),
        collectedCount: selectCollectedCount(state),
        dispatch,
      }}
    >
      {children}
    </ClubStateContext.Provider>
  )
}

export function useClubState(): ClubStateContextValue {
  const ctx = useContext(ClubStateContext)
  if (!ctx) throw new Error('useClubState must be used inside a ClubStateProvider')
  return ctx
}

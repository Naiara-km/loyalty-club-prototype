import { createContext, useContext, useState, type ReactNode } from 'react'
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
  setState: (updater: (s: ClubState) => ClubState) => void
}

const ClubStateContext = createContext<ClubStateContextValue | null>(null)

export function ClubStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ClubState>(initialClubState)
  return (
    <ClubStateContext.Provider
      value={{
        state,
        totalXp: selectTotalXp(state),
        hasPendingClaim: selectHasPendingClaim(state),
        collectedCount: selectCollectedCount(state),
        setState: (updater) => setState(updater),
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

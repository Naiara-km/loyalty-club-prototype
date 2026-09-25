import { useState } from 'react'
import { DevPanel } from './components/DevPanel/DevPanel'
import { ClubHome } from './screens/ClubHome'
import { MyAccount } from './screens/MyAccount'
import { ClubStateProvider } from './state/ClubStateContext'

type Screen = 'my-account' | 'club-home'

export default function App() {
  const [screen, setScreen] = useState<Screen>('my-account')
  return (
    <ClubStateProvider>
      {screen === 'my-account' && (
        <MyAccount onOpenClub={() => setScreen('club-home')} />
      )}
      {screen === 'club-home' && (
        <ClubHome onBack={() => setScreen('my-account')} />
      )}
      <DevPanel />
    </ClubStateProvider>
  )
}

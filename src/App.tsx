import { useState } from 'react'
import { DevPanel } from './components/DevPanel/DevPanel'
import { ClubHome } from './screens/ClubHome'
import { MyAccount } from './screens/MyAccount'
import { Virtuals } from './screens/Virtuals'
import { ClubStateProvider } from './state/ClubStateContext'

type Screen = 'my-account' | 'club-home' | 'virtuals'

export default function App() {
  const [screen, setScreen] = useState<Screen>('my-account')
  return (
    <ClubStateProvider>
      {screen === 'my-account' && (
        <MyAccount
          onOpenClub={() => setScreen('club-home')}
          onLeave={() => setScreen('virtuals')}
        />
      )}
      {screen === 'club-home' && (
        <ClubHome onBack={() => setScreen('my-account')} />
      )}
      {screen === 'virtuals' && (
        <Virtuals
          onBack={() => setScreen('my-account')}
          onGoToClub={() => setScreen('club-home')}
        />
      )}
      <DevPanel />
    </ClubStateProvider>
  )
}

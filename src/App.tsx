import { useState } from 'react'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import type { LoginResponse } from './services/apiService'

function App() {
  const [user, setUser] = useState<LoginResponse | null>(null)

  if (!user) {
    return <LoginPage onLogin={setUser} />
  }

  return <HomePage userName={user.name} onLogout={() => setUser(null)} />
}

export default App

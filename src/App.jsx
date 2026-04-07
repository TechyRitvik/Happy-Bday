import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import DinoGame from './pages/DinoGame'
import MusicPage from './pages/MusicPage'
import MemoryPage from './pages/MemoryPage'
import BirthdayPage from './pages/BirthdayPage'

function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', margin: 0, padding: 0 }}>
      <Navigation />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Routes>
          <Route path="/" element={<BirthdayPage />} />
          <Route path="/game" element={<DinoGame />} />
          <Route path="/music" element={<MusicPage />} />
          <Route path="/memories" element={<MemoryPage />} />
        </Routes>
      </div>
      <Footer style={{ flexShrink: 0 }} />
    </div>
  )
}

export default App
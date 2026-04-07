import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import DinoGame from './pages/DinoGame'
import MusicPage from './pages/MusicPage'
import MemoryPage from './pages/MemoryPage'
import BirthdayPage from './pages/BirthdayPage'

function App() {
  const location = useLocation()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', margin: 0, padding: 0 }}>
      <Navigation />
      <main style={{ flex: '1 1 auto', position: 'relative', margin: 0, padding: 0 }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<BirthdayPage />} />
            <Route path="/game" element={<DinoGame />} />
            <Route path="/music" element={<MusicPage />} />
            <Route path="/memories" element={<MemoryPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

export default App

import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import FloatingParticles from '../components/FloatingParticles'

const staticParagraph = `There are these moments that stay with you — not because they were grand or perfect, but because they meant something. You and I had one of those. We were young, we were figuring things out, and maybe we didn't get the timing right the first time. But somewhere between all the laughter and late-night conversations, something stuck. Not as a wound, but as a warmth I carried quietly. When we stopped talking, the silence wasn't empty — it was full of echoes. And when we started talking again, it felt like finding a song you forgot you loved. I'm not asking for a fairytale. I'm just saying — maybe this time, we can be what we were always meant to be. No rush, no pressure. Just us, again. It's great to have you back. Happy Birthday 🎂`

const memoryImages = [
  '/assets/memory1.jpg',
  '/assets/memory2.jpg',
  '/assets/memory3.jpg',
  '/assets/memory4.jpg',
  '/assets/memory5.jpg',
  '/assets/memory6.jpg',
  '/assets/memory7.jpg',
  '/assets/memory8.jpg',
  '/assets/memory9.jpg',
  '/assets/memory10.jpg',
  '/assets/memory11.jpg',
  '/assets/memory12.jpg',
  '/assets/memory13.jpg',
  '/assets/memory14.jpg',
]

export default function MemoryPage() {
  const audioRef = useRef(null)
  const [currentIdx, setCurrentIdx] = useState(0)

  useEffect(() => {
    const audio = new Audio('/assets/song.mp3')
    audio.loop = true
    audio.volume = 0.7
    audioRef.current = audio
    
    audio.play().catch(() => {
      console.log('Autoplay blocked')
    })
    
    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % memoryImages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      minHeight: 'calc(100vh - 120px)',
      background: 'linear-gradient(180deg, #1f1c2c 0%, #928dab 100%)',
      fontFamily: 'Nunito Sans, system-ui, Segoe UI, Arial',
      color: 'white',
      position: 'relative',
      paddingBottom: '20px'
    }}>
      {/* Background Image with Blur */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(/assets/memory-bg.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(8px)',
        opacity: 0.4,
        zIndex: 0
      }} />
      
      <FloatingParticles />
      
      {/* Photo-themed decorations */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          fontSize: '40px',
          opacity: 0.6,
          zIndex: 2
        }}
      >
        📸
      </motion.div>
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '8%',
          fontSize: '50px',
          opacity: 0.5,
          zIndex: 2
        }}
      >
        💕
      </motion.div>

      <main style={{ maxWidth: '1200px', margin: '28px auto', padding: '0 18px', position: 'relative', zIndex: 1 }}>
        <motion.section 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="romantic-card"
          style={{
            padding: '32px',
            marginBottom: '18px',
            display: 'flex',
            gap: '40px',
            alignItems: 'stretch',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ flex: '1 1 500px', minWidth: '300px' }}>
            <div style={{
              background: '#2b2228',
              borderRadius: '16px',
              padding: '16px',
              boxShadow: '8px 8px 16px rgba(219, 39, 119, 0.15), -4px -4px 12px rgba(255, 255, 255, 0.9)',
              height: '100%'
            }}>
              <div style={{
                position: 'relative',
                height: '500px',
                overflow: 'hidden',
                borderRadius: '12px',
                background: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentIdx}
                    src={memoryImages[currentIdx]}
                    alt={`Memory ${currentIdx + 1}`}
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                  />
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div style={{ flex: '1 1 400px', minWidth: '300px' }}>
            <div className="romantic-card" style={{ padding: '28px', height: '100%' }}>
              <h3 style={{ color: 'var(--pink-primary)', marginTop: 0, fontSize: '24px', fontFamily: 'Montserrat, sans-serif', marginBottom: '16px' }}>For Mahak</h3>
              <p style={{
                fontSize: '15px',
                color: 'var(--text-dark)',
                lineHeight: '1.8',
                margin: 0,
                whiteSpace: 'pre-wrap'
              }}>
                {staticParagraph}
              </p>
              <button className="romantic-btn" style={{ marginTop: '20px', width: '100%' }}>
                My wishes for you
              </button>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  )
}
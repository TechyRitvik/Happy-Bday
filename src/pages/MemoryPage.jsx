import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import FloatingParticles from '../components/FloatingParticles'

const assetBase = import.meta.env.BASE_URL

const staticParagraph = `There are these moments that stay with you not because they were grand or perfect, but because they meant something. You and I had one of those. We were young, we were figuring things out, and maybe we didn't get the timing right the first time. But somewhere between all the laughter and late-night conversations, something stuck. Not as a wound, but as a warmth I carried quietly. When we stopped talking, the silence wasn't empty it was full of echoes. And when we started talking again, it felt like finding a song you forgot you loved. I'm not asking for a fairytale. I'm just saying... maybe this time, we can be what we were always meant to be. No rush, no pressure. Just us, again. It's great to have you back. Happy Birthday Mahak🎂 

-Ritvik <3`

const allImages = [
  `${assetBase}assets/photos/WhatsApp Image 2026-04-07 at 6.21.35 PM.jpeg`,
  `${assetBase}assets/photos/WhatsApp Image 2026-04-07 at 6.21.36 PM.jpeg`,
  `${assetBase}assets/photos/WhatsApp Image 2026-04-07 at 6.21.42 PM.jpeg`,
  `${assetBase}assets/photos/WhatsApp Image 2026-04-07 at 8.07 PM.jpeg`,
  `${assetBase}assets/photos/WhatsApp Image 2026-04-07 at 8.07.41 PM.jpeg`,
  `${assetBase}assets/photos/WhatsApp Image 2026-04-07 at 8.07.43 PM.jpeg`,
  `${assetBase}assets/photos/WhatsApp Image 2026-04-07 at 8.07.44 PM.jpeg`,
  `${assetBase}assets/photos/WhatsApp Image 2026-04-07 at 8.07.52 PM.jpeg`,
  `${assetBase}assets/photos/WhatsApp Image 2026-04-07 at 8.07.55 PM.jpeg`,
  `${assetBase}assets/photos/WhatsApp Image 2026-04-07 at 8.07.59 PM.jpeg`,
  `${assetBase}assets/photos/WhatsApp Image 2026-04-07 at 8.08.01 PM.jpeg`,
  `${assetBase}assets/photos/WhatsApp Image 2026-04-07 at 8.08.02 PM.jpeg`,
  `${assetBase}assets/photos/WhatsApp I02 PM.jpeg`,
  `${assetBase}assets/photos/WhatsApp Imag PM.jpeg`,
  // New photos added
  `${assetBase}assets/photos/kasjdhfg;dskjglohsag;oi.jpeg`,
  `${assetBase}assets/photos/W2026-04-07 at 8.07.59 PM.jpeg`,
  `${assetBase}assets/photos/Wha.jpeg`,
  `${assetBase}assets/photos/Wha04-07 at 8.07.55 PM.jpeg`,
  `${assetBase}assets/photos/What26-04-07 at 8.07.53 PM.jpeg`,
  `${assetBase}assets/photos/WhatsApp I07.59 PM.jpeg`,
  `${assetBase}assets/photos/WhatsApp Image 2026-04-07 7 PM.jpeg`,
  `${assetBase}assets/photos/WhatsApp Image 2026-04-07 at 8.07.PM.jpeg`,
  `${assetBase}assets/photos/WhatsApp Image 2026-PM.jpeg`,
  `${assetBase}assets/photos/WhatsApp mage 2026-04-07 at 8.07.48 PM.jpeg`,
]

function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function MemoryPage() {
  const audioRef = useRef(null)
  const [memoryImages] = useState(() => shuffleArray(allImages))
  const [currentIdx, setCurrentIdx] = useState(0)

  useEffect(() => {
    const audio = new Audio(`${assetBase}assets/song.mp3`)
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
      minHeight: '86vh',
      background: 'linear-gradient(180deg, #1f1c2c 0%, #928dab 100%)',
      fontFamily: 'Nunito Sans, system-ui, Segoe UI, Arial',
      color: 'white',
      position: 'relative',
      margin: 0,
      padding: 0
    }}>
      {/* Background Image with Blur */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${assetBase}assets/memory-bg.jpeg)`, 
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

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 18px', position: 'relative', zIndex: 1 }}>
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
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  )
}
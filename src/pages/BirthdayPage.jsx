import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAudio } from '../context/AudioContext'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import FloatingParticles from '../components/FloatingParticles'


export default function BirthdayPage() {
  const { playTrack, stopTrack } = useAudio()
  const [cakeCut, setCakeCut] = useState(false)
  const [showSticker, setShowSticker] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [currentModalSlide, setCurrentModalSlide] = useState(0)

  useEffect(() => {
    stopTrack()
  }, [])

  const handleCakeClick = () => {
    if (!cakeCut) {
      setCakeCut(true)
      setShowSticker(true)
      
      playTrack('/assets/birthday.mp3', 'Happy Birthday')
      
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff4d94', '#c4b4f8', '#f8d4c4', '#ff69b4', '#ffd700']
      })

      setTimeout(() => {
        setShowSticker(false)
        setShowModal(true)
      }, 20000)
    }
  }

  const handleStickerClick = () => {
    setShowSticker(false)
    setShowModal(true)
  }

  useEffect(() => {
    if (showModal) {
      const interval = setInterval(() => {
        setCurrentModalSlide((prev) => (prev + 1) % modalSlides.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [showModal])

  const handleModalClose = () => {
    setShowModal(false)
  }

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)',
      fontFamily: 'Nunito Sans, system-ui, Segoe UI, Arial',
      color: 'var(--text-dark)',
      position: 'relative',
      margin: 0,
      padding: 0
    }}>
      <FloatingParticles />
      
      {/* Decorative circles */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(219, 39, 119, 0.1) 0%, transparent 70%)',
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(244, 114, 182, 0.15) 0%, transparent 70%)',
        }}
      />

      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{ textAlign: 'center', position: 'relative', zIndex: 1, paddingTop: '20px' }}
      >
        <h1 style={{ 
          fontSize: '56px', 
          color: 'var(--pink-primary)',
          margin: 0,
          fontFamily: 'Montserrat, sans-serif',
          textShadow: '0 4px 12px rgba(219, 39, 119, 0.3)'
        }}>Make a wish!</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px', fontWeight: 600 }}>Click the cake to cut it</p>
      </motion.div>

      <motion.div 
        onClick={handleCakeClick}
        style={{ 
          cursor: cakeCut ? 'default' : 'pointer',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}
        whileHover={cakeCut ? {} : { scale: 1.05 }}
        whileTap={cakeCut ? {} : { scale: 0.95 }}
      >
        {!cakeCut ? (
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div style={{ fontSize: '160px', filter: 'drop-shadow(8px 8px 16px rgba(219, 39, 119, 0.3))' }}>🎂</div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            <div style={{ fontSize: '160px', filter: 'drop-shadow(8px 8px 16px rgba(219, 39, 119, 0.3))' }}>🍰</div>
          </motion.div>
        )}
      </motion.div>

      {cakeCut && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            position: 'relative',
            zIndex: 1,
            marginTop: '20px',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <video
            autoPlay
            playsInline
            style={{
              maxWidth: '500px',
              width: '90%',
              boxShadow: '0 8px 32px rgba(219, 39, 119, 0.3)'
            }}
          >
            <source src="/assets/bday.mp4" type="video/mp4" />
          </video>
        </motion.div>
      )}

      {cakeCut && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          style={{ textAlign: 'center', marginTop: '30px', position: 'relative', zIndex: 1 }}
        >
          <Link to="/game" className="romantic-btn" style={{ display: 'inline-block', textDecoration: 'none' }}>
            Next →
          </Link>
        </motion.div>
      )}

      <AnimatePresence>
        {showSticker && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.5 }}
            style={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 50,
              pointerEvents: 'none'
            }}
            onClick={handleStickerClick}
          >
            <motion.div 
              style={{ 
                fontSize: '80px', 
                fontWeight: 'bold', 
                color: 'var(--pink-primary)',
                fontFamily: 'Montserrat, sans-serif',
                textShadow: '0 8px 24px rgba(219, 39, 119, 0.5)',
                pointerEvents: 'auto',
                cursor: 'pointer'
              }}
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ repeat: Infinity, duration: 0.5 }}
            >
              Happy Birthday 🎉
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(131, 24, 67, 0.7)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 50,
              padding: '20px'
            }}
            onClick={handleModalClose}
          >
            <motion.div
              initial={{ scale: 0.8, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.8, rotate: 5 }}
              className="romantic-card"
              style={{
                padding: '40px',
                maxWidth: '500px',
                width: '100%'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ textAlign: 'center' }}>
                <motion.img
                  key={currentModalSlide}
                  src={`https://picsum.photos/seed/bday${currentModalSlide + 1}/300/300`}
                  alt={`Slide ${currentModalSlide + 1}`}
                  style={{
                    width: '220px',
                    height: '220px',
                    objectFit: 'cover',
                    borderRadius: '16px',
                    marginBottom: '24px',
                    border: '2px solid var(--pink-border)',
                    boxShadow: '8px 8px 16px rgba(219, 39, 119, 0.2)'
                  }}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.p
                  key={`text-${currentModalSlide}`}
                  style={{
                    fontSize: '18px',
                    color: 'var(--text-muted)',
                    lineHeight: '1.6',
                    margin: 0,
                    fontWeight: 500
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {modalSlides[currentModalSlide].text}
                </motion.p>
                
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '24px' }}>
                  {modalSlides.map((_, index) => (
                    <div
                      key={index}
                      style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: index === currentModalSlide 
                          ? 'linear-gradient(145deg, var(--pink-primary), #BE185D)' 
                          : 'rgba(219, 39, 119, 0.2)',
                        transition: 'all 0.3s ease-out',
                        boxShadow: index === currentModalSlide 
                          ? '0 2px 8px rgba(219, 39, 119, 0.4)' 
                          : 'none'
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
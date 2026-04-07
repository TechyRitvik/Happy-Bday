import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import FloatingParticles from '../components/FloatingParticles'
import MusicPlayerCard from '../components/MusicPlayerCard'

export default function MusicPage() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = new Audio('/assets/song.mp3')
    audio.loop = true
    audio.volume = 0.7
    audioRef.current = audio
    
    const updateProgress = () => {
      setProgress(audio.currentTime)
      setDuration(audio.duration || 0)
    }
    
    audio.addEventListener('timeupdate', updateProgress)
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration)
    })
    
    const interval = setInterval(updateProgress, 100)
    
    // Try autoplay
    audio.play()
      .then(() => {
        setIsPlaying(true)
      })
      .catch(() => {
        console.log('Autoplay blocked - will play on click')
      })
    
    return () => {
      clearInterval(interval)
      audio.pause()
      audio.src = ''
    }
  }, [])

  const togglePlay = () => {
    if (!audioRef.current) return
    
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(console.error)
    }
  }

  const handleSeek = (newTime) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
      setProgress(newTime)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      fontFamily: 'Nunito Sans, system-ui, Segoe UI, Arial',
      color: 'white',
      position: 'relative',
      margin: 0,
      padding: 0
    }}>
      <FloatingParticles />
      
      {/* Animated background orbs */}
      <motion.div
        animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        style={{
          position: 'absolute',
          top: '10%', left: '5%',
          width: '300px', height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <motion.div
        animate={{ x: [0, -80, 0], y: [0, 80, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
        style={{
          position: 'absolute',
          bottom: '20%', right: '10%',
          width: '400px', height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div style={{ 
        maxWidth: '980px', 
        margin: '0 auto', 
        padding: '60px 18px', 
        textAlign: 'center', 
        position: 'relative', 
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h2 style={{ 
            color: '#fce7f3', 
            marginTop: 0, 
            fontFamily: 'Montserrat, sans-serif', 
            fontSize: '36px',
            fontWeight: 700,
            textShadow: '0 2px 10px rgba(236, 72, 153, 0.5)'
          }}>
            A special song for you
          </h2>
        </motion.div>

        {/* Custom Player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full max-w-md mx-auto"
          style={{ position: 'relative', zIndex: 10 }}
        >
          <div className="relative" style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '32px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            padding: '32px'
          }}>
            {/* Album Art */}
            <motion.div 
              className="relative flex justify-center"
              animate={{ 
                boxShadow: isPlaying 
                  ? '0 0 50px rgba(236, 72, 153, 0.6), 0 0 100px rgba(168, 85, 247, 0.4)' 
                  : '0 0 30px rgba(236, 72, 153, 0.3)' 
              }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            >
              <div className="w-64 h-64 rounded-2xl overflow-hidden border-2 border-white/10" style={{
                background: 'rgba(0, 0, 0, 0.3)'
              }}>
                <img 
                  src="/assets/music-cover.jpeg" 
                  alt="Album Cover"
                  className="w-full h-full"
                  style={{ objectFit: 'contain', background: '#1a1a2e' }}
                />
              </div>
            </motion.div>

            {/* Song Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mt-8"
            >
              <h2 className="text-3xl font-bold text-white mb-2 font-montserrat tracking-wide">Sahiba</h2>
              <p className="text-purple-300 text-lg font-medium">Aditya Rikhari</p>
            </motion.div>

            {/* Progress Bar */}
            <div className="mt-8 space-y-3">
              <div 
                className="relative h-2 bg-white/10 rounded-full cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const percent = (e.clientX - rect.left) / rect.width
                  handleSeek(percent * duration)
                }}
              >
                <div 
                  className="absolute h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                  style={{ width: `${duration > 0 ? (progress / duration) * 100 : 0}%` }}
                />
              </div>
              <div className="flex justify-between text-white/60 text-sm font-medium">
                <span>{Math.floor(progress / 60)}:{String(Math.floor(progress % 60)).padStart(2, '0')}</span>
                <span>{Math.floor(duration / 60)}:{String(Math.floor(duration % 60)).padStart(2, '0')}</span>
              </div>
            </div>

            {/* Play Button */}
            <motion.div className="flex justify-center mt-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={togglePlay}
                className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl shadow-lg hover:shadow-pink-500/40 transition-all"
              >
                {isPlaying ? '⏸' : '▶'}
              </motion.button>
            </motion.div>

            {/* Visualizer */}
            <div className="flex items-center justify-center gap-1 mt-8 h-8">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-gradient-to-t from-pink-500 to-purple-400 rounded-full"
                  animate={{
                    height: isPlaying ? [8, Math.random() * 32 + 8, 8] : 8
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.05,
                    repeatType: 'reverse'
                  }}
                  style={{ opacity: isPlaying ? 0.8 : 0.3 }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{ marginTop: '40px' }}
        >
          <Link to="/memories" className="romantic-btn" style={{
            display: 'inline-block',
            textDecoration: 'none'
          }}>Next →</Link>
        </motion.div>
      </div>
    </div>
  )
}
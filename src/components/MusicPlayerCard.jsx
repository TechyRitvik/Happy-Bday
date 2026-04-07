import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAudio } from '../context/AudioContext'

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

function ProgressBar({ currentTime, duration, onSeek }) {
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0
  const barRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  
  const handleDrag = (e) => {
    if (!barRef.current || duration <= 0) return
    
    const rect = barRef.current.getBoundingClientRect()
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX
    const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    const newTime = percent * duration
    onSeek(newTime)
  }

  const handleMouseDown = (e) => {
    setIsDragging(true)
    handleDrag(e)
  }

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleDrag(e)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  return (
    <div 
      ref={barRef}
      className="relative h-3 bg-white/20 rounded-full cursor-pointer group"
      onMouseDown={handleMouseDown}
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const percent = (e.clientX - rect.left) / rect.width
        onSeek(Math.max(0, Math.min(duration, percent * duration)))
      }}
      style={{ touchAction: 'none' }}
    >
      <div 
        className="absolute h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
        style={{ width: `${progress}%` }}
      />
      <div 
        className="absolute w-5 h-5 bg-white rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 top-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ left: `${progress}%` }}
      />
    </div>
  )
}

export default function MusicPlayerCard() {
  const { isPlaying, currentTrack, togglePlayPause, audioRef, progress, duration, seek } = useAudio()
  
  const handleSeek = (newTime) => {
    if (audioRef?.current && duration > 0) {
      const clampedTime = Math.max(0, Math.min(duration, newTime))
      audioRef.current.currentTime = clampedTime
      seek(clampedTime)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="w-full max-w-sm mx-auto"
    >
      <div className="relative">
        {/* Album Art with Glow */}
        <motion.div 
          className="relative flex justify-center"
          animate={{ 
            boxShadow: isPlaying 
              ? '0 0 40px rgba(236, 72, 153, 0.5), 0 0 80px rgba(168, 85, 247, 0.3)' 
              : '0 0 20px rgba(236, 72, 153, 0.2)' 
          }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
        >
          <div className="w-64 h-64 rounded-3xl overflow-hidden border-4 border-white/20">
            <img 
              src="https://picsum.photos/seed/sahiba/400/400" 
              alt="Album Cover"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Vinyl spin effect when playing */}
          {isPlaying && (
            <motion.div
              className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              style={{
                background: 'radial-gradient(circle at 30% 30%, #666, #333 50%, #222)',
                boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)'
              }}
            >
              <div className="absolute inset-3 rounded-full bg-gray-900" />
            </motion.div>
          )}
        </motion.div>

        {/* Song Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8"
        >
          <h2 className="text-3xl font-bold text-white mb-2 font-montserrat tracking-wide">
            {currentTrack || 'Sahiba'}
          </h2>
          <p className="text-purple-300 text-lg font-medium">Aditya Rikhari</p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mt-8 space-y-3">
          <ProgressBar 
            currentTime={progress || 0} 
            duration={duration || 0} 
            onSeek={handleSeek}
          />
          <div className="flex justify-between text-white/70 text-sm font-medium">
            <span>{formatTime(progress || 0)}</span>
            <span>{formatTime(duration || 0)}</span>
          </div>
        </div>

        {/* Play/Pause Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlayPause}
            className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl shadow-lg hover:shadow-pink-500/40 transition-all"
          >
            {isPlaying ? '⏸' : '▶'}
          </motion.button>
        </motion.div>

        {/* Visualizer Bars */}
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
  )
}
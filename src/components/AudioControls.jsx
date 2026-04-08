import { useAudio } from '../context/AudioContext'

export default function AudioControls() {
  const { isPlaying, currentTrack, togglePlayPause } = useAudio()

  if (!currentTrack) return null

  return (
    <motion.div 
      className="audio-controls"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button onClick={togglePlayPause}>
        {isPlaying ? '⏸' : '▶'}
      </button>
      <span>{currentTrack}</span>
    </motion.div>
  )
}

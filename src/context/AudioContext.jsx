import { useState, useEffect, useRef } from 'react'
import { createContext, useContext } from 'react'

const AudioContext = createContext()

export function AudioProvider({ children }) {
  const [state, setState] = useState({
    isPlaying: false,
    currentTrack: null,
    progress: 0,
    duration: 0,
  })
  
  const audioRef = useRef(null)

  useEffect(() => {
    audioRef.current = new Audio()
    audioRef.current.volume = 0.7
    
    const audio = audioRef.current
    
    const updateTime = () => {
      setState(prev => ({
        ...prev,
        progress: audio.currentTime || 0,
        duration: audio.duration || 0
      }))
    }
    
    const onPlay = () => setState(prev => ({ ...prev, isPlaying: true }))
    const onPause = () => setState(prev => ({ ...prev, isPlaying: false }))
    const onLoaded = () => setState(prev => ({ ...prev, duration: audio.duration }))
    
    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('loadedmetadata', onLoaded)
    
    const interval = setInterval(updateTime, 100)
    
    return () => {
      clearInterval(interval)
      audio.pause()
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('loadedmetadata', onLoaded)
    }
  }, [])

  const playTrack = (url, name) => {
    const audio = audioRef.current
    if (!audio) return
    
    audio.src = url
    audio.loop = true
    setState(prev => ({ ...prev, currentTrack: name }))
    
    audio.play().catch(err => console.error('Play failed:', err))
  }

  const stopTrack = () => {
    const audio = audioRef.current
    if (audio) {
      audio.pause()
      audio.currentTime = 0
      setState(prev => ({ ...prev, isPlaying: false, progress: 0 }))
    }
  }

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (!audio || !audio.src) return
    
    if (audio.paused) {
      audio.play().catch(console.error)
    } else {
      audio.pause()
    }
  }

  const seek = (time) => {
    const audio = audioRef.current
    if (audio && audio.src) {
      audio.currentTime = time
      setState(prev => ({ ...prev, progress: time }))
    }
  }

  const value = {
    ...state,
    audioRef,
    playTrack,
    stopTrack,
    togglePlayPause,
    seek,
  }

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider')
  }
  return context
}
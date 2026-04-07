import { useMemo } from 'react'
import { motion } from 'framer-motion'

const particles = ['💖', '✨', '💕', '🌸', '💗', '⭐', '🦋', '😍']

export default function FloatingParticles() {
  const particlesList = useMemo(() => {
    return Array.from({ length: 45 }, (_, i) => ({
      id: i,
      emoji: particles[i % particles.length],
      left: Math.random() * 100,
      size: 14 + Math.random() * 24,
      duration: 6 + Math.random() * 14,
      delay: Math.random() * 8,
      opacity: 0.4 + Math.random() * 0.5
    }))
  }, [])

  return (
    <div className="particles-container">
      {particlesList.map(p => (
        <motion.div
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            opacity: p.opacity
          }}
          animate={{
            y: ['100vh', '-10vh'],
            x: [0, Math.sin(p.id) * 50, 0, -Math.sin(p.id) * 50, 0],
            rotate: [0, 360],
            scale: [0.5, 1, 0.8, 1, 0.5]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear'
          }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  )
}

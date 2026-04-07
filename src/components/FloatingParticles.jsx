import { useMemo } from 'react'
import { motion } from 'framer-motion'

function getRandom(min, max) {
  return min + Math.random() * (max - min);
}

const particles = ['💖', '✨', '💕', '🌸', '💗', '⭐', '🦋', '😍']

export default function FloatingParticles() {
  const particlesList = useMemo(() => {
    return Array.from({ length: 45 }, (_, i) => ({
      id: i,
      emoji: particles[i % particles.length],
      left: getRandom(0, 100),
      size: getRandom(14, 38),
      duration: getRandom(6, 20),
      delay: getRandom(0, 8),
      opacity: getRandom(0.4, 0.9)
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

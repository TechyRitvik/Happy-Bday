import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const pageColors = {
  '/': { bg: 'linear-gradient(180deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)', text: '#831843' },
  '/game': { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)', text: 'white' },
  '/music': { bg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', text: 'white' },
  '/memories': { bg: 'linear-gradient(180deg, #1f1c2c 0%, #928dab 100%)', text: 'white' }
}

export default function Navigation() {
  const location = useLocation()
  const colors = pageColors[location.pathname] || pageColors['/']
  
  const links = [
    { path: '/', label: 'Birthday' },
    { path: '/game', label: 'Game' },
    { path: '/music', label: 'Music' },
    { path: '/memories', label: 'Memories' }
  ]

  return (
    <motion.header 
      className="nav-container"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{ 
        flexShrink: 0,
        background: colors.bg,
        borderBottom: 'none',
        margin: 0,
        padding: 0
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '14px 28px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 className="nav-brand" style={{ margin: 0, fontSize: '26px', color: colors.text }}>
          Made with love by Rithvik for Mahak
        </h1>
        <nav style={{ display: 'flex', gap: '6px' }}>
          {links.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              style={{ 
                color: colors.text,
                background: location.pathname === link.path ? 'rgba(255,255,255,0.2)' : 'transparent'
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </motion.header>
  )
}

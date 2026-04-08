import { useLocation } from 'react-router-dom'

const pageColors = {
  '/': { bg: 'linear-gradient(180deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)', text: '#831843' },
  '/game': { bg: 'linear-gradient(135deg, #1a0533 0%, #2d1b4e 50%, #4a2c6a 100%)', text: 'white' },
  '/music': { bg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', text: 'white' },
  '/memories': { bg: 'linear-gradient(180deg, #1f1c2c 0%, #928dab 100%)', text: 'white' }
}

export default function Footer() {
  const location = useLocation()
  const colors = pageColors[location.pathname] || pageColors['/']
  
  return (
    <div style={{
      width: '100%',
      margin: 0,
      padding: '20px',
      background: colors.bg,
      color: colors.text,
      textAlign: 'center',
      fontWeight: 600,
      flexShrink: 0,
      position: 'relative',
      zIndex: 10
    }}>
      Made with ❤️ by Ritvik for Mahak
    </div>
  )
}
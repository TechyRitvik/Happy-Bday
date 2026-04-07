import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

const pageColors = {
  '/': { bg: 'linear-gradient(180deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)', text: '#831843' },
  '/game': { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)', text: 'white' },
  '/music': { bg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', text: 'white' },
  '/memories': { bg: 'linear-gradient(180deg, #1f1c2c 0%, #928dab 100%)', text: 'white' }
}

export default function Footer() {
  const location = useLocation()
  const colors = pageColors[location.pathname] || pageColors['/']
  
  return (
    <motion.footer 
      className="site-footer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        background: colors.bg,
        color: colors.text,
        borderTop: 'none'
      }}
    >
      Made with ❤️ by Rithvik for Mahak
    </motion.footer>
  )
}

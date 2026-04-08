import { useState } from 'react'
import { Link } from 'react-router-dom'
import confetti from 'canvas-confetti'
import FloatingParticles from '../components/FloatingParticles'

export default function BirthdayPage() {
  const assetBase = import.meta.env.BASE_URL
  const [cakeCut, setCakeCut] = useState(false)

  const handleCakeClick = () => {
    if (!cakeCut) {
      setCakeCut(true)
      
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff4d94', '#c4b4f8', '#f8d4c4', '#ff69b4', '#ffd700']
      })
    }
  }

  return (
    <div style={{
      width: '100%',
      minHeight: '86vh',
      background: 'linear-gradient(180deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)',
      fontFamily: 'Nunito Sans, system-ui, Segoe UI, Arial',
      color: 'var(--text-dark)',
      position: 'relative',
      margin: 0,
      padding: 0
    }}>
      <FloatingParticles />
      
      <div
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
      <div
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

      <div 
        style={{ textAlign: 'center', position: 'relative', zIndex: 1, paddingTop: '20px' }}
      >
        <h1 style={{ 
          fontSize: '56px', 
          color: 'var(--pink-primary)',
          margin: 0,
          fontFamily: 'Montserrat, sans-serif',
          textShadow: '0 4px 12px rgba(219, 39, 119, 0.3)'
        }}>
          Happy Birthday Mahak!
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px', fontWeight: 600 }}>Click the cake to cut it</p>
      </div>

      <div 
        onClick={handleCakeClick}
        style={{ 
          cursor: cakeCut ? 'default' : 'pointer',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}
      >
        {!cakeCut ? (
          <div
            style={{
              animation: 'float 2s ease-in-out infinite',
              fontSize: '160px',
              filter: 'drop-shadow(8px 8px 16px rgba(219, 39, 119, 0.3))'
            }}
          >
            🎂
          </div>
        ) : (
          <div style={{
            fontSize: '160px',
            filter: 'drop-shadow(8px 8px 16px rgba(219, 39, 119, 0.3))',
            animation: 'pulse 1s ease-in-out infinite'
          }}>
            🍰
          </div>
        )}
      </div>

      {cakeCut && (
        <div
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
            <source src={`${assetBase}assets/bday.mp4`} type="video/mp4" />
          </video>
        </div>
      )}

      {cakeCut && (
        <div
          style={{ textAlign: 'center', marginTop: '30px', position: 'relative', zIndex: 1 }}
        >
          <Link to="/game" className="romantic-btn" style={{ display: 'inline-block', textDecoration: 'none' }}>
            Next →
          </Link>
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  )
}

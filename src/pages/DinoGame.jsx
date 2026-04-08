import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import FloatingParticles from '../components/FloatingParticles'
import { useAudio } from '../context/AudioContext'

export default function DinoGame() {
  const { stopTrack } = useAudio()
  const canvasRef = useRef(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    stopTrack()
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W = canvas.width, H = canvas.height;

    const assetBase = import.meta.env.BASE_URL
    const playerImg = new Image(); playerImg.src = `${assetBase}assets/player.png`;
    const shooterImg = new Image(); shooterImg.src = `${assetBase}assets/shooter.png`;
    const heartImg = new Image(); heartImg.src = `${assetBase}assets/heartImg.png`;
    let imagesLoaded = 0;
    [playerImg, shooterImg, heartImg].forEach(img => { 
      img.onload = () => imagesLoaded++; 
      img.onerror = () => imagesLoaded++; 
    });

    const player = {x:60,y:0,w:44,h:44,vy:0,jumpV:-20,ground:0,isOnGround:true};
    const gravity = 1.8;

    let speed = 8;
    let obstacles = [];
    let spawnTimer = -1; // Spawn heart immediately on first update
    let running = false;
    let gameStarted = false;
    let countdownTime = -1;

    function resize(){ 
      W = canvas.width = Math.min(1000, window.innerWidth-80); 
      H = canvas.height = 300; 
      player.ground = H - 44 - 20; 
      player.y = player.ground; 
    }
    window.addEventListener('resize', resize); resize();

    function spawn(){
      const heartSize = 32;
      obstacles.push({x:W + 40, y: player.ground + (player.h - heartSize), w:heartSize, h:heartSize});
    }

    function startCountdown(){
      function doCountdown(){
        countdownTime = 3;
        const interval = setInterval(()=>{
          countdownTime--;
          if(countdownTime < 0){
            clearInterval(interval);
            running = true;
            gameStarted = true;
          }
        }, 1000);
      }

      if(imagesLoaded < 3){
        const startWait = Date.now();
        const waiter = setInterval(()=>{
          if(imagesLoaded >= 3 || Date.now() - startWait > 3000){
            clearInterval(waiter); doCountdown();
          }
        }, 150);
      } else {
        doCountdown();
      }
    }

    function update(){
      if(!running) return;

      speed += 0.015;
      speed = Math.min(speed, 25);

      player.vy += gravity; player.y += player.vy;
      if(player.y >= player.ground){ 
        player.y = player.ground; 
        player.vy = 0; 
        player.isOnGround = true; 
      }

      spawnTimer -= speed/3;
      if(spawnTimer <= 0){ 
        spawnTimer = 70 + Math.random()*50; 
        spawn(); 
      }

      for(let i=obstacles.length-1;i>=0;i--){
        const o = obstacles[i]; 
        o.x -= speed;
        if(o.x < player.x + player.w && 
           o.x + o.w > player.x && 
           o.y < player.y + player.h && 
           o.y + o.h > player.y){
          running = false;
          setShowModal(true);
        }
        if(o.x + o.w < -50) obstacles.splice(i,1);
      }
    }

    function drawHeart(x,y,s,color){
      ctx.save(); 
      ctx.translate(x,y);
      ctx.fillStyle = color;
      ctx.beginPath();
      const top = 0;
      ctx.moveTo(0, top + s*0.3);
      ctx.bezierCurveTo(0, top - s*0.2, -s*0.5, top - s*0.2, -s*0.5, top + s*0.3);
      ctx.bezierCurveTo(-s*0.5, top + s*0.75, 0, top + s, 0, top + s);
      ctx.bezierCurveTo(0, top + s, s*0.5, top + s*0.75, s*0.5, top + s*0.3);
      ctx.bezierCurveTo(s*0.5, top - s*0.2, 0, top - s*0.2, 0, top + s*0.3);
      ctx.closePath(); 
      ctx.fill(); 
      ctx.restore();
    }

    function drawShooter(){
      const sx = W - 80, sy = player.ground - 20;
      if (shooterImg.complete && shooterImg.naturalWidth) {
        ctx.drawImage(shooterImg, sx, sy, 60, 60);
      } else {
        ctx.fillStyle = '#8b4d6d';
        ctx.fillRect(sx, sy, 60, 60);
        ctx.fillStyle = '#ff4d94';
        ctx.fillRect(sx + 55, sy + 20, 20, 8);
      }
    }

    function draw(){
      ctx.fillStyle = '#fff5f8'; 
      ctx.fillRect(0,0,W,H);

      ctx.fillStyle = '#ffe6f0'; 
      ctx.fillRect(0, player.ground + player.h, W, H - (player.ground + player.h));
      ctx.strokeStyle = '#ffd0e3'; 
      ctx.lineWidth = 4; 
      ctx.beginPath();
      const dashX = -(Date.now()/10)%40;
      for(let x = -40 + dashX; x < W; x += 40){ 
        ctx.moveTo(x, player.ground + player.h + 8); 
        ctx.lineTo(x+20, player.ground + player.h + 8); 
      } 
      ctx.stroke();

      if (playerImg.complete && playerImg.naturalWidth) {
        ctx.drawImage(playerImg, player.x, player.y, player.w, player.h);
      } else {
        ctx.fillStyle = '#4d2b4d'; 
        ctx.fillRect(player.x, player.y, player.w, player.h);
      }

      drawShooter();

      obstacles.forEach(o=>{
        if (heartImg.complete && heartImg.naturalWidth) {
          ctx.drawImage(heartImg, o.x, o.y, o.w, o.h);
        } else {
          drawHeart(o.x, o.y, o.w, '#ff4d94');
        }
      });

      ctx.fillStyle = '#8b536b'; 
      ctx.font = 'bold 16px Inter';
      ctx.fillText('you', player.x + 8, player.y - 8);
      const shooterX = W - 80;
      ctx.fillText('me', shooterX + 12, player.ground - 35);

      ctx.fillStyle = '#8b536b'; 
      ctx.font = 'bold 20px Inter';
      if(countdownTime >= 0){
        ctx.fillText(String(countdownTime), W/2 - 10, 40);
      } else if(!gameStarted){
        ctx.fillText('Tap to start', W/2 - 50, 40);
      }
    }

    function loop(){ 
      update(); 
      draw(); 
      requestAnimationFrame(loop); 
    }
    loop();

    function tryJump(){ 
      if(player.isOnGround){ 
        player.vy = player.jumpV; 
        player.isOnGround=false; 
      }
    }

    function handleKeyDown(e){ 
      if(e.code === 'Space'){
        e.preventDefault();
        if(!gameStarted) startCountdown(); 
        else tryJump(); 
      }
    }

    function handleClick(){ 
      if(!gameStarted) startCountdown(); 
      else tryJump(); 
    }

    window.addEventListener('keydown', handleKeyDown);
    canvas.addEventListener('click', handleClick);

    window.gameRestart = () => {
      obstacles.length = 0; 
      speed = 12; 
      running = false; 
      gameStarted = false; 
      countdownTime = -1; 
      player.y = player.ground;
      player.vy = 0;
      setShowModal(false);
    };

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      canvas.removeEventListener('click', handleClick);
      window.removeEventListener('resize', resize);
    }
  }, [])

  return (
    <div style={{
      minHeight: '86vh',
      background: 'linear-gradient(135deg, #1a0533 0%, #2d1b4e 50%, #4a2c6a 100%)',
      fontFamily: 'Nunito Sans, system-ui, Segoe UI, Arial',
      color: 'white',
      position: 'relative',
      margin: 0,
      padding: 0
    }}>
      <FloatingParticles />
      
      <motion.div
        animate={{ x: [0, 20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ position: 'absolute', top: '15%', left: '10%', fontSize: '60px' }}
      >
        🎮
      </motion.div>
      <motion.div
        animate={{ x: [0, -15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        style={{ position: 'absolute', top: '20%', right: '15%', fontSize: '50px' }}
      >
        🕹️
      </motion.div>

      <main style={{ maxWidth: '980px', margin: '0 auto', padding: '40px 18px', position: 'relative', zIndex: 1 }}>
        <motion.section 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="romantic-card" 
          style={{ padding: '24px', marginBottom: '18px' }}
        >
          <h2 style={{ color: 'white', marginTop: 0, fontSize: '28px', fontFamily: 'Montserrat, sans-serif', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>Heart Runner</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '16px' }}>Press <strong style={{ color: 'white' }}>Space</strong> or click/tap to jump.</p>
          
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <canvas 
              ref={canvasRef} 
              width="900" 
              height="300"
              style={{
                background: 'linear-gradient(180deg, #2d1b4e, #1a0533)',
                borderRadius: '16px',
                maxWidth: '100%',
                border: '2px solid rgba(255,255,255,0.2)'
              }}
            />
          </div>
        </motion.section>

        <motion.section 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="romantic-card" 
          style={{ padding: '20px', textAlign: 'center' }}
        >
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>When you lose you may try again or proceed to the next surprise.</p>
          <Link to="#/music" className="romantic-btn" style={{ display: 'inline-block', marginTop: '12px', textDecoration: 'none' }}>Go to Next Page</Link>
        </motion.section>
      </main>

      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.5)',
              zIndex: 1000
            }}
          >
            <motion.div 
              initial={{ scale: 0.7, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.7, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              style={{
                background: 'white',
                padding: '30px',
                borderRadius: '12px',
                textAlign: 'center',
                color: '#333',
                maxWidth: '420px'
              }}
            >
              <h3 style={{ marginTop: 0, fontSize: '28px', fontFamily: 'Montserrat, sans-serif', color: '#DB2777' }}>You lose!</h3>
              <p style={{ marginBottom: '24px', fontSize: '18px' }}>Kya gundi banegi re tu 😂</p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={window.gameRestart} className="romantic-btn">Try Again</button>
                <Link to="#/music" className="romantic-btn-secondary" style={{ textDecoration: 'none' }}>Proceed Ahead</Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
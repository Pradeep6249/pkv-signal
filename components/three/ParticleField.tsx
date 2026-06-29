'use client'
import { useEffect, useRef } from 'react'

export default function ParticleField({ style }: { style?: React.CSSProperties }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current!
    const ctx = cv.getContext('2d')!
    let W = cv.width = window.innerWidth
    let H = cv.height = window.innerHeight
    let raf: number

    const onResize = () => { W = cv.width = window.innerWidth; H = cv.height = window.innerHeight }
    window.addEventListener('resize', onResize)

    const pts = Array.from({ length: 220 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.2 + 0.3,
      t: Math.random() < 0.07 ? 'f' : Math.random() < 0.12 ? 'a' : 'c',
      ph: Math.random() * Math.PI * 2,
      alpha: Math.random() * 0.35 + 0.08,
    }))

    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.1)'
      ctx.fillRect(0, 0, W, H)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.ph += 0.018
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
        pts.forEach(q => {
          const d = Math.hypot(p.x - q.x, p.y - q.y)
          if (d < 100) {
            ctx.strokeStyle = (p.t === 'f' || q.t === 'f')
              ? `rgba(255,55,95,${(1 - d / 100) * 0.12})`
              : `rgba(41,151,255,${(1 - d / 100) * 0.07})`
            ctx.lineWidth = 0.5
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke()
          }
        })
        const a = p.alpha * (0.6 + 0.4 * Math.sin(p.ph))
        ctx.shadowBlur = p.t === 'f' ? 8 : 3
        ctx.shadowColor = p.t === 'f' ? '#ff375f' : '#2997ff'
        ctx.fillStyle = p.t === 'f' ? `rgba(255,55,95,${a})` : p.t === 'a' ? `rgba(0,212,255,${a})` : `rgba(41,151,255,${a})`
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * (1 + 0.25 * Math.sin(p.ph)), 0, Math.PI * 2); ctx.fill()
        ctx.shadowBlur = 0
      })
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])

  return (
    <canvas
      ref={ref}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none',
        ...style,
      }}
    />
  )
}

'use client'
import { useEffect, useRef } from 'react'

export default function NoiseCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current!
    const ctx = cv.getContext('2d')!
    let W = cv.width = window.innerWidth
    let H = cv.height = window.innerHeight
    let raf: number

    window.addEventListener('resize', () => { W = cv.width = window.innerWidth; H = cv.height = window.innerHeight })

    // Data stream columns for the noise scene
    const cols = Math.floor(W / 22)
    const streams = Array.from({ length: cols }, (_, i) => ({
      x: i * 22, y: Math.random() * -H,
      speed: 0.5 + Math.random() * 1.5,
      chars: Array.from({ length: 40 }, () => '01$%#@!Σ∇∂∑'[Math.floor(Math.random() * 12)]),
      alpha: 0.05 + Math.random() * 0.12,
      color: Math.random() < 0.08 ? 'ff375f' : '2997ff',
    }))

    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.15)'
      ctx.fillRect(0, 0, W, H)

      ctx.font = '11px Courier New'
      streams.forEach(s => {
        s.y += s.speed
        if (s.y > H + 200) s.y = -H * Math.random()
        s.chars.forEach((c, i) => {
          const brightness = 1 - i / s.chars.length
          ctx.fillStyle = `rgba(${s.color === 'ff375f' ? '255,55,95' : '41,151,255'},${s.alpha * brightness})`
          ctx.fillText(c, s.x, s.y - i * 14)
          // Occasionally randomize char
          if (Math.random() < 0.02) s.chars[i] = '01$%#@!Σ∇∂∑'[Math.floor(Math.random() * 12)]
        })
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <canvas
      ref={ref}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
    />
  )
}

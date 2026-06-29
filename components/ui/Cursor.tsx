'use client'
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const posRef  = useRef({ x: 0, y: 0, rx: 0, ry: 0 })

  useEffect(() => {
    const dot  = dotRef.current!
    const ring = ringRef.current!
    const pos  = posRef.current
    let raf: number

    const onMove = (e: MouseEvent) => { pos.x = e.clientX; pos.y = e.clientY }
    window.addEventListener('mousemove', onMove)

    const animate = () => {
      pos.rx += (pos.x - pos.rx) * 0.12
      pos.ry += (pos.y - pos.ry) * 0.12
      dot.style.left  = pos.x + 'px'; dot.style.top  = pos.y + 'px'
      ring.style.left = pos.rx + 'px'; ring.style.top = pos.ry + 'px'
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    const big = () => { dot.style.width='14px'; dot.style.height='14px'; ring.style.width='60px'; ring.style.height='60px'; ring.style.borderColor='rgba(255,255,255,0.6)' }
    const sm  = () => { dot.style.width='8px';  dot.style.height='8px';  ring.style.width='40px'; ring.style.height='40px'; ring.style.borderColor='rgba(255,255,255,0.3)' }
    document.querySelectorAll('a,button').forEach(el => { el.addEventListener('mouseenter', big); el.addEventListener('mouseleave', sm) })

    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove) }
  }, [])

  return (
    <>
      <div ref={dotRef} id="cursor" style={{ position:'fixed', width:'8px', height:'8px', borderRadius:'50%', background:'#fff', pointerEvents:'none', zIndex:9999, transform:'translate(-50%,-50%)', transition:'width .3s,height .3s', mixBlendMode:'difference' }} />
      <div ref={ringRef} id="cursor-ring" style={{ position:'fixed', width:'40px', height:'40px', borderRadius:'50%', border:'1px solid rgba(255,255,255,0.3)', pointerEvents:'none', zIndex:9998, transform:'translate(-50%,-50%)', transition:'width .3s,height .3s,border-color .3s' }} />
    </>
  )
}

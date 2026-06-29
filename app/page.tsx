'use client'
import dynamic from 'next/dynamic'
import SceneNoise      from '@/components/sections/SceneNoise'
import SceneScale      from '@/components/sections/SceneScale'
import SceneConflict   from '@/components/sections/SceneConflict'
import SceneSignal     from '@/components/sections/SceneSignal'
import SceneGlobe      from '@/components/sections/SceneGlobe'
import SceneCurrent    from '@/components/sections/SceneCurrent'
import SceneSystem     from '@/components/sections/SceneSystem'
import SceneMetrics    from '@/components/sections/SceneMetrics'
import SceneEducation  from '@/components/sections/SceneEducation'
import SceneManifesto  from '@/components/sections/SceneManifesto'
import SceneClosing    from '@/components/sections/SceneClosing'
import Nav             from '@/components/ui/Nav'
import Progress        from '@/components/ui/Progress'
import SmoothScroll    from '@/components/ui/SmoothScroll'

const Cursor       = dynamic(() => import('@/components/ui/Cursor'),       { ssr: false })
const ParticleField = dynamic(() => import('@/components/three/ParticleField'), { ssr: false })

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Progress />
      <ParticleField />

      {/* Grain overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        opacity: 0.028,
      }} />

      <Nav />

      <main>
        <SceneNoise />
        <div className="divider" />
        <SceneScale />
        <div className="divider" />
        <SceneConflict />
        <div className="divider" />
        <SceneSignal />
        <div className="divider" />
        <SceneGlobe />
        <div className="divider" />
        <SceneCurrent />
        <div className="divider" />
        <SceneSystem />
        <div className="divider" />
        <SceneMetrics />
        <div className="divider" />
        <SceneEducation />
        <div className="divider" />
        <SceneManifesto />
        <div className="divider" />
        <SceneClosing />
      </main>

      <footer style={{
        borderTop: '0.5px solid rgba(255,255,255,0.08)',
        padding: '28px 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'relative', zIndex: 2,
      }}>
        <div style={{ fontSize: '12px', color: '#424245' }}>© 2025 Pradeep Kumar Voruganti</div>
        <div style={{ fontSize: '12px', color: '#424245' }}>Data Scientist · Fraud & Risk Analytics</div>
      </footer>
    </>
  )
}

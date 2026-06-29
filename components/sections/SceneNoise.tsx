'use client'
import dynamic from 'next/dynamic'
const NoiseCanvas = dynamic(() => import('../three/NoiseCanvas'), { ssr: false })

export default function SceneNoise() {
  return (
    <section className="scene" id="s-noise" style={{ background: '#000', position: 'relative' }}>
      <NoiseCanvas />
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <div
          className="h1"
          style={{
            fontSize: 'clamp(48px,9vw,140px)',
            fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.02,
            color: '#fff', userSelect: 'none',
          }}
        >Pradeep Kumar<br />Voruganti</div>
        <div className="h2" style={{ position: 'absolute', bottom: '-100px', left: '50%', transform: 'translateX(-50%)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.26em', color: '#424245', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
          Data Scientist · Fraud · Payments · Risk
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', zIndex: 2 }}>
        <div className="h7" style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.22em', color: '#424245', textTransform: 'uppercase' }}>Scroll</div>
        <div className="h7" style={{ width: '1px', height: '44px', background: 'linear-gradient(to bottom, rgba(41,151,255,0.7), transparent)' }} />
      </div>
    </section>
  )
}

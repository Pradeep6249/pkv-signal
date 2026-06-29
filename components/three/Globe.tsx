'use client'
import { useEffect, useRef } from 'react'

export default function Globe({ opacity = 1 }: { opacity?: number }) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return
    let THREE: any, renderer: any, scene: any, camera: any, raf: number

    const init = async () => {
      THREE = await import('three')
      const mount = mountRef.current!
      const W = mount.clientWidth, H = mount.clientHeight

      // Renderer — high DPR for 6K feel
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3))
      renderer.setSize(W, H)
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.2
      mount.appendChild(renderer.domElement)

      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000)
      camera.position.set(0, 0, 26)

      // ── GLOBE WIREFRAME ──
      const globeGeo = new THREE.SphereGeometry(8, 48, 48)
      const globeMat = new THREE.MeshBasicMaterial({
        color: 0x2997ff, wireframe: true, transparent: true, opacity: 0.06
      })
      const globe = new THREE.Mesh(globeGeo, globeMat)
      scene.add(globe)

      // ── INNER GLOW SPHERE ──
      const innerGeo = new THREE.SphereGeometry(7.85, 32, 32)
      const innerMat = new THREE.MeshBasicMaterial({
        color: 0x000510, transparent: true, opacity: 0.97
      })
      scene.add(new THREE.Mesh(innerGeo, innerMat))

      // ── TRANSACTION NODES ──
      const nodeGeo = new THREE.SphereGeometry(0.1, 8, 8)
      const cleanMat = new THREE.MeshBasicMaterial({ color: 0x2997ff })
      const fraudMat = new THREE.MeshBasicMaterial({ color: 0xff375f })
      const nodes: any[] = []
      const N = 180

      for (let i = 0; i < N; i++) {
        const phi = Math.acos(-1 + (2 * i) / N)
        const theta = Math.sqrt(N * Math.PI) * phi
        const isFraud = i % 11 === 0
        const node = new THREE.Mesh(nodeGeo, isFraud ? fraudMat.clone() : cleanMat.clone())
        node.position.setFromSphericalCoords(8.12, phi, theta)
        node.userData = { isFraud, phi, theta, phase: Math.random() * Math.PI * 2, active: false }
        scene.add(node)
        nodes.push(node)
      }

      // ── GLOWING ARCS (transaction flows) ──
      const arcGroup = new THREE.Group()
      scene.add(arcGroup)

      const makeArc = (a: any, b: any, isFraud: boolean) => {
        const pts = []
        for (let t = 0; t <= 24; t++) {
          const p = new THREE.Vector3().lerpVectors(a.position, b.position, t / 24)
          p.normalize().multiplyScalar(8.3 + Math.sin(Math.PI * t / 24) * 1.8)
          pts.push(p)
        }
        const geo = new THREE.BufferGeometry().setFromPoints(pts)
        const mat = new THREE.LineBasicMaterial({
          color: isFraud ? 0xff375f : 0x2997ff,
          transparent: true,
          opacity: isFraud ? 0.5 : 0.18
        })
        return new THREE.Line(geo, mat)
      }

      for (let i = 0; i < 60; i++) {
        const a = nodes[Math.floor(Math.random() * N)]
        const b = nodes[Math.floor(Math.random() * N)]
        if (a !== b) arcGroup.add(makeArc(a, b, a.userData.isFraud || b.userData.isFraud))
      }

      // ── ORBITAL RINGS ──
      const rings: any[] = []
      const ringDefs = [
        { r: 10, color: 0x2997ff, opacity: 0.25, tilt: Math.PI / 3 },
        { r: 11.5, color: 0x8b5cf6, opacity: 0.18, tilt: Math.PI / 5 },
        { r: 13, color: 0x00d4ff, opacity: 0.12, tilt: Math.PI / 2.2 },
      ]
      ringDefs.forEach(d => {
        const geo = new THREE.TorusGeometry(d.r, 0.015, 8, 200)
        const mat = new THREE.MeshBasicMaterial({ color: d.color, transparent: true, opacity: d.opacity })
        const ring = new THREE.Mesh(geo, mat)
        ring.rotation.x = d.tilt
        scene.add(ring); rings.push(ring)
      })

      // ── FLOATING DATA POINTS ──
      const dataGeo = new THREE.BufferGeometry()
      const dataCount = 2000
      const dataPos = new Float32Array(dataCount * 3)
      for (let i = 0; i < dataCount * 3; i++) dataPos[i] = (Math.random() - 0.5) * 60
      dataGeo.setAttribute('position', new THREE.BufferAttribute(dataPos, 3))
      const dataMat = new THREE.PointsMaterial({ color: 0x2997ff, size: 0.06, transparent: true, opacity: 0.35 })
      scene.add(new THREE.Points(dataGeo, dataMat))

      // ── MOUSE PARALLAX ──
      let mouseX = 0, mouseY = 0
      const onMouse = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2
      }
      window.addEventListener('mousemove', onMouse)

      // ── RESIZE ──
      const onResize = () => {
        const W = mount.clientWidth, H = mount.clientHeight
        camera.aspect = W / H
        camera.updateProjectionMatrix()
        renderer.setSize(W, H)
      }
      window.addEventListener('resize', onResize)

      // ── ANIMATE ──
      let t = 0
      const animate = () => {
        raf = requestAnimationFrame(animate)
        t += 0.004

        globe.rotation.y = t * 0.12
        arcGroup.rotation.y = t * 0.12
        rings[0].rotation.z = t * 0.07
        rings[1].rotation.y = t * 0.05
        rings[2].rotation.x = Math.PI / 2.2 + t * 0.04

        // Smooth camera parallax
        camera.position.x += (mouseX * 4 - camera.position.x) * 0.025
        camera.position.y += (-mouseY * 3 - camera.position.y) * 0.025
        camera.lookAt(0, 0, 0)

        // Node pulse
        nodes.forEach(n => {
          const s = 1 + 0.35 * Math.sin(t * 2.5 + n.userData.phase)
          n.scale.setScalar(n.userData.isFraud ? s * 1.8 : s)
          if (n.userData.isFraud) {
            n.material.opacity = 0.4 + 0.6 * Math.sin(t * 3 + n.userData.phase)
          }
        })

        renderer.render(scene, camera)
      }
      animate()

      return () => {
        window.removeEventListener('mousemove', onMouse)
        window.removeEventListener('resize', onResize)
      }
    }

    let cleanup: (() => void) | undefined
    init().then(fn => { cleanup = fn })

    return () => {
      cancelAnimationFrame(raf)
      cleanup?.()
      if (renderer) {
        renderer.dispose()
        mountRef.current?.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: '100%', opacity }}
    />
  )
}

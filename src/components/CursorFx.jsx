import { useEffect, useRef } from 'react'
import { useSettings } from '../settings.jsx'
import { beep } from '../fx.js'

// Cursor glow trail + click burst particles + global button ripple/sound
export default function CursorFx() {
  const ref = useRef(null)
  const { s } = useSettings()
  const sRef = useRef(s)
  sRef.current = s

  useEffect(() => {
    const c = ref.current
    const ctx = c.getContext('2d')
    const resize = () => { c.width = innerWidth; c.height = innerHeight }
    resize()
    addEventListener('resize', resize)
    const parts = []
    let raf
    const color = () => getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#00f0ff'
    const color2 = () => getComputedStyle(document.documentElement).getPropertyValue('--accent2').trim() || '#ff2bd6'

    const move = (e) => {
      if (!sRef.current.trail) return
      parts.push({ x: e.clientX, y: e.clientY, vx: (Math.random() - 0.5) * 0.8, vy: (Math.random() - 0.5) * 0.8, life: 1, d: 0.045, r: 2.2, c: color() })
    }
    const down = (e) => {
      const st = sRef.current
      if (st.sound) beep(900, 0.05, 'square')
      if (!st.clickFx) return
      const col = [color(), color2()]
      for (let i = 0; i < 26; i++) {
        const a = Math.random() * Math.PI * 2, sp = 1 + Math.random() * 5
        parts.push({ x: e.clientX, y: e.clientY, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 1, d: 0.025 + Math.random() * 0.02, r: 1.5 + Math.random() * 2, c: col[i % 2], sq: true })
      }
      parts.push({ x: e.clientX, y: e.clientY, ring: 4, life: 1, d: 0.04, c: color() })
      // ripple on interactive elements
      const el = e.target.closest && e.target.closest('.cbtn, .nav a, .folder, .tile, button, .social, .photo')
      if (el) {
        const r = el.getBoundingClientRect()
        const sp = document.createElement('span')
        sp.className = 'ripple'
        sp.style.left = e.clientX - r.left + 'px'
        sp.style.top = e.clientY - r.top + 'px'
        el.appendChild(sp)
        setTimeout(() => sp.remove(), 700)
      }
    }
    const over = (e) => {
      if (sRef.current.sound && e.target.closest && e.target.closest('.cbtn, .nav a, .folder, button, .photo')) beep(1400, 0.025, 'sine', 0.02)
    }
    addEventListener('mousemove', move)
    addEventListener('mousedown', down)
    document.addEventListener('mouseover', over)

    const loop = () => {
      ctx.clearRect(0, 0, c.width, c.height)
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i]
        p.life -= p.d
        if (p.life <= 0) { parts.splice(i, 1); continue }
        ctx.globalAlpha = p.life
        if (p.ring) {
          p.ring += 3.5
          ctx.strokeStyle = p.c; ctx.lineWidth = 2
          ctx.beginPath(); ctx.arc(p.x, p.y, p.ring, 0, 7); ctx.stroke()
          continue
        }
        p.x += p.vx; p.y += p.vy
        ctx.fillStyle = p.c
        ctx.shadowColor = p.c; ctx.shadowBlur = 10
        if (p.sq) ctx.fillRect(p.x, p.y, p.r * 1.6, p.r * 1.6)
        else { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill() }
        ctx.shadowBlur = 0
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(loop)
    }
    loop()
    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('resize', resize)
      removeEventListener('mousemove', move)
      removeEventListener('mousedown', down)
      document.removeEventListener('mouseover', over)
    }
  }, [])

  return <canvas ref={ref} className="fx-canvas" />
}

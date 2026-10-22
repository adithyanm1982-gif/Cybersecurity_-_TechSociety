import { useEffect, useRef } from 'react'
import { useSettings } from '../settings.jsx'

// Dotted wave terrain (inspired by the theme image) + optional code rain
export default function Background() {
  const wave = useRef(null)
  const rain = useRef(null)
  const { s } = useSettings()

  useEffect(() => {
    const c = wave.current
    const ctx = c.getContext('2d')
    let raf, t = 0
    const resize = () => { c.width = innerWidth; c.height = innerHeight }
    resize()
    addEventListener('resize', resize)
    const COLS = 90, ROWS = 46
    const draw = () => {
      t += 0.012
      ctx.clearRect(0, 0, c.width, c.height)
      const light = document.documentElement.dataset.theme === 'light'
      const W = c.width, H = c.height
      for (let r = 0; r < ROWS; r++) {
        const z = r / ROWS
        const persp = 0.25 + z * 1.15
        const y0 = H * 0.42 + z * z * H * 0.75
        for (let k = 0; k < COLS; k++) {
          const u = k / (COLS - 1) - 0.5
          const x = W / 2 + u * W * 1.7 * persp
          const h = Math.sin(u * 7 + t * 1.3 + z * 4) * 22 + Math.cos(u * 3.5 - t + z * 7) * 30 + Math.sin(u * 14 + t * 2) * 6
          const y = y0 - h * persp
          const a = Math.min(1, 0.15 + z * 0.9) * (0.35 + 0.65 * ((h + 58) / 116))
          ctx.fillStyle = light ? `rgba(10,20,40,${a * 0.8})` : `rgba(235,235,245,${a})`
          const sz = 0.6 + z * 1.6
          ctx.fillRect(x, y, sz, sz)
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', resize) }
  }, [])

  useEffect(() => {
    const c = rain.current
    const ctx = c.getContext('2d')
    let raf
    const size = 16
    let drops = []
    const resize = () => {
      c.width = innerWidth; c.height = innerHeight
      drops = Array.from({ length: Math.ceil(c.width / size) }, () => Math.random() * -50)
    }
    resize()
    addEventListener('resize', resize)
    const glyphs = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿ01{}<>/\\$#%&*+=ABCDEF'
    let last = 0
    const loop = (ts) => {
      raf = requestAnimationFrame(loop)
      if (!s.rain) { ctx.clearRect(0, 0, c.width, c.height); return }
      if (ts - last < 55) return
      last = ts
      ctx.fillStyle = 'rgba(0,0,0,0.12)'
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillRect(0, 0, c.width, c.height)
      ctx.globalCompositeOperation = 'source-over'
      ctx.font = `${size}px "Share Tech Mono", monospace`
      const col = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#00f0ff'
      drops.forEach((y, i) => {
        const ch = glyphs[Math.floor(Math.random() * glyphs.length)]
        ctx.fillStyle = Math.random() > 0.96 ? '#ffffff' : col
        ctx.globalAlpha = 0.5
        ctx.fillText(ch, i * size, y * size)
        ctx.globalAlpha = 1
        if (y * size > c.height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      })
    }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', resize) }
  }, [s.rain])

  return (
    <>
      <canvas ref={wave} className="bg-canvas" />
      <canvas ref={rain} className="bg-canvas rain" />
      <div className="bg-vignette" />
      <div className="bg-scanlines" />
      <div className="bg-noise" />
    </>
  )
}

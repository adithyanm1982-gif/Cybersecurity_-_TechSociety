import { useEffect, useState } from 'react'

const CHARS = '!<>-_\\/[]{}=+*^?#ABCDEF0123456789'

// Decrypt / scramble text effect
export function useScramble(text, active = true, speed = 28) {
  const [out, setOut] = useState('')
  useEffect(() => {
    if (!active) { setOut(''); return }
    let frame = 0
    const total = text.length * 3
    const id = setInterval(() => {
      const revealed = Math.floor(frame / 3)
      let s = ''
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') s += ' '
        else if (i < revealed) s += text[i]
        else s += CHARS[Math.floor(Math.random() * CHARS.length)]
      }
      setOut(s)
      frame++
      if (frame > total) { clearInterval(id); setOut(text) }
    }, speed)
    return () => clearInterval(id)
  }, [text, active, speed])
  return out
}

// Typewriter
export function useTyper(lines, speed = 38, pause = 1400) {
  const [i, setI] = useState(0)
  const [txt, setTxt] = useState('')
  const [del, setDel] = useState(false)
  useEffect(() => {
    const full = lines[i % lines.length]
    let t
    if (!del && txt === full) t = setTimeout(() => setDel(true), pause)
    else if (del && txt === '') { setDel(false); setI((n) => n + 1) }
    else t = setTimeout(() => setTxt(del ? full.slice(0, txt.length - 1) : full.slice(0, txt.length + 1)), del ? speed / 2 : speed)
    return () => clearTimeout(t)
  }, [txt, del, i, lines, speed, pause])
  return txt
}

// Count up when visible
export function useCount(target, run = true, dur = 1600) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!run) return
    let raf, start
    const step = (t) => {
      start = start || t
      const p = Math.min(1, (t - start) / dur)
      setN(Math.floor(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, run, dur])
  return n
}

// Reveal on scroll
export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.12 }
    )
    const scan = () => document.querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el))
    scan()
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => { io.disconnect(); mo.disconnect() }
  }, [])
}

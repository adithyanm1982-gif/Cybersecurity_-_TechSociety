import { createContext, useContext, useEffect, useState } from 'react'

const DEFAULTS = {
  theme: 'dark',
  accent: 'cyan',
  rain: true,
  scanlines: true,
  glitch: true,
  trail: true,
  sound: false,
  clickFx: true,
  reduceMotion: false,
  fontSize: 'medium',
}

export const ACCENTS = {
  cyan: ['#00f0ff', '#ff2bd6', '#fcee0a'],
  magenta: ['#ff2bd6', '#00f0ff', '#fcee0a'],
  green: ['#39ff14', '#00f0ff', '#ff2bd6'],
  yellow: ['#fcee0a', '#ff2bd6', '#00f0ff'],
  red: ['#ff3131', '#00f0ff', '#fcee0a'],
}

const Ctx = createContext(null)
export const useSettings = () => useContext(Ctx)

export function SettingsProvider({ children }) {
  const [s, setS] = useState(() => {
    try {
      return { ...DEFAULTS, ...JSON.parse(localStorage.getItem('ts-settings') || '{}') }
    } catch {
      return DEFAULTS
    }
  })

  useEffect(() => {
    try { localStorage.setItem('ts-settings', JSON.stringify(s)) } catch {}
    const root = document.documentElement
    const [a, b, c] = ACCENTS[s.accent] || ACCENTS.cyan
    root.style.setProperty('--accent', a)
    root.style.setProperty('--accent2', b)
    root.style.setProperty('--accent3', c)
    root.dataset.theme = s.theme
    root.dataset.scan = s.scanlines ? 'on' : 'off'
    root.dataset.glitch = s.glitch ? 'on' : 'off'
    root.dataset.motion = s.reduceMotion ? 'reduced' : 'full'
    root.dataset.font = s.fontSize
  }, [s])

  const set = (k, v) => setS((p) => ({ ...p, [k]: v }))
  const reset = () => setS(DEFAULTS)
  return <Ctx.Provider value={{ s, set, reset }}>{children}</Ctx.Provider>
}
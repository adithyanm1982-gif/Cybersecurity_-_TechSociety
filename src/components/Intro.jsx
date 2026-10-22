import { useEffect, useState } from 'react'
import { useScramble } from '../hooks.js'
import { useSettings } from '../settings.jsx'
import { beep } from '../fx.js'

const BOOT = [
  '> INITIALIZING SECURE KERNEL ........ OK',
  '> LOADING FIREWALL MODULES .......... OK',
  '> ESTABLISHING ENCRYPTED TUNNEL ..... OK',
  '> BYPASSING MAINFRAME ............... OK',
]

export default function Intro({ onDone }) {
  const { s } = useSettings()
  const [stage, setStage] = useState(0) // 0 boot, 1 CYBERSECURITY, 2 TECH SOCIETY, 3 exit
  const [lines, setLines] = useState(0)

  useEffect(() => {
    const timers = []
    BOOT.forEach((_, i) => timers.push(setTimeout(() => { setLines(i + 1); s.sound && beep(500 + i * 120) }, 250 + i * 330)))
    timers.push(setTimeout(() => { setStage(1); s.sound && beep(220, 0.3, 'sawtooth') }, 1800))
    timers.push(setTimeout(() => { setStage(2); s.sound && beep(330, 0.3, 'sawtooth') }, 3900))
    timers.push(setTimeout(() => setStage(3), 6200))
    timers.push(setTimeout(onDone, 7000))
    return () => timers.forEach(clearTimeout)
    // eslint-disable-next-line
  }, [])

  const t1 = useScramble('CYBERSECURITY', stage === 1, 45)
  const t2 = useScramble('TECH SOCIETY', stage === 2, 55)

  return (
    <div className={`intro ${stage === 3 ? 'exit' : ''}`}>
      <div className="intro-grid" />
      <div className="intro-scan" />
      <div className="intro-boot">
        {BOOT.slice(0, lines).map((l) => <div key={l}>{l}</div>)}
      </div>

      {stage === 1 && (
        <h1 className="intro-title glitch" data-text={t1}>{t1}</h1>
      )}
      {stage >= 2 && (
        <>
          <h1 className="intro-title small dim glitch" data-text="CYBERSECURITY">CYBERSECURITY</h1>
          <h1 className="intro-title glitch hot" data-text={t2}>{t2}</h1>
          <div className="intro-sub">SAVEETHA ENGINEERING COLLEGE // ACCESS GRANTED</div>
        </>
      )}

      <div className="intro-bar"><span /></div>
      <button className="intro-skip" onClick={onDone}>[ SKIP &gt;&gt; ]</button>
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import { Terminal as XTerm } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import '@xterm/xterm/css/xterm.css'
import { Heading, PageNav, CyberButton } from '../components/Shared.jsx'

const WS_URL = 'ws://127.0.0.1:3001'
const SHELLS = [
  { id: 'cmd', label: 'COMMAND PROMPT' },
  { id: 'powershell', label: 'POWERSHELL' },
]

export default function Terminal() {
  const host = useRef(null)
  const [shell, setShell] = useState('cmd')
  const [status, setStatus] = useState('wait') // wait | ok | off
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const css = getComputedStyle(document.documentElement)
    const accent = css.getPropertyValue('--accent').trim() || '#00f0ff'
    const term = new XTerm({
      cursorBlink: true,
      fontFamily: '"Share Tech Mono", Consolas, monospace',
      fontSize: 16,
      theme: { background: '#02050a', foreground: '#e6faff', cursor: accent, selectionBackground: 'rgba(0,240,255,0.3)' },
    })
    const fit = new FitAddon()
    term.loadAddon(fit)
    term.open(host.current)
    fit.fit()
    setStatus('wait')

    const ws = new WebSocket(`${WS_URL}?shell=${shell}`)
    const send = (o) => ws.readyState === 1 && ws.send(JSON.stringify(o))

    ws.onopen = () => { setStatus('ok'); send({ t: 'r', c: term.cols, r: term.rows }); term.focus() }
    ws.onmessage = (e) => term.write(e.data)
    ws.onerror = () => setStatus('off')
    ws.onclose = () => setStatus((s) => (s === 'ok' ? 'off' : s === 'wait' ? 'off' : s))

    const sub = term.onData((d) => send({ t: 'i', d }))
    const ro = new ResizeObserver(() => { try { fit.fit(); send({ t: 'r', c: term.cols, r: term.rows }) } catch {} })
    ro.observe(host.current)

    return () => { sub.dispose(); ro.disconnect(); ws.close(); term.dispose() }
  }, [shell, attempt])

  return (
    <div className="container narrow" style={{ maxWidth: 1040 }}>
      <Heading kicker="SHELL ACCESS">Terminal</Heading>

      <div className="shell-tabs reveal">
        {SHELLS.map((s) => (
          <button key={s.id} className={`cbtn ${shell === s.id ? '' : 'ghost'}`} onClick={() => setShell(s.id)}><span>{s.label}</span></button>
        ))}
        <CyberButton variant="alt" onClick={() => setAttempt((n) => n + 1)}>RECONNECT</CyberButton>
        <span className={`shell-status ${status}`}>
          {status === 'ok' ? '● CONNECTED' : status === 'wait' ? '◌ CONNECTING...' : '○ OFFLINE'}
        </span>
      </div>

      <div className="term tile reveal">
        <div className="term-bar"><i /><i /><i /><span>{shell === 'cmd' ? 'cmd.exe' : 'powershell.exe'} // real shell on this computer</span></div>
        <div className="xterm-host" ref={host} />
      </div>

      {status === 'off' && (
        <p className="term-help">
          Shell server not reachable. Stop the site and start it with <code>npm run dev:all</code> (or run <code>npm run term</code> in a second window), then press RECONNECT.
        </p>
      )}
      <p className="term-help">
        ⚠ This is a real shell running on the machine that hosts <code>server/terminal.js</code>. It only accepts connections from localhost,
        so keep it for local or demo use and never expose port 3001 to the internet.
      </p>

      <PageNav />
    </div>
  )
}
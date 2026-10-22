import { WebSocketServer } from 'ws'
import pty from '@homebridge/node-pty-prebuilt-multiarch'
import os from 'os'

const PORT = 3001
const isWin = os.platform() === 'win32'

const SHELLS = {
  cmd: isWin ? 'cmd.exe' : process.env.SHELL || 'bash',
  powershell: isWin ? 'powershell.exe' : 'pwsh',
}

// Only accept connections from pages served on localhost
const wss = new WebSocketServer({
  host: '127.0.0.1',
  port: PORT,
  verifyClient: ({ origin }) => !origin || /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin),
})

wss.on('connection', (ws, req) => {
  const kind = new URL(req.url, 'http://localhost').searchParams.get('shell') || 'cmd'
  let term
  try {
    term = pty.spawn(SHELLS[kind] || SHELLS.cmd, [], {
      name: 'xterm-256color',
      cols: 90,
      rows: 26,
      cwd: os.homedir(),
      env: process.env,
    })
  } catch (e) {
    ws.send(`\r\n\x1b[31mCould not start "${SHELLS[kind]}": ${e.message}\x1b[0m\r\n`)
    return ws.close()
  }

  term.onData((d) => ws.readyState === 1 && ws.send(d))
  term.onExit(() => ws.close())

  ws.on('message', (raw) => {
    try {
      const msg = JSON.parse(raw.toString())
      if (msg.t === 'i') term.write(msg.d)
      else if (msg.t === 'r') term.resize(Math.max(2, msg.c), Math.max(2, msg.r))
    } catch {}
  })
  ws.on('close', () => { try { term.kill() } catch {} })
})

console.log(`[terminal] real shell server on ws://127.0.0.1:${PORT}  (localhost only)`)
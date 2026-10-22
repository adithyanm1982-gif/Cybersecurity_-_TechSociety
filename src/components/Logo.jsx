import { useEffect, useState } from 'react'
import { logo } from '../fx.js'

// Removes margins around an image. mode "alpha" = transparent only, "white" = transparent + near-white
function trimImage(src, mode, done) {
  const img = new Image()
  img.onload = () => {
    try {
      const w = img.naturalWidth, h = img.naturalHeight
      const c = document.createElement('canvas')
      c.width = w; c.height = h
      const ctx = c.getContext('2d', { willReadFrequently: true })
      ctx.drawImage(img, 0, 0)
      const d = ctx.getImageData(0, 0, w, h).data
      let top = h, left = w, right = 0, bottom = 0
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4
          const isBg = d[i + 3] < 12 || (mode !== 'alpha' && d[i] > 238 && d[i + 1] > 238 && d[i + 2] > 238)
          if (!isBg) {
            if (x < left) left = x
            if (x > right) right = x
            if (y < top) top = y
            if (y > bottom) bottom = y
          }
        }
      }
      if (right <= left || bottom <= top) return done(src)
      const pad = Math.round(Math.max(right - left, bottom - top) * 0.02)
      left = Math.max(0, left - pad); top = Math.max(0, top - pad)
      right = Math.min(w - 1, right + pad); bottom = Math.min(h - 1, bottom + pad)
      const out = document.createElement('canvas')
      out.width = right - left + 1; out.height = bottom - top + 1
      out.getContext('2d').drawImage(c, left, top, out.width, out.height, 0, 0, out.width, out.height)
      done(out.toDataURL('image/png'))
    } catch {
      done(src)
    }
  }
  img.onerror = () => done(null)
  img.src = src
}

// trim: false | true ("white" mode) | "alpha"
export default function Logo({ file, label, size = 140, round = false, plate = false, banner = false, invertOnLight = false, trim = false, className = '' }) {
  const url = logo(file)
  const [src, setSrc] = useState(trim ? null : url)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (!trim) { setSrc(url); return }
    trimImage(url, trim === 'alpha' ? 'alpha' : 'white', (res) => (res ? setSrc(res) : setFailed(true)))
  }, [url, trim])

  return (
    <div
      className={`logo-wrap ${plate ? 'plate' : ''} ${banner ? 'banner' : ''} ${round ? 'round' : ''} ${invertOnLight ? 'inv-light' : ''} ${className}`}
      style={{ width: size, height: size, '--h': `${size}px` }}
      title={label}
    >
      <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
      {failed ? (
        <span className="logo-missing">{label}</span>
      ) : (
        src && <img src={src} alt={label} onError={() => setFailed(true)} draggable="false" />
      )}
    </div>
  )
}
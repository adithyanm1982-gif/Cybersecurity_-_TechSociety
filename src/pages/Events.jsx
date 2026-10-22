import { useEffect, useState } from 'react'
import { Heading, PageNav, CyberButton } from '../components/Shared.jsx'

// Placeholder square images. Replace with real event photos later (put files in /public/events and edit paths).
const img = (seed, n = 600) => `https://picsum.photos/seed/${seed}/${n}/${n}`

const EVENTS = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  name: 'EEE',
  cover: img(`cyber-cover-${i + 1}`),
  photos: Array.from({ length: 3 + (i % 2) }, (_, j) => img(`cyber-ev${i + 1}-p${j + 1}`, 800)),
}))

export default function Events() {
  const [open, setOpen] = useState(null) // event index
  const [light, setLight] = useState(null) // photo index in lightbox

  const ev = open !== null ? EVENTS[open] : null

  useEffect(() => {
    const k = (e) => {
      if (e.key === 'Escape') light !== null ? setLight(null) : setOpen(null)
      if (light !== null && ev) {
        if (e.key === 'ArrowRight') setLight((l) => (l + 1) % ev.photos.length)
        if (e.key === 'ArrowLeft') setLight((l) => (l - 1 + ev.photos.length) % ev.photos.length)
      }
    }
    addEventListener('keydown', k)
    return () => removeEventListener('keydown', k)
  }, [light, ev])

  const go = (i) => { setLight(null); setOpen(i); window.scrollTo({ top: 0 }) }

  return (
    <div className="container">
      {!ev && (
        <>
          <Heading kicker="MEMORY ARCHIVE">Events Gallery</Heading>
          <p className="lead center reveal">Open a folder to browse the photos of past Cybersecurity domain events.</p>
          <section className="folders">
            {EVENTS.map((e, i) => (
              <button className="folder reveal" key={e.id} onClick={() => go(i)} style={{ transitionDelay: `${i * 50}ms` }}>
                <div className="folder-tab"><span>DIR_{String(e.id).padStart(2, '0')}</span></div>
                <div className="folder-body">
                  <img src={e.cover} alt={`${e.name} cover`} loading="lazy" />
                  <div className="folder-shine" />
                  <div className="folder-count">{e.photos.length} FILES</div>
                </div>
                <div className="folder-name">{e.name}</div>
              </button>
            ))}
          </section>
          <PageNav />
        </>
      )}

      {ev && (
        <>
          <div className="crumbs">
            <button className="cbtn ghost" onClick={() => setOpen(null)}><span>« BACK TO FOLDERS</span></button>
            <span className="path">root/events/<b>{ev.name}_{String(ev.id).padStart(2, '0')}</b></span>
          </div>
          <Heading kicker={`FOLDER ${String(ev.id).padStart(2, '0')} / 09`}>{ev.name}</Heading>
          <section className="photos">
            {ev.photos.map((p, j) => (
              <button className="photo reveal" key={j} onClick={() => setLight(j)} style={{ transitionDelay: `${j * 80}ms` }}>
                <img src={p} alt={`${ev.name} ${j + 1}`} loading="lazy" />
                <span className="photo-tag">IMG_{String(j + 1).padStart(3, '0')}</span>
              </button>
            ))}
          </section>
          <div className="pagenav">
            <CyberButton variant="ghost" onClick={() => go((open - 1 + EVENTS.length) % EVENTS.length)}>« PREV EVENT</CyberButton>
            <CyberButton onClick={() => go((open + 1) % EVENTS.length)}>NEXT EVENT »</CyberButton>
          </div>
        </>
      )}

      {ev && light !== null && (
        <div className="lightbox" onClick={() => setLight(null)}>
          <button className="lb-nav l cbtn" onClick={(e) => { e.stopPropagation(); setLight((light - 1 + ev.photos.length) % ev.photos.length) }}><span>«</span></button>
          <div className="lb-frame" onClick={(e) => e.stopPropagation()}>
            <img src={ev.photos[light].replace('/800/800', '/1000/1000')} alt="" />
            <div className="lb-cap">{ev.name} // IMG_{String(light + 1).padStart(3, '0')} / {ev.photos.length}</div>
          </div>
          <button className="lb-nav r cbtn" onClick={(e) => { e.stopPropagation(); setLight((light + 1) % ev.photos.length) }}><span>»</span></button>
          <button className="lb-close cbtn" onClick={() => setLight(null)}><span>✕ CLOSE</span></button>
        </div>
      )}
    </div>
  )
}

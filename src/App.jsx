import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Intro from './components/Intro.jsx'
import Background from './components/Background.jsx'
import CursorFx from './components/CursorFx.jsx'
import Navbar from './components/Navbar.jsx'
import SettingsPanel from './components/SettingsPanel.jsx'
import { Footer } from './components/Shared.jsx'
import { useReveal } from './hooks.js'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Events from './pages/Events.jsx'
import Resources from './pages/Resources.jsx'
import Join from './pages/Join.jsx'
import Terminal from './pages/Terminal.jsx'
import Contacts from './pages/Contacts.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  const [booted, setBooted] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const loc = useLocation()
  useReveal()

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [loc.pathname])
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && setSettingsOpen(false)
    addEventListener('keydown', k)
    return () => removeEventListener('keydown', k)
  }, [])

  return (
    <>
      <Background />
      <CursorFx />
      {!booted && <Intro onDone={() => setBooted(true)} />}
      {booted && (
        <>
          <div className="hud-corner tl" /><div className="hud-corner tr" /><div className="hud-corner bl" /><div className="hud-corner br" />
          <Navbar onSettings={() => setSettingsOpen(true)} />
          <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />
          <main key={loc.pathname} className="page">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/events" element={<Events />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/join" element={<Join />} />
              <Route path="/terminal" element={<Terminal />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </>
      )}
    </>
  )
}

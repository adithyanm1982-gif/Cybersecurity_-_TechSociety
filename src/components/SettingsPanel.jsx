import { useState } from 'react'
import { useSettings, ACCENTS } from '../settings.jsx'

function Toggle({ label, k, hint }) {
  const { s, set } = useSettings()
  return (
    <div className="set-row">
      <span>{label}<small>{hint}</small></span>
      <button type="button" className={`switch ${s[k] ? 'on' : ''}`} onClick={() => set(k, !s[k])} aria-pressed={s[k]}><i /></button>
    </div>
  )
}

function Section({ id, title, sub, open, setOpen, children }) {
  const isOpen = open === id
  return (
    <div className={`acc ${isOpen ? 'open' : ''}`}>
      <button className="acc-head" onClick={() => setOpen(isOpen ? null : id)} aria-expanded={isOpen}>
        <span>{title}<small>{sub}</small></span>
        <span className="acc-arrow">▶</span>
      </button>
      <div className="acc-body">{children}</div>
    </div>
  )
}

export default function SettingsPanel({ open, onClose }) {
  const { s, set, reset } = useSettings()
  const [section, setSection] = useState(null) // only one section open at a time

  return (
    <>
      <div className={`scrim ${open ? 'show' : ''}`} onClick={onClose} />
      <aside className={`settings ${open ? 'open' : ''}`}>
        <div className="settings-head">
          <h3 className="glitch" data-text="SETTINGS">SETTINGS</h3>
          <button className="icon-btn" onClick={onClose}>✕</button>
        </div>

        {/* ALL visual controls live inside this ONE button */}
        <Section id="ui" title="UI CONTROLS" sub="theme · neon accent · visual effects" open={section} setOpen={setSection}>
          <div>
            <div className="set-title">// DISPLAY MODE</div>
            <div className="seg">
              <button className={s.theme === 'dark' ? 'on' : ''} onClick={() => set('theme', 'dark')}>☾ DARK</button>
              <button className={s.theme === 'light' ? 'on' : ''} onClick={() => set('theme', 'light')}>☀ LIGHT</button>
            </div>
          </div>

          <div>
            <div className="set-title">// NEON ACCENT</div>
            <div className="swatches">
              {Object.entries(ACCENTS).map(([name, cols]) => (
                <button key={name} title={name} className={`swatch ${s.accent === name ? 'on' : ''}`} style={{ '--c': cols[0] }} onClick={() => set('accent', name)} />
              ))}
            </div>
          </div>

          <div>
            <div className="set-title">// EFFECTS</div>
            <Toggle k="rain" label="Code Rain" hint="falling matrix glyphs" />
            <Toggle k="scanlines" label="CRT Scanlines" hint="retro monitor overlay" />
            <Toggle k="glitch" label="Glitch Text" hint="animated title glitches" />
            <Toggle k="trail" label="Cursor Trail" hint="neon particles follow mouse" />
            <Toggle k="clickFx" label="Click Burst" hint="particles on every click" />
            <Toggle k="sound" label="UI Sounds" hint="beeps on hover & click" />
          </div>
        </Section>

        <Section id="access" title="ACCESSIBILITY" sub="motion · text size" open={section} setOpen={setSection}>
          <Toggle k="reduceMotion" label="Reduce Motion" hint="calms all animations" />
          <div>
            <div className="set-title">// TEXT SIZE</div>
            <div className="seg" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
              {['small', 'medium', 'large'].map((f) => (
                <button key={f} className={s.fontSize === f ? 'on' : ''} onClick={() => set('fontSize', f)}>{f.toUpperCase()}</button>
              ))}
            </div>
          </div>
        </Section>

        <Section id="system" title="SYSTEM" sub="reset · site info" open={section} setOpen={setSection}>
          <button className="cbtn" onClick={reset}><span>RESET ALL SETTINGS</span></button>
          <p className="set-foot">
            THE TECH SOCIETY // CYBERSECURITY<br />
            Saveetha Engineering College<br />
            Settings are saved on this device only.
          </p>
        </Section>
      </aside>
    </>
  )
}
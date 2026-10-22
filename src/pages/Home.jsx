import { useRef, useState, useEffect } from 'react'
import Logo from '../components/Logo.jsx'
import { CyberButton, Heading, PageNav, LogoStrip } from '../components/Shared.jsx'
import { useTyper, useCount } from '../hooks.js'

function Stat({ n, suffix = '', label }) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setVis(true), { threshold: 0.4 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  const v = useCount(n, vis)
  return (
    <div className="stat tile reveal" ref={ref}>
      <b>{v}{suffix}</b>
      <span>{label}</span>
    </div>
  )
}

const FEATURES = [
  { i: '🛡', t: 'Ethical Hacking', d: 'Learn how attackers think so you can defend like a pro.' },
  { i: '🔐', t: 'Cryptography', d: 'From classic ciphers to modern encryption, hands-on.' },
  { i: '🏴', t: 'CTF Battles', d: 'Capture-the-flag contests, wargames and live challenges.' },
  { i: '🕸', t: 'Network Defense', d: 'Firewalls, IDS, packet analysis and secure design.' },
  { i: '🧬', t: 'Digital Forensics', d: 'Trace the evidence and reconstruct cyber incidents.' },
  { i: '🤖', t: 'AI for Security', d: 'Using machine learning to detect threats faster.' },
]

export default function Home() {
  const typed = useTyper(['Defend. Detect. Decrypt.', 'Think like a hacker.', 'Secure the digital future.', 'Collaborate. Innovate.'])
  return (
    <div className="container">
      <section className="hero">
        <div className="hero-logo reveal">
          <Logo file="techsociety.png" label="The Tech Society" size={300} invertOnLight className="hero-ts" />
        </div>
        <div className="hero-text">
          <div className="kicker reveal">// WELCOME, OPERATIVE</div>
          <h1 className="hero-h glitch" data-text="CYBERSECURITY">CYBERSECURITY</h1>
          <h2 className="hero-sub glitch accent" data-text="TECH SOCIETY">TECH SOCIETY</h2>
          <p className="typed">&gt; {typed}<i className="caret" /></p>
          <p className="lead reveal">
            Welcome to the Cybersecurity domain of The Tech Society, Saveetha Engineering College. We are a community of
            curious minds who learn, build and break things responsibly, from ethical hacking and cryptography to network
            defense and digital forensics. (Sample text, to be updated.)
          </p>
          <div className="btn-row">
            <CyberButton to="/join">JOIN THE DOMAIN</CyberButton>
            <CyberButton to="/events" variant="ghost">VIEW EVENTS</CyberButton>
            <CyberButton to="/about" variant="alt">ABOUT US</CyberButton>
          </div>
        </div>
      </section>

      <section className="logos-band reveal">
        <div className="band-title">// OUR INSTITUTION</div>
        <LogoStrip size={150} />
      </section>

      <section className="stats">
        <Stat n={25} suffix="+" label="YEARS OF EXCELLENCE" />
        <Stat n={5} label="TECH DOMAINS" />
        <Stat n={9} suffix="+" label="EVENTS CONDUCTED" />
        <Stat n={100} suffix="+" label="ACTIVE MEMBERS" />
      </section>

      <Heading kicker="WHAT WE DO">Our Arsenal</Heading>
      <section className="grid3">
        {FEATURES.map((f, i) => (
          <div className="tile card reveal" key={f.t} style={{ transitionDelay: `${i * 70}ms` }}>
            <div className="card-ico">{f.i}</div>
            <h3>{f.t}</h3>
            <p>{f.d}</p>
            <span className="card-idx">0{i + 1}</span>
          </div>
        ))}
      </section>

      <PageNav />
    </div>
  )
}

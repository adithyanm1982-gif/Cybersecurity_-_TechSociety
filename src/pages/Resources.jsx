import { useState } from 'react'
import { Heading, PageNav } from '../components/Shared.jsx'

const PATHS = [
  { lvl: 'BEGINNER', title: 'Security Fundamentals', items: ['CIA triad & threat models', 'Linux & command line basics', 'Networking essentials (TCP/IP, DNS, HTTP)', 'Password & identity hygiene'] },
  { lvl: 'INTERMEDIATE', title: 'Offensive & Defensive Skills', items: ['Web app security (OWASP Top 10)', 'Cryptography in practice', 'Packet analysis with Wireshark', 'Intro to CTFs & wargames'] },
  { lvl: 'ADVANCED', title: 'Specialisation Tracks', items: ['Reverse engineering & malware analysis', 'Digital forensics & incident response', 'Cloud & container security', 'AI-driven threat detection'] },
]

// Edit descriptions here anytime
const TOOLS = [
  { name: 'Kali Linux', tag: 'OPERATING SYSTEM', desc: 'A Linux distribution packed with hundreds of penetration-testing and security-auditing tools, ready to use.' },
  { name: 'Wireshark', tag: 'NETWORK ANALYSIS', desc: 'Captures and inspects network packets in real time so you can see exactly what travels across a network.' },
  { name: 'Nmap', tag: 'SCANNER', desc: 'Discovers hosts, open ports and running services on a network. Usually the first step of reconnaissance.' },
  { name: 'Burp Suite', tag: 'WEB SECURITY', desc: 'An intercepting proxy used to test web applications for flaws like SQL injection and XSS.' },
  { name: 'Metasploit', tag: 'EXPLOIT FRAMEWORK', desc: 'A framework for developing and running exploits in a lab, used to understand and validate vulnerabilities.' },
  { name: 'Ghidra', tag: 'REVERSE ENGINEERING', desc: 'A free software reverse-engineering suite that disassembles and decompiles programs to study how they work.' },
  { name: 'John the Ripper', tag: 'PASSWORD AUDIT', desc: 'A password-cracking tool used to test password strength and find weak hashes in security audits.' },
  { name: 'CyberChef', tag: 'DATA TOOLKIT', desc: 'The "cyber Swiss army knife": encode, decode, encrypt and analyse data right in the browser.' },
]

export default function Resources() {
  const [tab, setTab] = useState(0)
  const [active, setActive] = useState(null) // tapped tool (for touch screens)
  const p = PATHS[tab]
  return (
    <div className="container" onClick={() => setActive(null)}>
      <Heading kicker="KNOWLEDGE BASE">Resources</Heading>
      <p className="lead center reveal">A learning roadmap and toolkit for new members. (Sample content, to be updated.)</p>

      <div className="tabs reveal">
        {PATHS.map((x, i) => (
          <button key={x.lvl} className={`cbtn ${tab === i ? '' : 'ghost'}`} onClick={() => setTab(i)}><span>{x.lvl}</span></button>
        ))}
      </div>

      <section className="tile path" key={tab}>
        <div className="kicker">// LEVEL 0{tab + 1}</div>
        <h3>{p.title}</h3>
        <ul>
          {p.items.map((it, i) => (
            <li key={it} style={{ animationDelay: `${i * 90}ms` }}><b>&gt;</b> {it}</li>
          ))}
        </ul>
      </section>

      <Heading kicker="TOOLKIT · HOVER OR TAP A TOOL">Tools We Use</Heading>
      <section className="chips">
        {TOOLS.map((t, i) => (
          <div className={`chip-wrap reveal ${active === t.name ? 'on' : ''}`} key={t.name} style={{ transitionDelay: `${i * 50}ms` }}>
            <button
              className="chip"
              onClick={(e) => { e.stopPropagation(); setActive(active === t.name ? null : t.name) }}
              onFocus={() => setActive(t.name)}
              onBlur={() => setActive(null)}
            >
              {t.name}
            </button>
            <div className="tool-pop" role="tooltip">
              <h4><em>&gt;_</em>{t.name.toUpperCase()}</h4>
              <p>{t.desc}</p>
              <span className="tag">{t.tag}</span>
            </div>
          </div>
        ))}
      </section>

      <PageNav />
    </div>
  )
}
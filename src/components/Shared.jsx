import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from './Navbar.jsx'
import Logo from './Logo.jsx'

export function CyberButton({ to, onClick, children, variant = '', type = 'button', ...rest }) {
  const cls = `cbtn ${variant}`
  if (to) return <Link to={to} className={cls} {...rest}><span>{children}</span></Link>
  return <button type={type} className={cls} onClick={onClick} {...rest}><span>{children}</span></button>
}

export function Heading({ kicker, children }) {
  return (
    <div className="heading reveal">
      {kicker && <div className="kicker">{'// ' + kicker}</div>}
      <h2 className="glitch" data-text={children}>{children}</h2>
      <div className="h-line"><i /></div>
    </div>
  )
}

// BACK / NEXT page navigation
export function PageNav() {
  const { pathname } = useLocation()
  const nav = useNavigate()
  const i = Math.max(0, ROUTES.findIndex((r) => r.to === pathname))
  const prev = ROUTES[i - 1], next = ROUTES[i + 1]
  return (
    <div className="pagenav">
      <button className="cbtn ghost" disabled={!prev} onClick={() => prev && nav(prev.to)}>
        <span>« BACK{prev ? ` : ${prev.label}` : ''}</span>
      </button>
      <button className="cbtn" disabled={!next} onClick={() => next && nav(next.to)}>
        <span>{next ? `NEXT : ${next.label}` : 'END'} »</span>
      </button>
    </div>
  )
}

export function LogoStrip() {
  return (
    <div className="logo-strip">
      <Logo file="college.png" label="Saveetha Engineering College" size={130} banner trim="alpha" />
      <Logo file="25years.png" label="25 Years of Excellence" size={78} round />
      <Logo file="aifirst.png" label="AI First Campus" size={66} plate trim />
    </div>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-line" />
      <div className="footer-row">
        <span>© 2026 THE TECH SOCIETY · CYBERSECURITY DOMAIN</span>
        <span>SAVEETHA ENGINEERING COLLEGE · AUTONOMOUS · AFFILIATED TO ANNA UNIVERSITY</span>
        <span className="blink">▮ SYSTEM ONLINE</span>
      </div>
    </footer>
  )
}

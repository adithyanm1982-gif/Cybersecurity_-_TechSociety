import { CyberButton } from '../components/Shared.jsx'

export default function NotFound() {
  return (
    <div className="container center-col">
      <h1 className="hero-h glitch" data-text="404">404</h1>
      <p className="lead center">SIGNAL LOST // This sector does not exist.</p>
      <CyberButton to="/">RETURN TO BASE</CyberButton>
    </div>
  )
}

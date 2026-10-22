import { Heading, PageNav } from '../components/Shared.jsx'

export default function Contacts() {
  return (
    <div className="container">
      <Heading kicker="OPEN CHANNEL">Contact Us</Heading>
      <p className="lead center reveal">
        Have a question, an idea or want to collaborate? Reach out to the Cybersecurity domain team. We read every transmission.
        (Sample text, to be updated.)
      </p>

      <section className="contact-grid">
        <div className="tile contact reveal">
          <div className="c-ico">☎</div>
          <h3>CONTACT NUMBER</h3>
          <a href="tel:+919876543210" className="c-val">+91 98765 43210</a>
          <span className="c-note">// mon–fri · 9am – 5pm</span>
        </div>
        <div className="tile contact reveal" style={{ transitionDelay: '120ms' }}>
          <div className="c-ico">✉</div>
          <h3>MAIL IDs</h3>
          <a href="mailto:cybersec.techsociety@example.com" className="c-val">cybersec.techsociety@example.com</a>
          <a href="mailto:coordinator.cyber@example.com" className="c-val">coordinator.cyber@example.com</a>
        </div>
      </section>

      <PageNav />
    </div>
  )
}

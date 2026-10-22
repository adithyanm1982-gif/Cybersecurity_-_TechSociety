import { useState } from 'react'
import { Heading, PageNav, CyberButton } from '../components/Shared.jsx'

export default function Join() {
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const submit = (e) => {
    e.preventDefault()
    setBusy(true)
    // Demo only: no backend yet. Connect to a Google Form / API later.
    setTimeout(() => { setBusy(false); setSent(true) }, 1600)
  }
  return (
    <div className="container narrow">
      <Heading kicker="RECRUITMENT">Join The Domain</Heading>
      {!sent ? (
        <form className="tile form reveal" onSubmit={submit}>
          <label>NAME<input required placeholder="Your full name" /></label>
          <label>REGISTER NUMBER<input required placeholder="e.g. 2117xxxxxx" /></label>
          <div className="row2">
            <label>DEPARTMENT<input required placeholder="e.g. CSE" /></label>
            <label>YEAR
              <select required defaultValue="">
                <option value="" disabled>Select</option>
                <option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>4th Year</option>
              </select>
            </label>
          </div>
          <label>EMAIL<input type="email" required placeholder="you@example.com" /></label>
          <label>WHY DO YOU WANT TO JOIN?<textarea rows="4" placeholder="Tell us about your interest in cybersecurity..." /></label>
          <CyberButton type="submit">{busy ? 'ENCRYPTING & SENDING...' : 'SUBMIT APPLICATION'}</CyberButton>
          {busy && <div className="progress"><i /></div>}
        </form>
      ) : (
        <div className="tile success reveal in">
          <div className="big">✔</div>
          <h3 className="glitch" data-text="ACCESS REQUESTED">ACCESS REQUESTED</h3>
          <p>Your application has been transmitted. We will contact you soon. (Demo form, not connected to a backend yet.)</p>
          <CyberButton onClick={() => setSent(false)} variant="ghost">SUBMIT ANOTHER</CyberButton>
        </div>
      )}
      <PageNav />
    </div>
  )
}

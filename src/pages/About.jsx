import Logo from '../components/Logo.jsx'
import { Heading, PageNav } from '../components/Shared.jsx'

const DOMAINS = ['INTELLIGENT SYSTEMS', 'GAME & APP DEVELOPMENT', 'CYBERSECURITY', 'MACHINE LEARNING', 'WEB DEVELOPMENT']

/* ============================================================
   ADD THE REAL LINKEDIN PROFILE LINKS HERE
   Order (left to right):
   1 Faculty Coordinator | 2-4 Student Coordinators
   5 Secretary           | 6-8 Joint Secretaries
   Example: 'https://www.linkedin.com/in/your-name/'
   ============================================================ */
const LINKEDIN = [
  'https://www.linkedin.com/', // 1 Faculty Coordinator
  'https://www.linkedin.com/', // 2 Student Coordinator
  'https://www.linkedin.com/', // 3 Student Coordinator
  'https://www.linkedin.com/', // 4 Student Coordinator
  'https://www.linkedin.com/', // 5 Secretary
  'https://www.linkedin.com/', // 6 Joint Secretary
  'https://www.linkedin.com/', // 7 Joint Secretary
  'https://www.linkedin.com/', // 8 Joint Secretary
]

const TEAM = [
  { role: 'FACULTY COORDINATOR' },
  { role: 'STUDENT COORDINATOR' },
  { role: 'STUDENT COORDINATOR' },
  { role: 'STUDENT COORDINATOR' },
  { role: 'SECRETARY' },
  { role: 'JOINT SECRETARY' },
  { role: 'JOINT SECRETARY' },
  { role: 'JOINT SECRETARY' },
]

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
)

export default function About() {
  return (
    <div className="container">
      <Heading kicker="WHO WE ARE">About Us</Heading>

      <section className="about-split">
        <article className="tile about-card reveal">
          <Logo file="college.png" label="Saveetha Engineering College" size={110} banner trim="alpha" className="about-logo" />
          <h3>SAVEETHA ENGINEERING COLLEGE</h3>
          <div className="tags"><span>AUTONOMOUS</span><span className="y">AFFILIATED TO ANNA UNIVERSITY</span></div>
          <p>
            Saveetha Engineering College, established in 2001 under the motto “Be the Best”, is an autonomous institution
            affiliated to Anna University. It is committed to academic excellence, research and innovation, producing
            engineers ready for the world. (Sample text, to be updated.)
          </p>
        </article>

        <article className="tile about-card reveal" style={{ transitionDelay: '120ms' }}>
          <Logo file="techsociety.png" label="The Tech Society" size={190} invertOnLight className="about-logo ts" />
          <h3>THE TECH SOCIETY</h3>
          <div className="tags"><span>COLLABORATE</span><span className="y">INNOVATE</span></div>
          <p>
            The Tech Society is the student technology community of the college, bringing together learners to build
            projects, host contests and grow with industry exposure. It is organised into five domains. (Sample text, to be updated.)
          </p>
          <ul className="domains">
            {DOMAINS.map((d, i) => (
              <li key={d} className={d === 'CYBERSECURITY' ? 'hot' : ''}><b>0{i + 1}</b> {d}</li>
            ))}
          </ul>
        </article>
      </section>

      <Heading kicker="THE CREW">Meet The Team</Heading>
      <section className="team">
        {TEAM.map((m, i) => (
          <div className="member reveal" key={i} style={{ transitionDelay: `${i * 60}ms` }}>
            <div className="avatar">
              <div className="avatar-ring" />
              <div className="avatar-in"><span>PHOTO</span></div>
            </div>
            <div className="m-name">XXX</div>
            <div className="m-dept">YYY</div>
            <div className="m-role">ZZZ</div>
            <div className="m-title">{m.role}</div>
            <a className="linkedin" href={LINKEDIN[i]} target="_blank" rel="noopener noreferrer" title="LinkedIn profile" aria-label={`LinkedIn: ${m.role}`}>
              <LinkedInIcon />
            </a>
          </div>
        ))}
      </section>

      <PageNav />
    </div>
  )
}
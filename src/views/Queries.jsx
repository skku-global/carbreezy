import { useState, useMemo } from 'react'
import '../styles/info-pages.css'
import '../styles/queries.css'

const TOPICS = ['General', 'Financing', 'Test Drive', 'Trade-In']

// Owned by: Person A
// Signature: "Job Ticket" — the query form styled as a garage work
// order: perforated tear strip, a stamped ticket number and date, a
// checklist of job types instead of a plain dropdown, and a rubber-
// stamp submit button. Distinct from Contact's riveted metal ID plate —
// this one is paper and carbon-copy, not stamped steel.
export default function Queries({ showToast }) {
  const [topic, setTopic] = useState('General')

  const ticketNo = useMemo(() => `Q-${Math.floor(1000 + Math.random() * 9000)}`, [])
  const ticketDate = useMemo(() => new Date().toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  }), [])

  const handleSubmit = e => {
    e.preventDefault()
    showToast("Query submitted — we'll get back to you within 1 business day.")
    e.target.reset()
    setTopic('General')
  }

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <span className="tag">OPEN A TICKET</span>
          <h2 className="display">Queries</h2>
          <p>Questions about a listing, financing, or delivery? Fill out a work order and our desk will pick it up.</p>
        </div>
      </div>

      <div className="section">
        <form className="job-ticket" onSubmit={handleSubmit}>
          <span className="ticket-perf" aria-hidden="true">
            {Array.from({ length: 22 }).map((_, i) => <span className="perf-hole" key={i} />)}
          </span>

          <div className="ticket-head">
            <div>
              <span className="ticket-head-label mono">WORK ORDER</span>
              <span className="ticket-head-sub">CarBreezy Service Desk</span>
            </div>
            <div className="ticket-meta mono">
              <span className="ticket-num">No. {ticketNo}</span>
              <span className="ticket-date">{ticketDate}</span>
            </div>
          </div>

          <div className="ticket-body">
            <div className="ticket-line">
              <label className="mono">Full Name</label>
              <input type="text" placeholder="e.g. Abdulkabir Yusuf" required />
            </div>
            <div className="ticket-line">
              <label className="mono">Email</label>
              <input type="email" placeholder="you@example.com" required />
            </div>

            <div className="ticket-checklist">
              <label className="mono ticket-checklist-title">Nature of Request</label>
              <div className="checklist-grid">
                {TOPICS.map(t => (
                  <button
                    type="button"
                    key={t}
                    className={`check-item ${topic === t ? 'checked' : ''}`}
                    onClick={() => setTopic(t)}
                  >
                    <span className="check-box" aria-hidden="true">{topic === t && '✕'}</span>
                    {t}
                  </button>
                ))}
              </div>
              <input type="hidden" name="topic" value={topic} />
            </div>

            <div className="ticket-line">
              <label className="mono">Description of Request</label>
              <textarea placeholder="Ask about a car, an offer, financing, delivery..." required></textarea>
            </div>
          </div>

          <div className="ticket-foot">
            <span className="ticket-carbon mono">CUSTOMER COPY · RETAIN FOR YOUR RECORDS</span>
            <button type="submit" className="stamp-btn">
              <span className="stamp-btn-inner">Submit Order</span>
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
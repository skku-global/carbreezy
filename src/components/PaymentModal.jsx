import '../styles/payment.css'
import { useState, useEffect } from 'react'
import { fmtPrice } from '../data/cars'

// Radial completion dial — same gauge vocabulary as Home's speedometers
// and Listing's sort dial, reused here so the reservation form reads as
// one more instrument on the dashboard rather than a bolted-on checkout.
function ReadinessGauge({ pct }) {
  const r = 22
  const circumference = 2 * Math.PI * r
  const offset = circumference * (1 - pct)
  const complete = pct >= 1

  return (
    <div className="readiness-gauge" aria-hidden="true">
      <svg width="54" height="54" viewBox="0 0 54 54">
        <circle cx="27" cy="27" r={r} fill="none" className="readiness-track" strokeWidth="4" />
        <circle
          cx="27" cy="27" r={r} fill="none"
          className={`readiness-fill ${complete ? 'complete' : ''}`}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 27 27)"
        />
      </svg>
      <div className="readiness-num mono">{Math.round(pct * 100)}%</div>
    </div>
  )
}

// Owned by: Person C — opened by Modal.jsx's "Reserve This Car" button
export default function PaymentModal({ car, onClose, onConfirm }) {
  const [method, setMethod] = useState('cash')
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (car) { setMethod('cash'); setForm({ name: '', email: '', phone: '' }); setSubmitting(false) }
  }, [car])

  if (!car) return null

  const update = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const nameOk = form.name.trim().length > 1
  const emailOk = /\S+@\S+\.\S+/.test(form.email)
  const phoneOk = form.phone.trim().length >= 7
  const valid = nameOk && emailOk && phoneOk
  const readiness = [nameOk, emailOk, phoneOk].filter(Boolean).length / 3

  const submit = (e) => {
    e.preventDefault()
    if (!valid || submitting) return
    setSubmitting(true)
    // Simulated processing delay so the flow feels real before handing back to App
    setTimeout(() => {
      onConfirm(car, method)
    }, 900)
  }

  return (
    <div className="modal-overlay open" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="payment-box">
        <span className="payment-bolt tl" aria-hidden="true" />
        <span className="payment-bolt tr" aria-hidden="true" />
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="payment-head">
          <div>
            <span className="tag">Reserve Vehicle</span>
            <h3 className="display">{car.name}</h3>
            <div className="payment-head-price mono">{fmtPrice(car.price)}</div>
          </div>
          <ReadinessGauge pct={readiness} />
        </div>

        <div className="payment-body">
          <div className={`payment-method-row ${method === 'finance' ? 'finance' : ''}`}>
            <span className="payment-method-slider" aria-hidden="true" />
            <button
              type="button"
              className={`payment-method-btn ${method === 'cash' ? 'active' : ''}`}
              onClick={() => setMethod('cash')}
            >
              Pay in Full
            </button>
            <button
              type="button"
              className={`payment-method-btn ${method === 'finance' ? 'active' : ''}`}
              onClick={() => setMethod('finance')}
            >
              Finance
            </button>
          </div>

          {method === 'finance' ? (
            <div className="finance-breakdown">
              <div><span>Down payment</span><b>{fmtPrice(car.financing.downPayment)}</b></div>
              <div><span>Term</span><b>{car.financing.termMonths} months</b></div>
              <div><span>Est. monthly</span><b>{fmtPrice(car.financing.estimatedMonthly)}/mo</b></div>
            </div>
          ) : (
            <div className="finance-breakdown">
              <div><span>Due today</span><b>{fmtPrice(car.price)}</b></div>
              <div><span>Reservation fee</span><b>Refundable, held 48h</b></div>
            </div>
          )}

          <form className="payment-form" onSubmit={submit}>
            <label>Full name</label>
            <input type="text" placeholder="e.g. Adaeze Okafor" value={form.name} onChange={update('name')} required />

            <label>Email</label>
            <input type="email" placeholder="you@email.com" value={form.email} onChange={update('email')} required />

            <label>Phone</label>
            <input type="tel" placeholder="+234 800 000 0000" value={form.phone} onChange={update('phone')} required />

            <button type="submit" className="btn-primary payment-submit" disabled={!valid || submitting}>
              {submitting && <span className="ignition-spinner" aria-hidden="true" />}
              {submitting ? 'Processing…' : method === 'finance' ? 'Submit Finance Application' : 'Confirm Reservation'}
            </button>
            <p className="payment-fine-print">No charge yet — a CarBreezy advisor will confirm final terms within 24 hours.</p>
          </form>
        </div>
      </div>
    </div>
  )
}
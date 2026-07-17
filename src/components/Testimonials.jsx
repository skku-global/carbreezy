import '../styles/testimonials.css'
import Reveal from './Reveal'

// Eight delivery-day reviews. Framed as receipts/service tickets rather
// than plain quote cards — punched top edge, a rotated "verified buyer"
// seal, and a mono odometer-style date/model line — so it reads as proof
// of a real handover, not a generic review widget.
const TESTIMONIALS = [
  { id: 1, name: 'Adaeze O.', car: 'Range Rover Velar', rating: 5, date: 'JUN 2026', quote: "Walked in for a test drive, drove home an hour later. The condition report on my used Velar matched the car exactly — zero surprises." },
  { id: 2, name: 'Tunde A.', car: 'BMW M4', rating: 5, date: 'MAY 2026', quote: 'Financing was approved same day and the advisor actually called when they said they would. Small thing, but it matters.' },
  { id: 3, name: 'Grace I.', car: 'Mercedes GLE', rating: 4, date: 'MAY 2026', quote: 'Reserved online at midnight, picked it up Saturday morning. The whole thing felt more organized than buying a phone.' },
  { id: 4, name: 'Chuka N.', car: 'Toyota Land Cruiser', rating: 5, date: 'APR 2026', quote: "Traded in my old truck without the usual haggling theatre. Fair number, straight answer, done in twenty minutes." },
  { id: 5, name: 'Femi B.', car: 'Porsche Macan', rating: 5, date: 'APR 2026', quote: 'Every panel gap, every scratch — it was all in the report before I even asked. That kind of honesty sells cars.' },
  { id: 6, name: 'Ngozi E.', car: 'Lexus RX', rating: 5, date: 'MAR 2026', quote: 'Delivery to Lagos took two days and the car arrived cleaner than the showroom photos. Genuinely impressed.' },
  { id: 7, name: 'Kayode S.', car: 'Audi Q7', rating: 4, date: 'FEB 2026', quote: 'Asked a dozen questions before buying. Got a dozen straight answers, no pressure to close the same day.' },
  { id: 8, name: 'Amara U.', car: 'Range Rover Sport', rating: 5, date: 'JAN 2026', quote: 'Second car I have bought here. Came back because the first one still drives like the day I picked it up.' },
]

function Stars({ rating }) {
  return (
    <div className="test-stars mono" aria-label={`${rating} out of 5 stars`}>
      {'★★★★★'.slice(0, rating)}
      <span className="dim">{'★★★★★'.slice(rating)}</span>
    </div>
  )
}

function TestimonialCard({ t }) {
  return (
    <div className="test-card">
      <span className="test-stamp mono" aria-hidden="true">VERIFIED<br />BUYER</span>
      <Stars rating={t.rating} />
      <p className="test-quote">&ldquo;{t.quote}&rdquo;</p>
      <div className="test-meta">
        <span className="test-name">{t.name}</span>
        <span className="test-car mono">{t.car} · {t.date}</span>
      </div>
    </div>
  )
}

// Owned by: Person D
// Signature: "Delivery Day Stories" — an infinite, hover-pausable belt of
// ticket-style testimonial cards, echoing the brand-marquee device used
// for logos above it but built from a new object (a service receipt)
// so it doesn't just repeat that section.
export default function Testimonials() {
  const loop = [...TESTIMONIALS, ...TESTIMONIALS]

  return (
    <section className="section testimonials-section">
      <Reveal variant="up">
        <div className="section-head">
          <div>
            <span className="tag">FROM THE LOT TO YOUR DRIVEWAY</span>
            <h2 className="display">Delivery Day Stories</h2>
          </div>
        </div>
      </Reveal>

      <Reveal variant="scale">
        <div className="test-marquee">
          <div className="test-track">
            {loop.map((t, i) => (
              <TestimonialCard key={`${t.id}-${i}`} t={t} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}

// Offers.jsx
import '../styles/offers.css'
import { CARS, OFFERS } from '../data/cars'

// Deterministic "barcode" generated from the offer id/title — gives each
// tag a slightly different bar pattern without needing real barcode data,
// reinforcing the price-tag illusion.
function Barcode({ seed }) {
  const s = String(seed || 'OFFER')
  const bars = Array.from(s).map((ch) => (ch.charCodeAt(0) % 3) + 1) // widths 1–3
  let x = 0
  const rects = bars.map((w, i) => {
    const rect = { x, w }
    x += w + 1.4
    return rect
  })
  const totalWidth = x

  return (
    <svg className="tag-barcode" viewBox={`0 0 ${totalWidth} 20`} preserveAspectRatio="none" aria-hidden="true">
      {rects.map((r, i) => (
        <rect key={i} x={r.x} y="0" width={r.w} height="20" fill="var(--ink)" />
      ))}
    </svg>
  )
}

// A single dealership hang-tag — pentagon "price tag" silhouette, punched
// hole, rubber-stamped discount, and a barcode footer standing in for the
// offer code. Distinct from every other page's instrument-panel language:
// this reads as a physical paper tag, not a gauge.
function OfferTag({ offer, car, onView, rotate }) {
  return (
    <div className="tag-card" style={{ '--tag-rot': `${rotate}deg` }}>
      <span className="tag-hole" aria-hidden="true" />

      <div className="tag-stamp mono" aria-hidden="true">
        <span className="tag-stamp-pct">{offer.pct}</span>
        <span className="tag-stamp-off">OFF</span>
      </div>

      <div className="tag-body">
        <h3 className="display">{offer.title}</h3>
        <p>{offer.desc}</p>
      </div>

      <div className="tag-footer">
        <Barcode seed={offer.id ?? offer.title} />
        <div className="tag-footer-row">
          <span className="tag-code mono">#{String(offer.id ?? '').toUpperCase() || 'DEAL'}</span>
          <span className="tag-expiry mono">{offer.expiry}</span>
        </div>
        {car && (
          <button className="tag-cta" onClick={() => onView(car.id)}>
            View {car.name} →
          </button>
        )}
      </div>
    </div>
  )
}

// Owned by: Person D
// Signature: "Hang-Tag Board" — offers styled as physical dealership
// price tags (punched hole, ink stamp, barcode) instead of another
// instrument-cluster card, so the offers page reads as the showroom
// noticeboard rather than a dashboard.
export default function Offers({ openModal }) {
  return (
    <>
      <div className="page-hero offers-hero" style={{ backgroundImage: `url('${CARS[8].images[3]}')` }}>
        <svg className="hangtag-deco" viewBox="0 0 120 160" aria-hidden="true">
          <line x1="60" y1="0" x2="60" y2="26" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
          <g className="hangtag-deco-tag">
            <path d="M20 30 L88 30 L108 58 L88 86 L20 86 Z" fill="rgba(16,21,28,0.55)" stroke="rgba(242,169,59,0.55)" strokeWidth="1.5" />
            <circle cx="34" cy="58" r="5" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
          </g>
        </svg>
        <div className="page-hero-inner">
          <span className="tag">LIMITED TIME</span>
          <h2 className="display">Current Offers</h2>
          <p>Seasonal pricing, clearance deals, and bundled service plans — updated as stock moves.</p>
        </div>
      </div>

      <div className="section">
        <div className="tag-grid">
          {OFFERS.map((o, i) => {
            const car = CARS.find(c => c.id === o.carId)
            const rotate = [-2.2, 1.6, -1, 2, -1.8, 1.2][i % 6]
            return (
              <OfferTag key={o.id} offer={o} car={car} onView={openModal} rotate={rotate} />
            )
          })}
        </div>
      </div>
    </>
  )
}
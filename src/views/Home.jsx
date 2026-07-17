import '../styles/home.css'
import { useState, useEffect } from 'react'
import { CARS, OFFERS, BRANDS, fmtPrice } from '../data/cars'
import CarCard from '../components/CarCard'
import Reveal from '../components/Reveal'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'

// Rotates ahead of whichever car is showing in the hero — kept brand-level
// rather than per-car so it reads as a thesis, not a caption.
const HERO_TAGS = [
  'BORDERLESS LUXURY, DELIVERED',
  'INSPECTED · INSURED · READY TO DRIVE',
  'THREE SHOWROOMS, ONE STANDARD',
  'FROM RESERVATION TO YOUR DRIVEWAY',
]

// Four quadrant layouts the hero text block cycles through, so the copy
// doesn't just crossfade in place — it actually relocates as the car changes.
const HERO_POSITIONS = ['pos-bl', 'pos-tr', 'pos-c', 'pos-br']

const AUTOPLAY_MS = 6000

// The instrument-cluster ring used for the Home stats and Modal's engine
// dial, reused here at hero scale so the whole page reads as one dashboard.
function HeroReadout({ index, total, paused }) {
  return (
    <div className="hero-readout mono">
      <span className="hero-readout-nums">
        <span className="idx">{String(index + 1).padStart(2, '0')}</span>
        <span className="sep">/</span>
        <span className="total">{String(total).padStart(2, '0')}</span>
      </span>
      <div className="hero-progress">
        <div
          key={`${index}-${paused}`}
          className="hero-progress-fill"
          style={{ animationDuration: `${AUTOPLAY_MS}ms`, animationPlayState: paused ? 'paused' : 'running' }}
        />
      </div>
    </div>
  )
}

// Owned by: Person D — hero rotates through live inventory instead of a
// single static banner image; arrows + timed autoplay move it along, and
// the copy block relocates to a new quadrant every time the car changes.
function HeroCarousel({ cars, goto, openModal }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = cars.length

  const goToSlide = (i) => setIndex(((i % total) + total) % total)
  const prev = () => goToSlide(index - 1)
  const next = () => goToSlide(index + 1)

  useEffect(() => {
    if (paused || total <= 1) return
    const t = setTimeout(() => setIndex(i => (i + 1) % total), AUTOPLAY_MS)
    return () => clearTimeout(t)
  }, [index, paused, total])

  if (total === 0) return null
  const current = cars[index]

  return (
    <section
      className="home-hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="hero-slides">
        {cars.map((car, i) => (
          <div
            key={car.id}
            className={`hero-slide ${i === index ? 'active' : ''}`}
            style={{ backgroundImage: `url('${(car.images && (car.images[1] || car.images[0])) || car.img}')` }}
          />
        ))}
      </div>
      <div className="hero-scrim" />

      <span className="hero-corner tl" aria-hidden="true" />
      <span className="hero-corner tr" aria-hidden="true" />
      <span className="hero-corner bl" aria-hidden="true" />
      <span className="hero-corner br" aria-hidden="true" />

      <HeroReadout index={index} total={total} paused={paused} />

      {total > 1 && (
        <>
          <button className="hero-arrow prev" onClick={prev} aria-label="Previous car">‹</button>
          <button className="hero-arrow next" onClick={next} aria-label="Next car">›</button>
        </>
      )}

      <div className={`hero-textblock ${HERO_POSITIONS[index % HERO_POSITIONS.length]}`} key={index}>
        <span className="tag">{HERO_TAGS[index % HERO_TAGS.length]}</span>
        <h1 className="display">Own the {current.name}.</h1>
        <p>
          {current.year} · {current.type} · 0–60 in {current.performance.zeroToSixty}s · from {fmtPrice(current.price)}
        </p>
        <div className="home-hero-ctas">
          <button className="btn-primary" onClick={() => goto('new')}>Browse New Cars</button>
          <button className="btn-ghost" onClick={() => goto('used')}>Browse Used Cars</button>
        </div>
        <button className="hero-explore" onClick={() => openModal(current.id)}>
          Explore this {current.name} →
        </button>
      </div>

      {total > 1 && (
        <div className="hero-bars">
          {cars.map((car, i) => (
            <button
              key={car.id}
              className={`hero-bar ${i === index ? 'active' : ''}`}
              onClick={() => goToSlide(i)}
              aria-label={`Show ${car.name}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}

// Speedometer geometry — a wider 260° sweep than Listing's compact sort
// dial (which uses 240°), so the two instruments read as different tools:
// this one is a dashboard gauge you glance at, that one is a control you turn.
const GAUGE_START = -130
const GAUGE_END = 130

function gPolar(cx, cy, r, angleDeg) {
  const rad = (angleDeg * Math.PI) / 180
  return { x: cx + r * Math.sin(rad), y: cy - r * Math.cos(rad) }
}

function gArc(cx, cy, r, startAngle, endAngle) {
  const start = gPolar(cx, cy, r, startAngle)
  const end = gPolar(cx, cy, r, endAngle)
  const largeArc = endAngle - startAngle > 180 ? 1 : 0
  return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${r} ${r} 0 ${largeArc} 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`
}

function valueToAngle(value, max) {
  const pct = Math.min(Math.max(value / max, 0), 1)
  return GAUGE_START + (GAUGE_END - GAUGE_START) * pct
}

// A real analog speedometer face — numbered ticks around the arc and a
// needle that sweeps in on mount, used for the homepage's instrument
// cluster. Distinct from Listing's small unlabeled sort dial: this one
// has printed numerals, a longer sweep, and a chrome gauge face.
function Speedometer({ value, max, label, unit = '', decimals = 0, ticks = 5, accent }) {
  const [live, setLive] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setLive(true), 320)
    return () => clearTimeout(t)
  }, [])

  const cx = 60, cy = 60, r = 46
  const angle = live ? valueToAngle(value, max) : GAUGE_START
  const tickVals = Array.from({ length: ticks + 1 }, (_, i) => (max / ticks) * i)
  const needleTip = gPolar(cx, cy, r - 12, 0)
  const shown = decimals ? Number(value).toFixed(decimals) : Math.round(live ? value : 0)
  const skyed = accent === 'sky'

  return (
    <div className="gauge">
      <div className="gauge-face-wrap">
        <svg viewBox="0 0 120 120" className="gauge-svg">
          <path d={gArc(cx, cy, r, GAUGE_START, GAUGE_END)} className="gauge-track" fill="none" />
          {tickVals.map((v, i) => {
            const a = valueToAngle(v, max)
            const p1 = gPolar(cx, cy, r - 7, a)
            const p2 = gPolar(cx, cy, r, a)
            const np = gPolar(cx, cy, r - 17, a)
            return (
              <g key={i}>
                <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} className="gauge-tick" />
                <text x={np.x} y={np.y + 3} textAnchor="middle" className={`gauge-ticknum mono ${skyed ? 'sky' : ''}`}>
                  {Math.round(v)}
                </text>
              </g>
            )
          })}
          <line
            x1={cx} y1={cy} x2={needleTip.x} y2={needleTip.y}
            className={`gauge-needle ${skyed ? 'sky' : ''}`}
            style={{ transform: `rotate(${angle}deg)`, transformOrigin: `${cx}px ${cy}px` }}
          />
          <circle cx={cx} cy={cy} r="5" className={`gauge-hub ${skyed ? 'sky' : ''}`} />
        </svg>
      </div>
      <div className={`gauge-readout mono ${skyed ? 'sky' : ''}`}>{shown}{unit}</div>
      <div className="gauge-label">{label}</div>
    </div>
  )
}

// Windshield-sticker offer card — taped corners, a torn perforation under
// the offer code, and a peeling bottom corner on hover. Deliberately built
// from paper/tape/adhesive, not chrome-and-needle like the instrument
// cluster a few hundred pixels above it, so the two sections don't read
// as the same instrument twice.
function OfferSticker({ offer, car, index, onView }) {
  return (
    <div className="offer-sticker" style={{ '--tilt': index % 2 ? '1.1deg' : '-1.2deg' }}>
      <span className="sticker-tape tape-l" aria-hidden="true" />
      <span className="sticker-tape tape-r" aria-hidden="true" />

      <div className="sticker-code mono">OFFER NO. {String(2400 + index * 37)}</div>
      <div className="sticker-perf" aria-hidden="true" />

      <div className="sticker-pct display">−{offer.pct}</div>
      <h3 className="sticker-title">{offer.title}</h3>
      <p className="sticker-desc">{offer.desc}</p>

      <div className="sticker-expiry mono">VALID THRU {offer.expiry}</div>

      {car && (
        <button className="sticker-link" onClick={() => onView(car.id)}>
          View {car.name} →
        </button>
      )}

      <span className="sticker-peel" aria-hidden="true" />
    </div>
  )
}

// Owned by: Person D
export default function Home({ goto, openModal, showToast }) {
  const heroCars = CARS.slice(0, Math.min(5, CARS.length))
  const featured = CARS.slice(0, 6)
  const topOffers = OFFERS.slice(0, 2)
  const branches = new Set(CARS.map(c => c.availability.branch)).size
  const avgRating = (CARS.reduce((s, c) => s + c.rating.stars, 0) / CARS.length).toFixed(1)

  return (
    <>
      <HeroCarousel cars={heroCars} goto={goto} openModal={openModal} />

      <Reveal variant="scale" as="section" className="instrument-cluster" aria-label="Dealership stats">
        <span className="cluster-stitch" aria-hidden="true" />
        <span className="cluster-mount l" aria-hidden="true" />
        <span className="cluster-mount r" aria-hidden="true" />
        <Speedometer value={CARS.length} max={20} ticks={4} label="Cars in stock" />
        <span className="cluster-divider" aria-hidden="true" />
        <Speedometer value={branches} max={5} ticks={5} label="Showroom branches" />
        <span className="cluster-divider" aria-hidden="true" />
        <Speedometer value={parseFloat(avgRating)} max={5} ticks={5} decimals={1} accent="sky" label="Avg. buyer rating" />
        <span className="cluster-divider" aria-hidden="true" />
        <Speedometer value={48} max={72} ticks={6} unit="h" label="Avg. delivery time" />
      </Reveal>

      <section className="section">
        <Reveal variant="up">
          <div className="section-head">
            <div>
              <span className="tag">HAND-PICKED</span>
              <h2 className="display">Featured Inventory</h2>
            </div>
            <button className="view-all" onClick={() => goto('new')}>View All →</button>
          </div>
        </Reveal>
        <div className="car-grid">
          {featured.map((car, i) => (
            <Reveal variant="up" delay={(i % 3) * 90} key={car.id}>
              <CarCard car={car} onOpen={openModal} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section brand-strip-section">
        <Reveal variant="up">
          <div className="section-head">
            <div>
              <span className="tag">THE MARQUES WE CARRY</span>
              <h2 className="display">Shop by Brand</h2>
            </div>
            <button className="view-all" onClick={() => goto('brands')}>View All →</button>
          </div>
        </Reveal>
        <Reveal variant="scale">
          <div className="brand-marquee">
            <div className="brand-marquee-track">
              {[...BRANDS, ...BRANDS].map((b, i) => (
                <button key={b + i} className="brand-chip" onClick={() => goto('brands')}>{b}</button>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section">
        <Reveal variant="up">
          <div className="section-head">
            <div>
              <span className="tag">LIMITED TIME</span>
              <h2 className="display">Current Offers</h2>
            </div>
            <button className="view-all" onClick={() => goto('offers')}>View All →</button>
          </div>
        </Reveal>
        <div className="offer-grid">
          {topOffers.map((o, i) => {
            const car = CARS.find(c => c.id === o.carId)
            return (
              <Reveal variant={i % 2 ? 'right' : 'left'} delay={i * 90} key={o.id}>
                <OfferSticker offer={o} car={car} index={i} onView={openModal} />
              </Reveal>
            )
          })}
        </div>
      </section>

      <Testimonials />

      <FAQ />

      <section className="home-cta">
        <Reveal variant="scale">
          <div className="home-cta-inner">
            <h2 className="display">Ready to drive away today?</h2>
            <p>Book a test drive at any of our showrooms, or send us your questions.</p>
            <div className="home-hero-ctas">
              <button className="btn-primary" onClick={() => { showToast('Redirecting you to book a test drive…'); goto('contact') }}>
                Book a Test Drive
              </button>
              <button className="btn-ghost dark" onClick={() => goto('queries')}>Ask a Question</button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
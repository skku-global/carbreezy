// Brands.jsx
import { useState, useMemo } from 'react'
import '../styles/brands.css'
import '../styles/listing.css'
import { CARS, BRANDS } from '../data/cars'
import CarCard from '../components/CarCard'

// FM-dial metaphor for brand selection — turns "pick a brand" into "tune
// a station". Deliberately a horizontal strip rather than a circular
// gauge, so it reads as a different instrument than Home's speedometers
// and Listing's sort dial, even though it shares the same chrome-and-amber
// vocabulary.
const FREQ_MIN = 88.1
const FREQ_MAX = 107.9

function freqFor(index, total) {
  if (total <= 1) return FREQ_MIN
  return FREQ_MIN + ((FREQ_MAX - FREQ_MIN) * index) / (total - 1)
}

function TunerStrip({ index, total, label }) {
  const pct = total <= 1 ? 0 : (index / (total - 1)) * 100
  const freq = freqFor(index, total).toFixed(1)
  // Fixed tick count independent of brand count, so the scale always
  // reads like a real radio dial rather than one tick per brand.
  const ticks = Array.from({ length: 23 }, (_, i) => i * (100 / 22))

  return (
    <div className="tuner-strip-wrap">
      <div className="tuner-strip">
        <div className="tuner-scale">
          {ticks.map((t, i) => (
            <span key={i} className={`tuner-tick ${i % 4 === 0 ? 'major' : ''}`} style={{ left: `${t}%` }} />
          ))}
        </div>
        <div className="tuner-needle" style={{ left: `${pct}%` }} />
      </div>
      <div className="tuner-readout mono">
        <span className="tuner-freq">{freq}</span>
        <span className="tuner-unit">FM</span>
        <span className="tuner-station">— {label}</span>
      </div>
    </div>
  )
}

// Equalizer-style bar meter standing in for the result count — reads as
// "signal strength" for whichever station (brand) is currently tuned in.
function SignalMeter({ count, max }) {
  const bars = 6
  const lit = count === 0 ? 0 : Math.max(1, Math.round((Math.min(count, max) / max) * bars))
  return (
    <div className="signal-meter" aria-hidden="true">
      {Array.from({ length: bars }, (_, i) => (
        <span key={i} className={`signal-bar ${i < lit ? 'lit' : ''}`} style={{ height: `${8 + i * 5}px` }} />
      ))}
    </div>
  )
}

// Owned by: Person D
// Signature: "Tuner Console" — an FM-dial brand selector with numbered
// presets and a signal-strength result meter, styled as one head unit.
export default function Brands({ openModal }) {
  const [brand, setBrand] = useState('All')
  const stations = ['All', ...BRANDS]
  const index = Math.max(stations.indexOf(brand), 0)
  const maxCount = CARS.length

  const cars = useMemo(
    () => (brand === 'All' ? CARS : CARS.filter(c => c.brand === brand)),
    [brand]
  )

  return (
    <>
      <div className="page-hero brands-hero" style={{ backgroundImage: `url('${CARS[4].images[0]}')` }}>
        <svg className="antenna-deco" viewBox="0 0 200 200" aria-hidden="true">
          <line x1="168" y1="188" x2="168" y2="38" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
          <circle cx="168" cy="32" r="3" fill="var(--amber)" />
          <path d="M138 58 Q168 16 198 58" fill="none" stroke="rgba(92,201,224,0.35)" strokeWidth="1.5" />
          <path d="M122 80 Q168 4 214 80" fill="none" stroke="rgba(92,201,224,0.22)" strokeWidth="1.5" />
        </svg>
        <div className="page-hero-inner">
          <span className="tag">THE MARQUES WE CARRY</span>
          <h2 className="display">Shop by Brand</h2>
          <p>Twelve marques, one showroom network. Tune in a brand to see everything currently in stock.</p>
        </div>
      </div>

      <div className="section">
        <div className="tuner-console">
          <span className="bolt tl" aria-hidden="true" />
          <span className="bolt tr" aria-hidden="true" />
          <span className="bolt bl" aria-hidden="true" />
          <span className="bolt br" aria-hidden="true" />

          <span className="panel-label mono">Now tuning</span>
          <TunerStrip index={index} total={stations.length} label={brand === 'All' ? 'All Brands' : brand} />

          <div className="preset-row">
            {stations.map((b, i) => (
              <button
                key={b}
                className={`preset-btn ${brand === b ? 'active' : ''}`}
                onClick={() => setBrand(b)}
                aria-pressed={brand === b}
              >
                <span className="preset-num mono">{String(i).padStart(2, '0')}</span>
                <span className="preset-led" aria-hidden="true" />
                <span className="preset-name">{b === 'All' ? 'All' : b}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="brand-result-row">
          <span className="result-count mono">{cars.length} car{cars.length === 1 ? '' : 's'} found</span>
          <SignalMeter count={cars.length} max={maxCount} />
        </div>

        <div className="car-grid">
          {cars.length > 0 ? (
            cars.map(car => <CarCard key={car.id} car={car} onOpen={openModal} />)
          ) : (
            <div className="empty-state warning-cluster">
              <span className="warning-icon" aria-hidden="true">
                <svg viewBox="0 0 40 40">
                  <path d="M20 6 L36 34 L4 34 Z" fill="none" stroke="var(--amber)" strokeWidth="2.5" strokeLinejoin="round" />
                  <line x1="20" y1="16" x2="20" y2="24" stroke="var(--amber)" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="20" cy="28.5" r="1.6" fill="var(--amber)" />
                </svg>
              </span>
              <div className="display">Nothing in stock for this brand</div>
              <p>Check back soon, or tune in another marque.</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
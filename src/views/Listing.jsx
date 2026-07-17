import { useState, useMemo, useEffect, useRef } from 'react'
import '../styles/listing.css'
import { CARS, TYPES, fmtPrice } from '../data/cars'
import CarCard from '../components/CarCard'

const HERO_AUTOPLAY_MS = 5000

const SORTS = [
  ['default', 'Featured'],
  ['price-asc', 'Price: Low–High'],
  ['price-desc', 'Price: High–Low'],
  ['year-desc', 'Newest Year'],
]

// Trip-odometer readout for the result count — each digit rolls in when
// the filtered total changes, the way a real odometer wheel clicks over.
function OdoReadout({ count }) {
  const digits = String(count).padStart(3, '0').split('')
  return (
    <div className="odo-readout">
      <span className="odo-label mono">CARS IN VIEW</span>
      <div className="odo-digits">
        {digits.map((d, i) => (
          <span className="odo-cell" key={i}>
            <span className="odo-digit mono" key={`${i}-${d}`}>{d}</span>
          </span>
        ))}
      </div>
      <span className="odo-suffix mono">{count === 1 ? 'MATCH' : 'MATCHES'}</span>
    </div>
  )
}

// Speedometer geometry helpers — angle 0 points to 12 o'clock, positive
// angles sweep clockwise, matching how a real gauge is laid out.
function polarPoint(cx, cy, r, angleDeg) {
  const rad = (angleDeg * Math.PI) / 180
  return { x: cx + r * Math.sin(rad), y: cy - r * Math.cos(rad) }
}

function arcPath(cx, cy, r, startAngle, endAngle) {
  const start = polarPoint(cx, cy, r, startAngle)
  const end = polarPoint(cx, cy, r, endAngle)
  const largeArc = endAngle - startAngle > 180 ? 1 : 0
  return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${r} ${r} 0 ${largeArc} 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`
}

const GAUGE_START = -120
const GAUGE_END = 120

// Real speedometer gauge for the sort control — one major tick per sort
// option, minor ticks subdividing between them, and a needle that swings
// over with a bounce (like a throttle blip) rather than just tweening.
function SortDial({ index, total }) {
  const cx = 28, cy = 28
  const trackR = 24
  const majorInnerR = 17
  const minorInnerR = 19.5
  const needleLen = 18

  const majorAngles = Array.from({ length: total }, (_, i) =>
    GAUGE_START + ((GAUGE_END - GAUGE_START) * i) / Math.max(total - 1, 1)
  )

  const minorAngles = []
  for (let i = 0; i < majorAngles.length - 1; i++) {
    const a = majorAngles[i], b = majorAngles[i + 1]
    minorAngles.push(a + (b - a) / 3, a + (2 * (b - a)) / 3)
  }

  const needleAngle = majorAngles[Math.min(index, majorAngles.length - 1)] ?? GAUGE_START
  const needleTip = polarPoint(cx, cy, needleLen, 0)

  return (
    <div className="sort-dial" aria-hidden="true">
      <svg width="56" height="56" viewBox="0 0 56 56">
        <path className="dial-track" d={arcPath(cx, cy, trackR, GAUGE_START, GAUGE_END)} fill="none" strokeWidth="3" />
        <path className="dial-redline" d={arcPath(cx, cy, trackR, GAUGE_END - 40, GAUGE_END)} fill="none" strokeWidth="3" />

        {minorAngles.map((a, i) => {
          const p1 = polarPoint(cx, cy, minorInnerR, a)
          const p2 = polarPoint(cx, cy, trackR, a)
          return <line key={`min-${i}`} className="dial-tick minor" x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} />
        })}

        {majorAngles.map((a, i) => {
          const p1 = polarPoint(cx, cy, majorInnerR, a)
          const p2 = polarPoint(cx, cy, trackR, a)
          const lit = a <= needleAngle + 0.01
          return (
            <line
              key={`maj-${i}`}
              className={`dial-tick major ${lit ? 'lit' : ''}`}
              x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
            />
          )
        })}

        <line
          className="dial-needle"
          x1={cx} y1={cy} x2={needleTip.x} y2={needleTip.y}
          style={{ transform: `rotate(${needleAngle}deg)`, transformOrigin: `${cx}px ${cy}px` }}
        />
        <circle className="dial-hub" cx={cx} cy={cy} r="4.5" strokeWidth="1.5" />
      </svg>
    </div>
  )
}

// Custom sort control — an LCD-style trigger button that opens a floating
// option panel instead of a native <select>, so the dropdown itself can
// carry the gauge-cluster look (readout font, amber selection glow,
// per-row checkmark) rather than falling back to the browser's own menu.
function SortPopover({ sort, onChange }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const current = SORTS.find(([k]) => k === sort) || SORTS[0]

  useEffect(() => {
    if (!open) return
    const onDocClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const pick = (key) => {
    onChange(key)
    setOpen(false)
  }

  return (
    <div className="sort-popover" ref={rootRef}>
      <button
        type="button"
        className={`sort-trigger ${open ? 'open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="sort-trigger-label mono">{current[1]}</span>
        <svg className="sort-chevron" viewBox="0 0 12 8" aria-hidden="true">
          <path d="M1 1.5 L6 6.5 L11 1.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul className="sort-menu" role="listbox" aria-label="Sort inventory">
          {SORTS.map(([key, label]) => (
            <li key={key} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={key === sort}
                className={`sort-option ${key === sort ? 'active' : ''}`}
                onClick={() => pick(key)}
              >
                <span className="sort-option-led" aria-hidden="true" />
                {label}
                {key === sort && (
                  <svg className="sort-check" viewBox="0 0 14 11" aria-hidden="true">
                    <path d="M1 5.5 L5 9.5 L13 1.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// Rotating car-photo hero for the listing pages — distinct from the Home
// hero's crossfade-and-relocate treatment: a fixed text position, a
// targeting scanline sweeping over the photo, and a spec ticket that
// swaps per car like a windshield ID card, with dot nav instead of arrows.
function ListingHero({ cars, tag, title, blurb, openModal }) {
  const slides = cars.slice(0, 5)
  const total = slides.length
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (total <= 1) return
    const t = setTimeout(() => setIndex(i => (i + 1) % total), HERO_AUTOPLAY_MS)
    return () => clearTimeout(t)
  }, [index, total])

  const current = slides[Math.min(index, total - 1)]

  return (
    <div className="page-hero listing-hero">
      <div className="listing-hero-slides">
        {slides.map((car, i) => (
          <div
            key={car.id}
            className={`listing-hero-slide ${i === index ? 'active' : ''}`}
            style={{ backgroundImage: `url('${car.images[2] || car.img}')` }}
          />
        ))}
      </div>

      <span className="listing-scan" aria-hidden="true" />
      <span className="rivet tl" aria-hidden="true" />
      <span className="rivet tr" aria-hidden="true" />
      <svg className="tach-deco" viewBox="0 0 200 200" aria-hidden="true">
        <circle cx="100" cy="100" r="88" fill="none" stroke="rgba(242,169,59,0.4)" strokeWidth="1.5" strokeDasharray="1.5 8" />
        <circle cx="100" cy="100" r="68" fill="none" stroke="rgba(92,201,224,0.28)" strokeWidth="1" />
        <circle cx="100" cy="100" r="3" fill="rgba(242,169,59,0.5)" />
      </svg>

      <div className="page-hero-inner listing-hero-inner">
        <span className="tag">{tag}</span>
        <h2 className="display">{title}</h2>
        <p>{blurb}</p>

        {current && (
          <div className="listing-spec-ticket" key={current.id}>
            <div className="ticket-row top">
              <span className="ticket-name display">{current.name}</span>
              <span className="ticket-idx mono">
                {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
            </div>
            <div className="ticket-specs mono">
              <span><b>{current.performance.hp}</b> hp</span>
              <span><b>{current.performance.zeroToSixty}s</b> 0–60</span>
              <span><b>{fmtPrice(current.price)}</b></span>
            </div>
            <button className="ticket-btn" onClick={() => openModal(current.id)}>View Details →</button>
          </div>
        )}
      </div>

      {total > 1 && (
        <div className="listing-hero-dots">
          {slides.map((car, i) => (
            <button
              key={car.id}
              className={`listing-dot ${i === index ? 'active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Show ${car.name}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Owned by: Person B
export default function Listing({ condition, title, tag, blurb, openModal }) {
  const [type, setType] = useState('All')
  const [sort, setSort] = useState('default')

  const cars = useMemo(() => {
    let list = CARS.filter(c => c.condition === condition)
    if (type !== 'All') list = list.filter(c => c.type === type)
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'year-desc') list = [...list].sort((a, b) => b.year - a.year)
    return list
  }, [type, sort, condition])

  const typeIndex = Math.max(TYPES.indexOf(type), 0)
  const sortIndex = Math.max(SORTS.findIndex(([k]) => k === sort), 0)

  const heroCars = useMemo(() => CARS.filter(c => c.condition === condition), [condition])

  return (
    <>
      <ListingHero cars={heroCars} tag={tag} title={title} blurb={blurb} openModal={openModal} />

      <div className="section">
        <div className="ignition-panel">
          <span className="bolt tl" aria-hidden="true" />
          <span className="bolt tr" aria-hidden="true" />
          <span className="bolt bl" aria-hidden="true" />
          <span className="bolt br" aria-hidden="true" />

          <div className="gear-block">
            <span className="panel-label mono">Type select</span>
            <div className="gear-gate">
              <span
                className="gear-slider"
                style={{ width: `${100 / TYPES.length}%`, transform: `translateX(${typeIndex * 100}%)` }}
              />
              {TYPES.map(t => (
                <button
                  key={t}
                  className={`gear-btn ${type === t ? 'active' : ''}`}
                  onClick={() => setType(t)}
                  aria-pressed={type === t}
                >
                  <span className="gear-led" aria-hidden="true" />
                  {t}
                </button>
              ))}
            </div>
          </div>

          <span className="panel-divider" aria-hidden="true" />

          <div className="sort-block">
            <span className="panel-label mono">Sort</span>
            <div className="sort-control">
              <SortDial index={sortIndex} total={SORTS.length} />
              <SortPopover sort={sort} onChange={setSort} />
            </div>
          </div>
        </div>

        <OdoReadout count={cars.length} />

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
              <div className="display">No cars match this filter</div>
              <p>Try a different type, or clear the filter to see everything in stock.</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
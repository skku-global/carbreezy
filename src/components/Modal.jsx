import '../styles/modal.css'
import { useState, useEffect } from 'react'
import { fmtPrice, CARS } from '../data/cars'

const TABS = [
  ['internal', 'Internal Spec'],
  ['external', 'External'],
  ['engine', 'Engine'],
  ['dimensions', 'Dimensions'],
]

// Circular power gauge for the Engine tab — the same dial device used on
// the Home stat panel, so the whole site reads as one instrument cluster.
function PowerDial({ hp, maxHp = 1600 }) {
  const r = 30
  const circumference = 2 * Math.PI * r
  const pct = Math.min(hp / maxHp, 1)
  const offset = circumference * (1 - pct)
  return (
    <div className="dial engine-dial">
      <svg width="66" height="66" viewBox="0 0 66 66">
        <circle cx="33" cy="33" r={r} fill="none" stroke="rgba(16,21,28,0.08)" strokeWidth="6" />
        <circle
          cx="33" cy="33" r={r} fill="none" stroke="var(--sky)" strokeWidth="6"
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
        />
      </svg>
      <div className="dial-num">{hp}</div>
    </div>
  )
}

// Owned by: Person C
export default function Modal({ car, onClose, onBuy, onOpenCar }) {
  const [imgIdx, setImgIdx] = useState(0)
  const [tab, setTab] = useState('internal')

  useEffect(() => { setImgIdx(0); setTab('internal') }, [car])

  if (!car) return null

  const prev = () => setImgIdx(i => (i - 1 + car.images.length) % car.images.length)
  const next = () => setImgIdx(i => (i + 1) % car.images.length)

  const similarCars = (car.similarIds || []).map(id => CARS.find(c => c.id === id)).filter(Boolean)

  return (
    <div className="modal-overlay open" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="modal-gallery">
          <div className="modal-photo">
            <div className="modal-photo-img" style={{ backgroundImage: `url('${car.images[imgIdx]}')` }} />
            <div className="modal-scrim" />

            <span className="modal-corner tl" aria-hidden="true" />
            <span className="modal-corner tr" aria-hidden="true" />
            <span className="modal-corner bl" aria-hidden="true" />
            <span className="modal-corner br" aria-hidden="true" />

            <div className="modal-readout mono">
              <span className="idx">{String(imgIdx + 1).padStart(2, '0')}</span>
              <span className="sep">/</span>
              <span className="total">{String(car.images.length).padStart(2, '0')}</span>
            </div>

            {car.images.length > 1 && (
              <>
                <button className="modal-arrow prev" onClick={prev} aria-label="Previous photo">‹</button>
                <button className="modal-arrow next" onClick={next} aria-label="Next photo">›</button>
              </>
            )}

            {car.images.length > 1 && (
              <div className="modal-bars">
                {car.images.map((_, i) => (
                  <button
                    key={i}
                    className={`modal-bar ${i === imgIdx ? 'active' : ''}`}
                    onClick={() => setImgIdx(i)}
                    aria-label={`Photo ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="modal-content">
          <div className="modal-info">
            <div>
              <span className="tag">{car.year} MODEL YEAR</span>
              <h2 className="display">{car.name}</h2>
              <div className="meta">{car.type} · {car.condition} · {car.mileage.toLocaleString()} km</div>
              <div className="meta rating">★ {car.rating.stars} <span>({car.rating.reviews} reviews)</span></div>
            </div>
            <div className="modal-price-block">
              <div className="modal-price mono">{fmtPrice(car.price)}</div>
              <div className="modal-financing mono">from {fmtPrice(car.financing.estimatedMonthly)}/mo</div>
              <button className="btn-primary modal-buy-btn" onClick={() => onBuy(car)}>Reserve This Car</button>
            </div>
          </div>

          <div className="modal-tabs">
            {TABS.map(([key, label]) => (
              <button
                key={key}
                className={`modal-tab-btn ${tab === key ? 'active' : ''} ${key === 'engine' ? 'tab-engine' : ''}`}
                onClick={() => setTab(key)}
              >
                <span className="tab-mark" aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>

          <div className="modal-tab-content">
            {tab === 'engine' ? (
              <div className="engine-panel">
                <div className="engine-dial-wrap">
                  <PowerDial hp={car.performance.hp} />
                  <div className="dial-label">
                    <div className="k">{car.performance.hp} hp</div>
                    <div className="v">{car.performance.torque} Nm torque</div>
                  </div>
                </div>
                <div className="engine-stats">
                  <div><b>{car.performance.zeroToSixty}s</b><span>0–60 km/h</span></div>
                  <div><b>{car.performance.topSpeed} km/h</b><span>Top speed</span></div>
                </div>
                <dl>
                  {car.specs.engine.map(([k, v]) => (
                    <>
                      <dt key={k + '-k'}>{k}</dt>
                      <dd key={k + '-v'}>{v}</dd>
                    </>
                  ))}
                </dl>
              </div>
            ) : (
              <dl>
                {car.specs[tab].map(([k, v]) => (
                  <>
                    <dt key={k + '-k'}>{k}</dt>
                    <dd key={k + '-v'}>{v}</dd>
                  </>
                ))}
              </dl>
            )}
          </div>

          {car.sellerNote && (
            <div className="seller-note">
              <span className="ic">Dealer's note</span>
              <p>{car.sellerNote}</p>
            </div>
          )}

          {similarCars.length > 0 && (
            <div className="similar-cars">
              <h4>Similar Cars</h4>
              <div className="similar-row">
                {similarCars.map(sc => (
                  <div key={sc.id} className="similar-item" onClick={() => onOpenCar(sc.id)}>
                    <div className="similar-photo" style={{ backgroundImage: `url('${sc.img}')` }} />
                    <div className="similar-name">{sc.name}</div>
                    <div className="similar-price mono">{fmtPrice(sc.price)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
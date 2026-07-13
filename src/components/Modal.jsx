import '../styles/modal.css'
import { useState, useEffect } from 'react'
import { fmtPrice } from '../data/cars'

const TABS = [
  ['internal', 'Internal Spec'],
  ['external', 'External'],
  ['engine', 'Engine'],
  ['dimensions', 'Dimensions'],
]

// Owned by: Person C
export default function Modal({ car, onClose }) {
  const [imgIdx, setImgIdx] = useState(0)
  const [tab, setTab] = useState('internal')

  useEffect(() => { setImgIdx(0); setTab('internal') }, [car])

  if (!car) return null

  const prev = () => setImgIdx(i => (i - 1 + car.images.length) % car.images.length)
  const next = () => setImgIdx(i => (i + 1) % car.images.length)

  return (
    <div className="modal-overlay open" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-photo">
          <div className="modal-photo-img" style={{ backgroundImage: `url('${car.images[imgIdx]}')` }} />
          <button className="modal-arrow prev" onClick={prev}>‹</button>
          <button className="modal-arrow next" onClick={next}>›</button>
          <div className="modal-dots">
            {car.images.map((_, i) => (
              <span key={i} className={i === imgIdx ? 'active' : ''} onClick={() => setImgIdx(i)} />
            ))}
          </div>
        </div>
        <div className="modal-info">
          <div>
            <h2 className="display">{car.name}</h2>
            <div className="meta">{car.year} · {car.type} · {car.condition} · {car.mileage.toLocaleString()} km</div>
          </div>
          <div className="modal-price mono">{fmtPrice(car.price)}</div>
        </div>
        <div className="modal-tabs">
          {TABS.map(([key, label]) => (
            <button key={key} className={`modal-tab-btn ${tab === key ? 'active' : ''}`} onClick={() => setTab(key)}>
              {label}
            </button>
          ))}
        </div>
        <div className="modal-tab-content">
          <dl>
            {car.specs[tab].map(([k, v]) => (
              <>
                <dt key={k + '-k'}>{k}</dt>
                <dd key={k + '-v'}>{v}</dd>
              </>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

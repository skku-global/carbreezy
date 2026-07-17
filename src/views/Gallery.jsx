import { useState, useMemo } from 'react'
import '../styles/gallery.css'
import { CARS, TYPES } from '../data/cars'

// Owned by: Person C
// Signature: "Contact Sheet" — the showroom floor as a roll of exposed
// film. Sprocket-perforated hero, frames carry a real roll/frame code
// (car position on the roll + which angle, A/B) instead of a plain
// index, and the lightbox becomes a light-table loupe with a frame
// counter. Distinct from Home's gauges, Listing's ignition panel, and
// Contact's stamped ID plate — this page is paper-and-emulsion, not metal.
export default function Gallery() {
  const [type, setType] = useState('All')
  const [lightboxIdx, setLightboxIdx] = useState(null)

  const frames = useMemo(() => {
    const list = type === 'All' ? CARS : CARS.filter(c => c.type === type)
    // two photos per car keeps the grid rich without listing every angle
    return list.flatMap((c, ci) => c.images.slice(0, 2).map((img, i) => ({
      key: `${c.id}-${i}`,
      img,
      name: c.name,
      code: `${String(ci + 1).padStart(3, '0')}${i === 0 ? 'A' : 'B'}`,
    })))
  }, [type])

  const total = frames.length
  const openAt = (i) => setLightboxIdx(i)
  const close = () => setLightboxIdx(null)
  const step = (delta) => setLightboxIdx(i => ((i + delta) % total + total) % total)

  const current = lightboxIdx !== null ? frames[lightboxIdx] : null

  return (
    <>
      <div className="page-hero gallery-hero">
        <span className="sprocket-row top" aria-hidden="true">
          {Array.from({ length: 14 }).map((_, i) => <span className="sprocket" key={i} />)}
        </span>
        <div className="page-hero-inner">
          <span className="tag">ROLL 01 · EXPOSED</span>
          <h2 className="display">Gallery</h2>
          <p>Every car on the floor, shot frame by frame. Tap a frame to load it on the light table.</p>
        </div>
        <span className="sprocket-row bottom" aria-hidden="true">
          {Array.from({ length: 14 }).map((_, i) => <span className="sprocket" key={i} />)}
        </span>
      </div>

      <div className="section">
        <div className="reel-tabs">
          {TYPES.map(t => (
            <button key={t} className={`reel-tab ${type === t ? 'active' : ''}`} onClick={() => setType(t)}>
              <span className="reel-tab-hole" aria-hidden="true" />
              {t}
            </button>
          ))}
        </div>

        <div className="contact-sheet">
          {frames.map((f, i) => (
            <div key={f.key} className="frame" onClick={() => openAt(i)}>
              <div className="frame-photo" style={{ backgroundImage: `url('${f.img}')` }}>
                <span className="frame-corner tl" aria-hidden="true" />
                <span className="frame-corner tr" aria-hidden="true" />
                <span className="frame-corner bl" aria-hidden="true" />
                <span className="frame-corner br" aria-hidden="true" />
                <span className="frame-code mono">{f.code}</span>
              </div>
              <span className="frame-label">{f.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={`loupe ${current ? 'open' : ''}`} onClick={close}>
        <button className="loupe-close" onClick={close} aria-label="Close">✕</button>
        {current && total > 1 && (
          <>
            <button className="loupe-arrow prev" onClick={(e) => { e.stopPropagation(); step(-1) }} aria-label="Previous frame">‹</button>
            <button className="loupe-arrow next" onClick={(e) => { e.stopPropagation(); step(1) }} aria-label="Next frame">›</button>
          </>
        )}
        {current && (
          <div className="loupe-frame" onClick={(e) => e.stopPropagation()}>
            <img src={current.img} alt={current.name} />
            <div className="loupe-caption mono">
              <span className="loupe-code">{current.code}</span>
              <span className="loupe-name">{current.name}</span>
              <span className="loupe-counter">{String(lightboxIdx + 1).padStart(3, '0')} / {String(total).padStart(3, '0')}</span>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
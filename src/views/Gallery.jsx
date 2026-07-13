import '../styles/gallery.css'
import { useState, useMemo } from 'react'
import { CARS, BRANDS } from '../data/cars'

export default function Gallery() {
  const [brand, setBrand] = useState('All')
  const [lightbox, setLightbox] = useState(null)
  const list = useMemo(() => brand === 'All' ? CARS : CARS.filter(c => c.brand === brand), [brand])

  return (
    <>
      <div className="page-hero" style={{ backgroundImage: "url('/images/hero/gallery.jpg')" }}>
        <div className="page-hero-inner"><span className="tag">SHOWCASE</span><h2 className="display">Gallery</h2><p>A closer look at what's rolling through the lot.</p></div>
      </div>
      <div className="section">
        <div className="gallery-filter">
          <button className={`chip ${brand === 'All' ? 'active' : ''}`} onClick={() => setBrand('All')}>All</button>
          {BRANDS.map(b => (
            <button key={b} className={`chip ${brand === b ? 'active' : ''}`} onClick={() => setBrand(b)}>{b}</button>
          ))}
        </div>
        <div className="gallery-grid">
          {list.map(c => (
            <div key={c.id} className="gallery-item" style={{ backgroundImage: `url('${c.img}')` }} onClick={() => setLightbox(c.img)}>
              <span className="label mono">{c.name}</span>
            </div>
          ))}
        </div>
      </div>

      {lightbox && (
        <div className="lightbox open" onClick={e => e.target === e.currentTarget && setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
          <img src={lightbox} alt="" />
        </div>
      )}
    </>
  )
}

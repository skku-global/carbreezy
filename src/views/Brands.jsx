import '../styles/brands.css'
import { useState, useMemo } from 'react'
import { CARS, BRANDS } from '../data/cars'
import CarCard from '../components/CarCard'

export default function Brands({ openModal }) {
  const [brand, setBrand] = useState('All')
  const list = useMemo(() => brand === 'All' ? CARS : CARS.filter(c => c.brand === brand), [brand])

  return (
    <>
      <div className="page-hero" style={{ backgroundImage: "url('/images/hero/brands.jpg')" }}>
        <div className="page-hero-inner"><span className="tag">SHOP BY MANUFACTURER</span><h2 className="display">Brands</h2><p>Every listing, sorted by the badge on the hood.</p></div>
      </div>
      <div className="section">
        <div className="brand-select-row">
          <button className={`brand-btn ${brand === 'All' ? 'active' : ''}`} onClick={() => setBrand('All')}>All Brands</button>
          {BRANDS.map(b => (
            <button key={b} className={`brand-btn ${brand === b ? 'active' : ''}`} onClick={() => setBrand(b)}>{b}</button>
          ))}
        </div>
        <div className="result-count">{list.length} result{list.length !== 1 ? 's' : ''}</div>
        <div className="car-grid">
          {list.length ? list.map(c => <CarCard key={c.id} car={c} onOpen={openModal} />) : (
            <div className="empty-state">
              <div className="display">No cars for this brand yet</div>
              Check back soon or browse all inventory.
            </div>
          )}
        </div>
      </div>
    </>
  )
}

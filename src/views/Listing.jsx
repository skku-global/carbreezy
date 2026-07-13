import '../styles/listing.css'
import { useState, useMemo } from 'react'
import { CARS, TYPES } from '../data/cars'
import CarCard from '../components/CarCard'

export default function Listing({ condition, title, tag, blurb, openModal }) {
  const [type, setType] = useState('All')
  const [sort, setSort] = useState('default')

  const list = useMemo(() => {
    let l = CARS.filter(c => c.condition === condition && (type === 'All' || c.type === type))
    if (sort === 'price-asc') l = [...l].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') l = [...l].sort((a, b) => b.price - a.price)
    if (sort === 'newest') l = [...l].sort((a, b) => b.year - a.year)
    return l
  }, [condition, type, sort])

  const heroImg = condition === 'new' ? '/images/hero/new.jpg' : '/images/hero/used.jpg'

  return (
    <>
      <div className="page-hero" style={{ backgroundImage: `url('${heroImg}')` }}>
        <div className="page-hero-inner"><span className="tag">{tag}</span><h2 className="display">{title}</h2><p>{blurb}</p></div>
      </div>
      <div className="section">
        <div className="filter-bar">
          <div className="chip-row">
            {TYPES.map(t => (
              <button key={t} className={`chip ${type === t ? 'active' : ''}`} onClick={() => setType(t)}>{t}</button>
            ))}
          </div>
          <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="default">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
        </div>
        <div className="result-count">{list.length} result{list.length !== 1 ? 's' : ''}</div>
        <div className="car-grid">
          {list.length ? list.map(c => <CarCard key={c.id} car={c} onOpen={openModal} />) : (
            <div className="empty-state">
              <div className="display">No cars match those filters</div>
              Try a different body type or clear your filters.
            </div>
          )}
        </div>
      </div>
    </>
  )
}

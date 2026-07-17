import '../styles/carCard.css'
import { fmtPrice } from '../data/cars'

// Owned by: Person B — reused by every view (Home, New, Used, Brands, Offers)
export default function CarCard({ car, onOpen }) {
  const open = () => onOpen(car.id)

  return (
    <div
      className="car-card"
      onClick={open}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open() } }}
    >
      <div className="car-photo" style={{ backgroundImage: `url('${car.img}')` }}>
        <span className="car-corner tl" aria-hidden="true" />
        <span className="car-corner tr" aria-hidden="true" />
        <span className="car-corner bl" aria-hidden="true" />
        <span className="car-corner br" aria-hidden="true" />

        <span className={`condition-badge ${car.condition === 'used' ? 'used' : 'new-glow'}`}>{car.condition}</span>
        <span className="car-rating mono">★ {car.rating.stars}</span>

        {/* Hover-reveal spec strip — turns the thumbnail into a mini spec sheet */}
        <div className="car-photo-specs">
          <span><b>{car.performance.hp}</b> hp</span>
          <span><b>{car.performance.zeroToSixty}s</b> 0–60</span>
          <span><b>{car.specs.engine[2][1]}</b></span>
        </div>
      </div>
      <div className="car-body">
        <div className="car-name display">{car.name}</div>
        <div className="car-meta">{car.year} · {car.type} · {car.mileage.toLocaleString()} km</div>
        <div className="car-foot">
          <span className="car-price mono">{fmtPrice(car.price)}</span>
          <span className="car-cta">Details <b>→</b></span>
        </div>
      </div>
    </div>
  )
}
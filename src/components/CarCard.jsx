import '../styles/listing.css'
import { fmtPrice } from '../data/cars'

// Owned by: Person B — reused by every view (Home, New, Used, Brands, Offers)
export default function CarCard({ car, onOpen }) {
  return (
    <div className="car-card" onClick={() => onOpen(car.id)}>
      <div className="car-photo" style={{ backgroundImage: `url('${car.img}')` }}>
        <span className={`condition-badge ${car.condition === 'used' ? 'used' : ''}`}>{car.condition}</span>
      </div>
      <div className="car-body">
        <div className="car-name display">{car.name}</div>
        <div className="car-meta">{car.year} · {car.type} · {car.mileage.toLocaleString()} km</div>
        <div className="car-foot">
          <span className="car-price">{fmtPrice(car.price)}</span>
          <span className="car-cta">Details →</span>
        </div>
      </div>
    </div>
  )
}

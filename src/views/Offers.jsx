import '../styles/offers.css'
import { CARS, OFFERS } from '../data/cars'

export default function Offers({ openModal }) {
  return (
    <>
      <div className="page-hero" style={{ backgroundImage: "url('/images/hero/offers.jpg')" }}>
        <div className="page-hero-inner"><span className="tag">LIMITED TIME</span><h2 className="display">Offers</h2><p>Current deals across new and certified used inventory.</p></div>
      </div>
      <div className="section">
        <div className="offer-grid">
          {OFFERS.map(o => {
            const car = CARS.find(c => c.id === o.carId)
            return (
              <div className="offer-card" key={o.id}>
                <div className="pct mono">{o.pct}</div>
                <h3>{o.title}</h3>
                <p>{o.desc}</p>
                <div className="expiry">{o.expiry}</div>
                <button className="link-car" onClick={() => openModal(car.id)}>View {car.name} →</button>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

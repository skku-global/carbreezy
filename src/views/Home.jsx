import '../styles/home.css'
import { useState, useEffect } from 'react'
import { CARS, BRANDS } from '../data/cars'
import CarCard from '../components/CarCard'

const SLIDES = [
  {
    img: '/images/hero/ferrari-hero.jpg',
    eyebrow: 'CARBREEZY MOTORS',
    heading: <>Your car buying destiny<br /><span className="accent">is in your hands</span></>,
    text: 'CarBreezy is a leading automotive digital marketplace built to make car buying and selling easy, transparent, and efficient — we help you every step of the way.',
  },
  {
    img: '/images/hero/bugatti-hero.jpg',
    eyebrow: 'FROM DISCOVERY TO DELIVERY',
    heading: <>Explore an expansive<br /><span className="accent">cross-brand selection</span></>,
    text: 'From discovery to delivery, explore vehicles from our vast network — complete your purchase from the comfort of your home, with pricing transparency at every step.',
  },
]

// Owned by: Person A
export default function Home({ goto, openModal, showToast }) {
  const [slide, setSlide] = useState(0)
  const featured = [CARS[0], CARS[1], CARS[2]]

  useEffect(() => {
    const id = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 6000)
    return () => clearInterval(id)
  }, [])

  const prev = () => setSlide(s => (s - 1 + SLIDES.length) % SLIDES.length)
  const next = () => setSlide(s => (s + 1) % SLIDES.length)

  return (
    <>
      <div className="hero">
        {SLIDES.map((s, i) => (
          <div key={i} className={`hero-slide ${i === slide ? 'active' : ''}`}>
            <div className="hero-slide-bg" style={{ backgroundImage: `url('${s.img}')` }}></div>
            <div className="hero-inner">
              <div className="hero-eyebrow">{s.eyebrow}</div>
              <h1 className="display">{s.heading}</h1>
              <p>{s.text}</p>
              <div className="hero-actions">
                <button className="btn-primary" onClick={() => goto('new')}>Browse Inventory</button>
                <button className="btn-ghost" onClick={() => goto('offers')}>See Today's Offers</button>
              </div>
            </div>
          </div>
        ))}

        <button className="hero-arrow prev" onClick={prev}>‹</button>
        <button className="hero-arrow next" onClick={next}>›</button>
        <div className="hero-dots">
          {SLIDES.map((_, i) => (
            <button key={i} className={i === slide ? 'active' : ''} onClick={() => setSlide(i)} />
          ))}
        </div>
      </div>

      <div className="stats">
        <div className="stats-inner">
          <div className="dial-card">
            <div className="dial"><svg width="66" height="66"><circle cx="33" cy="33" r="27" fill="none" stroke="#2a333e" strokeWidth="6" /><circle cx="33" cy="33" r="27" fill="none" stroke="#f2a93b" strokeWidth="6" strokeDasharray="170" strokeDashoffset="34" strokeLinecap="round" /></svg><div className="dial-num">80%</div></div>
            <div className="dial-label"><div className="k">Financing Approved</div><div className="v">Same-day pre-approval for most buyers</div></div>
          </div>
          <div className="dial-card">
            <div className="dial"><svg width="66" height="66"><circle cx="33" cy="33" r="27" fill="none" stroke="#2a333e" strokeWidth="6" /><circle cx="33" cy="33" r="27" fill="none" stroke="#5cc9e0" strokeWidth="6" strokeDasharray="170" strokeDashoffset="50" strokeLinecap="round" /></svg><div className="dial-num">2yr</div></div>
            <div className="dial-label"><div className="k">Warranty Included</div><div className="v">On every certified used vehicle</div></div>
          </div>
          <div className="dial-card">
            <div className="dial"><svg width="66" height="66"><circle cx="33" cy="33" r="27" fill="none" stroke="#2a333e" strokeWidth="6" /><circle cx="33" cy="33" r="27" fill="none" stroke="#f2a93b" strokeWidth="6" strokeDasharray="170" strokeDashoffset="17" strokeLinecap="round" /></svg><div className="dial-num">48h</div></div>
            <div className="dial-label"><div className="k">Doorstep Delivery</div><div className="v">Nationwide within two working days</div></div>
          </div>
        </div>
      </div>

      <div className="brands-strip">
        <div className="brands-strip-inner">
          {BRANDS.map(b => <span key={b} className="brand-chip">{b.toUpperCase()}</span>)}
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <div><span className="tag">CURATED INVENTORY</span><h2 className="display">Featured this week</h2></div>
          <button className="view-all" onClick={() => goto('new')}>View All Cars →</button>
        </div>
        <div className="car-grid">
          {featured.map(c => <CarCard key={c.id} car={c} onOpen={openModal} />)}
        </div>
      </div>

      <div className="cta-banner">
        <h3 className="display">Got a car to sell? <span className="accent">List it in minutes.</span></h3>
        <p>CarBreezy is bringing more of the purchasing process online — reach thousands of verified buyers browsing every week.</p>
        <button className="btn-primary" onClick={() => showToast('Listing flow would open here — 3 steps: photos, specs, price.')}>Start Selling</button>
      </div>
    </>
  )
}

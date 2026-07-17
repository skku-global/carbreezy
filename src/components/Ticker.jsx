import '../styles/ticker.css'
import { useState, useEffect } from 'react'
import { CARS, fmtPrice } from '../data/cars'

// Owned by: Person D
// Signature: "Trip Computer" — the ticker built as a dashboard LCD strip:
// chrome bezel screws, glass glare, faint scanlines, and green segmented
// digits. Distinct from Home's analog chrome speedometers — this is the
// digital trip-computer readout, not the round gauge face.
export default function Ticker() {
  const [now, setNow] = useState(new Date())
  const [location, setLocation] = useState('Ibadan, Nigeria')
  const [spotlightIdx, setSpotlightIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => setLocation(`${pos.coords.latitude.toFixed(2)}, ${pos.coords.longitude.toFixed(2)}`),
        () => { /* permission denied — keep fallback */ }
      )
    }
  }, [])

  // Rotate the spotlighted car every 6s so the ticker surfaces live inventory,
  // not just date/time — cycles through the full CARS list.
  useEffect(() => {
    const id = setInterval(() => setSpotlightIdx(i => (i + 1) % CARS.length), 6000)
    return () => clearInterval(id)
  }, [])

  const date = now.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })
  const time = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  const spotlight = CARS[spotlightIdx]

  const Segment = () => (
    <div className="ticker-seg">
      <b>{date}</b><span className="sep">/</span>
      <span>{time}</span><span className="sep">/</span>
      <span>📍 {location}</span><span className="sep">/</span>
      <span><b>{CARS.length}</b> cars currently listed</span><span className="sep">/</span>
      <span className="ticker-spotlight">
        🔥 In stock now: <b>{spotlight.name}</b> — {fmtPrice(spotlight.price)}
        {spotlight.availability.stock === 1 ? ' (last unit)' : ` (${spotlight.availability.stock} available)`}
      </span>
    </div>
  )

  return (
    <div className="ticker">
      <span className="ticker-screw l" aria-hidden="true" />
      <span className="ticker-glass" aria-hidden="true" />
      <div className="ticker-track">
        <Segment /><Segment />
      </div>
      <span className="ticker-screw r" aria-hidden="true" />
    </div>
  )
}
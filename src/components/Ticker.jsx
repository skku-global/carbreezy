import '../styles/ticker.css'
import { useState, useEffect } from 'react'
import { CARS } from '../data/cars'

// Owned by: Person D
export default function Ticker() {
  const [now, setNow] = useState(new Date())
  const [location, setLocation] = useState('Ibadan, Nigeria')

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

  const date = now.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })
  const time = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' })

  const Segment = () => (
    <div className="ticker-seg">
      <b>{date}</b><span className="sep">/</span>
      <span>{time}</span><span className="sep">/</span>
      <span>📍 {location}</span><span className="sep">/</span>
      <span><b>{CARS.length}</b> cars currently listed</span>
    </div>
  )

  return (
    <div className="ticker">
      <div className="ticker-track">
        <Segment /><Segment />
      </div>
    </div>
  )
}

import { useEffect, useRef } from "react";
import '../styles/header.css'

// Owned by: Person A
const NAV = ['home', 'new', 'used', 'brands', 'offers', 'gallery']

export default function Header({ view, goto, visitorCount, menuOpen, setMenuOpen }) {
  const popoverRef = useRef(null)

  // Close the keyfob popover on outside click or Escape — same pattern
  // as Listing's SortPopover, so it never becomes a full-screen drawer.
  useEffect(() => {
    if (!menuOpen) return
    const onDocClick = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) setMenuOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen, setMenuOpen])

  const gotoAndClose = (v) => {
    goto(v)
    setMenuOpen(false)
  }

  return (
    <>
      {/* Plate strip — the live showroom count reads like a stamped plate number */}
      <div className="plate-strip">
        <div className="plate-strip-inner">
          <div className="plate" aria-live="polite">
            <span className="dot"></span>
            <span className="plate-count mono" key={visitorCount}>{visitorCount.toLocaleString()}</span>
            <span className="plate-label">viewing the showroom now</span>
          </div>
          <div className="plate-links">
            <a onClick={() => goto('sitemap')}>Site Map</a>
            <a onClick={() => goto('about')}>About Us</a>
            <a onClick={() => goto('queries')}>Queries</a>
            <a onClick={() => goto('contact')}>Contact Us</a>
          </div>
        </div>
      </div>

      <header>
        <div className="grille-header-inner">
          <button className="badge-group" onClick={() => goto('home')} aria-label="CarBreezy home">
            <span className="badge-emblem" aria-hidden="true"><span>CB</span></span>
            <div className="logo-lockup">
              <div className="logo">Car<span>Breezy</span></div>
              <span className="logo-sub mono">MOTORS · NG</span>
            </div>
          </button>

          <nav className="grille-nav">
            {NAV.map(v => (
              <a
                key={v}
                className={view === v ? 'active' : ''}
                onClick={() => goto(v)}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </a>
            ))}
          </nav>

          <div className="header-right">
            <button className="ignition-btn" onClick={() => goto('contact')}>
              <span className="ignition-ring" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 3v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M7 6a7 7 0 1 0 10 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
              Book a Test Drive
            </button>

            <button
              className={`fob-trigger ${menuOpen ? 'is-open' : ''}`}
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
              aria-haspopup="true"
              aria-expanded={menuOpen}
            >
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="6" y="4" width="12" height="16" rx="4" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="12" cy="9" r="1.4" fill="currentColor" />
                <circle cx="12" cy="14" r="1.4" fill="currentColor" />
              </svg>
            </button>

            <div className={`fob-popover ${menuOpen ? 'is-open' : ''}`} ref={popoverRef}>
              <div className="fob-nav-list">
                {NAV.map(v => (
                  <a
                    key={v}
                    className={view === v ? 'active' : ''}
                    onClick={() => gotoAndClose(v)}
                  >
                    <span className="fob-led" aria-hidden="true" />
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                  </a>
                ))}
              </div>
              <div className="fob-divider" />
              <button className="ignition-btn" onClick={() => gotoAndClose('contact')}>
                <span className="ignition-ring" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 3v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M7 6a7 7 0 1 0 10 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
                Book a Test Drive
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
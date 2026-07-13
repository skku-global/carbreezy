import '../styles/header.css'

// Owned by: Person A
const NAV = ['home', 'new', 'used', 'brands', 'offers', 'gallery']

export default function Header({ view, goto, visitorCount, menuOpen, setMenuOpen }) {
  return (
    <>
      <div className="util-bar">
        <div className="util-bar-inner">
          <a onClick={() => goto('sitemap')}>Site Map</a>
          <a onClick={() => goto('about')}>About Us</a>
          <a onClick={() => goto('queries')}>Queries</a>
          <a onClick={() => goto('contact')}>Contact Us</a>
        </div>
      </div>
      <header>
        <div className="header-inner">
          <div className="logo-group">
            <div className="logo">Car<span>Breezy</span></div>
            <div className="visitor-count">
              <span className="dot"></span>
              <span>{visitorCount.toLocaleString()}</span> online now
            </div>
          </div>
          <nav className={`main-nav ${menuOpen ? 'menu-open' : ''}`}>
            {NAV.map(v => (
              <a key={v} className={view === v ? 'active' : ''} onClick={() => { goto(v); setMenuOpen(false) }}>
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </a>
            ))}
          </nav>
          <div className="header-right">
            <button className="cta-btn">Book a Test Drive</button>
            <button className="burger" onClick={() => setMenuOpen(o => !o)}>{menuOpen ? '✕' : '☰'}</button>
          </div>
        </div>
      </header>
    </>
  )
}

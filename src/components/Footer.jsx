import '../styles/footer.css'

const SHOWROOMS = ['LOS — Lagos', 'ABV — Abuja', 'IBA — Ibadan']

// Owned by: Person A
// Signature: "Rear Fascia" — the footer built as the back of the car:
// twin taillight glows bracket the CTA band, a ribbed diffuser runs
// under the columns, and "back to top" sits inside a chrome tailpipe.
// Distinct from Contact's flat stamped ID plate and Home/Listing's
// gauge faces — this is the tail end of the vehicle, lit up at dusk.
export default function Footer({ goto }) {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer>
      <div className="footer-band">
        <span className="taillight l" aria-hidden="true" />
        <span className="taillight r" aria-hidden="true" />
        <div className="footer-band-inner">
          <h2 className="display">Own the extraordinary.</h2>
          <div className="footer-band-ctas">
            <button className="btn-primary" onClick={() => goto('new')}>Browse Inventory</button>
            <button className="btn-ghost" onClick={() => goto('contact')}>Talk to an Advisor</button>
          </div>
        </div>
      </div>

      <div className="footer-inner">
        <div className="footer-col footer-col-brand">
          <div className="footer-logo">Car<span>Breezy</span></div>
          <p>Borderless car buying and selling, built for trust and speed.</p>
          <div className="footer-showrooms mono">
            {SHOWROOMS.map(s => <span key={s}>{s}</span>)}
          </div>
          <div className="footer-social">
            <a href="https://instagram.com/carbreezy" target="_blank" rel="noreferrer" aria-label="Instagram">IG</a>
            <a href="https://tiktok.com/@carbreezy" target="_blank" rel="noreferrer" aria-label="TikTok">TT</a>
            <a href="https://x.com/carbreezy" target="_blank" rel="noreferrer" aria-label="X">X</a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Sitemap</h4>
          <a onClick={() => goto('home')}>Home</a>
          <a onClick={() => goto('new')}>New Cars</a>
          <a onClick={() => goto('used')}>Used Cars</a>
          <a onClick={() => goto('brands')}>Brands</a>
          <a onClick={() => goto('offers')}>Offers</a>
          <a onClick={() => goto('gallery')}>Gallery</a>
        </div>
        <div className="footer-col">
          <h4>About</h4>
          <a onClick={() => goto('about')}>Our Story</a>
          <a onClick={() => goto('queries')}>How It Works</a>
          <a onClick={() => goto('contact')}>Contact</a>
          <a onClick={() => goto('sitemap')}>sitemap</a>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <a onClick={() => goto('contact')}>hello@carbreezy.com</a>
          <a onClick={() => goto('contact')}>+234 800 000 0000</a>
          <a onClick={() => goto('contact')}>Ibadan, Nigeria</a>
        </div>
      </div>

      <div className="footer-diffuser" aria-hidden="true">
        {Array.from({ length: 16 }).map((_, i) => <span key={i} />)}
      </div>

      <div className="footer-bottom">
        <span>© 2026 CarBreezy Motors. All rights reserved.</span>
        <button className="tailpipe-btn" onClick={scrollTop} aria-label="Back to top">
          <span className="tailpipe-ring" aria-hidden="true" />
          <span className="tailpipe-arrow" aria-hidden="true">↑</span>
        </button>
        <span>React build — CarBreezy eProject</span>
      </div>
    </footer>
  )
}
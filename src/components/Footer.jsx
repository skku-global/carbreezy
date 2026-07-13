import '../styles/footer.css'

// Owned by: Person A
export default function Footer({ goto }) {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-col">
          <div className="footer-logo">Car<span>Breezy</span></div>
          <p>Borderless car buying and selling, built for trust and speed.</p>
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
          <a onClick={() => goto('about')}>How It Works</a>
          <a onClick={() => goto('queries')}>Careers</a>
          <a onClick={() => goto('contact')}>Press</a>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <a onClick={() => goto('contact')}>hello@carbreezy.com</a>
          <a onClick={() => goto('contact')}>+234 800 000 0000</a>
          <a onClick={() => goto('contact')}>Ibadan, Nigeria</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 CarBreezy Motors. All rights reserved.</span>
        <span>React build — CarBreezy eProject</span>
      </div>
    </footer>
  )
}

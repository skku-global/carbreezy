import '../styles/info-pages.css'
// Owned by: Person A
export default function About({ goto }) {
  return (
    <>
      <div className="page-hero"><div className="page-hero-inner"><span className="tag">WHO WE ARE</span><h2 className="display">About Us</h2><p>The story behind CarBreezy.</p></div></div>
      <div className="section">
        <div className="info-grid">
          <div>
            <p>CarBreezy is a digital automotive marketplace built to make car buying and selling fast, transparent, and stress-free. We connect buyers with an expansive, cross-brand network of new and certified used vehicles — all searchable, comparable, and purchasable without ever stepping into a dealership.</p>
            <p>From discovery to delivery, every step happens in one place: browse verified listings, compare real specs side by side, secure financing, and arrange delivery — all from your phone or laptop.</p>
            <p>We've built our reputation on pricing transparency and trustworthy listings, because buying a car shouldn't feel like a gamble.</p>
          </div>
          <div className="contact-card">
            <div className="contact-row"><span className="ic">Email</span><span className="val">hello@carbreezy.com</span></div>
            <div className="contact-row"><span className="ic">Phone</span><span className="val">+234 800 000 0000</span></div>
            <div className="contact-row"><span className="ic">Address</span><span className="val">14 Ring Road, Ibadan, Oyo State, Nigeria</span></div>
          </div>
        </div>
      </div>
    </>
  )
}

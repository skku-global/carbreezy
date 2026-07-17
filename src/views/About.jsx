import '../styles/info-pages.css'
import '../styles/about.css'

// A single boxed spec field, like the fuel-economy boxes on a real
// window sticker — small label on top, the value given weight below.
function SpecBox({ label, value }) {
  return (
    <div className="spec-box">
      <span className="spec-box-label mono">{label}</span>
      <span className="spec-box-value">{value}</span>
    </div>
  )
}

// Owned by: Person A
// Signature: "Window Sticker" — the about copy laid out like a
// Monroney label: grid-ruled paper, a labelled statement in place of
// free prose, boxed spec fields for contact details, and a barcode
// footer. Distinct from Contact's riveted metal ID plate, Queries'
// carbon-copy job ticket, and Gallery's exposed film — this one is
// flat printed paper, not metal, ticket stock, or emulsion.
export default function About({ goto }) {
  return (
    <>
      <div className="page-hero"><div className="page-hero-inner"><span className="tag">WHO WE ARE</span><h2 className="display">About Us</h2><p>The story behind CarBreezy.</p></div></div>

      <div className="section">
        <div className="window-sticker">
          <div className="sticker-head">
            <div className="sticker-brand">
              <span className="sticker-brand-name display">CarBreezy</span>
              <span className="sticker-brand-sub mono">DIGITAL AUTOMOTIVE MARKETPLACE</span>
            </div>
            <div className="sticker-issue mono">
              <span>LABEL NO. CB-00423</span>
              <span>ISSUED FOR CUSTOMER REVIEW</span>
            </div>
          </div>

          <div className="sticker-body">
            <div className="sticker-main">
              <div className="sticker-field">
                <span className="sticker-field-label mono">Origin</span>
                <p>CarBreezy is a digital automotive marketplace built to make car buying and selling fast, transparent, and stress-free. We connect buyers with an expansive, cross-brand network of new and certified used vehicles — all searchable, comparable, and purchasable without ever stepping into a dealership.</p>
              </div>
              <div className="sticker-field">
                <span className="sticker-field-label mono">How It Works</span>
                <p>From discovery to delivery, every step happens in one place: browse verified listings, compare real specs side by side, secure financing, and arrange delivery — all from your phone or laptop.</p>
              </div>
              <div className="sticker-field">
                <span className="sticker-field-label mono">Our Promise</span>
                <p>We've built our reputation on pricing transparency and trustworthy listings, because buying a car shouldn't feel like a gamble.</p>
              </div>
            </div>

            <div className="sticker-side">
              <span className="sticker-side-label mono">Dealer Information</span>
              <SpecBox label="Email" value="hello@carbreezy.com" />
              <SpecBox label="Phone" value="+234 800 000 0000" />
              <SpecBox label="Address" value="14 Ring Road, Ibadan, Oyo State, Nigeria" />
            </div>
          </div>

          <div className="sticker-foot">
            <span className="barcode" aria-hidden="true" />
            <span className="fineprint mono">THIS LABEL IS FOR INFORMATIONAL PURPOSES · CARBREEZY LTD · IBADAN, NG</span>
          </div>
        </div>
      </div>
    </>
  )
}
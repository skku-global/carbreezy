// Contact.jsx
import '../styles/info-pages.css'
import '../styles/contact.css'

// A single row on the ID plate — label stamped small, value embossed
// larger, like a vehicle registration card rather than a form field.
function PlateRow({ label, value }) {
  return (
    <div className="plate-row">
      <span className="plate-label mono">{label}</span>
      <span className="plate-value">{value}</span>
    </div>
  )
}

// Owned by: Person A
// Signature: "ID Plate" — contact details styled as a riveted, stamped
// metal registration plate, with a key-fob-style CTA button. Distinct
// from Home's gauges, Listing's ignition panel, Brands' tuner console,
// and Offers' hang-tags — flat stamped metal, not an instrument face.
export default function Contact({ goto }) {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <span className="tag">GET IN TOUCH</span>
          <h2 className="display">Contact Us</h2>
          <p>Reach the CarBreezy team directly.</p>
        </div>
      </div>

      <div className="section">
        <div className="contact-layout">
          <div className="id-plate">
            <span className="plate-rivet tl" aria-hidden="true" />
            <span className="plate-rivet tr" aria-hidden="true" />
            <span className="plate-rivet bl" aria-hidden="true" />
            <span className="plate-rivet br" aria-hidden="true" />

            <div className="plate-header">
              <span className="plate-header-label mono">REGISTERED DEALER</span>
              <span className="plate-header-code mono">CB–001</span>
            </div>

            <div className="plate-rows">
              <PlateRow label="Email" value="hello@carbreezy.com" />
              <PlateRow label="Phone" value="+234 800 000 0000" />
              <PlateRow label="Address" value="14 Ring Road, Ibadan, Oyo State, Nigeria" />
              <PlateRow label="Hours" value="Mon–Sat, 9am–6pm WAT" />
            </div>

            <div className="plate-footer mono">
              <span className="plate-strip" aria-hidden="true" />
              ISSUED FOR SHOWROOM USE
            </div>
          </div>

          <div className="contact-side">
            <p>Prefer to write in? Send a message below and a member of our team will get back to you within one business day.</p>

            <button className="fob-btn" onClick={() => goto('queries')}>
              <span className="fob-led" aria-hidden="true" />
              <span className="fob-btn-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M4 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="fob-btn-label">Go to Queries</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
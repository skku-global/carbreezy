import '../styles/info-pages.css'
// Owned by: Person A
export default function Contact({ goto }) {
  return (
    <>
      <div className="page-hero"><div className="page-hero-inner"><span className="tag">GET IN TOUCH</span><h2 className="display">Contact Us</h2><p>Reach the CarBreezy team directly.</p></div></div>
      <div className="section">
        <div className="info-grid">
          <div className="contact-card" style={{ maxWidth: 480 }}>
            <div className="contact-row"><span className="ic">Email</span><span className="val">hello@carbreezy.com</span></div>
            <div className="contact-row"><span className="ic">Phone</span><span className="val">+234 800 000 0000</span></div>
            <div className="contact-row"><span className="ic">Address</span><span className="val">14 Ring Road, Ibadan, Oyo State, Nigeria</span></div>
            <div className="contact-row"><span className="ic">Hours</span><span className="val">Mon–Sat, 9am–6pm WAT</span></div>
          </div>
          <div>
            <p>Prefer to write in? Send a message below and a member of our team will get back to you within one business day.</p>
            <button className="btn-primary" style={{ background: 'var(--ink)', color: '#fff' }} onClick={() => goto('queries')}>Go to Queries →</button>
          </div>
        </div>
      </div>
    </>
  )
}

import '../styles/info-pages.css'
// Owned by: Person A
export default function Queries({ showToast }) {
  const handleSubmit = e => {
    e.preventDefault()
    showToast("Query submitted — we'll get back to you within 1 business day.")
    e.target.reset()
  }

  return (
    <>
      <div className="page-hero"><div className="page-hero-inner"><span className="tag">ASK US ANYTHING</span><h2 className="display">Queries</h2><p>Questions about a listing, financing, or delivery? Send it over.</p></div></div>
      <div className="section">
        <form className="query-form" onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input type="text" placeholder="e.g. Abdulkabir Yusuf" required />
          <label>Email</label>
          <input type="email" placeholder="you@example.com" required />
          <label>Your Question</label>
          <textarea placeholder="Ask about a car, an offer, financing, delivery..." required></textarea>
          <button type="submit" className="btn-primary" style={{ background: 'var(--ink)', color: '#fff', alignSelf: 'flex-start' }}>Submit Query</button>
        </form>
      </div>
    </>
  )
}

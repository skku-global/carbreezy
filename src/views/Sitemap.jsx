import '../styles/info-pages.css'
// Owned by: Person A
const LINKS = [
  ['home', 'Home'], ['new', 'New Cars'], ['used', 'Used Cars'], ['brands', 'Brands'],
  ['offers', 'Offers'], ['gallery', 'Gallery'], ['about', 'About Us'], ['contact', 'Contact Us'],
  ['queries', 'Queries'], ['sitemap', 'Site Map'],
]

export default function Sitemap({ goto }) {
  return (
    <>
      <div className="page-hero"><div className="page-hero-inner"><span className="tag">EVERY PAGE, ONE PLACE</span><h2 className="display">Site Map</h2></div></div>
      <div className="section">
        <div className="sitemap-list">
          {LINKS.map(([key, label]) => (
            <a key={key} onClick={() => goto(key)}>{label}</a>
          ))}
        </div>
      </div>
    </>
  )
}

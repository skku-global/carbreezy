import '../styles/info-pages.css'
import '../styles/sitemap.css'

const LINKS = [
  ['home', 'Home'], ['new', 'New Cars'], ['used', 'Used Cars'], ['brands', 'Brands'],
  ['offers', 'Offers'], ['gallery', 'Gallery'], ['about', 'About Us'], ['contact', 'Contact Us'],
  ['queries', 'Queries'], ['sitemap', 'Site Map'],
]

// Owned by: Person A
// Signature: "Fuse Box Map" — the sitemap rendered as an underhood fuse
// panel: every page wired to a numbered, color-coded fuse the way a
// glovebox diagram maps circuits to functions — a literal map of what
// each part of the site controls. Distinct from Contact's flat stamped
// ID plate and Listing/Home's gauge faces: this is a lid-off service
// panel, not an instrument or a plate.
export default function Sitemap({ goto }) {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <span className="tag">EVERY PAGE, ONE PLACE</span>
          <h2 className="display">Site Map</h2>
          <p>Every circuit on the CarBreezy site, mapped and labeled.</p>
        </div>
      </div>

      <div className="section">
        <div className="fusebox">
          <span className="fusebox-screw tl" aria-hidden="true" />
          <span className="fusebox-screw tr" aria-hidden="true" />
          <span className="fusebox-screw bl" aria-hidden="true" />
          <span className="fusebox-screw br" aria-hidden="true" />

          <div className="fusebox-header">
            <span className="fusebox-header-label mono">FUSE BOX — SITE MAP</span>
            <span className="fusebox-header-code mono">PANEL CB–2</span>
          </div>

          <div className="fusebox-grid">
            {LINKS.map(([key, label], i) => (
              <button
                key={key}
                type="button"
                className={`fuse fuse-t${(i % 4) + 1}`}
                onClick={() => goto(key)}
              >
                <span className="fuse-cap" aria-hidden="true">
                  <span className="fuse-filament" />
                </span>
                <span className="fuse-id mono">F{String(i + 1).padStart(2, '0')}</span>
                <span className="fuse-label mono">{label}</span>
              </button>
            ))}
          </div>

          <div className="fusebox-footer mono">
            <span className="fusebox-strip" aria-hidden="true" />
            PRESS A FUSE TO NAVIGATE
          </div>
        </div>
      </div>
    </>
  )
}
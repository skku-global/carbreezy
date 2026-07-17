import { useState } from 'react'
import '../styles/faq.css'
import Reveal from './Reveal'

// The five questions people actually ask before buying, in the order
// they tend to come up — financing first, what happens after last. The
// numbering here is real: it's a ranked index, like a manual's table of
// contents, not decoration.
const FAQS = [
  {
    q: 'Do you offer financing or take trade-ins?',
    a: "Yes to both. Our finance partners can pre-approve most applications the same day, and we'll appraise your current car on the spot — the trade-in value comes off the price before financing is calculated, not after.",
  },
  {
    q: "What's covered under the used-car warranty?",
    a: 'Every certified used car ships with a 12-month or 20,000km warranty (whichever comes first) covering the engine, transmission, and electrical systems. New cars carry the full manufacturer warranty, untouched.',
  },
  {
    q: 'Can I test drive before reserving?',
    a: "Always. Book a slot at any showroom from the car's page, or walk in during opening hours. If you reserve online first, we'll hold the car and still get you behind the wheel before anything is final.",
  },
  {
    q: 'How does delivery outside Ibadan work?',
    a: 'We ship nationwide on an enclosed transporter — typically 2 to 5 days depending on distance. You get a tracking link, and the car is inspected again on arrival before it\'s handed over.',
  },
  {
    q: 'What happens right after I reserve online?',
    a: "A refundable deposit holds the car for 48 hours. An advisor calls within that window to confirm financing or payment, paperwork, and your preferred pickup or delivery date.",
  },
]

function FAQItem({ item, index, open, onToggle }) {
  const isOpen = open === index
  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <button
        className="faq-q"
        onClick={() => onToggle(isOpen ? -1 : index)}
        aria-expanded={isOpen}
      >
        <span className="faq-index mono">{String(index + 1).padStart(2, '0')}</span>
        <span className="faq-q-text">{item.q}</span>
        <span className="faq-chevron" aria-hidden="true">⌄</span>
      </button>
      <div className="faq-a-wrap">
        <div className="faq-a-inner">
          <div className="faq-a">
            <p>{item.a}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Owned by: Person D
// Signature: "Owner's Manual index" — a numbered accordion with tab-style
// index chips, distinct from the gauges, plates, and tickets used
// elsewhere: this one reads as the manual's table of contents.
export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section className="section faq-section">
      <Reveal variant="up">
        <div className="section-head">
          <div>
            <span className="tag">OWNER'S MANUAL</span>
            <h2 className="display">Frequently Asked</h2>
          </div>
        </div>
      </Reveal>

      <Reveal variant="up" delay={80}>
        <div className="faq-list">
          {FAQS.map((item, i) => (
            <FAQItem key={i} item={item} index={i} open={open} onToggle={setOpen} />
          ))}
        </div>
      </Reveal>
    </section>
  )
}

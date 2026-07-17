import { useEffect, useRef, useState } from 'react'

// Generic scroll-reveal wrapper — fades/slides content in the moment it
// enters the viewport, so sections arrive the way a car rolls into frame
// rather than just popping into place. Used across the landing page for
// consistent, restrained motion (see .reveal rules in base.css).
//
// variant: 'up' | 'left' | 'right' | 'scale'
// delay: stagger in ms, useful for grids of cards
export default function Reveal({ children, variant = 'up', delay = 0, className = '', as: Tag = 'div', ...rest }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.unobserve(node)
        }
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal reveal-${variant} ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}

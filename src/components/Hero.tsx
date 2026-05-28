import { type MouseEvent } from 'react'
import gsap from 'gsap'
import { useLenis } from '../providers/SmoothScrollProvider'

export default function Hero() {
  const lenis = useLenis()

  const handleAnchor = (e: MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault()
    if (lenis) {
      lenis.scrollTo(target, { offset: -80, duration: 1.4 })
    } else {
      const el = document.querySelector(target)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleMagneticMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.innerWidth < 768) return
    const target = e.currentTarget
    const rect = target.getBoundingClientRect()
    const dx = (e.clientX - rect.left - rect.width / 2) * 0.15
    const dy = (e.clientY - rect.top - rect.height / 2) * 0.15
    const clamp = (v: number) => Math.max(-6, Math.min(6, v))
    gsap.to(target, { x: clamp(dx), y: clamp(dy), duration: 0.4, ease: 'power3.out' })
  }

  const handleMagneticLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.4)',
    })
  }

  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <img
          src="/images/hero/hero-main.jpg"
          alt="Vista aerea EDEL Ponteranica — render esterno frontale"
          loading="eager"
          fetchPriority="high"
        />
      </div>
      <div className="hero-inner">
        <h1 className="serif hero-title">
          L'ultima volta che sceglierete <span className="ital">dove abitare</span>.
        </h1>
        <p className="hero-sub hero-sub-meta">
          <span className="hero-trust-dot">●</span> 12 Unità · Classe A4 · Sismica Cl.4
          <br />
          EDEL · Ponteranica
        </p>
        <div className="hero-cta-row">
          <a
            href="#contatti"
            className="btn-primary"
            onClick={(e) => handleAnchor(e, '#contatti')}
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
          >
            Richiedi un appuntamento privato
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <a
            href="/brochure-edel.pdf"
            className="btn-ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            Scarica la brochure
          </a>
        </div>
      </div>
    </section>
  )
}

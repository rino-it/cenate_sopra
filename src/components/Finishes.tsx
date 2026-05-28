import { type ReactNode, type MouseEvent, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import '../lib/gsap'
import { useLenis } from '../providers/SmoothScrollProvider'

type Block = {
  num: string
  cat: string
  title: ReactNode
  intro: string
  brands: string[]
  spec: string
}

const BLOCKS: Block[] = [
  {
    num: '01',
    cat: 'Struttura & Sicurezza',
    title: (
      <>
        Pensata per <span className="ital">resistere</span>.
      </>
    ),
    intro:
      'Calcestruzzo autosigillante, murature che respirano. Una villa che invecchia bene perché nasce bene.',
    brands: ['Penetron', 'Ytong Climagold', 'Wolf Haus', 'Eternoivica'],
    spec: 'Sismica Cl.4 · Acustica 40 dB · Porta blindata Cl.4',
  },
  {
    num: '02',
    cat: 'Clima & Energia',
    title: (
      <>
        Bollette <span className="ital">azzerate</span>.
      </>
    ),
    intro:
      'Pompa di calore, pavimento radiante, fotovoltaico con accumulo.',
    brands: ['Immergas', 'Rehau Speed', 'Sharp'],
    spec: 'Classe A4 · FV + accumulo · Auto elettrica predisposta',
  },
  {
    num: '03',
    cat: 'Materiali nobili',
    title: (
      <>
        Cose che <span className="ital">durano</span>.
      </>
    ),
    intro:
      'Pietra di Sarnico, rovere fumé, travertino, ottone brunito. Selezionati nelle showroom convenzionate.',
    brands: ['Pietra di Sarnico', 'Rovere fumé', 'Travertino', 'Ottone brunito'],
    spec: 'Parquet rovere XL · Pietra naturale interni-esterni',
  },
  {
    num: '04',
    cat: 'Smart & Wellness',
    title: (
      <>
        Domotica <span className="ital">che non spaventa</span>.
      </>
    ),
    intro:
      'BTicino Living Now, predisposizione SPA, climatizzazione zonale. Smart quando serve, semplice quando volete.',
    brands: ['BTicino Living Now', 'KNX', 'Predisp. SPA'],
    spec: 'App Home+ Control · Videocitofono WiFi · Clima wellness',
  },
]

export default function Finishes() {
  const lenis = useLenis()
  const sectionRef = useRef<HTMLElement>(null)
  const cubeRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      const cube = cubeRef.current
      const dotsWrap = dotsRef.current
      if (!section || !cube) return

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const dots = dotsWrap?.querySelectorAll<HTMLSpanElement>('.cube-dot')
        const setActiveDot = (idx: number) => {
          dots?.forEach((d, i) => d.classList.toggle('is-active', i === idx))
        }
        setActiveDot(0)

        gsap.to(cube, {
          rotateY: -270,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=300%',
            pin: true,
            scrub: 0.6,
            snap: { snapTo: 1 / 3, duration: 0.4, ease: 'power2.inOut' },
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.round(self.progress * 3)
              setActiveDot(idx)
            },
          },
        })
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(cube, { rotateY: 0 })
      })

      return () => mm.revert()
    },
    { scope: sectionRef, dependencies: [] },
  )

  useEffect(() => {
    sessionStorage.removeItem('cenate_request_dossier')
  }, [])

  const handleCapitolato = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    sessionStorage.setItem('cenate_request_dossier', 'true')
    window.dispatchEvent(new CustomEvent('cenate:request-dossier'))
    if (lenis) {
      lenis.scrollTo('#contatti', { offset: -80, duration: 1.6 })
    } else {
      const el = document.querySelector('#contatti')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="finishes-cube" id="finishes" ref={sectionRef}>
      <div className="finishes-cube__inner">
        <div className="finishes-cube__head">
          <p className="eyebrow">Il Capitolato</p>
          <h2 className="section-title">
            Le tecnologie <span className="ital">che vedi</span>.
          </h2>
        </div>

        <div className="cube-stage">
          <div className="cube" ref={cubeRef}>
            {BLOCKS.map((b, i) => (
              <article key={b.num} className="cube__face" data-face={i}>
                <div className="cube__face-head">
                  <span className="cube__face-num">— {b.num}</span>
                  <span className="cube__face-cat">{b.cat}</span>
                </div>
                <h3 className="cube__face-title serif">{b.title}</h3>
                <p className="cube__face-intro">{b.intro}</p>
                <ul className="cube__face-brands" aria-label="Marchi selezionati">
                  {b.brands.map((br) => (
                    <li key={br}>{br}</li>
                  ))}
                </ul>
                <div className="cube__face-spec">{b.spec}</div>
              </article>
            ))}
          </div>
        </div>

        <div className="cube-dots" ref={dotsRef} aria-hidden="true">
          {BLOCKS.map((b, i) => (
            <span key={b.num} className={`cube-dot${i === 0 ? ' is-active' : ''}`} />
          ))}
        </div>

        <div className="finishes-cube__cta">
          <a href="#contatti" onClick={handleCapitolato} className="finishes-cube__btn">
            Ottieni il dossier completo
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <p className="finishes-cube__note">
            Quindici minuti al telefono per conoscervi. Poi il consulente dedicato vi manda il dossier completo — quaranta pagine di scelte, calibrate sul vostro interesse.
          </p>
        </div>
      </div>
    </section>
  )
}

import { useRef, type CSSProperties, type MouseEvent } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useLenis } from '../providers/SmoothScrollProvider'

type Unit = {
  num: string
  name: string
  img: string | null
  imgAlt: string
  specs: string
  price: string
  body: string
}

const UNITS: Unit[] = [
  {
    num: '1.B',
    name: 'Bilocale',
    img: null,
    imgAlt: '',
    specs: '65–75 m² · 1 camera · 1 bagno · loggia',
    price: '170.000',
    body:
      'Per chi torna all’essenziale senza rinunciare alla qualità. Pied-à-terre o prima base a Ponteranica.',
  },
  {
    num: '2.T',
    name: 'Trilocale',
    img: null,
    imgAlt: '',
    specs: '90–110 m² · 2 camere · 2 bagni · ampio living',
    price: '295.000',
    body:
      'Il taglio che si adatta a tutto. Living luminoso aperto sulla cucina, due camere, doppi servizi, terrazzo abitabile.',
  },
  {
    num: '3.Q',
    name: 'Quadrilocale',
    img: '/images/units/unit-quadri-pt.webp',
    imgAlt: 'Quadrilocale piano terra EDEL — vista sul giardino privato',
    specs: '120–145 m² · 3 camere · 2 bagni · giardino o terrazza',
    price: '345.000',
    body:
      'Spazio senza eccessi. Tre camere, ampio soggiorno, doppi servizi. Al piano terra con giardino privato; ai piani superiori con terrazza.',
  },
  {
    num: '4.A',
    name: 'Attico',
    img: '/images/units/unit-attico.webp',
    imgAlt: 'Attico EDEL — terrazza panoramica e vista su Bergamo Alta',
    specs: '160–185 m² · piano nobile · terrazza panoramica',
    price: '570.000',
    body:
      'Edizione di un solo esemplare. Vista aperta sulla Città Alta, terrazza panoramica, doppia esposizione. La casa che si sceglie una volta sola.',
  },
]

type StackVarStyle = CSSProperties & { '--stack-i': number }

export default function Units() {
  const lenis = useLenis()
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLElement[]>([])

  const setCardRef = (el: HTMLElement | null, i: number) => {
    if (el) cardsRef.current[i] = el
  }

  const handleAnchor = (e: MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault()
    lenis?.scrollTo(target, { offset: -80, duration: 1.4 })
  }

  useGSAP(
    () => {
      const cards = cardsRef.current.filter(Boolean)
      if (cards.length === 0) return

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        cards.forEach((card, i) => {
          if (i === cards.length - 1) return

          gsap.to(card, {
            scale: 0.9,
            opacity: 0.15,
            y: -30,
            scrollTrigger: {
              trigger: cards[i + 1],
              start: 'top top+=100',
              end: 'top top+=20',
              scrub: 0.6,
            },
          })
        })

        ScrollTrigger.refresh()
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(cards, { scale: 1, opacity: 1, y: 0 })
      })

      return () => mm.revert()
    },
    { scope: sectionRef, dependencies: [] },
  )

  return (
    <section className="units-section" id="residenze" ref={sectionRef}>
      <div className="units-head reveal">
        <div className="eyebrow">Le Tipologie</div>
        <h2 className="section-title">
          Quattro tagli, dodici esemplari,
          <br />
          <span className="ital">una sola idea di abitare</span>.
        </h2>
      </div>

      <div className="units-stack">
        {UNITS.map((u, i) => (
          <article
            key={u.num}
            ref={(el) => setCardRef(el, i)}
            className="unit-card"
            style={{ '--stack-i': i } as StackVarStyle}
          >
            <div className="unit-image-wrap">
              {u.img ? (
                <img src={u.img} alt={u.imgAlt} loading="lazy" />
              ) : (
                <div className="ph-int">
                  <span className="ph-tag">Render in arrivo</span>
                </div>
              )}
            </div>
            <div className="unit-body">
              <div className="unit-eyebrow">— {u.num}</div>
              <h3 className="unit-name serif ital">{u.name}</h3>
              <p className="unit-specs">{u.specs}</p>
              <p className="unit-price">
                <span className="unit-price__label">da</span>
                <span className="unit-price__value">€ {u.price}</span>
              </p>
              <p className="unit-desc">{u.body}</p>
              <a
                href="#contatti"
                className="unit-cta"
                onClick={(e) => handleAnchor(e, '#contatti')}
              >
                Richiedi info →
              </a>
            </div>
          </article>
        ))}
      </div>

      <p className="units-disclaimer reveal">
        Metrature indicative. Distribuzioni interne, finiture e personalizzazioni concordate in fase di capitolato finale presso gli showroom convenzionati Home In Evolution (sede operativa Ranica, BG).
      </p>
    </section>
  )
}

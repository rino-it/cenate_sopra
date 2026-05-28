import { useRef, type CSSProperties } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

type Zone = {
  num: string
  name: string
  img: string | null
  imgAlt: string
  specs: string
  body: string
}

const ZONES: Zone[] = [
  {
    num: '01',
    name: 'Zona giorno',
    img: null,
    imgAlt: '',
    specs: '~105 m² · doppia altezza · vetrate scorrevoli · camino',
    body: 'Il cuore della casa. Dove la giornata comincia e finisce.',
  },
  {
    num: '02',
    name: 'Zona notte',
    img: null,
    imgAlt: '',
    specs: '4 camere · 4 bagni · cabina armadio · lavanderia',
    body: 'Tutte con bagno e cabina. Due sul giardino, due sulla vista valle.',
  },
  {
    num: '03',
    name: 'Wellness',
    img: null,
    imgAlt: '',
    specs: 'piscina · sauna · bagno turco · palestra',
    body: 'Acqua, pietra, calore. La fine giornata che si scrive da sola.',
  },
  {
    num: '04',
    name: 'Outdoor',
    img: null,
    imgAlt: '',
    specs: 'lotto ~2.500 m² · piscina 12×4 m · pergolato · barbecue',
    body: 'Il giardino come quarta stanza. Da vivere tutto l\'anno.',
  },
  {
    num: '05',
    name: 'Servizi',
    img: null,
    imgAlt: '',
    specs: 'garage doppio · cantina · ripostiglio attrezzato',
    body: 'Tre piani sotto la villa. Per le cose, per le bici, per il vino.',
  },
]

type StackVarStyle = CSSProperties & { '--stack-i': number }

export default function Units() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLElement[]>([])

  const setCardRef = (el: HTMLElement | null, i: number) => {
    if (el) cardsRef.current[i] = el
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
        <div className="eyebrow">Le zone</div>
        <h2 className="section-title">
          Una sola villa.
          <br />
          <span className="ital">Cinque ritmi</span>.
        </h2>
      </div>

      <div className="units-stack">
        {ZONES.map((z, i) => (
          <article
            key={z.num}
            ref={(el) => setCardRef(el, i)}
            className="unit-card"
            style={{ '--stack-i': i } as StackVarStyle}
          >
            <div className="unit-image-wrap">
              {z.img ? (
                <img src={z.img} alt={z.imgAlt} loading="lazy" />
              ) : (
                <div className="ph-int">
                  <span className="ph-tag">Render in arrivo</span>
                </div>
              )}
            </div>
            <div className="unit-body">
              <div className="unit-eyebrow">— {z.num}</div>
              <h3 className="unit-name serif ital">{z.name}</h3>
              <p className="unit-specs">{z.specs}</p>
              <p className="unit-desc">{z.body}</p>
            </div>
          </article>
        ))}
      </div>

      <p className="units-disclaimer reveal">
        Metrature indicative. Distribuzione e finiture concordate in fase di capitolato presso showroom convenzionati Edilvertova SRL (sede operativa Gazzaniga, BG).
      </p>
    </section>
  )
}

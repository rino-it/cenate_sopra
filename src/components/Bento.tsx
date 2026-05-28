import { type CSSProperties, type ReactNode } from 'react'

type Card = {
  num: string
  label: string
  img: string
  alt: string
  title: ReactNode
  intro: string
  bullets: string[]
}

const CARDS: Card[] = [
  {
    num: '01',
    label: 'Strutture',
    img: '/images/bento/bento-dettaglio.webp',
    alt: 'Dettaglio architettonico EDEL — patio e ringhiere',
    title: (
      <>
        Strutture sopra la norma <span className="ital">antisismica Cl. 4</span>
      </>
    ),
    intro: 'Pensate per resistere. Per durare.',
    bullets: [
      'Calcestruzzo Penetron impermeabile permanente',
      'Murature Ytong portanti — U ≤ 0,18 W/m²K',
      'Fondazioni oltre i requisiti di legge',
    ],
  },
  {
    num: '02',
    label: 'Energia',
    img: '/images/bento/bento-giardino.webp',
    alt: 'Giardino privato EDEL — verde e zona relax',
    title: (
      <>
        Energia che <span className="ital">si paga da sola</span>
      </>
    ),
    intro: 'Bollette quasi azzerate, comfort tutto l\'anno.',
    bullets: [
      'Classe A4 — pompa di calore Immergas autonoma',
      'Pavimento radiante Rehau Speed',
      'Fotovoltaico 3 kW espandibile + predisposizione accumulo',
    ],
  },
  {
    num: '03',
    label: 'Domotica',
    img: '/images/bento/bento-piazza.webp',
    alt: 'Spazi comuni EDEL — piazza interna',
    title: (
      <>
        Domotica <span className="ital">che non spaventa</span>
      </>
    ),
    intro: 'Smart quando serve, semplice quando vuoi.',
    bullets: [
      'BTicino Living Now livello 3, app Home+ Control',
      'Luci, tapparelle e oscuranti motorizzati',
      'Videocitofono Linea 3000 con WiFi',
    ],
  },
  {
    num: '04',
    label: 'Capitolato',
    img: '/images/bento/bento-terrazza.webp',
    alt: 'Terrazza attico EDEL — vista colline',
    title: (
      <>
        Capitolato <span className="ital">aperto</span>
      </>
    ),
    intro: 'Si scelgono insieme nelle showroom convenzionate.',
    bullets: [
      'Garofoli (porte), Grohe (rubinetterie), Ideal Standard (sanitari)',
      'Parquet rovere prefinito 14 mm',
      "Personalizzazioni in corso d'opera",
    ],
  },
]

export default function Bento() {
  return (
    <section className="bento-section" id="progetto">
      <div className="bento-head reveal">
        <div className="eyebrow">Qualità Costruttiva</div>
        <h2 className="section-title">
          Quattro motivi per scegliere
          <br />
          <span className="ital">EDEL</span>.
        </h2>
      </div>
      <div className="bento-grid bento-grid-4">
        {CARDS.map((c, i) => (
          <div
            key={c.num}
            className="bento-card image"
            style={{ '--bento-i': i } as CSSProperties}
          >
            <div className="bento-img-bg">
              <img src={c.img} alt={c.alt} loading="lazy" />
            </div>
            <div className="bento-text">
              <div className="bento-num">
                {c.num} — {c.label}
              </div>
              <h3 className="bento-card-title">{c.title}</h3>
              <p className="bento-intro">{c.intro}</p>
              <ul className="bento-bullets">
                {c.bullets.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

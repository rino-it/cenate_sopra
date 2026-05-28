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
    label: 'Mattina',
    img: '/images/bento/bento-mattina.webp',
    alt: 'Cucina open space con isola, luce mattutina',
    title: (
      <>
        La cucina che sta <span className="ital">sveglia con voi</span>
      </>
    ),
    intro: 'Doppia esposizione. Luce da est, vetrate a tutta altezza.',
    bullets: [
      'Open space ~38 m² con isola centrale',
      'Dispensa walk-in, doppio forno, piano induzione',
      'Affaccio diretto sul giardino e sulla colazione',
    ],
  },
  {
    num: '02',
    label: 'Pomeriggio',
    img: '/images/bento/bento-pomeriggio.webp',
    alt: 'Soggiorno a doppia altezza con vetrate scorrevoli',
    title: (
      <>
        L'altezza che vi fa <span className="ital">respirare</span>
      </>
    ),
    intro: 'Soggiorno a doppia altezza, vetrate scorrevoli a tutta parete.',
    bullets: [
      'Living ~65 m², altezza 6 m',
      'Camino centrale, parete TV a scomparsa',
      'Patio interno a doppia altezza',
    ],
  },
  {
    num: '03',
    label: 'Sera',
    img: '/images/bento/bento-sera.webp',
    alt: 'Piscina riscaldata vista valle al tramonto',
    title: (
      <>
        L'acqua <span className="ital">di casa</span>
      </>
    ),
    intro: 'Piscina, SPA privata, palestra. La fine giornata che si scrive da sola.',
    bullets: [
      'Piscina riscaldata 12×4 m, vista valle',
      'Sauna finlandese, bagno turco, palestra dedicata',
      'Pavimentazione esterna in pietra di Sarnico',
    ],
  },
  {
    num: '04',
    label: 'Notte',
    img: '/images/bento/bento-notte.webp',
    alt: 'Giardino e parco notturno con illuminazione scenica',
    title: (
      <>
        Il giardino come <span className="ital">quarta stanza</span>
      </>
    ),
    intro: 'Lotto ~2.500 m², illuminazione scenica, accesso privato.',
    bullets: [
      'Parco con essenze autoctone, pergolato in legno',
      'Cancello motorizzato, accesso carrabile dedicato',
      'Distanza dai vicini oltre 30 m su 3 lati',
    ],
  },
]

export default function Bento() {
  return (
    <section className="bento-section" id="progetto">
      <div className="bento-head reveal">
        <div className="eyebrow">Vivere qui</div>
        <h2 className="section-title">
          Quattro capitoli
          <br />
          <span className="ital">di una sola giornata</span>.
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

import { type MouseEvent, type ReactNode, useState } from 'react'
import { useLenis } from '../providers/SmoothScrollProvider'

type QA = {
  q: string
  a: ReactNode
  schema: string
}

const FAQS: QA[] = [
  {
    q: 'La villa è disponibile o già impegnata?',
    a: (
      <>
        <p><strong>In questa fase è ancora libera.</strong></p>
        <p>Le manifestazioni di interesse vengono gestite in ordine d'arrivo: chi entra prima ha più margine su personalizzazioni e tempistica.</p>
      </>
    ),
    schema:
      'In questa fase è ancora libera. Le manifestazioni di interesse vengono gestite in ordine d\'arrivo: chi entra prima ha più margine su personalizzazioni e tempistica.',
  },
  {
    q: 'Posso personalizzare materiali e distribuzione?',
    a: (
      <>
        <p><strong>Sì, finché siamo in fase strutturale.</strong></p>
        <p>Più presto bloccate la villa, più ampio è il margine per intervenire su materiali, distribuzione interna, scelte di capitolato.</p>
      </>
    ),
    schema:
      'Sì, finché siamo in fase strutturale. Più presto bloccate la villa, più ampio è il margine per intervenire su materiali, distribuzione e capitolato.',
  },
  {
    q: 'Quando avviene la consegna?',
    a: (
      <>
        <p>Lo stato lavori e il cronoprogramma sono nel dossier completo.</p>
        <p><strong>La data prevista di consegna viene confermata in fase di trattativa</strong>, in funzione delle personalizzazioni richieste.</p>
      </>
    ),
    schema:
      'Lo stato lavori e il cronoprogramma sono nel dossier completo. La data prevista di consegna viene confermata in trattativa, in funzione delle personalizzazioni richieste.',
  },
  {
    q: 'Il prezzo è negoziabile?',
    a: (
      <>
        <p><strong>Il prezzo è uno.</strong></p>
        <p>La trattativa è sulle personalizzazioni: capitolato, scelte materiali, integrazioni wellness. Una villa singola si vende una volta sola.</p>
      </>
    ),
    schema:
      'Il prezzo è uno. La trattativa è sulle personalizzazioni: capitolato, scelte materiali, integrazioni wellness.',
  },
  {
    q: 'Che garanzie ho sulla qualità costruttiva?',
    a: (
      <>
        <p>Classe A4, sismica Cl.4, garanzie di legge sulle nuove costruzioni, polizza decennale postuma.</p>
        <p><strong>Edilvertova è attiva sul mercato bergamasco da oltre 55 anni</strong>: i cantieri firmati sono visitabili.</p>
      </>
    ),
    schema:
      'Classe A4, sismica Cl.4, garanzie di legge sulle nuove costruzioni, polizza decennale postuma. Edilvertova è attiva sul mercato bergamasco da oltre 55 anni e i cantieri firmati sono visitabili.',
  },
  {
    q: 'È un buon investimento, oltre che una casa?',
    a: (
      <>
        <p><strong>Cenate Sopra è zona in apprezzamento.</strong></p>
        <p>Le ville singole di pregio in collina bergamasca hanno tenuto e accresciuto valore rispetto al decennio scorso. La rivendibilità di un prodotto unico, in zona protetta, è strutturalmente alta.</p>
      </>
    ),
    schema:
      'Cenate Sopra è zona in apprezzamento. Le ville singole di pregio in collina bergamasca hanno tenuto valore. La rivendibilità di un prodotto unico in zona protetta è strutturalmente alta.',
  },
  {
    q: 'Quanto tempo ho per decidere?',
    a: (
      <>
        <p><strong>Meno di quanto pensiate.</strong></p>
        <p>Le ville singole non si replicano: quando un compratore qualificato la sceglie, l'opportunità si chiude. Quindici minuti di telefonata bastano per capire se vale la pena approfondire.</p>
      </>
    ),
    schema:
      'Meno di quanto pensiate. Le ville singole non si replicano: quando un compratore qualificato la sceglie, l\'opportunità si chiude.',
  },
]

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(({ q, schema }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: schema },
  })),
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)
  const lenis = useLenis()

  const toggle = (i: number) => {
    setOpenIdx((curr) => (curr === i ? null : i))
  }

  const handleAnchor = (e: MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault()
    if (lenis) {
      lenis.scrollTo(target, { offset: -80, duration: 1.4 })
    } else {
      const el = document.querySelector(target)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="faq" id="faq">
      <header className="faq-header reveal">
        <p className="eyebrow">FAQ</p>
        <h2 className="section-title">
          Le domande che <span className="ital">fanno la differenza</span>.
        </h2>
      </header>

      <ul className="faq-list">
        {FAQS.map((item, i) => {
          const open = openIdx === i
          const id = `faq-panel-${i}`
          return (
            <li key={i} className={`faq-item${open ? ' open' : ''}`}>
              <button
                type="button"
                className="faq-q"
                aria-expanded={open}
                aria-controls={id}
                onClick={() => toggle(i)}
              >
                <span className="faq-q-text">{item.q}</span>
                <span className="faq-q-icon" aria-hidden="true">
                  {open ? '−' : '+'}
                </span>
              </button>
              <div
                id={id}
                className="faq-a"
                role="region"
                aria-hidden={!open}
              >
                <div className="faq-a-content">{item.a}</div>
              </div>
            </li>
          )
        })}
      </ul>

      <div className="faq-cta-banner reveal">
        <h3 className="faq-cta-title serif">
          Volete capire se la villa <span className="ital">fa per voi</span>?
        </h3>
        <p className="faq-cta-sub">
          Bastano pochi minuti per capire se ha senso approfondire.
        </p>
        <a
          href="#contatti"
          className="faq-cta-btn"
          onClick={(e) => handleAnchor(e, '#contatti')}
        >
          Richiedi il dossier
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>

      <footer className="faq-footer reveal">
        <p>
          Altre domande? Scriveteci dal form qui sotto — risposta entro 24 ore lavorative.
        </p>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
    </section>
  )
}

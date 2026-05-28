# Cenate Sopra — Copy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sostituire interamente il copy EDEL del fork con il copy Cenate Sopra (villa singola, narrativa quotidiano-emotiva), parametrizzare i dati commerciali in un singolo file di config, e verificare zero residui EDEL.

**Architecture:** Modifiche puntuali su 18 componenti React + 1 file index.html + supabase.ts (`PROJECT_ID` only) + 1 nuovo file `src/lib/project-config.ts` come single-source-of-truth per nomi/numeri commerciali. Nessuna modifica strutturale ai componenti (CSS, animazioni GSAP, hook Lenis tutti invariati) — solo dati e stringhe.

**Tech Stack:** Vite 8, React 19, TypeScript 6, Tailwind 3.4, GSAP 3.15 + ScrollTrigger, Lenis 1.3, Supabase REST.

**Spec di riferimento:** `docs/superpowers/specs/2026-05-27-cenate-sopra-copy-design.md`

**Verifica TDD-adattata al copy:** Ogni task usa un *grep smoke check* prima e dopo l'edit. Pre-edit: la stringa EDEL deve essere presente. Post-edit: la stringa EDEL deve essere assente E la stringa Cenate deve essere presente. Build TS deve passare dopo ogni edit non triviale.

---

## File Structure

**Modifiche** (18 file):
- `index.html` — meta `<title>`, description, og:*
- `src/lib/supabase.ts` — solo `PROJECT_ID`
- `src/components/Nav.tsx` — logo path + CTA label
- `src/components/Hero.tsx` — h1, sub, alt, CTA labels, CTA secondario href
- `src/components/Marquee.tsx` — array `ITEMS`
- `src/components/Statement.tsx` — h2 + body
- `src/components/Vista.tsx` — h2 + body + alt
- `src/components/Bento.tsx` — array `CARDS` (4 entries) + section heading
- `src/components/TimesOfDay.tsx` — array `STATES` (4 entries) + alts
- `src/components/Units.tsx` — refactor: `UNITS` → `ZONES` (5), remove price/CTA per item, disclaimer
- `src/components/Founder.tsx` — quote + array `STATS`
- `src/components/Gallery.tsx` — array `CARDS` (6 entries)
- `src/components/Location.tsx` — h2, body, address, array `PLACES`
- `src/components/Finishes.tsx` — array `BLOCKS` (4 entries) + CTA note
- `src/components/FAQ.tsx` — array `FAQS` (7 entries) + JSONLD + footer
- `src/components/Lead.tsx` — refactor completo (vedi Task 18)
- `src/components/CallbackPanel.tsx` — eyebrow, h3, sub, success
- `src/components/StickyBar.tsx` — testo bottoni + href parametrico
- `src/components/Footer.tsx` — copy + parametrizzazioni

**Nuovo** (1 file):
- `src/lib/project-config.ts` — single-source-of-truth dati commerciali (brand, agency placeholder, contatti)

**Boundary**: tutti i nomi/numeri/contatti commerciali leggono SOLO da `project-config.ts`. I componenti non hanno stringhe agente/agenzia hardcoded. Modificare progetto-target = modificare un singolo file.

---

## Pre-execution: Inizializza git (opzionale ma raccomandato)

Il progetto `cenate-sopra` non è un repo git (escluso da robocopy iniziale). Senza git i commit non sono possibili e i rollback diventano manuali. Raccomando di inizializzare prima di partire.

- [ ] **Step 0.1: Verifica stato git**

Run: `cd C:\Users\krist\Desktop\cenate-sopra && git status`
Expected: `fatal: not a git repository`

- [ ] **Step 0.2: Inizializza repo**

Run:
```bash
cd C:\Users\krist\Desktop\cenate-sopra
git init
git add .
git commit -m "chore: initial import from edel fork"
```
Expected: `Initialized empty Git repository ...`, poi commit creato con tutti i file fork-EDEL come baseline.

> Se l'utente preferisce non usare git, salta tutti gli step `git add` / `git commit` nei task successivi. Le modifiche restano su filesystem.

---

## Task 1: Crea `src/lib/project-config.ts` (single-source-of-truth dati commerciali)

**Files:**
- Create: `src/lib/project-config.ts`

- [ ] **Step 1.1: Crea il file di config**

Crea il file con questo contenuto esatto:

```ts
// src/lib/project-config.ts
// Single-source-of-truth per dati commerciali del progetto.
// Modificare questo file = ri-personalizzare l'intera landing per un altro progetto.

export const PROJECT_CONFIG = {
  // Identità progetto
  projectName: 'Cenate Sopra',
  projectLocation: 'Cenate Sopra (BG)',
  projectAddress: 'Via [da definire] · Cenate Sopra (BG)',
  builderName: 'Edilvertova SRL',
  builderTagline: 'dal 1969',
  builderFullLegal: 'Edilvertova SRL · Via IV Novembre 6, 24025 Gazzaniga (BG) · P.IVA / CF 00811260165 · CCIAA Bergamo',

  // Agenzia commercializzazione (placeholder finché non confermata)
  agentName: '[Nome agente]',
  agentPhone: '+39 000 000 0000',
  agentPhoneHref: 'tel:+390000000000',
  agentPhoneDisplay: '+39 000 000 0000',
  agentEmail: 'contatti@example.com',
  agentWhatsAppNumber: '390000000000',
  agentHours: 'Lun–Ven · 9:00–19:30',
  agencyAddress: '[Indirizzo studio]',
  agencyCity: '[Città]',

  // Asset
  logoPath: '/images/logo/logo_cenate_sopra.png',
  logoAlt: 'Cenate Sopra',
  builderLogoPath: '/images/logo/logo_edilvertova.png',
  agencyLogoPath: '/images/logo/logo_agenzia.png',

  // Brochure PDF (inviato post-form-submit via email, NON link diretto)
  brochurePath: '/brochure-cenate-sopra.pdf',

  // Supabase data tagging (usato dai componenti che inviano lead)
  leadSource: 'landing_cenate_sopra',

  // URL geo
  mapsUrl: 'https://maps.google.com/?q=Cenate+Sopra+Bergamo',
} as const

export type ProjectConfig = typeof PROJECT_CONFIG
```

- [ ] **Step 1.2: Verifica TS compile**

Run: `npm run build`
Expected: build PASS, zero errori TypeScript.

- [ ] **Step 1.3: Commit**

```bash
git add src/lib/project-config.ts
git commit -m "feat(config): add project-config single-source-of-truth"
```

---

## Task 2: Aggiorna `src/lib/supabase.ts` — solo `PROJECT_ID`

**Files:**
- Modify: `src/lib/supabase.ts:5`

- [ ] **Step 2.1: Verifica stato pre-edit**

Run: `grep -n "edel-ponteranica" src/lib/supabase.ts`
Expected: `5:export const PROJECT_ID = 'edel-ponteranica'`

- [ ] **Step 2.2: Cambia il valore**

Sostituisci la riga 5:

```ts
export const PROJECT_ID = 'cenate-sopra'
```

Tutto il resto del file (URL, ANON_KEY, table names, sendLead/subscribeNewsletter/requestCallback) resta invariato.

- [ ] **Step 2.3: Verifica post-edit**

Run: `grep -n "PROJECT_ID" src/lib/supabase.ts`
Expected: `5:export const PROJECT_ID = 'cenate-sopra'`

Run: `grep -ri "edel-ponteranica" src/`
Expected: zero matches (la stringa è scomparsa dal codice).

- [ ] **Step 2.4: Commit**

```bash
git add src/lib/supabase.ts
git commit -m "feat(supabase): change PROJECT_ID to cenate-sopra"
```

---

## Task 3: Aggiorna `index.html` — title, meta, og:*

**Files:**
- Modify: `index.html:10-14`

- [ ] **Step 3.1: Stato attuale**

Le righe 10-14 contengono ora tag vuoti (da fase precedente: `<title></title>` + 4 meta vuoti).

- [ ] **Step 3.2: Compila i tag meta**

Sostituisci righe 10-14 con:

```html
    <title>Cenate Sopra — Villa di pregio · Bergamo</title>
    <meta name="description" content="Una villa singola di pregio sulle colline di Cenate Sopra (BG). Architettura, wellness privato, vista valle. Un progetto Edilvertova SRL, dal 1969." />
    <meta property="og:title" content="Cenate Sopra — Villa di pregio · Bergamo" />
    <meta property="og:description" content="Una villa singola di pregio sulle colline di Cenate Sopra (BG). Architettura, wellness privato, vista valle." />
    <meta property="og:image" content="/og-image-cenate-sopra.jpg" />
```

- [ ] **Step 3.3: Verifica**

Run: `grep -c "Cenate Sopra" index.html`
Expected: `3` (almeno 3 occorrenze: title, og:title, og:description)

- [ ] **Step 3.4: Commit**

```bash
git add index.html
git commit -m "feat(html): set Cenate Sopra meta and OG tags"
```

---

## Task 4: `src/components/Nav.tsx` — logo + CTA

**Files:**
- Modify: `src/components/Nav.tsx`

- [ ] **Step 4.1: Verifica stato pre-edit**

Run: `grep -n "logo_edel\|Richiedi info\|EDEL Ponteranica" src/components/Nav.tsx`
Expected: 2 match (`logo_edel.png`, `EDEL Ponteranica`, `Richiedi info`).

- [ ] **Step 4.2: Importa il config e sostituisci**

In testa al file, dopo gli import esistenti, aggiungi:

```ts
import { PROJECT_CONFIG } from '../lib/project-config'
```

Sostituisci il blocco `<div className="logo">...</div>` (righe 22-24) con:

```tsx
      <div className="logo">
        <img src={PROJECT_CONFIG.logoPath} alt={PROJECT_CONFIG.logoAlt} />
      </div>
```

Sostituisci il testo del CTA (riga 30) da `Richiedi info` a `Ricevi il dossier`:

```tsx
        Ricevi il dossier
```

- [ ] **Step 4.3: Verifica post-edit**

Run: `grep -i "edel\|ponteranica\|richiedi info" src/components/Nav.tsx`
Expected: zero matches.

Run: `npm run build`
Expected: PASS.

- [ ] **Step 4.4: Commit**

```bash
git add src/components/Nav.tsx
git commit -m "feat(nav): use project-config logo and Cenate CTA"
```

---

## Task 5: `src/components/Hero.tsx` — titolo, sub, CTA

**Files:**
- Modify: `src/components/Hero.tsx`

- [ ] **Step 5.1: Sostituisci il blocco JSX `<section>...</section>`**

Sostituisci l'intera `return (...)` (righe 38-81) con:

```tsx
  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <img
          src="/images/hero/hero-main.jpg"
          alt="Render esterno Villa Cenate Sopra — vista frontale collinare"
          loading="eager"
          fetchPriority="high"
        />
      </div>
      <div className="hero-inner">
        <h1 className="serif hero-title">
          Sopra Bergamo, una villa <span className="ital">fatta per restarci</span>.
          <br />
          Vent'anni davanti. Una sola scelta.
        </h1>
        <p className="hero-sub hero-sub-meta">
          <span className="hero-trust-dot">●</span> Cenate Sopra · Bergamo · Classe A4
          <br />
          Una villa
        </p>
        <div className="hero-cta-row">
          <a
            href="#contatti"
            className="btn-primary"
            onClick={(e) => handleAnchor(e, '#contatti')}
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
          >
            Ricevi il dossier
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <a
            href="#callback"
            className="btn-ghost"
            onClick={(e) => handleAnchor(e, '#callback')}
          >
            Parla con il consulente
          </a>
        </div>
      </div>
    </section>
  )
```

> Cambiamenti: alt nuovo, h1 nuovo, sub nuovo, CTA primario = "Ricevi il dossier", CTA secondario = "Parla con il consulente" che ora va a `#callback` invece di un PDF.

- [ ] **Step 5.2: Verifica**

Run: `grep -i "edel\|ponteranica\|12 unit\|brochure-edel" src/components/Hero.tsx`
Expected: zero matches.

Run: `npm run build`
Expected: PASS.

- [ ] **Step 5.3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat(hero): Cenate Sopra hero copy and CTAs"
```

---

## Task 6: `src/components/Marquee.tsx` — array `ITEMS`

**Files:**
- Modify: `src/components/Marquee.tsx:1-8`

- [ ] **Step 6.1: Sostituisci array ITEMS**

Sostituisci righe 1-8 (l'array `ITEMS`) con:

```ts
const ITEMS = [
  'Cenate Sopra',
  'Una villa',
  'Vista valle',
  'Wellness privato',
  'Classe A4',
  'Sismica Cl.4',
  'Edilvertova · dal 1969',
]
```

Resto del componente (la funzione `Marquee()` da riga 10 in poi) invariato.

- [ ] **Step 6.2: Verifica**

Run: `grep -i "ponteranica\|12 unit\|110.*280\|dal 1962" src/components/Marquee.tsx`
Expected: zero matches.

- [ ] **Step 6.3: Commit**

```bash
git add src/components/Marquee.tsx
git commit -m "feat(marquee): Cenate Sopra running tags"
```

---

## Task 7: `src/components/Statement.tsx` — manifesto

**Files:**
- Modify: `src/components/Statement.tsx:1-19`

- [ ] **Step 7.1: Sostituisci tutto il componente**

Sostituisci l'intero file con:

```tsx
export default function Statement() {
  return (
    <section className="statement" id="statement">
      <div className="reveal">
        <div className="eyebrow">Il Progetto</div>
        <h2 className="statement-text">
          Non si compra una villa. <span className="ital">Si sceglie una vita</span>.
          <br />
          Una sola, sopra Bergamo, sulle colline di Cenate Sopra,
          <br />
          fatta per durare il tempo dei figli.
        </h2>
        <p className="statement-body">
          Sessant'anni di cantieri bergamaschi. Una villa. Una scelta che dura.
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 7.2: Verifica**

Run: `grep -i "ponteranica\|dodici case\|dal 1962" src/components/Statement.tsx`
Expected: zero matches.

- [ ] **Step 7.3: Commit**

```bash
git add src/components/Statement.tsx
git commit -m "feat(statement): Cenate Sopra manifesto"
```

---

## Task 8: `src/components/Vista.tsx` — apertura geografica

**Files:**
- Modify: `src/components/Vista.tsx:1-22`

- [ ] **Step 8.1: Sostituisci tutto il componente**

```tsx
export default function Vista() {
  return (
    <section className="vista reveal" id="vista">
      <div className="vista-bg">
        <img
          src="/images/vista/vista-panoramica.jpg"
          alt="Vista panoramica Villa Cenate Sopra — colline di Val Cavallina e pianura bergamasca"
          loading="lazy"
        />
      </div>
      <div className="vista-content">
        <p className="vista-eyebrow">La vista</p>
        <h2 className="vista-title">
          La pianura davanti. Le Orobie alle spalle. <span className="ital">Voi nel mezzo</span>.
        </h2>
        <p className="vista-body">
          A Cenate Sopra la collina diventa terrazza. Venticinque minuti da Bergamo, ottanta passi dal silenzio.
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 8.2: Verifica**

Run: `grep -i "ponteranica\|bergamo alta è là" src/components/Vista.tsx`
Expected: zero matches.

- [ ] **Step 8.3: Commit**

```bash
git add src/components/Vista.tsx
git commit -m "feat(vista): Cenate Sopra geographic opener"
```

---

## Task 9: `src/components/Bento.tsx` — "Quattro capitoli di una giornata"

**Files:**
- Modify: `src/components/Bento.tsx:13-94`

- [ ] **Step 9.1: Sostituisci array CARDS**

Sostituisci l'array `CARDS` (righe 13-82) con:

```ts
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
```

- [ ] **Step 9.2: Sostituisci section heading**

Sostituisci righe 87-92 (`<div className="bento-head reveal">...</div>`) con:

```tsx
      <div className="bento-head reveal">
        <div className="eyebrow">Vivere qui</div>
        <h2 className="section-title">
          Quattro capitoli
          <br />
          <span className="ital">di una sola giornata</span>.
        </h2>
      </div>
```

- [ ] **Step 9.3: Verifica**

Run: `grep -i "EDEL\|Penetron\|Ytong\|Immergas\|BTicino\|Garofoli" src/components/Bento.tsx`
Expected: zero matches (i brand tech vanno tutti in Finishes ora).

Run: `npm run build`
Expected: PASS.

- [ ] **Step 9.4: Commit**

```bash
git add src/components/Bento.tsx
git commit -m "feat(bento): four daily chapters narrative"
```

---

## Task 10: `src/components/TimesOfDay.tsx` — 4 stati Cenate

**Files:**
- Modify: `src/components/TimesOfDay.tsx:15-52`

- [ ] **Step 10.1: Sostituisci array STATES**

Sostituisci l'array `STATES` (righe 15-52) con:

```ts
const STATES: TodState[] = [
  {
    key: 'dawn',
    time: '06:42',
    title: 'L\'alba sulle vigne.',
    body: 'La luce arriva dalla pianura. Bergamo non c\'è ancora.',
    textColor: '#1a1a1a',
    img: '/images/tod/dawn.jpg',
    alt: 'Alba sulle colline di Cenate Sopra — pianura bergamasca in lontananza',
  },
  {
    key: 'day',
    time: '12:00',
    title: 'Mezzogiorno.',
    body: 'Le Orobie alle spalle. Cenate Sopra al sole. La giornata aperta davanti.',
    textColor: '#1a1a1a',
    img: '/images/tod/day.jpg',
    alt: 'Mezzogiorno a Cenate Sopra — Orobie e vigne',
  },
  {
    key: 'dusk',
    time: '19:10',
    title: 'Le sette e dieci.',
    body: 'Il sole sparisce dietro le valli. Il vino è già aperto.',
    textColor: '#f5f5f0',
    img: '/images/tod/dusk.jpg',
    alt: 'Tramonto sulla Val Cavallina visto da Cenate Sopra',
  },
  {
    key: 'night',
    time: '22:00',
    title: 'Le ventidue.',
    body: 'Le luci di Bergamo, in fondo. Sopra di voi, solo le stelle.',
    textColor: '#f5f5f0',
    img: '/images/tod/night.jpg',
    alt: 'Vista notturna da Cenate Sopra — luci di Bergamo in lontananza',
  },
]
```

- [ ] **Step 10.2: Verifica**

Run: `grep -i "ponteranica\|bergamo alta" src/components/TimesOfDay.tsx`
Expected: zero matches.

- [ ] **Step 10.3: Commit**

```bash
git add src/components/TimesOfDay.tsx
git commit -m "feat(timesofday): Cenate Sopra four temporal states"
```

---

## Task 11: `src/components/Units.tsx` — refactor in "Zone della villa"

Questa è la modifica più sostanziale dopo Lead.tsx. Il file resta `Units.tsx` (per non rompere CSS e import), ma l'array si chiama `ZONES`, scompaiono prezzo e CTA per item, ci sono 5 zone invece di 4 tagli.

**Files:**
- Modify: `src/components/Units.tsx`

- [ ] **Step 11.1: Sostituisci il type e l'array**

Sostituisci il type `Unit` e l'array `UNITS` (righe 7-58) con:

```ts
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
```

- [ ] **Step 11.2: Aggiorna i ref types e la funzione `Units()`**

Sostituisci il blocco da `export default function Units()` fino alla fine del file (righe 62-166) con:

```tsx
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
```

> Cambiamenti chiave: `Unit` → `Zone`, `UNITS` → `ZONES`, rimossi `price` e `unit-price`, rimosso `<a className="unit-cta">` per ogni zona, rimosso `useLenis` hook + `handleAnchor` (non più necessari), rimossi import `MouseEvent` (rimuovi `MouseEvent` dall'import React), rimosso import `useLenis`.

- [ ] **Step 11.3: Pulisci gli import in cima al file**

Sostituisci le righe 1-5 (gli import) con:

```ts
import { useRef, type CSSProperties } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
```

(Rimosso `type MouseEvent` e l'import di `useLenis`.)

- [ ] **Step 11.4: Verifica**

Run: `grep -i "Bilocale\|Trilocale\|Quadrilocale\|Attico\|unit-price\|Home In Evolution\|Ranica" src/components/Units.tsx`
Expected: zero matches.

Run: `npm run build`
Expected: PASS. Se TypeScript segnala `MouseEvent` o `useLenis` non usati, sono già rimossi negli step precedenti — non dovrebbe accadere. Se accade, ricontrolla gli import.

- [ ] **Step 11.5: Commit**

```bash
git add src/components/Units.tsx
git commit -m "feat(zones): refactor Units into five villa zones"
```

---

## Task 12: `src/components/Founder.tsx` — Costruttore Edilvertova

**Files:**
- Modify: `src/components/Founder.tsx:3-7,76-90`

- [ ] **Step 12.1: Sostituisci array STATS**

Sostituisci righe 3-7 con:

```ts
const STATS: Array<{ value: number; suffix?: string; label: string }> = [
  { value: 55, suffix: '+', label: 'anni di mestiere' },
  { value: 120, suffix: '+', label: 'cantieri firmati' },
  { value: 1, label: 'villa, unica' },
]
```

- [ ] **Step 12.2: Sostituisci la quote**

Sostituisci righe 78-82 (il `<blockquote>`) con:

```tsx
        <blockquote className="founder__quote">
          <p>
            "Una casa è ben fatta quando, vent'anni dopo, non chiede nulla. È lo standard di Edilvertova."
          </p>
        </blockquote>
```

- [ ] **Step 12.3: Verifica**

Run: `grep -i "cinquant'anni senza chiedere scuse\|12.*unità EDEL\|87" src/components/Founder.tsx`
Expected: zero matches.

- [ ] **Step 12.4: Commit**

```bash
git add src/components/Founder.tsx
git commit -m "feat(founder): Edilvertova builder stats and quote"
```

---

## Task 13: `src/components/Gallery.tsx` — didascalie villa

**Files:**
- Modify: `src/components/Gallery.tsx:13-50`

- [ ] **Step 13.1: Sostituisci array CARDS**

Sostituisci righe 13-50 con:

```ts
const CARDS: Card[] = [
  {
    num: '01',
    ttl: 'Render esterno',
    src: '/images/gallery/gallery-01.webp',
    alt: 'Render esterno frontale della villa, vista valle',
  },
  {
    num: '02',
    ttl: 'Soggiorno doppia altezza',
    src: '/images/gallery/gallery-02.webp',
    alt: 'Soggiorno a doppia altezza con vetrate a tutta parete',
  },
  {
    num: '03',
    ttl: 'Vista valle dalla terrazza',
    src: '/images/gallery/gallery-03.webp',
    alt: 'Vista valle e Orobie dalla terrazza principale',
  },
  {
    num: '04',
    ttl: 'Piscina + giardino',
    src: '/images/gallery/gallery-04.webp',
    alt: 'Piscina 12×4 m e giardino paesaggistico',
  },
  {
    num: '05',
    ttl: 'Cucina + isola',
    src: '/images/gallery/gallery-05.webp',
    alt: 'Cucina open space con isola centrale e affaccio giardino',
  },
  {
    num: '06',
    ttl: 'Pianta villa',
    src: '/images/gallery/gallery-06.webp',
    alt: 'Pianta architettonica dei tre livelli',
  },
]
```

> Nota: gallery-06 cambia source da `/images/units/unit-quadri-p2.webp` a `/images/gallery/gallery-06.webp` per coerenza.

- [ ] **Step 13.2: Verifica**

Run: `grep -i "EDEL\|Quadrilocale\|Ponteranica" src/components/Gallery.tsx`
Expected: zero matches.

- [ ] **Step 13.3: Commit**

```bash
git add src/components/Gallery.tsx
git commit -m "feat(gallery): villa-themed gallery captions"
```

---

## Task 14: `src/components/Location.tsx` — Cenate-centric

**Files:**
- Modify: `src/components/Location.tsx`

- [ ] **Step 14.1: Importa il config e sostituisci**

Sostituisci l'intero file con:

```tsx
import { PROJECT_CONFIG } from '../lib/project-config'

const PLACES: Array<[string, string, string]> = [
  ['01', 'Bergamo Alta', '30 min'],
  ['02', 'Aeroporto Orio', '25 min'],
  ['03', 'Casello A4 Seriate', '20 min'],
  ["04", "Lago d'Iseo", '25 min'],
]

export default function Location() {
  return (
    <section className="location" id="location">
      <div className="location-inner">
        <div className="reveal">
          <div className="eyebrow">La Posizione</div>
          <h2 className="section-title">
            Venticinque minuti da Bergamo.
            <br />
            <span className="ital">Un mondo a parte</span>.
          </h2>
          <p className="location-address">{PROJECT_CONFIG.projectAddress}</p>
          <p className="location-text">
            Cenate Sopra è la collina di Bergamo che non c'è sulle cartoline. Vigne, boschi, silenzio. Eppure il casello A4 di Seriate è a venti minuti, l'aeroporto di Orio a venticinque, Bergamo Alta a mezz'ora. Bastano i posti che servono — niente di più, niente di meno.
          </p>
        </div>
        <ul className="loc-list reveal reveal-d1">
          {PLACES.map(([num, name, time]) => (
            <li key={num} className="loc-row">
              <span className="loc-num">{num}</span>
              <span className="loc-name serif">{name}</span>
              <span className="loc-time">{time}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
```

- [ ] **Step 14.2: Verifica**

Run: `grep -i "Ponteranica\|Via 4 Novembre\|Dalmine\|Fermata ATB" src/components/Location.tsx`
Expected: zero matches.

- [ ] **Step 14.3: Commit**

```bash
git add src/components/Location.tsx
git commit -m "feat(location): Cenate Sopra geographic context"
```

---

## Task 15: `src/components/Finishes.tsx` — capitolato

**Files:**
- Modify: `src/components/Finishes.tsx:16-69,138-189`

- [ ] **Step 15.1: Sostituisci array BLOCKS**

Sostituisci righe 16-69 con:

```ts
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
```

- [ ] **Step 15.2: Aggiorna la CTA + nota**

Cerca nel file la parte `<div className="finishes-cube__cta">` (intorno a riga 175). Sostituisci il blocco:

```tsx
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
```

- [ ] **Step 15.3: Aggiorna sessionStorage key e custom event**

Cerca nel file (intorno a riga 122-130):

```ts
  useEffect(() => {
    sessionStorage.removeItem('edel_request_capitolato')
  }, [])

  const handleCapitolato = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    sessionStorage.setItem('edel_request_capitolato', 'true')
    window.dispatchEvent(new CustomEvent('edel:request-capitolato'))
```

Sostituisci con:

```ts
  useEffect(() => {
    sessionStorage.removeItem('cenate_request_dossier')
  }, [])

  const handleCapitolato = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    sessionStorage.setItem('cenate_request_dossier', 'true')
    window.dispatchEvent(new CustomEvent('cenate:request-dossier'))
```

- [ ] **Step 15.4: Verifica**

Run: `grep -i "Giuseppe Rinaldi\|Massimo Brissoni\|edel_request\|edel:request" src/components/Finishes.tsx`
Expected: zero matches.

Run: `npm run build`
Expected: PASS.

- [ ] **Step 15.5: Commit**

```bash
git add src/components/Finishes.tsx
git commit -m "feat(finishes): Cenate Sopra capitolato materials"
```

---

## Task 16: `src/components/FAQ.tsx` — 7 domande nuove + JSONLD

**Files:**
- Modify: `src/components/FAQ.tsx:10-119,198-210`

- [ ] **Step 16.1: Sostituisci array FAQS**

Sostituisci l'array `FAQS` (righe 10-109) con:

```ts
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
```

- [ ] **Step 16.2: Aggiorna CTA banner e footer**

Cerca nel file (intorno a riga 179-209) il blocco `<div className="faq-cta-banner reveal">` e `<footer className="faq-footer reveal">`. Sostituisci entrambi con:

```tsx
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
```

> Cambiamenti: rimosso il link WhatsApp diretto a Brissoni (`https://wa.me/393332895941...`). Sostituito con messaggio neutro che rimanda al form.

- [ ] **Step 16.3: Verifica**

Run: `grep -i "Brissoni\|393332895941\|EDEL Ponteranica" src/components/FAQ.tsx`
Expected: zero matches.

Run: `npm run build`
Expected: PASS.

- [ ] **Step 16.4: Commit**

```bash
git add src/components/FAQ.tsx
git commit -m "feat(faq): Cenate Sopra seven questions and CTA banner"
```

---

## Task 17: `src/components/CallbackPanel.tsx` — copy senza nome hardcoded

**Files:**
- Modify: `src/components/CallbackPanel.tsx:44-101`

- [ ] **Step 17.1: Sostituisci il blocco return**

Sostituisci `return (...)` (righe 42-104) con:

```tsx
  return (
    <section className="callback-panel reveal" id="callback">
      <div className="callback-inner">
        <p className="eyebrow">Una telefonata</p>
        <h3 className="callback-title serif">
          Quindici minuti, <span className="ital">senza impegni</span>.
        </h3>
        <p className="callback-sub">
          Una chiamata conoscitiva per ricevere tutte le informazioni che vi servono. Niente proposte commerciali, niente pressioni — quando vi è comodo.
        </p>

        {!done ? (
          <form onSubmit={handleSubmit} className="callback-form" noValidate>
            <div className="callback-row">
              <input
                type="text"
                name="name"
                placeholder="Nome e cognome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                aria-label="Nome e cognome"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Telefono"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                autoComplete="tel"
                aria-label="Numero di telefono"
              />
            </div>
            <fieldset className="callback-slots">
              <legend>Quando preferite</legend>
              {SLOTS.map((s) => (
                <label key={s.value} className={`callback-slot${slot === s.value ? ' active' : ''}`}>
                  <input
                    type="radio"
                    name="slot"
                    value={s.value}
                    checked={slot === s.value}
                    onChange={() => setSlot(s.value)}
                  />
                  <span>{s.label}</span>
                </label>
              ))}
            </fieldset>
            <button type="submit" className="callback-btn" disabled={submitting}>
              {submitting ? 'Invio…' : 'Richiedi una telefonata'}
            </button>
            {errorMsg && <p className="callback-error">{errorMsg}</p>}
          </form>
        ) : (
          <p className="callback-success">
            Grazie. Il consulente vi richiama nella fascia indicata.
          </p>
        )}
      </div>
    </section>
  )
```

> Unico cambiamento sostanziale: "Giuseppe vi richiama" → "Il consulente vi richiama". Tutto il resto del componente (logica, slots, form) invariato.

- [ ] **Step 17.2: Verifica**

Run: `grep -i "Giuseppe" src/components/CallbackPanel.tsx`
Expected: zero matches.

- [ ] **Step 17.3: Commit**

```bash
git add src/components/CallbackPanel.tsx
git commit -m "feat(callback): agency-agnostic callback copy"
```

---

## Task 18: `src/components/StickyBar.tsx` — bottoni parametrizzati

**Files:**
- Modify: `src/components/StickyBar.tsx`

- [ ] **Step 18.1: Sostituisci l'intero file**

```tsx
import { useEffect, useState } from 'react'
import { useLenis } from '../providers/SmoothScrollProvider'
import { PROJECT_CONFIG } from '../lib/project-config'

export default function StickyBar() {
  const lenis = useLenis()
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!lenis) {
      const onNativeScroll = () => setShow(window.scrollY > 800)
      window.addEventListener('scroll', onNativeScroll, { passive: true })
      return () => window.removeEventListener('scroll', onNativeScroll)
    }
    const onScroll = () => setShow(lenis.scroll > 800)
    lenis.on('scroll', onScroll)
    return () => lenis.off('scroll', onScroll)
  }, [lenis])

  const handleBrochure = () => {
    if (lenis) {
      lenis.scrollTo('#contatti', { offset: -80, duration: 1.4 })
    } else {
      const el = document.querySelector('#contatti')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className={`sticky-bar${show ? ' show' : ''}`}>
      <button onClick={handleBrochure} className="sticky-btn sticky-form" aria-label="Vai al form richiesta dossier">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
        </svg>
        Dossier
      </button>
      <a href={PROJECT_CONFIG.agentPhoneHref} className="sticky-btn sticky-call" aria-label="Chiama il consulente dedicato">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
        </svg>
        Chiama il consulente
      </a>
    </div>
  )
}
```

> Cambiamenti: "Brochure" → "Dossier" (coerente con il nuovo lessico), "Chiama Massimo" → "Chiama il consulente", `tel:+393332895941` → `PROJECT_CONFIG.agentPhoneHref`.

- [ ] **Step 18.2: Verifica**

Run: `grep -i "Massimo\|393332895941" src/components/StickyBar.tsx`
Expected: zero matches.

Run: `npm run build`
Expected: PASS.

- [ ] **Step 18.3: Commit**

```bash
git add src/components/StickyBar.tsx
git commit -m "feat(stickybar): parametrize agent phone and copy"
```

---

## Task 19: `src/components/Footer.tsx` — Edilvertova + agency placeholder

**Files:**
- Modify: `src/components/Footer.tsx`

- [ ] **Step 19.1: Sostituisci l'intero file**

```tsx
import { PROJECT_CONFIG } from '../lib/project-config'

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-col">
          <img className="footer-logo-img" src={PROJECT_CONFIG.logoPath} alt={PROJECT_CONFIG.logoAlt} loading="lazy" />
          <p>Villa singola · {PROJECT_CONFIG.projectLocation}</p>
          <div className="footer-col-line" />
          <p className="footer-meta">Un progetto {PROJECT_CONFIG.builderName}</p>
        </div>

        <div className="footer-col">
          <div className="footer-col-heading">Commercializzato da</div>
          <img className="footer-agency-img" src={PROJECT_CONFIG.agencyLogoPath} alt="Agenzia partner" loading="lazy" />
          <p>{PROJECT_CONFIG.agentName}</p>
          <p>{PROJECT_CONFIG.agencyAddress}</p>
          <p>{PROJECT_CONFIG.agencyCity}</p>
          <div className="footer-col-line" />
          <p>
            <a href={PROJECT_CONFIG.agentPhoneHref}>{PROJECT_CONFIG.agentPhoneDisplay}</a>
          </p>
          <p>
            <a href={`mailto:${PROJECT_CONFIG.agentEmail}`}>{PROJECT_CONFIG.agentEmail}</a>
          </p>
          <p>
            <a
              href={`https://wa.me/${PROJECT_CONFIG.agentWhatsAppNumber}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </p>
          <p className="footer-meta">{PROJECT_CONFIG.agentHours}</p>
        </div>

        <div className="footer-col footer-col-legal">
          <p className="footer-meta">© 2026 — Tutti i diritti riservati.</p>
          <p className="footer-meta">
            Le immagini sono render di progetto a scopo illustrativo.
          </p>
          <p className="footer-meta">
            <a href="/privacy.html" target="_blank" rel="noopener noreferrer">
              Privacy
            </a>
            {' · '}Cookie · GDPR
          </p>
          <div className="footer-col-line" />
          <p className="footer-meta">
            {PROJECT_CONFIG.builderFullLegal}
          </p>
        </div>
      </div>
    </footer>
  )
}
```

> Cambiamenti: tutto parametrizzato, rimosso "Sviluppato da Home In Evolution", rimosso "EDEL Costruzioni" / "CCIAA Bergamo dal 1962".

- [ ] **Step 19.2: Verifica**

Run: `grep -i "Brissoni\|Home In Evolution\|EDEL Costruzioni\|393332895941" src/components/Footer.tsx`
Expected: zero matches.

Run: `npm run build`
Expected: PASS.

- [ ] **Step 19.3: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat(footer): parametrize agency contact and builder legal"
```

---

## Task 20: `src/components/Lead.tsx` — refactor completo

Questa è la modifica più articolata. Il file cambia in molti punti correlati: state name, array `TAGLI`→`INTEREST`, sessionStorage keys, custom event names, capitolato banner copy, titoli, sub, selettore heading, CTA, error fallback, success screen, payload source/interest.

**Files:**
- Modify: `src/components/Lead.tsx`

- [ ] **Step 20.1: Sostituisci l'intero file**

```tsx
import { type FocusEvent, type FormEvent, type ReactNode, useEffect, useRef, useState } from 'react'
import { sendLead, getUTM, PROJECT_ID } from '../lib/supabase'
import { PROJECT_CONFIG } from '../lib/project-config'

type GtagFn = (event: string, action: string, params: Record<string, string>) => void
type FbqFn = (event: string, action: string) => void

type InterestOption = {
  value: string
  num: string
  name: ReactNode
}

const INTEREST: InterestOption[] = [
  { value: 'dossier',     num: '01', name: <span className="ital">Dossier via email</span> },
  { value: 'call',        num: '02', name: <span className="ital">Telefonata 15'</span> },
  { value: 'sopralluogo', num: '03', name: <span className="ital">Sopralluogo in villa</span> },
]

type FieldName = 'nome' | 'tel' | 'email' | 'gdpr'

const validateField = (name: FieldName, value: string, gdprChecked = false): string => {
  switch (name) {
    case 'nome':
      return value.trim().length < 2 ? 'Inserisci nome e cognome' : ''
    case 'email':
      return !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value.trim())
        ? 'Email non valida'
        : ''
    case 'tel':
      return !/^[0-9+\-\s]{8,}$/.test(value.trim())
        ? 'Numero non valido (min 8 cifre)'
        : ''
    case 'gdpr':
      return !gdprChecked ? 'Devi accettare la privacy per procedere' : ''
    default:
      return ''
  }
}

export default function Lead() {
  const [interest, setInterest] = useState('dossier')
  const [nome, setNome] = useState('')
  const [tel, setTel] = useState('')
  const [email, setEmail] = useState('')
  const [note, setNote] = useState('')
  const [gdpr, setGdpr] = useState(false)
  const [preferCall, setPreferCall] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({})
  const [dossierRequested, setDossierRequested] = useState(false)
  const startTimeRef = useRef<number>(0)
  const honeypotRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    startTimeRef.current = Date.now()
    if (sessionStorage.getItem('cenate_request_dossier') === 'true') {
      setDossierRequested(true)
      setPreferCall(true)
    }
    const handler = () => {
      setDossierRequested(true)
      setPreferCall(true)
    }
    window.addEventListener('cenate:request-dossier', handler)
    return () => window.removeEventListener('cenate:request-dossier', handler)
  }, [])

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as FieldName
    if (name !== 'nome' && name !== 'tel' && name !== 'email') return
    const err = validateField(name, e.target.value)
    setErrors((prev) => ({ ...prev, [name]: err }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(false)

    const newErrors: Partial<Record<FieldName, string>> = {
      nome: validateField('nome', nome),
      email: validateField('email', email),
      tel: validateField('tel', tel),
      gdpr: validateField('gdpr', '', gdpr),
    }
    setErrors(newErrors)
    if (Object.values(newErrors).some(Boolean)) return

    const elapsed = Date.now() - startTimeRef.current
    if (elapsed < 2000) {
      setError(true)
      return
    }

    if (honeypotRef.current && honeypotRef.current.value) {
      setError(true)
      return
    }

    setSubmitting(true)
    const utm = getUTM()
    const noteFinal = dossierRequested
      ? `[RICHIESTA DOSSIER] ${note.trim()}`.trim()
      : note.trim() || null
    const payload = {
      project: PROJECT_ID,
      nome: nome.trim(),
      email: email.trim(),
      telefono: tel.trim(),
      interest: interest || null,
      note: noteFinal,
      prefer_call: preferCall,
      consenso_gdpr: gdpr,
      consenso_at: gdpr ? new Date().toISOString() : null,
      request_type: dossierRequested ? 'dossier_capitolato' : 'info_generali',
      source: dossierRequested ? `${PROJECT_CONFIG.leadSource}_dossier` : PROJECT_CONFIG.leadSource,
      page_url: typeof window !== 'undefined' ? window.location.href : null,
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
      ...utm,
    }

    try {
      const ok = await sendLead(payload)
      if (!ok) throw new Error('Errore invio')
      sessionStorage.removeItem('cenate_request_dossier')
      setSuccess(true)
      const win = window as Window & { gtag?: GtagFn; fbq?: FbqFn }
      if (typeof win.gtag === 'function')
        win.gtag('event', 'conversion', { send_to: 'AW-XXX/XXX' })
      if (typeof win.fbq === 'function') win.fbq('track', 'Lead')
    } catch (err) {
      console.error(err)
      setError(true)
      setSubmitting(false)
    }
  }

  const firstName = nome.trim().split(' ')[0]

  return (
    <section className="lead" id="contatti">
      <div className="lead-inner">
        {dossierRequested && !success && (
          <div className="lead-banner reveal">
            <span className="lead-banner__tag">Dossier capitolato · Su misura</span>
            <p>
              Lasciate nome, telefono ed email. <strong>Quindici minuti al telefono</strong> per conoscervi. Subito dopo, il dossier capitolato arriva via email — quaranta pagine di scelte, calibrate sul vostro interesse.
            </p>
          </div>
        )}
        <div className="reveal">
          <div className="eyebrow">{dossierRequested ? 'Dossier capitolato' : 'Richiedi il dossier'}</div>
          <h2 className="lead-title">
            {dossierRequested ? (
              <>
                Il capitolato,
                <br />
                <span className="ital">su misura per voi</span>.
              </>
            ) : (
              <>
                Il dossier,
                <br />
                <span className="ital">su misura per voi</span>.
              </>
            )}
          </h2>
          <p className="lead-sub">
            {dossierRequested
              ? 'Quindici minuti al telefono per conoscervi. Il dossier capitolato arriva subito dopo via email.'
              : 'Quindici minuti al telefono per capirci. Poi il consulente dedicato vi manda il dossier completo — quaranta pagine di scelte, già calibrate sul vostro interesse.'}
          </p>
        </div>

        {!success && (
          <>
            <div className="reveal reveal-d1">
              <div
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--bronze-soft)',
                  marginBottom: '14px',
                  fontWeight: 600,
                }}
              >
                Cosa vi interessa
              </div>
              <div className="taglio-grid">
                {INTEREST.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    className={`taglio-card${interest === t.value ? ' active' : ''}`}
                    onClick={() => setInterest(t.value)}
                  >
                    <div className="tg-num">— {t.num}</div>
                    <div className="tg-name">{t.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="reveal reveal-d2" noValidate>
              <input
                ref={honeypotRef}
                type="text"
                name="website"
                className="honeypot"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="field">
                <label htmlFor="nome">Nome e Cognome*</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  required
                  autoComplete="name"
                  placeholder="Come vi chiamate?"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  onBlur={handleBlur}
                  className={errors.nome ? 'has-error' : ''}
                  aria-invalid={Boolean(errors.nome)}
                  aria-describedby="nome-error"
                />
                <span className="field-error" id="nome-error">{errors.nome}</span>
              </div>

              <div className="field">
                <label htmlFor="tel">Telefono*</label>
                <input
                  type="tel"
                  id="tel"
                  name="tel"
                  required
                  autoComplete="tel"
                  placeholder="Vi richiamiamo entro 24h"
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}
                  onBlur={handleBlur}
                  className={errors.tel ? 'has-error' : ''}
                  aria-invalid={Boolean(errors.tel)}
                  aria-describedby="tel-error"
                />
                <span className="field-error" id="tel-error">{errors.tel}</span>
              </div>

              <div className="field">
                <label htmlFor="email">Email*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="La vostra email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={handleBlur}
                  className={errors.email ? 'has-error' : ''}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby="email-error"
                />
                <span className="field-error" id="email-error">{errors.email}</span>
              </div>

              <div className="field">
                <label htmlFor="note">Messaggio (facoltativo)</label>
                <textarea
                  id="note"
                  name="note"
                  placeholder="Avete esigenze particolari?"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  maxLength={500}
                />
              </div>

              <label className="checkbox">
                <input
                  type="checkbox"
                  id="gdpr"
                  name="gdpr"
                  required
                  checked={gdpr}
                  onChange={(e) => {
                    setGdpr(e.target.checked)
                    setErrors((prev) => ({ ...prev, gdpr: '' }))
                  }}
                />
                <span>
                  Acconsento al trattamento dei miei dati personali ai sensi del{' '}
                  <a href="/privacy.html" target="_blank" rel="noopener noreferrer">
                    GDPR / Privacy Policy
                  </a>{' '}
                  per essere ricontattato.*
                </span>
              </label>
              {errors.gdpr && (
                <span className="field-error" style={{ marginTop: 0 }}>
                  {errors.gdpr}
                </span>
              )}

              <label className="checkbox checkbox-secondary">
                <input
                  type="checkbox"
                  id="prefer-call"
                  name="prefer_call"
                  checked={preferCall}
                  onChange={(e) => setPreferCall(e.target.checked)}
                />
                <span>Preferisco prima una telefonata di 15 minuti.</span>
              </label>

              <button type="submit" className="submit" disabled={submitting}>
                {submitting ? (
                  'Invio in corso...'
                ) : (
                  <>
                    Invia richiesta
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </>
                )}
              </button>

              <p className="form-note">
                Risposta entro 24 ore lavorative. I vostri dati non saranno condivisi con terzi.
              </p>

              {error && (
                <div className="err-msg show err-msg-fallback">
                  Si è verificato un errore. Potete anche scriverci a{' '}
                  <a href={`mailto:${PROJECT_CONFIG.agentEmail}`}>{PROJECT_CONFIG.agentEmail}</a> o chiamarci al{' '}
                  <a href={PROJECT_CONFIG.agentPhoneHref}>{PROJECT_CONFIG.agentPhoneDisplay}</a>.
                </div>
              )}
            </form>
          </>
        )}

        {success && (
          <div className="success show">
            <div className="success-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22" aria-hidden="true">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h3 className="serif">
              Grazie {firstName ? `${firstName}, ` : ''}per il vostro <span className="ital">interesse</span>
            </h3>
            <p>Vi contatteremo entro 24 ore lavorative con il dossier completo e tutti i dettagli sulla villa.</p>

            <div className="success-next">
              <div className="success-next-title">Nel frattempo</div>
              <ul>
                <li>
                  <a
                    href={`https://wa.me/${PROJECT_CONFIG.agentWhatsAppNumber}?text=Ciao%2C%20vorrei%20info%20su%20${encodeURIComponent(PROJECT_CONFIG.projectName)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Scriveteci su WhatsApp
                  </a>{' '}
                  per domande veloci
                </li>
                <li>
                  <a
                    href={PROJECT_CONFIG.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Vedete la posizione
                  </a>{' '}
                  sulla mappa
                </li>
                <li>
                  <a href={PROJECT_CONFIG.agentPhoneHref}>Chiamate il consulente</a>{' '}
                  ({PROJECT_CONFIG.agentHours})
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
```

> Cambiamenti principali rispetto a EDEL:
> - `TAGLI` → `INTEREST` (3 opzioni: dossier/call/sopralluogo) con default `'dossier'`
> - Stato `taglio` → `interest`, payload field `taglio` → `interest`
> - `edel_request_capitolato` → `cenate_request_dossier` (sessionStorage)
> - `edel:request-capitolato` → `cenate:request-dossier` (custom event)
> - `capitoloRequested`/`setCapitoloRequested` → `dossierRequested`/`setDossierRequested`
> - Variabili title/sub aggiornate (versione dossier e versione default)
> - Heading selettore "Sono interessato a" → "Cosa vi interessa"
> - CTA submit "Richiedi appuntamento privato" → "Invia richiesta"
> - Source: `landing_edel` → `PROJECT_CONFIG.leadSource`
> - Tutti gli `mailto:`, `tel:` ora vengono da `PROJECT_CONFIG`
> - WhatsApp text param parametrizzato con `PROJECT_CONFIG.projectName`
> - Maps URL → `PROJECT_CONFIG.mapsUrl`
> - "Tu" → "Voi" coerente con il resto del copy (target famiglia)

- [ ] **Step 20.2: Verifica**

Run: `grep -i "Giuseppe\|Brissoni\|EDEL\|Massimo\|mbrissoni\|393332895941\|edel_request\|edel:request\|landing_edel" src/components/Lead.tsx`
Expected: zero matches.

Run: `npm run build`
Expected: PASS. Se TypeScript dovesse segnalare problemi, verifica che `INTEREST` sia tipizzato come `InterestOption[]` e che gli import siano coerenti.

- [ ] **Step 20.3: Commit**

```bash
git add src/components/Lead.tsx
git commit -m "feat(lead): refactor for Cenate Sopra interest selector and parametrization"
```

---

## Task 21: Verifica finale end-to-end

- [ ] **Step 21.1: Smoke check ricerca residui EDEL/Ponteranica/contatti hardcoded**

Run (PowerShell):
```powershell
Get-ChildItem -Path C:\Users\krist\Desktop\cenate-sopra\src,C:\Users\krist\Desktop\cenate-sopra\index.html -Recurse -File -Include *.tsx,*.ts,*.html | Select-String -Pattern "EDEL Ponteranica|Ponteranica|Rinaldi|Brissoni|Home In Evolution|mbrissoni|393332895941|edel_request_capitolato|edel:request-capitolato|landing_edel|edel-ponteranica" -CaseSensitive:$false
```

Oppure (Bash):
```bash
grep -ri "EDEL Ponteranica\|Ponteranica\|Rinaldi\|Brissoni\|Home In Evolution\|mbrissoni\|393332895941\|edel_request_capitolato\|edel:request-capitolato\|landing_edel\|edel-ponteranica" src/ index.html
```

Expected: zero matches.

> Nota: cerchiamo "EDEL" solo con "Ponteranica" affiancato (perché "EDEL" isolato potrebbe ancora apparire in `--edel-*` CSS variables o in commenti). Se vuoi essere paranoico, cerca anche `\bEDEL\b` e controlla manualmente i match residui (saranno tipicamente CSS variables o commenti — non bloccanti).

- [ ] **Step 21.2: Verifica project-config import coverage**

Run:
```bash
grep -l "PROJECT_CONFIG" src/components/
```

Expected: deve includere almeno `Nav.tsx`, `Location.tsx`, `StickyBar.tsx`, `Footer.tsx`, `Lead.tsx` (5 file).

- [ ] **Step 21.3: Build finale**

Run: `npm run build`
Expected: PASS, zero errori TS, output `dist/` generato.

- [ ] **Step 21.4: Dev server + verifica visiva manuale**

Run: `npm run dev`
Apri: `http://localhost:5173`

Checklist visiva (scroll dall'alto al basso):
- Tab title: "Cenate Sopra — Villa di pregio · Bergamo"
- Hero: vede "Sopra Bergamo, una villa fatta per restarci..."
- Marquee scrolla 7 token con "Cenate Sopra", "Edilvertova · dal 1969"
- Statement: "Non si compra una villa..."
- Vista: "La pianura davanti..."
- Bento: 4 card "Mattina / Pomeriggio / Sera / Notte"
- TimesOfDay: cross-fade 4 stati ("L'alba sulle vigne", "Mezzogiorno", ecc.)
- Zone della villa: 5 card senza prezzo, senza CTA per item
- Costruttore: counter "55+ / 120+ / 1", quote "...È lo standard di Edilvertova"
- Gallery: didascalie "Render esterno / Soggiorno doppia altezza / ..."
- Location: "Venticinque minuti da Bergamo", 4 luoghi
- Finishes: 4 facce cubo con Pietra di Sarnico / Rovere fumé visibili
- FAQ: 7 domande (prima è "La villa è disponibile...")
- Lead form: 3 card "Dossier via email / Telefonata 15' / Sopralluogo"
- CallbackPanel: "Quindici minuti, senza impegni"
- Footer: logo cenate_sopra, "Un progetto Edilvertova SRL", legal Edilvertova
- StickyBar mobile (riduci finestra <768px e scrolla): "Dossier" + "Chiama il consulente"

- [ ] **Step 21.5: Test invio form Supabase**

Compila il form con dati di test:
- Cosa vi interessa: `Dossier via email` (default)
- Nome: `Test Cenate`
- Telefono: `+39 333 1234567`
- Email: `test@example.com`
- GDPR: spuntato

Submit. Expected:
- Spinner "Invio in corso..." per ~1s
- Success screen: "Grazie Test, per il vostro interesse"
- Verifica Supabase: la lead deve apparire con `project: 'cenate-sopra'`, `source: 'landing_cenate_sopra'`, `interest: 'dossier'`

> Se il payload Supabase mostra ancora `project: 'edel-ponteranica'`, ricontrolla Task 2.

- [ ] **Step 21.6: Tag final commit**

```bash
git tag -a v0.1.0-copy -m "Copy refresh complete for Cenate Sopra"
```

(Opzionale, solo se git è stato inizializzato.)

---

## Riepilogo task

- Task 0 (opzionale): git init
- Task 1: `project-config.ts` (nuovo)
- Task 2: `supabase.ts` (PROJECT_ID)
- Task 3: `index.html` (meta)
- Task 4-11: componenti above-fold + middle (Nav, Hero, Marquee, Statement, Vista, Bento, TimesOfDay, Units→Zone)
- Task 12-16: componenti centrali (Founder, Gallery, Location, Finishes, FAQ)
- Task 17-19: componenti conversion (CallbackPanel, StickyBar, Footer)
- Task 20: Lead.tsx (refactor maggiore)
- Task 21: verifica finale

**Totale**: ~21 task atomici, stimato 60-90 minuti di lavoro guidato + 15 minuti verifica visiva.

**Asset NON inclusi in questo plan** (gestiti separatamente):
- `/images/logo/logo_cenate_sopra.png`, `/images/logo/logo_edilvertova.png`, `/images/logo/logo_agenzia.png`
- `/images/hero/hero-main.jpg`
- `/images/vista/vista-panoramica.jpg`
- `/images/bento/bento-{mattina,pomeriggio,sera,notte}.webp`
- `/images/tod/{dawn,day,dusk,night}.jpg`
- `/images/gallery/gallery-0{1..6}.webp`
- `/og-image-cenate-sopra.jpg`
- `/brochure-cenate-sopra.pdf`
- `favicon.svg` aggiornato

Il sito sarà funzionante anche senza questi asset (mostrerà placeholder/broken-image), ma per il go-live vanno prodotti.

**Sub-progetto futuro NON in questo plan**:
- Script lead-to-agency email forwarding (Supabase Edge Function → SMTP → log) — vedi §6.3 dello spec.

---

## Self-Review

**1. Spec coverage:**
- §4.1 Nav → Task 4 ✓
- §4.2 Hero → Task 5 ✓
- §4.3 Marquee → Task 6 ✓
- §4.4 Statement → Task 7 ✓
- §4.5 Vista → Task 8 ✓
- §4.6 Bento → Task 9 ✓
- §4.7 TimesOfDay → Task 10 ✓
- §4.8 Zone → Task 11 ✓
- §4.9 Costruttore → Task 12 ✓
- §4.10 Gallery → Task 13 ✓
- §4.11 Location → Task 14 ✓
- §4.12 Finishes → Task 15 ✓
- §4.13 FAQ → Task 16 ✓
- §4.14 Lead → Task 20 ✓
- §4.15 CallbackPanel → Task 17 ✓
- §4.16 StickyBar → Task 18 ✓
- §4.17 Footer → Task 19 ✓
- §6.1 PROJECT_ID → Task 2 ✓
- §6.2 project-config.ts → Task 1 ✓
- §6.3 email forwarding → esplicitamente fuori scope ✓
- index.html metadata → Task 3 ✓

Coverage 100% del scope contenuto nello spec.

**2. Placeholder scan:** Nessun "TBD/TODO/implement later" nel plan. I numeri/dati placeholder (38 m², 65 m², 2.500 m², ecc.) sono **valori intenzionalmente provvisori** documentati nello spec §7 — non sono lacune del plan, sono valori esecutivi che vanno semplicemente scritti come indicati e aggiornati post-go-live dall'utente.

**3. Type consistency:**
- `INTEREST` (Task 20) coerente con interest selector ✓
- `ZONES` (Task 11) sostituisce `UNITS` ovunque (no `unit-price`, no `unit-cta`) ✓
- `PROJECT_CONFIG` chiavi usate in Nav/Location/StickyBar/Footer/Lead corrispondono a quelle definite in Task 1 (`logoPath`, `logoAlt`, `agentPhoneHref`, `agentEmail`, `agentPhoneDisplay`, `agentWhatsAppNumber`, `agentName`, `agentHours`, `agencyAddress`, `agencyCity`, `agencyLogoPath`, `builderName`, `builderFullLegal`, `projectName`, `projectLocation`, `projectAddress`, `mapsUrl`, `leadSource`) ✓
- sessionStorage key `cenate_request_dossier` usata identicamente in Finishes (Task 15) e Lead (Task 20) ✓
- Custom event `cenate:request-dossier` usato identicamente in Finishes (Task 15) e Lead (Task 20) ✓

Nessuna inconsistenza riscontrata.

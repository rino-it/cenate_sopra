# SKILL: Conversion CTA — Bottoni che convertono per landing alto-ticket

Quando il task tocca CTA, bottoni primari/secondari, micro-copy, magnetic effects, posizionamento CTA, trust signals pre-CTA. La CTA è dove il sito guadagna o perde il lead.

## QUANDO ATTIVARE
Trigger: "CTA", "call to action", "bottone", "magnetic button", "lead generation", "richiedi info", "scopri", "trust signal", "micro-copy".

## REGOLE D'ORO CTA LUXURY

1. **1 CTA primaria per sezione**, max 2 (primary + secondary discrete). Mai 3+ con stessa enfasi.
2. **Specificità della copy > vaghe esortazioni**: "Richiedi brochure" > "Scopri", "Prenota visita" > "Contattaci".
3. **Verb forte all'inizio**: imperativo, presente. "Scarica", "Prenota", "Richiedi", "Riserva".
4. **No "Invia" su submit form** → meglio "Invia richiesta" o "Inviami brochure".
5. **CTA primary distintiva**: forma diversa dal resto (pill vs square), color dominante (bronze/gold), shadow/glow se serve.
6. **Trust signal pre-CTA**: numero unità, stelle, anni esperienza, dato concreto. Riduce l'attrito decisionale.
7. **Posizionamenti standard**: 1 above-fold (hero), 1 mid-page (post-bento/units), 1 sticky-bar mobile, 1 sezione finale (form lead).

## GERARCHIA VISUALE

| Tipo | Stile | Use case |
|------|-------|----------|
| **Primary** | bg solid bronze, text paper, pill, padding 18-22px | "Richiedi brochure" hero, submit form |
| **Secondary** | text-link cream/70 con underline bronze-soft | "Scopri il progetto" hero, link in bento card |
| **Ghost** | border 1px bronze, transparent bg | "Le residenze" — usa con parsimonia |
| **Inline arrow** | text + → animato, no border | "Richiedi info →" sotto cards |

## CSS — Primary button standard

```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 18px 28px;
  background: var(--bronze);
  color: var(--paper);
  border: none;
  border-radius: 999px;
  font-family: var(--sans);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  transition: background 0.3s ease;
  will-change: transform;
}

.btn-primary:hover {
  background: var(--bronze-soft);
}

.btn-primary svg, .btn-primary .arrow {
  transition: transform 0.3s ease;
}

.btn-primary:hover svg, .btn-primary:hover .arrow {
  transform: translateX(4px);
}
```

Padding orizzontale > verticale (28x18). Mai padding uniforme su pill (sembra goffo).

## MAGNETIC EFFECT (Polestar move)

```tsx
import { useRef } from 'react';
import gsap from 'gsap';

export function MagneticCTA({ children, ...props }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 768) return;  // skip mobile (no hover)

    const el = ref.current!;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, {
      x: x * 0.15,
      y: y * 0.15,
      duration: 0.6,
      ease: 'power3.out'
    });
  };

  const handleLeave = () => {
    gsap.to(ref.current, {
      x: 0, y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.4)'
    });
  };

  return (
    <a ref={ref} {...props} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      {children}
    </a>
  );
}
```

Calibratura testata: factor 0.15 (max 6-8px translation). Oltre = sembra rotto.

## RIPPLE CLICK FEEDBACK (premium polish)

```css
.btn-primary::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: rgba(255,255,255,0.2);
  opacity: 0;
  transform: scale(0);
  transition: transform 0.5s ease, opacity 0.5s ease;
  pointer-events: none;
}

.btn-primary:active::after {
  transform: scale(2);
  opacity: 0;
  transition: transform 0s, opacity 0s;
}
```

L'effetto si riavvia ad ogni click. Sottile ma "pro".

## MICRO-COPY: cosa funziona per target alto-ticket 50+

| Vago (NO) | Specifico (SÌ) | Note |
|-----------|----------------|------|
| Scopri di più | Richiedi brochure | + nome di ciò che ricevono |
| Contattaci | Fissa un appuntamento | + azione concreta |
| Prenota | Prenota visita in cantiere | + dove avviene |
| Iscriviti | Ricevi gli aggiornamenti | + frequenza implicita |
| Invia | Invia richiesta | + tipo di azione |
| Scarica | Scarica il listino tagli | + cosa c'è dentro |

Regola: **chiediti "cosa riceve l'utente cliccando?". Quella è la copy.**

## TRUST SIGNAL pre-CTA

Sopra ogni CTA primaria importante (hero, lead form), aggiungi 1 dato concreto:

```html
<div class="trust-bar">
  <span>● 12 unità totali</span>
  <span>·</span>
  <span>già 7 prenotate</span>
  <span>·</span>
  <span>consegna 2026</span>
</div>
<a class="btn-primary">Richiedi brochure →</a>
```

**Tipologie di trust signal**:
- Scarsità: "Solo 5 unità disponibili", "Rimangono 3 attici"
- Tempo: "Consegna 2026 confermata", "Pre-vendita aperta"
- Sociale: "12 famiglie hanno già scelto EDEL"
- Autorità: "60 anni di esperienza Home In Evolution"
- Garanzia: "Garanzia postuma 10 anni", "Capitolato Ytong + Penetron"

**Solo numeri veri**. Mai inventare. Se non ce ne sono, salta il trust signal.

## POSIZIONAMENTO CTA per landing real-estate

1. **Hero** (above fold): 1 primary + 1 secondary discreto
2. **Marquee USP**: nessuna CTA (lascia respirare)
3. **Statement**: nessuna CTA
4. **Bento features**: 1 link "Vedi capitolato" sottile in basso, NO bottone
5. **Units cards**: 1 link "Richiedi info →" per card (sottile, sotto desc)
6. **Gallery**: nessuna CTA
7. **Location**: nessuna CTA
8. **Finishes**: nessuna CTA (o "Esplora tutti i materiali" sottile)
9. **Lead form**: 1 primary "Inviami brochure"
10. **Footer**: 1 link "Contatti" + numeri tel/mail diretti
11. **Sticky-bar mobile** (sempre visibile dopo scroll 600px): 3 azioni — telefono, WhatsApp, brochure-scroll

**Densità totale CTA primary**: 3-4 per landing intera. Più diluisce, di meno sembra senza azione.

## ANTI-PATTERN CTA

1. **CTA primary su ogni sezione** → fatica decisionale, conversion ↓
2. **Verbo "Clicca qui"** → ancora si vede, è morto dal 2010
3. **Testo lungo dentro bottone** ("Clicca qui per scoprire i dettagli del nostro progetto") → mai oltre 4 parole nel bottone
4. **Color CTA = bg principale del sito** → invisibile. Sempre contrast forte.
5. **Padding CTA <14px verticale** → sembra "click fragile". Minimo 16-18px.
6. **Magnetic factor >0.25** → sembra rotto, inseguie il cursore lontano dal box
7. **Magnetic su mobile** → no hover su touch, peggiora l'UX
8. **Animazione CTA pulsante** ("scintilla", "glow", "shake") → cheap, anti-luxury. Niente.
9. **Disable CTA submit form senza messaggio** → user perplesso. Sempre `disabled` + tooltip "Compila tutti i campi".
10. **Loading spinner generic** → custom spinner o skeleton text. Almeno: "Invio in corso..."

## CHECKLIST FINE CTA

1. Max 1 primary per sezione
2. Copy specifica, verbo + oggetto concreto
3. Padding 16-22px verticale
4. Trust signal presente sopra CTA importanti (hero, form)
5. Magnetic solo desktop, factor 0.15
6. Reduced motion: no magnetic, no ripple
7. Mobile: tap target ≥44px (Apple HIG)
8. Focus visible: outline custom (no `outline: none`)
9. Loading state previsto su submit
10. ARIA label se bottone è solo icona ("WhatsApp", "Chiama", "Brochure" sticky-bar)

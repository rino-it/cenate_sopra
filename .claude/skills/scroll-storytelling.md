# SKILL: Scroll Storytelling — Narrativa lineare per landing alto-ticket

Quando il task riguarda l'ordine narrativo delle sezioni, il pacing tra blocchi densi e respiri, l'arc emotivo, il ritmo dello scroll. La narrativa è invisibile ma è quella che tiene l'utente fino al form.

## QUANDO ATTIVARE
Trigger: "ordine sezioni", "storytelling", "narrativa landing", "pacing", "arc emotivo", "ritmo scroll", "transizioni sezioni", "rest stops", "data viz".

## I 4 ATTI di una landing alto-ticket

```
┌─────────────────────────────────────────────────────────┐
│ ATTO 1 — PROMESSA (hook)                                │
│ Hero + Marquee USP                                       │
│ "Cosa offri e a chi"                                     │
├─────────────────────────────────────────────────────────┤
│ ATTO 2 — DESIDERIO (emozione)                           │
│ Statement + Vista panoramica + (opzionale) Brand story  │
│ "Perché vale la pena desiderarlo"                       │
├─────────────────────────────────────────────────────────┤
│ ATTO 3 — PROVA (razionale)                              │
│ Bento features + Units (tagli) + Gallery + Location +   │
│ Finishes                                                 │
│ "Cosa c'è dentro davvero"                                │
├─────────────────────────────────────────────────────────┤
│ ATTO 4 — INVITO (azione)                                │
│ Lead form + Footer + Sticky-bar mobile                  │
│ "Cosa fare adesso"                                       │
└─────────────────────────────────────────────────────────┘
```

L'ordine NON è negoziabile. Hai testato il template EDEL: rispetta questi 4 atti. Le agenzie commerciali scarse mettono "team" e "valori" prima dei "tagli". Errore. La narrativa va da fuori (promessa esterna) → dentro (specifiche concrete) → azione.

## PACING — alternanza dense / respiri

Il cervello si stanca a leggere 5 sezioni dense di seguito. Alterna:

| Sezione | Densità | Ruolo |
|---------|---------|-------|
| Hero | Media | Promessa breve + CTA |
| Marquee | Bassa (1 riga) | Respiro / trust |
| Statement | Media | Emozione lunga |
| Vista | Bassa (foto + quote) | Respiro emotivo |
| Bento | Alta (4 cards tecniche) | Densità prove |
| Units | Alta (4 cards prezzo/taglio) | Densità prove |
| Gallery | Media (foto multiple) | Respiro visuale |
| Location | Media | Densità geografica |
| Finishes | Media | Densità materiali |
| Lead form | Alta | Azione finale |
| Footer | Bassa | Chiusura |

**Regola**: dopo 2 sezioni "alte" sempre 1 "bassa". Bento+Units (alte) → Gallery (bassa). Funziona.

## TRANSIZIONI tra sezioni

Una landing scadente cambia bruscamente da bg dark a bg paper. Una di lusso ha **transizioni morbide**:

### 1. Color shift narrativo

```
Hero (--ink) → Marquee (--ink) → Statement (--paper) → Vista (--ink) →
Bento (--ink) → Units (--ink) → Gallery (--paper) → Location (--ink) →
Finishes (--paper) → Lead (--ink) → Footer (--ink)
```

Pattern: alternanza ink/paper, mai 3 sezioni consecutive con stesso bg. L'occhio "respira".

### 2. Transition slice (gradient zone)

Tra ink e paper, un mini-gradiente di 60-100px:

```css
.section-transition-down {
  height: 80px;
  background: linear-gradient(180deg, var(--ink) 0%, var(--paper) 100%);
}
```

Use case: tra Statement (paper) e Vista (ink), pone un transition-up. Sottile ma elegante.

### 3. Sticky transition con foto bridge

Tra Vista e Bento, una foto full-bleed che attraversa il confine:

```html
<div class="bridge-image">
  <img src="/bridge.jpg">
</div>
```

Non è una sezione "vera", è uno stacco visuale che crea curiosità per cosa viene dopo.

## ARC EMOTIVO — i numeri come "rest stops"

Inserire numeri/dati concreti tra blocchi densi crea pause cognitive. Esempi:

- Tra Statement e Vista: "Sessant'anni" (singolo numero giant)
- Tra Bento e Units: "12 unità · A4 · Cl.4" (3 numeri in fila)
- Tra Gallery e Location: "5 minuti da Bergamo Alta" (mini-number-stat)

```html
<section class="number-rest">
  <span class="big">60</span>
  <span class="label">anni di mestiere edile<br>famiglia Rinaldi</span>
</section>
```

CSS: ink bg, font giants 200-280px, 1 secondo di lettura, l'utente "rifiata" prima della prossima densità.

## REVEAL ANIMATIONS — il ritmo musicale

Gli scroll-reveal non sono decorazione, sono **timing**. Devono essere coerenti come un battito.

```css
.reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.9s cubic-bezier(.16,1,.3,1), transform 0.9s cubic-bezier(.16,1,.3,1); }
.reveal.visible { opacity: 1; transform: translateY(0); }
.reveal-d1 { transition-delay: 0.12s; }
.reveal-d2 { transition-delay: 0.24s; }
.reveal-d3 { transition-delay: 0.36s; }
```

**Regole**:
- Stesso `cubic-bezier(.16,1,.3,1)` ovunque (ritmo coerente)
- Stessa durata 0.9s (ovunque coerente)
- Stagger 0.12s tra elementi (delicato, no shotgun)
- threshold IntersectionObserver: 0.1-0.15 (entra appena visibile)
- Mai re-animare quando si esce/rientra (`unobserve` after first trigger)

## DATA VIZ come "rest stops emozionali"

Inserisci 1-2 micro-data-viz lungo la pagina, brevi:

### Esempio 1: barra distanza

```html
<div class="distance-bar">
  <div class="dist-item">
    <span class="dist-num">5</span>
    <span class="dist-unit">min</span>
    <span class="dist-label">Bergamo Alta</span>
  </div>
  <div class="dist-item">
    <span class="dist-num">10</span>
    <span class="dist-unit">min</span>
    <span class="dist-label">Aeroporto Orio</span>
  </div>
</div>
```

### Esempio 2: timeline progetto

```html
<ol class="timeline">
  <li><span>2024</span> Permesso costruire</li>
  <li><span>2025</span> Cantiere</li>
  <li class="active"><span>2026</span> Pre-vendita</li>
  <li><span>2027</span> Consegna</li>
</ol>
```

Visualizza un dato impossibile da raccontare in prosa. L'utente "skipa" la prosa e legge il dato. Conversion ↑.

## SCROLL VELOCITY VARIATIONS

Lenis può rallentare/accelerare a tratti per dare drammaticità. Esempio: nella sezione Vista, scroll più lento (immerge nell'emozione). Nei Units, scroll standard (densità).

```js
lenis.on('scroll', ({ scroll }) => {
  // Sezione Vista: rallenta
  const vista = document.getElementById('vista');
  if (vista) {
    const rect = vista.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      // dentro vista → rallenta
      lenis.options.duration = 2.2;
    } else {
      // fuori → standard
      lenis.options.duration = 1.4;
    }
  }
});
```

Sottile ma efficace. Usare con parsimonia (solo 1-2 sezioni "speciali").

## ANTI-PATTERN STORYTELLING

1. **Tagli/Units in cima alla pagina** → l'utente vede i prezzi prima del valore. Conversion ↓
2. **Form in mezzo alla pagina** → cancella la storia. Sempre alla fine.
3. **Tutti dark o tutti chiari** → fatica visiva. Alterna sempre.
4. **Reveal con durata diversa** in sezioni diverse → ritmo rotto, sembra amatoriale
5. **Reveal infinito** che si riattiva ogni scroll su/giù → stordisce
6. **Tag "About us"/"Chi siamo" prima delle units** → il visitor non si interessa di te finché non ha capito il valore
7. **3 sezioni dense consecutive** senza respiro → utente abbandona
8. **Marquee/USP solo nel footer** → trust signal sprecato. Va in alto.
9. **Brand storia >300 parole** in landing → noioso. Max 80 parole, link "Scopri Home In Evolution" per chi vuole approfondire.
10. **Nessuna data viz** → nessuna pausa cognitiva. La pagina è un muro di testo.

## CHECKLIST FINE STORYTELLING

1. 4 atti rispettati (Promessa → Desiderio → Prova → Invito)
2. Pacing alternato dense/respiri
3. Color shift ink/paper alternato (no 3 dark di seguito)
4. 1 numero "giant" come rest stop tra densità
5. Reveal coerenti (stesso easing, durata, stagger)
6. Form solo in fondo
7. Trust signal nel hero, non sprecato in fondo
8. 1-2 data-viz minime (distanze, timeline, num facts)
9. Mobile: storytelling rispettato anche con stack vertical
10. Reduced motion: arc emotivo presente comunque (no animation but stesso ordine)

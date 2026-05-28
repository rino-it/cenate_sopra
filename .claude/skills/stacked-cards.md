# SKILL: Stacked Cards Section — Architettura definitiva

Quando il task richiede una sezione con cards che si impilano in scroll (effetto Apple AirPods Pro, Linear features, Stripe pricing tiers), segui questa architettura. Frutto di 6 iterazioni di debug — qui ci sono le decisioni già prese, NON re-derivare.

## QUANDO ATTIVARE
Trigger: "stacked cards", "card che si impilano", "AirPods scroll effect", "Linear feature scroll", "deck animation", "card stack reveal", "Units EDEL fix".

## ARCHITETTURA CORRETTA (NON DEROGABILE)

### Container HTML/JSX

```tsx
<section id="residenze" ref={sectionRef}>
  {/* HEADER FUORI DALLO STACK */}
  <div className="units-head">
    <div className="eyebrow">LE TIPOLOGIE</div>
    <h2>...</h2>
  </div>

  {/* STACK CONTAINER */}
  <div className="units-stack" ref={stackRef}>
    {cards.map((card, i) => (
      <article
        key={card.id}
        ref={el => { if (el) cardsRef.current[i] = el }}
        className="unit-card"
        style={{ '--stack-i': i } as CSSProperties}
      >
        <div className="unit-image-wrap">
          {card.image ? <img src={card.image} alt={card.alt} loading="lazy" /> : <div className="ph-int" />}
        </div>
        <div className="unit-body">
          <div className="unit-eyebrow">— 0{i+1}</div>
          <h3 className="unit-name serif ital">{card.name}</h3>
          <p className="unit-specs">{card.specs}</p>
          <p className="unit-desc">{card.desc}</p>
          <a className="unit-cta" href="#contatti">Richiedi info →</a>
        </div>
      </article>
    ))}
  </div>

  {/* DISCLAIMER FUORI DALLO STACK */}
  <p className="units-disclaimer">Metrature indicative...</p>
</section>
```

**REGOLA CRITICA**: header e disclaimer SONO FUORI da `.units-stack`. Solo le card vivono nello stack. Mettere disclaimer dentro = causa "buco vuoto" alla fine perché il disclaimer scrolla con lo stack invece di chiudere la sezione.

## CSS calibrato (copia-incolla, non reinventare)

```css
.units-stack {
  /* NIENTE min-height fisso. ScrollTrigger calcola dinamicamente con pin. */
  position: relative;
  padding: 0 22px;
  margin-bottom: 80px;
  /* Lo spazio per lo scroll lo crea pin di ScrollTrigger, non CSS. */
}

.unit-card {
  position: sticky;
  top: calc(80px + var(--stack-i, 0) * 24px);
  width: min(900px, 100%);
  margin: 0 auto 24px;
  border-radius: 20px;
  background: var(--ink-soft, #26221c);
  overflow: hidden;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  will-change: transform;
}

.unit-image-wrap {
  width: 100%;
  aspect-ratio: 3 / 2;
  max-height: 42vh;
  overflow: hidden;
  flex-shrink: 0;
  background: var(--ink, #16140f);
}

.unit-image-wrap img,
.unit-image-wrap .ph-int {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.unit-body {
  padding: 28px 32px 32px;
  background: var(--ink-soft, #26221c);
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.unit-cta {
  margin-top: auto;
  padding-top: 16px;
  align-self: flex-start;
}

/* Disclaimer FUORI dallo stack */
.units-disclaimer {
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 22px 80px; /* 80px desktop padding-bottom evita schiacciamento col footer/sticky-bar mobile */
  font-size: 13px;
  font-style: italic;
  color: var(--muted);
  text-align: center;
}

/* MOBILE */
@media (max-width: 768px) {
  .unit-card {
    width: 92vw;
    top: calc(70px + var(--stack-i, 0) * 14px);
  }
  .unit-image-wrap {
    aspect-ratio: 4 / 3;
    max-height: 38vh;
  }
  .unit-body {
    padding: 24px 24px 28px;
  }
  .units-disclaimer {
    padding: 24px 22px 120px; /* 120px mobile per non scontrarsi con sticky-bar fixed */
  }
}
```

**Note critiche**:
- `top` è calcolato via CSS variable `--stack-i` passata da React. NO calcoli JS dei top.
- `aspect-ratio` su `.unit-image-wrap`, NON su `<img>`. Wrap controlla, img riempie.
- `overflow: hidden` su `.unit-card` E su `.unit-image-wrap`. Doppio per sicurezza.
- `isolation: isolate` crea stacking context: card opache non lasciano filtrare quelle sotto.
- `padding-bottom` sul disclaimer mobile è 120px per fare spazio alla sticky-bar fissa in fondo.

## ANIMAZIONE GSAP (calibratura definitiva)

```tsx
useGSAP(() => {
  const cards = cardsRef.current;
  if (!cards.length) return;

  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    cards.forEach((card, i) => {
      // L'ULTIMA card NON ha animazione: resta visibile in cima fino in fondo
      if (i === cards.length - 1) return;

      gsap.to(card, {
        scale: 0.9,
        opacity: 0.15,
        y: -30,
        scrollTrigger: {
          trigger: cards[i + 1], // si attiva quando la card SUCCESSIVA inizia ad essere sticky
          start: "top top+=100",
          end: "top top+=20",
          scrub: 0.6,
          // NO pin — il pin lo fa la sticky CSS, non ScrollTrigger
        },
      });
    });

    // Refresh dopo setup, garantisce calcoli corretti
    ScrollTrigger.refresh();
  });

  mm.add("(prefers-reduced-motion: reduce)", () => {
    gsap.set(cards, { scale: 1, opacity: 1, y: 0 });
  });

  return () => mm.revert();
}, { scope: sectionRef, dependencies: [] });
```

**Note critiche**:
- NIENTE `pin: true` su ScrollTrigger. Il pinning visivo è fatto dalla CSS `position: sticky`. ScrollTrigger fa SOLO l'animazione di scaling/opacity.
- L'ultima card NON è animata (skip nel forEach) → resta visibile in cima allo stack fino alla fine della sezione, NON viene "coperta" da nulla.
- `trigger: cards[i + 1]` invece che `cards[i]` → ogni card viene rimpicciolita quando ENTRA quella successiva, non in base al suo proprio scroll.
- `opacity: 0.15` finale (era 0.65 → 0.3 → 0.15) → card coperta praticamente invisibile, no bleed-through visivo.
- `scrub: 0.6` → scorrimento un po' "lazy" che dà eleganza.
- `ScrollTrigger.refresh()` dopo setup → ricalcola tutto, evita layout shift al primo scroll.

## ANTI-PATTERN (errori già fatti, NON ripeterli)

1. **`min-height: 400vh` su `.units-stack`** → causa "buco nero" alla fine + scroll che "si blocca poi riparte". L'altezza la determinano le card sticky + il pin ScrollTrigger, NON un min-height fisso.
2. **Disclaimer dentro `.units-stack`** → scrolla insieme alle card invece di chiudere la sezione, crea void visivo.
3. **`opacity: 0.65` o superiore per card coperta** → si vedono testi/numeri delle card sotto attraverso quella attiva. Minimo 0.15.
4. **`background-color` su `.unit-card` con alpha o trasparenza** → bleed-through. Sempre opaco al 100%.
5. **`pin: true` in ScrollTrigger** → conflitto con `position: sticky` CSS, doppio pinning, jitter. Usa una delle due, mai entrambe.
6. **`aspect-ratio` su `<img>` invece che sul wrapper** → l'immagine prova a mantenere l'aspect ma `object-fit: cover` la deforma. Wrap controlla forma, img riempie.
7. **`overflow: hidden` solo sul wrapper, non sulla card** → l'immagine sfora SE il wrapper non ha bordi arrotondati uguali alla card. Doppio overflow per sicurezza.
8. **Animazione `scale: 0.92`** → impercettibile. Minimo `0.9`. Combinata con opacity bassa per effetto "deck" visibile.
9. **Mancanza di `ScrollTrigger.refresh()` post-setup** → animazioni "fuori sync" al primo scroll specialmente se la sezione è dopo immagini lazy.
10. **Padding bottom mobile <100px sul disclaimer/ultima card** → testo coperto dalla sticky-bar fissa.

## CHECKLIST FINE TASK

Dopo modifica/creazione di una stacked cards section:

1. `npm run build` → 0 errori
2. Desktop: scroll lento dalla 1ª card all'ultima — ogni card si rimpicciolisce e scompare dietro la successiva, l'ultima resta visibile fino alla fine sezione
3. Desktop: tra ultima card e sezione successiva, scroll fluido SENZA "blocco poi riparte"
4. Desktop: foto delle card non sfora MAI dal box
5. Mobile (375px): stesso comportamento, padding bottom sufficiente per sticky-bar
6. Mobile: numeri/testi delle card coperte non visibili attraverso quella attiva
7. Reduced motion ON: cards visibili statiche, scroll normale, no animazione
8. Disclaimer/footer non si sovrappongono mai a sticky-bar mobile

## STRUTTURA FILE NEL PROGETTO

- Component: `src/components/Units.tsx` (o nome equivalente)
- CSS: `src/index.css` (sezione `/* Units */`)
- NON creare file separati (.module.css, styled-components ecc.). Stack del progetto = CSS globale in index.css.

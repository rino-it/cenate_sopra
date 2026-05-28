# SKILL: Times of Day — Sezione scroll-driven con cross-fade temporale

Quando il task richiede una sezione che mostra come uno spazio/luogo/prodotto cambia attraverso le ore del giorno (alba/giorno/tramonto/sera), con scroll che attraversa gli stati visivi.

## QUANDO ATTIVARE
Trigger: "times of day", "alba/tramonto", "giorno notte", "ore del giorno", "scroll cambio luce", "atmosfera giornata", "cross-fade temporal".

## QUANDO USARE QUESTA SEZIONE
- Real estate (vista/finestra/terrazzo a 4 momenti)
- Hotel/resort (ambient mood durante la giornata)
- Ristoranti (sala/tavolo a colazione vs cena)
- Spa/wellness (esperienza giornaliera)
- Lifestyle brand con forte legame con luogo (vini, agriturismi)

## QUANDO NON USARE
- B2B/SaaS (nessuna leva emotiva temporale)
- E-commerce di prodotti (irrilevante)
- Servizi 24/7 (l'ora non è un USP)

## STRUTTURA HTML/JSX

```jsx
<section id="times-of-day" className="tod">
  <div className="tod__sticky">
    {/* 4 background images, only active has opacity:1 */}
    <div className="tod__bg" data-state="dawn"  style={{backgroundImage: 'url(/img/tod-dawn.jpg)'}} />
    <div className="tod__bg" data-state="day"   style={{backgroundImage: 'url(/img/tod-day.jpg)'}} />
    <div className="tod__bg" data-state="dusk"  style={{backgroundImage: 'url(/img/tod-dusk.jpg)'}} />
    <div className="tod__bg" data-state="night" style={{backgroundImage: 'url(/img/tod-night.jpg)'}} />
    
    <div className="tod__content">
      <p className="eyebrow tod__time">06:42</p>
      <h2 className="tod__title">[Frase evocativa 4-6 parole]</h2>
      <p className="tod__body">[2 righe max, descrizione sensoriale]</p>
    </div>
    
    <div className="tod__indicator">
      <span data-active="true" /><span /><span /><span />
    </div>
  </div>
</section>
```

## I 4 STATI — CONTENUTI TIPO

| Stato | Ora | Tipologia copy |
|-------|-----|----------------|
| `dawn` | 06:00-07:00 | "A est, prima" — luce che inizia, silenzio |
| `day` | 12:00-13:00 | "Mezzogiorno" — vista massima, attività |
| `dusk` | 19:00-20:00 | "Le sette e dieci" — tramonto, calore, transizione |
| `night` | 22:00-23:00 | "Le ventidue" — luci interne, raccoglimento |

**Regola copy**: 1 ora specifica (non "mattina"), 1 frase evocativa, 1 descrizione sensoriale.

## CSS chiave

```css
.tod {
  height: 400vh; /* 4 stati × 100vh */
  position: relative;
}

.tod__sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
}

.tod__bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: none; /* GSAP gestisce l'opacity */
}

.tod__bg[data-state="dawn"] { opacity: 1; } /* default visibile */

.tod__content {
  position: absolute;
  bottom: clamp(60px, 10vh, 120px);
  left: clamp(22px, 8vw, 80px);
  max-width: 600px;
  z-index: 2;
}

.tod__time {
  font-family: var(--mono, monospace);
  font-size: 14px;
  letter-spacing: 0.18em;
  color: var(--tod-text-color, #f5f5f0);
  margin-bottom: 24px;
}

.tod__title {
  font-family: var(--serif);
  font-size: clamp(40px, 6vw, 80px);
  line-height: 1;
  color: var(--tod-text-color, #f5f5f0);
  margin-bottom: 24px;
}

.tod__body {
  font-size: clamp(16px, 1.2vw, 20px);
  line-height: 1.5;
  color: var(--tod-text-color, #f5f5f0);
  opacity: 0.9;
}

.tod__indicator {
  position: absolute;
  right: clamp(22px, 4vw, 40px);
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 3;
}

.tod__indicator span {
  display: block;
  width: 2px;
  height: 32px;
  background: var(--tod-text-color, #f5f5f0);
  opacity: 0.3;
  transition: opacity 0.4s ease;
}

.tod__indicator span[data-active="true"] {
  opacity: 1;
}

@media (max-width: 768px) {
  .tod { height: 300vh; } /* 3 stati invece di 4 */
  .tod__bg[data-state="dusk"] { display: none; } /* skip dusk su mobile */
}
```

## ANIMAZIONE GSAP — completa

```js
useGSAP(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Reduced motion: mostra solo lo stato "day" statico
    gsap.set('.tod__bg', { opacity: 0 });
    gsap.set('.tod__bg[data-state="day"]', { opacity: 1 });
    return;
  }
  
  const isMobile = matchMedia('(max-width: 768px)').matches;
  const states = isMobile 
    ? ['dawn', 'day', 'night']  // 3 stati mobile
    : ['dawn', 'day', 'dusk', 'night']; // 4 stati desktop
  
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.tod',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.8,
    }
  });
  
  // Cross-fade tra background
  states.forEach((state, i) => {
    if (i === 0) return; // primo stato già visibile
    
    const prev = states[i - 1];
    
    tl.to(`.tod__bg[data-state="${prev}"]`, {
      opacity: 0,
      duration: 1
    }, i)
    .to(`.tod__bg[data-state="${state}"]`, {
      opacity: 1,
      duration: 1
    }, '<');
  });
  
  // Color shift testo: chiaro su dawn/day, brillante su dusk/night
  tl.to('.tod', {
    '--tod-text-color': '#f5f5f0',
    duration: 4
  }, 1.5);
  
  // Cambio contenuto testuale (eyebrow + title + body)
  states.forEach((state, i) => {
    const content = TIMES_OF_DAY_CONTENT[state];
    tl.call(() => {
      document.querySelector('.tod__time').textContent = content.time;
      document.querySelector('.tod__title').textContent = content.title;
      document.querySelector('.tod__body').textContent = content.body;
      
      // Update indicator
      document.querySelectorAll('.tod__indicator span').forEach((el, idx) => {
        el.dataset.active = idx === i ? 'true' : 'false';
      });
    }, [], i);
  });
});

const TIMES_OF_DAY_CONTENT = {
  dawn: {
    time: '06:42',
    title: 'A est, prima.',
    body: 'La luce arriva da est. Prima sui letti, poi sulle cucine. [Luogo] dorme ancora.'
  },
  day: {
    time: '12:00',
    title: 'Mezzogiorno.',
    body: '[Riferimento luogo principale] è là. Otto minuti d\'auto. Anni di distanza.'
  },
  dusk: {
    time: '19:10',
    title: 'Le sette e dieci.',
    body: 'Il sole scende dietro [riferimento geografico]. La cucina si scalda di rosso.'
  },
  night: {
    time: '22:00',
    title: 'Le ventidue.',
    body: 'Le luci di [città/riferimento]. Il silenzio che a [luogo] ha sempre fatto parte dell\'arredamento.'
  }
};
```

## ASSET RICHIESTI

### 4 foto (3 mobile)
- **Stesso punto di vista** per tutte (essenziale per coerenza)
- **Stessa inquadratura** (no zoom, no pan)
- **4 momenti veri** dello stesso giorno (o multipli giorni con stesso meteo)
- Risoluzione: 1920×1080 min, AVIF + WebP fallback
- Peso: ≤180 KB per foto (compressed mozjpeg q75 + AVIF q60)
- Naming: `tod-dawn.webp`, `tod-day.webp`, `tod-dusk.webp`, `tod-night.webp`

### Brief al fotografo
- 1 sopralluogo per scegliere punto di vista
- Tornare 4 volte nello stesso giorno (se meteo stabile)
- Cavalletto obbligatorio (stesso framing)
- ISO basso, treppiede, scatti multipli per HDR se necessario
- Costo tipico: 1 giornata fotografo professionale + post

## REGOLE PERFORMANCE

1. **NO video scrollati su mobile**: usare cross-fade immagini statiche
2. **Preload prima foto** (`<link rel="preload" as="image">` per `tod-dawn.webp`)
3. **Lazy-load le altre 3** (caricano mentre l'utente scrolla)
4. **`will-change: opacity` SOLO su elementi attivamente animati**, rimuovere dopo
5. **Scrub: 0.8 desktop, 0.4 mobile** (più reattivo su touch)

## ANTI-PATTERN

1. **4 foto da 4 location diverse** → l'occhio non capisce la transizione
2. **Audio ambient** ("rumore di uccelli al mattino") → invasivo, target high-ticket lo odia
3. **Animazioni > scrub** (auto-loop) → toglie controllo all'utente
4. **Testo dentro la foto** (overlay) → rovina il bilanciamento, meglio container separato
5. **5+ stati** → 4 max desktop, 3 max mobile. Più diluisce
6. **Cambio testo brusco** (no fade) → jitter percepito
7. **Color shift estremo** (bianco→nero su transizioni di 200ms) → faticoso visivamente
8. **Section height fissa in px** → rotto su viewport diverse, sempre `vh`
9. **No fallback prefers-reduced-motion** → accessibility fail
10. **Indicator senza accessibility** → aggiungere `aria-label="Stato attuale: mattino"`

## CHECKLIST FINE TASK

1. 4 foto stesso punto di vista (3 mobile)
2. Foto compresse <180KB ciascuna (AVIF + WebP)
3. Preload prima foto, lazy le altre
4. Cross-fade fluido senza jitter
5. Color shift testo coerente con luminosità background
6. Indicator laterale aggiornato real-time
7. Mobile: 3 stati, scrub 0.4, durata 300vh totale
8. Reduced motion: mostra stato statico "day"
9. ARIA labels su indicator
10. Lighthouse: nessun layout shift (CLS < 0.1)

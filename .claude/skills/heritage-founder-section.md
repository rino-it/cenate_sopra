# SKILL: Heritage / Founder Section — Pattern di sezione storia famigliare

Quando il task richiede una sezione "About / Founder / Heritage" per brand con storia famigliare o costruttore con tradizione (real estate, vini, watchmaker, abbigliamento sartoriale, ristoranti familiari, studi professionali pluri-generazionali).

## QUANDO ATTIVARE
Trigger: "founder section", "chi siamo", "heritage", "storia", "fondatore", "tradizione famigliare", "generazioni", "since [anno]".

## REGOLA D'ORO
La founder section funziona SOLO se la storia è VERA e VERIFICABILE. Storia inventata o gonfiata = il target alto-ticket la annusa in 8 secondi. Validare con la famiglia/proprietà PRIMA di scrivere.

## PERCHÉ FUNZIONA
- Brand premium con storia reale (Bulgari, Cucinelli, Loro Piana, Patek Philippe, Aman) costruiscono trust su persone identificabili, non su brand astratti
- Target 40+ valuta più la PERSONA dietro il prodotto che il prodotto stesso
- Heritage = motivo razionale per giustificare il premium di prezzo

## ARCHETIPI DEL PATTERN

### Archetipo 1 — Generazionale (Cucinelli, Patek Philippe)
**Quando**: brand con 2+ generazioni attive, fondatore vivo o storicizzato
**Asset**: foto B/N storica + foto colore moderna affiancate
**Copy**: "Lui ha aperto nel [anno]. Suo figlio/nipote oggi continua. Il modo non è cambiato."
**Quote**: dal successore che cita il fondatore

### Archetipo 2 — Mono-fondatore visionario (Aman, Polestar)
**Quando**: 1 fondatore carismatico, brand giovane (<30 anni)
**Asset**: ritratto fondatore stile editoriale + frase di posizionamento
**Copy**: "Quando [nome] ha iniziato nel [anno], voleva [visione]. È ancora la stessa cosa."

### Archetipo 3 — Luogo come fondatore (Solomeo di Cucinelli, Champagne house)
**Quando**: il luogo è co-protagonista della storia
**Asset**: foto luogo storico + foto luogo oggi
**Copy**: focus sul "qui" come scelta consapevole

## STRUTTURA HTML/JSX

```jsx
<section id="founder" className="founder">
  <div className="founder__sticky">
    <div className="founder__title">
      <p className="eyebrow">Dal [anno fondazione]</p>
      <h2>[Headline 6-10 parole]</h2>
    </div>
  </div>
  <div className="founder__content">
    {/* Foto storica */}
    <figure className="founder__photo founder__photo--vintage">
      <img src="/img/founder-vintage.jpg" alt="[nome], [contesto], [anno]" />
      <figcaption>[nome], [luogo], [stagione anno]</figcaption>
    </figure>
    
    {/* Storia */}
    <div className="founder__story">
      <p>[3-5 frasi: chi era, cosa ha fatto, perché contava]</p>
    </div>
    
    {/* Timeline SVG */}
    <div className="founder__timeline">
      {/* 5 milestone, anno + 4-6 parole */}
    </div>
    
    {/* Foto attuale */}
    <figure className="founder__photo founder__photo--today">
      <img src="/img/founder-today.jpg" alt="[nome successore], [contesto], oggi" />
      <figcaption>[nome successore], [luogo], [stagione anno corrente]</figcaption>
    </figure>
    
    {/* Quote */}
    <blockquote className="founder__quote">
      <p>[Frase del successore che cita il fondatore — 15-25 parole]</p>
      <cite>— [nome successore]</cite>
    </blockquote>
    
    {/* Stats — 3 numeri concreti */}
    <ul className="founder__stats">
      <li><strong>[N]</strong> anni di mestiere</li>
      <li><strong>[N]</strong> [progetti/cantieri/clienti]</li>
      <li><strong>[N]</strong> generazioni</li>
    </ul>
  </div>
</section>
```

## CSS chiave

```css
.founder {
  background: #faf8f4; /* caldo, "carta" */
  padding: clamp(80px, 12vw, 160px) 22px;
  position: relative;
}

.founder__sticky {
  position: sticky;
  top: 100px;
  align-self: start;
}

.founder__photo--vintage img {
  filter: sepia(0.15) contrast(1.05);
  aspect-ratio: 4/5;
}

.founder__photo--today img {
  aspect-ratio: 3/2;
}

.founder__photo figcaption {
  font-style: italic;
  font-size: 13px;
  color: var(--muted);
  margin-top: 12px;
}

.founder__quote {
  font-family: var(--serif);
  font-size: clamp(24px, 4vw, 48px);
  line-height: 1.2;
  font-style: italic;
  max-width: 720px;
  margin: clamp(60px, 8vw, 120px) auto;
}

.founder__quote cite {
  display: block;
  font-size: 14px;
  font-style: normal;
  color: var(--muted);
  margin-top: 16px;
}

.founder__stats {
  display: flex;
  gap: clamp(40px, 8vw, 100px);
  justify-content: center;
}

.founder__stats strong {
  font-family: var(--serif);
  font-size: clamp(48px, 8vw, 96px);
  display: block;
  line-height: 1;
}

@media (max-width: 768px) {
  .founder__sticky { position: static; }
  .founder__photo--vintage img { aspect-ratio: 4/5; width: 100%; }
  .founder__stats { flex-direction: column; gap: 32px; }
}
```

## ANIMAZIONI GSAP

```js
useGSAP(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  
  // Foto vintage: fade + scale
  gsap.from(".founder__photo--vintage img", {
    opacity: 0, scale: 1.05, duration: 1.2, ease: "expo.out",
    scrollTrigger: { trigger: ".founder__photo--vintage", start: "top 80%" }
  });
  
  // Storia: SplitText lines staggered
  const split = new SplitText(".founder__story p", { type: "lines" });
  gsap.from(split.lines, {
    y: 40, opacity: 0, duration: 0.9, stagger: 0.06, ease: "expo.out",
    scrollTrigger: { trigger: ".founder__story", start: "top 75%" }
  });
  
  // Timeline SVG: stroke-dasharray
  gsap.from(".founder__timeline path", {
    drawSVG: 0, duration: 1.4, ease: "power2.inOut",
    scrollTrigger: { trigger: ".founder__timeline", start: "top 70%" }
  });
  
  // Foto oggi: parallax leggero
  gsap.to(".founder__photo--today img", {
    yPercent: -8, ease: "none",
    scrollTrigger: {
      trigger: ".founder__photo--today",
      start: "top bottom", end: "bottom top", scrub: true
    }
  });
  
  // Quote: SplitText chars
  const quoteSplit = new SplitText(".founder__quote p", { type: "chars" });
  gsap.from(quoteSplit.chars, {
    y: 30, opacity: 0, duration: 1.1, stagger: 0.014, ease: "expo.out",
    scrollTrigger: { trigger: ".founder__quote", start: "top 75%" }
  });
  
  // Stats counter
  gsap.from(".founder__stats strong", {
    textContent: 0,
    duration: 1.6,
    snap: { textContent: 1 },
    ease: "power2.out",
    scrollTrigger: { trigger: ".founder__stats", start: "top 80%" }
  });
});
```

## ASSET RICHIESTI (briefing fotografo)

### Foto storica fondatore
- Dimensione: min 1200×1500 px
- Formato: B/N o seppia
- Soggetto: fondatore in azione (cantiere, laboratorio, vigna), NON foto posata
- Caption obbligatoria: nome + luogo + stagione + anno

### Foto successore oggi
- Dimensione: min 1600×1200 px
- Formato: colore, look documentario
- Soggetto: successore nel SUO contesto attuale (nuovo cantiere, ufficio, location del progetto)
- Stile: NON ritratto da CV, NO sfondo studio
- Caption obbligatoria stesso schema

### Timeline SVG
- 5 milestone max
- Per ogni milestone: anno + 4-6 parole
- Esempio: "1962 — Apertura impresa, via Borgo Palazzo"

## COPY — REGOLE

### DO
- Date precise, luoghi precisi ("via Garibaldi, primavera 1971" non "anni '70")
- Quote con attribuzione esplicita ("— Giuseppe Edel")
- Numeri concreti negli stats (87, non "molti")
- Linguaggio asciutto, mai retorico

### DON'T
- "Una passione tramandata di padre in figlio" (cliché)
- "Da oltre [N] anni" (vago, usa data esatta)
- "Nel cuore di [città]" (frase vuota)
- "Il segreto della nostra famiglia" (paternalistico)
- Quote inventate o "ispirate da" (illegale + percepibile)

## ANTI-PATTERN

1. **Storia inventata** → si percepisce, distrugge il brand
2. **Foto stock di "anziano sorridente"** → letale
3. **Timeline con 15+ milestone** → noiosa, max 5
4. **Quote retoriche** ("la qualità è la nostra missione") → vietate
5. **Heritage senza foto del successore attuale** → suggerisce "il fondatore non c'è più, oggi siamo solo brand"
6. **Stats inventati o gonfiati** ("100.000 clienti felici" senza prova)
7. **Storia >300 parole** → noiosa per landing, max 80-120 parole
8. **Mancanza di luogo specifico** → la storia non ha radici
9. **Tono celebrativo** ("siamo orgogliosi di...") → infantile per target alto
10. **Skip dei numeri** → senza dati la storia sembra finzione

## CHECKLIST FINE TASK

1. Storia validata con la famiglia/proprietà
2. Foto storica + foto attuale entrambe presenti
3. Caption con date e luoghi precisi
4. Quote con attribuzione esplicita
5. 3 stats con numeri concreti
6. Timeline SVG con max 5 milestone
7. Animazioni rispettano prefers-reduced-motion
8. Mobile: layout verticale, niente sticky
9. Storia <120 parole
10. Nessun cliché (vedi anti-pattern 1-10)

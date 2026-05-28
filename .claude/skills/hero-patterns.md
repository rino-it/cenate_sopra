# SKILL: Hero Patterns — 6 archetipi per landing alto-ticket

Quando il task richiede creazione/modifica della sezione hero di una landing di lusso, scegli tra questi 6 pattern testati. Ogni pattern ha use case, struttura HTML/CSS, e calibratura GSAP.

## QUANDO ATTIVARE
Trigger: "hero", "above the fold", "first impression", "fullscreen banner", "landing top section", "hero animation", "split screen hero".

## REGOLE D'ORO HERO LUXURY

1. **Above the fold = 100vh esatti**, mai meno mai di più. Use `min-height: 100svh` per gestire mobile browser bar.
2. **Una CTA primaria visibile senza scroll**. Una sola. La secondaria può essere link sottile.
3. **Trust signal pre-headline** (eyebrow, pillola, micro-bar): 11-12px tracked, color accent. Comunica il valore PRIMA del titolo.
4. **Title in 2-4 righe max**. Mai più di 8-10 parole totali. Mai 1 sola riga (pacing visivo).
5. **Sub paragraph sotto title**: 1-2 righe, font lead 18-22px, mai >40 parole.
6. **Scroll indicator**: discreto, animato (bounce 1-2s), bottom-right o center-bottom.
7. **Bg deve raccontare il prodotto**: foto reale > render > stock photo > gradient astratto. Sempre.

## PATTERN 1 — Full-bleed Hero (default Polestar/Apple)

**Use case**: real estate, automotive, hospitality, prodotti fisici fotografabili. **DEFAULT per landing immobiliari.**

**Struttura**:
```html
<section class="hero hero-fullbleed">
  <div class="hero-bg">
    <picture>
      <source media="(max-width: 768px)" srcset="/images/hero/hero-mobile.webp">
      <img src="/images/hero/hero-main.jpg" alt="..." loading="eager" fetchpriority="high">
    </picture>
  </div>
  <div class="hero-overlay"></div>
  <nav class="hero-nav">...</nav>
  <div class="hero-inner">
    <div class="hero-trust">● 12 UNITÀ · CLASSE A4 · SISMICA CL.4</div>
    <div class="hero-eyebrow">— PONTERANICA · BERGAMO</div>
    <h1 class="serif">Edel<span class="ital">.</span></h1>
    <p class="hero-sub">Dodici residenze esclusive...</p>
    <div class="hero-cta-row">
      <a class="btn-primary" href="#contatti">Richiedi brochure →</a>
      <a class="btn-link" href="#statement">Scopri il progetto</a>
    </div>
  </div>
  <div class="hero-scroll">SCROLL ↓</div>
</section>
```

**CSS chiave**:
- `position: relative; min-height: 100svh; overflow: hidden;`
- `.hero-bg img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; animation: slowZoom 24s ease-in-out infinite alternate; }`
- `.hero-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(22,20,15,0.3) 0%, rgba(22,20,15,0.15) 50%, rgba(22,20,15,0.92) 100%); z-index: 1; }`
- `.hero-inner { position: relative; z-index: 2; display: flex; flex-direction: column; justify-content: flex-end; min-height: 100svh; padding: 120px 22px 80px; max-width: 1400px; margin: 0 auto; }`

**Animazione**: slow-zoom CSS infinito + fadeUp staggered al load (eyebrow → h1 → sub → cta, delay 0.3s ognuno). NO parallax pesante (lag mobile).

## PATTERN 2 — Split-screen Editoriale (Bulgari Eclettica)

**Use case**: storytelling brand, gioielleria, profumeria, watch, vini. **Quando il prodotto richiede contemplazione.**

**Struttura**:
```html
<section class="hero hero-split">
  <div class="hero-image">
    <img src="..." alt="...">
  </div>
  <div class="hero-text">
    <span class="hero-eyebrow">— ATELIER 2026</span>
    <h1 class="serif">Forme che <span class="ital">resistono</span> al tempo</h1>
    <p class="hero-sub">...</p>
    <a class="btn-primary">Scopri</a>
  </div>
</section>
```

**CSS chiave**:
- `display: grid; grid-template-columns: 1fr 1fr; min-height: 100svh;`
- `.hero-image img { width: 100%; height: 100%; object-fit: cover; }`
- `.hero-text { padding: clamp(40px, 8vw, 120px); display: flex; flex-direction: column; justify-content: center; background: var(--paper); }`
- Mobile: `grid-template-columns: 1fr; grid-template-rows: 50vh auto;`

**Animazione**: parallax leggero sull'immagine (yPercent ±10 con scrub), fadeUp testo al load.

## PATTERN 3 — Parallax Stacked Layers (Apple Vision Pro)

**Use case**: tech, prodotti complessi multilivello, real estate con render multiple, fashion campaign.

**Struttura**: 3-5 layer assoluti dentro `.hero`, ognuno con velocità diversa di parallax.

```html
<section class="hero hero-stacked">
  <div class="hero-layer hero-layer-back" data-speed="0.2">
    <img src="/sky.jpg">
  </div>
  <div class="hero-layer hero-layer-mid" data-speed="0.5">
    <img src="/buildings.png"><!-- PNG con trasparenza -->
  </div>
  <div class="hero-layer hero-layer-front" data-speed="0.8">
    <img src="/foreground.png">
  </div>
  <div class="hero-inner" data-speed="1">...</div>
</section>
```

**GSAP**:
```js
gsap.utils.toArray('[data-speed]').forEach(layer => {
  const speed = parseFloat(layer.dataset.speed);
  gsap.to(layer, {
    yPercent: -50 * (1 - speed),
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
  });
});
```

Regola: layer del background = speed più basso (sembra fermo). Layer foreground = speed alto (si muove molto). Effetto cinema.

## PATTERN 4 — Typographic-Only Hero (Linear / Vercel)

**Use case**: SaaS B2B, software premium, agenzie creative high-end. **Quando NON c'è una foto degna del prodotto.**

**Struttura**:
```html
<section class="hero hero-typographic">
  <div class="hero-bg-noise"></div>
  <div class="hero-inner">
    <h1 class="serif huge">Il tempo <span class="ital">è capitale.</span><br>Non sprecarlo.</h1>
    <p class="hero-sub">Software per family office...</p>
    <div class="hero-cta-row">...</div>
  </div>
</section>
```

**CSS**: bg solid color (--ink) + grain SVG sottile. Typography giants: `font-size: clamp(56px, 14vw, 200px); line-height: 0.9; letter-spacing: -0.04em;`. Niente immagini.

**Animazione**: text reveal con SplitType chars (vedi `gsap-scroll-recipes.md` Ricetta 3).

## PATTERN 5 — Video Bg Loop (hospitality dinamica)

**Use case**: hotel/resort, ristoranti, eventi, esperienze, palestre lusso. **Quando movimento = parte del prodotto.**

**Struttura**:
```html
<section class="hero hero-video">
  <video class="hero-bg-video" autoplay muted loop playsinline poster="/poster.jpg">
    <source src="/hero.webm" type="video/webm">
    <source src="/hero.mp4" type="video/mp4">
  </video>
  <div class="hero-overlay"></div>
  <div class="hero-inner">...</div>
</section>
```

**Regole strict**:
- File <3MB ottimizzato (use Handbrake o FFmpeg, h.265/AV1, 1280x720, 24fps, no audio)
- ALWAYS `playsinline muted loop autoplay` per mobile autoplay
- ALWAYS `poster` con prima frame jpg ottimizzata (per lazy)
- Mobile: video disable, mostra solo poster (data-mobile-static)
- `prefers-reduced-motion`: stop video, mostra poster

## PATTERN 6 — Ambient WebGL (avant-garde)

**Use case**: portfolio creative agency, NFT/web3 (con cautela), art galleries, brand sperimentali. **Solo se il brand lo giustifica.**

Stack: Three.js / Lenis con shader semplici (gradient noise, particle system, fluid sim). Pattern eccessivo per real-estate/business: **non usare per EDEL**.

**Costi**: peso bundle +200kb, complessità performance (mobile 30fps), accessibility tricky. Sconsigliato per <80% degli use case.

## DECISION TREE: quale pattern scegliere

```
Hai foto/render di qualità del prodotto?
├── SÌ → C'è movimento intrinseco (acqua, fuoco, vita)?
│   ├── SÌ → Pattern 5 (Video bg)
│   └── NO → Sono 1 foto epica o multiple stratificate?
│       ├── 1 epica → Pattern 1 (Full-bleed) ★ DEFAULT
│       ├── Multiple in profondità → Pattern 3 (Parallax stacked)
│       └── 1 hero + spazio editoriale → Pattern 2 (Split-screen)
└── NO →
    ├── Brand è creative/avant-garde con budget extra → Pattern 6 (WebGL)
    └── Brand è B2B/SaaS/professionale → Pattern 4 (Typographic-only)
```

**EDEL = Pattern 1 Full-bleed** (foto render reali esiste).

## ANTI-PATTERN HERO

1. **Slider/carousel hero** → killer di conversione, l'utente non aspetta. Sempre statico (o video loop).
2. **Hero alto >100vh** → frustra l'utente, costringe a scroll per CTA. Mai oltre 100svh.
3. **CTA primary "Scopri di più"** → vago, non converte. Specifico sempre: "Richiedi brochure", "Prenota visita", "Scarica listino".
4. **2+ CTA primary** → diluisce attenzione. Una primary + una secondary discrete.
5. **Mancanza di scroll indicator** → utente non sa che c'è altro sotto. Sempre indicare.
6. **Video bg con audio** → blocco autoplay browser. Sempre `muted`.
7. **Foto stock con persone palesemente photoshoppate** → distrugge credibilità. Meglio foto del prodotto vero che stock di "famiglia felice generica".
8. **Title >12 parole** → l'utente non legge. Editing: cosa puoi togliere?
9. **Trust signal sotto la fold** → inutile, va sopra il title.
10. **Mancanza di poster su video** → schermo nero in caricamento, brutto.

## CHECKLIST FINE HERO

1. `100svh` esatti, no più no meno (test mobile + desktop)
2. CTA primary visibile senza scroll
3. Trust signal sopra title
4. Title 2-4 righe, ≤10 parole, italic accent presente
5. Sub 1-2 righe, ≤40 parole
6. Scroll indicator presente e animato
7. Bg ottimizzato (foto WebP <500KB, video <3MB)
8. `loading="eager"` + `fetchpriority="high"` su hero img
9. Mobile: hero leggibile a 375px senza overflow
10. Reduced motion: animazioni statiche, no slowZoom no parallax

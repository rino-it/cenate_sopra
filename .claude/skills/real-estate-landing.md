# SKILL: Real Estate Landing — Port HTML → React

Quando il task è creare/modificare un sito landing immobiliare (residenze, ville, complessi), segui questo workflow.

## QUANDO ATTIVARE
Trigger words nel task: "landing residenze", "porting reference.html", "sito immobiliare", "luxury landing", "Polestar style", "Awwwards real-estate".

## ARCHITETTURA STANDARD
Stack obbligato per landing real-estate di lusso:
- Vite 7 + React 19 + TS 5
- Tailwind 3.4 (config in .cjs)
- Lenis 1.3.x (smooth scroll)
- GSAP 3.12 + ScrollTrigger + @gsap/react
- split-type (text reveal char/words)
- Supabase (form lead + UTM tracking)

Struttura componenti FISSA (un componente per sezione narrativa):
Nav → Progress → Hero → Marquee USP → Statement manifesto → Vista emotiva →
Bento features → Units (tagli) → Gallery render → Location mappa →
Finishes materiali → Lead form → Footer → StickyBar mobile

## REGOLE CSS LANDING REAL-ESTATE
1. Tutto il CSS del reference va in `src/index.css` SENZA `@layer components` per le classi custom.
2. Le 3 direttive `@tailwind` sempre all'inizio.
3. Tailwind `content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]` non vuoto, sennò warning utility.
4. CSS variables nel `:root` (es. --ink, --bronze, --paper, --line).
5. Keyframes (slowZoom, marquee, fadeUp, fadeIn) in CSS pure.
6. Naming classi: kebab-case come da reference (.hero, .nav, .eyebrow, .btn-primary, .marquee, .vista, .bento-card, .ph-ext, .ph-vista, .ph-int, .ph-detail, .ph-pattern, .reveal, .reveal-d1/d2/d3, .visible).

## ANIMAZIONI (strategia ibrida — non improvvisare)
- `.reveal` → IntersectionObserver vanilla, NON GSAP
- Slow zoom hero, marquee, vista-bg scale, fadeUp/fadeIn al load → keyframes CSS
- GSAP solo per: magnetic CTA, eventuali pin/parallax aggiunti DOPO esplicita richiesta, text reveal SplitType
- Smooth scroll: SEMPRE Lenis. Anchor link via `useLenis().scrollTo(target, { offset: -80, duration: 1.4 })`. MAI scrollIntoView.
- prefers-reduced-motion: se aggiungi GSAP, wrappa in `gsap.matchMedia()` con branch reduce.

## COPY EDITORIAL TONE (target 50+ alto-spendente)
- Frasi brevi, niente superlativi vuoti
- Numeri concreti dove possibile (m², anni, spec tecniche)
- Specs tecniche dal capitolato, non da brochure marketing
- Trust signals (anni esperienza costruttore, garanzie, certificazioni)
- Niente "esclusivo/lussuoso/prestigioso" → mostra, non dichiarare
- Tone Polestar/Bulgari: editoriale, sobrio, con un'italic in punti emotivi

## ANTI-PATTERN (errori già visti su EDEL — NON ripetere)
1. CSS in `@layer components` per classi non-Tailwind → sito appare nudo
2. Animazioni GSAP "impercettibili" (yPercent 5, durata 0.3s) → calibratura debole
3. `scroll-behavior: smooth` su `html` → conflitto con Lenis
4. Componente che usa classe CSS non definita in index.css → sito si rompe silenziosamente
5. Saltare `npm run build` prima di dire "fatto" → l'utente scopre l'errore
6. Inventare contenuti (testi, m², anno consegna) → tutti dati dal reference + capitolato fornito
7. Suggerire "ricominciamo da zero" quando un fix mirato basta

## CHECKLIST FINE TASK (NON DEROGABILE)
1. `npm run build` → 0 errori
2. `src/index.css` inizia con 3 direttive `@tailwind`
3. `src/main.tsx` importa `./index.css`
4. Per ogni componente modificato: classi CSS usate esistono in index.css
5. Tutte le immagini in `<img src=...>` esistono fisicamente in `public/images/`
6. Riepilogo: file modificati + righe + comandi npm + build PASS/FAIL + cosa l'utente vede a localhost:5173

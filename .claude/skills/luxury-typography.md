# SKILL: Luxury Typography — Pairing & Scale per landing alto-ticket

Quando il task tocca scelte tipografiche, scale, pairing font, gerarchia testi, italic accents per landing di lusso, segui questa skill.

## QUANDO ATTIVARE
Trigger: "tipografia", "font pairing", "scelta font", "italic accent", "scale tipografica", "drop cap", "letter-spacing", "leading", "Bodoni", "Fraunces", "Söhne", "Tiempos", "tipografia editoriale".

## PRINCIPI BASE LUXURY TYPE

1. **Mai più di 2 famiglie**: una serif display per emozione + una sans neutral per leggibilità. Eccezione: monospace solo se l'identità lo richiede (raro).
2. **Italic come accent strategico**: non più di 1 parola in italic per riga di titolo. Mai italic intere frasi. L'italic è un *gesto*, non un paragrafo.
3. **Tracking inverso al peso**: testi piccoli uppercase → tracking alto (.18-.30em). Testi grandi serif → tracking negativo (-.02 a -.04em). Body sans → tracking 0.
4. **Leading per livello di lettura**: titoli display → 0.95-1.05. Titoli editoriali → 1.15-1.25. Body → 1.5-1.65. Mai sotto 1.4 per >50 caratteri/riga.
5. **Color per titoli vs body**: titoli sempre full-contrast (--text-h). Body un gradino più morbido (--text). Caption/disclaimer più morbidi ancora (--muted).

## PAIRING TESTATI per landing di lusso

### Pairing 1 — Editoriale Italiano (EDEL stack)
- **Display**: Fraunces (variabile, opsz, ital) → titoli serif moderni con personalità
- **Body**: Inter (300-600) → sans neutrale, ottima a tutte le size
- **Use case**: real estate lusso, hotel boutique, ristoranti stellati, vini, brand storia famigliare
- **Trick**: Fraunces 300 italic per parole-chiave emotive ("vivere", "casa", "vista")

### Pairing 2 — Couture Francese
- **Display**: Bodoni Moda o Tiempos Headline
- **Body**: Söhne (commerciale) o Inter
- **Use case**: moda, beauty, gioielli, fashion editorials
- **Trick**: Bodoni in size enormi (clamp 64-200px) sempre con line-height 0.95

### Pairing 3 — Architettura Minimal
- **Display**: Söhne Breit, Editorial New, GT America
- **Body**: stesso famiglia weight più leggero
- **Use case**: studio architettura, design industriale, art galleries
- **Trick**: tutto in uppercase tracked .12-.18em, zero serif

### Pairing 4 — Heritage Riservato
- **Display**: Caslon, Garamond Premier, GT Sectra
- **Body**: Untitled Sans o Söhne
- **Use case**: legal, banche private, family office, luxury watches
- **Trick**: drop cap nel primo paragrafo (vedi sotto)

## SCALA MODULARE (luxury landing standard)

```css
:root {
  /* Mobile-first scale */
  --fs-eyebrow: 11px;        /* uppercase tracked .25em */
  --fs-body: 16px;            /* base mobile */
  --fs-body-lg: 18px;         /* lead paragraph */
  --fs-h3: clamp(20px, 3vw, 28px);
  --fs-h2: clamp(28px, 5vw, 56px);
  --fs-h1: clamp(40px, 8vw, 96px);
  --fs-display: clamp(56px, 14vw, 180px);  /* hero giants */
}
```

Regole non negoziabili:
- `clamp(min, vw, max)` SEMPRE per titoli responsive
- `vw` come unità intermedia → fluido senza media queries
- `min` mobile = leggibile sotto 360px (test: iPhone SE)
- `max` desktop = no oversize >2000px

## ITALIC ACCENT (la firma editoriale)

```html
<h2>Sessant'anni di mestiere, dodici case <em>che ne portano il segno</em>.</h2>
```

```css
h2 em, .ital {
  font-style: italic;
  font-weight: 300;       /* sempre più leggero del titolo */
  color: var(--bronze);   /* o accent del progetto */
}
```

Regole:
- Mai > 30% del titolo in italic (proporzione)
- Mai 2 italic accents nello stesso titolo
- Sempre coerente: la stessa parola/concetto in italic in tutta la pagina (es. "vista", "vivere", "casa")
- Color accent: usa il bronze/gold del progetto, MAI rosso/blu (cliché)

## DROP CAP (heritage move)

```css
.lead-paragraph::first-letter {
  font-family: var(--display);
  font-size: 4.5em;
  float: left;
  line-height: 0.85;
  margin: 0.05em 0.1em 0 0;
  color: var(--bronze);
  font-weight: 300;
}
```

Use case: paragrafo "Statement" / manifesto, primo paragrafo di articolo blog. **Mai** in body, mai in liste, mai mobile (responsive `display: none` sotto 768px se rovina layout).

## TRACKING (letter-spacing) — tabella riferimento

| Tipo | Tracking | Esempio |
|------|----------|---------|
| Eyebrow uppercase 11-13px | `0.18em` - `0.30em` | LE TIPOLOGIE |
| Logo wordmark | `0.35em` - `0.50em` | E D E L |
| Button uppercase 12-14px | `0.10em` - `0.18em` | RICHIEDI INFO |
| Body sentence case | `0` (default) | qualsiasi paragrafo |
| Display serif giant | `-0.02em` - `-0.04em` | titoli h1 enormi |
| Italic display | `-0.01em` | (l'italic ha già spaziatura naturale) |

## LEADING (line-height) — tabella riferimento

| Contesto | Line-height | Note |
|----------|-------------|------|
| Display giants (>80px) | `0.95` | titoli grandi devono "compattarsi" |
| Titoli editoriali (h2-h3) | `1.05` - `1.15` | leggermente più aerati |
| Lead paragraph (introduttivo) | `1.4` | leggibile + arioso |
| Body standard | `1.5` - `1.6` | sweet spot lettura lunga |
| Caption / disclaimer | `1.45` - `1.55` | text piccolo, leggibile |
| Code / mono | `1.5` | mai meno per code |

## ANTI-PATTERN

1. **3+ famiglie font** in una landing → confusione, perde di carattere
2. **Italic per intere frasi** → faticoso, perde l'effetto accent
3. **Tracking 0 su uppercase** → testo "schiacciato", illeggibile
4. **Tracking negativo su body sans** → moda 2018, oggi è goffo
5. **Display font su body** → leggibilità rovinata, no
6. **Drop cap su mobile** → troppo aggressivo, sempre nascondere
7. **Font Google con weight 100-200** → su screen anti-aliased è lavato, partire da 300
8. **Letter-spacing in px assoluti** → non scala. Usa `em` sempre.
9. **Mancato preconnect Google Fonts** → FOUT pesante. Sempre 2 link `preconnect` in head.
10. **System font come fallback unico** → su un brand di lusso il fallback va curato. Almeno: `font-family: 'Fraunces', 'Times New Roman', serif`.

## PRELOAD HERO FONT

Il font del titolo H1 hero deve essere preloadato:

```html
<link
  rel="preload"
  href="https://fonts.gstatic.com/s/fraunces/...woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

Oppure con Google Fonts API: aggiungi `&display=swap` SEMPRE, mai `&display=block` (FOIT pesante).

## CHECKLIST FINE TASK TIPOGRAFICO

1. Massimo 2 famiglie font caricate
2. `display=swap` su tutte le request Google Fonts
3. Preconnect a fonts.googleapis.com + fonts.gstatic.com (con crossorigin)
4. Italic accent presente (almeno 1 punto strategico) ma mai >1 per titolo
5. Scala modulare con clamp() per H1/H2 responsive
6. Body line-height ≥ 1.5
7. Eyebrow uppercase tracked ≥ 0.18em
8. Display giants line-height ≤ 1.05
9. Test mobile a 375px: tutti i titoli si vedono per intero (no overflow orizzontale)
10. Test desktop a 1920px: H1 hero non supera max definito (no testo gigantesco innaturale)

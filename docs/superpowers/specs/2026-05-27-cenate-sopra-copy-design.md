# Cenate Sopra — Copy Design Spec

**Data**: 2026-05-27
**Progetto**: `cenate-sopra` (fork EDEL)
**Autore brainstorming**: Claude Opus 4.7 + Kristian
**Stato**: approvato dall'utente, pronto per implementazione

---

## 1. Contesto

Il progetto `cenate-sopra` nasce come fork tecnico del progetto `edel` (residenza plurifamiliare 12 unità a Ponteranica, BG). La codebase (Vite + React 19 + Tailwind 3.4 + GSAP + Lenis + Supabase) è identica; cambia il **prodotto immobiliare e tutta la copy**.

**Cenate Sopra è un prodotto diverso da EDEL**:
- **Tipo**: villa singola di pregio (non plurifamiliare)
- **Territorio**: Cenate Sopra (BG), collina Val Cavallina — non più Ponteranica
- **Costruttore**: **Edilvertova SRL** (Gazzaniga, BG, dal 1969) — non più Home In Evolution / famiglia Rinaldi
- **Buyer target**: famiglia premium 40-55 anni, ticket **1.2-2.5M€** (era 170k-570k€ su EDEL)
- **Conversione**: brochure (primario) + callback (secondario). Niente visita in cantiere come CTA.
- **Sales channel**: agenzia partner esterna (da definire). Copy agency-agnostic, niente nomi hardcoded.

L'**outcome** atteso: una landing che converte buyer familiari premium su una singola villa, raccontandola attraverso "i prossimi 20 anni di vita" più che attraverso specs o status.

---

## 2. Approccio narrativo

**Scelto: A — "Quotidiano-emotivo"**. Una famiglia 40-55 non compra una villa, compra **vent'anni di vita davanti**. Il copy parte dalla scena vissuta (la colazione, la doppia altezza che respira, l'acqua di casa, il giardino come quarta stanza), e usa architettura/materiali come **infrastruttura dei momenti**, non come spettacolo.

Ogni capitolo emotivo chiude con 1 fatto tecnico secco (m², materiale, certificazione) per evitare di scivolare nel sentimentale.

I 5 pilastri narrativi che si rincorrono attraverso tutte le sezioni:
1. **Architettura + materiali** (volumi, vetrate, doppia altezza, materiali nobili)
2. **Volumi scenografici** (doppia altezza, vetrate, patio interno)
3. **Wellness privato** (piscina, SPA, palestra)
4. **Tech costruttiva + outdoor scenografico** (classe A4, sismica, giardino, terrazze)
5. **Privacy + immersione nel verde** (lotto grande, distanza vicini, parco)

---

## 3. Architettura informativa

**16 sezioni** nel flusso scroll (EDEL ne ha 19). Differenze rispetto a EDEL:

| Sezione | Stato vs EDEL | Note |
|---|---|---|
| Nav | Riscritta | Nuovo logo, CTA "Ricevi il dossier" |
| Progress | Identica | UI utility |
| Hero | Riscritta | Nuovo titolo, nuovo sotto-titolo |
| Marquee | Riscritta | 7 token nuovi |
| Statement | Riscritta | Manifesto villa-famiglia |
| Vista | Riscritta | Nuova geografia (collina Cenate, non Ponteranica) |
| Bento | Trasformata | "Quattro capitoli di una giornata" — momenti vissuti, non specs tech |
| TimesOfDay | Riscritta | Stessa meccanica cross-fade, copy rifatto sul territorio |
| Units → **Zone** | **Trasformata** | Non 4 tagli con prezzi, ma 5 zone funzionali della villa |
| Founder → **Costruttore** | **Trasformata** | Edilvertova (no famiglia inventata) |
| Gallery | Didascalie riscritte | Stessa meccanica cinema |
| Location | Riscritta | Nuove distanze (Cenate-centric) |
| Finishes | Riscritta | Materiali villa, brand aggiornati |
| FAQ | 8→7 domande riscritte | Tarate su villa singola |
| Lead | Ristrutturata | No 4 tagli, sì selettore "Cosa ti interessa" |
| NewsletterPanel | **❌ Rimossa** | Per villa singola ha senso ridotto |
| CallbackPanel | Copy riscritto | Nessun nome hardcoded |
| Footer | Riscritta | Edilvertova + agenzia placeholder |
| StickyBar | Copy riscritto | `Brochure` + `Chiama il consulente` |

---

## 4. Copy finale, sezione per sezione

### 4.1 NAV (`src/components/Nav.tsx`)

- **Logo**: `/images/logo/logo_cenate_sopra.png` (asset da produrre)
- **Alt**: `Cenate Sopra`
- **CTA**: `Ricevi il dossier` → ancora `#contatti`

### 4.2 HERO (`src/components/Hero.tsx`)

```
<h1>Sopra Bergamo, una villa fatta per restarci.
   Vent'anni davanti. Una sola scelta.</h1>

<sub>● Cenate Sopra · Bergamo · Classe A4 · Una villa</sub>

<cta-primary>Ricevi il dossier</cta-primary>
<cta-secondary>Parla con il consulente</cta-secondary>
```

- Hero image alt: `Render esterno Villa Cenate Sopra — vista frontale collinare`
- Trust dot mantenuta
- CTA secondario apre `CallbackPanel` (non più PDF brochure diretto)
- Brochure è il form completo (`#contatti`), non un PDF statico (il PDF viene inviato dopo lead capture)

### 4.3 MARQUEE (`src/components/Marquee.tsx`)

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

### 4.4 STATEMENT (`src/components/Statement.tsx`)

```
eyebrow: Il progetto
h2:
  Non si compra una villa.
  Si sceglie una vita.
  Una sola, sopra Bergamo, sulle colline di Cenate Sopra,
  fatta per durare il tempo dei figli.
body: Sessant'anni di cantieri bergamaschi. Una villa. Una scelta che dura.
```

### 4.5 VISTA (`src/components/Vista.tsx`)

```
eyebrow: La vista
h2: La pianura davanti. Le Orobie alle spalle. Voi nel mezzo.
body: A Cenate Sopra la collina diventa terrazza. Venticinque minuti
      da Bergamo, ottanta passi dal silenzio.
```

Image alt: `Vista panoramica Villa Cenate Sopra — colline di Val Cavallina e pianura bergamasca`

### 4.6 BENTO — "Quattro capitoli di una giornata" (`src/components/Bento.tsx`)

```
eyebrow: Vivere qui
h2: Quattro capitoli di una sola giornata.
```

4 card, struttura `num/label/title/intro/bullets` mantenuta dal codice EDEL.

```ts
CARDS = [
  {
    num: '01',
    label: 'Mattina',
    title: 'La cucina che sta sveglia con voi',
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
    title: 'L\'altezza che vi fa respirare',
    intro: 'Soggiorno a doppia altezza, vetrate scorrevoli a tutta parete.',
    bullets: [
      'Living ~65 m², altezza 6 m',
      'Camino centrale, parete TV a scomparsa',
      'Patio interno con doppia altezza',
    ],
  },
  {
    num: '03',
    label: 'Sera',
    title: 'L\'acqua di casa',
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
    title: 'Il giardino come quarta stanza',
    intro: 'Lotto ~2.500 m², illuminazione scenica, accesso privato.',
    bullets: [
      'Parco con essenze autoctone, pergolato in legno',
      'Cancello motorizzato, accesso carrabile dedicato',
      'Distanza dai vicini oltre 30 m su 3 lati',
    ],
  },
]
```

**Placeholder (da confermare con dati reali)**: 38 m² cucina, 65 m² living, H 6 m, 12×4 m piscina, 2.500 m² lotto, 30 m distanza vicini.

### 4.7 TIMES OF DAY (`src/components/TimesOfDay.tsx`)

```ts
STATES = [
  { key: 'dawn', time: '06:42',
    title: 'L\'alba sulle vigne.',
    body: 'La luce arriva dalla pianura. Bergamo non c\'è ancora.' },
  { key: 'day', time: '12:00',
    title: 'Mezzogiorno.',
    body: 'Le Orobie alle spalle. Cenate Sopra al sole. La giornata aperta davanti.' },
  { key: 'dusk', time: '19:10',
    title: 'Le sette e dieci.',
    body: 'Il sole sparisce dietro le valli. Il vino è già aperto.' },
  { key: 'night', time: '22:00',
    title: 'Le ventidue.',
    body: 'Le luci di Bergamo, in fondo. Sopra di voi, solo le stelle.' },
]
```

Alt immagini: aggiornate per Cenate Sopra (alba/giorno/tramonto/notte da colline Val Cavallina).

### 4.8 ZONE DELLA VILLA (ex-Units) (`src/components/Units.tsx`)

**Decisione**: mantenere il nome file `Units.tsx` per minimizzare churn (CSS classes `.units-section`, `.units-stack`, `.unit-card` restano valide visivamente). Solo refactor interno: `UNITS` → `ZONES`, rimossi `price` e `unit-cta`, mantenuta l'animazione stack scrubbing GSAP.

```
eyebrow: Le zone
h2: Una sola villa. Cinque ritmi.
```

5 zone (NO prezzo, NO CTA "Richiedi info" per zona — il CTA è centrale alla fine):

```ts
ZONES = [
  {
    num: '01',
    name: 'Zona giorno',
    specs: '~105 m² · doppia altezza · vetrate scorrevoli · camino',
    body: 'Il cuore della casa. Dove la giornata comincia e finisce.',
  },
  {
    num: '02',
    name: 'Zona notte',
    specs: '4 camere · 4 bagni · cabina armadio · lavanderia',
    body: 'Tutte con bagno e cabina. Due sul giardino, due sulla vista valle.',
  },
  {
    num: '03',
    name: 'Wellness',
    specs: 'piscina · sauna · bagno turco · palestra',
    body: 'Acqua, pietra, calore. La fine giornata che si scrive da sola.',
  },
  {
    num: '04',
    name: 'Outdoor',
    specs: 'lotto ~2.500 m² · piscina 12×4 m · pergolato · barbecue',
    body: 'Il giardino come quarta stanza. Da vivere tutto l\'anno.',
  },
  {
    num: '05',
    name: 'Servizi',
    specs: 'garage doppio · cantina · ripostiglio attrezzato',
    body: 'Tre piani sotto la villa. Per le cose, per le bici, per il vino.',
  },
]
```

Disclaimer in fondo: *"Metrature indicative. Distribuzione e finiture concordate in fase di capitolato presso showroom convenzionati Edilvertova SRL (sede operativa Gazzaniga, BG)."*

### 4.9 COSTRUTTORE (ex-Founder) (`src/components/Founder.tsx`)

```
quote: "Una casa è ben fatta quando, vent'anni dopo, non chiede nulla. È lo standard di Edilvertova."
stats:
  - 55+ anni di mestiere
  - 120+ cantieri firmati
  - 1   villa, unica
```

**Niente nomi di famiglia inventati**. Edilvertova SRL pubblicamente non documenta una saga famigliare specifica — meglio non fabbricare.

**Numeri placeholder**: 55+ (Edilvertova attiva dal 1969 → 2026-1969=57, "55+" è sicuro); 120+ cantieri (placeholder, da confermare con l'azienda); 1 villa (vero — è una villa singola).

### 4.10 GALLERY (`src/components/Gallery.tsx`)

```
eyebrow: Render & Ambienti
h2: Come si vivrà qui.   (← mantenuto, funziona)
```

6 card, didascalie aggiornate:

```ts
CARDS = [
  { num: '01', ttl: 'Render esterno',
    alt: 'Render esterno frontale della villa, vista valle' },
  { num: '02', ttl: 'Soggiorno doppia altezza',
    alt: 'Soggiorno a doppia altezza con vetrate a tutta parete' },
  { num: '03', ttl: 'Vista valle dalla terrazza',
    alt: 'Vista valle e Orobie dalla terrazza principale' },
  { num: '04', ttl: 'Piscina + giardino',
    alt: 'Piscina 12×4 m e giardino paesaggistico' },
  { num: '05', ttl: 'Cucina + isola',
    alt: 'Cucina open space con isola centrale e affaccio giardino' },
  { num: '06', ttl: 'Pianta villa',
    alt: 'Pianta architettonica dei tre livelli' },
]
```

### 4.11 LOCATION (`src/components/Location.tsx`)

```
eyebrow: La posizione
h2: Venticinque minuti da Bergamo. Un mondo a parte.
address: Via [da definire] · Cenate Sopra (BG)
body: Cenate Sopra è la collina di Bergamo che non c'è sulle cartoline.
      Vigne, boschi, silenzio. Eppure il casello A4 di Seriate è a venti
      minuti, l'aeroporto di Orio a venticinque, Bergamo Alta a mezz'ora.
      Bastano i posti che servono — niente di più, niente di meno.

PLACES = [
  ['01', 'Bergamo Alta',       '30 min'],
  ['02', 'Aeroporto Orio',     '25 min'],
  ['03', 'Casello A4 Seriate', '20 min'],
  ['04', 'Lago d\'Iseo',       '25 min'],
]
```

**Da verificare**: tempi reali con Google Maps. Indirizzo civico esatto in via.

### 4.12 FINISHES (`src/components/Finishes.tsx`)

```
eyebrow: Il capitolato
h2: Le tecnologie che vedi.   (← mantenuto)
```

4 facce del cubo:

```ts
BLOCKS = [
  {
    num: '01',
    cat: 'Struttura & Sicurezza',
    title: 'Pensata per resistere.',
    intro: 'Calcestruzzo autosigillante, murature che respirano. Una villa che invecchia bene perché nasce bene.',
    brands: ['Penetron', 'Ytong Climagold', 'Wolf Haus', 'Eternoivica'],
    spec: 'Sismica Cl.4 · Acustica 40 dB · Porta blindata Cl.4',
  },
  {
    num: '02',
    cat: 'Clima & Energia',
    title: 'Bollette azzerate.',
    intro: 'Pompa di calore, pavimento radiante, fotovoltaico con accumulo.',
    brands: ['Immergas', 'Rehau Speed', 'Sharp'],
    spec: 'Classe A4 · FV + accumulo · Auto elettrica predisposta',
  },
  {
    num: '03',
    cat: 'Materiali nobili',
    title: 'Cose che durano.',
    intro: 'Pietra di Sarnico, rovere fumé, travertino, ottone brunito. Selezionati nelle showroom convenzionate.',
    brands: ['Pietra di Sarnico', 'Rovere fumé', 'Travertino', 'Ottone brunito'],
    spec: 'Parquet rovere XL · Pietra naturale interni-esterni',
  },
  {
    num: '04',
    cat: 'Smart & Wellness',
    title: 'Domotica che non spaventa.',
    intro: 'BTicino Living Now, predisposizione SPA, climatizzazione zonale. Smart quando serve, semplice quando volete.',
    brands: ['BTicino Living Now', 'KNX', 'Predisp. SPA'],
    spec: 'App Home+ Control · Videocitofono WiFi · Clima wellness',
  },
]
```

CTA: `Ottieni il dossier completo`
Nota: *"Quindici minuti al telefono per conoscervi. Poi il consulente dedicato vi manda il dossier completo — quaranta pagine di scelte, calibrate sul vostro interesse."*

### 4.13 FAQ (`src/components/FAQ.tsx`) — 7 domande

```
eyebrow: FAQ
h2: Le domande che fanno la differenza.   (← mantenuto)
```

```ts
FAQS = [
  {
    q: 'La villa è disponibile o già impegnata?',
    a: 'In questa fase è ancora libera. Le manifestazioni di interesse sono gestite in ordine d\'arrivo: chi entra prima ha più margine su personalizzazioni e tempistica.',
  },
  {
    q: 'Posso personalizzare materiali e distribuzione?',
    a: 'Sì, finché siamo in fase strutturale. Più presto bloccate la villa, più ampio è il margine per intervenire su materiali, distribuzione interna, scelte di capitolato.',
  },
  {
    q: 'Quando avviene la consegna?',
    a: '[Consegna prevista: TRIMESTRE/ANNO — da confermare con Edilvertova]. Stato lavori e cronoprogramma sono nel dossier completo.',
  },
  {
    q: 'Il prezzo è negoziabile?',
    a: 'Il prezzo è uno. La trattativa è sulle personalizzazioni: capitolato, scelte materiali, integrazioni wellness. Una villa singola si vende una volta sola.',
  },
  {
    q: 'Che garanzie ho sulla qualità costruttiva?',
    a: 'Classe A4, sismica Cl.4, garanzie di legge sulle nuove costruzioni, polizza decennale postuma. Edilvertova è attiva sul mercato bergamasco da oltre 55 anni: i cantieri firmati sono visitabili.',
  },
  {
    q: 'È un buon investimento, oltre che una casa?',
    a: 'Cenate Sopra è zona in apprezzamento. Le ville singole di pregio in collina bergamasca hanno tenuto e accresciuto valore rispetto al decennio scorso. La rivendibilità di un prodotto unico, in zona protetta, è strutturalmente alta.',
  },
  {
    q: 'Quanto tempo ho per decidere?',
    a: 'Meno di quanto pensiate. Le ville singole non si replicano: quando un compratore qualificato la sceglie, l\'opportunità si chiude. Quindici minuti di telefonata bastano per capire se vale la pena approfondire.',
  },
]
```

**Schema.org JSONLD**: mantenuto (è SEO utility), aggiornato con le nuove Q&A.

CTA banner in fondo:
> *"Volete capire se la villa fa per voi?"*
> *"Bastano pochi minuti per capire se ha senso approfondire."*
> CTA: `Richiedi il dossier`

Footer del componente FAQ: **rimosso WhatsApp diretto a Brissoni**. Sostituito con:
> *"Altre domande? Scriveteci dal form qui sotto — risposta entro 24 ore lavorative."*

### 4.14 LEAD (`src/components/Lead.tsx`) — ristrutturazione

```
eyebrow (default): Richiedi il dossier
eyebrow (capitolato): Dossier capitolato — su misura
h2 (default): Il dossier su misura per voi.
h2 (capitolato): Il capitolato, su misura per voi.
sub (default): Quindici minuti al telefono per capirci. Poi il consulente
               dedicato vi manda il dossier completo — quaranta pagine
               di scelte, già calibrate sul vostro interesse.
sub (capitolato): Quindici minuti al telefono per conoscervi. Il dossier
                  capitolato arriva subito dopo via email.
```

**Selettore "Cosa vi interessa?"** (sostituisce `TAGLI`):

```ts
INTEREST = [
  { value: 'dossier',    label: 'Dossier completo via email' },
  { value: 'call',       label: 'Telefonata con il consulente (15 min)' },
  { value: 'sopralluogo',label: 'Sopralluogo guidato in villa' },
]
```

Default: `dossier`. La CSS class `.taglio-grid` resta invariata (3 card invece di 4 — la grid si adatta). Il nome `TAGLI` nel codice diventa `INTEREST` ma il rendering DOM mantiene `taglio-grid` / `taglio-card` per non toccare il CSS.

**Campi mantenuti**: Nome+Cognome*, Telefono*, Email*, Messaggio (facoltativo), GDPR*, "Preferisco prima una telefonata" (checkbox).

**CTA submit**: `Invia richiesta` (al posto di "Richiedi appuntamento privato").

**Form note**: *"Risposta entro 24 ore lavorative. I vostri dati non saranno condivisi con terzi."*

**Error fallback**: link generici parametrizzati, NIENTE `tel:+393332895941` né `mailto:mbrissoni@remax.it` hardcoded. Sostituire con variabili `AGENT_PHONE` / `AGENT_EMAIL` (parametrizzazione).

**Success screen**:
```
Grazie [Nome], per il vostro interesse.
Vi contatteremo entro 24 ore lavorative con il dossier completo
e tutti i dettagli sulla villa.

Nel frattempo:
- Vedi la posizione (link Maps Cenate Sopra)
- Richiedi una callback (link #callback)
- Chiama il consulente (tel: [AGENT_PHONE] · Lun–Ven · 9:00–19:30)
```

**Payload Supabase**: sostituire `source: 'landing_edel'` con `'landing_cenate_sopra'`. `PROJECT_ID` deve essere `'cenate-sopra'` (vedi §6.1).

**SessionStorage keys**: rinominare `edel_request_capitolato` → `cenate_request_dossier`. Custom event `edel:request-capitolato` → `cenate:request-dossier`.

### 4.15 CALLBACKPANEL (`src/components/CallbackPanel.tsx`)

```
eyebrow: Una telefonata
h3: Quindici minuti, senza impegni.
sub: Una chiamata conoscitiva per ricevere tutte le informazioni
     che vi servono. Niente proposte commerciali, niente pressioni —
     quando vi è comodo.
success: Grazie. Il consulente vi richiama nella fascia indicata.
```

(Era "Giuseppe vi richiama". Ora "il consulente" — agency-agnostic.)

### 4.16 STICKYBAR (`src/components/StickyBar.tsx`)

- Pulsante 1: `Brochure` → scrolla a `#contatti` (mantenuto)
- Pulsante 2: testo `Chiama il consulente`, href `tel:[AGENT_PHONE]`
- `aria-label`: `Chiama il consulente dedicato`

(Era "Chiama Massimo".)

### 4.17 FOOTER (`src/components/Footer.tsx`)

```
Col 1:
  [logo cenate_sopra]
  Villa singola · Cenate Sopra (BG)
  ---
  Un progetto Edilvertova SRL

Col 2 — "Commercializzato da":
  [logo agenzia]            ← placeholder, da fornire
  [Nome agente]             ← placeholder, da fornire
  [Indirizzo studio]        ← placeholder
  [Telefono]                ← placeholder
  [Email]                   ← placeholder
  [WhatsApp]                ← placeholder
  Lun–Ven · 9:00–19:30

Col 3 — Legal:
  © 2026 — Tutti i diritti riservati.
  Le immagini sono render di progetto a scopo illustrativo.
  Privacy · Cookie · GDPR
  ---
  Edilvertova SRL · Via IV Novembre 6, 24025 Gazzaniga (BG)
  P.IVA / CF 00811260165 · CCIAA Bergamo
```

P.IVA `00811260165` confermata da fonti pubbliche (Kompass, FatturatoItalia). Sede confermata: Via IV Novembre 6, Gazzaniga.

---

## 5. Asset da produrre (out-of-scope copy, ma necessari per il render)

- `/images/logo/logo_cenate_sopra.png` — logo del progetto
- `/images/logo/logo_edilvertova.png` — logo del costruttore (footer Col 1)
- `/images/logo/logo_agenzia.png` — logo agenzia partner (Footer Col 2)
- `/images/hero/hero-main.jpg` — render esterno villa
- `/images/vista/vista-panoramica.jpg` — vista valle dalla villa
- `/images/bento/bento-{mattina,pomeriggio,sera,notte}.webp` — 4 immagini
- `/images/tod/{dawn,day,dusk,night}.jpg` — 4 stati temporali
- `/images/gallery/gallery-0{1..6}.webp` — 6 render
- `favicon.svg` — favicon Cenate Sopra
- `brochure-cenate-sopra.pdf` — dossier PDF (asset finale post-form)

---

## 6. Modifiche tecniche fuori dal copy (necessarie per integrare il copy)

### 6.1 `src/lib/supabase.ts` — modifica PROJECT_ID

**Decisione**: PROJECT_ID è dato applicativo, non credenziale. Va aggiornato a `'cenate-sopra'` per segmentare correttamente le lead su Supabase (altrimenti finirebbero mescolate con `'edel-ponteranica'`).

```ts
export const PROJECT_ID = 'cenate-sopra'
```

URL e ANON_KEY restano invariati (sono i veri "credentials condivisi").

### 6.2 Parametrizzazione dei dati commerciali (un singolo file di config)

Tutti i nomi/numeri agente/agenzia oggi hardcoded vanno estratti in un singolo file di configurazione, così future operazioni con altre agenzie richiedono solo un cambio di config.

**Proposta**: nuovo file `src/lib/project-config.ts`

```ts
export const PROJECT_CONFIG = {
  // Identità progetto
  projectName: 'Cenate Sopra',
  projectLocation: 'Cenate Sopra (BG)',
  builderName: 'Edilvertova SRL',
  builderTagline: 'dal 1969',

  // Agenzia commercializzazione (placeholder finché non confermata)
  agentName: '[Nome agente]',
  agentPhone: '+39 [num agente]',
  agentEmail: '[email agente]',
  agentWhatsApp: '+39 [num agente]',
  agentHours: 'Lun–Ven · 9:00–19:30',
  agencyAddress: '[indirizzo agenzia]',

  // Asset
  logoPath: '/images/logo/logo_cenate_sopra.png',
  builderLogoPath: '/images/logo/logo_edilvertova.png',
  agencyLogoPath: '/images/logo/logo_agenzia.png',

  // Brochure PDF (inviato post-form-submit, NON link diretto da Hero)
  brochurePath: '/brochure-cenate-sopra.pdf',

  // Supabase data tagging
  leadSource: 'landing_cenate_sopra',
}
```

Tutti i componenti (`Nav`, `Footer`, `StickyBar`, `Lead`, `CallbackPanel`, `Finishes`) leggono da qui.

### 6.3 Sub-progetto separato: **Lead-to-Agency Email Forwarding**

L'utente ha chiesto: ogni volta che si lavora con un'agenzia esterna, le lead devono **automaticamente** essere inoltrate via email all'agenzia.

**Questo non fa parte del copy spec**. Va trattato come sub-progetto a sé con il suo spec/plan. Architettura proposta in breve:
- Supabase Edge Function trigger `on_new_lead`
- Legge `project_id` + tabella `project_recipients` (config: `project_id → email_destinatari[]`)
- Compone email HTML con i dati del lead + link al record Supabase
- Invia tramite SMTP / Resend / Mailgun
- Loggato in `lead_forwarding_log`

Questo sub-progetto andrà spec-ato separatamente dopo il copy di Cenate Sopra.

---

## 7. Placeholder e dati da verificare

Numeri/dati nel copy che sono **placeholder credibili** e vanno confermati prima del go-live:

| Item | Sezione | Valore placeholder | Da confermare con |
|---|---|---|---|
| Cucina m² | Bento 01 | ~38 m² | Pianta progetto |
| Living m² + H | Bento 02 / Zone 01 | ~65 m², H 6 m / ~105 m² | Pianta progetto |
| Piscina dim | Bento 03 / Zone 04 | 12×4 m | Progetto outdoor |
| Lotto m² | Bento 04 / Zone 04 | ~2.500 m² | Visura/PRG |
| Distanza vicini | Bento 04 | >30 m su 3 lati | Pianta + verifica |
| Indirizzo civico | Location | Via [TBD] | Catasto |
| Tempi spostamento | Location | 20/25/30 min | Google Maps |
| Anno consegna | FAQ Q3 | TBD | Edilvertova |
| 120+ cantieri | Costruttore | Stima | Edilvertova |
| Camere/bagni | Zone 02 | 4+4 | Pianta progetto |

---

## 8. Verifica end-to-end

**Come testare il copy implementato**:

1. `cd C:\Users\krist\Desktop\cenate-sopra && npm run dev`
2. Apri `http://localhost:5173` e scrolla l'intera pagina
3. Verifica visivamente:
   - Niente stringa "EDEL", "Ponteranica", "Rinaldi", "Brissoni", "Home In Evolution" residua
   - Niente stringa "12 unità", "bilocale/trilocale/quadrilocale/attico"
   - Niente numero `+39 333 289 5941` o email `mbrissoni@remax.it` residui
   - Marquee mostra i 7 token nuovi in scorrimento infinito
   - TimesOfDay scrolla i 4 stati Cenate
   - Lead form mostra 3 opzioni "Cosa vi interessa" (non 4 tagli)
   - StickyBar mobile mostra "Brochure" + "Chiama il consulente"
4. Compila lead form con `dossier` selezionato → verifica payload Supabase contiene `project: 'cenate-sopra'`, `source: 'landing_cenate_sopra'`
5. Apri `CallbackPanel` (#callback) → verifica copy "il consulente vi richiama"
6. `npm run build` deve passare senza errori TypeScript

**Smoke check del search**: `grep -ri "edel\|ponteranica\|rinaldi\|brissoni\|home in evolution\|+393332895941\|mbrissoni" src/` deve tornare 0 risultati. (Le credenziali Supabase in `supabase.ts` restano, non contengono questi stringhe).

---

## 9. Out of scope (esplicitamente fuori da questo spec)

- Produzione asset visivi (render, logo, foto) — sub-progetto separato
- Brochure PDF — sub-progetto separato
- Script lead-to-agency email forwarding — sub-progetto separato (§6.3)
- Tracking pixel / GTM ID — restano i placeholder EDEL, da aggiornare separatamente
- Privacy policy / cookie banner — copy legale separato
- Dominio + deploy Vercel — sub-progetto deploy

---

## 10. Riassunto file da modificare

| File | Tipo modifica |
|---|---|
| `src/components/Nav.tsx` | Copy + logo path |
| `src/components/Hero.tsx` | Copy completo |
| `src/components/Marquee.tsx` | Array `ITEMS` |
| `src/components/Statement.tsx` | Copy completo |
| `src/components/Vista.tsx` | Copy completo |
| `src/components/Bento.tsx` | Array `CARDS` + section heading |
| `src/components/TimesOfDay.tsx` | Array `STATES` |
| `src/components/Units.tsx` | Refactor completo → 5 zone, no prezzo, no CTA per zona, no `TAGLI` |
| `src/components/Founder.tsx` | Quote + array `STATS` |
| `src/components/Gallery.tsx` | Array `CARDS` |
| `src/components/Location.tsx` | Copy + array `PLACES` |
| `src/components/Finishes.tsx` | Array `BLOCKS` + nota CTA |
| `src/components/FAQ.tsx` | Array `FAQS` + JSONLD + footer del componente |
| `src/components/Lead.tsx` | Refactor: `TAGLI` → `INTEREST`, copy, success screen, sessionStorage keys, custom event, payload `source` |
| `src/components/CallbackPanel.tsx` | Copy |
| `src/components/StickyBar.tsx` | Testo bottoni + `tel:` href parametrico |
| `src/components/Footer.tsx` | Copy + parametrizzazioni |
| `src/lib/supabase.ts` | `PROJECT_ID` only |
| `src/lib/project-config.ts` | **Nuovo file** — config commerciale parametrizzata |
| `index.html` | `<title>` + meta description + og:* |

**Totale**: ~19 file modificati, 1 file nuovo.

---

## 11. Decisioni esplicite

- ✅ Approccio narrativo: **A — quotidiano-emotivo**
- ✅ Hero title: **V2 "Sopra Bergamo, una villa fatta per restarci. Vent'anni davanti. Una sola scelta."**
- ✅ Struttura: **16 sezioni** (NewsletterPanel rimosso, Units→Zone, Founder→Costruttore)
- ✅ CTA primario: **brochure/dossier**; secondario: **callback**; nessuna visita in villa
- ✅ Buyer target: **famiglia premium 40-55, 1.2-2.5M€**
- ✅ Builder: **Edilvertova SRL** (no nomi famiglia inventati)
- ✅ Sales: **agenzia partner** (placeholder, parametrizzato)
- ✅ `PROJECT_ID` Supabase: cambia a **`'cenate-sopra'`**
- ✅ Nomi/contatti commerciali: **parametrizzati in `project-config.ts`**
- ✅ Lead-to-agency email forwarding: **sub-progetto separato** (out of scope qui)

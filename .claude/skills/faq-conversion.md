# SKILL: FAQ Conversion — FAQ tagliente per landing high-ticket

Quando il task richiede una sezione FAQ per landing alto-ticket (>500€ B2C, >5k€ B2B, real estate, luxury, consulenza, formazione premium).

## QUANDO ATTIVARE
Trigger: "FAQ", "domande frequenti", "obiezioni", "Q&A", "domande comuni", "scioglie dubbi".

## REGOLA D'ORO
La FAQ NON serve a "informare". Serve a **togliere freni mentali prima che diventino obiezioni in trattativa**. Ogni domanda è un'obiezione del target sciolta in modo adulto, senza creare ansia.

## I 3 PRINCIPI

1. **Ordine psicologico, non alfabetico**: dalla domanda più rassicurante (razionale) alla più decisiva (emotiva)
2. **Risposta concreta, non vaga**: numeri, persone, tempi specifici. Mai "su richiesta", sempre "entro 30 giorni"
3. **Tono adulto**: niente "ottima domanda!", niente esclamazioni, niente urgenza

## STRUTTURA STANDARD — 8 domande

| # | Tipologia | Esempio (real estate) |
|---|-----------|----------------------|
| 1 | Razionale rassicurante | "In che classe energetica costruite?" |
| 2 | Tempi/concreto | "Quando saranno consegnate?" |
| 3 | **Domanda non detta** | "Ci potremo abitare anche tra 20 anni?" |
| 4 | Pratico/gestione | "Quanto pesa il condominio?" |
| 5 | Decisione/blocco | "Possiamo prenotare prima di decidere?" |
| 6 | **Obiezione finale** | "Conviene fermarsi adesso o aspettare?" |
| 7 | Personalizzazione | "Possiamo personalizzare le finiture?" |
| 8 | Chiusura/ripensamento | "E se cambiamo idea dopo aver firmato?" |

**Le posizioni 3 e 6 sono CRITICHE**: sciolgono le obiezioni mentali profonde che il target non formulerà ad alta voce.

## STRUTTURA HTML/JSX (accordion accessibile)

```jsx
<section id="faq" className="faq">
  <header className="faq__header">
    <p className="eyebrow">Le domande che ci hanno fatto altri prima di voi</p>
    <h2>Domande che vale la pena fare.</h2>
  </header>
  
  <ul className="faq__list" role="list">
    {faqs.map((item, i) => (
      <li key={i} className="faq__item">
        <button
          className="faq__question"
          aria-expanded={openIndex === i}
          aria-controls={`faq-answer-${i}`}
          onClick={() => setOpenIndex(openIndex === i ? null : i)}
        >
          <span>{item.question}</span>
          <span className="faq__icon" aria-hidden="true">+</span>
        </button>
        <div
          id={`faq-answer-${i}`}
          className="faq__answer"
          aria-hidden={openIndex !== i}
        >
          <p>{item.answer}</p>
        </div>
      </li>
    ))}
  </ul>
  
  <footer className="faq__footer">
    <p>Altre domande? Scrivete a <a href="mailto:[email]">[email]</a> — risponde [nome persona].</p>
  </footer>
</section>
```

## CSS chiave

```css
.faq {
  padding: clamp(80px, 12vw, 160px) 22px;
  max-width: 880px;
  margin: 0 auto;
}

.faq__header {
  margin-bottom: 60px;
  text-align: center;
}

.faq__list {
  list-style: none;
  padding: 0;
}

.faq__item {
  border-bottom: 1px solid var(--line);
}

.faq__question {
  width: 100%;
  background: transparent;
  border: none;
  padding: clamp(20px, 3vw, 32px) 0;
  text-align: left;
  font-family: inherit;
  font-size: clamp(18px, 2vw, 24px);
  font-weight: 500;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  color: var(--text);
}

.faq__question:focus-visible {
  outline: 2px solid var(--bronze);
  outline-offset: 4px;
}

.faq__icon {
  font-size: 24px;
  font-weight: 300;
  transition: transform 0.32s cubic-bezier(.22, 1, .36, 1);
  flex-shrink: 0;
}

.faq__question[aria-expanded="true"] .faq__icon {
  transform: rotate(45deg);
}

.faq__answer {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: max-height 0.32s cubic-bezier(.22, 1, .36, 1),
              opacity 0.32s cubic-bezier(.22, 1, .36, 1);
}

.faq__answer[aria-hidden="false"] {
  max-height: 800px; /* sufficiente per ogni risposta */
  opacity: 1;
  padding-bottom: 32px;
}

.faq__answer p {
  font-size: clamp(15px, 1.2vw, 18px);
  line-height: 1.6;
  color: var(--text-soft);
  max-width: 720px;
}

.faq__footer {
  text-align: center;
  margin-top: 80px;
  font-size: 14px;
  color: var(--muted);
}
```

## SEO — JSON-LD obbligatorio

```jsx
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(f => ({
    "@type": "Question",
    "name": f.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": f.answer
    }
  }))
})}} />
```

Inserire in `<Head>` con React Helmet o Next.js Head. Genera rich snippet su Google.

## REGOLE COPY — DOMANDE

### DO
- Formulare la domanda **come la farebbe il target**, non come la farebbe l'azienda
  - ✅ "Ci potremo abitare anche tra 20 anni?"
  - ❌ "Le nostre soluzioni sono progettate per l'aging in place?"
- Usare "voi/noi" (mai "il cliente", mai impersonale)
- Domande corte (5-10 parole)
- Una sola domanda per voce (no domande composte)

### DON'T
- "Cosa rende speciale [brand]?" (auto-celebrativo)
- "Perché scegliere [noi]?" (vendita esplicita)
- "Domande generiche tipo FAQ template" (suona finto)

## REGOLE COPY — RISPOSTE

### DO
- 2-4 frasi max
- Numeri/dati concreti ("entro 30 giorni", "12 cm di cappotto", "garanzia 10 anni")
- Persone con nome ("risponde Massimo personalmente")
- Tono adulto, conversazionale ma professionale

### DON'T
- Linguaggio commerciale ("la nostra esclusiva offerta")
- Disclaimer eccessivi ("salvo disponibilità, condizioni potrebbero cambiare")
- Risposte vaghe ("dipende dalle esigenze")
- Troppi link interni in una risposta

## ESEMPIO COMPLETO — adattabile a settori diversi

### Real estate alto-ticket
```
1. "In che classe energetica costruite?"
   A: Classe A4. VMC, riscaldamento a pavimento, predisposizione fotovoltaico, 
      cappotto 14 cm. APE disponibile in fase preliminare.

2. "Quando saranno consegnate?"
   A: Cantiere aperto da [mese/anno]. Consegna [Q4 2026]. 
      Aggiornamenti mensili dello stato lavori a chi ne fa richiesta.

3. "Ci potremo abitare anche tra vent'anni?"
   A: Le unità da 180m² in su sono single-floor con ascensore privato 
      dall'autorimessa al piano. Bagni walk-in a filo pavimento. 
      Soglie minime, illuminazione lineare. Porte da 90 cm.

4. "E il condominio? Quanto pesa la gestione?"
   A: Dodici unità. Costi prevedibili. Manutenzione affidata alla stessa 
      impresa che ha costruito. Nessun cambio di referente.

5. "Possiamo prenotare prima di decidere definitivamente?"
   A: Sì. Prelazione 30 giorni, caparra restituibile fino al preliminare. 
      Senza fretta, senza pressione.

6. "Conviene fermarsi adesso o aspettare?"
   A: Le 12 unità non torneranno disponibili. Ma non è motivo di affrettare 
      una decisione che dura 30 anni. Vi proponiamo di vedere il cantiere 
      prima di decidere — di persona, senza appuntamento commerciale.

7. "Possiamo personalizzare le finiture?"
   A: Fino a 6 mesi prima della consegna sì, su tutta la zona giorno e bagni. 
      Tre selezioni di base più variazioni puntuali. 
      L'architetto Andrea segue ogni cliente personalmente.

8. "E se cambiamo idea dopo aver firmato il preliminare?"
   A: Esistono clausole di recesso definite chiaramente nel contratto. 
      Le illustriamo prima della firma, non dopo. 
      La trasparenza per noi non è marketing: dura da tre generazioni.
```

### Adattamento per consulenza B2B
- Q1 razionale: "Quanto durano i progetti tipici?"
- Q3 non detta: "E se non funziona per la mia azienda?"
- Q6 obiezione: "Perché ora e non tra 6 mesi?"
- Q8 chiusura: "Cosa succede se decidiamo di interrompere?"

### Adattamento per formazione premium
- Q1 razionale: "Quante ore di lezione e in che format?"
- Q3 non detta: "E se non tengo il passo con gli altri partecipanti?"
- Q6 obiezione: "Posso aspettare la prossima edizione?"
- Q8 chiusura: "Esiste una money-back guarantee?"

## ANIMAZIONE GSAP (opzionale)

Le FAQ NON necessitano di GSAP — la transizione CSS è sufficiente. Se proprio vuoi GSAP per i fade-in iniziali:

```js
useGSAP(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  
  gsap.from('.faq__item', {
    y: 24, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'expo.out',
    scrollTrigger: { trigger: '.faq__list', start: 'top 80%' }
  });
});
```

## ACCESSIBILITY CHECKLIST

1. `aria-expanded` aggiornato sul button
2. `aria-controls` punta all'id corretto del pannello
3. `aria-hidden` sul pannello chiuso
4. Keyboard: Tab + Enter/Space per toggle
5. Focus visible (outline custom, no `outline: none`)
6. Screen reader: leggi domanda + stato + risposta in ordine logico
7. JSON-LD FAQPage schema in `<head>`

## ANTI-PATTERN

1. **20+ domande** → noioso, max 8-10
2. **Tutte aperte di default** → defeat dello scopo accordion
3. **Multiple aperte simultaneamente** → confonde, scegli single-open
4. **Risposte 1 frase secca** → sembra liquidatoria
5. **Risposte >100 parole** → noiose, tagliare
6. **Linguaggio legale/disclaimer** → spaventa invece di rassicurare
7. **Mancanza di CTA al fondo** ("altre domande? scrivete a...") → manca opportunità di contatto
8. **Auto-promo nelle risposte** ("e questo è solo uno dei vantaggi della nostra esclusiva...")
9. **Domande inventate che il target non si fa** → si percepisce
10. **No JSON-LD** → perde rich snippet Google

## CHECKLIST FINE TASK

1. 8 domande in ordine psicologico (non alfabetico)
2. Q3 e Q6 sciolgono le obiezioni profonde (non dette)
3. Risposte 2-4 frasi con numeri concreti
4. Linguaggio del target (non aziendale)
5. Accordion accessibile (ARIA + keyboard)
6. Single-open behavior
7. JSON-LD FAQPage schema in head
8. Footer con CTA umano (email + nome persona reale)
9. Animazione transizione fluida (320ms cubic-bezier)
10. Mobile: spaziatura generosa, font ≥18px questions

# SKILL: Form Design — Lead form high-conversion

Quando il task tocca form lead (contatti, brochure request, prenotazioni), validation, success state, GDPR, anti-spam, UTM tracking. Il form è la finale della landing: dove tutto il lavoro si converte (o si perde).

## QUANDO ATTIVARE
Trigger: "form lead", "form contatti", "richiedi info", "form brochure", "GDPR", "validazione campi", "success state", "form submit", "honeypot", "UTM tracking".

## REGOLE D'ORO LEAD FORM

1. **Campi minimi assoluti**: Nome, Email, Telefono. Tutto il resto è friction. Su 1000 form, ogni campo extra perde ~5-15% di completion.
2. **Mai più di 5 campi visibili** in una vista. Se servono di più → split in 2 step.
3. **Validation inline real-time** (on blur, non solo on submit).
4. **Errore SPECIFICO** vicino al campo, non in cima al form.
5. **Submit text specifica**: "Inviami la brochure" > "Invia".
6. **Success state DIVERSO dal form**: cambia layout, messaggio personale, next step chiaro.
7. **GDPR consent SOPRA il submit**, non in fondo. Checkbox unico chiaro.
8. **Anti-spam onboarding-friendly**: honeypot field invisibile + time-trap (form submit <2s = bot).
9. **UTM tracking automatico** da query string → invio nel payload.
10. **Privacy/Terms link nel consent**, non in footer separato.

## STRUTTURA STANDARD

```html
<form class="lead-form" name="lead" novalidate>
  <!-- Honeypot anti-bot, sempre primo, hidden -->
  <input type="text" name="website" class="honeypot" tabindex="-1" autocomplete="off">

  <!-- Selector taglio interesse -->
  <fieldset class="field-group">
    <legend>Quale taglio ti interessa?</legend>
    <div class="taglio-cards">
      <label><input type="radio" name="taglio" value="bilocale">Bilocale</label>
      <label><input type="radio" name="taglio" value="trilocale">Trilocale</label>
      <label><input type="radio" name="taglio" value="quadrilocale">Quadrilocale</label>
      <label><input type="radio" name="taglio" value="attico">Attico</label>
    </div>
  </fieldset>

  <!-- Campi base -->
  <div class="field">
    <label for="nome">Nome e cognome *</label>
    <input id="nome" name="nome" type="text" required minlength="2" autocomplete="name">
    <span class="field-error"></span>
  </div>

  <div class="field-row">
    <div class="field">
      <label for="email">Email *</label>
      <input id="email" name="email" type="email" required autocomplete="email">
      <span class="field-error"></span>
    </div>
    <div class="field">
      <label for="tel">Telefono *</label>
      <input id="tel" name="tel" type="tel" required autocomplete="tel" pattern="[0-9 +\-]{8,}">
      <span class="field-error"></span>
    </div>
  </div>

  <!-- Note opzionali -->
  <div class="field">
    <label for="note">Note (opzionale)</label>
    <textarea id="note" name="note" rows="3" maxlength="500"></textarea>
  </div>

  <!-- GDPR -->
  <label class="consent">
    <input type="checkbox" name="gdpr" required>
    Acconsento al trattamento dei dati per ricevere informazioni su EDEL Ponteranica.
    <a href="/privacy" target="_blank">Privacy Policy</a>.
  </label>

  <!-- Submit -->
  <button type="submit" class="btn-primary">
    Inviami la brochure →
  </button>

  <!-- Trust signal sotto submit -->
  <p class="form-disclaimer">
    Risposta entro 24 ore lavorative · I tuoi dati non saranno mai condivisi.
  </p>
</form>
```

## CSS chiave

```css
.honeypot {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--bronze-soft);
}

.field input,
.field textarea {
  padding: 14px 16px;
  background: transparent;
  border: 1px solid var(--line);
  border-radius: 4px;
  color: var(--cream);
  font-family: var(--sans);
  font-size: 16px; /* iOS no zoom on focus */
  transition: border-color 0.2s ease;
}

.field input:focus,
.field textarea:focus {
  outline: none;
  border-color: var(--bronze);
}

.field input:invalid:not(:placeholder-shown),
.field input.has-error {
  border-color: #c44;
}

.field-error {
  font-size: 12px;
  color: #c44;
  min-height: 16px; /* riserva spazio per evitare CLS */
}

/* Mobile: stack fields invece di row */
@media (max-width: 600px) {
  .field-row { grid-template-columns: 1fr; gap: 16px; }
}
```

**Critical**: `font-size: 16px` su input mobile per evitare zoom automatico iOS.

## VALIDATION inline (TypeScript)

```tsx
const [errors, setErrors] = useState<Record<string, string>>({});

const validate = (name: string, value: string): string => {
  switch (name) {
    case 'nome':
      return value.trim().length < 2 ? 'Inserisci nome e cognome' : '';
    case 'email':
      return !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value) ? 'Email non valida' : '';
    case 'tel':
      return !/^[0-9+\-\s]{8,}$/.test(value) ? 'Numero non valido (min 8 cifre)' : '';
    case 'gdpr':
      return value !== 'on' ? 'Devi accettare la privacy' : '';
    default:
      return '';
  }
};

const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  const error = validate(e.target.name, e.target.value);
  setErrors(prev => ({ ...prev, [e.target.name]: error }));
};
```

Validation SOLO `onBlur`, mai `onChange` (irritante mentre l'utente sta scrivendo).

## SUBMIT con anti-spam + UTM

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const startTime = Number(form.dataset.startTime);
  const elapsed = Date.now() - startTime;

  // Anti-spam: form completato in <2s = bot
  if (elapsed < 2000) {
    setStatus('error');
    return;
  }

  // Honeypot check
  const honeypot = (form.querySelector('[name="website"]') as HTMLInputElement).value;
  if (honeypot) {
    setStatus('error');
    return;
  }

  // UTM tracking
  const params = new URLSearchParams(window.location.search);
  const utm = {
    source: params.get('utm_source'),
    medium: params.get('utm_medium'),
    campaign: params.get('utm_campaign'),
  };

  // Payload
  const data = new FormData(form);
  const payload = {
    nome: data.get('nome'),
    email: data.get('email'),
    tel: data.get('tel'),
    taglio: data.get('taglio'),
    note: data.get('note'),
    gdpr_at: new Date().toISOString(),
    utm,
    page_url: window.location.href,
  };

  setStatus('loading');
  try {
    await sendLead(payload); // Supabase or webhook
    setStatus('success');
  } catch (err) {
    setStatus('error');
  }
};
```

`startTime` set su `useEffect` mount. È più affidabile di `data-attr` ma esempio sopra spiega concetto.

## SUCCESS STATE — il momento del valore

Dopo submit ok, NON mostrare "Inviato!" generico. Cambia layout, dai contesto:

```tsx
{status === 'success' && (
  <div className="form-success">
    <svg><!-- check icon bronze --></svg>
    <h3>Grazie {nome.split(' ')[0]}, ti contattiamo entro 24 ore lavorative.</h3>
    <p>Nel frattempo, puoi:</p>
    <ul>
      <li><a href="/brochure.pdf">Scaricare la brochure</a> (anteprima 8 pagine)</li>
      <li><a href={whatsappLink}>Scriverci su WhatsApp</a> per domande veloci</li>
      <li><a href="https://www.google.com/maps/...">Vedere il cantiere su Google Maps</a></li>
    </ul>
  </div>
)}
```

Personalizza con il nome se possibile. Offri 2-3 next step. **Non lasciarli nel limbo "ti richiamiamo".**

## ERROR STATE

```tsx
{status === 'error' && (
  <div className="form-error">
    <p>Qualcosa è andato storto. Riprova oppure scrivici a <a href="mailto:info@edel.it">info@edel.it</a>.</p>
  </div>
)}
```

Sempre fallback umano (mail/tel) quando il form fallisce.

## ANTI-PATTERN

1. **Form con 8+ campi** → completion rate <10%. Tagliare.
2. **Validation onChange** → utente irritato mentre sta scrivendo. Solo onBlur o onSubmit.
3. **Errore generico in cima** ("Compila i campi obbligatori") → utente non sa quale. Inline near field.
4. **Submit "Invia"** → vago. Specifico: "Inviami la brochure".
5. **GDPR pre-checked** → illegale GDPR. Sempre unchecked di default.
6. **Privacy policy in popup modal** → friction. Link `target="_blank"`.
7. **No honeypot anti-bot** → spam pulito.
8. **Success state = stesso form svuotato** → utente non capisce se è andato. Sempre layout diverso.
9. **Submit blocca pagina (alert)** → preistorico. Toast/inline message.
10. **Mancanza UTM tracking** → marketing non sa quale canale converte.

## CHECKLIST FINE FORM

1. Max 5 campi visibili (split in step se più)
2. Honeypot presente
3. Time-trap presente (>2s)
4. Validation inline onBlur
5. Errore vicino al campo, specifico
6. GDPR unchecked default, link target="_blank"
7. Submit text descrittivo (non "Invia")
8. Success state diverso da form, con next steps
9. Error state con fallback (email/tel)
10. UTM tracking nel payload
11. font-size 16px sugli input (no zoom iOS)
12. autocomplete attribuiti corretti (`name`, `email`, `tel`)

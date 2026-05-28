import { type FocusEvent, type FormEvent, type ReactNode, useEffect, useRef, useState } from 'react'
import { sendLead, getUTM, PROJECT_ID } from '../lib/supabase'
import { PROJECT_CONFIG } from '../lib/project-config'

type GtagFn = (event: string, action: string, params: Record<string, string>) => void
type FbqFn = (event: string, action: string) => void

type InterestOption = {
  value: string
  num: string
  name: ReactNode
}

const INTEREST: InterestOption[] = [
  { value: 'dossier',     num: '01', name: <span className="ital">Dossier via email</span> },
  { value: 'call',        num: '02', name: <span className="ital">Telefonata 15'</span> },
  { value: 'sopralluogo', num: '03', name: <span className="ital">Sopralluogo in villa</span> },
]

type FieldName = 'nome' | 'tel' | 'email' | 'gdpr'

const validateField = (name: FieldName, value: string, gdprChecked = false): string => {
  switch (name) {
    case 'nome':
      return value.trim().length < 2 ? 'Inserisci nome e cognome' : ''
    case 'email':
      return !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value.trim())
        ? 'Email non valida'
        : ''
    case 'tel':
      return !/^[0-9+\-\s]{8,}$/.test(value.trim())
        ? 'Numero non valido (min 8 cifre)'
        : ''
    case 'gdpr':
      return !gdprChecked ? 'Devi accettare la privacy per procedere' : ''
    default:
      return ''
  }
}

export default function Lead() {
  const [interest, setInterest] = useState('dossier')
  const [nome, setNome] = useState('')
  const [tel, setTel] = useState('')
  const [email, setEmail] = useState('')
  const [note, setNote] = useState('')
  const [gdpr, setGdpr] = useState(false)
  const [preferCall, setPreferCall] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({})
  const [dossierRequested, setDossierRequested] = useState(false)
  const startTimeRef = useRef<number>(0)
  const honeypotRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    startTimeRef.current = Date.now()
    if (sessionStorage.getItem('cenate_request_dossier') === 'true') {
      setDossierRequested(true)
      setPreferCall(true)
    }
    const handler = () => {
      setDossierRequested(true)
      setPreferCall(true)
    }
    window.addEventListener('cenate:request-dossier', handler)
    return () => window.removeEventListener('cenate:request-dossier', handler)
  }, [])

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as FieldName
    if (name !== 'nome' && name !== 'tel' && name !== 'email') return
    const err = validateField(name, e.target.value)
    setErrors((prev) => ({ ...prev, [name]: err }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(false)

    const newErrors: Partial<Record<FieldName, string>> = {
      nome: validateField('nome', nome),
      email: validateField('email', email),
      tel: validateField('tel', tel),
      gdpr: validateField('gdpr', '', gdpr),
    }
    setErrors(newErrors)
    if (Object.values(newErrors).some(Boolean)) return

    const elapsed = Date.now() - startTimeRef.current
    if (elapsed < 2000) {
      setError(true)
      return
    }

    if (honeypotRef.current && honeypotRef.current.value) {
      setError(true)
      return
    }

    setSubmitting(true)
    const utm = getUTM()
    const noteFinal = dossierRequested
      ? `[RICHIESTA DOSSIER] ${note.trim()}`.trim()
      : note.trim() || null
    const payload = {
      project: PROJECT_ID,
      nome: nome.trim(),
      email: email.trim(),
      telefono: tel.trim(),
      interest: interest || null,
      note: noteFinal,
      prefer_call: preferCall,
      consenso_gdpr: gdpr,
      consenso_at: gdpr ? new Date().toISOString() : null,
      request_type: dossierRequested ? 'dossier_capitolato' : 'info_generali',
      source: dossierRequested ? `${PROJECT_CONFIG.leadSource}_dossier` : PROJECT_CONFIG.leadSource,
      page_url: typeof window !== 'undefined' ? window.location.href : null,
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
      ...utm,
    }

    try {
      const ok = await sendLead(payload)
      if (!ok) throw new Error('Errore invio')
      sessionStorage.removeItem('cenate_request_dossier')
      setSuccess(true)
      const win = window as Window & { gtag?: GtagFn; fbq?: FbqFn }
      if (typeof win.gtag === 'function')
        win.gtag('event', 'conversion', { send_to: 'AW-XXX/XXX' })
      if (typeof win.fbq === 'function') win.fbq('track', 'Lead')
    } catch (err) {
      console.error(err)
      setError(true)
      setSubmitting(false)
    }
  }

  const firstName = nome.trim().split(' ')[0]

  return (
    <section className="lead" id="contatti">
      <div className="lead-inner">
        {dossierRequested && !success && (
          <div className="lead-banner reveal">
            <span className="lead-banner__tag">Dossier capitolato · Su misura</span>
            <p>
              Lasciate nome, telefono ed email. <strong>Quindici minuti al telefono</strong> per conoscervi. Subito dopo, il dossier capitolato arriva via email — quaranta pagine di scelte, calibrate sul vostro interesse.
            </p>
          </div>
        )}
        <div className="reveal">
          <div className="eyebrow">{dossierRequested ? 'Dossier capitolato' : 'Richiedi il dossier'}</div>
          <h2 className="lead-title">
            {dossierRequested ? (
              <>
                Il capitolato,
                <br />
                <span className="ital">su misura per voi</span>.
              </>
            ) : (
              <>
                Il dossier,
                <br />
                <span className="ital">su misura per voi</span>.
              </>
            )}
          </h2>
          <p className="lead-sub">
            {dossierRequested
              ? 'Quindici minuti al telefono per conoscervi. Il dossier capitolato arriva subito dopo via email.'
              : 'Quindici minuti al telefono per capirci. Poi il consulente dedicato vi manda il dossier completo — quaranta pagine di scelte, già calibrate sul vostro interesse.'}
          </p>
        </div>

        {!success && (
          <>
            <div className="reveal reveal-d1">
              <div
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--bronze-soft)',
                  marginBottom: '14px',
                  fontWeight: 600,
                }}
              >
                Cosa vi interessa
              </div>
              <div className="taglio-grid">
                {INTEREST.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    className={`taglio-card${interest === t.value ? ' active' : ''}`}
                    onClick={() => setInterest(t.value)}
                  >
                    <div className="tg-num">— {t.num}</div>
                    <div className="tg-name">{t.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="reveal reveal-d2" noValidate>
              <input
                ref={honeypotRef}
                type="text"
                name="website"
                className="honeypot"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="field">
                <label htmlFor="nome">Nome e Cognome*</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  required
                  autoComplete="name"
                  placeholder="Come vi chiamate?"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  onBlur={handleBlur}
                  className={errors.nome ? 'has-error' : ''}
                  aria-invalid={Boolean(errors.nome)}
                  aria-describedby="nome-error"
                />
                <span className="field-error" id="nome-error">{errors.nome}</span>
              </div>

              <div className="field">
                <label htmlFor="tel">Telefono*</label>
                <input
                  type="tel"
                  id="tel"
                  name="tel"
                  required
                  autoComplete="tel"
                  placeholder="Vi richiamiamo entro 24h"
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}
                  onBlur={handleBlur}
                  className={errors.tel ? 'has-error' : ''}
                  aria-invalid={Boolean(errors.tel)}
                  aria-describedby="tel-error"
                />
                <span className="field-error" id="tel-error">{errors.tel}</span>
              </div>

              <div className="field">
                <label htmlFor="email">Email*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="La vostra email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={handleBlur}
                  className={errors.email ? 'has-error' : ''}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby="email-error"
                />
                <span className="field-error" id="email-error">{errors.email}</span>
              </div>

              <div className="field">
                <label htmlFor="note">Messaggio (facoltativo)</label>
                <textarea
                  id="note"
                  name="note"
                  placeholder="Avete esigenze particolari?"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  maxLength={500}
                />
              </div>

              <label className="checkbox">
                <input
                  type="checkbox"
                  id="gdpr"
                  name="gdpr"
                  required
                  checked={gdpr}
                  onChange={(e) => {
                    setGdpr(e.target.checked)
                    setErrors((prev) => ({ ...prev, gdpr: '' }))
                  }}
                />
                <span>
                  Acconsento al trattamento dei miei dati personali ai sensi del{' '}
                  <a href="/privacy.html" target="_blank" rel="noopener noreferrer">
                    GDPR / Privacy Policy
                  </a>{' '}
                  per essere ricontattato.*
                </span>
              </label>
              {errors.gdpr && (
                <span className="field-error" style={{ marginTop: 0 }}>
                  {errors.gdpr}
                </span>
              )}

              <label className="checkbox checkbox-secondary">
                <input
                  type="checkbox"
                  id="prefer-call"
                  name="prefer_call"
                  checked={preferCall}
                  onChange={(e) => setPreferCall(e.target.checked)}
                />
                <span>Preferisco prima una telefonata di 15 minuti.</span>
              </label>

              <button type="submit" className="submit" disabled={submitting}>
                {submitting ? (
                  'Invio in corso...'
                ) : (
                  <>
                    Invia richiesta
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </>
                )}
              </button>

              <p className="form-note">
                Risposta entro 24 ore lavorative. I vostri dati non saranno condivisi con terzi.
              </p>

              {error && (
                <div className="err-msg show err-msg-fallback">
                  Si è verificato un errore. Potete anche scriverci a{' '}
                  <a href={`mailto:${PROJECT_CONFIG.agentEmail}`}>{PROJECT_CONFIG.agentEmail}</a> o chiamarci al{' '}
                  <a href={PROJECT_CONFIG.agentPhoneHref}>{PROJECT_CONFIG.agentPhoneDisplay}</a>.
                </div>
              )}
            </form>
          </>
        )}

        {success && (
          <div className="success show">
            <div className="success-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22" aria-hidden="true">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h3 className="serif">
              Grazie {firstName ? `${firstName}, ` : ''}per il vostro <span className="ital">interesse</span>
            </h3>
            <p>Vi contatteremo entro 24 ore lavorative con il dossier completo e tutti i dettagli sulla villa.</p>

            <div className="success-next">
              <div className="success-next-title">Nel frattempo</div>
              <ul>
                <li>
                  <a
                    href={`https://wa.me/${PROJECT_CONFIG.agentWhatsAppNumber}?text=Ciao%2C%20vorrei%20info%20su%20${encodeURIComponent(PROJECT_CONFIG.projectName)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Scriveteci su WhatsApp
                  </a>{' '}
                  per domande veloci
                </li>
                <li>
                  <a
                    href={PROJECT_CONFIG.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Vedete la posizione
                  </a>{' '}
                  sulla mappa
                </li>
                <li>
                  <a href={PROJECT_CONFIG.agentPhoneHref}>Chiamate il consulente</a>{' '}
                  ({PROJECT_CONFIG.agentHours})
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

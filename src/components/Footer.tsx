import { PROJECT_CONFIG } from '../lib/project-config'

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-col">
          <img className="footer-logo-img" src={PROJECT_CONFIG.logoPath} alt={PROJECT_CONFIG.logoAlt} loading="lazy" />
          <p>Villa singola · {PROJECT_CONFIG.projectLocation}</p>
          <div className="footer-col-line" />
          <p className="footer-meta">Un progetto {PROJECT_CONFIG.builderName}</p>
        </div>

        <div className="footer-col">
          <div className="footer-col-heading">Commercializzato da</div>
          <img className="footer-agency-img" src={PROJECT_CONFIG.agencyLogoPath} alt="Agenzia partner" loading="lazy" />
          <p>{PROJECT_CONFIG.agentName}</p>
          <p>{PROJECT_CONFIG.agencyAddress}</p>
          <p>{PROJECT_CONFIG.agencyCity}</p>
          <div className="footer-col-line" />
          <p>
            <a href={PROJECT_CONFIG.agentPhoneHref}>{PROJECT_CONFIG.agentPhoneDisplay}</a>
          </p>
          <p>
            <a href={`mailto:${PROJECT_CONFIG.agentEmail}`}>{PROJECT_CONFIG.agentEmail}</a>
          </p>
          <p>
            <a
              href={`https://wa.me/${PROJECT_CONFIG.agentWhatsAppNumber}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </p>
          <p className="footer-meta">{PROJECT_CONFIG.agentHours}</p>
        </div>

        <div className="footer-col footer-col-legal">
          <p className="footer-meta">© 2026 — Tutti i diritti riservati.</p>
          <p className="footer-meta">
            Le immagini sono render di progetto a scopo illustrativo.
          </p>
          <p className="footer-meta">
            <a href="/privacy.html" target="_blank" rel="noopener noreferrer">
              Privacy
            </a>
            {' · '}Cookie · GDPR
          </p>
          <div className="footer-col-line" />
          <p className="footer-meta">
            {PROJECT_CONFIG.builderFullLegal}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-col">
          <img className="footer-logo-img" src="/images/logo/logo_edel.png" alt="EDEL Ponteranica" loading="lazy" />
          <p>Residenza Ponteranica · Bergamo</p>
          <div className="footer-col-line" />
          <p className="footer-meta">Un progetto Home In Evolution</p>
        </div>

        <div className="footer-col">
          <div className="footer-col-heading">Commercializzato da</div>
          <img className="footer-agency-img" src="/images/logo/logo_remax.png" alt="REMAX" loading="lazy" />
          <p>Massimo Brissoni</p>
          <p>Piazza Don Sergio Colombo, 4</p>
          <p>24124 Bergamo (BG)</p>
          <div className="footer-col-line" />
          <p>
            <a href="tel:+393332895941">+39 333 289 5941</a>
          </p>
          <p>
            <a href="mailto:mbrissoni@remax.it">mbrissoni@remax.it</a>
          </p>
          <p>
            <a
              href="https://wa.me/393332895941"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </p>
          <p className="footer-meta">Lun–Ven · 9:00–19:30</p>
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
            Sviluppato da Home In Evolution — homeinevolution.it
          </p>
          <p className="footer-meta">
            EDEL Costruzioni S.r.l. · P.IVA [TBD] · CCIAA Bergamo dal 1962
          </p>
        </div>
      </div>
    </footer>
  )
}

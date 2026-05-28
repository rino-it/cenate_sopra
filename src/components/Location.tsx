import { PROJECT_CONFIG } from '../lib/project-config'

const PLACES: Array<[string, string, string]> = [
  ['01', 'Bergamo Alta', '30 min'],
  ['02', 'Aeroporto Orio', '25 min'],
  ['03', 'Casello A4 Seriate', '20 min'],
  ["04", "Lago d'Iseo", '25 min'],
]

export default function Location() {
  return (
    <section className="location" id="location">
      <div className="location-inner">
        <div className="reveal">
          <div className="eyebrow">La Posizione</div>
          <h2 className="section-title">
            Venticinque minuti da Bergamo.
            <br />
            <span className="ital">Un mondo a parte</span>.
          </h2>
          <p className="location-address">{PROJECT_CONFIG.projectAddress}</p>
          <p className="location-text">
            Cenate Sopra è la collina di Bergamo che non c'è sulle cartoline. Vigne, boschi, silenzio. Eppure il casello A4 di Seriate è a venti minuti, l'aeroporto di Orio a venticinque, Bergamo Alta a mezz'ora. Bastano i posti che servono — niente di più, niente di meno.
          </p>
        </div>
        <ul className="loc-list reveal reveal-d1">
          {PLACES.map(([num, name, time]) => (
            <li key={num} className="loc-row">
              <span className="loc-num">{num}</span>
              <span className="loc-name serif">{name}</span>
              <span className="loc-time">{time}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

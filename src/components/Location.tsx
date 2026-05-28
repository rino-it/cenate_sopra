const PLACES: Array<[string, string, string]> = [
  ['01', 'Bergamo Alta', '5 min'],
  ['02', 'Aeroporto Orio', '10 min'],
  ['03', 'Casello A4 Dalmine', '15 min'],
  ['04', 'Fermata ATB', '200 m'],
]

export default function Location() {
  return (
    <section className="location" id="location">
      <div className="location-inner">
        <div className="reveal">
          <div className="eyebrow">La Posizione</div>
          <h2 className="section-title">
            Cinque minuti da Bergamo.
            <br />
            <span className="ital">Un mondo a parte</span>.
          </h2>
          <p className="location-address">Via 4 Novembre · Ponteranica (BG)</p>
          <p className="location-text">
            Ponteranica è collina, ma non è isolamento. Centro storico di Bergamo, ospedale Papa Giovanni XXIII, Aeroporto di Orio al Serio, casello A4: tutto nel raggio di 15 minuti. Trasporto pubblico ATB con fermata a 200 metri. Scuole, supermercato, farmacia in paese.
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

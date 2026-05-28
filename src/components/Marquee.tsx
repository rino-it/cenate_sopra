const ITEMS = [
  '12 unità',
  '110–280 m²',
  'classe A4',
  'Ponteranica',
  'Bergamo',
  'dal 1962',
]

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS]
  return (
    <div className="marquee">
      <div className="marquee-track">
        {doubled.map((it, i) => (
          <span key={i} className="marquee-item">
            {it}
          </span>
        ))}
      </div>
    </div>
  )
}

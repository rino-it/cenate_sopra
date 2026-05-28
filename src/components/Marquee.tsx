const ITEMS = [
  'Cenate Sopra',
  'Una villa',
  'Vista valle',
  'Wellness privato',
  'Classe A4',
  'Sismica Cl.4',
  'Edilvertova · dal 1969',
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

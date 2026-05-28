import { useEffect, useRef } from 'react'

const STATS: Array<{ value: number; suffix?: string; label: string }> = [
  { value: 55, suffix: '+', label: 'anni di mestiere' },
  { value: 120, suffix: '+', label: 'cantieri firmati' },
  { value: 1, label: 'villa, unica' },
]

function useCounter(targetRef: React.RefObject<HTMLElement | null>, target: number) {
  useEffect(() => {
    const el = targetRef.current
    if (!el) return

    let started = false
    let raf = 0

    const animate = (start: number) => (ts: number) => {
      const elapsed = ts - start
      const duration = 1400
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(target * eased)
      el.textContent = String(current)
      if (progress < 1) raf = requestAnimationFrame(animate(start))
    }

    const trigger = () => {
      if (started) return
      started = true
      const start = performance.now()
      raf = requestAnimationFrame(animate(start))
    }

    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              trigger()
              obs.disconnect()
            }
          })
        },
        { threshold: 0.4 }
      )
      obs.observe(el)
      return () => {
        obs.disconnect()
        if (raf) cancelAnimationFrame(raf)
      }
    } else {
      trigger()
      return () => {
        if (raf) cancelAnimationFrame(raf)
      }
    }
  }, [targetRef, target])
}

function StatItem({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLElement>(null)
  useCounter(ref, value)
  return (
    <li>
      <strong className="founder__stats-value">
        <span ref={ref} className="founder__stats-num">0</span>
        {suffix && <span className="founder__stats-suffix">{suffix}</span>}
      </strong>
      <span className="founder__stats-label">{label}</span>
    </li>
  )
}

export default function Founder() {
  return (
    <section className="founder founder--banner" id="founder" aria-label="Heritage e numeri">
      <div className="founder__inner founder__inner--banner reveal">
        <blockquote className="founder__quote">
          <p>
            "Una casa è ben fatta quando, vent'anni dopo, non chiede nulla. È lo standard di Edilvertova."
          </p>
        </blockquote>

        <ul className="founder__stats">
          {STATS.map((s) => (
            <StatItem key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </ul>
      </div>
    </section>
  )
}

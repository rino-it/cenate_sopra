import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

type TodState = {
  key: 'dawn' | 'day' | 'dusk' | 'night'
  time: string
  title: string
  body: string
  textColor: string
  img: string
  alt: string
}

const STATES: TodState[] = [
  {
    key: 'dawn',
    time: '06:42',
    title: 'A est, prima.',
    body: 'La luce arriva da est. Prima sui letti, poi sulle cucine. Bergamo dorme ancora.',
    textColor: '#1a1a1a',
    img: '/images/tod/dawn.jpg',
    alt: 'Vista da Ponteranica all\'alba — Bergamo Alta in lontananza',
  },
  {
    key: 'day',
    time: '12:00',
    title: 'Mezzogiorno.',
    body: 'Bergamo è là, al centro della finestra. Otto minuti d\'auto. Anni di distanza.',
    textColor: '#1a1a1a',
    img: '/images/tod/day.jpg',
    alt: 'Vista da Ponteranica a mezzogiorno — Bergamo Alta visibile',
  },
  {
    key: 'dusk',
    time: '19:10',
    title: 'Le sette e dieci.',
    body: 'Il sole scende dietro le Orobie. La cucina si scalda di rosso.',
    textColor: '#f5f5f0',
    img: '/images/tod/dusk.jpg',
    alt: 'Vista da Ponteranica al tramonto — sole dietro le Orobie',
  },
  {
    key: 'night',
    time: '22:00',
    title: 'Le ventidue.',
    body: 'Le luci di Bergamo Alta. Il silenzio che a Ponteranica ha sempre fatto parte dell\'arredamento.',
    textColor: '#f5f5f0',
    img: '/images/tod/night.jpg',
    alt: 'Vista notturna — luci di Bergamo Alta',
  },
]

export default function TimesOfDay() {
  const sectionRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', (ctx) => {
        const conditions = ctx.conditions as { isMobile?: boolean } | undefined
        const isMobile = conditions?.isMobile ?? window.matchMedia('(max-width: 768px)').matches

        const section = sectionRef.current
        const sticky = stickyRef.current
        if (!section || !sticky) return

        const bgs = sticky.querySelectorAll<HTMLDivElement>('.tod-bg')
        const states = sticky.querySelectorAll<HTMLDivElement>('.tod-state')
        const dots = sticky.querySelectorAll<HTMLSpanElement>('.tod-dot')
        if (bgs.length === 0 || states.length === 0) return

        const numStates = 4

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${isMobile ? 160 : 220}%`,
            pin: sticky,
            scrub: isMobile ? 0.25 : 0.5,
            anticipatePin: 1,
          },
        })

        // bg cross-fade + stato testo + dot indicator
        for (let i = 1; i < numStates; i++) {
          tl.to(bgs[i - 1], { opacity: 0, duration: 1 }, i)
            .to(bgs[i], { opacity: 1, duration: 1 }, '<')
            .to(states[i - 1], { opacity: 0, y: -20, duration: 0.6 }, '<')
            .to(states[i], { opacity: 1, y: 0, duration: 0.6 }, '<+0.2')
            .to(dots[i - 1], { width: 8, duration: 0.4 }, '<')
            .to(dots[i], { width: 32, duration: 0.4 }, '<')
        }
      }, { isMobile: window.matchMedia('(max-width: 768px)').matches })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        // mostra solo lo stato "day", statico, senza pin
      })

      return () => mm.revert()
    },
    { scope: sectionRef, dependencies: [] },
  )

  const visibleStates = STATES

  return (
    <section className="tod" id="times-of-day" ref={sectionRef}>
      <div className="tod-sticky" ref={stickyRef}>
        {visibleStates.map((s, i) => (
          <div
            key={`bg-${s.key}`}
            className="tod-bg"
            data-state={s.key}
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            {/* TODO: provide asset {s.img} (1920×1080, ≤180KB) */}
            <img src={s.img} alt={s.alt} loading="lazy" />
          </div>
        ))}

        <div className="tod-content">
          {visibleStates.map((s, i) => (
            <div
              key={`state-${s.key}`}
              className="tod-state"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <p className="eyebrow tod-time">{s.time}</p>
              <h2 className="tod-title serif">{s.title}</h2>
              <p className="tod-body">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="tod-indicator" aria-hidden="true">
          {visibleStates.map((s, i) => (
            <span
              key={`dot-${s.key}`}
              className="tod-dot"
              style={{ width: i === 0 ? 32 : 8 }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

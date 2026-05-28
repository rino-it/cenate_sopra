# SKILL: GSAP Scroll Animations — Recipes for Premium Landings

Quando il task richiede animazioni scroll moderne (pin, parallax, reveal, magnetic, text split), usa queste ricette pronte. Stack: GSAP 3.12 + ScrollTrigger + @gsap/react useGSAP + Lenis.

## QUANDO ATTIVARE
Trigger: "animazioni scroll", "parallax", "pin section", "Polestar effect", "Apple scroll", "magnetic button", "text reveal", "horizontal scroll", "scrub animation".

## SETUP BASE (una volta sola, in src/lib/gsap.ts)
```ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

export function initGsapWithLenis(lenis: Lenis) {
  gsap.registerPlugin(ScrollTrigger);
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove((time) => lenis.raf(time * 1000));
  };
}
```

## REGOLA D'ORO PER ANIMAZIONI PERCETTIBILI
Errori comuni di calibratura debole:
- yPercent 5 → invisibile (usa 30-100)
- opacity 0.9 → invisibile (usa 0)
- duration 0.3s → troppo veloce (usa 0.8-1.4s)
- ease "power1" → piatto (usa "expo.out", "power3.out", "cubic-bezier(.16,1,.3,1)")

## RICETTA 1 — Magnetic CTA (effetto Polestar)
```tsx
const buttonRef = useRef<HTMLButtonElement>(null);

const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const rect = buttonRef.current!.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  gsap.to(buttonRef.current, {
    x: x * 0.15, y: y * 0.15,
    duration: 0.6, ease: "power3.out",
  });
};

const handleLeave = () => {
  gsap.to(buttonRef.current, {
    x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)",
  });
};
```
Max translation: 15-20% del cursor offset (non oltre, sembra rotto).

## RICETTA 2 — Hero Pin + Parallax dual-speed
```tsx
useGSAP(() => {
  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
    tl.to(bgRef.current, { yPercent: -20 }, 0)        // bg parallax LENTO
      .to(innerRef.current, { yPercent: -50, opacity: 0 }, 0); // contenuto VELOCE + dissolve
  });
}, { scope: heroRef });
```

## RICETTA 3 — Text Reveal con SplitType (chars staggered)
```tsx
import SplitType from "split-type";

useGSAP(() => {
  const split = new SplitType(titleRef.current!, { types: "chars" });
  gsap.from(split.chars, {
    yPercent: 110,
    opacity: 0,
    stagger: 0.04,
    duration: 1.2,
    ease: "expo.out",
  });
  return () => split.revert();
}, { scope: titleRef });
```

## RICETTA 4 — Reveal staggered (sezione che entra)
```tsx
useGSAP(() => {
  gsap.from(".reveal-target", {
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    y: 40,
    opacity: 0,
    stagger: 0.15,
    duration: 1,
    ease: "power3.out",
  });
}, { scope: sectionRef });
```

## RICETTA 5 — Horizontal scroll section (Polestar gallery)
```tsx
useGSAP(() => {
  const sections = gsap.utils.toArray(".h-panel") as HTMLElement[];
  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: containerRef.current,
      pin: true,
      scrub: 1,
      end: () => "+=" + containerRef.current!.offsetWidth,
    },
  });
}, { scope: containerRef });
```

## RICETTA 6 — Slow zoom infinito (CSS, NON GSAP)
```css
@keyframes slowZoom {
  0%   { transform: scale(1.02); }
  100% { transform: scale(1.12); }
}
.hero-bg img {
  animation: slowZoom 24s ease-in-out infinite alternate;
  will-change: transform;
}
```
Usa CSS pure, GSAP è overkill per loop continui.

## REGOLA prefers-reduced-motion
SEMPRE wrappa GSAP in `gsap.matchMedia()` con doppio branch:
```tsx
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => { /* animazioni */ });
mm.add("(prefers-reduced-motion: reduce)", () => {
  gsap.set(elements, { opacity: 1, y: 0, x: 0 }); // stato finale immediato
});
return () => mm.revert();
```

## ANTI-PATTERN
1. ScrollTrigger senza `scrub` quando vuoi seguire lo scroll → animazione "scatta", non scorre
2. `pin: true` senza calcolare l'altezza totale → layout shift
3. Animare `top/left` invece di `transform` → scarsa performance
4. `will-change` permanente sull'elemento → memoria sprecata. Usa solo durante l'animazione, rimuovi in `onComplete`.
5. Multiple ScrollTrigger sullo stesso elemento senza ID → impossibile fare cleanup
6. Dimenticare `return () => mm.revert()` in useGSAP → memory leak

## VERIFICA
- DevTools Performance: nessun frame >16ms durante scroll
- Mobile a 60fps (prova su finestra Chrome a 375px)
- Reduced motion: con preferenza ON, sito statico ma usabile

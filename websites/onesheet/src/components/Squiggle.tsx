import { useEffect, useRef, useState } from 'react';

/**
 * The loop of flare that runs off the right edge of the stage.
 *
 * It draws itself once, when the section arrives, with `stroke-dashoffset` on a
 * `pathLength="1"` path — so the dash numbers are fractions and the rule in the
 * stylesheet does not have to know how long the path is. The reference uses
 * GSAP's DrawSVGPlugin for the same effect; a club plugin is not worth a
 * dependency for one line that a transition can carry.
 *
 * The wave is a sine, written out as four cubics with the standard 0.364 /
 * 0.777 control-point fractions, because a hand-drawn `c` chain wobbles and a
 * wobble is visible at a 22px stroke.
 *
 * It is `aria-hidden` and sits under everything: it is a flourish, and it must
 * never take a click from the card behind it.
 */
export function Squiggle() {
  const ref = useRef<SVGSVGElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      className="squiggle pointer-events-none absolute top-1/2 -z-10 hidden w-[20vw] max-w-[380px] -translate-y-1/2 md:block"
      /* Hung off the right edge by exactly the page margin, which is where the
         reference puts it: `right: calc(var(--site--margin) * -1)`. */
      style={{
        right: 'calc(-1 * clamp(20px, 2.36vw, 40px))',
        ...({ '--draw': drawn ? 0 : 1 } as React.CSSProperties),
      }}
      viewBox="0 0 373 234"
      fill="none"
      aria-hidden="true"
    >
      <path
        pathLength="1"
        d="M 14 117 C 35 109 59 61 72 39 C 84 61 108 109 129 117 C 150 125 174 173 186 195 C 199 173 223 125 244 117 C 265 109 289 61 302 39 C 314 61 338 109 359 117"
        stroke="var(--color-flare)"
        strokeWidth="22"
        strokeLinecap="round"
      />
    </svg>
  );
}

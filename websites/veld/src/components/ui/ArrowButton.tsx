import { useRef } from 'react';

import { gsap } from '@/motion/gsap';
import { EASE } from '@/motion/motion';

/**
 * The site's one button: a signal-yellow block whose label is split into
 * characters that roll over one at a time on hover.
 *
 * The characters are two stacked copies in a one-line mask — the visible one
 * leaving upwards, an identical one arriving from below — so the label never
 * goes blank mid-hover the way a single fading copy does. The split is static
 * markup, not a runtime SplitText call: a button label is a handful of
 * characters known at render time, and running a splitter on every button on
 * the page to produce that is work for nothing.
 */
const CHAR_STAGGER = 0.018;

export function ArrowButton({
  children,
  onClick,
  className = '',
}: {
  children: string;
  onClick?: () => void;
  className?: string;
}) {
  const root = useRef<HTMLButtonElement>(null);
  const chars = [...children];

  const roll = (to: number) => {
    const el = root.current;
    if (!el) return;
    gsap.to(el.querySelectorAll('[data-char]'), {
      yPercent: to,
      duration: 0.42,
      ease: EASE.ui,
      stagger: CHAR_STAGGER,
      overwrite: true,
    });
  };

  return (
    <button
      ref={root}
      type="button"
      onClick={onClick}
      onPointerEnter={() => roll(-100)}
      onPointerLeave={() => roll(0)}
      onFocus={() => roll(-100)}
      onBlur={() => roll(0)}
      className={`bg-signal text-ink text-body-sm inline-flex items-center gap-3 rounded-xs px-6 py-3 font-bold tracking-[0.1em] uppercase ${className}`}
    >
      <span className="relative inline-flex overflow-hidden" style={{ height: '1em' }}>
        {chars.map((c, i) => (
          <span key={i} data-char className="inline-block leading-none will-change-transform">
            <span className="block">{c === ' ' ? ' ' : c}</span>
            <span className="block">{c === ' ' ? ' ' : c}</span>
          </span>
        ))}
      </span>
      <span aria-hidden="true" className="leading-none">
        »
      </span>
    </button>
  );
}

import type { CSSProperties } from 'react';

import { SWOOSH } from '@/motion/motion';

type Variant = 'solid' | 'outline' | 'ghost';

const SKIN: Record<Variant, string> = {
  solid: 'bg-ink text-bone',
  outline: 'border border-ink/25 text-ink',
  ghost: 'bg-bone text-ink',
};

const FILL: Record<Variant, string> = {
  solid: 'bg-hivis',
  outline: 'bg-ink',
  ghost: 'bg-ink',
};

/**
 * The page's button, and its one piece of real interaction.
 *
 * At rest it is a plain pill. On hover, three fill layers sweep up from below
 * — each 120% wide, tilted 12 degrees about its top-right corner, staggered
 * 64ms apart — while the label somersaults up and out and an identical label
 * somersaults in from underneath on a spring.
 *
 * The mechanics live in `index.css` under `.swoosh`, because two parts of it
 * cannot be expressed as utility classes: the per-layer `transition-delay` is
 * computed from `--i`, and the stagger is **negative at rest and positive on
 * hover**, so leaving unwinds the layers in the opposite order to the one they
 * arrived in rather than replaying the entrance backwards.
 *
 * Three decisions worth keeping:
 *
 *   * **The tilt is the effect.** A straight fill rising to cover a button
 *     reads as a progress bar; twelve degrees reads as something swiped
 *     across. The 120% width exists so the low corner of the tilt never shows.
 *   * **The second label is `aria-hidden`.** It is a visual copy of a word that
 *     exists for 750ms; a screen reader should hear the label once.
 *   * **It is decoration on a control that works without it.** Below 992px,
 *     on a coarse pointer, and for reduced motion, this is a pill that changes
 *     colour — which is all a button has to be.
 */
export function Swoosh({
  children,
  href = '#contact',
  variant = 'solid',
  className = '',
}: {
  children: string;
  href?: string;
  variant?: Variant;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`swoosh group relative isolate inline-flex overflow-hidden rounded-full ${SKIN[variant]} ${className}`}
    >
      <span aria-hidden="true" className="swoosh__bg absolute inset-0 overflow-hidden rounded-full">
        {Array.from({ length: SWOOSH.layers }).map((_, i) => (
          <span
            key={i}
            className={`swoosh__layer absolute inset-0 block ${FILL[variant]} ${
              i === 1 ? 'opacity-70' : i === 2 ? 'opacity-40' : ''
            }`}
            style={{ '--i': i } as CSSProperties}
          />
        ))}
      </span>

      {/* Both labels share one grid cell, so neither reserves space. */}
      <span className="relative z-10 grid px-7 py-4 text-[15px] font-semibold leading-none">
        <span className="swoosh__label group-hover:text-bone col-start-1 row-start-1 block">
          {children}
        </span>
        <span
          aria-hidden="true"
          className="swoosh__label-in group-hover:text-bone col-start-1 row-start-1 block"
        >
          {children}
        </span>
      </span>
    </a>
  );
}

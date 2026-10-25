import { useId, useState } from 'react';

import { Icon } from '@/components/Icon';
import { cx } from '@/lib/cx';

/**
 * The upgrade promo.
 *
 * The reference fills it with a halftone sphere -- a grid of dots whose size
 * falls off from a centre. That is drawn here rather than shipped as a picture:
 * it is a pattern, so it stays sharp at any card size and costs about forty
 * lines instead of a PNG.
 *
 * The ids come from `useId`. An SVG gradient or mask id is document-global, so
 * two cards declaring the same one would collapse into the first.
 */
export function PremiumCard() {
  const [open, setOpen] = useState(false);
  const fade = 'fade-' + useId().replace(/:/g, '');

  return (
    <div
      data-card="premium"
      className="relative flex min-h-0 min-w-0 flex-col justify-between overflow-hidden rounded-[var(--radius-card)] bg-gradient-to-br from-[#e9ebef] to-[#dfe3ea] p-6"
    >
      <Halftone fadeId={fade} />

      <div className="relative">
        <h2 className="text-ink m-0 max-w-[230px] text-[20px] leading-[1.2] font-semibold tracking-[-0.015em]">
          Unlock Premium Features
        </h2>
        <p className="text-body/80 m-0 mt-2.5 max-w-[235px] text-[13px] leading-[1.5]">
          {open
            ? 'Priority placement on every proposal, zero platform fee on your first ten invoices, and contract review inside 24 hours.'
            : 'Get access to exclusive benefits and expand your freelancing opportunities'}
        </p>
      </div>

      <button
        type="button"
        data-upgrade
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group bg-surface text-ink relative mt-5 flex h-[52px] w-full items-center justify-between rounded-full pr-3 pl-5 text-[14px] font-semibold transition-shadow hover:shadow-[0_8px_20px_-10px_rgb(18_22_29/0.45)]"
      >
        {open ? 'Hide the details' : 'Upgrade now'}
        <span
          className={cx(
            'bg-sunken text-ink grid h-9 w-9 place-items-center rounded-full transition-transform duration-200',
            open ? 'rotate-90' : 'group-hover:translate-x-0.5',
          )}
        >
          <Icon name="chevron-right" size={16} />
        </span>
      </button>
    </div>
  );
}

/** A 16x16 grid of dots, each sized by its distance from the sphere's centre. */
function Halftone({ fadeId }: { fadeId: string }) {
  const N = 16;
  const span = 160;
  const step = span / (N - 1);
  const dots = [];
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      const x = col * step;
      const y = row * step;
      const dx = (x - span / 2) / (span / 2);
      const dy = (y - span / 2) / (span / 2);
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d > 1) continue;
      dots.push(
        <circle key={row + '-' + col} cx={x} cy={y} r={Math.max(0.6, (1 - d * 0.92) * 3.1)} />,
      );
    }
  }

  return (
    <svg
      aria-hidden="true"
      viewBox={'-6 -6 ' + (span + 12) + ' ' + (span + 12)}
      className="pointer-events-none absolute -top-8 -right-14 h-[300px] w-[300px]"
    >
      <defs>
        <radialGradient id={fadeId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="58%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#b9c1d0" stopOpacity="0.6" />
        </radialGradient>
      </defs>
      <g fill={'url(#' + fadeId + ')'}>{dots}</g>
    </svg>
  );
}

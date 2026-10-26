/**
 * Every icon, on one 24px grid at one stroke width. Inline SVG, never an emoji
 * (rule 8): emoji differ across Windows, Android and iOS, and the reference
 * leans on a target, a ticket and a star — three of the worst offenders.
 */
export type IconName =
  | 'search'
  | 'bell'
  | 'copy'
  | 'eye'
  | 'eye-off'
  | 'dots'
  | 'arrow-up-right'
  | 'arrow-down-left'
  | 'chevron-down'
  | 'chevron-right'
  | 'check'
  | 'close'
  | 'star'
  | 'ticket'
  | 'sparkle'
  | 'target'
  | 'wallet'
  | 'card'
  | 'receipt'
  | 'bag'
  | 'pie'
  | 'goal'
  | 'trend-up'
  | 'trend-down'
  | 'snowflake'
  | 'lock'
  | 'globe'
  | 'atm'
  | 'plus'
  | 'filter'
  | 'sort';

const PATHS: Record<IconName, string> = {
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14M16.2 16.2 21 21',
  bell: 'M18 9a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6M13.7 20a2 2 0 0 1-3.4 0',
  copy: 'M9 9.5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2zM15.5 7.5v-1a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h1',
  eye: 'M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12M12 14.8a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6',
  'eye-off':
    'M4 4.5 20 20M9.6 9.8a2.8 2.8 0 0 0 3.9 3.9M6.9 7.1C4.3 8.7 2.5 12 2.5 12S6 18.5 12 18.5c1.6 0 3-.4 4.2-1M18.6 15.3c1.9-1.6 2.9-3.3 2.9-3.3S18 5.5 12 5.5c-.6 0-1.2.06-1.7.17',
  dots: 'M6 12h.01M12 12h.01M18 12h.01',
  'arrow-up-right': 'M7.5 16.5 16.5 7.5M9.5 7.5h7v7',
  'arrow-down-left': 'M16.5 7.5 7.5 16.5M14.5 16.5h-7v-7',
  'chevron-down': 'm6 9.5 6 5.5 6-5.5',
  'chevron-right': 'm9.5 6 5.5 6-5.5 6',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  close: 'm6.5 6.5 11 11M17.5 6.5l-11 11',
  star: 'm12 4 2.5 5.3 5.5.8-4 4 1 5.9L12 17.2 7 20l1-5.9-4-4 5.5-.8z',
  ticket:
    'M3.5 8.5a1 1 0 0 1 1-1h15a1 1 0 0 1 1 1v2a2 2 0 0 0 0 4v2a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-2a2 2 0 0 0 0-4zM14 8.5v1.5M14 14v1.5',
  sparkle:
    'M12 3.5c0 4.7 1.8 6.5 6.5 6.5-4.7 0-6.5 1.8-6.5 6.5 0-4.7-1.8-6.5-6.5-6.5 4.7 0 6.5-1.8 6.5-6.5M18.5 16.5c0 2.2.8 3 3 3-2.2 0-3 .8-3 3 0-2.2-.8-3-3-3 2.2 0 3-.8 3-3',
  target:
    'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8M12 11.4a.6.6 0 1 0 0 1.2.6.6 0 0 0 0-1.2',
  wallet:
    'M3.5 7.5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2M3.5 7.5v10a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM16.5 13.5h.01',
  card: 'M3.5 7a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2zM3.5 10h17M7 15h3',
  receipt: 'M6 3.5h12v17l-2.4-1.6-2.4 1.6-2.4-1.6L8.4 20.5 6 18.9zM9.5 8.5h5M9.5 12.5h5',
  bag: 'M5.5 7.5h13l-1.2 12a1.6 1.6 0 0 1-1.6 1.4H8.3a1.6 1.6 0 0 1-1.6-1.4zM8.5 10V7a3.5 3.5 0 0 1 7 0v3',
  pie: 'M12 3.5a8.5 8.5 0 1 0 8.5 8.5H12z',
  goal: 'M6 20.5V4.5l12 4-12 4M6 4.5h.01',
  'trend-up': 'M4 16.5 10 10l3.5 3.5L20 7M15 7h5v5',
  'trend-down': 'M4 7.5 10 14l3.5-3.5L20 17M15 17h5v-5',
  snowflake:
    'M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9M12 6.6 9.4 4.6M12 6.6l2.6-2M12 17.4l-2.6 2M12 17.4l2.6 2M6.8 9.6 3.6 9M6.8 14.4l-3.2.6M17.2 9.6l3.2-.6M17.2 14.4l3.2.6',
  lock: 'M6.5 10.5h11a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1M8.5 10.5V7.8a3.5 3.5 0 0 1 7 0v2.7',
  globe:
    'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M3.8 9.5h16.4M3.8 14.5h16.4M12 3.5c-2.2 2.3-3.3 5.1-3.3 8.5s1.1 6.2 3.3 8.5c2.2-2.3 3.3-5.1 3.3-8.5S14.2 5.8 12 3.5',
  atm: 'M4.5 5.5h15v10h-15zM8 19h8M12 15.5V19M8.5 9.5h7M8.5 12h4',
  plus: 'M12 5.5v13M5.5 12h13',
  filter: 'M4 6.5h16M7 12h10M10 17.5h4',
  sort: 'M7 4.5v15M7 4.5 4 8M7 4.5 10 8M17 19.5v-15M17 19.5l-3-3.5M17 19.5l3-3.5',
};

export function Icon({
  name,
  size = 17,
  className,
  strokeWidth = 1.6,
}: {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}

/* ------------------------------------------------------------ brand marks */

/**
 * The counterparty marks.
 *
 * The reference puts Meta, Apple and Google on its transaction rows. A real
 * company's mark sitting over invented amounts in an invented account is the
 * one thing this series must not produce (rule 8), so these are six invented
 * companies with their own drawn marks — each a distinct idea rather than a
 * recoloured circle, so a row is identifiable at 32px.
 */
export type MarkName = 'northform' | 'kestra' | 'payline' | 'avistra' | 'lumio' | 'tenter';

const MARKS: Record<MarkName, { bg: string; fg: string; d: string; fill?: boolean }> = {
  /* A folded N, drawn as two uprights and the diagonal between them. */
  northform: { bg: '#1d3f5e', fg: '#cfe4f5', d: 'M8 17V7l8 10V7' },
  /* A keystone: the arch block, which is what "Kestra" is named for. */
  kestra: { bg: '#2e2a33', fg: '#efe7f5', d: 'M9 7h6l2 10H7z' },
  /* Two payment rails meeting. */
  payline: { bg: '#15502f', fg: '#d4f3df', d: 'M6 9h12M6 15h12M15 6l3 3-3 3' },
  /* A recurring loop — a subscription that comes round again. */
  avistra: { bg: '#5a3c12', fg: '#ffe9c2', d: 'M17 9a5.5 5.5 0 1 0 1 4M17 5v4h-4' },
  /* A lamp: light, which is what the name says. */
  lumio: { bg: '#4a2340', fg: '#f8dcf0', d: 'M12 5a5 5 0 0 1 3 9v2H9v-2a5 5 0 0 1 3-9M10 19h4' },
  /* Three shelves — a grocer. */
  tenter: { bg: '#3d4a1c', fg: '#e8f5c6', d: 'M6 7h12M6 12h12M6 17h7' },
};

export function Mark({ name, size = 34 }: { name: MarkName; size?: number }) {
  const m = MARKS[name];
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, background: m.bg }}
      className="grid shrink-0 place-items-center rounded-full"
    >
      <svg
        width={size * 0.56}
        height={size * 0.56}
        viewBox="0 0 24 24"
        fill="none"
        stroke={m.fg}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={m.d} />
      </svg>
    </span>
  );
}

/**
 * The Pennora wordmark.
 *
 * The reference's own panel carries no logo at all — the greeting is the
 * header — so the mark is kept to the size the design has room for: a leaf
 * cut from two arcs, which is the one shape a green money app always has, with
 * the name in the page's own type. Invented, like the copy (rule 8).
 */
export function Wordmark({ size = 19 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2">
      <svg width={size * 1.15} height={size * 1.15} viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="11" fill="var(--color-fill)" />
        <path d="M7 16.5c0-5 3.5-9 10-9.5-.5 6.5-4.5 10-9.5 10z" fill="var(--color-accent)" />
        <path
          d="M7.5 16.5c2.8-2.6 5.4-4.4 9-6"
          stroke="var(--color-fill)"
          strokeWidth="1.3"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-ink font-semibold tracking-[-0.02em]" style={{ fontSize: size }}>
        Pennora
      </span>
    </span>
  );
}

/**
 * Every icon, on one 24px grid at one stroke width. Inline SVG, never an emoji
 * (rule 8) — this design's premium card is a diamond and its rail is five
 * glyphs with no labels, so the whole nav depends on them drawing correctly on
 * every platform.
 */
export type IconName =
  | 'home'
  | 'clock'
  | 'users'
  | 'wallet'
  | 'target'
  | 'help'
  | 'logout'
  | 'bell'
  | 'search'
  | 'dots-v'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-down'
  | 'check'
  | 'close'
  | 'plus'
  | 'arrow-up'
  | 'arrow-down'
  | 'diamond'
  | 'card'
  | 'trend-up'
  | 'trend-down'
  | 'filter'
  | 'repeat'
  | 'calendar'
  | 'pie'
  | 'send'
  | 'download';

const PATHS: Record<IconName, string> = {
  home: 'M4 10.6 12 4l8 6.6V19a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19zM9.5 20.5v-6h5v6',
  clock: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M12 7.5V12l3 2',
  users:
    'M9 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3.5 20c0-3.3 2.5-5.5 5.5-5.5s5.5 2.2 5.5 5.5M16 5.2a3.5 3.5 0 0 1 0 6.6M17.5 14.9c1.9.7 3 2.5 3 5.1',
  wallet:
    'M3.5 7.5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2M3.5 7.5v10a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM16.5 13.5h.01',
  target:
    'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8M12 11.4a.6.6 0 1 0 0 1.2.6.6 0 0 0 0-1.2',
  help: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M9.6 9.6a2.5 2.5 0 1 1 2.9 2.9v1.3M12.5 17.3h.01',
  logout: 'M14 4.5h4a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-1.5 1.5h-4M11 8.5 7 12l4 3.5M7 12h9',
  bell: 'M18 9a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6M13.7 20a2 2 0 0 1-3.4 0',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14M16.2 16.2 21 21',
  'dots-v': 'M12 6h.01M12 12h.01M12 18h.01',
  'chevron-left': 'm14.5 6-5.5 6 5.5 6',
  'chevron-right': 'm9.5 6 5.5 6-5.5 6',
  'chevron-down': 'm6 9.5 6 5.5 6-5.5',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  close: 'm6.5 6.5 11 11M17.5 6.5l-11 11',
  plus: 'M12 5.5v13M5.5 12h13',
  'arrow-up': 'M12 19.5v-15M6 10.5 12 4.5l6 6',
  'arrow-down': 'M12 4.5v15M6 13.5l6 6 6-6',
  diamond:
    'M5 9.5 8 5h8l3 4.5-7 10.5zM5 9.5h14M9.5 9.5 12 20M14.5 9.5 12 20M8 5l1.5 4.5M16 5l-1.5 4.5',
  card: 'M3.5 7a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2zM3.5 10h17M7 15h3',
  'trend-up': 'M4 16.5 10 10l3.5 3.5L20 7M15 7h5v5',
  'trend-down': 'M4 7.5 10 14l3.5-3.5L20 17M15 17h5v-5',
  filter: 'M4 6.5h16M7 12h10M10 17.5h4',
  repeat:
    'M4.5 11a5.5 5.5 0 0 1 5.5-5.5h9M15.5 2.5 19.5 5.5 15.5 8.5M19.5 13a5.5 5.5 0 0 1-5.5 5.5H5M8.5 15.5 4.5 18.5 8.5 21.5',
  calendar:
    'M4.5 7.5a1.5 1.5 0 0 1 1.5-1.5h12a1.5 1.5 0 0 1 1.5 1.5v11a1.5 1.5 0 0 1-1.5 1.5H6a1.5 1.5 0 0 1-1.5-1.5zM4.5 10.5h15M8.5 3.5v4M15.5 3.5v4',
  pie: 'M12 3.5a8.5 8.5 0 1 0 8.5 8.5H12z',
  send: 'M20.5 3.5 10 14M20.5 3.5 14 20.5l-4-6.5-6.5-4z',
  download: 'M12 4v11M7.5 10.5 12 15l4.5-4.5M4.5 19.5h15',
};

export function Icon({
  name,
  size = 18,
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
 * The counterparty marks: six invented companies, each a distinct idea rather
 * than a recoloured disc, so a ledger row is identifiable at 36px. The
 * reference's first row carries a real computer maker's mark over a made-up
 * $653, which is exactly what rule 8 rules out.
 */
export type MarkName = 'halcyon' | 'verity' | 'tidepoint' | 'orchard' | 'corvid' | 'belmont';

const MARKS: Record<MarkName, { bg: string; fg: string; d: string }> = {
  /* A bracketed caret — a code editor's prompt. */
  halcyon: { bg: '#232a3a', fg: '#c9d7f2', d: 'M9 8 5 12l4 4M15 8l4 4-4 4' },
  /* Two arrows passing: a transfer between people. */
  verity: { bg: '#2f3f33', fg: '#d6edda', d: 'M5 9h11l-3-3M19 15H8l3 3' },
  /* A wave under a horizon: tidal power. */
  tidepoint: {
    bg: '#123a4a',
    fg: '#c7e8f3',
    d: 'M4 14c2.5-3 5.5-3 8 0s5.5 3 8 0M4 18.5h16M12 4v5',
  },
  /* A leaf on a stem: the grocer. */
  orchard: { bg: '#2d4420', fg: '#dcf0c6', d: 'M7 18c0-6 4-9 10-9 0 6-4 9-10 9M7 18l5-5' },
  /* A bird's wing, cut to three strokes: the rail company. */
  corvid: { bg: '#3b2436', fg: '#f3d9ec', d: 'M4 16c5 0 9-3 11-9 1.5 4 3 6 5 6-3.5 3.5-8 5-16 3' },
  /* An aperture: the studio. */
  belmont: {
    bg: '#4a3718',
    fg: '#fbe8c4',
    d: 'M12 4.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15M12 4.5 8 12h8zM8 12l4 7.5',
  },
};

export function Mark({ name, size = 36 }: { name: MarkName; size?: number }) {
  const m = MARKS[name];
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, background: m.bg }}
      className="grid shrink-0 place-items-center rounded-full"
    >
      <svg
        width={size * 0.58}
        height={size * 0.58}
        viewBox="0 0 24 24"
        fill="none"
        stroke={m.fg}
        strokeWidth={1.9}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={m.d} />
      </svg>
    </span>
  );
}

/**
 * The Orvela mark and name.
 *
 * The reference sets a dark rounded tile with a glyph in it, a small grey
 * "Finance Dashboard" over a bold wordmark. Same arrangement, invented mark: a
 * rising stroke inside a ring, which is the one idea a money dashboard's logo
 * always is.
 */
export function Wordmark() {
  return (
    <div className="flex items-center gap-3">
      <span className="bg-rail grid h-11 w-11 shrink-0 place-items-center rounded-2xl">
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <circle
            cx="12"
            cy="12"
            r="9.5"
            fill="none"
            stroke="var(--color-rail-fg)"
            strokeWidth="1.8"
          />
          <path
            d="M8 15.5 11 10l2.5 3.5L17 7"
            fill="none"
            stroke="var(--color-accent-soft)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="min-w-0">
        <span className="text-muted block text-[12.5px] leading-tight">Finance Dashboard</span>
        <span className="text-ink block text-[18px] leading-tight font-bold tracking-[-0.02em]">
          Orvela
        </span>
      </span>
    </div>
  );
}

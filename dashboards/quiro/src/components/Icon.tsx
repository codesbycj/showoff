/**
 * Every icon, on one 24px grid at one stroke width. Inline SVG, never an emoji
 * (rule 8).
 */
export type IconName =
  | 'grid'
  | 'chart'
  | 'bag'
  | 'list'
  | 'card'
  | 'mail'
  | 'percent'
  | 'settings'
  | 'logout'
  | 'search'
  | 'bell'
  | 'plus'
  | 'chevron-down'
  | 'chevron-right'
  | 'arrow-up-right'
  | 'arrow-up'
  | 'arrow-down'
  | 'check'
  | 'close'
  | 'calendar'
  | 'trend-up'
  | 'trend-down'
  | 'download'
  | 'filter'
  | 'wallet'
  | 'clock';

const PATHS: Record<IconName, string> = {
  grid: 'M4.5 5.5h6v6h-6zM13.5 5.5h6v6h-6zM4.5 12.5h6v6h-6zM13.5 12.5h6v6h-6z',
  chart: 'M4.5 19.5h15M7.5 16V9M12 16V5.5M16.5 16v-5',
  bag: 'M5.5 7.5h13l-1.2 12a1.6 1.6 0 0 1-1.6 1.4H8.3a1.6 1.6 0 0 1-1.6-1.4zM8.5 10V7a3.5 3.5 0 0 1 7 0v3',
  list: 'M4.5 6.5h15M4.5 12h15M4.5 17.5h9',
  card: 'M3.5 7a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2zM3.5 10h17M7 15h3',
  mail: 'M3.5 7a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2zM3.9 6.4 12 12.5l8.1-6.1',
  percent:
    'M7 17 17 7M8 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M16 18.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5',
  settings:
    'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M19.5 12a7.5 7.5 0 0 0-.1-1.2l2-1.5-2-3.4-2.3 1a7.5 7.5 0 0 0-2.1-1.2l-.3-2.4h-4l-.3 2.4a7.5 7.5 0 0 0-2.1 1.2l-2.3-1-2 3.4 2 1.5a7.5 7.5 0 0 0 0 2.4l-2 1.5 2 3.4 2.3-1a7.5 7.5 0 0 0 2.1 1.2l.3 2.4h4l.3-2.4a7.5 7.5 0 0 0 2.1-1.2l2.3 1 2-3.4-2-1.5c.07-.4.1-.8.1-1.2z',
  logout: 'M14 4.5h4a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-1.5 1.5h-4M11 8.5 7 12l4 3.5M7 12h9',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14M16.2 16.2 21 21',
  bell: 'M18 9a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6M13.7 20a2 2 0 0 1-3.4 0',
  plus: 'M12 5.5v13M5.5 12h13',
  'chevron-down': 'm6 9.5 6 5.5 6-5.5',
  'chevron-right': 'm9.5 6 5.5 6-5.5 6',
  'arrow-up-right': 'M7.5 16.5 16.5 7.5M9.5 7.5h7v7',
  'arrow-up': 'M12 19.5v-15M6 10.5 12 4.5l6 6',
  'arrow-down': 'M12 4.5v15M6 13.5l6 6 6-6',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  close: 'm6.5 6.5 11 11M17.5 6.5l-11 11',
  calendar:
    'M4.5 7.5a1.5 1.5 0 0 1 1.5-1.5h12a1.5 1.5 0 0 1 1.5 1.5v11a1.5 1.5 0 0 1-1.5 1.5H6a1.5 1.5 0 0 1-1.5-1.5zM4.5 10.5h15M8.5 3.5v4M15.5 3.5v4',
  'trend-up': 'M4 16.5 10 10l3.5 3.5L20 7M15 7h5v5',
  'trend-down': 'M4 7.5 10 14l3.5-3.5L20 17M15 17h5v-5',
  download: 'M12 4v11M7.5 10.5 12 15l4.5-4.5M4.5 19.5h15',
  filter: 'M4 6.5h16M7 12h10M10 17.5h4',
  wallet:
    'M3.5 7.5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2M3.5 7.5v10a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM16.5 13.5h.01',
  clock: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M12 7.5V12l3 2',
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
 * The counterparty marks.
 *
 * The reference's payment history carries a design community, a payments
 * network and a retailer — three real marks over invented percentages in an
 * invented account (rule 8). These are six invented companies, each a distinct
 * idea rather than a recoloured disc, so a row is identifiable at 34px.
 */
export type MarkName = 'driblo' | 'payline' | 'amberly' | 'northform' | 'kestra' | 'lumio';

const MARKS: Record<MarkName, { bg: string; fg: string; d: string }> = {
  /* Three dots on an arc: a palette. */
  driblo: {
    bg: '#3b2436',
    fg: '#f6d9ec',
    d: 'M5 16a9 9 0 0 1 14-7M8 17h.01M12 18.5h.01M16 17h.01',
  },
  /* Two rails meeting. */
  payline: { bg: '#123a4a', fg: '#cbe9f4', d: 'M6 9h12M6 15h12M15 6l3 3-3 3' },
  /* A bag seen head-on. */
  amberly: { bg: '#5a3c12', fg: '#ffe9c2', d: 'M6 8h12l-1 12H7zM9.5 10V6.5a2.5 2.5 0 0 1 5 0V10' },
  /* A folded N. */
  northform: { bg: '#1d3f5e', fg: '#cfe4f5', d: 'M8 17V7l8 10V7' },
  /* A keystone. */
  kestra: { bg: '#2e2a33', fg: '#efe7f5', d: 'M9 7h6l2 10H7z' },
  /* A lamp. */
  lumio: { bg: '#2d4420', fg: '#dcf0c6', d: 'M12 5a5 5 0 0 1 3 9v2H9v-2a5 5 0 0 1 3-9M10 19h4' },
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
 * The Quilbo mark and wordmark.
 *
 * The reference sets a green disc with a cut in it beside a bold wordmark.
 * Same arrangement, invented mark: a ring opened at one side with a dot in the
 * gap, which is the idea of money moving out and coming back.
 */
export function Wordmark() {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
        <path
          d="M19 12a7 7 0 1 1-4-6.3"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="18" cy="6.5" r="2.6" fill="var(--color-accent)" />
      </svg>
      <span className="text-ink text-[18px] leading-none font-bold tracking-[-0.02em]">Quilbo</span>
    </div>
  );
}

/**
 * Every icon, on one 24px grid at one stroke width. Inline SVG, never an
 * emoji (rule 8) — the reference's own logo is a smiley, which is exactly the
 * glyph that renders three ways on three machines.
 */
export type IconName =
  | 'grid'
  | 'doc'
  | 'deals'
  | 'community'
  | 'insights'
  | 'book'
  | 'mail'
  | 'settings'
  | 'logout'
  | 'search'
  | 'filter'
  | 'download'
  | 'plus'
  | 'refresh'
  | 'chevron-down'
  | 'chevron-right'
  | 'arrow-up'
  | 'arrow-down'
  | 'arrow-right'
  | 'close'
  | 'check'
  | 'dots'
  | 'alert'
  | 'lock'
  | 'building'
  | 'chart'
  | 'calendar'
  | 'users'
  | 'trend-up'
  | 'trend-down'
  | 'sort'
  | 'help';

const PATHS: Record<IconName, string> = {
  grid: 'M4.5 5.5h6v6h-6zM13.5 5.5h6v6h-6zM4.5 12.5h6v6h-6zM13.5 12.5h6v6h-6z',
  doc: 'M6 3.5h7l5 5v12H6zM13 3.5v5h5M9 13h6M9 16.5h6',
  deals: 'M3.5 8.5h17v11h-17zM9 8.5V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v2.5M3.5 13.5h17',
  community:
    'M9 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3.5 20c0-3.3 2.5-5.5 5.5-5.5s5.5 2.2 5.5 5.5M16 5.2a3.5 3.5 0 0 1 0 6.6M17.5 14.9c1.9.7 3 2.5 3 5.1',
  insights: 'M4.5 19.5h15M7 16.5v-5M11.5 16.5v-9M16 16.5v-6M20 16.5V8',
  book: 'M5 4.5h8a3 3 0 0 1 3 3v12a3 3 0 0 0-3-3H5zM19 4.5v12',
  mail: 'M3.5 6.5h17v11h-17zM3.5 7l8.5 6 8.5-6',
  settings:
    'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M19.5 12a7.5 7.5 0 0 0-.1-1.2l2-1.5-2-3.4-2.3 1a7.5 7.5 0 0 0-2.1-1.2l-.3-2.4h-4l-.3 2.4a7.5 7.5 0 0 0-2.1 1.2l-2.3-1-2 3.4 2 1.5a7.5 7.5 0 0 0 0 2.4l-2 1.5 2 3.4 2.3-1a7.5 7.5 0 0 0 2.1 1.2l.3 2.4h4l.3-2.4a7.5 7.5 0 0 0 2.1-1.2l2.3 1 2-3.4-2-1.5c.07-.4.1-.8.1-1.2z',
  logout: 'M14 7.5V4.5h-10v15h10v-3M9.5 12h11M17 8.5 20.5 12 17 15.5',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14M16.2 16.2 21 21',
  filter: 'M3.5 5.5h17l-6.5 7.5v6l-4 2v-8z',
  download: 'M12 4.5V16M7.5 11.5 12 16l4.5-4.5M4.5 19.5h15',
  plus: 'M12 5v14M5 12h14',
  refresh: 'M20 12a8 8 0 1 1-2.6-5.9M20 4v4.5h-4.5',
  'chevron-down': 'm6 9.5 6 5.5 6-5.5',
  'chevron-right': 'm9.5 6 5.5 6-5.5 6',
  'arrow-up': 'M12 19.5v-15M6.5 10 12 4.5 17.5 10',
  'arrow-down': 'M12 4.5v15M6.5 14 12 19.5 17.5 14',
  'arrow-right': 'M4.5 12h14M13 6.5 18.5 12 13 17.5',
  close: 'm6.5 6.5 11 11M17.5 6.5l-11 11',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  dots: 'M6 12h.01M12 12h.01M18 12h.01',
  alert: 'M12 3.8 2.8 19.5h18.4zM12 9.5v5M12 17.2h.01',
  lock: 'M6.5 10.5h11v9h-11zM8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5',
  building: 'M4.5 20.5v-16h10v16M14.5 10.5h5v10M7.5 8h4M7.5 11.5h4M7.5 15h4',
  chart: 'M3.5 12.5h4l3-7 4 14 3-7h3',
  calendar: 'M4.5 6.5h15v13h-15zM4.5 10.5h15M8.5 4v4M15.5 4v4',
  users:
    'M9 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3.5 20c0-3.3 2.5-5.5 5.5-5.5s5.5 2.2 5.5 5.5M16 5.2a3.5 3.5 0 0 1 0 6.6M17.5 14.9c1.9.7 3 2.5 3 5.1',
  'trend-up': 'M4 16.5 10 10l3.5 3.5L20 7M15 7h5v5',
  'trend-down': 'M4 7.5 10 14l3.5-3.5L20 17M15 17h5v-5',
  sort: 'm8 9.5 3-3 3 3M8 14.5l3 3 3-3',
  help: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M9.6 9.6a2.5 2.5 0 1 1 2.9 2.9v1.3M12.5 17.3h.01',
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

/**
 * The Vantyr mark and wordmark.
 *
 * The reference sets a round face beside a lowercase wordmark. Same
 * arrangement, invented mark: a disc with two steps cut out of it, which is
 * the shape this portfolio's own value chart draws — a private mark moves at
 * events, not continuously.
 */
export function Wordmark() {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
        <circle cx="12" cy="12" r="11" fill="var(--color-accent)" />
        <path
          d="M5.5 16.5h4v-4h4v-4h5"
          fill="none"
          stroke="#fff"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-ink text-[19px] leading-none font-extrabold tracking-[-0.03em]">
        vantyr
      </span>
    </div>
  );
}

/** A company disc: the initial on a tinted ground. A portfolio company's own
    logo is its mark, and every figure beside it here is invented (rule 8). */
export function CompanyDisc({ name, size = 34 }: { name: string; size?: number }) {
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, fontSize: Math.round(size * 0.4) }}
      className="bg-accent-faint text-accent grid shrink-0 place-items-center rounded-[10px] font-extrabold"
    >
      {name.slice(0, 1)}
    </span>
  );
}

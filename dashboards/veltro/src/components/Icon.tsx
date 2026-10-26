/**
 * Every icon, on one 24px grid at one stroke width. Inline SVG, never an emoji
 * (rule 8) — this design puts a small info glyph beside nearly every heading,
 * so it has to draw cleanly at 13px.
 */
export type IconName =
  | 'grid'
  | 'box'
  | 'bag'
  | 'users'
  | 'chat'
  | 'mail'
  | 'chart'
  | 'plug'
  | 'gauge'
  | 'account'
  | 'members'
  | 'settings'
  | 'feedback'
  | 'logout'
  | 'search'
  | 'bell'
  | 'plus'
  | 'info'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'arrow-right'
  | 'check'
  | 'close'
  | 'export'
  | 'filter'
  | 'trend-up'
  | 'trend-down'
  | 'speaker';

const PATHS: Record<IconName, string> = {
  grid: 'M4.5 5.5h6v6h-6zM13.5 5.5h6v6h-6zM4.5 12.5h6v6h-6zM13.5 12.5h6v6h-6z',
  box: 'M12 3.4 20 7.7v8.6L12 20.6 4 16.3V7.7zM4 7.7l8 4.3 8-4.3M12 12v8.6',
  bag: 'M5.5 7.5h13l-1.2 12a1.6 1.6 0 0 1-1.6 1.4H8.3a1.6 1.6 0 0 1-1.6-1.4zM8.5 10V7a3.5 3.5 0 0 1 7 0v3',
  users:
    'M9 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3.5 20c0-3.3 2.5-5.5 5.5-5.5s5.5 2.2 5.5 5.5M16 5.2a3.5 3.5 0 0 1 0 6.6M17.5 14.9c1.9.7 3 2.5 3 5.1',
  chat: 'M4 6.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-4.5 3.5V16.5H6a2 2 0 0 1-2-2z',
  mail: 'M3.5 7a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2zM3.9 6.4 12 12.5l8.1-6.1',
  chart: 'M4.5 19.5h15M7.5 16V9M12 16V5.5M16.5 16v-5',
  plug: 'M9 3.5v5M15 3.5v5M6.5 8.5h11v3a5.5 5.5 0 0 1-5.5 5.5 5.5 5.5 0 0 1-5.5-5.5zM12 17v3.5',
  gauge: 'M4.5 17a7.5 7.5 0 1 1 15 0M12 17l3.5-5',
  account: 'M12 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6',
  members:
    'M8.5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6M3.5 19c0-3 2.2-5 5-5s5 2 5 5M15.5 6.2a3 3 0 0 1 0 5.6M17 14.6c1.8.6 3 2.2 3 4.4',
  settings:
    'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M19.5 12a7.5 7.5 0 0 0-.1-1.2l2-1.5-2-3.4-2.3 1a7.5 7.5 0 0 0-2.1-1.2l-.3-2.4h-4l-.3 2.4a7.5 7.5 0 0 0-2.1 1.2l-2.3-1-2 3.4 2 1.5a7.5 7.5 0 0 0 0 2.4l-2 1.5 2 3.4 2.3-1a7.5 7.5 0 0 0 2.1 1.2l.3 2.4h4l.3-2.4a7.5 7.5 0 0 0 2.1-1.2l2.3 1 2-3.4-2-1.5c.07-.4.1-.8.1-1.2z',
  feedback:
    'M4 6.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-4.5 3.5V16.5H6a2 2 0 0 1-2-2zM9 10h.01M12 10h.01M15 10h.01',
  logout: 'M14 4.5h4a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-1.5 1.5h-4M11 8.5 7 12l4 3.5M7 12h9',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14M16.2 16.2 21 21',
  bell: 'M18 9a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6M13.7 20a2 2 0 0 1-3.4 0',
  plus: 'M12 5.5v13M5.5 12h13',
  info: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M12 11v5.5M12 7.8h.01',
  'chevron-down': 'm6 9.5 6 5.5 6-5.5',
  'chevron-left': 'm14.5 6-5.5 6 5.5 6',
  'chevron-right': 'm9.5 6 5.5 6-5.5 6',
  'arrow-right': 'M4.5 12h14M13 6.5 18.5 12 13 17.5',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  close: 'm6.5 6.5 11 11M17.5 6.5l-11 11',
  export:
    'M12 15V4M7.5 8.5 12 4l4.5 4.5M4.5 15v3.5a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5V15',
  filter: 'M4 6.5h16M7 12h10M10 17.5h4',
  'trend-up': 'M4 16.5 10 10l3.5 3.5L20 7M15 7h5v5',
  'trend-down': 'M4 7.5 10 14l3.5-3.5L20 17M15 17h5v-5',
  speaker:
    'M4.5 10.5v3a1.5 1.5 0 0 0 1.5 1.5h2l5 3.5V5.5l-5 3.5H6a1.5 1.5 0 0 0-1.5 1.5M16.5 9.5a4 4 0 0 1 0 5',
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

/** The small info glyph the reference puts beside nearly every heading. */
export function Info() {
  return <Icon name="info" size={13} className="text-muted shrink-0" strokeWidth={1.8} />;
}

/**
 * The Selviq mark and name.
 *
 * The reference sets a dark rounded square with a diamond in it beside a
 * two-line lockup. Same arrangement, invented mark: a diamond cut from two
 * triangles, which is the shape a store brand reaches for.
 */
export function Wordmark() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="bg-ink-fill grid h-10 w-10 shrink-0 place-items-center rounded-[11px]">
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3.5 20 12l-8 8.5L4 12z" fill="var(--color-accent)" />
          <path d="M12 3.5 20 12H4z" fill="#ffffff" opacity="0.28" />
        </svg>
      </span>
      <span className="min-w-0">
        <span className="text-ink block text-[14px] leading-tight font-bold">Selviq Inc.</span>
        <span className="text-muted block text-[11px] leading-tight">Free Plan</span>
      </span>
    </div>
  );
}

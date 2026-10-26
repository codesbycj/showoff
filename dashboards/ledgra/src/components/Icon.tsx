/**
 * Every icon, on one 24px grid at one stroke width. Inline SVG, never an emoji
 * (rule 8) — the reference's workspace row starts with a building and its tax
 * table ends in a warning triangle, both of which differ across platforms.
 */
export type IconName =
  | 'home'
  | 'inbox'
  | 'statement'
  | 'accounts'
  | 'metrics'
  | 'budget'
  | 'tax'
  | 'settings'
  | 'help'
  | 'logout'
  | 'building'
  | 'search'
  | 'calendar'
  | 'export'
  | 'share'
  | 'collapse'
  | 'plus'
  | 'info'
  | 'dots'
  | 'dots-v'
  | 'chevron-down'
  | 'chevron-right'
  | 'check'
  | 'close'
  | 'warning'
  | 'trend-up'
  | 'trend-down'
  | 'filter';

const PATHS: Record<IconName, string> = {
  home: 'M4 10.6 12 4l8 6.6V19a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19zM9.5 20.5v-6h5v6',
  inbox:
    'M3.5 13.5 6 5.5h12l2.5 8v5a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5zM3.5 13.5h4l1.5 2.5h6l1.5-2.5h4',
  statement: 'M6 3.5h12v17H6zM9.5 8.5h5M9.5 12h5M9.5 15.5h3',
  accounts:
    'M3.5 7a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2zM3.5 10h17M7 15h3',
  metrics: 'M4.5 19.5h15M7.5 16V9M12 16V5.5M16.5 16v-5',
  budget: 'M12 3.5a8.5 8.5 0 1 0 8.5 8.5H12z M13.5 3.6a8.5 8.5 0 0 1 6.9 6.9h-6.9z',
  tax: 'M4.5 4.5h7l8 8-7 7-8-8zM8 8h.01M9.5 14.5l5-5',
  settings:
    'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M19.5 12a7.5 7.5 0 0 0-.1-1.2l2-1.5-2-3.4-2.3 1a7.5 7.5 0 0 0-2.1-1.2l-.3-2.4h-4l-.3 2.4a7.5 7.5 0 0 0-2.1 1.2l-2.3-1-2 3.4 2 1.5a7.5 7.5 0 0 0 0 2.4l-2 1.5 2 3.4 2.3-1a7.5 7.5 0 0 0 2.1 1.2l.3 2.4h4l.3-2.4a7.5 7.5 0 0 0 2.1-1.2l2.3 1 2-3.4-2-1.5c.07-.4.1-.8.1-1.2z',
  help: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M9.6 9.6a2.5 2.5 0 1 1 2.9 2.9v1.3M12.5 17.3h.01',
  logout: 'M14 4.5h4a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-1.5 1.5h-4M11 8.5 7 12l4 3.5M7 12h9',
  building:
    'M5 20.5V5a1.5 1.5 0 0 1 1.5-1.5h7A1.5 1.5 0 0 1 15 5v15.5M15 10h3.5A1.5 1.5 0 0 1 20 11.5v9M8 7.5h4M8 11h4M8 14.5h4M3.5 20.5h17',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14M16.2 16.2 21 21',
  calendar:
    'M4.5 7.5a1.5 1.5 0 0 1 1.5-1.5h12a1.5 1.5 0 0 1 1.5 1.5v11a1.5 1.5 0 0 1-1.5 1.5H6a1.5 1.5 0 0 1-1.5-1.5zM4.5 10.5h15M8.5 3.5v4M15.5 3.5v4',
  export:
    'M12 15V4M7.5 8.5 12 4l4.5 4.5M4.5 15v3.5a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5V15',
  share:
    'M17.5 8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M6.5 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M17.5 20.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M8.7 10.8l6.6-3.6M8.7 13.2l6.6 3.6',
  collapse: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M9.5 3.9v16.2',
  plus: 'M12 5.5v13M5.5 12h13',
  info: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M12 11v5.5M12 7.8h.01',
  dots: 'M6 12h.01M12 12h.01M18 12h.01',
  'dots-v': 'M12 6h.01M12 12h.01M12 18h.01',
  'chevron-down': 'm6 9.5 6 5.5 6-5.5',
  'chevron-right': 'm9.5 6 5.5 6-5.5 6',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  close: 'm6.5 6.5 11 11M17.5 6.5l-11 11',
  warning: 'M12 3.8 21 19.5H3zM12 10v4.5M12 17.2h.01',
  'trend-up': 'M4 16.5 10 10l3.5 3.5L20 7M15 7h5v5',
  'trend-down': 'M4 7.5 10 14l3.5-3.5L20 17M15 17h5v-5',
  filter: 'M4 6.5h16M7 12h10M10 17.5h4',
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
 * The Tallora mark and wordmark.
 *
 * The reference sets a green rounded square with a cross in it beside a bold
 * wordmark. Same arrangement, invented mark: a ledger rule — two bars and a
 * balance line, which is what the name says.
 */
export function Wordmark() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="bg-accent-deep grid h-8 w-8 shrink-0 place-items-center rounded-[9px]">
        <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M5 7h14M5 12h9M5 17h14"
            stroke="#ffffff"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="text-ink text-[16px] leading-none font-bold tracking-[-0.02em]">
        Tallora
      </span>
    </div>
  );
}

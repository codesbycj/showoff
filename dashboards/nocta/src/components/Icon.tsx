/**
 * Every icon, on one 24px grid at one stroke width. Inline SVG, never an emoji.
 */
export type IconName =
  | 'home'
  | 'list'
  | 'pulse'
  | 'doc'
  | 'timer'
  | 'apps'
  | 'settings'
  | 'logout'
  | 'search'
  | 'bell'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'filter'
  | 'plus'
  | 'close'
  | 'check'
  | 'send'
  | 'expand'
  | 'sparkle'
  | 'bars'
  | 'arrow-up-right'
  | 'trend-up'
  | 'trend-down'
  | 'dots'
  | 'card'
  | 'clock';

const PATHS: Record<IconName, string> = {
  home: 'M4 10.5 12 4l8 6.5V19a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19zM9.5 20.5v-6h5v6',
  list: 'M8.5 6.5h11M8.5 12h11M8.5 17.5h11M4.5 6.5h.01M4.5 12h.01M4.5 17.5h.01',
  pulse: 'M3.5 12.5h3.8l2.2-6 3.4 11 2.3-5h5.3',
  doc: 'M6 3.5h8l4.5 4.5v12.5H6zM14 3.5V8h4.5M9 13h6M9 16.5h4',
  timer: 'M12 7.5a7 7 0 1 0 0 14 7 7 0 0 0 0-14M12 11v3.5l2.4 1.6M9.5 2.5h5M19 6l1.6 1.6',
  apps: 'M5 5h4v4H5zM10.5 5h4v4h-4zM16 5h4v4h-4zM5 10.5h4v4H5zM10.5 10.5h4v4h-4zM16 10.5h4v4h-4zM5 16h4v4H5zM10.5 16h4v4h-4zM16 16h4v4h-4z',
  settings:
    'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M19.5 12a7.5 7.5 0 0 0-.1-1.2l2-1.5-2-3.4-2.3 1a7.5 7.5 0 0 0-2.1-1.2l-.3-2.4h-4l-.3 2.4a7.5 7.5 0 0 0-2.1 1.2l-2.3-1-2 3.4 2 1.5a7.5 7.5 0 0 0 0 2.4l-2 1.5 2 3.4 2.3-1a7.5 7.5 0 0 0 2.1 1.2l.3 2.4h4l.3-2.4a7.5 7.5 0 0 0 2.1-1.2l2.3 1 2-3.4-2-1.5c.07-.4.1-.8.1-1.2z',
  logout:
    'M14 7.5V5.5a1.5 1.5 0 0 0-1.5-1.5h-6A1.5 1.5 0 0 0 5 5.5v13A1.5 1.5 0 0 0 6.5 20h6a1.5 1.5 0 0 0 1.5-1.5v-2M10 12h9.5M17 9l3 3-3 3',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14M16.2 16.2 21 21',
  bell: 'M18 9a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6M13.7 20a2 2 0 0 1-3.4 0',
  'chevron-down': 'm6 9.5 6 5.5 6-5.5',
  'chevron-left': 'm14.5 6-5.5 6 5.5 6',
  'chevron-right': 'm9.5 6 5.5 6-5.5 6',
  filter: 'M4 6.5h16M7 12h10M10 17.5h4',
  plus: 'M12 5.5v13M5.5 12h13',
  close: 'm6.5 6.5 11 11M17.5 6.5l-11 11',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  send: 'M20 4 3.5 10.5l6.5 2.5 2.5 6.5z',
  expand: 'M9.5 4.5h-5v5M14.5 19.5h5v-5M4.5 4.5l6 6M19.5 19.5l-6-6',
  sparkle:
    'M12 4c0 3.6 1.2 4.9 4.8 4.9-3.6 0-4.8 1.3-4.8 4.9 0-3.6-1.2-4.9-4.8-4.9C11 8.9 12 7.6 12 4M18 15c0 1.5.5 2 2 2-1.5 0-2 .5-2 2 0-1.5-.5-2-2-2 1.5 0 2-.5 2-2',
  bars: 'M5 19.5V11M10.5 19.5V5M16 19.5v-6M21 19.5h-18',
  'arrow-up-right': 'M7.5 16.5 16.5 7.5M9.5 7.5h7v7',
  'trend-up': 'M4 16.5 10 10l3.5 3.5L20 7M15 7h5v5',
  'trend-down': 'M4 7.5 10 14l3.5-3.5L20 17M15 17h5v-5',
  dots: 'M6 12h.01M12 12h.01M18 12h.01',
  card: 'M3.5 8a2.5 2.5 0 0 1 2.5-2.5h12A2.5 2.5 0 0 1 20.5 8v8a2.5 2.5 0 0 1-2.5 2.5H6A2.5 2.5 0 0 1 3.5 16zM3.5 10.5h17M7 14.5h3',
  clock: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M12 7.5V12l3 2',
};

export function Icon({
  name,
  size = 18,
  className,
  strokeWidth = 1.7,
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
 * The Nocta mark: two angular chevrons meeting at a seam, in the reference's
 * idiom. Invented, because the copy on this screen is invented (rule 8).
 */
export function Logo({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true" focusable="false">
      <path d="M13 4 4.5 14 13 24z" fill="currentColor" />
      <path d="M15 4l8.5 10L15 24z" fill="currentColor" opacity="0.55" />
    </svg>
  );
}

/**
 * Every icon in the app, drawn on one 24px grid at one stroke width.
 *
 * Inline SVG rather than an icon font or an emoji (rule 8): an emoji renders
 * differently on Windows, Android and iOS and some of them are simply missing,
 * which is not something a recording can carry.
 */
export type IconName =
  | 'search'
  | 'bell'
  | 'target'
  | 'chevron-down'
  | 'chevron-up'
  | 'chevron-right'
  | 'chevron-left'
  | 'plus'
  | 'check'
  | 'calendar'
  | 'pin'
  | 'clock'
  | 'card'
  | 'home'
  | 'message'
  | 'compass'
  | 'wallet'
  | 'folder'
  | 'arrow-up-right'
  | 'arrow-down-left'
  | 'filter'
  | 'sort'
  | 'close'
  | 'download'
  | 'send'
  | 'dots';

const PATHS: Record<IconName, string> = {
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14M16.2 16.2 21 21',
  bell: 'M18 9a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6M13.7 20a2 2 0 0 1-3.4 0',
  target:
    'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8M12 11.2a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6',
  'chevron-down': 'm6 9.5 6 5.5 6-5.5',
  'chevron-up': 'm6 14.5 6-5.5 6 5.5',
  'chevron-right': 'm9.5 6 5.5 6-5.5 6',
  'chevron-left': 'm14.5 6-5.5 6 5.5 6',
  plus: 'M12 5.5v13M5.5 12h13',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  calendar:
    'M4.5 7.5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2zM4.5 10.5h15M8.5 3.5v4M15.5 3.5v4',
  pin: 'M12 21s6.5-6 6.5-10.5a6.5 6.5 0 0 0-13 0C5.5 15 12 21 12 21M12 8.2a2.3 2.3 0 1 0 0 4.6 2.3 2.3 0 0 0 0-4.6',
  clock: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M12 7.5V12l3 2',
  card: 'M3.5 8a2.5 2.5 0 0 1 2.5-2.5h12A2.5 2.5 0 0 1 20.5 8v8a2.5 2.5 0 0 1-2.5 2.5H6A2.5 2.5 0 0 1 3.5 16zM3.5 10.5h17M7 14.5h3',
  home: 'M4 10.5 12 4l8 6.5V19a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19zM9.5 20.5v-6h5v6',
  message:
    'M4.5 7a2.5 2.5 0 0 1 2.5-2.5h10A2.5 2.5 0 0 1 19.5 7v7a2.5 2.5 0 0 1-2.5 2.5H9l-4.5 3.5z',
  compass: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M15.5 8.5l-2 5-5 2 2-5z',
  wallet:
    'M4 8a2.5 2.5 0 0 1 2.5-2.5H17A2.5 2.5 0 0 1 19.5 8M4 8v9.5A2.5 2.5 0 0 0 6.5 20h11a2.5 2.5 0 0 0 2.5-2.5v-8H7A3 3 0 0 1 4 6.5M16.5 14.2a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6',
  folder:
    'M3.5 7.5A2 2 0 0 1 5.5 5.5h3.6a2 2 0 0 1 1.5.7l1 1.3h6.9a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z',
  'arrow-up-right': 'M7.5 16.5 16.5 7.5M9.5 7.5h7v7',
  'arrow-down-left': 'M16.5 7.5 7.5 16.5M14.5 16.5h-7v-7',
  filter: 'M4 6.5h16M7 12h10M10 17.5h4',
  sort: 'M8 5v14M8 19l-3-3M16 19V5M16 5l3 3',
  close: 'm6.5 6.5 11 11M17.5 6.5l-11 11',
  download: 'M12 4v11M8 11.5l4 4 4-4M4.5 19.5h15',
  send: 'M20 4 3.5 10.5l6.5 2.5 2.5 6.5z',
  dots: 'M6 12h.01M12 12h.01M18 12h.01',
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
 * The TWISTY mark: an invented wordmark's glyph, drawn in the reference's
 * idiom -- a rounded square in the brand red with a white twist cut out of it.
 *
 * It is invented because the copy is invented (rule 8). A page carrying a real
 * company's logo over made-up figures is the one thing this series must not
 * produce.
 */
export function Logo({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="11" fill="var(--color-accent)" />
      <path
        d="M10.5 10.5c4.2-2.3 7.7-.1 7.7 3.1s-3.4 4-6.2 5.3c-2 1-2.6 2.6-1.4 3.6"
        fill="none"
        stroke="#fff"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle cx="20.4" cy="20.6" r="2.1" fill="#fff" />
    </svg>
  );
}

/**
 * Every icon, on one 24px grid at one stroke width. Inline SVG, never an emoji.
 */
export type IconName =
  | 'dots-v'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'search'
  | 'check'
  | 'close'
  | 'line-chart'
  | 'bar-chart'
  | 'layout'
  | 'calendar'
  | 'clock'
  | 'arrow-up'
  | 'arrow-down'
  | 'report'
  | 'stack'
  | 'truck'
  | 'wallet'
  | 'users'
  | 'sort'
  | 'plus';

const PATHS: Record<IconName, string> = {
  'dots-v': 'M12 6h.01M12 12h.01M12 18h.01',
  'chevron-down': 'm6 9.5 6 5.5 6-5.5',
  'chevron-left': 'm14.5 6-5.5 6 5.5 6',
  'chevron-right': 'm9.5 6 5.5 6-5.5 6',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14M16.2 16.2 21 21',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  close: 'm6.5 6.5 11 11M17.5 6.5l-11 11',
  'line-chart': 'M3.5 19.5h17M6 15.5l4-4.5 3.5 3L19 7',
  'bar-chart': 'M3.5 19.5h17M6.5 19.5v-6M11 19.5v-10M15.5 19.5v-4M20 19.5v-8',
  layout:
    'M3.5 6a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2zM3.5 9.5h17M9.5 9.5v10.5',
  calendar:
    'M4.5 7.5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2zM4.5 10.5h15M8.5 3.5v4M15.5 3.5v4',
  clock: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M12 7.5V12l3 2',
  'arrow-up': 'M12 19.5v-15M6 10.5 12 4.5l6 6',
  'arrow-down': 'M12 4.5v15M6 13.5l6 6 6-6',
  report: 'M6 3.5h8l4.5 4.5v12.5H6zM14 3.5V8h4.5M9 13h6M9 16.5h4',
  stack: 'm12 4 7 4-7 4-7-4zM5 12l7 4 7-4M5 16l7 4 7-4',
  truck:
    'M3.5 7.5h10v9h-10zM13.5 10.5h3.3l2.7 3v3h-6zM7 16.5a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6M16.5 16.5a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6',
  wallet:
    'M4 8a2.5 2.5 0 0 1 2.5-2.5H17A2.5 2.5 0 0 1 19.5 8M4 8v9.5A2.5 2.5 0 0 0 6.5 20h11a2.5 2.5 0 0 0 2.5-2.5v-8H7A3 3 0 0 1 4 6.5M16.5 14.2a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6',
  users:
    'M9 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3.5 20c0-3.3 2.5-5.5 5.5-5.5s5.5 2.2 5.5 5.5M16 5.2a3.5 3.5 0 0 1 0 6.6M17.5 14.9c1.9.7 3 2.5 3 5.1',
  sort: 'M8 5v14M8 19l-3-3M16 19V5M16 5l3 3',
  plus: 'M12 5.5v13M5.5 12h13',
};

export function Icon({
  name,
  size = 16,
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

/** The Sypher mark: a dark square with a routed path cut through it. Invented. */
export function Logo({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true" focusable="false">
      <rect width="28" height="28" rx="8" fill="var(--color-ink)" />
      <path
        d="M9 19c4.5 0 2.5-5 5-5s3-4 5-4"
        fill="none"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="9" cy="19" r="1.8" fill="var(--color-accent)" />
    </svg>
  );
}

/*
 * A customer's mark.
 *
 * Every company on this ledger is invented, so every mark is too — eight
 * abstract solids on one grid, which is exactly what is in drawing range. A
 * real logo here would put a real company on an invented invoice, which is the
 * one thing this series must never produce.
 */
export type MarkId = 'ring' | 'wedge' | 'bars' | 'chevron' | 'dot' | 'cross' | 'arrow' | 'hex';

const MARKS: Record<MarkId, string> = {
  ring: 'M12 5.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13m0 3.6a2.9 2.9 0 1 1 0 5.8 2.9 2.9 0 0 1 0-5.8',
  wedge: 'M5.5 18.5 12 5.5l6.5 13z',
  bars: 'M6 16.5V9h3v7.5zM10.5 16.5V6h3v10.5zM15 16.5v-5h3v5z',
  chevron: 'M6 7.5 12 13l6-5.5v4L12 17l-6-5.5z',
  dot: 'M12 5.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13',
  cross: 'M10.2 5.5h3.6v4.7h4.7v3.6h-4.7v4.7h-3.6v-4.7H5.5v-3.6h4.7z',
  arrow: 'M12 5.5 18.5 18.5H5.5z',
  hex: 'M12 5 18 8.5v7L12 19l-6-3.5v-7z',
};

export function CompanyMark({
  mark,
  tint,
  size = 26,
}: {
  mark: MarkId;
  tint: string;
  size?: number;
}) {
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, background: tint, borderRadius: size * 0.28 }}
      className="grid shrink-0 place-items-center text-white"
    >
      <svg width={size * 0.7} height={size * 0.7} viewBox="0 0 24 24" fill="currentColor">
        <path d={MARKS[mark]} fillRule="evenodd" />
      </svg>
    </span>
  );
}

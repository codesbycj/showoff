/**
 * Every icon, on one 24px grid at one stroke width. Inline SVG, never an
 * emoji (rule 8).
 */
export type IconName =
  | 'grid'
  | 'bed'
  | 'people'
  | 'stethoscope'
  | 'pill'
  | 'chart'
  | 'search'
  | 'bell'
  | 'menu'
  | 'plus'
  | 'clock'
  | 'heart'
  | 'lungs'
  | 'thermometer'
  | 'drop'
  | 'alert'
  | 'shield'
  | 'no-food'
  | 'isolation'
  | 'falls'
  | 'note'
  | 'check'
  | 'close'
  | 'chevron-down'
  | 'chevron-up'
  | 'chevron-right'
  | 'sort'
  | 'dots'
  | 'calendar'
  | 'trend-up'
  | 'trend-down';

const PATHS: Record<IconName, string> = {
  grid: 'M4.5 5.5h6v6h-6zM13.5 5.5h6v6h-6zM4.5 12.5h6v6h-6zM13.5 12.5h6v6h-6z',
  bed: 'M3.5 19.5v-11M3.5 12.5h17v7h-17M20.5 19.5v-7a3 3 0 0 0-3-3H10v3M7 11.5a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5',
  people:
    'M9 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M2.5 20c0-3.4 2.9-5.5 6.5-5.5s6.5 2.1 6.5 5.5M16 5.2a3.5 3.5 0 0 1 0 6.6M18.5 14.8c1.9.7 3 2.5 3 5.2',
  stethoscope:
    'M6 3.5v5a4 4 0 0 0 8 0v-5M4.5 3.5h3M12.5 3.5h3M10 16.5v-4M10 16.5a4 4 0 0 0 8 0v-2M18 10.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4',
  pill: 'M9.5 3.5a6 6 0 0 1 8.5 8.5l-6 6a6 6 0 0 1-8.5-8.5zM7 7l10 10',
  chart: 'M4 19.5h16M7 16V9M12 16V5.5M17 16v-5',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14M16.2 16.2 21 21',
  bell: 'M12 3.5a5.5 5.5 0 0 0-5.5 5.5c0 5-2 6.5-2 6.5h15s-2-1.5-2-6.5A5.5 5.5 0 0 0 12 3.5M10 19a2 2 0 0 0 4 0',
  menu: 'M4.5 7h15M4.5 12h15M4.5 17h15',
  plus: 'M12 5v14M5 12h14',
  clock: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M12 7.5V12l3 2',
  heart:
    'M12 20.5S3.5 15 3.5 9.2A4.7 4.7 0 0 1 12 6.4a4.7 4.7 0 0 1 8.5 2.8c0 5.8-8.5 11.3-8.5 11.3',
  lungs:
    'M12 3.5v9M12 12.5c0-2.5-1.5-4-3-4S6 10 5 13s-1 6-1 6 2.5 1 4 0 3-3.5 3-6.5M12 12.5c0-2.5 1.5-4 3-4s3 1.5 4 4.5 1 6 1 6-2.5 1-4 0-3-3.5-3-6.5',
  thermometer: 'M14 14.2V5a2 2 0 1 0-4 0v9.2a4 4 0 1 0 4 0M12 9v6',
  drop: 'M12 3.5s6 6.6 6 10.2a6 6 0 1 1-12 0C6 10.1 12 3.5 12 3.5',
  alert: 'M12 3.8 2.8 19.5h18.4zM12 9.5v5M12 17.2h.01',
  shield: 'M12 3.5 20 6.5v5.5c0 4.6-3.3 7.6-8 9-4.7-1.4-8-4.4-8-9V6.5z',
  'no-food':
    'M7 3.5v8M4.5 3.5v5a2.5 2.5 0 0 0 5 0v-5M16.5 3.5v17M14 3.5c-1.5 2-2 4-2 6.5h4M4 4l16 16',
  isolation:
    'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7M6 6l3 3M18 6l-3 3M6 18l3-3M18 18l-3-3',
  falls:
    'M14 4.5a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2M13 9.5 8.5 12l-2.5 5M13 9.5l3.5 2.5 2 4.5M11 13.5 9 20M3.5 20.5h17',
  note: 'M6 3.5h12v17H6zM9 8.5h6M9 12h6M9 15.5h4',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  close: 'm6.5 6.5 11 11M17.5 6.5l-11 11',
  'chevron-down': 'm6 9.5 6 5.5 6-5.5',
  'chevron-up': 'm6 14.5 6-5.5 6 5.5',
  'chevron-right': 'm9.5 6 5.5 6-5.5 6',
  sort: 'm8 9.5 3-3 3 3M8 14.5l3 3 3-3',
  dots: 'M6 12h.01M12 12h.01M18 12h.01',
  calendar: 'M4.5 6.5h15v13h-15zM4.5 10.5h15M8.5 3.5v4M15.5 3.5v4',
  'trend-up': 'M4 16.5 10 10l3.5 3.5L20 7M15 7h5v5',
  'trend-down': 'M4 7.5 10 14l3.5-3.5L20 17M15 17h5v-5',
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
 * The Medivra mark and wordmark.
 *
 * The reference sets a white cross on a sage rounded square. Same idiom,
 * invented mark: the cross with one arm drawn as a trace, which is the two
 * halves of this product — a ward, and what it is watching.
 */
export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="bg-accent-deep grid h-[38px] w-[38px] shrink-0 place-items-center rounded-[13px]"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 5v14M5 12h3.5l1.8-3 2 6 1.7-3H19"
            stroke="#fff"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {compact ? null : (
        <span className="text-ink text-[19px] leading-none font-extrabold tracking-[-0.025em]">
          Medivra
        </span>
      )}
    </div>
  );
}

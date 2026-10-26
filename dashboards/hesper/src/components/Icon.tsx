/**
 * Every icon, on one 24px grid at one stroke width. Inline SVG, never an
 * emoji (rule 8) — the reference's own four metric tiles use pictorial marks,
 * which is exactly where an emoji would have crept in and rendered three
 * different ways on three machines.
 */
export type IconName =
  | 'search'
  | 'bell'
  | 'mail'
  | 'calendar'
  | 'upload'
  | 'dots'
  | 'check'
  | 'close'
  | 'chevron-down'
  | 'chevron-right'
  | 'arrow-right'
  | 'arrow-up'
  | 'arrow-down'
  | 'sort'
  | 'trend-up'
  | 'trend-down'
  | 'users'
  | 'briefcase'
  | 'refresh'
  | 'clock'
  | 'file'
  | 'filter'
  | 'flag'
  | 'coin'
  | 'alert'
  | 'scales';

const PATHS: Record<IconName, string> = {
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14M16.2 16.2 21 21',
  bell: 'M18 9a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6M13.7 20a2 2 0 0 1-3.4 0',
  mail: 'M3.5 6.5h17v11h-17zM3.5 7l8.5 6 8.5-6',
  calendar: 'M4.5 6.5h15v13h-15zM4.5 10.5h15M8.5 4v4M15.5 4v4M8 14h2M14 14h2M8 17h2M14 17h2',
  upload: 'M12 16V4.5M7.5 9 12 4.5 16.5 9M4.5 15v4.5h15V15',
  dots: 'M6 12h.01M12 12h.01M18 12h.01',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  close: 'm6.5 6.5 11 11M17.5 6.5l-11 11',
  'chevron-down': 'm6 9.5 6 5.5 6-5.5',
  'chevron-right': 'm9.5 6 5.5 6-5.5 6',
  'arrow-right': 'M4.5 12h14M13 6.5 18.5 12 13 17.5',
  'arrow-up': 'M12 19.5v-15M6.5 10 12 4.5 17.5 10',
  'arrow-down': 'M12 4.5v15M6.5 14 12 19.5 17.5 14',
  sort: 'm8 9.5 3-3 3 3M8 14.5l3 3 3-3',
  'trend-up': 'M4 16.5 10 10l3.5 3.5L20 7M15 7h5v5',
  'trend-down': 'M4 7.5 10 14l3.5-3.5L20 17M15 17h5v-5',
  users:
    'M9 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3.5 20c0-3.3 2.5-5.5 5.5-5.5s5.5 2.2 5.5 5.5M16 5.2a3.5 3.5 0 0 1 0 6.6M17.5 14.9c1.9.7 3 2.5 3 5.1',
  briefcase:
    'M3.5 8.5h17v11h-17zM9 8.5V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v2.5M3.5 13.5h17',
  refresh: 'M20 12a8 8 0 1 1-2.6-5.9M20 4v4.5h-4.5',
  clock: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M12 7.5V12l3 2',
  file: 'M6 3.5h7l5 5v12H6zM13 3.5v5h5M9 13h6M9 16.5h6',
  filter: 'M3.5 5.5h17l-6.5 7.5v6l-4 2v-8z',
  flag: 'M5.5 3.5v17M5.5 4.5h10l-1.4 3.5 1.4 3.5h-10',
  coin: 'M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17M12 7v10M14.8 9.4a3 3 0 0 0-2.8-1.4c-1.7 0-3 .9-3 2.2 0 1.4 1.3 2 3 2.3s3 .9 3 2.3-1.3 2.2-3 2.2a3 3 0 0 1-2.8-1.4',
  alert: 'M12 3.8 2.8 19.5h18.4zM12 9.5v5M12 17.2h.01',
  scales:
    'M12 4.5v15M7 19.5h10M5 8.5h14M5 8.5 2.5 14h5zM19 8.5 16.5 14h5zM12 4.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2',
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
 * The Caldrow mark and wordmark.
 *
 * The reference sets a free-form teal wing beside a bold wordmark with a full
 * stop in it. Same arrangement, invented mark: a crescent with a four-point
 * star in its opening, drawn at the reference's size and in the reference's
 * place (rule 8). The firm bills by the hour at all hours, which is the idea
 * the mark carries — it was tied to an older name of this episode's, and the
 * drawing outlived it.
 */
export function Wordmark() {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
        <path
          d="M18.4 17.6A8.5 8.5 0 0 1 7.2 5.1a8.5 8.5 0 1 0 11.2 12.5"
          fill="var(--color-accent)"
        />
        <path
          d="M16.6 3.2c.5 2.1 1.1 2.7 3.2 3.2-2.1.5-2.7 1.1-3.2 3.2-.5-2.1-1.1-2.7-3.2-3.2 2.1-.5 2.7-1.1 3.2-3.2Z"
          fill="var(--color-accent-bright)"
        />
      </svg>
      <span className="text-ink text-[18px] leading-none font-bold tracking-[-0.02em]">
        Caldrow Legal.
      </span>
    </div>
  );
}

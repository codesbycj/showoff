/**
 * Every icon, on one 24px grid at one stroke width. Inline SVG, never an
 * emoji (rule 8).
 */
export type IconName =
  | 'grid'
  | 'truck'
  | 'pie'
  | 'clipboard'
  | 'user'
  | 'settings'
  | 'search'
  | 'filter'
  | 'plus'
  | 'phone'
  | 'mail'
  | 'pencil'
  | 'clock'
  | 'pin'
  | 'box'
  | 'weight'
  | 'chevron-left'
  | 'chevron-down'
  | 'chevron-right'
  | 'arrow-right'
  | 'close'
  | 'check'
  | 'dots'
  | 'sort'
  | 'note'
  | 'alert'
  | 'trend-up'
  | 'trend-down';

const PATHS: Record<IconName, string> = {
  grid: 'M4.5 5.5h6v6h-6zM13.5 5.5h6v6h-6zM4.5 12.5h6v6h-6zM13.5 12.5h6v6h-6z',
  truck:
    'M2.5 7.5h11v9h-11zM13.5 10.5h4l3 3.5v2.5h-7zM7 19.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4M17 19.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4',
  pie: 'M12 3.5a8.5 8.5 0 1 0 8.5 8.5H12z',
  clipboard: 'M8 4.5H6.5v15h11v-15H16M9 3h6v3H9zM9 11h6M9 15h4',
  user: 'M12 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6',
  settings:
    'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M19.5 12a7.5 7.5 0 0 0-.1-1.2l2-1.5-2-3.4-2.3 1a7.5 7.5 0 0 0-2.1-1.2l-.3-2.4h-4l-.3 2.4a7.5 7.5 0 0 0-2.1 1.2l-2.3-1-2 3.4 2 1.5a7.5 7.5 0 0 0 0 2.4l-2 1.5 2 3.4 2.3-1a7.5 7.5 0 0 0 2.1 1.2l.3 2.4h4l.3-2.4a7.5 7.5 0 0 0 2.1-1.2l2.3 1 2-3.4-2-1.5c.07-.4.1-.8.1-1.2z',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14M16.2 16.2 21 21',
  filter: 'M3.5 5.5h17l-6.5 7.5v6l-4 2v-8z',
  plus: 'M12 5v14M5 12h14',
  phone: 'M7 3.5 9.5 8l-2 2a12 12 0 0 0 6.5 6.5l2-2 4.5 2.5-1.5 3.5A17 17 0 0 1 3.5 5z',
  mail: 'M3.5 6.5h17v11h-17zM3.5 7l8.5 6 8.5-6',
  pencil: 'M4.5 19.5h4l11-11-4-4-11 11zM15.5 4.5l4 4',
  clock: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M12 7.5V12l3 2',
  pin: 'M12 21.5s6.5-6.1 6.5-11a6.5 6.5 0 1 0-13 0c0 4.9 6.5 11 6.5 11M12 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5',
  box: 'M4 7.5 12 4l8 3.5v9L12 20l-8-3.5zM4 7.5 12 11l8-3.5M12 11v9',
  weight: 'M7 7.5h10l2.5 12h-15zM9.5 7.5a2.5 2.5 0 1 1 5 0',
  'chevron-left': 'm14.5 6-5.5 6 5.5 6',
  'chevron-down': 'm6 9.5 6 5.5 6-5.5',
  'chevron-right': 'm9.5 6 5.5 6-5.5 6',
  'arrow-right': 'M4.5 12h14M13 6.5 18.5 12 13 17.5',
  close: 'm6.5 6.5 11 11M17.5 6.5l-11 11',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  dots: 'M6 12h.01M12 12h.01M18 12h.01',
  sort: 'm8 9.5 3-3 3 3M8 14.5l3 3 3-3',
  note: 'M6 3.5h12v17l-3-2.5-3 2.5-3-2.5-3 2.5zM9 8.5h6M9 12h6',
  alert: 'M12 3.8 2.8 19.5h18.4zM12 9.5v5M12 17.2h.01',
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
 * The Haulvo mark and wordmark.
 *
 * The reference sets a blue cube in the rail's corner. Same arrangement,
 * invented mark: a box seen in isometric, which is what this product moves.
 */
export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
        <path d="M12 2.5 21 7v10l-9 4.5L3 17V7z" fill="var(--color-accent)" />
        <path
          d="M3 7l9 4.5L21 7M12 11.5v10"
          fill="none"
          stroke="#fff"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
      {compact ? null : (
        <span className="text-ink text-[18px] leading-none font-bold tracking-[-0.02em]">
          Haulvo
        </span>
      )}
    </div>
  );
}

/**
 * Every icon, on one 24px grid at one stroke width. Inline SVG, never an emoji
 * (rule 8) — this design's appearance switch is a sun and a moon, two of the
 * glyphs that differ most across platforms.
 */
export type IconName =
  | 'grid'
  | 'sliders'
  | 'pulse'
  | 'users'
  | 'behaviour'
  | 'funnel'
  | 'settings'
  | 'help'
  | 'search'
  | 'bell'
  | 'sun'
  | 'moon'
  | 'chevron-down'
  | 'chevron-right'
  | 'arrow-right'
  | 'check'
  | 'close'
  | 'dots'
  | 'link'
  | 'flag'
  | 'arrow-up'
  | 'arrow-down'
  | 'trend-up'
  | 'trend-down'
  | 'user'
  | 'coin'
  | 'target'
  | 'clock'
  | 'desktop'
  | 'mobile'
  | 'tablet'
  | 'globe';

const PATHS: Record<IconName, string> = {
  grid: 'M4.5 5.5h6v6h-6zM13.5 5.5h6v6h-6zM4.5 12.5h6v6h-6zM13.5 12.5h6v6h-6z',
  sliders: 'M5 7.5h14M5 16.5h14M9.5 5v5M15.5 14v5',
  pulse: 'M3.5 12.5h4l3-7 4 14 3-7h3',
  users:
    'M9 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3.5 20c0-3.3 2.5-5.5 5.5-5.5s5.5 2.2 5.5 5.5M16 5.2a3.5 3.5 0 0 1 0 6.6M17.5 14.9c1.9.7 3 2.5 3 5.1',
  behaviour: 'M4.5 19.5h15M7 16.5V12M11 16.5V7M15 16.5v-6M19 16.5V9',
  funnel: 'M3.5 5.5h17l-6.5 7.5v6l-4 2v-8z',
  settings:
    'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M19.5 12a7.5 7.5 0 0 0-.1-1.2l2-1.5-2-3.4-2.3 1a7.5 7.5 0 0 0-2.1-1.2l-.3-2.4h-4l-.3 2.4a7.5 7.5 0 0 0-2.1 1.2l-2.3-1-2 3.4 2 1.5a7.5 7.5 0 0 0 0 2.4l-2 1.5 2 3.4 2.3-1a7.5 7.5 0 0 0 2.1 1.2l.3 2.4h4l.3-2.4a7.5 7.5 0 0 0 2.1-1.2l2.3 1 2-3.4-2-1.5c.07-.4.1-.8.1-1.2z',
  help: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M9.6 9.6a2.5 2.5 0 1 1 2.9 2.9v1.3M12.5 17.3h.01',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14M16.2 16.2 21 21',
  bell: 'M18 9a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6M13.7 20a2 2 0 0 1-3.4 0',
  sun: 'M12 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4',
  moon: 'M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5',
  'chevron-down': 'm6 9.5 6 5.5 6-5.5',
  'chevron-right': 'm9.5 6 5.5 6-5.5 6',
  'arrow-right': 'M4.5 12h14M13 6.5 18.5 12 13 17.5',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  close: 'm6.5 6.5 11 11M17.5 6.5l-11 11',
  dots: 'M6 12h.01M12 12h.01M18 12h.01',
  link: 'M10 13.5a3.5 3.5 0 0 0 5 0l3.5-3.5a3.5 3.5 0 0 0-5-5L12 6.5M14 10.5a3.5 3.5 0 0 0-5 0L5.5 14a3.5 3.5 0 0 0 5 5L12 17.5',
  flag: 'M5.5 3.5v17M5.5 4.5h10l-1.4 3.5 1.4 3.5h-10',
  'arrow-up': 'M12 19.5v-15M6.5 10 12 4.5 17.5 10',
  'arrow-down': 'M12 4.5v15M6.5 14 12 19.5 17.5 14',
  'trend-up': 'M4 16.5 10 10l3.5 3.5L20 7M15 7h5v5',
  'trend-down': 'M4 7.5 10 14l3.5-3.5L20 17M15 17h5v-5',
  user: 'M12 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6',
  coin: 'M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17M12 7v10M14.8 9.4a3 3 0 0 0-2.8-1.4c-1.7 0-3 .9-3 2.2 0 1.4 1.3 2 3 2.3s3 .9 3 2.3-1.3 2.2-3 2.2a3 3 0 0 1-2.8-1.4',
  target:
    'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8M12 11.4a.6.6 0 1 0 0 1.2.6.6 0 0 0 0-1.2',
  clock: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M12 7.5V12l3 2',
  desktop: 'M3.5 5.5h17v10h-17zM8.5 19.5h7M12 15.5v4',
  mobile:
    'M7.5 3.5h9a1.5 1.5 0 0 1 1.5 1.5v14a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V5a1.5 1.5 0 0 1 1.5-1.5M10.5 17.5h3',
  tablet:
    'M6 3.5h12a1.5 1.5 0 0 1 1.5 1.5v14a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 19V5A1.5 1.5 0 0 1 6 3.5M11 17.5h2',
  globe:
    'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M3.8 9.5h16.4M3.8 14.5h16.4M12 3.5c-2.2 2.3-3.3 5.1-3.3 8.5s1.1 6.2 3.3 8.5c2.2-2.3 3.3-5.1 3.3-8.5S14.2 5.8 12 3.5',
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
 * The Metriqo mark and wordmark.
 *
 * The reference sets a blue disc with a wave in it beside a bold wordmark.
 * Same arrangement, invented mark: a disc with a rising spark cut out of it,
 * which is what the name says.
 */
export function Wordmark() {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
        <circle cx="12" cy="12" r="10.5" fill="var(--color-accent)" />
        <path
          d="M7.5 15.5 11 9.5l2.2 3.4L16.5 7.5"
          fill="none"
          stroke="var(--color-accent-fg)"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-ink text-[17px] leading-none font-bold tracking-[-0.02em]">
        Metriqo
      </span>
    </div>
  );
}

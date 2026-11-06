/**
 * Every icon, on one 24px grid at one stroke width. Inline SVG, never an
 * emoji (rule 8).
 */
export type IconName =
  | 'grid'
  | 'users'
  | 'flow'
  | 'deal'
  | 'report'
  | 'bell'
  | 'chat'
  | 'search'
  | 'filter'
  | 'chevron-down'
  | 'chevron-right'
  | 'arrow-up'
  | 'arrow-down'
  | 'arrow-right'
  | 'trend-up'
  | 'trend-down'
  | 'close'
  | 'check'
  | 'dots'
  | 'sort'
  | 'clock'
  | 'flag'
  | 'mail'
  | 'phone'
  | 'calendar'
  | 'target'
  | 'spark'
  | 'external';

const PATHS: Record<IconName, string> = {
  grid: 'M4.5 5.5h6v6h-6zM13.5 5.5h6v6h-6zM4.5 12.5h6v6h-6zM13.5 12.5h6v6h-6z',
  users:
    'M9 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3.5 20c0-3.3 2.5-5.5 5.5-5.5s5.5 2.2 5.5 5.5M16 5.2a3.5 3.5 0 0 1 0 6.6M17.5 14.9c1.9.7 3 2.5 3 5.1',
  flow: 'M5.5 4.5h5v5h-5zM13.5 14.5h5v5h-5zM8 9.5v4a3 3 0 0 0 3 3h2.5',
  deal: 'M3.5 8.5h17v11h-17zM9 8.5V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v2.5M3.5 13.5h17',
  report: 'M4.5 19.5h15M7 16.5v-5M11.5 16.5v-9M16 16.5v-6M20 16.5V8',
  bell: 'M18 9a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6M13.7 20a2 2 0 0 1-3.4 0',
  chat: 'M4.5 5.5h15v11h-9l-4 3.5v-3.5h-2z',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14M16.2 16.2 21 21',
  filter: 'M3.5 5.5h17l-6.5 7.5v6l-4 2v-8z',
  'chevron-down': 'm6 9.5 6 5.5 6-5.5',
  'chevron-right': 'm9.5 6 5.5 6-5.5 6',
  'arrow-up': 'M12 19.5v-15M6.5 10 12 4.5 17.5 10',
  'arrow-down': 'M12 4.5v15M6.5 14 12 19.5 17.5 14',
  'arrow-right': 'M4.5 12h14M13 6.5 18.5 12 13 17.5',
  'trend-up': 'M4 16.5 10 10l3.5 3.5L20 7M15 7h5v5',
  'trend-down': 'M4 7.5 10 14l3.5-3.5L20 17M15 17h5v-5',
  close: 'm6.5 6.5 11 11M17.5 6.5l-11 11',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  dots: 'M6 12h.01M12 12h.01M18 12h.01',
  sort: 'm8 9.5 3-3 3 3M8 14.5l3 3 3-3',
  clock: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M12 7.5V12l3 2',
  flag: 'M5.5 3.5v17M5.5 4.5h10l-1.4 3.5 1.4 3.5h-10',
  mail: 'M3.5 6.5h17v11h-17zM3.5 7l8.5 6 8.5-6',
  phone: 'M7 3.5 9.5 8l-2 2a12 12 0 0 0 6.5 6.5l2-2 4.5 2.5-1.5 3.5A17 17 0 0 1 3.5 5z',
  calendar: 'M4.5 6.5h15v13h-15zM4.5 10.5h15M8.5 4v4M15.5 4v4',
  target:
    'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8M12 11.4a.6.6 0 1 0 0 1.2.6.6 0 0 0 0-1.2',
  spark: 'M12 3.5 14 9l5.5 2-5.5 2-2 5.5-2-5.5L4.5 11 10 9z',
  external: 'M14 4.5h5.5V10M19 5l-7.5 7.5M18 13.5v6h-13v-13h6',
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
 * The Prospra mark and wordmark.
 *
 * The reference sets a blue swirl beside a bold wordmark. Same arrangement,
 * invented mark: two overlapping chevrons climbing to the right, which is
 * what a pipeline does.
 */
export function Wordmark() {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
        <circle cx="12" cy="12" r="11" fill="var(--color-accent-faint)" />
        <path
          d="M6.5 15.5 10 11l3 3 4.5-6"
          fill="none"
          stroke="var(--color-accent-deep)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="17.5" cy="8" r="2.1" fill="var(--color-accent)" />
      </svg>
      <span className="text-ink text-[19px] leading-none font-bold tracking-[-0.02em]">
        Prospra
      </span>
    </div>
  );
}

/**
 * A country disc, drawn rather than taken from the emoji flag set: Windows has
 * no flag glyphs at all, so an emoji flag ships as two letters in a box
 * (rule 8). It is also not a traced flag — at 24px the bands are the whole
 * signal, and a crest would be mud.
 */
export function FlagDisc({
  bands,
  dir,
  size = 26,
}: {
  bands: string[];
  dir: 'h' | 'v';
  size?: number;
}) {
  const step = 100 / bands.length;
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size }}
      className="border-line relative block shrink-0 overflow-hidden rounded-full border"
    >
      {bands.map((colour, i) => (
        <span
          key={colour + i}
          style={
            dir === 'h'
              ? { background: colour, top: `${i * step}%`, height: `${step}%`, left: 0, right: 0 }
              : { background: colour, left: `${i * step}%`, width: `${step}%`, top: 0, bottom: 0 }
          }
          className="absolute"
        />
      ))}
    </span>
  );
}

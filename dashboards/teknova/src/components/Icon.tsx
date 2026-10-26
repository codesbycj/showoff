import { useId } from 'react';

/**
 * Every icon, on one 24px grid at one stroke width. Inline SVG, never an emoji:
 * emoji differ across Windows, Android and iOS and the flags are missing on
 * Windows — which is also why the market flags below are drawn (rule 8).
 */
export type IconName =
  | 'grid'
  | 'box'
  | 'receipt'
  | 'chart'
  | 'users'
  | 'report'
  | 'settings'
  | 'team'
  | 'help'
  | 'logout'
  | 'search'
  | 'sliders'
  | 'bell'
  | 'sun'
  | 'moon'
  | 'dots'
  | 'chevron-down'
  | 'chevron-up'
  | 'chevron-right'
  | 'chevron-left'
  | 'stack'
  | 'download'
  | 'plus'
  | 'check'
  | 'close'
  | 'trend-up'
  | 'trend-down'
  | 'target'
  | 'globe'
  | 'wallet'
  | 'clock'
  | 'truck';

const PATHS: Record<IconName, string> = {
  grid: 'M4.5 5.5h6v6h-6zM13.5 5.5h6v6h-6zM4.5 12.5h6v6h-6zM13.5 12.5h6v6h-6z',
  box: 'M12 3.4 20 7.7v8.6L12 20.6 4 16.3V7.7zM4 7.7l8 4.3 8-4.3M12 12v8.6',
  receipt: 'M5.5 3.5h13v17l-2.2-1.6-2.1 1.6-2.2-1.6-2.2 1.6-2.1-1.6-2.2 1.6zM9 8.5h6M9 12.5h6',
  chart: 'M4.5 19.5h15M7.5 16V9M12 16V5.5M16.5 16v-5',
  users:
    'M9 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3.5 20c0-3.3 2.5-5.5 5.5-5.5s5.5 2.2 5.5 5.5M16 5.2a3.5 3.5 0 0 1 0 6.6M17.5 14.9c1.9.7 3 2.5 3 5.1',
  report: 'M6 3.5h8l4.5 4.5v12.5H6zM14 3.5V8h4.5M9 13h6M9 16.5h4',
  settings:
    'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M19.5 12a7.5 7.5 0 0 0-.1-1.2l2-1.5-2-3.4-2.3 1a7.5 7.5 0 0 0-2.1-1.2l-.3-2.4h-4l-.3 2.4a7.5 7.5 0 0 0-2.1 1.2l-2.3-1-2 3.4 2 1.5a7.5 7.5 0 0 0 0 2.4l-2 1.5 2 3.4 2.3-1a7.5 7.5 0 0 0 2.1 1.2l.3 2.4h4l.3-2.4a7.5 7.5 0 0 0 2.1-1.2l2.3 1 2-3.4-2-1.5c.07-.4.1-.8.1-1.2z',
  team: 'M8.5 11a3.3 3.3 0 1 0 0-6.6 3.3 3.3 0 0 0 0 6.6M2.8 20c0-3.2 2.6-5.7 5.7-5.7s5.7 2.5 5.7 5.7M16.5 10.5a2.6 2.6 0 1 0 0-5.2M18 14.6c2 .6 3.2 2.4 3.2 5.4',
  help: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M9.8 9.6a2.3 2.3 0 0 1 4.4.8c0 1.6-2.2 2-2.2 3.4M12 17.3h.01',
  logout:
    'M14 7.5V5.5a1.5 1.5 0 0 0-1.5-1.5h-6A1.5 1.5 0 0 0 5 5.5v13A1.5 1.5 0 0 0 6.5 20h6a1.5 1.5 0 0 0 1.5-1.5v-2M10 12h9.5M17 9l3 3-3 3',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14M16.2 16.2 21 21',
  sliders: 'M4.5 8h10M17.5 8h2M4.5 16h4M11.5 16h8M15.5 5.5v5M8.5 13.5v5',
  bell: 'M18 9a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6M13.7 20a2 2 0 0 1-3.4 0',
  sun: 'M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4',
  moon: 'M20 14.2A8.4 8.4 0 0 1 9.8 4 8.5 8.5 0 1 0 20 14.2',
  dots: 'M6 12h.01M12 12h.01M18 12h.01',
  'chevron-down': 'm6 9.5 6 5.5 6-5.5',
  'chevron-up': 'm6 14.5 6-5.5 6 5.5',
  'chevron-right': 'm9.5 6 5.5 6-5.5 6',
  'chevron-left': 'm14.5 6-5.5 6 5.5 6',
  stack: 'm12 4 7 4-7 4-7-4zM5 12l7 4 7-4M5 16l7 4 7-4',
  download: 'M12 4v11M8 11.5l4 4 4-4M4.5 19.5h15',
  plus: 'M12 5.5v13M5.5 12h13',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  close: 'm6.5 6.5 11 11M17.5 6.5l-11 11',
  'trend-up': 'M4 16.5 10 10l3.5 3.5L20 7M15 7h5v5',
  'trend-down': 'M4 7.5 10 14l3.5-3.5L20 17M15 17h5v-5',
  target:
    'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8M12 11.2a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6',
  globe:
    'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M3.5 12h17M12 3.5c2.2 2.3 3.3 5.1 3.3 8.5s-1.1 6.2-3.3 8.5c-2.2-2.3-3.3-5.1-3.3-8.5s1.1-6.2 3.3-8.5',
  wallet:
    'M4 8a2.5 2.5 0 0 1 2.5-2.5H17A2.5 2.5 0 0 1 19.5 8M4 8v9.5A2.5 2.5 0 0 0 6.5 20h11a2.5 2.5 0 0 0 2.5-2.5v-8H7A3 3 0 0 1 4 6.5M16.5 14.2a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6',
  clock: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M12 7.5V12l3 2',
  truck:
    'M3.5 7.5h10v9h-10zM13.5 10.5h3.3l2.7 3v3h-6zM7 16.5a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6M16.5 16.5a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6',
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
 * The Kovelt mark: a dark disc with a drawn "K" and an accent spark.
 * Invented, in the reference's idiom — the copy on this screen is invented, so
 * the mark has to be (rule 8).
 *
 * The letter is drawn, not set, so it does not follow a string rename: this
 * one was a different letter under this episode's previous name and had to be
 * redrawn by hand when the name changed.
 */
export function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <circle cx="20" cy="20" r="20" fill="var(--color-ink)" />
      <path
        d="M14.5 13v14M24.5 13.5 16 20.5M18.5 19 25.5 27"
        stroke="#fff"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="28" cy="13.5" r="2.4" fill="var(--color-accent)" />
    </svg>
  );
}

/**
 * A country disc, drawn rather than taken from the emoji flag set: Windows has
 * no flag glyphs at all, so an emoji flag ships as two letters in a box.
 */
export type Country = 'id' | 'de' | 'it' | 'fr' | 'jp';

const FLAGS: Record<Country, { dir: 'h' | 'v'; bands: string[] }> = {
  id: { dir: 'h', bands: ['#e8112d', '#ffffff'] },
  de: { dir: 'h', bands: ['#161616', '#dd0000', '#ffce00'] },
  it: { dir: 'v', bands: ['#009246', '#f1f2f1', '#ce2b37'] },
  fr: { dir: 'v', bands: ['#002395', '#ffffff', '#ed2939'] },
  jp: { dir: 'h', bands: ['#ffffff'] },
};

export function Flag({ country, size = 26 }: { country: Country; size?: number }) {
  // useId, not a fixed string: a clipPath id is document-global, so two discs
  // for the same country would collapse into the first and the second would
  // render unclipped. probe.js reports duplicates; this prevents them.
  const clip = 'flag-' + country + '-' + useId().replace(/:/g, '');
  const { dir, bands } = FLAGS[country];
  const step = 24 / bands.length;

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <clipPath id={clip}>
        <circle cx="12" cy="12" r="12" />
      </clipPath>
      <g clipPath={'url(#' + clip + ')'}>
        {bands.map((fill, i) =>
          dir === 'h' ? (
            <rect key={i} y={i * step} width="24" height={step} fill={fill} />
          ) : (
            <rect key={i} x={i * step} width={step} height="24" fill={fill} />
          ),
        )}
        {country === 'jp' ? <circle cx="12" cy="12" r="6" fill="#bc002d" /> : null}
      </g>
      <circle cx="12" cy="12" r="11.5" fill="none" stroke="rgb(21 23 28 / 0.12)" />
    </svg>
  );
}

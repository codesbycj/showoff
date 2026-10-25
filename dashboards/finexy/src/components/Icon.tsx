import { useId } from 'react';

/**
 * Every icon, on one 24px grid at one stroke width. Inline SVG, never an emoji.
 */
export type IconName =
  | 'sun'
  | 'moon'
  | 'grid'
  | 'calendar'
  | 'mail'
  | 'doc'
  | 'users'
  | 'layers'
  | 'settings'
  | 'help'
  | 'logout'
  | 'search'
  | 'bell'
  | 'info'
  | 'chevron-down'
  | 'chevron-right'
  | 'chevron-left'
  | 'plus'
  | 'check'
  | 'close'
  | 'transfer'
  | 'request'
  | 'filter'
  | 'dots'
  | 'card'
  | 'wallet'
  | 'trend-up'
  | 'trend-down'
  | 'mobile'
  | 'hotel'
  | 'flight'
  | 'grocery'
  | 'software';

const PATHS: Record<IconName, string> = {
  sun: 'M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4',
  moon: 'M20 14.2A8.4 8.4 0 0 1 9.8 4 8.5 8.5 0 1 0 20 14.2',
  grid: 'M4.5 5.5h6v6h-6zM13.5 5.5h6v6h-6zM4.5 12.5h6v6h-6zM13.5 12.5h6v6h-6z',
  calendar:
    'M4.5 7.5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2zM4.5 10.5h15M8.5 3.5v4M15.5 3.5v4',
  mail: 'M3.5 7a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2zM3.9 6.4 12 12.5l8.1-6.1',
  doc: 'M6 3.5h8l4.5 4.5v12.5H6zM14 3.5V8h4.5M9 13h6M9 16.5h4',
  users:
    'M9 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3.5 20c0-3.3 2.5-5.5 5.5-5.5s5.5 2.2 5.5 5.5M16 5.2a3.5 3.5 0 0 1 0 6.6M17.5 14.9c1.9.7 3 2.5 3 5.1',
  layers: 'm12 4 8 4.5-8 4.5-8-4.5zM4 13l8 4.5 8-4.5M4 17l8 4.5 8-4.5',
  settings:
    'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M19.5 12a7.5 7.5 0 0 0-.1-1.2l2-1.5-2-3.4-2.3 1a7.5 7.5 0 0 0-2.1-1.2l-.3-2.4h-4l-.3 2.4a7.5 7.5 0 0 0-2.1 1.2l-2.3-1-2 3.4 2 1.5a7.5 7.5 0 0 0 0 2.4l-2 1.5 2 3.4 2.3-1a7.5 7.5 0 0 0 2.1 1.2l.3 2.4h4l.3-2.4a7.5 7.5 0 0 0 2.1-1.2l2.3 1 2-3.4-2-1.5c.07-.4.1-.8.1-1.2z',
  help: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M9.8 9.6a2.3 2.3 0 0 1 4.4.8c0 1.6-2.2 2-2.2 3.4M12 17.3h.01',
  logout:
    'M14 7.5V5.5a1.5 1.5 0 0 0-1.5-1.5h-6A1.5 1.5 0 0 0 5 5.5v13A1.5 1.5 0 0 0 6.5 20h6a1.5 1.5 0 0 0 1.5-1.5v-2M10 12h9.5M17 9l3 3-3 3',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14M16.2 16.2 21 21',
  bell: 'M18 9a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6M13.7 20a2 2 0 0 1-3.4 0',
  info: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M12 11v5.5M12 7.8h.01',
  'chevron-down': 'm6 9.5 6 5.5 6-5.5',
  'chevron-right': 'm9.5 6 5.5 6-5.5 6',
  'chevron-left': 'm14.5 6-5.5 6 5.5 6',
  plus: 'M12 5.5v13M5.5 12h13',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  close: 'm6.5 6.5 11 11M17.5 6.5l-11 11',
  transfer: 'M4 9h13M13.5 5.5 17 9l-3.5 3.5M20 15H7M10.5 11.5 7 15l3.5 3.5',
  request: 'M20 9H7M10.5 5.5 7 9l3.5 3.5M4 15h13M13.5 11.5 17 15l-3.5 3.5',
  filter: 'M4 6.5h16M7 12h10M10 17.5h4',
  dots: 'M6 12h.01M12 12h.01M18 12h.01',
  card: 'M3.5 8a2.5 2.5 0 0 1 2.5-2.5h12A2.5 2.5 0 0 1 20.5 8v8a2.5 2.5 0 0 1-2.5 2.5H6A2.5 2.5 0 0 1 3.5 16zM3.5 10.5h17M7 14.5h3',
  wallet:
    'M4 8a2.5 2.5 0 0 1 2.5-2.5H17A2.5 2.5 0 0 1 19.5 8M4 8v9.5A2.5 2.5 0 0 0 6.5 20h11a2.5 2.5 0 0 0 2.5-2.5v-8H7A3 3 0 0 1 4 6.5M16.5 14.2a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6',
  'trend-up': 'M4 16.5 10 10l3.5 3.5L20 7M15 7h5v5',
  'trend-down': 'M4 7.5 10 14l3.5-3.5L20 17M15 17h5v-5',
  mobile: 'M7.5 3.5a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v17a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2zM10.5 19h3',
  hotel: 'M3.5 19.5V7l8.5-3.5L20.5 7v12.5M3.5 19.5h17M9.5 19.5v-5h5v5M9 10.5h6',
  flight:
    'M10.5 20.5 12 17l1.5 3.5M12 17l8.5-3.2a1.4 1.4 0 0 0 .9-1.3v-1.2L13.5 13V7a1.5 1.5 0 0 0-3 0v6L2.6 11.3v1.2c0 .6.4 1.1.9 1.3z',
  grocery:
    'M3.5 5.5h2.2l2.1 9.6a1.6 1.6 0 0 0 1.6 1.3h7.3a1.6 1.6 0 0 0 1.6-1.2l1.6-6.2H6.6M9.5 20a1.1 1.1 0 1 0 0-.01M16.5 20a1.1 1.1 0 1 0 0-.01',
  software:
    'M3.5 6.5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2zM8 20.5h8M12 17.5v3M9.5 9.5 7.5 11l2 1.5M14.5 9.5l2 1.5-2 1.5',
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

/** The Finexy mark: an orange disc with a rising stroke cut out of it. */
export function Logo({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <circle cx="16" cy="16" r="16" fill="var(--color-accent)" />
      <path
        d="M10 20.5 15 14l3.2 3.4L23 10"
        fill="none"
        stroke="#fff"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.6 10h4.6v4.4"
        fill="none"
        stroke="#fff"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A currency flag disc. Drawn, because Windows has no flag glyphs at all. */
export type Country = 'us' | 'eu' | 'gb';

export function Flag({ country, size = 18 }: { country: Country; size?: number }) {
  const clip = 'flag-' + country + '-' + useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <clipPath id={clip}>
        <circle cx="12" cy="12" r="12" />
      </clipPath>
      <g clipPath={'url(#' + clip + ')'}>
        {country === 'us' ? (
          <>
            <rect width="24" height="24" fill="#f4f5f7" />
            {[0, 2, 4, 6, 8, 10].map((i) => (
              <rect key={i} y={i * 2 + 1} width="24" height="1.85" fill="#b22234" />
            ))}
            <rect width="11" height="13" fill="#3c3b6e" />
          </>
        ) : null}
        {country === 'eu' ? (
          <>
            <rect width="24" height="24" fill="#003399" />
            {Array.from({ length: 12 }, (_, i) => {
              const a = (i / 12) * Math.PI * 2;
              return (
                <circle
                  key={i}
                  cx={12 + Math.sin(a) * 6.5}
                  cy={12 - Math.cos(a) * 6.5}
                  r="1.1"
                  fill="#ffcc00"
                />
              );
            })}
          </>
        ) : null}
        {country === 'gb' ? (
          <>
            <rect width="24" height="24" fill="#012169" />
            <path d="M0 0 24 24M24 0 0 24" stroke="#fff" strokeWidth="5" />
            <path d="M0 0 24 24M24 0 0 24" stroke="#c8102e" strokeWidth="2.6" />
            <path d="M12 0v24M0 12h24" stroke="#fff" strokeWidth="7.5" />
            <path d="M12 0v24M0 12h24" stroke="#c8102e" strokeWidth="4.2" />
          </>
        ) : null}
      </g>
      <circle cx="12" cy="12" r="11.5" fill="none" stroke="rgb(30 30 22 / 0.14)" />
    </svg>
  );
}

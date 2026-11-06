/**
 * Every icon, on one 24px grid at one stroke width. Inline SVG, never an
 * emoji (rule 8).
 */
export type IconName =
  | 'home'
  | 'clock'
  | 'calendar'
  | 'folder'
  | 'mail'
  | 'settings'
  | 'sun'
  | 'moon'
  | 'search'
  | 'bell'
  | 'expand'
  | 'book'
  | 'mic'
  | 'headphones'
  | 'pen'
  | 'cards'
  | 'play'
  | 'flame'
  | 'check'
  | 'close'
  | 'plus'
  | 'chevron-down'
  | 'chevron-right'
  | 'trophy'
  | 'target'
  | 'trend-up';

const PATHS: Record<IconName, string> = {
  home: 'M3.5 10.5 12 3.5l8.5 7v9h-5.5v-5.5h-6v5.5H3.5z',
  clock: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M12 7.5V12l3 2',
  calendar: 'M4.5 6.5h15v13h-15zM4.5 10.5h15M8.5 3.5v4M15.5 3.5v4',
  folder: 'M3.5 6.5h6l2 2.5h9v11h-17zM3.5 9h17',
  mail: 'M3.5 6.5h17v11h-17zM3.5 7l8.5 6 8.5-6',
  settings:
    'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M19.5 12a7.5 7.5 0 0 0-.1-1.2l2-1.5-2-3.4-2.3 1a7.5 7.5 0 0 0-2.1-1.2l-.3-2.4h-4l-.3 2.4a7.5 7.5 0 0 0-2.1 1.2l-2.3-1-2 3.4 2 1.5a7.5 7.5 0 0 0 0 2.4l-2 1.5 2 3.4 2.3-1a7.5 7.5 0 0 0 2.1 1.2l.3 2.4h4l.3-2.4a7.5 7.5 0 0 0 2.1-1.2l2.3 1 2-3.4-2-1.5c.07-.4.1-.8.1-1.2z',
  sun: 'M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4',
  moon: 'M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14M16.2 16.2 21 21',
  bell: 'M12 3.5a5.5 5.5 0 0 0-5.5 5.5c0 5-2 6.5-2 6.5h15s-2-1.5-2-6.5A5.5 5.5 0 0 0 12 3.5M10 19a2 2 0 0 0 4 0',
  expand: 'M14 4.5h5.5V10M10 19.5H4.5V14M19.5 4.5 13.5 10.5M4.5 19.5 10.5 13.5',
  book: 'M4 4.5h6a3 3 0 0 1 2 2.5v12a2.5 2.5 0 0 0-2-1.5H4zM20 4.5h-6a3 3 0 0 0-2 2.5v12a2.5 2.5 0 0 1 2-1.5h6z',
  mic: 'M12 3.5a2.5 2.5 0 0 0-2.5 2.5v6a2.5 2.5 0 0 0 5 0V6A2.5 2.5 0 0 0 12 3.5M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5v3M9 20.5h6',
  headphones:
    'M4 15v-3a8 8 0 0 1 16 0v3M4 13.5h2.5v6H5a1 1 0 0 1-1-1zM20 13.5h-2.5v6H19a1 1 0 0 0 1-1z',
  pen: 'M4.5 19.5h4l11-11-4-4-11 11zM15.5 4.5l4 4',
  cards: 'M7.5 7.5h12v12h-12zM4.5 15.5v-11h11',
  play: 'M8 5.5 18.5 12 8 18.5z',
  flame:
    'M12 21c3.6 0 6-2.4 6-5.6 0-4.4-4.5-6.4-4.5-10.4-2 1-3 2.8-3 5.2-1 0-2-.8-2.4-2C6.8 9.6 6 12 6 14.4 6 18 8.4 21 12 21',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  close: 'm6.5 6.5 11 11M17.5 6.5l-11 11',
  plus: 'M12 5v14M5 12h14',
  'chevron-down': 'm6 9.5 6 5.5 6-5.5',
  'chevron-right': 'm9.5 6 5.5 6-5.5 6',
  trophy:
    'M7 4.5h10v4a5 5 0 0 1-10 0zM7 6H4v1.5a3 3 0 0 0 3 3M17 6h3v1.5a3 3 0 0 1-3 3M12 13.5v4M8.5 20.5h7',
  target:
    'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8M12 11.5a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1',
  'trend-up': 'M4 16.5 10 10l3.5 3.5L20 7M15 7h5v5',
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
 * The Parlexa mark and wordmark.
 *
 * The reference sets a dark rounded tile with an abstract glyph in it and no
 * brand name anywhere. Same tile, invented mark: two speech tails meeting,
 * which is one language passing into another.
 */
export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="bg-panel grid h-[42px] w-[42px] shrink-0 place-items-center rounded-[14px]"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 5.5h10a4 4 0 0 1 0 8H8l-4 3.5z"
            stroke="var(--color-panel-fg)"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M20 9.5v7a4 4 0 0 1-4 4h-3"
            stroke="var(--color-accent)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {compact ? null : (
        <span className="text-ink text-[19px] leading-none font-bold tracking-[-0.02em]">
          Parlexa
        </span>
      )}
    </div>
  );
}

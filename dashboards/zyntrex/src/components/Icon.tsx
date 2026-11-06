/**
 * Every icon, on one 24px grid at one stroke width. Inline SVG, never an
 * emoji (rule 8).
 */
export type IconName =
  | 'search'
  | 'sun'
  | 'moon'
  | 'refresh'
  | 'info'
  | 'bell'
  | 'deposit'
  | 'withdraw'
  | 'swap'
  | 'transfer'
  | 'star'
  | 'star-filled'
  | 'chevron-down'
  | 'chevron-up'
  | 'chevron-right'
  | 'close'
  | 'check'
  | 'dots'
  | 'sort'
  | 'book'
  | 'candles'
  | 'ticket'
  | 'list'
  | 'wallet'
  | 'shield'
  | 'bolt'
  | 'clock'
  | 'trend-up'
  | 'trend-down';

const PATHS: Record<IconName, string> = {
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14M16.2 16.2 21 21',
  sun: 'M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4',
  moon: 'M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5',
  refresh: 'M20 8.5A8.5 8.5 0 1 0 20.5 14M20 3.5v5h-5',
  info: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M12 11v5.5M12 7.8h.01',
  bell: 'M12 3.5a5.5 5.5 0 0 0-5.5 5.5c0 5-2 6.5-2 6.5h15s-2-1.5-2-6.5A5.5 5.5 0 0 0 12 3.5M10 19a2 2 0 0 0 4 0',
  deposit: 'M12 4v10M8 10.5 12 14.5l4-4M4.5 17v3h15v-3',
  withdraw: 'M12 14.5v-10M8 8.5 12 4.5l4 4M4.5 17v3h15v-3',
  swap: 'M7.5 4.5v13M4 14.5l3.5 3.5 3.5-3.5M16.5 19.5v-13M13 9.5 16.5 6 20 9.5',
  transfer: 'M4 9h13M13.5 5.5 17 9l-3.5 3.5M20 15H7M10.5 11.5 7 15l3.5 3.5',
  star: 'm12 4 2.5 5.2 5.5.8-4 3.9.9 5.6-4.9-2.7-4.9 2.7.9-5.6-4-3.9 5.5-.8z',
  'star-filled': 'm12 4 2.5 5.2 5.5.8-4 3.9.9 5.6-4.9-2.7-4.9 2.7.9-5.6-4-3.9 5.5-.8z',
  'chevron-down': 'm6 9.5 6 5.5 6-5.5',
  'chevron-up': 'm6 14.5 6-5.5 6 5.5',
  'chevron-right': 'm9.5 6 5.5 6-5.5 6',
  close: 'm6.5 6.5 11 11M17.5 6.5l-11 11',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  dots: 'M6 12h.01M12 12h.01M18 12h.01',
  sort: 'm8 9.5 3-3 3 3M8 14.5l3 3 3-3',
  book: 'M4 6h7v12H4zM13 6h7v12h-7M4 10h7M4 14h7M13 10h7M13 14h7',
  candles: 'M7 4.5v15M7 8h-2.5v7H7zM16 4.5v15M16 7h-2.5v9H16z',
  ticket: 'M4.5 6.5h15v11h-15zM8 10h8M8 14h5',
  list: 'M4.5 7h15M4.5 12h15M4.5 17h15',
  wallet: 'M4 7.5h16v12H4zM4 7.5 16 4v3.5M16.5 13.5h3',
  shield: 'M12 3.5 20 6.5v5.5c0 4.6-3.3 7.6-8 9-4.7-1.4-8-4.4-8-9V6.5z',
  bolt: 'M13.5 3 5.5 13.5h6L10.5 21l8-10.5h-6z',
  clock: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M12 7.5V12l3 2',
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
      fill={name === 'star-filled' ? 'currentColor' : 'none'}
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
 * The Zyntrex mark and wordmark.
 *
 * The reference sets a coral rounded tile with three stacked bars in the
 * corner. Same arrangement, invented mark: a Z cut as three strokes — two
 * rails and the diagonal between them, which is also an order crossing a book.
 */
export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="bg-accent grid h-[34px] w-[34px] shrink-0 place-items-center rounded-[11px]"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 6.5h12L6 17.5h12"
            stroke="#fff"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {compact ? null : (
        <span className="text-ink text-[19px] leading-none font-bold tracking-[-0.02em]">
          Zyntrex
        </span>
      )}
    </div>
  );
}

/**
 * The disc beside an asset: a drawn circle carrying the ticker's first letter.
 *
 * Not the project's own logo. A token mark belongs to that project and every
 * figure beside it here is invented, so the disc is a letter on the asset's
 * own tint (rule 8).
 */
export function AssetDisc({
  symbol,
  tint,
  size = 30,
}: {
  symbol: string;
  tint: string;
  size?: number;
}) {
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, background: tint }}
      className="grid shrink-0 place-items-center rounded-full font-bold text-white"
    >
      <span style={{ fontSize: Math.round(size * 0.42) }} className="leading-none">
        {symbol.slice(0, 1)}
      </span>
    </span>
  );
}

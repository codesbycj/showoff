/**
 * Every icon, on one 24px grid at one stroke width. Inline SVG, never an emoji
 * (rule 8) — this design's upgrade card leans on a trophy and a crown, two of
 * the glyphs that differ most across platforms.
 */
export type IconName =
  | 'grid'
  | 'chart'
  | 'exchange'
  | 'invoice'
  | 'repeat'
  | 'layers'
  | 'message'
  | 'settings'
  | 'help'
  | 'logout'
  | 'search'
  | 'mail'
  | 'bell'
  | 'plus'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'check'
  | 'close'
  | 'dots'
  | 'calendar'
  | 'export'
  | 'arrow-up'
  | 'arrow-down'
  | 'trend-up'
  | 'trend-down'
  | 'dollar'
  | 'wallet'
  | 'filter'
  | 'target'
  | 'shield'
  | 'house'
  | 'plane'
  | 'trophy'
  | 'crown';

const PATHS: Record<IconName, string> = {
  grid: 'M4.5 5.5h6v6h-6zM13.5 5.5h6v6h-6zM4.5 12.5h6v6h-6zM13.5 12.5h6v6h-6z',
  chart: 'M4.5 19.5h15M7.5 16V9M12 16V5.5M16.5 16v-5',
  exchange: 'M4 9h13l-3-3M20 15H7l3 3',
  invoice: 'M6 3.5h12v17l-2.4-1.6-2.4 1.6-2.4-1.6L8.4 20.5 6 18.9zM9.5 8.5h5M9.5 12.5h5',
  repeat:
    'M4.5 11a5.5 5.5 0 0 1 5.5-5.5h9M15.5 2.5 19.5 5.5 15.5 8.5M19.5 13a5.5 5.5 0 0 1-5.5 5.5H5M8.5 15.5 4.5 18.5 8.5 21.5',
  layers: 'M12 3.5 3.5 8 12 12.5 20.5 8zM3.5 12 12 16.5 20.5 12M3.5 16 12 20.5 20.5 16',
  message:
    'M4 6.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-4.5 3.5V16.5H6a2 2 0 0 1-2-2z',
  settings:
    'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M19.5 12a7.5 7.5 0 0 0-.1-1.2l2-1.5-2-3.4-2.3 1a7.5 7.5 0 0 0-2.1-1.2l-.3-2.4h-4l-.3 2.4a7.5 7.5 0 0 0-2.1 1.2l-2.3-1-2 3.4 2 1.5a7.5 7.5 0 0 0 0 2.4l-2 1.5 2 3.4 2.3-1a7.5 7.5 0 0 0 2.1 1.2l.3 2.4h4l.3-2.4a7.5 7.5 0 0 0 2.1-1.2l2.3 1 2-3.4-2-1.5c.07-.4.1-.8.1-1.2z',
  help: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M9.6 9.6a2.5 2.5 0 1 1 2.9 2.9v1.3M12.5 17.3h.01',
  logout: 'M14 4.5h4a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-1.5 1.5h-4M11 8.5 7 12l4 3.5M7 12h9',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14M16.2 16.2 21 21',
  mail: 'M3.5 7a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2zM3.9 6.4 12 12.5l8.1-6.1',
  bell: 'M18 9a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6M13.7 20a2 2 0 0 1-3.4 0',
  plus: 'M12 5.5v13M5.5 12h13',
  'chevron-down': 'm6 9.5 6 5.5 6-5.5',
  'chevron-left': 'm14.5 6-5.5 6 5.5 6',
  'chevron-right': 'm9.5 6 5.5 6-5.5 6',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  close: 'm6.5 6.5 11 11M17.5 6.5l-11 11',
  dots: 'M6 12h.01M12 12h.01M18 12h.01',
  calendar:
    'M4.5 7.5a1.5 1.5 0 0 1 1.5-1.5h12a1.5 1.5 0 0 1 1.5 1.5v11a1.5 1.5 0 0 1-1.5 1.5H6a1.5 1.5 0 0 1-1.5-1.5zM4.5 10.5h15M8.5 3.5v4M15.5 3.5v4',
  export:
    'M12 15V4M7.5 8.5 12 4l4.5 4.5M4.5 15v3.5a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5V15',
  'arrow-up': 'M12 19.5v-15M6 10.5 12 4.5l6 6',
  'arrow-down': 'M12 4.5v15M6 13.5l6 6 6-6',
  'trend-up': 'M4 16.5 10 10l3.5 3.5L20 7M15 7h5v5',
  'trend-down': 'M4 7.5 10 14l3.5-3.5L20 17M15 17h5v-5',
  dollar:
    'M12 3.5v17M16 7.5a4 4 0 0 0-4-2c-2.2 0-4 1.2-4 3s1.8 2.6 4 3 4 1.2 4 3-1.8 3-4 3a4 4 0 0 1-4-2',
  wallet:
    'M3.5 7.5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2M3.5 7.5v10a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM16.5 13.5h.01',
  filter: 'M4 6.5h16M7 12h10M10 17.5h4',
  target:
    'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8M12 11.4a.6.6 0 1 0 0 1.2.6.6 0 0 0 0-1.2',
  shield: 'M12 3.5 5 6v6c0 4.5 3 7.5 7 8.5 4-1 7-4 7-8.5V6z',
  house: 'M4 10.6 12 4l8 6.6V19a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19zM9.5 20.5v-6h5v6',
  plane: 'M3.5 13.5 21 6l-4.5 9.5-3-2.5-3 4.5-1-5.5z',
  trophy:
    'M8 4.5h8v5a4 4 0 0 1-8 0zM8 6H5.5a2.5 2.5 0 0 0 2.5 4M16 6h2.5a2.5 2.5 0 0 1-2.5 4M10 13.5l-.5 3h5l-.5-3M8 19.5h8',
  crown: 'M4.5 8.5 7.5 13l4.5-6.5 4.5 6.5 3-4.5-1.5 10h-11z',
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

/* ----------------------------------------------------------- vendor marks */

/**
 * The transaction marks.
 *
 * The reference's rows carry three real software marks over invented prices in
 * an invented account (rule 8). These are six invented vendors, each a
 * distinct idea rather than a recoloured tile, so a row is identifiable at
 * 34px.
 */
export type MarkName = 'quill' | 'palette' | 'basket' | 'cloud' | 'bolt' | 'ticket';

const MARKS: Record<MarkName, { bg: string; fg: string; d: string }> = {
  quill: { bg: '#20324e', fg: '#cfe0f7', d: 'M5 19c6-1 10-5 13-13-7 1-11 5-13 13M8.5 15.5h4' },
  palette: {
    bg: '#4a2340',
    fg: '#f8dcf0',
    d: 'M12 4.5a7.5 7.5 0 0 0 0 15c1.4 0 1.6-1.3 1-2-.7-.9-.2-2 1-2h2a3.5 3.5 0 0 0 3.5-3.5c0-4-3.4-7.5-7.5-7.5M8.5 10h.01M12 8h.01M15.5 10h.01',
  },
  basket: {
    bg: '#2d4420',
    fg: '#dcf0c6',
    d: 'M4 9.5h16l-1.6 9.4a1.5 1.5 0 0 1-1.5 1.1H7.1a1.5 1.5 0 0 1-1.5-1.1zM9 6l-2 3.5M15 6l2 3.5',
  },
  cloud: {
    bg: '#123a4a',
    fg: '#cbe9f4',
    d: 'M7.5 18.5a4 4 0 0 1-.4-8 5.5 5.5 0 0 1 10.5 1.5 3.3 3.3 0 0 1-.6 6.5z',
  },
  bolt: { bg: '#5a3c12', fg: '#ffe9c2', d: 'M13.5 3.5 6 13.5h5l-1.5 7L18 10h-5z' },
  ticket: {
    bg: '#3b2436',
    fg: '#f6d9ec',
    d: 'M3.5 8.5a1 1 0 0 1 1-1h15a1 1 0 0 1 1 1v2a2 2 0 0 0 0 4v2a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-2a2 2 0 0 0 0-4zM14 8.5v1.5M14 14v1.5',
  },
};

export function Mark({ name, size = 34 }: { name: MarkName; size?: number }) {
  const m = MARKS[name];
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, background: m.bg }}
      className="grid shrink-0 place-items-center rounded-[10px]"
    >
      <svg
        width={size * 0.56}
        height={size * 0.56}
        viewBox="0 0 24 24"
        fill="none"
        stroke={m.fg}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={m.d} />
      </svg>
    </span>
  );
}

/**
 * The wallet discs.
 *
 * Drawn, not emoji: a flag emoji is simply absent on Windows and renders as
 * two letters in a box (rule 8). It is also not a traced flag — at 30px a
 * national flag is two or three bands and a disc, and reproducing the
 * arrangement would be tracing rather than drawing an idea. The code goes on
 * top, which is what actually identifies the wallet.
 */
export function CurrencyDisc({
  id,
  code,
  size = 30,
}: {
  id: 'usd' | 'eur' | 'bdt' | 'gbp';
  code: string;
  size?: number;
}) {
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, background: `var(--color-flag-${id})` }}
      className="grid shrink-0 place-items-center rounded-full text-[10px] font-bold text-white"
    >
      {code}
    </span>
  );
}

/**
 * The Talero mark and wordmark.
 *
 * The reference sets a green rounded tile with a leaf in it beside a bold
 * wordmark. Same arrangement, invented mark: an obelisk — a tapering shaft —
 * which is what the name says and is nobody's actual logo (rule 8).
 */
export function Wordmark() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="bg-accent-deep grid h-9 w-9 shrink-0 place-items-center rounded-[10px]">
        <svg width="19" height="19" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3 15.5 9.5 14 20h-4L8.5 9.5z" fill="#ffffff" />
          <path d="M8.5 9.5h7" stroke="var(--color-accent-deep)" strokeWidth="1.4" />
        </svg>
      </span>
      <span className="text-ink text-[17px] leading-none font-bold tracking-[-0.02em]">Talero</span>
    </div>
  );
}

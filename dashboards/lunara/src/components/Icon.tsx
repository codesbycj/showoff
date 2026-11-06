/**
 * Every icon, on one 24px grid at one stroke width. Inline SVG, never an
 * emoji (rule 8) — the reference puts a thumbs-up in its headline card, which
 * is exactly the glyph that renders three ways on three machines.
 */
export type IconName =
  | 'grid'
  | 'chart'
  | 'activity'
  | 'coins'
  | 'bell'
  | 'settings'
  | 'search'
  | 'calendar'
  | 'download'
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
  | 'star'
  | 'filter'
  | 'link'
  | 'wallet'
  | 'swap'
  | 'plus'
  | 'info'
  | 'sort';

const PATHS: Record<IconName, string> = {
  grid: 'M4.5 5.5h6v6h-6zM13.5 5.5h6v6h-6zM4.5 12.5h6v6h-6zM13.5 12.5h6v6h-6z',
  chart: 'M4.5 19.5h15M7 16.5v-5M11.5 16.5v-9M16 16.5v-6M20 16.5V8',
  activity: 'M3.5 12.5h4l3-7 4 14 3-7h3',
  coins: 'M9.5 12a6 6 0 1 0 0-8 6 6 0 0 0 0 8M14.5 20a6 6 0 1 0 0-8 6 6 0 0 0 0 8',
  bell: 'M18 9a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6M13.7 20a2 2 0 0 1-3.4 0',
  settings:
    'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M19.5 12a7.5 7.5 0 0 0-.1-1.2l2-1.5-2-3.4-2.3 1a7.5 7.5 0 0 0-2.1-1.2l-.3-2.4h-4l-.3 2.4a7.5 7.5 0 0 0-2.1 1.2l-2.3-1-2 3.4 2 1.5a7.5 7.5 0 0 0 0 2.4l-2 1.5 2 3.4 2.3-1a7.5 7.5 0 0 0 2.1 1.2l.3 2.4h4l.3-2.4a7.5 7.5 0 0 0 2.1-1.2l2.3 1 2-3.4-2-1.5c.07-.4.1-.8.1-1.2z',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14M16.2 16.2 21 21',
  calendar: 'M4.5 6.5h15v13h-15zM4.5 10.5h15M8.5 4v4M15.5 4v4',
  download: 'M12 4.5V16M7.5 11.5 12 16l4.5-4.5M4.5 19.5h15',
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
  star: 'm12 4 2.5 5.3 5.5.8-4 4.1 1 5.8-5-2.8-5 2.8 1-5.8-4-4.1 5.5-.8z',
  filter: 'M3.5 5.5h17l-6.5 7.5v6l-4 2v-8z',
  link: 'M10 13.5a3.5 3.5 0 0 0 5 0l3.5-3.5a3.5 3.5 0 0 0-5-5L12 6.5M14 10.5a3.5 3.5 0 0 0-5 0L5.5 14a3.5 3.5 0 0 0 5 5L12 17.5',
  wallet: 'M3.5 7.5h17v12h-17zM3.5 7.5 16 4v3.5M16.5 13.5h.01',
  swap: 'M4.5 8.5h13M14 5 17.5 8.5 14 12M19.5 15.5h-13M10 12 6.5 15.5 10 19',
  plus: 'M12 5v14M5 12h14',
  info: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M12 11v5.5M12 7.8h.01',
  sort: 'm8 9.5 3-3 3 3M8 14.5l3 3 3-3',
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
 * The Lunara mark and wordmark.
 *
 * The reference sets its name in bold with a full stop and no mark at all.
 * Same arrangement, plus an invented mark in the one place a tracker can use
 * one: three waxing discs, which is the name and is not the crescent every
 * other moon-ish brand draws.
 */
export function Wordmark() {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
        <circle cx="5.5" cy="12" r="3" fill="var(--color-accent)" opacity="0.35" />
        <circle cx="12" cy="12" r="4" fill="var(--color-accent)" opacity="0.65" />
        <circle cx="18.5" cy="12" r="5" fill="var(--color-accent)" />
      </svg>
      <span className="text-ink text-[19px] leading-none font-extrabold tracking-[-0.03em]">
        Lunara.
      </span>
    </div>
  );
}

/**
 * An asset disc. Drawn from the symbol's own initial on a pastel ground —
 * a token logo is a company's mark, and this build invents its figures, so it
 * must not carry one (rule 8).
 */
export function AssetDisc({
  symbol,
  tile,
  size = 34,
}: {
  symbol: string;
  tile: string;
  size?: number;
}) {
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, background: `var(${tile})` }}
      className="text-ink grid shrink-0 place-items-center rounded-full font-extrabold"
    >
      <span style={{ fontSize: Math.round(size * 0.36) }}>{symbol.slice(0, 2)}</span>
    </span>
  );
}

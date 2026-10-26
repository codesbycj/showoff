/**
 * Every icon, on one 24px grid at one stroke width. Inline SVG, never an emoji
 * (rule 8) — this design's sidebar is ten glyphs, its quick actions are four
 * more, and every saving plan has one.
 */
export type IconName =
  | 'grid'
  | 'send'
  | 'exchange'
  | 'invoice'
  | 'card'
  | 'piggy'
  | 'diamond'
  | 'mail'
  | 'tag'
  | 'bulb'
  | 'search'
  | 'chat'
  | 'bell'
  | 'chevron-down'
  | 'chevron-right'
  | 'dots-v'
  | 'filter'
  | 'plus'
  | 'top-up'
  | 'transfer'
  | 'request'
  | 'history'
  | 'shield'
  | 'palm'
  | 'house'
  | 'car'
  | 'wifi'
  | 'check'
  | 'close'
  | 'trend-up'
  | 'trend-down'
  | 'in'
  | 'out'
  | 'save'
  | 'lock';

const PATHS: Record<IconName, string> = {
  grid: 'M4.5 5.5h6v6h-6zM13.5 5.5h6v6h-6zM4.5 12.5h6v6h-6zM13.5 12.5h6v6h-6z',
  send: 'M3.5 8a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2zM3.5 10.5h17M14 15h3.5',
  exchange: 'M4 9h13l-3-3M20 15H7l3 3',
  invoice: 'M6 3.5h12v17l-2.4-1.6-2.4 1.6-2.4-1.6L8.4 20.5 6 18.9zM9.5 8.5h5M9.5 12.5h5',
  card: 'M3.5 7a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2zM3.5 10h17M7 15h3',
  piggy:
    'M5 12.5A6 6 0 0 1 11 7h3a6 6 0 0 1 6 5.5v3a2 2 0 0 1-2 2h-1v2h-3v-2h-3v2H8v-2.3A6 6 0 0 1 5 15H4a1.5 1.5 0 0 1 0-3zM16 11.5h.01M11 7V5.5a2 2 0 0 1 3.4-1.4',
  diamond: 'M5 9.5 8 5h8l3 4.5-7 10.5zM5 9.5h14M9.5 9.5 12 20M14.5 9.5 12 20',
  mail: 'M3.5 7a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2zM3.9 6.4 12 12.5l8.1-6.1',
  tag: 'M4.5 4.5h7l8 8-7 7-8-8zM8 8h.01',
  bulb: 'M9.5 17.5h5M10 20.5h4M12 3.5a5.5 5.5 0 0 1 3.2 10 2 2 0 0 0-.7 1.4v.6h-5v-.6a2 2 0 0 0-.7-1.4A5.5 5.5 0 0 1 12 3.5',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14M16.2 16.2 21 21',
  chat: 'M4 6.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-4.5 3.5V16.5H6a2 2 0 0 1-2-2z',
  bell: 'M18 9a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6M13.7 20a2 2 0 0 1-3.4 0',
  'chevron-down': 'm6 9.5 6 5.5 6-5.5',
  'chevron-right': 'm9.5 6 5.5 6-5.5 6',
  'dots-v': 'M12 6h.01M12 12h.01M12 18h.01',
  filter: 'M4 6.5h16M7 12h10M10 17.5h4',
  plus: 'M12 5.5v13M5.5 12h13',
  'top-up': 'M12 19.5v-13M6.5 12 12 6.5 17.5 12M5 21h14',
  transfer: 'M7 4.5 3.5 8 7 11.5M3.5 8h13M17 12.5l3.5 3.5-3.5 3.5M20.5 16h-13',
  request: 'M12 4.5v13M6.5 12 12 17.5 17.5 12M5 21h14',
  history: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M12 7.5V12l3 2M3.5 7.5 6 5',
  shield: 'M12 3.5 5 6v6c0 4.5 3 7.5 7 8.5 4-1 7-4 7-8.5V6z',
  palm: 'M12 20.5c0-6 .5-9 1.5-11M13.5 9.5c-2-2-5-2-7 0 2.5-.6 4.5 0 6 1M13.5 9.5c0-2.8 1.8-4.8 4.5-5-1.5 1.8-2 3.6-2 5M13.5 9.5c2.4-1.2 4.8-.6 6.5 1.5-2.3-.3-4 0-5.3 1',
  house: 'M4 10.6 12 4l8 6.6V19a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19zM9.5 20.5v-6h5v6',
  car: 'M4.5 16.5v-3.1L6.6 8h10.8l2.1 5.4v3.1M4.5 16.5h15M4.5 16.5v2h3v-2M16.5 16.5v2h3v-2M8 13h.01M16 13h.01',
  wifi: 'M8 13.5a6 6 0 0 1 8 0M5 10.5a10 10 0 0 1 14 0M11 16.8a2 2 0 0 1 2 0',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  close: 'm6.5 6.5 11 11M17.5 6.5l-11 11',
  'trend-up': 'M4 16.5 10 10l3.5 3.5L20 7M15 7h5v5',
  'trend-down': 'M4 7.5 10 14l3.5-3.5L20 17M15 17h5v-5',
  in: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M12 16.5v-9M8.5 11 12 7.5 15.5 11',
  out: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M12 7.5v9M8.5 13l3.5 3.5L15.5 13',
  save: 'M3.5 7a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2zM16.5 12h.01M3.5 10h8',
  lock: 'M6.5 10.5h11a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1M8.5 10.5V7.8a3.5 3.5 0 0 1 7 0v2.7',
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
 * The Corvane mark and wordmark.
 *
 * The reference's is a pair of stacked chevrons beside a set wordmark. Same
 * arrangement, invented mark: two offset coins seen edge-on, which is the idea
 * a money brand reaches for and is nobody's actual logo (rule 8).
 */
export function Wordmark() {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
        <ellipse cx="9" cy="9" rx="6.5" ry="4.2" fill="var(--color-forest)" />
        <ellipse cx="15" cy="15" rx="6.5" ry="4.2" fill="var(--color-accent)" />
      </svg>
      <span className="text-ink text-[17px] leading-none font-extrabold tracking-[0.02em] uppercase">
        Corvane
      </span>
    </div>
  );
}

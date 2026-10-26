/**
 * Every icon, on one 24px grid at one stroke width. Inline SVG, never an emoji.
 */
export type IconName =
  | 'grid'
  | 'bag'
  | 'box'
  | 'tags'
  | 'users'
  | 'star'
  | 'percent'
  | 'chart'
  | 'megaphone'
  | 'settings'
  | 'search'
  | 'bell'
  | 'plus'
  | 'check'
  | 'close'
  | 'chevron-down'
  | 'chevron-right'
  | 'arrow-up-right'
  | 'trend-up'
  | 'trend-down'
  | 'dots'
  | 'mail'
  | 'flag'
  | 'gift'
  | 'clock'
  | 'filter';

const PATHS: Record<IconName, string> = {
  grid: 'M4.5 5.5h6v6h-6zM13.5 5.5h6v6h-6zM4.5 12.5h6v6h-6zM13.5 12.5h6v6h-6z',
  bag: 'M5.5 7.5h13l-1.2 12a1.6 1.6 0 0 1-1.6 1.4H8.3a1.6 1.6 0 0 1-1.6-1.4zM8.5 10V7a3.5 3.5 0 0 1 7 0v3',
  box: 'M12 3.4 20 7.7v8.6L12 20.6 4 16.3V7.7zM4 7.7l8 4.3 8-4.3M12 12v8.6',
  tags: 'M4.5 4.5h7l8 8-7 7-8-8zM8 8h.01',
  users:
    'M9 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3.5 20c0-3.3 2.5-5.5 5.5-5.5s5.5 2.2 5.5 5.5M16 5.2a3.5 3.5 0 0 1 0 6.6M17.5 14.9c1.9.7 3 2.5 3 5.1',
  star: 'm12 4 2.5 5.3 5.5.8-4 4 1 5.9L12 17.2 7 20l1-5.9-4-4 5.5-.8z',
  percent:
    'M7 17 17 7M8 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M16 18.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5',
  chart: 'M4.5 19.5h15M7.5 16V9M12 16V5.5M16.5 16v-5',
  megaphone:
    'M4.5 10.5v3a1.5 1.5 0 0 0 1.5 1.5h2l6 4V5l-6 4H6a1.5 1.5 0 0 0-1.5 1.5M17.5 9.5a4 4 0 0 1 0 5M7.5 15v4',
  settings:
    'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M19.5 12a7.5 7.5 0 0 0-.1-1.2l2-1.5-2-3.4-2.3 1a7.5 7.5 0 0 0-2.1-1.2l-.3-2.4h-4l-.3 2.4a7.5 7.5 0 0 0-2.1 1.2l-2.3-1-2 3.4 2 1.5a7.5 7.5 0 0 0 0 2.4l-2 1.5 2 3.4 2.3-1a7.5 7.5 0 0 0 2.1 1.2l.3 2.4h4l.3-2.4a7.5 7.5 0 0 0 2.1-1.2l2.3 1 2-3.4-2-1.5c.07-.4.1-.8.1-1.2z',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14M16.2 16.2 21 21',
  bell: 'M18 9a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6M13.7 20a2 2 0 0 1-3.4 0',
  plus: 'M12 5.5v13M5.5 12h13',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  close: 'm6.5 6.5 11 11M17.5 6.5l-11 11',
  'chevron-down': 'm6 9.5 6 5.5 6-5.5',
  'chevron-right': 'm9.5 6 5.5 6-5.5 6',
  'arrow-up-right': 'M7.5 16.5 16.5 7.5M9.5 7.5h7v7',
  'trend-up': 'M4 16.5 10 10l3.5 3.5L20 7M15 7h5v5',
  'trend-down': 'M4 7.5 10 14l3.5-3.5L20 17M15 17h5v-5',
  dots: 'M6 12h.01M12 12h.01M18 12h.01',
  mail: 'M3.5 7a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2zM3.9 6.4 12 12.5l8.1-6.1',
  flag: 'M6 20.5V4.5h11l-2 3.5 2 3.5H6',
  gift: 'M3.5 9.5h17v4h-17zM5 13.5v7h14v-7M12 9.5v11M12 9.5S10.8 4.5 8.4 4.5a2.2 2.2 0 0 0 0 5M12 9.5s1.2-5 3.6-5a2.2 2.2 0 0 1 0 5',
  clock: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M12 7.5V12l3 2',
  filter: 'M4 6.5h16M7 12h10M10 17.5h4',
};

export function Icon({
  name,
  size = 17,
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
 * The Mylora wordmark.
 *
 * The reference sets its name in type with no mark at all, which is unusual
 * enough to be the design — so this is drawn type rather than a logo: the word
 * with a single amber counter in the O, which is the one piece of brand it
 * needs. Invented, like the copy around it (rule 8).
 */
export function Wordmark({ size = 20 }: { size?: number }) {
  return (
    <span
      className="text-ink inline-flex items-baseline gap-[1px] font-extrabold tracking-[-0.03em]"
      style={{ fontSize: size }}
    >
      Myl
      <span aria-hidden="true" className="relative inline-block" style={{ width: size * 0.52 }}>
        <svg
          viewBox="0 0 24 24"
          width={size * 0.52}
          height={size * 0.52}
          className="translate-y-[1px]"
        >
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="3.4" />
          <circle cx="12" cy="12" r="4" fill="var(--color-accent)" />
        </svg>
      </span>
      ra
    </span>
  );
}

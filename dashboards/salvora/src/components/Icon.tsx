/**
 * Every icon, on one 24px grid at one stroke width. Inline SVG, never an emoji
 * (rule 8).
 */
export type IconName =
  | 'grid'
  | 'chart'
  | 'users'
  | 'box'
  | 'chat'
  | 'exchange'
  | 'settings'
  | 'shield'
  | 'search'
  | 'inbox'
  | 'sliders'
  | 'plus'
  | 'chevron-down'
  | 'chevron-right'
  | 'arrow-right'
  | 'check'
  | 'close'
  | 'dots'
  | 'calendar'
  | 'trend-up'
  | 'trend-down'
  | 'eye'
  | 'tag'
  | 'filter'
  | 'star'
  | 'logout';

const PATHS: Record<IconName, string> = {
  grid: 'M4.5 5.5h6v6h-6zM13.5 5.5h6v6h-6zM4.5 12.5h6v6h-6zM13.5 12.5h6v6h-6z',
  chart: 'M4.5 19.5h15M7.5 16V9M12 16V5.5M16.5 16v-5',
  users:
    'M9 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3.5 20c0-3.3 2.5-5.5 5.5-5.5s5.5 2.2 5.5 5.5M16 5.2a3.5 3.5 0 0 1 0 6.6M17.5 14.9c1.9.7 3 2.5 3 5.1',
  box: 'M12 3.4 20 7.7v8.6L12 20.6 4 16.3V7.7zM4 7.7l8 4.3 8-4.3M12 12v8.6',
  chat: 'M4 6.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-4.5 3.5V16.5H6a2 2 0 0 1-2-2z',
  exchange: 'M4 9h13l-3-3M20 15H7l3 3',
  settings:
    'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M19.5 12a7.5 7.5 0 0 0-.1-1.2l2-1.5-2-3.4-2.3 1a7.5 7.5 0 0 0-2.1-1.2l-.3-2.4h-4l-.3 2.4a7.5 7.5 0 0 0-2.1 1.2l-2.3-1-2 3.4 2 1.5a7.5 7.5 0 0 0 0 2.4l-2 1.5 2 3.4 2.3-1a7.5 7.5 0 0 0 2.1 1.2l.3 2.4h4l.3-2.4a7.5 7.5 0 0 0 2.1-1.2l2.3 1 2-3.4-2-1.5c.07-.4.1-.8.1-1.2z',
  shield: 'M12 3.5 5 6v6c0 4.5 3 7.5 7 8.5 4-1 7-4 7-8.5V6z',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14M16.2 16.2 21 21',
  inbox:
    'M3.5 13.5 6 5.5h12l2.5 8v5a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5zM3.5 13.5h4l1.5 2.5h6l1.5-2.5h4',
  sliders: 'M5 7.5h14M5 16.5h14M9.5 5v5M15.5 14v5',
  plus: 'M12 5.5v13M5.5 12h13',
  'chevron-down': 'm6 9.5 6 5.5 6-5.5',
  'chevron-right': 'm9.5 6 5.5 6-5.5 6',
  'arrow-right': 'M4.5 12h14M13 6.5 18.5 12 13 17.5',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  close: 'm6.5 6.5 11 11M17.5 6.5l-11 11',
  dots: 'M6 12h.01M12 12h.01M18 12h.01',
  calendar:
    'M4.5 7.5a1.5 1.5 0 0 1 1.5-1.5h12a1.5 1.5 0 0 1 1.5 1.5v11a1.5 1.5 0 0 1-1.5 1.5H6a1.5 1.5 0 0 1-1.5-1.5zM4.5 10.5h15M8.5 3.5v4M15.5 3.5v4',
  'trend-up': 'M4 16.5 10 10l3.5 3.5L20 7M15 7h5v5',
  'trend-down': 'M4 7.5 10 14l3.5-3.5L20 17M15 17h5v-5',
  eye: 'M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12M12 14.8a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6',
  tag: 'M4.5 4.5h7l8 8-7 7-8-8zM8 8h.01',
  filter: 'M4 6.5h16M7 12h10M10 17.5h4',
  star: 'm12 4 2.5 5.3 5.5.8-4 4 1 5.9L12 17.2 7 20l1-5.9-4-4 5.5-.8z',
  logout: 'M14 4.5h4a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-1.5 1.5h-4M11 8.5 7 12l4 3.5M7 12h9',
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

/* ----------------------------------------------------------- product marks */

/**
 * The catalogue's own marks.
 *
 * The reference's transaction list carries a games console, a phone and a
 * coffee chain — three real marks over made-up order references in a made-up
 * store (rule 8). These are the goods themselves, drawn: a shirt is interface
 * at 32px in a list, not a photograph of a shirt.
 */
export type MarkName = 'tee' | 'console' | 'hoodie' | 'phone' | 'bag' | 'coffee' | 'cap' | 'shoe';

const MARKS: Record<MarkName, string> = {
  tee: 'M8.5 4.5 5 6.5l1.5 3.5 2-.8V19.5h7V9.2l2 .8L19 6.5l-3.5-2a3.5 3.5 0 0 1-7 0',
  console: 'M8 8.5h8a4.5 4.5 0 0 1 0 9H8a4.5 4.5 0 0 1 0-9M6.5 13h3M8 11.5v3M15 12h.01M17 14h.01',
  hoodie:
    'M8.5 4.5 5 6.5l1.5 3.5 2-.8V19.5h7V9.2l2 .8L19 6.5l-3.5-2M8.5 4.5a3.5 3.5 0 0 0 7 0M12 9v5',
  phone:
    'M7.5 3.5h9a1.5 1.5 0 0 1 1.5 1.5v14a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V5a1.5 1.5 0 0 1 1.5-1.5M10 5.5h4M11 17.5h2',
  bag: 'M5.5 7.5h13l-1.2 12a1.6 1.6 0 0 1-1.6 1.4H8.3a1.6 1.6 0 0 1-1.6-1.4zM8.5 10V7a3.5 3.5 0 0 1 7 0v3',
  coffee:
    'M5.5 8.5h11v6a4 4 0 0 1-4 4h-3a4 4 0 0 1-4-4zM16.5 10.5h1.5a2.5 2.5 0 0 1 0 5h-1.5M8 5.5c0-1 1-1 1-2M12 5.5c0-1 1-1 1-2',
  cap: 'M3.5 15.5c0-5 3.8-9 8.5-9s8.5 4 8.5 9zM3.5 15.5h17M12 6.5V4.5',
  shoe: 'M3.5 16.5c0-2 .5-3.5 1.5-5l3-4 3 2.5 2.5-1 3 3.5 3.5 1.5c1 .4 1.5 1.3 1.5 2.5H3.5zM3.5 16.5h17.5',
};

export function Mark({ name, size = 36 }: { name: MarkName; size?: number }) {
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size }}
      className="bg-sunken text-forest grid shrink-0 place-items-center rounded-[11px]"
    >
      <svg
        width={size * 0.56}
        height={size * 0.56}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={MARKS[name]} />
      </svg>
    </span>
  );
}

/**
 * The Dravelo mark and wordmark.
 *
 * The reference sets a small leaf-burst beside a lowercase wordmark. Same
 * arrangement, invented mark: four leaves off one stem, which is the shape a
 * green retail brand reaches for and is nobody's actual logo (rule 8).
 */
export function Wordmark({ onDark = false }: { onDark?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
        <path
          d="M12 21V8M12 8c0-3 2-5 5-5 0 3-2 5-5 5M12 11c0-2.6 1.8-4.4 4.5-4.4 0 2.6-1.8 4.4-4.5 4.4M12 8c0-3-2-5-5-5 0 3 2 5 5 5M12 11c0-2.6-1.8-4.4-4.5-4.4 0 2.6 1.8 4.4 4.5 4.4"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className={
          onDark
            ? 'text-forest-fg text-[17px] leading-none font-bold tracking-[-0.01em]'
            : 'text-ink text-[17px] leading-none font-bold tracking-[-0.01em]'
        }
      >
        Dravelo
      </span>
    </div>
  );
}

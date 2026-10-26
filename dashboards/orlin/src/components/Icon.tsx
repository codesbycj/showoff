/**
 * Every icon, on one 24px grid at one stroke width. Inline SVG, never an emoji
 * (rule 8).
 */
export type IconName =
  | 'home'
  | 'activity'
  | 'wallet'
  | 'settings'
  | 'menu'
  | 'search'
  | 'share'
  | 'calendar'
  | 'star'
  | 'shield'
  | 'logout'
  | 'mail'
  | 'bell'
  | 'plus'
  | 'chevron-down'
  | 'chevron-right'
  | 'check'
  | 'close'
  | 'sliders'
  | 'arrow-up-right'
  | 'arrow-up'
  | 'arrow-down'
  | 'trend-up'
  | 'trend-down'
  | 'export'
  | 'filter'
  | 'eye'
  | 'eye-off'
  | 'link';

const PATHS: Record<IconName, string> = {
  home: 'M4 10.6 12 4l8 6.6V19a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19zM9.5 20.5v-6h5v6',
  activity: 'M3.5 12.5h4l3-7 4 14 3-7h3',
  wallet:
    'M3.5 7.5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2M3.5 7.5v10a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM16.5 13.5h.01',
  settings:
    'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M19.5 12a7.5 7.5 0 0 0-.1-1.2l2-1.5-2-3.4-2.3 1a7.5 7.5 0 0 0-2.1-1.2l-.3-2.4h-4l-.3 2.4a7.5 7.5 0 0 0-2.1 1.2l-2.3-1-2 3.4 2 1.5a7.5 7.5 0 0 0 0 2.4l-2 1.5 2 3.4 2.3-1a7.5 7.5 0 0 0 2.1 1.2l.3 2.4h4l.3-2.4a7.5 7.5 0 0 0 2.1-1.2l2.3 1 2-3.4-2-1.5c.07-.4.1-.8.1-1.2z',
  menu: 'M4.5 7.5h15M4.5 12h15M4.5 16.5h15',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14M16.2 16.2 21 21',
  share:
    'M17.5 8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M6.5 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M17.5 20.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M8.7 10.8l6.6-3.6M8.7 13.2l6.6 3.6',
  calendar:
    'M4.5 7.5a1.5 1.5 0 0 1 1.5-1.5h12a1.5 1.5 0 0 1 1.5 1.5v11a1.5 1.5 0 0 1-1.5 1.5H6a1.5 1.5 0 0 1-1.5-1.5zM4.5 10.5h15M8.5 3.5v4M15.5 3.5v4',
  star: 'm12 4 2.5 5.3 5.5.8-4 4 1 5.9L12 17.2 7 20l1-5.9-4-4 5.5-.8z',
  shield: 'M12 3.5 5 6v6c0 4.5 3 7.5 7 8.5 4-1 7-4 7-8.5V6z',
  logout: 'M14 4.5h4a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-1.5 1.5h-4M11 8.5 7 12l4 3.5M7 12h9',
  mail: 'M3.5 7a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2zM3.9 6.4 12 12.5l8.1-6.1',
  bell: 'M18 9a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6M13.7 20a2 2 0 0 1-3.4 0',
  plus: 'M12 5.5v13M5.5 12h13',
  'chevron-down': 'm6 9.5 6 5.5 6-5.5',
  'chevron-right': 'm9.5 6 5.5 6-5.5 6',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  close: 'm6.5 6.5 11 11M17.5 6.5l-11 11',
  sliders: 'M5 7.5h14M5 16.5h14M9.5 5v5M15.5 14v5',
  'arrow-up-right': 'M7.5 16.5 16.5 7.5M9.5 7.5h7v7',
  'arrow-up': 'M12 19.5v-15M6 10.5 12 4.5l6 6',
  'arrow-down': 'M12 4.5v15M6 13.5l6 6 6-6',
  'trend-up': 'M4 16.5 10 10l3.5 3.5L20 7M15 7h5v5',
  'trend-down': 'M4 7.5 10 14l3.5-3.5L20 17M15 17h5v-5',
  export:
    'M12 15V4M7.5 8.5 12 4l4.5 4.5M4.5 15v3.5a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5V15',
  filter: 'M4 6.5h16M7 12h10M10 17.5h4',
  eye: 'M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12M12 14.8a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6',
  'eye-off':
    'M4 4.5 20 20M9.6 9.8a2.8 2.8 0 0 0 3.9 3.9M6.9 7.1C4.3 8.7 2.5 12 2.5 12S6 18.5 12 18.5c1.6 0 3-.4 4.2-1M18.6 15.3c1.9-1.6 2.9-3.3 2.9-3.3S18 5.5 12 5.5c-.6 0-1.2.06-1.7.17',
  link: 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1.7 1.7M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.7-1.7',
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
 * The Stakvio mark and wordmark.
 *
 * The reference sets two offset dots — one orange, one near-black — beside a
 * wordmark with its last two letters bolded. Same arrangement, invented mark:
 * a filled dot and a ring, which is the idea of a position held against one
 * still open.
 */
export function Wordmark() {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
        <circle cx="8" cy="12" r="5" fill="var(--color-accent)" />
        <circle cx="16" cy="12" r="4.2" fill="none" stroke="var(--color-cocoa)" strokeWidth="2.6" />
      </svg>
      <span className="text-ink text-[17px] leading-none font-medium tracking-[-0.01em]">
        Stak<span className="font-bold">vio</span>
      </span>
    </div>
  );
}

/**
 * Every icon, on one 24px grid at one stroke width. Inline SVG, never an
 * emoji (rule 8).
 */
export type IconName =
  | 'home'
  | 'video'
  | 'people'
  | 'calendar'
  | 'folder'
  | 'settings'
  | 'logout'
  | 'search'
  | 'bell'
  | 'bell-off'
  | 'plus'
  | 'play'
  | 'comment'
  | 'eye'
  | 'link'
  | 'at'
  | 'clock'
  | 'check'
  | 'close'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-down'
  | 'dots'
  | 'arrow-right'
  | 'focus'
  | 'share'
  | 'trend-up'
  | 'trend-down';

const PATHS: Record<IconName, string> = {
  home: 'M3.5 10.5 12 3.5l8.5 7v9h-5.5v-5.5h-6v5.5H3.5z',
  video: 'M3.5 6.5h11v11h-11zM14.5 10l6-3.5v11l-6-3.5z',
  people:
    'M9 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M2.5 20c0-3.4 2.9-5.5 6.5-5.5s6.5 2.1 6.5 5.5M16 5.2a3.5 3.5 0 0 1 0 6.6M18.5 14.8c1.9.7 3 2.5 3 5.2',
  calendar: 'M4.5 6.5h15v13h-15zM4.5 10.5h15M8.5 3.5v4M15.5 3.5v4',
  folder: 'M3.5 6.5h6l2 2.5h9v11h-17zM3.5 9h17',
  settings:
    'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M19.5 12a7.5 7.5 0 0 0-.1-1.2l2-1.5-2-3.4-2.3 1a7.5 7.5 0 0 0-2.1-1.2l-.3-2.4h-4l-.3 2.4a7.5 7.5 0 0 0-2.1 1.2l-2.3-1-2 3.4 2 1.5a7.5 7.5 0 0 0 0 2.4l-2 1.5 2 3.4 2.3-1a7.5 7.5 0 0 0 2.1 1.2l.3 2.4h4l.3-2.4a7.5 7.5 0 0 0 2.1-1.2l2.3 1 2-3.4-2-1.5c.07-.4.1-.8.1-1.2z',
  logout: 'M14 4.5H4.5v15H14M10 12h10.5M17 8.5l3.5 3.5-3.5 3.5',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14M16.2 16.2 21 21',
  bell: 'M12 3.5a5.5 5.5 0 0 0-5.5 5.5c0 5-2 6.5-2 6.5h15s-2-1.5-2-6.5A5.5 5.5 0 0 0 12 3.5M10 19a2 2 0 0 0 4 0',
  'bell-off':
    'M8 4.8A5.5 5.5 0 0 1 17.5 9c0 5 2 6.5 2 6.5H9M6.6 7.4A5.5 5.5 0 0 0 6.5 9c0 5-2 6.5-2 6.5h3M10 19a2 2 0 0 0 4 0M4 4l16 16',
  plus: 'M12 5v14M5 12h14',
  play: 'M8 5.5 18.5 12 8 18.5z',
  comment: 'M4 5.5h16v11h-9.5L6 20.5v-4H4z',
  eye: 'M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6',
  link: 'M10 13.5a4 4 0 0 0 6 .5l2.5-2.5a4 4 0 0 0-5.7-5.7L11.5 7M14 10.5a4 4 0 0 0-6-.5L5.5 12.5a4 4 0 0 0 5.7 5.7L12.5 17',
  at: 'M15.5 12a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0v1.5a2.5 2.5 0 0 0 5 0V12a8.5 8.5 0 1 0-3.5 6.9',
  clock: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M12 7.5V12l3 2',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  close: 'm6.5 6.5 11 11M17.5 6.5l-11 11',
  'chevron-left': 'm14.5 6-5.5 6 5.5 6',
  'chevron-right': 'm9.5 6 5.5 6-5.5 6',
  'chevron-down': 'm6 9.5 6 5.5 6-5.5',
  dots: 'M6 12h.01M12 12h.01M18 12h.01',
  'arrow-right': 'M4.5 12h14M13 6.5 18.5 12 13 17.5',
  focus:
    'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8M12 11.5a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1',
  share:
    'M17 8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M7 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M17 20.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M9.2 10.8l5.6-3.1M9.2 13.2l5.6 3.1',
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
 * The Hivora mark.
 *
 * The reference sets an abstract white glyph at the top of its black rail and
 * names nothing. Same place, invented mark: three strokes leaning the same
 * way, which is a team moving together and also the hive the name points at.
 */
export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M5 17 10 7M10.5 17 15.5 7M16 17 21 7"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
      {compact ? null : (
        <span className="text-[18px] leading-none font-extrabold tracking-[-0.02em]">Hivora</span>
      )}
    </div>
  );
}

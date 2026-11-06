/**
 * Every icon, on one 24px grid at one stroke width. Inline SVG, never an
 * emoji (rule 8).
 */
export type IconName =
  | 'board'
  | 'list'
  | 'calendar'
  | 'chart'
  | 'people'
  | 'briefcase'
  | 'settings'
  | 'search'
  | 'bell'
  | 'help'
  | 'plus'
  | 'filter'
  | 'comment'
  | 'paperclip'
  | 'clock'
  | 'check'
  | 'close'
  | 'chevron-down'
  | 'chevron-right'
  | 'dots'
  | 'flag'
  | 'bolt';

const PATHS: Record<IconName, string> = {
  board: 'M4.5 4.5h5v15h-5zM14.5 4.5h5v9h-5z',
  list: 'M4.5 7h15M4.5 12h15M4.5 17h10',
  calendar: 'M4.5 6.5h15v13h-15zM4.5 10.5h15M8.5 3.5v4M15.5 3.5v4',
  chart: 'M4 19.5h16M7 16V9M12 16V5.5M17 16v-5',
  people:
    'M9 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M2.5 20c0-3.4 2.9-5.5 6.5-5.5s6.5 2.1 6.5 5.5M16 5.2a3.5 3.5 0 0 1 0 6.6M18.5 14.8c1.9.7 3 2.5 3 5.2',
  briefcase: 'M3.5 8.5h17v11h-17zM8.5 8.5v-3a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v3M3.5 13h17',
  settings:
    'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M19.5 12a7.5 7.5 0 0 0-.1-1.2l2-1.5-2-3.4-2.3 1a7.5 7.5 0 0 0-2.1-1.2l-.3-2.4h-4l-.3 2.4a7.5 7.5 0 0 0-2.1 1.2l-2.3-1-2 3.4 2 1.5a7.5 7.5 0 0 0 0 2.4l-2 1.5 2 3.4 2.3-1a7.5 7.5 0 0 0 2.1 1.2l.3 2.4h4l.3-2.4a7.5 7.5 0 0 0 2.1-1.2l2.3 1 2-3.4-2-1.5c.07-.4.1-.8.1-1.2z',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14M16.2 16.2 21 21',
  bell: 'M12 3.5a5.5 5.5 0 0 0-5.5 5.5c0 5-2 6.5-2 6.5h15s-2-1.5-2-6.5A5.5 5.5 0 0 0 12 3.5M10 19a2 2 0 0 0 4 0',
  help: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M9.5 9.5a2.5 2.5 0 1 1 3.3 2.4c-.5.2-.8.7-.8 1.2v.9M12 17h.01',
  plus: 'M12 5v14M5 12h14',
  filter: 'M3.5 5.5h17l-6.5 7.5v6l-4 2v-8z',
  comment: 'M4 5.5h16v11h-9.5L6 20.5v-4H4z',
  paperclip:
    'M19 11.5 12 18.5a4.5 4.5 0 0 1-6.4-6.4l7.5-7.5a3 3 0 0 1 4.3 4.3l-7.5 7.5a1.5 1.5 0 0 1-2.1-2.1l6.8-6.8',
  clock: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M12 7.5V12l3 2',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  close: 'm6.5 6.5 11 11M17.5 6.5l-11 11',
  'chevron-down': 'm6 9.5 6 5.5 6-5.5',
  'chevron-right': 'm9.5 6 5.5 6-5.5 6',
  dots: 'M6 12h.01M12 12h.01M18 12h.01',
  flag: 'M5.5 20.5v-16h12l-2.5 4 2.5 4h-12',
  bolt: 'M13.5 3 5.5 13.5h6L10.5 21l8-10.5h-6z',
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
 * The Tasklio mark and wordmark.
 *
 * The reference sets a lilac rounded square with an abstract glyph in it, over
 * a name it goes on to misspell inside one of its own cards. Same tile,
 * invented mark: three bars of different lengths, which is a board seen from
 * the side.
 */
export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="bg-accent-deep grid h-[34px] w-[34px] shrink-0 place-items-center rounded-[11px]"
      >
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
          <path d="M6 6h12M6 12h8M6 18h4" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </span>
      {compact ? null : (
        <span className="text-ink text-[18px] leading-none font-bold tracking-[-0.02em]">
          Tasklio
        </span>
      )}
    </div>
  );
}

/**
 * Every icon, on one 24px grid at one stroke width. Inline SVG, never an
 * emoji (rule 8) — which is also why the reference's waving hand beside
 * "Hello" is gone: it is a different drawing on every platform.
 */
export type IconName =
  | 'cap'
  | 'play'
  | 'pause'
  | 'skip-back'
  | 'skip-forward'
  | 'book'
  | 'clipboard'
  | 'calendar'
  | 'chat'
  | 'settings'
  | 'search'
  | 'sun'
  | 'moon'
  | 'star'
  | 'star-filled'
  | 'clock'
  | 'target'
  | 'flame'
  | 'people'
  | 'eye'
  | 'comment'
  | 'check'
  | 'close'
  | 'plus'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-down'
  | 'dots'
  | 'pen'
  | 'type'
  | 'brush'
  | 'code';

const PATHS: Record<IconName, string> = {
  cap: 'M2.5 8.5 12 4.5l9.5 4-9.5 4zM6.5 10.5v5c0 1.7 2.5 3 5.5 3s5.5-1.3 5.5-3v-5M20.5 9v5.5',
  play: 'M8 5.5 18.5 12 8 18.5z',
  pause: 'M8.5 5v14M15.5 5v14',
  'skip-back': 'M18.5 5.5v13L9 12zM5.5 5.5v13',
  'skip-forward': 'M5.5 5.5v13L15 12zM18.5 5.5v13',
  book: 'M4 4.5h6a3 3 0 0 1 2 2.5v12a2.5 2.5 0 0 0-2-1.5H4zM20 4.5h-6a3 3 0 0 0-2 2.5v12a2.5 2.5 0 0 1 2-1.5h6z',
  clipboard: 'M8 4.5H6.5v15h11v-15H16M9 3h6v3H9zM9 11h6M9 15h4',
  calendar: 'M4.5 6.5h15v13h-15zM4.5 10.5h15M8.5 3.5v4M15.5 3.5v4',
  chat: 'M4 5.5h16v11h-9.5L6 20.5v-4H4z',
  settings:
    'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M19.5 12a7.5 7.5 0 0 0-.1-1.2l2-1.5-2-3.4-2.3 1a7.5 7.5 0 0 0-2.1-1.2l-.3-2.4h-4l-.3 2.4a7.5 7.5 0 0 0-2.1 1.2l-2.3-1-2 3.4 2 1.5a7.5 7.5 0 0 0 0 2.4l-2 1.5 2 3.4 2.3-1a7.5 7.5 0 0 0 2.1 1.2l.3 2.4h4l.3-2.4a7.5 7.5 0 0 0 2.1-1.2l2.3 1 2-3.4-2-1.5c.07-.4.1-.8.1-1.2z',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14M16.2 16.2 21 21',
  sun: 'M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4',
  moon: 'M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5',
  star: 'm12 4 2.5 5.2 5.5.8-4 3.9.9 5.6-4.9-2.7-4.9 2.7.9-5.6-4-3.9 5.5-.8z',
  'star-filled': 'm12 4 2.5 5.2 5.5.8-4 3.9.9 5.6-4.9-2.7-4.9 2.7.9-5.6-4-3.9 5.5-.8z',
  clock: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M12 7.5V12l3 2',
  target:
    'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8M12 11.5a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1',
  flame:
    'M12 21c3.6 0 6-2.4 6-5.6 0-4.4-4.5-6.4-4.5-10.4-2 1-3 2.8-3 5.2-1 0-2-.8-2.4-2C6.8 9.6 6 12 6 14.4 6 18 8.4 21 12 21',
  people:
    'M9 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M2.5 20c0-3.4 2.9-5.5 6.5-5.5s6.5 2.1 6.5 5.5M16 5.2a3.5 3.5 0 0 1 0 6.6M18.5 14.8c1.9.7 3 2.5 3 5.2',
  eye: 'M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6',
  comment: 'M4 5.5h16v11h-9.5L6 20.5v-4H4z',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  close: 'm6.5 6.5 11 11M17.5 6.5l-11 11',
  plus: 'M12 5v14M5 12h14',
  'chevron-left': 'm14.5 6-5.5 6 5.5 6',
  'chevron-right': 'm9.5 6 5.5 6-5.5 6',
  'chevron-down': 'm6 9.5 6 5.5 6-5.5',
  dots: 'M6 12h.01M12 12h.01M18 12h.01',
  pen: 'M4.5 19.5h4l11-11-4-4-11 11zM15.5 4.5l4 4',
  type: 'M5 6.5V4.5h14v2M12 4.5v15M9 19.5h6',
  brush: 'M14 3.5 20.5 10 11 19.5H4.5V13zM9.5 8 16 14.5',
  code: 'm8 8.5-4.5 3.5L8 15.5M16 8.5l4.5 3.5-4.5 3.5M13.5 5l-3 14',
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
 * The Skillra mark and wordmark.
 *
 * The reference sets a black graduation cap over the name "Quest" — which is
 * a real product in this category, so the name goes. Same idiom, invented
 * mark: a cap drawn as one stroke with the tassel as the accent.
 */
export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="bg-invert text-invert-accent grid h-[38px] w-[38px] shrink-0 place-items-center rounded-[13px]"
      >
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
          <path
            d="M2.5 8.5 12 4.5l9.5 4-9.5 4zM6.5 10.8v4.7c0 1.7 2.5 3 5.5 3s5.5-1.3 5.5-3v-4.7"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M20.5 9v6"
            stroke="var(--color-accent)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </span>
      {compact ? null : (
        <span className="text-ink text-[18px] leading-none font-extrabold tracking-[-0.02em]">
          Skillra
        </span>
      )}
    </div>
  );
}

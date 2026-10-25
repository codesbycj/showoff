/**
 * Every icon, on one 24px grid at one stroke width. Inline SVG, never an emoji:
 * the reference uses 👋 🔥 👍 as content, and those three render differently on
 * Windows, Android and iOS — one of them in a different skin tone. They are
 * drawn here instead, at the foot of this file.
 */
export type IconName =
  | 'grid'
  | 'tasks'
  | 'calendar'
  | 'team'
  | 'report'
  | 'settings'
  | 'search'
  | 'sliders'
  | 'bell'
  | 'sun'
  | 'moon'
  | 'plus'
  | 'close'
  | 'check'
  | 'chevron-down'
  | 'chevron-right'
  | 'chevron-left'
  | 'dots'
  | 'stack'
  | 'lock'
  | 'comment'
  | 'link'
  | 'checklist'
  | 'video'
  | 'mic'
  | 'send'
  | 'smile'
  | 'clock'
  | 'stop'
  | 'note'
  | 'folder'
  | 'user-plus';

const PATHS: Record<IconName, string> = {
  grid: 'M4.5 5.5h6v6h-6zM13.5 5.5h6v6h-6zM4.5 12.5h6v6h-6zM13.5 12.5h6v6h-6z',
  tasks:
    'M9 6.5h10.5M9 12h10.5M9 17.5h10.5M4.5 6.5l1.2 1.2 2-2.2M4.5 12l1.2 1.2 2-2.2M4.5 17.5l1.2 1.2 2-2.2',
  calendar:
    'M4.5 7.5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2zM4.5 10.5h15M8.5 3.5v4M15.5 3.5v4',
  team: 'M8.5 11a3.3 3.3 0 1 0 0-6.6 3.3 3.3 0 0 0 0 6.6M2.8 20c0-3.2 2.6-5.7 5.7-5.7s5.7 2.5 5.7 5.7M16.5 10.5a2.6 2.6 0 1 0 0-5.2M18 14.6c2 .6 3.2 2.4 3.2 5.4',
  report: 'M6 3.5h8l4.5 4.5v12.5H6zM14 3.5V8h4.5M9 13h6M9 16.5h4',
  settings:
    'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M19.5 12a7.5 7.5 0 0 0-.1-1.2l2-1.5-2-3.4-2.3 1a7.5 7.5 0 0 0-2.1-1.2l-.3-2.4h-4l-.3 2.4a7.5 7.5 0 0 0-2.1 1.2l-2.3-1-2 3.4 2 1.5a7.5 7.5 0 0 0 0 2.4l-2 1.5 2 3.4 2.3-1a7.5 7.5 0 0 0 2.1 1.2l.3 2.4h4l.3-2.4a7.5 7.5 0 0 0 2.1-1.2l2.3 1 2-3.4-2-1.5c.07-.4.1-.8.1-1.2z',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14M16.2 16.2 21 21',
  sliders: 'M4.5 8h10M17.5 8h2M4.5 16h4M11.5 16h8M15.5 5.5v5M8.5 13.5v5',
  bell: 'M18 9a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6M13.7 20a2 2 0 0 1-3.4 0',
  sun: 'M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4',
  moon: 'M20 14.2A8.4 8.4 0 0 1 9.8 4 8.5 8.5 0 1 0 20 14.2',
  plus: 'M12 5.5v13M5.5 12h13',
  close: 'm6.5 6.5 11 11M17.5 6.5l-11 11',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  'chevron-down': 'm6 9.5 6 5.5 6-5.5',
  'chevron-right': 'm9.5 6 5.5 6-5.5 6',
  'chevron-left': 'm14.5 6-5.5 6 5.5 6',
  dots: 'M6 12h.01M12 12h.01M18 12h.01',
  stack: 'm12 4 7 4-7 4-7-4zM5 12l7 4 7-4M5 16l7 4 7-4',
  lock: 'M7 10.5V8a5 5 0 0 1 10 0v2.5M5.5 10.5h13v9h-13zM12 14v2',
  comment:
    'M4.5 7a2.5 2.5 0 0 1 2.5-2.5h10A2.5 2.5 0 0 1 19.5 7v7a2.5 2.5 0 0 1-2.5 2.5H9l-4.5 3.5z',
  link: 'M10.5 13.5a4 4 0 0 0 5.7 0l2.8-2.8a4 4 0 1 0-5.7-5.7L11.7 6.6M13.5 10.5a4 4 0 0 0-5.7 0l-2.8 2.8a4 4 0 1 0 5.7 5.7l1.6-1.6',
  checklist:
    'M4.5 8.5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2zM8 12.5l2 2 4-4',
  video:
    'M3.5 8.5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2zM15.5 11l5-3v8l-5-3z',
  mic: 'M12 3.5a2.5 2.5 0 0 1 2.5 2.5v6a2.5 2.5 0 0 1-5 0V6A2.5 2.5 0 0 1 12 3.5M6 11.5a6 6 0 0 0 12 0M12 17.5v3',
  send: 'M20 4 3.5 10.5l6.5 2.5 2.5 6.5z',
  smile:
    'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M9 10h.01M15 10h.01M8.5 14a4.5 4.5 0 0 0 7 0',
  clock: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M12 7.5V12l3 2',
  stop: 'M7.5 7.5h9v9h-9z',
  note: 'M5.5 5.5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v13l-3-2-3 2-3-2-3 2zM9 9h6M9 12.5h4',
  folder:
    'M3.5 7.5A2 2 0 0 1 5.5 5.5h3.6a2 2 0 0 1 1.5.7l1 1.3h6.9a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z',
  'user-plus':
    'M10 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3.5 20c0-3.3 2.9-5.5 6.5-5.5 1.2 0 2.3.2 3.2.7M17.5 13.5v6M14.5 16.5h6',
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
 * The Taskly mark: a lilac rounded square with a tick cut out as a rising
 * stroke. Invented, in the reference's idiom (rule 8).
 */
export function Logo({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="10" fill="var(--color-accent)" />
      <path
        d="M9 17.5l4 4L23 10"
        fill="none"
        stroke="#fff"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* The three emoji the reference uses as content, drawn so they are the same on
   every platform. A waving hand, a flame and a thumbs-up are all small objects:
   in drawing range. */

export function Wave({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M8.2 12.6 6.9 10a1.4 1.4 0 0 1 2.4-1.4l1 1.7-2-4.5a1.4 1.4 0 0 1 2.5-1.2l2 4.3-.9-2.6a1.4 1.4 0 1 1 2.6-.9l1.3 3.6.2-1.3a1.3 1.3 0 0 1 2.6.4c-.5 4.1-.9 6.6-2.5 8.2-2.2 2.2-5.6 2-7.5-.2-.9-1-1.6-2-2.4-3.5Z"
        fill="#f6b73c"
        stroke="#d1902a"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Flame({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M13 2.5c.8 3.2-.6 4.8-2.2 6.3-1.8 1.7-3.8 3.3-3.8 6.4a7 7 0 0 0 14 0c0-3.6-2.1-5.6-3.6-7.4-.4 1.2-1.2 1.9-2.2 2.3.6-2.6-.4-5.6-2.2-7.6Z"
        fill="#f4733b"
      />
      <path
        d="M12 12.5c1.6 1.4 2.4 2.6 2.4 4a2.6 2.6 0 0 1-5.2 0c0-1.3.9-2.6 2.8-4Z"
        fill="#f8c23f"
      />
    </svg>
  );
}

export function ThumbsUp({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M9.5 10.5 13 3.4a1.8 1.8 0 0 1 3.4 1l-.8 4.4h4a2 2 0 0 1 2 2.4l-1.4 7A2 2 0 0 1 18.2 20H9.5Z"
        fill="#f6b73c"
        stroke="#d1902a"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <rect
        x="3.5"
        y="10"
        width="5"
        height="10"
        rx="1.6"
        fill="#f6b73c"
        stroke="#d1902a"
        strokeWidth="1"
      />
    </svg>
  );
}

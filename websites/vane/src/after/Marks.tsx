/**
 * Every mark on this page is drawn, and every one of them is invented.
 *
 * The reference's home page is, by surface area, mostly other people's
 * trademarks: fourteen client logos, twelve certification marks, six advisory
 * partners and four testimonial companies. Rule 10 replaces brand marks, and a
 * wall of real companies under an invented product's "4,000 customers trust
 * us" is the one page this series must never produce.
 *
 * So the wall is still a wall — same grid, same 88px cells, same hairlines,
 * same optical weight — and the companies in it do not exist.
 */

import { cx } from '@/cx';

/* ------------------------------------------------------------ the wordmark */

/**
 * vane's own mark, in the reference's place and at its size (109×27 in the
 * header). A weather vane: the word, and a pointer whose tail is the brand
 * green.
 */
export function Wordmark({ className, dark = false }: { className?: string; dark?: boolean }) {
  const ink = dark ? '#ffffff' : '#031f18';
  return (
    <svg viewBox="0 0 109 27" className={className} role="img" aria-label="vane">
      <text
        x="0"
        y="21"
        fontFamily="var(--font-pangea)"
        fontSize="25"
        fontWeight="600"
        letterSpacing="-0.03em"
        fill={ink}
      >
        vane
      </text>
      {/* the vane itself: a pointer on a pivot */}
      <g transform="translate(64 5)">
        <path d="M0 8 L12 0 L12 16 Z" fill="#2fce65" />
        <rect x="12" y="7" width="8" height="2" rx="1" fill={ink} />
      </g>
    </svg>
  );
}

/* --------------------------------------------------------- the client wall */

/**
 * One invented company's wordmark.
 *
 * Four treatments, cycled through the wall, so fourteen cells read as fourteen
 * different design departments rather than one list set in one face — which is
 * what a real logo wall looks like and what the grid needs in order not to
 * look like a table of contents.
 */
const MARK_STYLES = {
  serif: { family: 'ui-serif, Georgia, serif', weight: 500, tracking: '0.02em', upper: false },
  grotesk: { family: 'var(--font-pangea)', weight: 700, tracking: '-0.02em', upper: false },
  mono: {
    family: 'ui-monospace, SFMono-Regular, monospace',
    weight: 500,
    tracking: '0.12em',
    upper: true,
  },
  round: { family: 'var(--font-inter)', weight: 600, tracking: '0.01em', upper: false },
} as const;

export function CompanyMark({
  name,
  style,
  className,
  tone = 'ink',
}: {
  name: string;
  style: keyof typeof MARK_STYLES;
  className?: string;
  tone?: 'ink' | 'muted' | 'light';
}) {
  const s = MARK_STYLES[style];
  const fill = tone === 'light' ? '#ffffff' : tone === 'muted' ? '#5e6e6b' : '#031f18';
  const label = s.upper ? name.toUpperCase() : name;
  return (
    <svg
      viewBox="0 0 200 40"
      className={className}
      role="img"
      aria-label={name}
      preserveAspectRatio="xMidYMid meet"
    >
      <text
        x="100"
        y="27"
        textAnchor="middle"
        fontFamily={s.family}
        fontSize={s.upper ? 16 : 21}
        fontWeight={s.weight}
        letterSpacing={s.tracking}
        fill={fill}
      >
        {label}
      </text>
    </svg>
  );
}

/* ---------------------------------------------------------- the badge wall */

/**
 * A standards badge. The reference's row is twelve supplied artworks; these
 * are drawn to the same 116×60 box with the same optical weight — a rule, a
 * mark and a caption.
 */
export function StandardBadge({ mark, note }: { mark: string; note: string }) {
  const short = mark.length > 12;
  return (
    <svg viewBox="0 0 116 60" className="max-h-15 w-29" role="img" aria-label={`${mark} — ${note}`}>
      <rect x="0.5" y="0.5" width="115" height="59" rx="5" fill="none" stroke="#e8edeb" />
      <text
        x="58"
        y={short ? 26 : 30}
        textAnchor="middle"
        fontFamily="var(--font-pangea)"
        fontSize={short ? 12 : 16}
        fontWeight="600"
        letterSpacing="-0.01em"
        fill="#031f18"
      >
        {mark}
      </text>
      <text
        x="58"
        y={short ? 40 : 44}
        textAnchor="middle"
        fontFamily="var(--font-inter)"
        fontSize="7"
        letterSpacing="0.06em"
        fill="#8b9c99"
      >
        {note.toUpperCase()}
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------- small icons */

const ICONS = {
  star: 'M8 1.5l1.9 4 4.4.6-3.2 3.1.8 4.3L8 11.5 4.1 13.5l.8-4.3L1.7 6.1l4.4-.6z',
  person: 'M8 2a3 3 0 110 6 3 3 0 010-6zM2 14a6 6 0 1112 0z',
  cube: 'M8 1.5l6 3.2v6.6L8 14.5l-6-3.2V4.7zM8 8l6-3.3M8 8v6.5M8 8L2 4.7',
  medal:
    'M5 1.5h6l-1.6 4H6.6zM8 6.5a4 4 0 110 8 4 4 0 010-8zm0 2.3l.8 1.6 1.8.3-1.3 1.3.3 1.8L8 12.9l-1.6.4.3-1.8L5.4 10l1.8-.3z',
  rocket:
    'M8 1.5c2.6 1.9 4 4.6 4 7.2L10 11H6L4 8.7c0-2.6 1.4-5.3 4-7.2zM6 11l-1.4 3 2-.9 1.4.9 1.4-.9 2 .9L10 11z',
  chart: 'M3 13V7m4 6V3m4 10V9m4 4V5',
  doc: 'M4 2h6l4 4v10H4zM10 2v4h4',
  box: 'M9 1.5l7 3.8v7.4L9 16.5l-7-3.8V5.3zM9 9l7-3.7M9 9v7.5M9 9L2 5.3',
  truck:
    'M1 4h10v8H1zM11 7h3l2 2v3h-5zM4.5 14.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm9 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z',
  arrow: 'M4 10h11M11 6l4 4-4 4',
  play: 'M7 5l8 5-8 5z',
} as const;

export function Icon({
  name,
  className,
  stroke = false,
  size = 16,
}: {
  name: keyof typeof ICONS;
  className?: string;
  stroke?: boolean;
  size?: number;
}) {
  return (
    <svg
      viewBox={
        name === 'chart' || name === 'doc' || name === 'box' || name === 'truck'
          ? '0 0 18 18'
          : '0 0 16 16'
      }
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      fill={stroke ? 'none' : 'currentColor'}
      stroke={stroke ? 'currentColor' : 'none'}
      strokeWidth={stroke ? 1.5 : undefined}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={ICONS[name]} />
    </svg>
  );
}

/* ------------------------------------------------------------- the ratings */

/** The five-star row the reference pins under its hero buttons. */
export function Stars({ score, note }: { score: string; note: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="text-primary-10 flex gap-0.5" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <Icon key={i} name="star" size={13} />
        ))}
      </span>
      <span className={cx('font-inter-semibold', 'text-[13px]', 'text-primary-2')}>{score}</span>
      <span className="font-inter text-greyscale-8 text-[13px]">{note}</span>
    </span>
  );
}

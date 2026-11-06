/**
 * Every icon, on one 24px grid at one stroke width. Inline SVG, never an
 * emoji (rule 8) — a fleet console's whole nav is glyphs, so a platform that
 * renders one of them differently renders a different product.
 */
export type IconName =
  | 'grid'
  | 'map'
  | 'route'
  | 'van'
  | 'depot'
  | 'chat'
  | 'inbox'
  | 'bell'
  | 'search'
  | 'filter'
  | 'phone'
  | 'dots'
  | 'chevron-down'
  | 'chevron-right'
  | 'arrow-up'
  | 'arrow-down'
  | 'arrow-right'
  | 'close'
  | 'check'
  | 'clock'
  | 'box'
  | 'weight'
  | 'ruler'
  | 'doc'
  | 'star'
  | 'plus'
  | 'sort'
  | 'wrench'
  | 'pin'
  | 'trend-up'
  | 'trend-down';

const PATHS: Record<IconName, string> = {
  grid: 'M4.5 5.5h6v6h-6zM13.5 5.5h6v6h-6zM4.5 12.5h6v6h-6zM13.5 12.5h6v6h-6z',
  map: 'M3.5 6.5 9 4.5l6 2 5.5-2v13l-5.5 2-6-2-5.5 2zM9 4.5v13M15 6.5v13',
  route:
    'M6.5 7a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M17.5 22a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M6.5 7v4a4 4 0 0 0 4 4h3a4 4 0 0 1 4 4',
  van: 'M2.5 7.5h11v9h-11zM13.5 10.5h4l3 3.5v2.5h-7zM7 19.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4M17 19.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4',
  depot: 'M3.5 20.5v-9l8.5-6 8.5 6v9zM9.5 20.5v-6h5v6',
  chat: 'M4.5 5.5h15v11h-9l-4 3.5v-3.5h-2z',
  inbox: 'M3.5 12.5h5l1.5 3h4l1.5-3h5M3.5 12.5 6 5h12l2.5 7.5v7h-17z',
  bell: 'M18 9a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6M13.7 20a2 2 0 0 1-3.4 0',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14M16.2 16.2 21 21',
  filter: 'M3.5 5.5h17l-6.5 7.5v6l-4 2v-8z',
  phone: 'M7 3.5 9.5 8l-2 2a12 12 0 0 0 6.5 6.5l2-2 4.5 2.5-1.5 3.5A17 17 0 0 1 3.5 5z',
  dots: 'M6 12h.01M12 12h.01M18 12h.01',
  'chevron-down': 'm6 9.5 6 5.5 6-5.5',
  'chevron-right': 'm9.5 6 5.5 6-5.5 6',
  'arrow-up': 'M12 19.5v-15M6.5 10 12 4.5 17.5 10',
  'arrow-down': 'M12 4.5v15M6.5 14 12 19.5 17.5 14',
  'arrow-right': 'M4.5 12h14M13 6.5 18.5 12 13 17.5',
  close: 'm6.5 6.5 11 11M17.5 6.5l-11 11',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  clock: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M12 7.5V12l3 2',
  box: 'M4 7.5 12 4l8 3.5v9L12 20l-8-3.5zM4 7.5 12 11l8-3.5M12 11v9',
  weight: 'M7 7.5h10l2.5 12h-15zM9.5 7.5a2.5 2.5 0 1 1 5 0',
  ruler: 'M3.5 9.5h17v5h-17zM7 9.5v2.5M10.5 9.5v3.5M14 9.5v2.5M17.5 9.5v3.5',
  doc: 'M6 3.5h7l5 5v12H6zM13 3.5v5h5M9 13h6M9 16.5h6',
  star: 'm12 4 2.5 5.3 5.5.8-4 4.1 1 5.8-5-2.8-5 2.8 1-5.8-4-4.1 5.5-.8z',
  plus: 'M12 5v14M5 12h14',
  sort: 'm8 9.5 3-3 3 3M8 14.5l3 3 3-3',
  wrench:
    'M15.5 3.5a5 5 0 0 0-4.2 7.6L3.5 18.9l1.6 1.6 7.8-7.8a5 5 0 0 0 6.6-6.3l-2.9 2.9-2.4-.6-.6-2.4z',
  pin: 'M12 21.5s6.5-6.1 6.5-11a6.5 6.5 0 1 0-13 0c0 4.9 6.5 11 6.5 11M12 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5',
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
 * The Routra mark and wordmark.
 *
 * The reference has no wordmark at all — the rail starts with an icon. This
 * one adds the operator's name above the driver list, with a mark drawn in
 * the same idiom: a route turning through two stops.
 */
export function Wordmark() {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
        <rect x="1.5" y="1.5" width="21" height="21" rx="7" fill="var(--color-accent)" />
        <path
          d="M7 17.5v-4a3 3 0 0 1 3-3h4.5"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="7" cy="18" r="1.9" fill="#fff" />
        <circle cx="16" cy="10.5" r="1.9" fill="#fff" />
      </svg>
      <span className="text-ink text-[17px] leading-none font-bold tracking-[-0.02em]">Routra</span>
    </div>
  );
}

/**
 * The load space, drawn to scale.
 *
 * The reference puts a **photograph of a Volkswagen Transporter** here. A
 * vehicle is a picture of a thing, so it cannot be drawn as a cartoon (rule
 * 8) — and unbranded photography of a van barely exists, because every van
 * carries a marque on its nose. So the hero is the thing the dispatcher
 * actually needs: the load space as a dimensioned elevation, which is
 * interface rather than a drawing of a van.
 */
export function LoadSpace({
  length,
  width,
  className,
}: {
  length: number;
  width: number;
  className?: string;
}) {
  const ratio = width / length;
  return (
    <svg
      viewBox="0 0 240 120"
      className={className}
      role="img"
      aria-label={`Load space, ${length} inches long by ${width} inches wide`}
    >
      <rect
        x="22"
        y="18"
        width="196"
        height={Math.round(84 * Math.min(1, ratio * 1.6))}
        rx="6"
        fill="var(--color-accent-faint)"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
      />
      <line x1="22" y1="112" x2="218" y2="112" stroke="var(--color-muted)" strokeWidth="1" />
      <line x1="22" y1="108" x2="22" y2="116" stroke="var(--color-muted)" strokeWidth="1" />
      <line x1="218" y1="108" x2="218" y2="116" stroke="var(--color-muted)" strokeWidth="1" />
      <text x="120" y="108" textAnchor="middle" className="fill-[var(--color-muted)] text-[11px]">
        {length} in
      </text>
      <line
        x1="10"
        y1="18"
        x2="10"
        y2={18 + Math.round(84 * Math.min(1, ratio * 1.6))}
        stroke="var(--color-muted)"
        strokeWidth="1"
      />
      <text
        x="10"
        y={14 + Math.round(84 * Math.min(1, ratio * 1.6)) / 2}
        textAnchor="middle"
        className="fill-[var(--color-muted)] text-[11px]"
        transform={`rotate(-90 10 ${14 + Math.round(84 * Math.min(1, ratio * 1.6)) / 2})`}
      >
        {width} in
      </text>
    </svg>
  );
}

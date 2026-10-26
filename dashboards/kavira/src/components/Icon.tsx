/**
 * Every icon, on one 24px grid at one stroke width. Inline SVG, never an emoji
 * (rule 8) — the reference's sidebar greeting ends in a waving hand, which is
 * one of the glyphs that differs most across platforms, so it is drawn.
 */
export type IconName =
  | 'layers'
  | 'scroll'
  | 'projection'
  | 'account'
  | 'piggy'
  | 'shield'
  | 'search'
  | 'calendar'
  | 'share'
  | 'plus'
  | 'chevron-down'
  | 'chevron-right'
  | 'check'
  | 'close'
  | 'dots-v'
  | 'sliders'
  | 'filter'
  | 'arrow-up'
  | 'arrow-down'
  | 'arrow-up-right'
  | 'trend-up'
  | 'trend-down'
  | 'lock'
  | 'clock'
  | 'edit'
  | 'wallet';

const PATHS: Record<IconName, string> = {
  layers: 'M12 3.5 3.5 8 12 12.5 20.5 8zM3.5 12 12 16.5 20.5 12M3.5 16 12 20.5 20.5 16',
  scroll: 'M6 3.5h12v17l-2.4-1.6-2.4 1.6-2.4-1.6L8.4 20.5 6 18.9zM9.5 8.5h5M9.5 12.5h5',
  projection: 'M4.5 19.5h15M6.5 16l4-5 3.5 3 5-7',
  account: 'M12 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6',
  piggy:
    'M5 12.5A6 6 0 0 1 11 7h3a6 6 0 0 1 6 5.5v3a2 2 0 0 1-2 2h-1v2h-3v-2h-3v2H8v-2.3A6 6 0 0 1 5 15H4a1.5 1.5 0 0 1 0-3zM16 11.5h.01M11 7V5.5a2 2 0 0 1 3.4-1.4',
  shield: 'M12 3.5 5 6v6c0 4.5 3 7.5 7 8.5 4-1 7-4 7-8.5V6z',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14M16.2 16.2 21 21',
  calendar:
    'M4.5 7.5a1.5 1.5 0 0 1 1.5-1.5h12a1.5 1.5 0 0 1 1.5 1.5v11a1.5 1.5 0 0 1-1.5 1.5H6a1.5 1.5 0 0 1-1.5-1.5zM4.5 10.5h15M8.5 3.5v4M15.5 3.5v4',
  share:
    'M17.5 8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M6.5 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M17.5 20.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M8.7 10.8l6.6-3.6M8.7 13.2l6.6 3.6',
  plus: 'M12 5.5v13M5.5 12h13',
  'chevron-down': 'm6 9.5 6 5.5 6-5.5',
  'chevron-right': 'm9.5 6 5.5 6-5.5 6',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  close: 'm6.5 6.5 11 11M17.5 6.5l-11 11',
  'dots-v': 'M12 6h.01M12 12h.01M12 18h.01',
  sliders: 'M5 7.5h14M5 16.5h14M9.5 5v5M15.5 14v5',
  filter: 'M4 6.5h16M7 12h10M10 17.5h4',
  'arrow-up': 'M12 19.5v-15M6 10.5 12 4.5l6 6',
  'arrow-down': 'M12 4.5v15M6 13.5l6 6 6-6',
  'arrow-up-right': 'M7.5 16.5 16.5 7.5M9.5 7.5h7v7',
  'trend-up': 'M4 16.5 10 10l3.5 3.5L20 7M15 7h5v5',
  'trend-down': 'M4 7.5 10 14l3.5-3.5L20 17M15 17h5v-5',
  lock: 'M6.5 10.5h11a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1M8.5 10.5V7.8a3.5 3.5 0 0 1 7 0v2.7',
  clock: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M12 7.5V12l3 2',
  edit: 'M5 19h3l9.5-9.5a2.1 2.1 0 0 0-3-3L5 16zM14 6.5l3 3',
  wallet:
    'M3.5 7.5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2M3.5 7.5v10a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM16.5 13.5h.01',
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
 * The waving hand the sidebar greeting ends in.
 *
 * Filled, not stroked. The reference uses an emoji, which is out (rule 8) —
 * and a five-finger hand drawn as outlines collapses into a blob at 17px, so
 * this is a silhouette: a palm, three fingers and a thumb, with two motion
 * strokes beside it.
 */
export function Wave({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
      <path
        d="M7.4 10.2V5.6a1.3 1.3 0 0 1 2.6 0v4.1h.6V4.3a1.3 1.3 0 0 1 2.6 0v5.4h.6V5.9a1.3 1.3 0 0 1 2.6 0v7.6a6.1 6.1 0 0 1-6.1 6.1h-.4A5.4 5.4 0 0 1 4.5 14.2v-2.9a1.3 1.3 0 0 1 2.6 0z"
        fill="currentColor"
      />
      <path
        d="M18.6 5.4c.9.6 1.5 1.5 1.8 2.6M19.2 3c1.4.8 2.4 2.1 2.8 3.7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * The Atelyra mark and name.
 *
 * The reference sets a dark disc with a leaf in it beside a two-line lockup.
 * Same arrangement, invented mark: three strokes rising out of a disc, which
 * is the idea a studio that reports on money reaches for.
 */
export function Wordmark() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="bg-ink-fill grid h-10 w-10 shrink-0 place-items-center rounded-full">
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M6 17V12M12 17V7M18 17v-8"
            stroke="var(--color-accent)"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="min-w-0">
        <span className="text-ink block text-[15px] leading-tight font-semibold">Atelyra</span>
        <span className="text-muted block text-[11.5px] leading-tight">Dashboard</span>
      </span>
    </div>
  );
}

/**
 * The card's scheme mark.
 *
 * The reference carries a real payment network's wordmark over an invented
 * account (rule 8). This is an invented one: a slanted bar with a notch,
 * drawn in the same place at the same size.
 */
export function SchemeMark() {
  return (
    <svg width="54" height="18" viewBox="0 0 54 18" aria-hidden="true" className="shrink-0">
      <path d="M4 14 10 4h5l-6 10z" fill="currentColor" />
      <path d="M15 14 21 4h5l-6 10z" fill="currentColor" opacity="0.55" />
      <text
        x="29"
        y="13"
        className="text-[11px] font-bold tracking-[0.1em]"
        fill="currentColor"
        fontFamily="inherit"
      >
        KVA
      </text>
    </svg>
  );
}

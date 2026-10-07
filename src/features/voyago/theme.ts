/**
 * Voyago's tokens.
 *
 * This showcase came as a Google Stitch export — three folders, each holding a
 * `screen.png` and the `code.html` it was rendered from. There is no
 * `DESIGN.md` this time, so there is no document speaking for the app as a
 * whole, and the three screens have to be reconciled against each other.
 *
 * Every size in the markup is an explicit Tailwind px value, so nothing here is
 * measured off a capture: `py-3` is 12dp, `rounded-[36px]` is 36dp. The PNGs
 * are Stitch's own renders at 438, 438 and 706px wide and carry real layout
 * artifacts — the home title overlapping the search bar, "Recommende/d" broken
 * mid-word, "Grand Cosmopolita[n]" and "Caesars Palace Duba[i]" clipped by their
 * own cards. None of those are reproduced; the markup does not wrap there.
 *
 * Where the three screens disagree, the value below is the one the renders
 * actually draw, sampled from the PNGs:
 *
 *  - **Canvas.** Home's Tailwind config says `#BDDDD6`, its `<body>` says
 *    `#BEDDD6`, and the other two say `#BEDDD6`. All three render `#BEDDD6`.
 *  - **Orange.** Home's featured card is a gradient from `#F58E43`, hotels
 *    renders `#F98E4A`, and the ticket renders `#FF7F32` — a genuinely
 *    different, more saturated orange. Unified on the soft `#F98E4B` the
 *    majority draws; the ticket's barcode block and nav pill are therefore a
 *    shade cooler than its own render. This is the one deliberate deviation.
 *  - **Dark.** Four near-identical darks across the set — `#11171E` (home ink
 *    and nav), `#0F1722` (home's hotel mini-card), `#0D1619` (hotels config)
 *    and `#0D161F` (ticket, which renders exactly). Collapsed to two, by role:
 *    `ink` for type and the nav pill, `night` for photographic card surfaces.
 *
 * The mint on the hotels arrow pill is *not* the canvas: it renders `#AAD2CA`
 * under `bg-mintBadge/95` over a dark card, which resolves to `#B2DCD3`. Home's
 * go-arrow button is the canvas mint. Both are kept.
 */
export const vy = {
  // the one canvas all three screens share
  canvas: '#BEDDD6',
  /** The pale mint of the third stacked card on the hotels screen. */
  mintLight: '#D2EBE5',
  /** The arrow pill on the featured hotel card, over a dark photograph. */
  mintBadge: '#B2DCD3',
  white: '#FFFFFF',

  // ink: type, the floating nav pill, the home mini-card
  ink: '#11171E',
  /** Photographic card surfaces — the ticket body and the hotels hero. */
  night: '#0D161F',

  /** The unified brand orange. See the note above. */
  orange: '#F98E4B',
  /**
   * Home's featured card is a vertical gradient, not a flat fill. Kept as its
   * own three stops because the card is 290dp tall and the ramp is visible.
   */
  heroFrom: '#F58E43',
  heroVia: '#F4883A',
  heroTo: '#EF7C2A',

  /** The 5.0 rating star on home's hotel mini-card (Tailwind `amber-300`). */
  star: '#FCD34D',

  // Tailwind greys the ticket sets its secondary type in
  gray100: '#F3F4F6',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  /** `slate-950`, the ink on the hotels stacked cards. */
  slate950: '#020617',
  /** `slate-900`, the ink in the hotels header. */
  slate900: '#0F172A',
} as const;

/**
 * `rgba` from a `#rrggbb` and an alpha.
 *
 * The export leans on translucency hard — `bg-white/20`, `border-white/25`,
 * `text-white/90`, `border-black/10` — and React Native has no `/alpha` syntax,
 * so every one of those becomes a call to this.
 */
export function alpha(hex: string, a: number): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

/**
 * Plus Jakarta Sans for the UI, Instrument Serif Italic for the three accent
 * words — "with us!", "for you", "Ticket".
 *
 * No substitute hunt is needed for the sans: two of the three screens name Plus
 * Jakarta Sans outright and Google Fonts carries it, so the type matches rather
 * than approximates. It was already registered for Affirm and VoteNG.
 *
 * The serif had to be unified. Home and hotels both ask for Instrument Serif
 * italic; the ticket asks for Playfair Display italic, and its render is
 * visibly Playfair — higher stroke contrast, ball terminals on the `T`.
 * Instrument Serif wins on the two-of-three rule that settles every other
 * conflict in this file, so "Ticket" is a little lower-contrast than its own
 * render. It is the second deliberate deviation.
 *
 * `mono` is the barcode digit row, which the ticket sets in `font-mono` without
 * naming a family. IBM Plex Mono is already registered.
 */
export const FONT = {
  black: 'PlusJakartaSans_800ExtraBold',
  bold: 'PlusJakartaSans_700Bold',
  semibold: 'PlusJakartaSans_600SemiBold',
  medium: 'PlusJakartaSans_500Medium',
  regular: 'PlusJakartaSans_400Regular',
  serif: 'InstrumentSerif_400Regular_Italic',
  mono: 'IBMPlexMono_600SemiBold',
} as const;

/** Radii, as the export's `rounded-[…]` values. */
export const R = {
  md: 12,
  lg: 16,
  xl: 24,
  card: 32,
  hero: 36,
  heroTall: 38,
  full: 9999,
} as const;

/**
 * The 4px grid, plus the two gutters the export actually uses: home is `px-5`
 * (20dp) and both other screens are `px-6` (24dp). They are not reconciled —
 * home genuinely runs its cards wider.
 */
export const SP = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
  /** Home's gutter. */
  gutterHome: 20,
  /** Hotels' and the ticket's gutter. */
  gutter: 24,
} as const;

/** Semantic overrides, so the shared primitives read on Voyago's page. */
export const voyagoTheme = {
  '--bg': vy.canvas,
  '--surface': vy.white,
  '--fg': vy.ink,
  '--muted': vy.gray400,
  '--border': alpha(vy.ink, 0.1),
  '--accent': vy.orange,
  '--accent-fg': vy.ink,
} as unknown as Record<string, string>;

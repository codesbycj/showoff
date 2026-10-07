/**
 * VoteNG's tokens.
 *
 * This showcase came as a Stitch export — a written design system plus the HTML
 * the screenshots were rendered from — so the values below are lifted out of
 * that HTML rather than measured off a capture. The screenshots are 1x renders
 * of the markup at 420-438px wide, which is why no reference conversion appears
 * anywhere in this showcase: every number in the reference is already a CSS
 * pixel, used here as a dp.
 *
 * Where the spec's prose and its own markup disagree, the markup wins, because
 * the markup is what was rendered. Three places it matters:
 *
 *  - the prose calls the primary `#0B6623`; the markup uses `#0B844D` for
 *    chips and bars and `#008751` (Nigeria's flag green) for the hero button.
 *    Both are kept, as `primary` and `flag`.
 *  - the prose gives the canvas as `#F8FAFC`; home renders on `#F8F9FA` and
 *    results on `#FDFDFD` over an `#F8FAFC` page. The two screens genuinely
 *    differ, so each carries its own.
 *  - the prose asks for `#1E40AF` on the APC tally; home draws `#0284C7` and
 *    results draws `#2563EB`. Party colours are therefore per-surface, not one
 *    global — see `PARTY`.
 */
export const vt = {
  // canvases
  canvas: '#F8F9FA',
  canvasCool: '#FDFDFD',
  card: '#FFFFFF',

  // ink
  ink: '#0F172A',
  inkSoft: '#1E293B',
  body: '#475569',
  muted: '#64748B',
  faint: '#94A3B8',
  ghost: '#CBD5E1',

  // hairlines and inert fills
  line: '#F1F5F9',
  lineStrong: '#E2E8F0',
  fill: '#F1F5F9',
  fillCool: '#EEF2F4',
  fillPill: '#F1F4F6',

  // brand greens, light to dark
  flag: '#008751',
  primary: '#0B844D',
  primaryInk: '#0D6832',
  deep: '#0B402B',
  forest: '#065F46',
  tint: '#E8F7EE',
  tintCool: '#E8F5E9',

  // the boot splash and the results hero run near-black greens
  night: '#022416',
  nightMid: '#004D2E',
  nightDeep: '#011C11',
  heroFrom: '#032316',
  heroVia: '#083824',
  heroTo: '#0D4F33',
  neon: '#2EE59D',

  // hero banner wash on home
  washFrom: '#E2F7EB',
  washVia: '#D5F2E1',
  washTo: '#E9F9F0',
  washInk: '#0A3D24',

  // live / urgency
  live: '#E11D48',
  liveDeep: '#DC2626',

  /**
   * Amber, the third verdict. The design doc lists it among the tally markers
   * as `#D97706`, a step darker than the `#F59E0B` the NNPP bar uses — dark
   * enough to set 11dp type in, which the bar colour is not.
   */
  warn: '#D97706',

  // the pale washes the explore grid and the verdict pills are built on
  tintEmerald: '#ECFDF5',
  tintBlue: '#EFF6FF',
  tintRed: '#FEF2F2',
  tintAmber: '#FFFBEB',
  tintViolet: '#FAF5FF',

  // the three faces of the isometric ballot-box logo, lit from the top
  cubeTop: '#149D5E',
  cubeLeft: '#0A7C49',
  cubeRight: '#09673D',
  cubeDot: '#34D399',
} as const;

/**
 * Party marks.
 *
 * `bar` is the tally fill on home, `barAlt` the one on results — the export
 * draws APC blue two different ways and LP two different greens, and both
 * screens are rebuilt as rendered rather than reconciled. `dot` is the 8dp
 * leaderboard swatch, which is a third set again.
 */
export const PARTY = {
  LP: { bar: '#0B844D', barAlt: '#0D8744', dot: '#107C41' },
  APC: { bar: '#0284C7', barAlt: '#1B6CD7', dot: '#2563EB' },
  PDP: { bar: '#DC2626', barAlt: '#DE2834', dot: '#DC2626' },
  NNPP: { bar: '#F59E0B', barAlt: '#E88C08', dot: '#F59E0B' },
  OTH: { bar: '#94A3B8', barAlt: '#94A3B8', dot: '#64748B' },
} as const;

export type PartyKey = keyof typeof PARTY;

/**
 * Tailwind's emerald ramp, which the export leans on directly for the boot
 * splash and the results hero — `text-emerald-200`, `border-emerald-500/30`
 * and so on. Named here rather than inlined so those two dark surfaces have one
 * place to be tuned from.
 */
export const EM = {
  200: '#A7F3D0',
  300: '#6EE7B7',
  400: '#34D399',
  500: '#10B981',
  600: '#059669',
  700: '#047857',
  800: '#065F46',
  950: '#022C22',
} as const;

/** `rgba` from a `#rrggbb` and an alpha, for the translucent fills above. */
export function alpha(hex: string, a: number): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

/**
 * Plus Jakarta Sans for everything.
 *
 * This is the one showcase that needs no substitute hunt: the spec names Plus
 * Jakarta Sans and Inter, both are on Google Fonts, and both are already
 * registered in `src/theme/fonts.ts` from earlier apps. So the type matches
 * outright and the usual 10-15% width penalty does not apply.
 *
 * The export's markup is less disciplined than the spec's frontmatter — it sets
 * everything in Plus Jakarta and never loads Inter at all — so Inter is kept
 * only where the spec asks for tabular data and the markup agrees it reads as
 * body copy: the vote counts and the state table.
 */
export const FONT = {
  black: 'PlusJakartaSans_800ExtraBold',
  bold: 'PlusJakartaSans_700Bold',
  semibold: 'PlusJakartaSans_600SemiBold',
  medium: 'PlusJakartaSans_500Medium',
  regular: 'PlusJakartaSans_400Regular',
  data: 'Inter_500Medium',
  dataSemi: 'Inter_600SemiBold',
} as const;

/** Radii, as the spec's `rounded` scale. */
export const R = { sm: 4, DEFAULT: 8, md: 12, lg: 16, xl: 24, full: 9999 } as const;

/** The 4px grid. `margin` is the 20dp gutter the export sets with `px-5`. */
export const SP = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, margin: 20 } as const;

/** Semantic overrides, so the shared primitives read on VoteNG's page. */
export const votengTheme = {
  '--bg': vt.canvas,
  '--surface': vt.card,
  '--fg': vt.ink,
  '--muted': vt.muted,
  '--border': vt.line,
  '--accent': vt.primary,
  '--accent-fg': vt.card,
} as unknown as Record<string, string>;

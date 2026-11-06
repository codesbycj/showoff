/**
 * Huddle brand tokens, read off ref/batch3/12.png with
 * `tools/preview/swatch.py --avg`.
 *
 * The one colour that carries the brand is the trending card's gradient:
 * #FEB267 to #F45374, warm to hot, with a thin spectrum strip along its top
 * edge. Everything else is a near-white page and white cards.
 *
 * The face is Plus Jakarta Sans. The reference's is a geometric sans with a
 * double-storey `a` and a straight-tailed `y` — Poppins, the other candidate,
 * has a single-storey `a` and would change the voice of every heading.
 */
export const ct = {
  page: '#F8F8F8',
  card: '#FFFFFF',
  ink: '#121214',
  muted: '#6B6B72',
  hairline: '#E9E9EC',

  warm: '#FEB267',
  hot: '#F45374',
  onGradient: '#FFFFFF',

  /** "3 slots left!" — the only urgent thing on the screen. */
  accent: '#6B46E5',
  dock: '#FFFFFF',
} as const;

export const type = {
  greeting: { size: 21, line: 27, weight: 'PlusJakartaSans_700Bold' as const, track: -0.5 },
  sub: { size: 14, line: 19, weight: 'PlusJakartaSans_400Regular' as const, track: -0.1 },
  field: { size: 15, line: 20, weight: 'PlusJakartaSans_400Regular' as const, track: -0.1 },
  chip: { size: 14, line: 19, weight: 'PlusJakartaSans_500Medium' as const, track: -0.1 },
  chipOn: { size: 14, line: 19, weight: 'PlusJakartaSans_700Bold' as const, track: -0.1 },
  section: { size: 18, line: 24, weight: 'PlusJakartaSans_700Bold' as const, track: -0.4 },
  seeAll: { size: 14, line: 19, weight: 'PlusJakartaSans_500Medium' as const, track: -0.1 },
  heroTitle: { size: 19, line: 25, weight: 'PlusJakartaSans_700Bold' as const, track: -0.4 },
  heroMeta: { size: 13, line: 18, weight: 'PlusJakartaSans_500Medium' as const, track: -0.1 },
  cardTitle: { size: 17, line: 23, weight: 'PlusJakartaSans_700Bold' as const, track: -0.4 },
  cardPlace: { size: 13.5, line: 18, weight: 'PlusJakartaSans_400Regular' as const, track: -0.1 },
  cardWhen: { size: 12.5, line: 17, weight: 'PlusJakartaSans_500Medium' as const, track: -0.1 },
  slots: { size: 12.5, line: 17, weight: 'PlusJakartaSans_700Bold' as const, track: -0.1 },
  stack: { size: 11, line: 14, weight: 'PlusJakartaSans_700Bold' as const, track: 0 },
  tab: { size: 12.5, line: 16, weight: 'PlusJakartaSans_500Medium' as const, track: -0.1 },
  tabOn: { size: 12.5, line: 16, weight: 'PlusJakartaSans_700Bold' as const, track: -0.1 },
} as const;

export const radius = {
  field: 26,
  chip: 20,
  card: 22,
  photo: 16,
  dock: 28,
} as const;

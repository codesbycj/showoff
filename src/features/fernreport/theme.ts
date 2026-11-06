/**
 * Fern brand tokens — the report screen's own copy.
 *
 * Same app as [fernstart], separate file: `lock` tracks
 * `src/features/<slug>`, so sharing one would make each showcase report the
 * other's blanked state as drift.
 *
 * A near-black green ground (#1A2A1C) with a bright leaf green (#7FD278)
 * doing the work, and a white sheet on the screens that have one.
 *
 * The board's own mid green is #2B412C and its accent #7FD278. Dark text on
 * the accent passes comfortably; white text on it does not, so the accent is
 * only ever a fill under dark type.
 */
export const ct = {
  ground: '#16241A',
  groundDeep: '#0B130D',
  panel: '#253228',
  leaf: '#7FD278',
  leafDeep: '#2C7A33',
  onLeaf: '#0D2210',
  onGround: '#FFFFFF',
  dim: 'rgba(255,255,255,0.74)',
  faint: 'rgba(255,255,255,0.4)',
  sheet: '#FFFFFF',
  ink: '#101611',
  muted: '#67706A',
  hairline: '#E9ECE9',
} as const;

export const type = {
  display: { size: 32, line: 40, weight: 'Inter_700Bold' as const, track: -0.9 },
  body: { size: 15, line: 23, weight: 'Inter_400Regular' as const, track: -0.1 },
  cta: { size: 16, line: 21, weight: 'Inter_600SemiBold' as const, track: -0.3 },
  skip: { size: 15.5, line: 21, weight: 'Inter_600SemiBold' as const, track: -0.3 },
  cardBrand: { size: 13, line: 17, weight: 'Inter_600SemiBold' as const, track: 0.2 },
  cardLabel: { size: 11, line: 15, weight: 'Inter_500Medium' as const, track: 0.3 },
  cardFigure: { size: 22, line: 28, weight: 'Inter_700Bold' as const, track: -0.7 },
  cardDigits: { size: 12, line: 16, weight: 'Inter_500Medium' as const, track: 1.4 },
  hello: { size: 13.5, line: 18, weight: 'Inter_400Regular' as const, track: -0.1 },
  name: { size: 19, line: 25, weight: 'Inter_700Bold' as const, track: -0.5 },
  label: { size: 14, line: 19, weight: 'Inter_400Regular' as const, track: -0.1 },
  balance: { size: 39, line: 50, weight: 'Inter_700Bold' as const, track: -1.3 },
  delta: { size: 12.5, line: 16, weight: 'Inter_600SemiBold' as const, track: -0.1 },
  chip: { size: 13, line: 17, weight: 'Inter_500Medium' as const, track: -0.1 },
  chipOn: { size: 13, line: 17, weight: 'Inter_600SemiBold' as const, track: -0.1 },
  promoTitle: { size: 17, line: 23, weight: 'Inter_700Bold' as const, track: -0.4 },
  promoNote: { size: 13, line: 18, weight: 'Inter_400Regular' as const, track: -0.1 },
  promoPill: { size: 12.5, line: 16, weight: 'Inter_500Medium' as const, track: -0.1 },
  section: { size: 17, line: 23, weight: 'Inter_700Bold' as const, track: -0.4 },
  seeAll: { size: 13.5, line: 18, weight: 'Inter_600SemiBold' as const, track: -0.1 },
  person: { size: 12.5, line: 17, weight: 'Inter_500Medium' as const, track: -0.1 },
  screenTitle: { size: 24, line: 31, weight: 'Inter_700Bold' as const, track: -0.7 },
  seg: { size: 15, line: 20, weight: 'Inter_500Medium' as const, track: -0.2 },
  segOn: { size: 15, line: 20, weight: 'Inter_600SemiBold' as const, track: -0.2 },
  cardLabelBig: { size: 15, line: 20, weight: 'Inter_500Medium' as const, track: -0.2 },
  cardTotal: { size: 30, line: 38, weight: 'Inter_700Bold' as const, track: -1 },
  axis: { size: 11.5, line: 15, weight: 'Inter_500Medium' as const, track: 0 },
  axisOn: { size: 11.5, line: 15, weight: 'Inter_700Bold' as const, track: 0 },
  tip: { size: 14, line: 19, weight: 'Inter_700Bold' as const, track: -0.2 },
  bannerTitle: { size: 17, line: 23, weight: 'Inter_700Bold' as const, track: -0.4 },
  bannerNote: { size: 13, line: 18, weight: 'Inter_400Regular' as const, track: -0.1 },
  txName: { size: 15, line: 20, weight: 'Inter_600SemiBold' as const, track: -0.2 },
  txMeta: { size: 12.5, line: 16, weight: 'Inter_400Regular' as const, track: 0 },
  txAmount: { size: 15, line: 20, weight: 'Inter_600SemiBold' as const, track: -0.2 },
} as const;

export const radius = { card: 20, cta: 30, pill: 26 } as const;

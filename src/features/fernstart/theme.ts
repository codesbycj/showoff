/**
 * Fern brand tokens, read off ref/batch3/16.png with `swatch.py --avg`.
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
  leafDeep: '#3F9E45',
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
} as const;

export const radius = { card: 20, cta: 30, pill: 26 } as const;

/**
 * Byte brand tokens, read off ref/batch3/15.png with `swatch.py --avg`.
 *
 * A near-black teal ground (#062D32) with one teal doing the work and white
 * type over it. The reference's onboarding is the darkest screen in the
 * batch, so every grey on it is checked against the ground rather than
 * carried over from a light screen.
 */
export const ct = {
  deep: '#062D32',
  deeper: '#031417',
  teal: '#11514D',
  tealLit: '#1C7A72',
  onDeep: '#FFFFFF',
  dim: 'rgba(255,255,255,0.72)',
  faint: 'rgba(255,255,255,0.42)',
  white: '#FFFFFF',
  ink: '#08171A',
  cardPale: '#E8EDEC',
  cardMid: '#BFD0CE',
} as const;

export const type = {
  display: { size: 33, line: 41, weight: 'Inter_700Bold' as const, track: -1 },
  body: { size: 14.5, line: 21, weight: 'Inter_400Regular' as const, track: -0.1 },
  cta: { size: 16.5, line: 22, weight: 'Inter_600SemiBold' as const, track: -0.3 },
  foot: { size: 13.5, line: 18, weight: 'Inter_400Regular' as const, track: -0.1 },
  footStrong: { size: 13.5, line: 18, weight: 'Inter_600SemiBold' as const, track: -0.1 },
  cardLabel: { size: 10, line: 13, weight: 'Inter_500Medium' as const, track: 0.6 },
  cardFigure: { size: 17, line: 22, weight: 'Inter_600SemiBold' as const, track: -0.4 },
  cardBrand: { size: 12, line: 16, weight: 'Inter_600SemiBold' as const, track: 0.2 },
} as const;

export const radius = { card: 18, cta: 32, disc: 26 } as const;

/**
 * PrimeFit brand tokens, read off ref/batch3/22.png.
 *
 * A pale blue sky over a white sheet, one blue carrying the stars, the
 * laurels, the selected plan and the button. The blue is darkened from the
 * board's: white on the reference's reads under 4.5:1 at the 17dp the button
 * uses.
 */
export const ct = {
  skyTop: '#9FCBFB',
  skyBottom: '#E8F2FE',
  page: '#FFFFFF',
  blue: '#1472E6',
  blueDeep: '#0E57B4',
  blueSoft: '#E3EFFD',
  onBlue: '#FFFFFF',
  ink: '#101418',
  muted: '#646B73',
  faint: '#6A7078',
  hairline: '#E8EBEE',
  tile: '#F2F4F6',
} as const;

export const type = {
  brand: { size: 21, line: 27, weight: 'Inter_700Bold' as const, track: -0.5 },
  badge: { size: 12.5, line: 17, weight: 'Inter_700Bold' as const, track: -0.1 },
  count: { size: 11.5, line: 15, weight: 'Inter_700Bold' as const, track: -0.1 },
  claim: { size: 17, line: 24, weight: 'Inter_600SemiBold' as const, track: -0.3 },
  cardTitle: { size: 15.5, line: 21, weight: 'Inter_700Bold' as const, track: -0.3 },
  chip: { size: 12.5, line: 17, weight: 'Inter_600SemiBold' as const, track: -0.1 },
  tileLabel: { size: 13, line: 18, weight: 'Inter_500Medium' as const, track: -0.1 },
  tileValue: { size: 23, line: 30, weight: 'Inter_700Bold' as const, track: -0.7 },
  feature: { size: 13.5, line: 18, weight: 'Inter_500Medium' as const, track: -0.1 },
  planName: { size: 14, line: 19, weight: 'Inter_500Medium' as const, track: -0.1 },
  planPrice: { size: 20, line: 26, weight: 'Inter_700Bold' as const, track: -0.6 },
  planUnit: { size: 13, line: 18, weight: 'Inter_400Regular' as const, track: -0.1 },
  fine: { size: 12, line: 16, weight: 'Inter_400Regular' as const, track: -0.1 },
  cta: { size: 16.5, line: 22, weight: 'Inter_600SemiBold' as const, track: -0.3 },
} as const;

export const radius = { sheet: 26, card: 20, tile: 16, cta: 28, pill: 11 } as const;

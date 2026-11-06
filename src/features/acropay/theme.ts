/**
 * Acronym brand tokens, read off ref/batch3/19.png.
 *
 * One pink over a white sheet, with a pale wash of it for the savings
 * panel. The reference's #E53B6A carries white text at 4.07:1 and pink text
 * on white at the same, which R4 fails at the 13 and 17dp this screen uses,
 * so the token is #D4245B and both uses move with it.
 */
export const ct = {
  pink: '#D4245B',
  pinkDeep: '#C02150',
  pinkWash: '#FDE8EF',
  onPink: '#FFFFFF',
  page: '#FFFFFF',
  ink: '#14151A',
  muted: '#64666F',
  hairline: '#ECEDF1',
  gold: '#F0A818',
  laurel: '#C9CBD2',
} as const;

export const type = {
  headline: { size: 25, line: 33, weight: 'Inter_700Bold' as const, track: -0.7 },
  rating: { size: 27, line: 34, weight: 'Inter_700Bold' as const, track: -0.8 },
  ratingNote: { size: 12.5, line: 17, weight: 'Inter_500Medium' as const, track: -0.1 },
  row: { size: 16, line: 21, weight: 'Inter_500Medium' as const, track: -0.2 },
  save: { size: 17, line: 25, weight: 'Inter_600SemiBold' as const, track: -0.3 },
  saveBig: { size: 19, line: 25, weight: 'Inter_700Bold' as const, track: -0.4 },
  plan: { size: 17, line: 22, weight: 'Inter_700Bold' as const, track: -0.4 },
  badge: { size: 12, line: 16, weight: 'Inter_600SemiBold' as const, track: -0.1 },
  price: { size: 19, line: 25, weight: 'Inter_700Bold' as const, track: -0.5 },
  cta: { size: 17, line: 22, weight: 'Inter_600SemiBold' as const, track: -0.3 },
  foot: { size: 13, line: 18, weight: 'Inter_500Medium' as const, track: -0.1 },
} as const;

export const radius = { sheet: 30, card: 18, pill: 16, cta: 16, disc: 20 } as const;

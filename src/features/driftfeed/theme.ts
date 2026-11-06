/**
 * Drift brand tokens, read off ref/batch3/26.png.
 *
 * A black feed with dark cards and one warm accent on the reaction counts.
 * Every grey is picked against black rather than carried from a light
 * screen.
 */
export const ct = {
  page: '#000000',
  card: '#121214',
  tile: '#1B1B1F',
  onPage: '#FFFFFF',
  dim: '#A0A0A8',
  faint: '#83838C',
  hairline: '#232329',
  accent: '#F2762E',
  like: '#F0324B',
} as const;

export const type = {
  brand: { size: 23, line: 30, weight: 'Inter_700Bold' as const, track: -0.7 },
  name: { size: 15.5, line: 21, weight: 'Inter_600SemiBold' as const, track: -0.3 },
  when: { size: 12.5, line: 17, weight: 'Inter_400Regular' as const, track: -0.1 },
  body: { size: 14.5, line: 21, weight: 'Inter_400Regular' as const, track: -0.1 },
  count: { size: 13, line: 18, weight: 'Inter_600SemiBold' as const, track: -0.1 },
  chip: { size: 12.5, line: 17, weight: 'Inter_600SemiBold' as const, track: -0.1 },
} as const;

export const radius = { card: 22, photo: 18, disc: 22 } as const;

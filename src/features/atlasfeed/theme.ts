/**
 * Atlas brand tokens.
 *
 * A black feed with white cards and one gradient — the wordmark's, which
 * runs indigo to orange. Every grey on this screen is checked against black
 * rather than carried over from a light screen: the reference's caption grey
 * reads about 3:1 on #000 and every one of those lines is 13-14dp.
 */
export const ct = {
  page: '#000000',
  card: '#FFFFFF',
  cardInk: '#0C0C0F',
  onPage: '#FFFFFF',
  dim: '#9A9AA2',
  faint: 'rgba(255,255,255,0.14)',
  muted: '#5F5F67',
  ring: '#E1457A',
  like: '#F0324B',
  dock: '#17171B',
} as const;

export const wordmarkStops = ['#5B3BE8', '#C33BB6', '#F0803C'] as const;

export const type = {
  wordmark: { size: 26, line: 33, weight: 'Inter_700Bold' as const, track: -0.9 },
  atlases: { size: 14, line: 19, weight: 'Inter_400Regular' as const, track: -0.1 },
  atlasesStrong: { size: 14, line: 19, weight: 'Inter_600SemiBold' as const, track: -0.1 },
  story: { size: 12.5, line: 17, weight: 'Inter_500Medium' as const, track: -0.1 },
  poster: { size: 15, line: 20, weight: 'Inter_600SemiBold' as const, track: -0.2 },
  body: { size: 14, line: 20, weight: 'Inter_400Regular' as const, track: -0.1 },
  tags: { size: 14, line: 20, weight: 'Inter_600SemiBold' as const, track: -0.1 },
  count: { size: 13, line: 17, weight: 'Inter_600SemiBold' as const, track: -0.1 },
} as const;

export const radius = { card: 26, story: 22, pill: 20, disc: 23 } as const;

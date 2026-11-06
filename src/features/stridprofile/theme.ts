/**
 * Strid brand tokens, read off ref/batch3/24.png.
 *
 * A photograph over a near-black page. Every grey is picked against that
 * black rather than carried from a light screen, and the badge copper is
 * lightened until it clears 4.5:1 on the card it sits on.
 */
export const ct = {
  page: '#0C0C0E',
  card: '#17171A',
  tile: '#1F1F23',
  onPage: '#FFFFFF',
  dim: '#9C9CA6',
  faint: '#90909B',
  hairline: '#26262B',
  white: '#FFFFFF',
  copper: '#E8A066',
  silver: '#BFD2E8',
  bronze: '#E0A074',
} as const;

export const type = {
  name: { size: 22, line: 29, weight: 'Inter_700Bold' as const, track: -0.5 },
  handle: { size: 14, line: 19, weight: 'Inter_400Regular' as const, track: -0.1 },
  statLabel: { size: 12.5, line: 17, weight: 'Inter_400Regular' as const, track: -0.1 },
  statValue: { size: 17, line: 23, weight: 'Inter_700Bold' as const, track: -0.3 },
  follow: { size: 15.5, line: 21, weight: 'Inter_600SemiBold' as const, track: -0.2 },
  badgeNum: { size: 19, line: 25, weight: 'Inter_700Bold' as const, track: -0.4 },
  award: { size: 14.5, line: 20, weight: 'Inter_600SemiBold' as const, track: -0.2 },
  awardBody: { size: 12.5, line: 18, weight: 'Inter_400Regular' as const, track: -0.1 },
  compare: { size: 13.5, line: 19, weight: 'Inter_500Medium' as const, track: -0.1 },
} as const;

export const radius = { disc: 22, card: 22, pill: 26 } as const;

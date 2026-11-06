/**
 * Meet brand tokens, read off ref/batch3/27.png.
 *
 * A near-black page with a warm glow behind the portrait, white type, and
 * one white control at the foot. The greys are picked against black.
 */
export const ct = {
  page: '#0B0A09',
  glow: '#2A1E14',
  card: '#17150F',
  tile: '#1E1B16',
  onPage: '#FFFFFF',
  dim: '#A39C91',
  faint: '#8A8277',
  hairline: '#2A2721',
  white: '#FFFFFF',
} as const;

export const type = {
  name: { size: 24, line: 31, weight: 'Inter_700Bold' as const, track: -0.6 },
  place: { size: 13.5, line: 18, weight: 'Inter_500Medium' as const, track: -0.1 },
  statLabel: { size: 12.5, line: 17, weight: 'Inter_400Regular' as const, track: -0.1 },
  statValue: { size: 18, line: 24, weight: 'Inter_700Bold' as const, track: -0.4 },
  label: { size: 13, line: 18, weight: 'Inter_500Medium' as const, track: -0.1 },
  chip: { size: 13.5, line: 18, weight: 'Inter_500Medium' as const, track: -0.1 },
  cta: { size: 16, line: 21, weight: 'Inter_600SemiBold' as const, track: -0.2 },
} as const;

export const radius = { disc: 22, card: 20, chip: 18, cta: 28 } as const;

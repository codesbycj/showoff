/**
 * Loot brand tokens, read off ref/batch3/20.png.
 *
 * A near-black ground with rays, one violet carrying the badge and the
 * announcement card, and white type. The muted grey is lightened from the
 * reference's: on #0B0A0F its value reads about 3.4:1 and the line it sets
 * is 14dp.
 */
export const ct = {
  ground: '#0B0A0F',
  rays: '#17131F',
  violet: '#7C4DF0',
  violetDeep: '#5A32C4',
  violetSoft: '#9B7BF5',
  onViolet: '#FFFFFF',
  onGround: '#FFFFFF',
  dim: '#A6A2B4',
  slate: '#26242D',
} as const;

export const type = {
  headline: { size: 27, line: 35, weight: 'Inter_700Bold' as const, track: -0.8 },
  body: { size: 14.5, line: 22, weight: 'Inter_400Regular' as const, track: -0.1 },
  pill: { size: 12.5, line: 17, weight: 'Inter_600SemiBold' as const, track: -0.1 },
  cardTitle: { size: 16.5, line: 22, weight: 'Inter_700Bold' as const, track: -0.3 },
  cardBody: { size: 13.5, line: 20, weight: 'Inter_400Regular' as const, track: -0.1 },
  cta: { size: 15.5, line: 21, weight: 'Inter_600SemiBold' as const, track: -0.2 },
} as const;

export const radius = { card: 20, cta: 26 } as const;

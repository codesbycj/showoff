/**
 * Byte brand tokens — the home screen's own copy.
 *
 * Same app as [bytestart], separate file: `lock` tracks
 * `src/features/<slug>`, so a shared theme would make each showcase report
 * the other's blanked state as drift.
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

export const sheet = {
  page: '#FFFFFF',
  ink: '#0B1416',
  muted: '#6B7375',
  hairline: '#ECEEEE',
  dashed: '#C9D0D0',
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
  wordmark: { size: 19, line: 25, weight: 'Inter_700Bold' as const, track: -0.4 },
  label: { size: 14, line: 19, weight: 'Inter_400Regular' as const, track: -0.1 },
  balance: { size: 33, line: 40, weight: 'Inter_700Bold' as const, track: -1.2 },
  action: { size: 13, line: 17, weight: 'Inter_500Medium' as const, track: -0.1 },
  section: { size: 17.5, line: 23, weight: 'Inter_700Bold' as const, track: -0.4 },
  viewAll: { size: 13.5, line: 18, weight: 'Inter_600SemiBold' as const, track: -0.1 },
  person: { size: 13, line: 17, weight: 'Inter_500Medium' as const, track: -0.1 },
  txTitle: { size: 15.5, line: 20, weight: 'Inter_600SemiBold' as const, track: -0.2 },
  txMeta: { size: 12.5, line: 16, weight: 'Inter_400Regular' as const, track: 0 },
  txAmount: { size: 15.5, line: 20, weight: 'Inter_600SemiBold' as const, track: -0.2 },
  tab: { size: 11.5, line: 15, weight: 'Inter_500Medium' as const, track: 0 },
  tabOn: { size: 11.5, line: 15, weight: 'Inter_600SemiBold' as const, track: 0 },
} as const;

export const radius = { card: 18, cta: 32, disc: 26, sheet: 28 } as const;

/**
 * Huddle brand tokens — the event screen's own copy.
 *
 * Same app as [huddlehome], separate file: `lock` and `preflight` track
 * `src/features/<slug>`, so sharing one would make each showcase report the
 * other's blanked state as drift.
 *
 * The two state chips are read off ref/batch3/13.png: the "Upcoming" pill is
 * a pale cream and "Music" a pale lavender. Their *text* colours are not the
 * reference's — at the reference's values both land near 2:1 on their own
 * fill, which R4 fails. Darkened until each clears 4.5:1.
 */
export const ct = {
  page: '#FFFFFF',
  card: '#F6F6F8',
  ink: '#121214',
  muted: '#62626A',
  hairline: '#E7E7EB',

  scrim: 'rgba(12,12,16,0.42)',
  onPhoto: '#FFFFFF',

  upcomingBg: '#FBF8DC',
  upcomingInk: '#565412',
  musicBg: '#EDE7FB',
  musicInk: '#4A29C4',

  cta: '#111113',
  onCta: '#FFFFFF',
  free: '#16803C',
} as const;

export const type = {
  hero: { size: 23, line: 30, weight: 'PlusJakartaSans_700Bold' as const, track: -0.6 },
  chip: { size: 13, line: 17, weight: 'PlusJakartaSans_700Bold' as const, track: -0.1 },
  rowTitle: { size: 16, line: 21, weight: 'PlusJakartaSans_700Bold' as const, track: -0.3 },
  rowNote: { size: 13.5, line: 19, weight: 'PlusJakartaSans_400Regular' as const, track: -0.1 },
  section: { size: 18, line: 24, weight: 'PlusJakartaSans_700Bold' as const, track: -0.4 },
  body: { size: 14.5, line: 22, weight: 'PlusJakartaSans_400Regular' as const, track: -0.1 },
  going: { size: 13.5, line: 18, weight: 'PlusJakartaSans_500Medium' as const, track: -0.1 },
  goingStrong: { size: 13.5, line: 18, weight: 'PlusJakartaSans_700Bold' as const, track: -0.1 },
  price: { size: 17, line: 22, weight: 'PlusJakartaSans_700Bold' as const, track: -0.3 },
  priceNote: { size: 12.5, line: 16, weight: 'PlusJakartaSans_400Regular' as const, track: -0.1 },
  cta: { size: 16, line: 21, weight: 'PlusJakartaSans_700Bold' as const, track: -0.2 },
  stack: { size: 11, line: 14, weight: 'PlusJakartaSans_700Bold' as const, track: 0 },
} as const;

export const radius = {
  sheet: 28,
  card: 18,
  chip: 14,
  cta: 26,
  disc: 22,
} as const;

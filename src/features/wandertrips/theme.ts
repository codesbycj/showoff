/**
 * Wander brand tokens — the trips screen's own copy.
 *
 * Same app as [wanderhome], separate file, for the same reason: `lock`
 * tracks `src/features/<slug>`.
 *
 * A black page with a white sheet pulled up over it, and one blue doing all
 * the work. The reference's is #0A7CFF; white text on it reads 3.93:1, which
 * R4 fails at the 14dp the Miles pill and the button use, so the token is
 * darkened to #0A66DE and every blue on the screen moves with it.
 *
 * `dim` is lighter than the reference's grey. On #000 the reference's label
 * grey sits near 3:1, and every one of those labels is 13-14dp.
 */
export const ct = {
  page: '#000000',
  field: '#1C1C1E',
  sheet: '#FFFFFF',
  onPage: '#FFFFFF',
  dim: '#9B9BA1',
  ink: '#0C0C0F',
  muted: '#6A6A72',
  hairline: '#ECECEF',

  blue: '#0A66DE',
  onBlue: '#FFFFFF',
  blueSoft: '#E6F1FF',
  /**
   * The same accent for text on the black page. One blue cannot clear both
   * grounds: darkened until white text on it passes, it then reads 3.97:1
   * as text on black. A token has to clear every ground it lands on, so
   * there are two.
   */
  blueOnDark: '#4D9AFF',
} as const;

export const type = {
  hello: { size: 13, line: 17, weight: 'Inter_400Regular' as const, track: -0.1 },
  name: { size: 19, line: 25, weight: 'Inter_700Bold' as const, track: -0.5 },
  miles: { size: 14, line: 19, weight: 'Inter_600SemiBold' as const, track: -0.2 },
  field: { size: 15.5, line: 21, weight: 'Inter_400Regular' as const, track: -0.1 },
  tile: { size: 14, line: 19, weight: 'Inter_600SemiBold' as const, track: -0.2 },
  section: { size: 20, line: 26, weight: 'Inter_700Bold' as const, track: -0.5 },
  stayName: { size: 17, line: 22, weight: 'Inter_600SemiBold' as const, track: -0.3 },
  stayPlace: { size: 13, line: 17, weight: 'Inter_400Regular' as const, track: -0.1 },
  rating: { size: 13.5, line: 18, weight: 'Inter_700Bold' as const, track: -0.2 },
  price: { size: 22, line: 28, weight: 'Inter_700Bold' as const, track: -0.7 },
  priceUnit: { size: 14, line: 19, weight: 'Inter_400Regular' as const, track: -0.1 },
  stayMeta: { size: 13.5, line: 18, weight: 'Inter_400Regular' as const, track: -0.1 },
  cta: { size: 16.5, line: 22, weight: 'Inter_600SemiBold' as const, track: -0.3 },
  screenTitle: { size: 19, line: 25, weight: 'Inter_600SemiBold' as const, track: -0.4 },
  tab: { size: 14.5, line: 19, weight: 'Inter_500Medium' as const, track: -0.2 },
  tabOn: { size: 14.5, line: 19, weight: 'Inter_600SemiBold' as const, track: -0.2 },
  next: { size: 20, line: 26, weight: 'Inter_700Bold' as const, track: -0.5 },
  togo: { size: 14.5, line: 19, weight: 'Inter_600SemiBold' as const, track: -0.2 },
  country: { size: 18, line: 24, weight: 'Inter_700Bold' as const, track: -0.4 },
  tripMeta: { size: 13.5, line: 18, weight: 'Inter_400Regular' as const, track: -0.1 },
  chip: { size: 13, line: 17, weight: 'Inter_600SemiBold' as const, track: -0.1 },
  iata: { size: 24, line: 30, weight: 'Inter_700Bold' as const, track: -0.7 },
  city: { size: 13, line: 17, weight: 'Inter_400Regular' as const, track: -0.1 },
  leg: { size: 13.5, line: 18, weight: 'Inter_500Medium' as const, track: -0.1 },
  pct: { size: 34, line: 42, weight: 'Inter_700Bold' as const, track: -1.2 },
  pctNote: { size: 14, line: 19, weight: 'Inter_500Medium' as const, track: -0.1 },
  listHead: { size: 17, line: 22, weight: 'Inter_700Bold' as const, track: -0.4 },
  day: { size: 13.5, line: 18, weight: 'Inter_700Bold' as const, track: -0.2 },
  stop: { size: 13, line: 18, weight: 'Inter_400Regular' as const, track: -0.1 },
} as const;

export const radius = {
  field: 16,
  tile: 16,
  sheet: 28,
  card: 16,
  cta: 16,
  pill: 20,
} as const;

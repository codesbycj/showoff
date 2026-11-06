/**
 * Clove brand tokens — the home screen's own copy.
 *
 * Each showcase carries its own theme even when two of them are the same app:
 * `lock` and `preflight` track `src/features/<slug>`, so a shared file would
 * make each showcase report the other's blanked state as drift.
 *
 * Read off the board with `tools/preview/swatch.py --avg`: the lime is
 * #B0EC70, the deep green #174717, the Request pill the same lime as the
 * page's hero.
 */
export const ct = {
  page: '#FFFFFF',
  sheet: '#F7FAF4',
  ink: '#0E1511',
  muted: '#6D736D',
  hairline: '#ECEFE9',

  forest: '#174717',
  onForest: '#FFFFFF',
  lime: '#AEE96B',
  limeSoft: '#E9F7D6',
  onLime: '#174717',

  /** The notification count, and the only warm colour on the screen. */
  alert: '#D4213A',
  credit: '#1B7A32',
} as const;

export const type = {
  greeting: { size: 23, line: 29, weight: 'Inter_600SemiBold' as const, track: -0.5 },
  sub: { size: 14, line: 19, weight: 'Inter_400Regular' as const, track: -0.1 },
  label: { size: 14, line: 19, weight: 'Inter_400Regular' as const, track: -0.1 },
  balance: { size: 38, line: 45, weight: 'Inter_600SemiBold' as const, track: -1.4 },
  section: { size: 17, line: 22, weight: 'Inter_600SemiBold' as const, track: -0.3 },
  link: { size: 14, line: 19, weight: 'Inter_500Medium' as const, track: -0.1 },
  rowTitle: { size: 15.5, line: 20, weight: 'Inter_600SemiBold' as const, track: -0.2 },
  rowMeta: { size: 12.5, line: 16, weight: 'Inter_400Regular' as const, track: 0 },
  amount: { size: 15.5, line: 20, weight: 'Inter_600SemiBold' as const, track: -0.2 },
  pill: { size: 15.5, line: 20, weight: 'Inter_600SemiBold' as const, track: -0.2 },
  cardDigits: { size: 10.5, line: 13, weight: 'Inter_600SemiBold' as const, track: 0.6 },
  initials: { size: 13.5, line: 17, weight: 'Inter_600SemiBold' as const, track: 0.2 },
  badge: { size: 10, line: 12, weight: 'Inter_600SemiBold' as const, track: 0 },
} as const;

export const radius = {
  pill: 999,
  card: 10,
  sheet: 26,
} as const;

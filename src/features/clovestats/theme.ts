/**
 * Clove brand tokens — the analytics screen's own copy.
 *
 * Each showcase carries its own theme even when two of them are the same app:
 * `lock` and `preflight` track `src/features/<slug>`, so a shared file would
 * make each showcase report the other's blanked state as drift.
 *
 * `muted` is darker than the board's grey. At the reference's value it lands
 * at 3.05:1 on white, and every label on this screen is 12-14dp — R4 puts the
 * floor at 4.5:1 and says to fix the reference rather than copy it.
 */
export const ct = {
  page: '#FFFFFF',
  card: '#FAFBF8',
  ink: '#0E1511',
  muted: '#6D736D',
  hairline: '#EBEEE8',

  forest: '#174717',
  lime: '#AEE96B',
  limeSoft: '#E9F7D6',
  /** The area under the curve, and the unselected bars. */
  wash: '#D8F0B4',
  up: '#1B7A32',
} as const;

export const type = {
  title: { size: 20, line: 26, weight: 'Inter_600SemiBold' as const, track: -0.4 },
  cardLabel: { size: 14, line: 19, weight: 'Inter_400Regular' as const, track: -0.1 },
  cardFigure: { size: 26, line: 32, weight: 'Inter_600SemiBold' as const, track: -0.9 },
  delta: { size: 12.5, line: 16, weight: 'Inter_600SemiBold' as const, track: -0.1 },
  deltaNote: { size: 12.5, line: 16, weight: 'Inter_400Regular' as const, track: -0.1 },
  label: { size: 15, line: 20, weight: 'Inter_400Regular' as const, track: -0.1 },
  figure: { size: 32, line: 39, weight: 'Inter_600SemiBold' as const, track: -1.1 },
  pill: { size: 14.5, line: 19, weight: 'Inter_500Medium' as const, track: -0.1 },
  axis: { size: 12, line: 15, weight: 'Inter_400Regular' as const, track: 0 },
  axisOn: { size: 12, line: 15, weight: 'Inter_600SemiBold' as const, track: 0 },
  tip: { size: 12.5, line: 16, weight: 'Inter_600SemiBold' as const, track: -0.1 },
  rowName: { size: 15.5, line: 20, weight: 'Inter_500Medium' as const, track: -0.2 },
  rowAmount: { size: 15.5, line: 20, weight: 'Inter_600SemiBold' as const, track: -0.2 },
} as const;

export const radius = {
  card: 18,
  pill: 22,
  bar: 4,
} as const;

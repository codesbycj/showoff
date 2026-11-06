/**
 * Glu brand tokens, read off ref/batch3/23.png.
 *
 * An off-white page, near-black ink, black controls, and one green that
 * belongs to the mascot and the "in range" state. The green is darker than
 * the board's: at the reference's value "In Range" reads 2.66:1 on its own
 * wash, and it is a 12dp label.
 *
 * The headline face is Instrument Serif. The reference sets its headlines in
 * a transitional serif against an otherwise sans UI, and that contrast is
 * the whole personality of the design — substituting a sans would lose it.
 * Body copy stays on Inter.
 */
export const ct = {
  page: '#F7F6F3',
  card: '#FFFFFF',
  ink: '#1A1A17',
  muted: '#6B6B63',
  faint: '#6E6E66',
  hairline: '#E6E4DE',
  black: '#121210',
  onBlack: '#FFFFFF',
  green: '#4F6B35',
  greenSoft: '#E8EFE0',
  mascot: '#A9C487',
  mascotDeep: '#7E9C5D',
} as const;

export const type = {
  display: { size: 30, line: 38, weight: 'InstrumentSerif_400Regular' as const, track: -0.4 },
  body: { size: 14.5, line: 22, weight: 'Inter_400Regular' as const, track: -0.1 },
  cta: { size: 16, line: 21, weight: 'Inter_500Medium' as const, track: -0.2 },
  pillTitle: { size: 13.5, line: 18, weight: 'Inter_600SemiBold' as const, track: -0.1 },
  pillNote: { size: 12, line: 16, weight: 'Inter_400Regular' as const, track: -0.1 },
  welcome: { size: 16, line: 22, weight: 'Inter_600SemiBold' as const, track: -0.3 },
  sectionSerif: { size: 20, line: 27, weight: 'InstrumentSerif_400Regular' as const, track: -0.2 },
  reading: { size: 58, line: 68, weight: 'InstrumentSerif_400Regular' as const, track: -1.6 },
  unit: { size: 14, line: 19, weight: 'Inter_400Regular' as const, track: -0.1 },
  chip: { size: 12, line: 16, weight: 'Inter_600SemiBold' as const, track: -0.1 },
  cardTitle: { size: 14.5, line: 20, weight: 'Inter_600SemiBold' as const, track: -0.2 },
  cardBody: { size: 13, line: 19, weight: 'Inter_400Regular' as const, track: -0.1 },
  axis: { size: 11.5, line: 16, weight: 'Inter_400Regular' as const, track: 0 },
  rowTitle: { size: 14.5, line: 20, weight: 'Inter_600SemiBold' as const, track: -0.2 },
  rowValue: { size: 16, line: 22, weight: 'Inter_700Bold' as const, track: -0.3 },
  tab: { size: 11, line: 15, weight: 'Inter_500Medium' as const, track: 0 },
} as const;

export const radius = { card: 22, pill: 14, cta: 28 } as const;

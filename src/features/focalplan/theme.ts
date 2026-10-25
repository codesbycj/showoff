/**
 * Focal — the schedule, third of a three-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). What is taken from it: a white
 * page, a violet and a lime that carry most of the meaning, one saturated
 * blue for the hero card, and near-black for the one primary action. Every
 * size is chosen for a real 393dp screen.
 *
 * Inter stands in for the reference's grotesque, which is not obtainable.
 *
 * Its own copy of the tokens, per "One showcase per screen".
 */

export const fc = {
  canvas: '#FBFBFE',
  surface: '#FFFFFF',

  blue: '#2F62F5',
  blueSoft: '#DCE6FF',
  violet: '#8B7CF0',
  violetSoft: '#E7E4FC',
  lilac: '#D9D6F7',
  lime: '#C6F04A',
  limeSoft: '#EDF9CE',
  black: '#0E0F13',

  ink: '#15161B',
  muted: '#8A8D9B',
  faint: '#B9BCC8',
  hairline: '#EDEEF4',

  onBlue: '#FFFFFF',
  onBlack: '#FFFFFF',
  onLime: '#15161B',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  greet: { size: 17, line: 23, tracking: -0.4, family: 'Inter_600SemiBold' },

  dateLabel: { size: 13, line: 18, tracking: -0.2, family: 'Inter_500Medium' },
  title: { size: 24, line: 32, tracking: -0.8, family: 'Inter_600SemiBold' },
  sync: { size: 11.5, line: 16, tracking: -0.1, family: 'Inter_400Regular' },
  syncBold: { size: 11.5, line: 16, tracking: -0.1, family: 'Inter_600SemiBold' },

  tileBig: { size: 19, line: 25, tracking: -0.6, family: 'Inter_700Bold' },
  tileSub: { size: 10.5, line: 15, tracking: -0.1, family: 'Inter_400Regular' },

  day: { size: 12, line: 16, tracking: -0.1, family: 'Inter_500Medium' },
  legend: { size: 11, line: 15, tracking: -0.1, family: 'Inter_400Regular' },

  action: { size: 14, line: 19, tracking: -0.2, family: 'Inter_500Medium' },

  sectionTitle: { size: 14.5, line: 20, tracking: -0.3, family: 'Inter_600SemiBold' },
  sectionLink: { size: 12, line: 16, tracking: -0.1, family: 'Inter_500Medium' },

  chip: { size: 11.5, line: 16, tracking: -0.1, family: 'Inter_500Medium' },

  statLabel: { size: 11.5, line: 16, tracking: -0.1, family: 'Inter_500Medium' },
  statBig: { size: 34, line: 43, tracking: -1.2, family: 'Inter_700Bold' },
  statMid: { size: 24, line: 31, tracking: -0.8, family: 'Inter_700Bold' },
  statSub: { size: 10.5, line: 15, tracking: -0.1, family: 'Inter_400Regular' },

  display: { size: 22, line: 29, tracking: -0.7, family: 'Inter_600SemiBold' },
  count: { size: 12.5, line: 17, tracking: -0.2, family: 'Inter_600SemiBold' },

  rowTitle: { size: 13, line: 18, tracking: -0.2, family: 'Inter_500Medium' },
} as const;

export const radius = {
  card: 20,
  chip: 999,
  pill: 999,
  control: 16,
} as const;

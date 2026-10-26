/**
 * Mason — the task list, second of a three-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). What is taken from it: a white
 * page of soft-shadowed cards, one orange that carries the brand and every
 * figure that matters, and peach bar charts that fade to nothing at their
 * feet. Every size is chosen for a 393dp screen.
 *
 * Poppins stands in for the reference's geometric sans.
 *
 * Its own copy of the tokens, per "One showcase per screen".
 */

export const ms = {
  canvas: '#FFFFFF',
  card: '#FFFFFF',
  well: '#F6F6F7',

  orange: '#F2622A',
  peach: '#F7B894',
  peachSoft: '#FBDCC8',
  green: '#2FB463',
  red: '#E5484D',

  ink: '#141416',
  muted: '#8A8A90',
  faint: '#BDBDC3',
  hairline: '#EFEFF1',

  panel: '#141416',
  onPanel: '#FFFFFF',
  onOrange: '#FFFFFF',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  title: { size: 16, line: 22, tracking: -0.3, family: 'Poppins_600SemiBold' },
  filter: { size: 12.5, line: 17, tracking: -0.1, family: 'Poppins_500Medium' },
  meta: { size: 10.5, line: 15, tracking: 0, family: 'Poppins_400Regular' },
  pct: { size: 11.5, line: 16, tracking: -0.1, family: 'Poppins_600SemiBold' },

  cardTitle: { size: 13.5, line: 18, tracking: -0.2, family: 'Poppins_600SemiBold' },
  big: { size: 30, line: 38, tracking: -1, family: 'Poppins_700Bold' },
  bigUnit: { size: 14, line: 19, tracking: -0.3, family: 'Poppins_500Medium' },
  sub: { size: 11, line: 15, tracking: -0.1, family: 'Poppins_400Regular' },
  chip: { size: 10.5, line: 14, tracking: 0, family: 'Poppins_500Medium' },

  tileLabel: { size: 10.5, line: 15, tracking: 0, family: 'Poppins_400Regular' },
  tileValue: { size: 14, line: 19, tracking: -0.3, family: 'Poppins_600SemiBold' },

  section: { size: 14.5, line: 20, tracking: -0.3, family: 'Poppins_600SemiBold' },
  link: { size: 11.5, line: 16, tracking: -0.1, family: 'Poppins_400Regular' },

  rowTitle: { size: 13, line: 18, tracking: -0.2, family: 'Poppins_500Medium' },
} as const;

export const radius = {
  card: 20,
  tile: 16,
  chip: 999,
  pill: 999,
} as const;

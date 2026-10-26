/**
 * Lensa — the day, first of a two-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off. What is taken from it: a warm off-white page, white cards with very
 * soft shadows, one acid lime for the headline card and the active tab, and
 * three pastel macro colours that carry through to the second screen.
 *
 * The brand is invented. The reference's own wordmark is not copied
 * (AGENTS.md, "Sourcing assets").
 *
 * Its own copy of the tokens, per "One showcase per screen".
 */

export const ls = {
  canvas: '#F6F6F2',
  card: '#FFFFFF',
  well: '#F1F1ED',

  lime: '#C6EC63',
  limeDeep: '#9CD426',
  limeInk: '#3E5A0B',

  pink: '#F9C7D2',
  pinkInk: '#C2546C',
  butter: '#FBE3A2',
  butterInk: '#B08521',
  sky: '#BFDCF5',
  skyInk: '#3A77AE',

  ink: '#101210',
  muted: '#86887F',
  faint: '#BCBEB6',
  hairline: '#E9E9E3',

  panel: '#101210',
  onPanel: '#FFFFFF',
} as const;

/** The type ramp, in dp. */
export const type = {
  wordmark: { size: 25, line: 32, tracking: -0.8, family: 'Poppins_700Bold' },
  synced: { size: 11.5, line: 16, tracking: -0.1, family: 'Poppins_400Regular' },
  syncedLink: { size: 11.5, line: 16, tracking: -0.1, family: 'Poppins_600SemiBold' },

  pill: { size: 13, line: 18, tracking: -0.2, family: 'Poppins_500Medium' },

  cardLabel: { size: 13.5, line: 18, tracking: -0.2, family: 'Poppins_600SemiBold' },
  huge: { size: 40, line: 48, tracking: -1.8, family: 'Poppins_700Bold' },
  ringBig: { size: 17, line: 23, tracking: -0.4, family: 'Poppins_600SemiBold' },
  ringSmall: { size: 12, line: 16, tracking: -0.2, family: 'Poppins_400Regular' },

  macroName: { size: 10.5, line: 14, tracking: 0, family: 'Poppins_400Regular' },
  macroPct: { size: 13.5, line: 18, tracking: -0.3, family: 'Poppins_600SemiBold' },
  macroValue: { size: 12.5, line: 17, tracking: -0.2, family: 'Poppins_500Medium' },

  rowTitle: { size: 13.5, line: 18, tracking: -0.2, family: 'Poppins_600SemiBold' },
  rowValue: { size: 12.5, line: 17, tracking: -0.2, family: 'Poppins_500Medium' },
} as const;

export const radius = {
  card: 20,
  pill: 999,
  chip: 999,
} as const;

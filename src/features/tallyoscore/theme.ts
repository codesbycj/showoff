/**
 * Tallyo — the score, a one-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off. What is taken from it: a white page carrying one very large display
 * sentence, a row of outline chips under it, a butter-yellow share bar, a
 * cyan progress card, and a dark dock with one tab in a white pill.
 *
 * The display face is the heaviest weight in the ramp set tight, because the
 * sentence *is* the screen — everything else is a footnote to it.
 *
 * Its own copy of the tokens, per "One showcase per screen".
 */

export const ty = {
  canvas: '#FFFFFF',
  card: '#FFFFFF',
  well: '#F3F3F3',

  butter: '#F6DE8C',
  butterInk: '#7A6418',
  cyan: '#A6DEE5',
  cyanInk: '#1D5B64',

  ink: '#111111',
  muted: '#7E7E7E',
  faint: '#B6B6B6',
  hairline: '#E8E8E8',

  dock: '#111111',
  onDock: '#FFFFFF',
  dockDim: '#6E6E6E',

  green: '#2BA85F',
  amber: '#D79A1A',
} as const;

/** The type ramp, in dp. */
export const type = {
  eyebrow: { size: 12.5, line: 17, tracking: -0.2, family: 'Poppins_400Regular' },
  display: { size: 29, line: 38, tracking: -1.1, family: 'Poppins_500Medium' },
  displayBold: { size: 29, line: 38, tracking: -1.1, family: 'Poppins_700Bold' },

  chip: { size: 11.5, line: 16, tracking: -0.1, family: 'Poppins_500Medium' },
  chipValue: { size: 11.5, line: 16, tracking: -0.1, family: 'Poppins_600SemiBold' },

  share: { size: 13, line: 18, tracking: -0.2, family: 'Poppins_500Medium' },

  seg: { size: 12, line: 17, tracking: -0.2, family: 'Poppins_600SemiBold' },
  progressLabel: { size: 12, line: 17, tracking: -0.2, family: 'Poppins_400Regular' },
  progressLine: { size: 19, line: 26, tracking: -0.6, family: 'Poppins_600SemiBold' },
  huge: { size: 38, line: 46, tracking: -1.6, family: 'Poppins_600SemiBold' },
} as const;

export const radius = {
  card: 22,
  chip: 999,
  pill: 999,
} as const;

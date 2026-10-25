/**
 * Onyx — today, second of a two-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). What is taken from it: a near
 * white page, one black panel carrying a field of fine wave lines, a pale
 * blue second card, and everything else in black on white. Every size is
 * chosen for a real 393dp screen.
 *
 * Poppins stands in for the reference's geometric sans, which is not
 * obtainable.
 *
 * Its own copy of the tokens, per "One showcase per screen".
 */

export const on = {
  canvas: '#F3F4F6',
  panel: '#121214',
  surface: '#FFFFFF',
  blue: '#E6ECF7',

  ink: '#121214',
  muted: '#8A8D93',
  faint: '#B5B8BE',
  hairline: '#E6E7EA',

  onPanel: '#FFFFFF',
  onPanelDim: '#A8AAB0',
  wave: '#FFFFFF',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  greeting: { size: 13, line: 18, tracking: -0.1, family: 'Poppins_400Regular' },
  display: { size: 29, line: 38, tracking: -0.9, family: 'Poppins_600SemiBold' },

  /** The number and the weekday in the strip. */
  dayNum: { size: 14, line: 19, tracking: -0.2, family: 'Poppins_600SemiBold' },
  dayName: { size: 11, line: 15, tracking: 0, family: 'Poppins_400Regular' },

  /** An entry's title and the time beside it. */
  entryTitle: { size: 17, line: 23, tracking: -0.4, family: 'Poppins_600SemiBold' },
  entryTime: { size: 12.5, line: 17, tracking: -0.1, family: 'Poppins_400Regular' },
  entryBody: { size: 12, line: 18, tracking: -0.1, family: 'Poppins_400Regular' },

  field: { size: 13.5, line: 18, tracking: -0.1, family: 'Poppins_400Regular' },

  sectionTitle: { size: 17, line: 23, tracking: -0.4, family: 'Poppins_600SemiBold' },
  sectionLink: { size: 12, line: 16, tracking: -0.1, family: 'Poppins_400Regular' },

  cardTitle: { size: 15, line: 20, tracking: -0.3, family: 'Poppins_600SemiBold' },
  cardBody: { size: 12.5, line: 19, tracking: -0.1, family: 'Poppins_400Regular' },

  taskBody: { size: 12.5, line: 18, tracking: -0.1, family: 'Poppins_500Medium' },
} as const;

export const radius = {
  panel: 26,
  card: 22,
  field: 16,
  control: 12,
  pill: 999,
} as const;

/**
 * Sprig — the dish, second of a three-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off. What is taken from it: a lime hero with the plate sitting in it, a
 * white sheet riding up over the hero's bottom edge, and a row of nutrients
 * under the name.
 *
 * Its own copy of the tokens, per "One showcase per screen". The lime is the
 * same value as `sprighome`'s on purpose — it is one brand — but the file is
 * duplicated so blanking one showcase cannot reach into the other.
 */

export const sg = {
  canvas: '#FFFFFF',
  card: '#FFFFFF',
  well: '#F4F5F3',

  lime: '#D7EFA0',
  limeDeep: '#BFE173',
  limeInk: '#4A6A14',
  limeWash: '#EDF7D4',

  ink: '#101410',
  muted: '#8B908A',
  faint: '#BFC3BC',
  hairline: '#ECEEEA',

  panel: '#101410',
  onPanel: '#FFFFFF',
} as const;

/** The type ramp, in dp. */
export const type = {
  title: { size: 21, line: 28, tracking: -0.6, family: 'Poppins_600SemiBold' },

  factValue: { size: 14.5, line: 19, tracking: -0.3, family: 'Poppins_600SemiBold' },
  factLabel: { size: 10.5, line: 14, tracking: 0, family: 'Poppins_400Regular' },

  fieldLabel: { size: 11, line: 15, tracking: -0.1, family: 'Poppins_400Regular' },
  fieldValue: { size: 13.5, line: 18, tracking: -0.2, family: 'Poppins_500Medium' },

  button: { size: 14, line: 19, tracking: -0.2, family: 'Poppins_600SemiBold' },
  section: { size: 14.5, line: 20, tracking: -0.3, family: 'Poppins_600SemiBold' },

  rowName: { size: 12.5, line: 17, tracking: -0.2, family: 'Poppins_400Regular' },
  rowValue: { size: 12.5, line: 17, tracking: -0.2, family: 'Poppins_600SemiBold' },
} as const;

export const radius = {
  sheet: 28,
  field: 14,
  chip: 999,
  pill: 999,
} as const;

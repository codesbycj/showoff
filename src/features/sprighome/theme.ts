/**
 * Sprig — the day, first of a three-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). What is taken from it: a white
 * page, one lime that carries every surface that matters, black for the thing
 * that is selected, and three pastel macro tiles. Every size below is chosen
 * for a 393dp screen rather than measured off a posed phone.
 *
 * Poppins stands in for the reference's geometric sans. At matched cap height
 * it runs a little wide, so the display sizes are set from the line they have
 * to fit rather than from the shot.
 *
 * Its own copy of the tokens, per "One showcase per screen".
 */

export const sg = {
  canvas: '#FFFFFF',
  card: '#FFFFFF',
  well: '#F4F5F3',

  lime: '#D7EFA0',
  limeDeep: '#BFE173',
  limeInk: '#4A6A14',

  blue: '#D6E8F2',
  blueInk: '#2E5F7A',
  peach: '#FBE0CC',
  peachInk: '#9A5A26',

  ink: '#101410',
  muted: '#8B908A',
  faint: '#BFC3BC',
  hairline: '#ECEEEA',

  panel: '#101410',
  onPanel: '#FFFFFF',
} as const;

/** The type ramp, in dp. */
export const type = {
  greetSmall: { size: 11, line: 15, tracking: -0.1, family: 'Poppins_400Regular' },
  greet: { size: 15, line: 20, tracking: -0.3, family: 'Poppins_600SemiBold' },
  seg: { size: 13, line: 18, tracking: -0.2, family: 'Poppins_600SemiBold' },

  dayLetter: { size: 10.5, line: 14, tracking: 0, family: 'Poppins_400Regular' },
  dayNum: { size: 14, line: 19, tracking: -0.3, family: 'Poppins_600SemiBold' },

  gaugeBig: { size: 17, line: 22, tracking: -0.4, family: 'Poppins_700Bold' },
  gaugeLabel: { size: 10.5, line: 14, tracking: 0, family: 'Poppins_400Regular' },

  macroName: { size: 12, line: 16, tracking: -0.2, family: 'Poppins_500Medium' },
  macroValue: { size: 12.5, line: 17, tracking: -0.2, family: 'Poppins_600SemiBold' },

  button: { size: 13.5, line: 18, tracking: -0.2, family: 'Poppins_600SemiBold' },
  section: { size: 15, line: 20, tracking: -0.3, family: 'Poppins_600SemiBold' },

  mealName: { size: 13.5, line: 18, tracking: -0.2, family: 'Poppins_600SemiBold' },
  mealCal: { size: 10.5, line: 14, tracking: 0, family: 'Poppins_400Regular' },
  itemName: { size: 12.5, line: 17, tracking: -0.2, family: 'Poppins_500Medium' },
  itemCal: { size: 10.5, line: 14, tracking: 0, family: 'Poppins_400Regular' },
} as const;

export const radius = {
  card: 22,
  tile: 16,
  day: 12,
  chip: 999,
  pill: 999,
} as const;

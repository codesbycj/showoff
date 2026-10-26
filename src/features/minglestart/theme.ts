/**
 * Mingle — the welcome, first of a two-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off. What is taken from it: a full-bleed red page, a constellation of
 * circular portraits on faint concentric rings, a very large display sentence
 * with the brand name reversed out in a white box, and a white button with
 * an arrow disc on its right.
 *
 * The brand is invented; the reference's own wordmark is not copied
 * (AGENTS.md, "Sourcing assets").
 *
 * Its own copy of the tokens, per "One showcase per screen".
 */

export const mg = {
  red: '#F8443F',
  redDeep: '#E23531',
  ring: '#FA706C',
  onRed: '#FFFFFF',
  onRedDim: '#FFC9C7',

  card: '#FFFFFF',
  ink: '#16181C',
  muted: '#7C8089',
} as const;

/** The type ramp, in dp. */
export const type = {
  wordmark: { size: 19, line: 26, tracking: -0.5, family: 'Poppins_700Bold' },
  reg: { size: 9, line: 12, tracking: 0, family: 'Poppins_500Medium' },

  display: { size: 32, line: 42, tracking: -1.1, family: 'Poppins_700Bold' },
  displayBoxed: { size: 32, line: 42, tracking: -1.1, family: 'Poppins_700Bold' },
  lede: { size: 12.5, line: 18, tracking: -0.1, family: 'Poppins_400Regular' },

  button: { size: 15, line: 20, tracking: -0.3, family: 'Poppins_600SemiBold' },
} as const;

export const radius = {
  boxed: 12,
  button: 16,
  pill: 999,
} as const;

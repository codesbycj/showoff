/**
 * Eco Bites — the intro, first of a three-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). A **separate showcase** from
 * the other two screens — each owns its theme, layout, insets and text
 * primitive (AGENTS.md, "Showcase lifecycle").
 *
 * The palette is the one the reference prints beside the board: a lime, a
 * black, an off-white and an apricot.
 */

export const ec = {
  /** The page: off-white at the top, washing into the brand lime. */
  canvas: '#f8f8eb',
  canvasDeep: '#cfdd8e',

  ink: '#000000',
  muted: '#5f6350',
  onLime: '#1e2608',
  onDark: '#ffffff',

  /** The brand. */
  lime: '#adbf15',
  limeDeep: '#8ea00c',
  apricot: '#f4a46d',

  /** The pack's own type, printed on the photograph. */
  packInk: '#f2f7df',
  packLeaf: '#adbf15',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "Healthy Snacks, Better You". */
  display: { size: 27, line: 35, tracking: -0.9, family: 'Poppins_700Bold' },
  /** The line under it. */
  body: { size: 12.5, line: 19, tracking: -0.1, family: 'Poppins_400Regular' },
  /** "Get Started". */
  button: { size: 15, line: 20, tracking: -0.2, family: 'Poppins_600SemiBold' },

  /** "ECO", printed on the pack. */
  packTop: { size: 30, line: 33, tracking: -0.6, family: 'Poppins_700Bold' },
  /** "BITES", under it. */
  packBottom: { size: 30, line: 33, tracking: -0.6, family: 'Poppins_700Bold' },
  /** "Plant-Based Protein Balls", across the pack's foot. */
  packFoot: { size: 10, line: 13, tracking: 0.4, family: 'Poppins_500Medium' },
  /** "12g Protein Per Pack", in the pack's badge. */
  packBadge: { size: 8.5, line: 11, tracking: 0, family: 'Poppins_600SemiBold' },
} as const;

/** Corner radii. */
export const radius = {
  stage: 26,
  pill: 999,
  full: 999,
} as const;

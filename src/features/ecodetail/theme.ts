/**
 * Eco Bites — the product, third of a three-phone board.
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
  /** The page, and the lime panel the product stands on. */
  canvas: '#ffffff',
  canvasDeep: '#adbf15',
  /** A control on the panel, and an unselected size pill. */
  well: '#f2f3ea',
  glass: 'rgba(255,255,255,0.82)',
  /** The dark bar at the foot. */
  action: '#000000',
  /** The star beside the rating. */
  star: '#adbf15',
  rule: '#ececeb',

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
  /** "Details". */
  title: { size: 15, line: 20, tracking: -0.3, family: 'Poppins_600SemiBold' },
  /** "Eco Bites". */
  display: { size: 22, line: 29, tracking: -0.7, family: 'Poppins_700Bold' },
  /** "Plant-Based Protein Balls". */
  body: { size: 12, line: 18, tracking: -0.1, family: 'Poppins_400Regular' },
  /** "4.5". */
  rating: { size: 13, line: 18, tracking: -0.2, family: 'Poppins_600SemiBold' },
  /** "Select Pack Size", "Description". */
  section: { size: 13.5, line: 18, tracking: -0.3, family: 'Poppins_600SemiBold' },
  /** A size pill. */
  size: { size: 11.5, line: 16, tracking: -0.1, family: 'Poppins_500Medium' },
  /** The paragraph. */
  description: { size: 11.5, line: 18, tracking: -0.1, family: 'Poppins_400Regular' },
  /** "Add to Cart". */
  button: { size: 14, line: 19, tracking: -0.2, family: 'Poppins_600SemiBold' },

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

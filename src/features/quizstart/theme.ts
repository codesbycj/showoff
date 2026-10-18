/**
 * Quiz — the intro screen, first of a three-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). A **separate showcase** from
 * the other two screens — each owns its theme, layout, insets and text
 * primitive (AGENTS.md, "Showcase lifecycle").
 */

export const qz = {
  /** The page: warm paper, which is what the whole board sits on. */
  canvas: '#f3ece0',
  /** The card the artwork is staged on, a shade lighter. */
  stage: '#f8f3ea',

  ink: '#151310',
  muted: '#6f675c',

  /** The button. */
  action: '#151310',
  onAction: '#ffffff',

  /**
   * The blobs behind the photograph. Flat shapes, which is what the reference
   * puts there and squarely in drawing range — the *person* is a photograph.
   */
  blobOrange: '#f06a2a',
  blobPurple: '#7c4fd4',
  blobYellow: '#f3b229',
  blobTeal: '#2f9e8f',

  /** The doodles scribbled round the artwork. */
  doodle: '#151310',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "Quiz". */
  wordmark: { size: 54, line: 62, tracking: -2, family: 'PlusJakartaSans_800ExtraBold' },
  /** "Play, Learn & Win". */
  tagline: { size: 14, line: 19, tracking: -0.2, family: 'PlusJakartaSans_500Medium' },

  /** "Challenge Your Brain". */
  headline: { size: 20, line: 26, tracking: -0.5, family: 'PlusJakartaSans_700Bold' },
  /** The paragraph under it. */
  body: { size: 12.5, line: 19, tracking: 0, family: 'PlusJakartaSans_400Regular' },

  /** "Get Started". */
  button: { size: 15, line: 20, tracking: -0.2, family: 'PlusJakartaSans_700Bold' },
} as const;

/** Corner radii. */
export const radius = {
  stage: 22,
  button: 999,
  full: 999,
} as const;

/**
 * We Crossed Paths — the intro, first of a three-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). A **separate showcase** from
 * the other two screens — each owns its theme, layout, insets and text
 * primitive (AGENTS.md, "Showcase lifecycle").
 */

export const hp = {
  /** The sheet under the photograph. */
  sheet: '#ffffff',

  ink: '#101828',
  muted: '#6a7384',
  onPhoto: '#ffffff',

  /** The ghost wordmark laid over the sky. */
  ghost: 'rgba(255,255,255,0.46)',

  /** The brand blue, and the dark button. */
  blue: '#2f9bf5',
  action: '#101828',
  onAction: '#ffffff',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** The small mark at the top of the photograph. */
  mark: { size: 15, line: 20, tracking: 0.2, family: 'Poppins_600SemiBold' },
  /** "HAPPN", the ghost wordmark behind the figure. */
  ghost: { size: 74, line: 76, tracking: -3, family: 'Poppins_700Bold' },
  /** "WE CROSSED PATHS", over the figure. */
  over: { size: 34, line: 36, tracking: -1, family: 'Caveat_600SemiBold' },

  /** "Your Perfect Match Is One Swipe Away". */
  headline: { size: 20, line: 27, tracking: -0.5, family: 'Poppins_700Bold' },
  /** The paragraph under it. */
  body: { size: 12.5, line: 19, tracking: -0.1, family: 'Poppins_400Regular' },
  /** "Get Started". */
  button: { size: 15, line: 20, tracking: -0.2, family: 'Poppins_600SemiBold' },
} as const;

/** Corner radii. */
export const radius = {
  sheet: 30,
  pill: 999,
  full: 999,
} as const;

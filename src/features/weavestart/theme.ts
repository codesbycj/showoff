/**
 * Weave — the sign-in screen, first of a three-phone board.
 *
 * Only this screen was asked for, so the showcase is this screen alone — one
 * showcase per screen, with its own theme, layout, insets and text primitive
 * (AGENTS.md, "Showcase lifecycle").
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). The palette and the order of
 * the blocks are taken from it; every size is chosen for a real 393dp screen.
 */

export const wv = {
  /** The page. */
  canvas: '#1b1b1d',
  /** The brand pill at the top of the cluster. */
  brand: '#ffffff',
  onBrand: '#1b1b1d',

  ink: '#ffffff',
  muted: 'rgba(255, 255, 255, 0.6)',

  /** The Google button. */
  light: '#ffffff',
  onLight: '#1b1b1d',
  /** The Apple button, which is the page with an edge on it. */
  darkEdge: 'rgba(255, 255, 255, 0.22)',

  /** The link at the foot. */
  link: '#f4663a',

  /**
   * The category pills. These are the whole personality of the screen: five
   * saturated tags thrown down at angles, which is what says the app is about
   * planning a life rather than filling a form.
   */
  tags: {
    shopping: '#f4663a',
    birthday: '#9ed64a',
    meeting: '#f3b229',
    holiday: '#3c9ef0',
    todo: '#f4663a',
  },
  onTag: '#1b1b1d',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "fitplan". */
  brand: { size: 15, line: 20, tracking: -0.3, family: 'PlusJakartaSans_700Bold' },
  /** The words on the coloured pills. */
  tag: { size: 17, line: 23, tracking: -0.3, family: 'PlusJakartaSans_700Bold' },

  /** "Weave Your / Time, Design / Your Destiny." */
  display: { size: 31, line: 40, tracking: -0.8, family: 'PlusJakartaSans_700Bold' },

  /** "Continue with Google". */
  button: { size: 14.5, line: 19, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },
  /** "Don't have an account?" */
  foot: { size: 11.5, line: 15, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  footLink: { size: 11.5, line: 15, tracking: 0, family: 'PlusJakartaSans_700Bold' },
} as const;

/** Corner radii. */
export const radius = {
  pill: 999,
  button: 999,
  full: 999,
} as const;

/**
 * The one shadow, under the brand pill at the top of the cluster.
 *
 * `shadow*` and `elevation` travel together in one object rather than behind a
 * `Platform.select`: the keys the running platform ignores are inert, and a
 * select is exactly what the web harness cannot check.
 */
export const shadow = {
  pill: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
} as const;

/**
 * RentaX — the detail screen, second of the two-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). The palette and the order of
 * the blocks are taken from it; every size is chosen for a real 393dp screen.
 *
 * A **separate showcase** from the browse screen — each owns its theme,
 * layout, insets and text primitive, so blanking one cannot reach the other
 * (AGENTS.md, "Showcase lifecycle").
 */

export const rx = {
  /** The top half, where the car is. */
  stage: '#f5e03f',
  onStage: '#121212',
  onStageMuted: 'rgba(18, 18, 18, 0.55)',

  /** The bottom half. */
  canvas: '#0e0e0f',
  onDark: '#ffffff',
  onDarkMuted: 'rgba(255, 255, 255, 0.58)',
  /** The three stat tiles, and the brand badge. */
  raised: '#1b1b1d',
  raisedEdge: 'rgba(255, 255, 255, 0.1)',

  /** The book button. */
  action: '#8b5cf6',
  onAction: '#ffffff',

  /** The tick beside the safety line. */
  check: '#2fbf6a',

  /** The car. */
  body: '#2f6df0',
  bodyDeep: '#2457c4',
  glass: 'rgba(18, 18, 18, 0.72)',
  shade: 'rgba(18, 18, 18, 0.16)',
  lamp: '#ffffff',

  /** The review faces. */
  faces: ['#f2c4a0', '#a8c8f2', '#c9b7f0'],
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "Car Details". */
  title: { size: 15, line: 20, tracking: -0.3, family: 'PlusJakartaSans_700Bold' },
  /** "Model 360°". */
  caption: { size: 10.5, line: 14, tracking: 0.2, family: 'PlusJakartaSans_500Medium' },

  /** "Porsche 911 GT3". */
  name: { size: 19, line: 25, tracking: -0.5, family: 'PlusJakartaSans_700Bold' },
  /** The paragraph under it. */
  body: { size: 11, line: 16, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  /** The safety line, which the reference sets heavier than the paragraph. */
  note: { size: 10.5, line: 15, tracking: 0, family: 'PlusJakartaSans_500Medium' },

  /** "4,3". */
  rating: { size: 12.5, line: 17, tracking: -0.1, family: 'PlusJakartaSans_700Bold' },
  /** "Reviews". */
  link: { size: 11, line: 15, tracking: -0.1, family: 'PlusJakartaSans_500Medium' },

  /** "570". */
  statValue: { size: 15, line: 20, tracking: -0.3, family: 'PlusJakartaSans_700Bold' },
  /** "km", "km/h", "kw". */
  statUnit: { size: 9, line: 12, tracking: 0, family: 'PlusJakartaSans_400Regular' },

  /** "$900". */
  price: { size: 20, line: 26, tracking: -0.5, family: 'PlusJakartaSans_700Bold' },
  /** "/ 1 day". */
  priceUnit: { size: 10.5, line: 14, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  /** "Book Car". */
  action: { size: 13, line: 17, tracking: -0.2, family: 'PlusJakartaSans_700Bold' },
} as const;

/** Corner radii. */
export const radius = {
  sheet: 28,
  tile: 14,
  pill: 999,
  full: 999,
} as const;

/**
 * The one shadow, under the book button.
 *
 * `shadow*` and `elevation` travel together in one object rather than behind a
 * `Platform.select`: the keys the running platform ignores are inert, and a
 * select is exactly what the web harness cannot check.
 */
export const shadow = {
  action: {
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 8,
  },
} as const;

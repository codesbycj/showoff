/**
 * Miles — the home screen, first of a two-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). A **separate showcase** from
 * the other screen — each owns its theme, layout, insets and text primitive
 * (AGENTS.md, "Showcase lifecycle").
 */

export const ml = {
  /** The page: a bright blue, deepening down the screen. */
  canvasTop: '#2f8ef0',
  canvas: '#1d69d2',

  /** A control that floats on it. */
  surface: '#ffffff',

  ink: '#0e1b2e',
  muted: '#6a7384',
  onCanvas: '#ffffff',
  onCanvasSoft: 'rgba(255,255,255,0.78)',

  /** The dining card. */
  dining: '#6d1414',

  /** The call to action. */
  action: '#1b4fd6',
  onAction: '#ffffff',

  /** The tab bar. */
  tabInk: '#e03c3c',
  tabMuted: '#8e97a6',
  rule: '#eceff4',

  /** The page dots under the card. */
  dot: 'rgba(255,255,255,0.45)',
  dotOn: '#ffffff',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "Good morning". */
  greetingMeta: { size: 11, line: 15, tracking: -0.1, family: 'Poppins_400Regular' },
  /** "Jacob Jones". */
  greeting: { size: 14.5, line: 19, tracking: -0.3, family: 'Poppins_600SemiBold' },

  /** "Available miles". */
  balanceLabel: { size: 12.5, line: 17, tracking: -0.1, family: 'Poppins_400Regular' },
  /** "84,320". */
  balance: { size: 54, line: 62, tracking: -2.6, family: 'Poppins_700Bold' },
  /** "+2,140 this month". */
  balanceMeta: { size: 12.5, line: 17, tracking: -0.2, family: 'Poppins_500Medium' },

  /** "dining", on the card. */
  card: { size: 21, line: 27, tracking: -0.6, family: 'Poppins_700Bold' },
  /** "142 partners". */
  cardMeta: { size: 12, line: 16, tracking: -0.1, family: 'Poppins_500Medium' },

  /** "Redeem my miles". */
  button: { size: 14, line: 19, tracking: -0.2, family: 'Poppins_600SemiBold' },

  /** A tab's label. */
  tab: { size: 10.5, line: 14, tracking: -0.1, family: 'Poppins_500Medium' },
} as const;

/** Corner radii. */
export const radius = {
  card: 18,
  pill: 999,
  full: 999,
} as const;

/**
 * The floating surfaces' shadow.
 *
 * `shadow*` and `elevation` travel together in one object — a `Platform.select`
 * between them is exactly what the web harness cannot check.
 */
export const shadow = {
  float: {
    shadowColor: '#07294f',
    shadowOpacity: 0.22,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
} as const;

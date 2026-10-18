/**
 * We Crossed Paths — the discover screen, second of a three-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). A **separate showcase** from
 * the other two screens — each owns its theme, layout, insets and text
 * primitive (AGENTS.md, "Showcase lifecycle").
 */

export const hp = {
  /** The page: a pale sky, washing lighter down the screen. */
  canvasTop: '#cfe6fb',
  canvas: '#eaf4fe',

  /** A control that floats on it. */
  surface: '#ffffff',
  surfaceSoft: 'rgba(255,255,255,0.82)',

  ink: '#101828',
  muted: '#6a7384',
  onPhoto: '#ffffff',

  /** The brand blue: the verified tick, the camera disc, the match chip. */
  blue: '#2f9bf5',
  blueDeep: '#1668c4',

  /** The five category rings, in order. */
  ring: ['#2f9bf5', '#8b5cf6', '#22c08a', '#f5a524', '#f05d7a'] as const,

  /**
   * The rail of actions down the card's right edge, and the labels over the
   * photograph.
   *
   * Dark and translucent, not light: the reference's card photo is a figure
   * against a bright sky, so a white chip reads on it; a studio portrait with
   * a white backdrop swallows one whole, and the chip disappears rather than
   * looking subtle.
   */
  rail: 'rgba(16,24,40,0.46)',
  chip: 'rgba(16,24,40,0.42)',
  /** The scrim under the name, so the type reads whatever is behind it. */
  scrim: 'rgba(8,14,26,0.72)',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "Good morning". */
  greetingMeta: { size: 11, line: 15, tracking: -0.1, family: 'Poppins_400Regular' },
  /** "Jenny Wilson". */
  greeting: { size: 14.5, line: 19, tracking: -0.3, family: 'Poppins_600SemiBold' },
  /** "Map". */
  action: { size: 13, line: 18, tracking: -0.2, family: 'Poppins_600SemiBold' },

  /** A category's label. */
  category: { size: 10.5, line: 14, tracking: -0.1, family: 'Poppins_500Medium' },

  /** "New", and "92% Match". */
  chip: { size: 10.5, line: 14, tracking: -0.1, family: 'Poppins_600SemiBold' },
  /** "Aisha, 26". */
  name: { size: 21, line: 27, tracking: -0.6, family: 'Poppins_700Bold' },
  /** "Marketing Manager". */
  role: { size: 12, line: 16, tracking: -0.1, family: 'Poppins_400Regular' },
  /** An interest chip. */
  interest: { size: 10.5, line: 14, tracking: -0.1, family: 'Poppins_500Medium' },

  /** A tab's label. */
  tab: { size: 10, line: 13, tracking: -0.1, family: 'Poppins_500Medium' },
} as const;

/** Corner radii. */
export const radius = {
  card: 26,
  chip: 999,
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
    shadowColor: '#0d3b66',
    shadowOpacity: 0.16,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
} as const;

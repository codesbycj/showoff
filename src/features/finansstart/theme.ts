/**
 * Finans — the landing screen, first of a three-phone board.
 *
 * The reference is a **design shot**: three phones posed on a light grey
 * board. So this is an inspo brief and rule 1 is off (AGENTS.md, "Three kinds
 * of reference"). The palette and the order of the blocks are taken from it;
 * every size is chosen for a real 393dp screen.
 *
 * A **separate showcase** from the other two screens of the same board — each
 * one owns its theme, layout, insets and text primitive so that blanking one
 * cannot reach into another (AGENTS.md, "Showcase lifecycle").
 *
 * The face is Plus Jakarta Sans, already registered, so this showcase adds no
 * font file and drifts no other showcase's lock.
 */

export const fn = {
  // ---- the page ----------------------------------------------------------
  /** Paper. The board's phone is warm white, not #fff. */
  canvas: '#fdfcfa',
  /** The wash in the top-left corner, which is where the light comes from. */
  washWarm: '#f6e7dc',
  /** And the cool it falls away to on the right. */
  washCool: '#f1f2f4',

  // ---- the brand ---------------------------------------------------------
  /** The one colour the board is built on. */
  yellow: '#ffd43b',
  /** The add button, a half-step deeper so it reads as a control. */
  yellowDeep: '#f5c518',
  /** Ink on yellow. */
  onYellow: '#141414',

  // ---- the cards in the collage ------------------------------------------
  /** The card at the back, mostly off the left edge. */
  cardDark: '#141414',
  /** The one in front of it. */
  cardMint: '#cfe7d6',
  /** And the white one it overlaps. */
  cardPale: '#ffffff',
  /** A card's own hairline, which is what separates white from white. */
  cardEdge: '#ebe9e4',

  // ---- ink ---------------------------------------------------------------
  ink: '#111111',
  /** The paragraph under the headline. */
  muted: '#8a8a85',
  /** A card's small print. */
  cardMuted: '#8e8e88',
  onDark: '#ffffff',

  /** The flag discs on the floating pills, drawn rather than set as emoji. */
  flagRed: '#c8102e',
  flagBlue: '#1e3a8a',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "Finans". */
  wordmark: { size: 19, line: 25, tracking: -0.5, family: 'PlusJakartaSans_700Bold' },

  /** "Good finances, / better life." */
  display: { size: 33, line: 40, tracking: -1, family: 'PlusJakartaSans_700Bold' },
  /** The paragraph under it. */
  body: { size: 11.5, line: 17, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  /** "Get Started". */
  button: { size: 15, line: 20, tracking: -0.2, family: 'PlusJakartaSans_700Bold' },

  /** "Transfer", "Request", "US Dollar" on the floating pills. */
  pill: { size: 11, line: 15, tracking: -0.1, family: 'PlusJakartaSans_600SemiBold' },

  /** "Your balance", "Account number", "Valid Thru". */
  cardLabel: { size: 8.5, line: 11.5, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  /** "$40,500.80". */
  cardAmount: { size: 17, line: 23, tracking: -0.5, family: 'PlusJakartaSans_700Bold' },
  /** "**** 9934", "05/28". */
  cardValue: { size: 9.5, line: 13, tracking: 0.2, family: 'PlusJakartaSans_600SemiBold' },
  /** "US Dollar" on a card. */
  cardKind: { size: 10, line: 13, tracking: -0.1, family: 'PlusJakartaSans_600SemiBold' },
} as const;

/** Corner radii. */
export const radius = {
  /** A card in the collage. */
  card: 16,
  /** The floating pills and the button. */
  pill: 999,
  full: 999,
} as const;

/**
 * The shadows. Cards in a collage need them or the stack reads flat.
 *
 * `shadow*` and `elevation` travel together in one object rather than behind a
 * `Platform.select`: the keys the running platform ignores are inert, and a
 * select is exactly what the web harness cannot check.
 */
export const shadow = {
  card: {
    shadowColor: '#9d968c',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 7,
  },
  pill: {
    shadowColor: '#a8a299',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 4,
  },
} as const;

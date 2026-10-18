/**
 * Paytin — onboarding, the first of a three-screen board.
 *
 * The reference is a **design shot**: three phones posed on a light grey board
 * with the brand's wordmark and URL across the top. So this is an inspo brief
 * and rule 1 is off — see "Three kinds of reference" in AGENTS.md. The palette
 * and the type hierarchy are taken from it; every size is chosen for a real
 * 393dp screen.
 *
 * The face is Plus Jakarta Sans, already registered. The board's headline is a
 * heavy geometric grotesque with very tight spacing; Jakarta's ExtraBold is
 * the closest free face already in the repo, so this showcase adds no font
 * file and drifts no other showcase's lock.
 */

export const pt = {
  // ---- the brand ---------------------------------------------------------
  /** The page. The whole screen is this one colour. */
  lime: '#c5f24e',
  /** The disc behind the illustration — a half-step down from the page. */
  limeDeep: '#b6e73c',
  /** The shadow the disc throws, which is just more of the same green. */
  limeShade: '#aadd33',

  /** Ink. Everything drawn on the lime is this, at full strength. */
  ink: '#111111',
  /** The sentence under the headline, and anything deliberately quieter. */
  inkSoft: 'rgba(17, 17, 17, 0.62)',
  /** On the black pill and the black round button. */
  onInk: '#ffffff',

  /** The paper the illustration's wallet and card are drawn on. */
  paper: '#ffffff',
} as const;

/**
 * The type ramp, in dp, for a 393dp phone.
 *
 * `line` is explicit everywhere: React Native and the web harness disagree
 * about default leading, and this headline is three lines that have to stack
 * tight enough to read as a block.
 */
export const type = {
  /** "Digital Banking / Made for / Digital Users". */
  display: { size: 31, line: 42, tracking: -0.9, family: 'PlusJakartaSans_800ExtraBold' },
  /** "Spend, earn and track financial activity". */
  lede: { size: 12.5, line: 18, tracking: -0.1, family: 'PlusJakartaSans_500Medium' },
  /** "Skip" and "Let's Start". */
  action: { size: 13.5, line: 18, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },
} as const;

/** Corner radii. */
export const radius = {
  /** The pill set into the headline. */
  pill: 999,
  /** Anything fully round. */
  full: 999,
  /** The card and the wallet in the illustration. */
  card: 10,
} as const;

/**
 * The one shadow on the screen, under the round start button.
 *
 * `shadow*` and `elevation` travel together in one object rather than behind a
 * `Platform.select`: the keys the running platform ignores are inert, and a
 * select is exactly what the web harness cannot check.
 */
export const shadow = {
  start: {
    shadowColor: '#2b3d05',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.26,
    shadowRadius: 12,
    elevation: 6,
  },
} as const;

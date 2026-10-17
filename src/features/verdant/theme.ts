/**
 * Verdant — "Your Money, Better Days", the first of three onboarding screens.
 *
 * The reference is a **design shot**, not an app export: three phones posed on
 * a warm grey board with shadows and a 3D wallet render dropped into the first
 * one. So this is an inspo brief — see "Three kinds of reference" in AGENTS.md.
 * Nothing here is a measurement divided by a px/dp scale; the palette is
 * sampled off the shot (colour is the one thing a posed phone still reports
 * honestly), and every size is chosen for a real 393dp phone.
 *
 * The face is Plus Jakarta Sans, already registered in `src/theme/fonts.ts`.
 * The shot's own headline is a tight neo-grotesque — SF Pro Display or near
 * it — and Jakarta's ExtraBold carries the same weight with a friendlier `y`
 * and a rounder `o`, which suits a wealth app better than Inter's flatter
 * terminals. Adding no font file also drifts no other showcase's lock.
 */

export const vd = {
  // ---- the canvas --------------------------------------------------------
  /**
   * The page. The shot's background is not flat — it is a deep forest green
   * lit from the lower right, sampling #173b2d at the top left and #4d6f5f
   * where the light lands. Rebuilt here as a real gradient plus a radial
   * glow rather than flattened to one fill.
   */
  canvasTop: '#14382a',
  canvasMid: '#17402f',
  canvasBottom: '#0f2a20',
  /** The light in the lower right, and the bounce it throws on the stage. */
  light: '#5c8872',
  /** The darkest corner, top left, where the vignette closes in. */
  shade: '#0c2219',

  // ---- ink ---------------------------------------------------------------
  /** "Your Money" and the counter. */
  ink: '#ffffff',
  /** "Better Days" — the pale sage the shot sets the second line in. */
  mint: '#dcefd2',
  /** The lede under the headline. A cool pale green, not grey. */
  lede: '#d3e7de',
  /** "Skip", and anything else deliberately quiet. */
  quiet: 'rgba(255, 255, 255, 0.72)',

  // ---- the progress rail -------------------------------------------------
  /** The step that is done. */
  railOn: '#dcefd2',
  /** The ones still to come. */
  railOff: 'rgba(255, 255, 255, 0.22)',

  // ---- the button --------------------------------------------------------
  /** Warm off-white, not pure white — the shot's button is #f8f7f2. */
  button: '#f8f7f2',
  /** Its label, the deepest green on the screen. */
  buttonInk: '#123326',

  // ---- the stage ---------------------------------------------------------
  /**
   * The 3D wallet in the shot cannot be recreated and must not be traced
   * badly, so it is rebuilt as the thing it is a picture of: a real leather
   * pocket with two real cards in it, posed on a lit pedestal. These are its
   * materials.
   */
  leather: '#163a2b',
  leatherLip: '#2a5e46',
  leatherDeep: '#0d2820',
  /** The stitch that runs round the pocket. */
  stitch: 'rgba(220, 239, 210, 0.2)',
  /** The brass stud on the flap. */
  stud: '#c9a86a',
  studShade: '#8f7340',
  /** The card that sits furthest back — pale, catching the light. */
  cardPale: '#e7ece4',
  cardPaleEdge: '#c3cdc0',
  /** The card in front of it — the brand's own, deep green. */
  cardDark: '#306d51',
  cardDarkEdge: '#44906a',
  /** The chip. */
  chip: '#d8bd7f',
  chipLine: 'rgba(24, 58, 42, 0.45)',
  /** The pedestal the wallet stands on, and the pool of light under it. */
  pedestal: '#1b4332',
  pedestalTop: '#2a5d45',
  shadow: 'rgba(5, 20, 14, 0.55)',
} as const;

/**
 * The type ramp, in dp, chosen for a 393dp screen rather than read off the
 * board.
 *
 * `line` is explicit everywhere because React Native and the web harness
 * disagree about default leading, and the headline is two lines that have to
 * sit tight.
 */
export const type = {
  /** "01 / 03". Tabular-feeling, so it carries a little tracking. */
  counter: { size: 13, line: 17, tracking: 0.2, family: 'PlusJakartaSans_600SemiBold' },
  /** "Skip". */
  skip: { size: 14.5, line: 18, tracking: 0, family: 'PlusJakartaSans_500Medium' },
  /** "Your Money" / "Better Days". A display size for a 393dp phone. */
  display: { size: 40, line: 46, tracking: -1.1, family: 'PlusJakartaSans_800ExtraBold' },
  /** The lede. 16/24 is the comfortable body setting at this width. */
  lede: { size: 15.5, line: 23.5, tracking: -0.1, family: 'PlusJakartaSans_400Regular' },
  /** "Get Started". */
  button: { size: 16.5, line: 21, tracking: -0.2, family: 'PlusJakartaSans_700Bold' },
} as const;

/** Corner radii. */
export const radius = {
  /** The cards in the wallet. */
  card: 9,
  /** The wallet body. */
  wallet: 18,
  /** The progress rail segments. */
  rail: 3,
  /** Anything fully round: the button, the stud. */
  full: 999,
} as const;

/**
 * The two shadows on the screen.
 *
 * `shadow*` and `elevation` travel together in one object rather than behind a
 * `Platform.select` — the keys the running platform ignores are inert, and a
 * select is exactly what the web harness cannot check.
 */
export const shadow = {
  /** Under the wallet, onto the pedestal. */
  wallet: {
    shadowColor: '#06170f',
    shadowOffset: { width: -6, height: 18 },
    shadowOpacity: 0.55,
    shadowRadius: 26,
    elevation: 14,
  },
  /** Under the button, which lifts off a dark page. */
  button: {
    shadowColor: '#06170f',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
} as const;

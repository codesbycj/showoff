/**
 * Every constant the surface uses, in one file.
 *
 * None of these were eyeballed. The reference ships its GLSL inside template
 * literals, which a minifier cannot touch, so the whole shader arrived with its
 * comments intact — every constant as a named float with a paragraph next to it
 * saying what it is for. The JS-side values came out of the same bundle. The
 * README says how to get them back.
 *
 * The names below are the reference's own, so a number here can be grepped for
 * in its bundle and found.
 */

/** The camera. Both of these set how much `z` is worth on screen. */
export const CAMERA = {
  /** `new PerspectiveCamera(53.4, 1, 0.1, 2000)`. */
  fov: 53.4,
  near: 0.1,
  far: 2000,
  /** `camera.position.z = 41.18`. */
  z: 41.18,
} as const;

/**
 * The ribbon — the scroll deformation.
 *
 * The thing to understand before reading any of it: the strip is NOT a row of
 * planes each leaning on its own. Every card is pushed through one shared
 * world-space function, so they lie on a single surface. That is why the order
 * inside `sheet()` matters and why the cards' own transforms never touch it.
 *
 * The shape is one S in DEPTH, not in screen y: near through the left half, far
 * through the right, faded to flat at both ends by a gaussian tail. The wavy
 * silhouette in the reference is not the geometry bending — it is perspective
 * bending it, which is why the card edges stay straight lines in world space and
 * still read as curved on screen.
 */
export const SHEET = {
  /** Slides the whole profile along x. Negative puts the near peak left of centre. */
  shift: -0.2,
  /** The gaussian tail: how fast every term decays to flat off frame. */
  tail: 1.0,
  /** Radians of bank at the steepest point of the sweep. Negative leans into it. */
  bank: -0.16,
  /** A constant shear: the whole strip hangs off true by this much. */
  diag: 0.03,
  /** A y-wave along the ribbon. Shipped at 0 — the reference turned it off. */
  wave: 0.0,
  waveFreq: 0.8,
  wavePhase: 0.35,
  /** Speed lifts the left of the ribbon and brings it nearer. */
  rearY: 0.1,
  rearZ: 0.2,
  /** Speed also wrings the two ends against each other. */
  vTwist: 1.8,

  /** Depth of the sweep, as a share of the frustum half-width. */
  depth: 0.2,
  /** How much of the profile fits across the frame. */
  span: 1.15,
  /** The hinge the whole strip swings on, as a share of the half-width. */
  door: -0.12,
  /** Extra depth at full speed: `D = W * depth * (1 + velDepth * |v|)`. */
  velDepth: 1.1,

  /**
   * Profile blend. 1 is the S — near through the left, far through the right.
   * 0 would be a plain symmetric bowl.
   *
   * The bowl is never used here, and finding out why was worth the detour: with
   * a symmetric profile the deepest point sits in the MIDDLE of the frame, and
   * the depth haze is normalised by the sweep's own range — so the card you are
   * looking at is the one shaded hardest, and the whole strip goes murky. The
   * reference does not solve that; it switches the ribbon off below its
   * breakpoint entirely (`sheet = small ? null : this.sheet()`), which is what
   * `breakpoint` below does.
   */
  curve: 1,

  /**
   * Below this width the ribbon is off and the strip lies flat. A sweep needs
   * room to travel from near to far to read as travelling; on a phone showing
   * barely one card it only looks lopsided, and it costs a fragment shader
   * doing real work on the device least able to afford it.
   */
  breakpoint: 768,
} as const;

/**
 * Scroll velocity, smoothed.
 *
 * `tanh` first so a fast flick saturates instead of tearing the surface apart,
 * then multiplied by its own magnitude — which keeps the sign and squares the
 * response, so small movements barely register and the ribbon only really
 * answers a deliberate throw.
 */
export const VELOCITY = {
  /**
   * What counts as "fast", in CSS pixels **per frame**.
   *
   * The number is the reference's; the unit is the one thing in this file that
   * had to be deduced rather than read, and getting it wrong is spectacular.
   * Read as px/second, 550 is a slow drag — every ordinary scroll pins `tanh`
   * at 1, and at full velocity the edge twist is 1.8 radians, which folds a
   * card into a cone. Read as px/frame it is an enormous throw, which is what
   * a saturation ceiling is supposed to be.
   */
  norm: 550,
  /** Per-frame smoothing of the raw pointer/wheel speed, before tanh. */
  ease: 0.12,
  /** Below this the velocity terms are skipped entirely. */
  epsilon: 0.001,
} as const;

/**
 * The hover.
 *
 * The middle of the card bows AWAY and the rim does not move at all: the dome
 * is 1 at the centre and exactly 0 along every edge, so the silhouette is
 * untouched however deep it goes. Nothing about the card's box changes — what
 * it overlaps, where its corners are — which is what lets it be a hover on a
 * strip where every material runs with `depthTest: false` and a card that grew
 * would simply draw on top of its neighbour.
 *
 * It is a surface answering, not a colour. Depth is taken as a share of the
 * card's own height, so a dent looks the same on a phone as on a desktop.
 */
export const HOVER = {
  /** `u_dent`: how far the middle bows back, as a share of the card's height. */
  dent: 0.1,
  /** The reference's `cards.hover`, verbatim. */
  dur: 0.5,
  ease: 'expo',
  outDur: 0.5,
  outEase: 'expo',
} as const;

/**
 * The light that makes the deformation visible at all.
 *
 * Without it both effects are nearly invisible: a photograph on a shallow curve
 * looks like a flat photograph. The gloss is deliberately tight — a broad sheen
 * over a picture is indistinguishable from the whole card getting brighter.
 */
export const LIGHT = {
  /** Up, left, and toward the viewer — the way the hinge already leans the strip. */
  dir: [-0.4, 0.5, 1.0] as const,
  gloss: 48.0,
  spec: 0.35,
  diff: 0.12,
  /** The colour distant parts of the surface sink toward. */
  haze: 0.059,
  /**
   * How much of it the far end of the sweep takes. The reference uses 0.8, and
   * that is right for its covers: screenshots of bright websites, which still
   * read at 20% of their own luminance. These covers are photographs with far
   * less headroom, and 0.8 crushed the right-hand third of every card to black
   * rather than to distance. Pulled back to the point where it still reads as
   * atmosphere on a mid-tone frame.
   */
  hazeAmount: 0.55,
} as const;

/** The grid the strip floats over. */
export const FLOOR = {
  cell: 0.22,
  line: 0.08,
  alpha: 0.9,
  /** How far below the strip it sits, as a share of the frustum half-height. */
  drop: 0.06,
  /** Cells across and back. */
  wide: 4,
  run: 6,
} as const;

/** The strip's own layout and scrolling. */
export const STRIP = {
  /**
   * Card width as a share of the frustum width, and its aspect. On a narrow
   * screen the card takes a far bigger share — there is no room to show
   * neighbours as context, so the one card on screen may as well be readable.
   */
  cardW: 0.46,
  cardWSmall: 0.86,
  cardAspect: 16 / 10,
  /** Gap between cards, as a share of a card's width. */
  gap: 0.12,
  /** Plane tessellation. The reference uses 24x24 — enough for a gloss. */
  segments: 24,
  /** Wheel and drag gain, against a target measured in real CSS pixels. */
  wheel: 1,
  drag: 1.6,
  /**
   * How fast the rendered offset chases the target, per frame at 60fps. This
   * is the coast: 0.075 is a time constant of about a fifth of a second, which
   * is roughly what a smooth-scroll library settles at and keeps the velocity
   * term inside the range `tanh(v / 550)` was calibrated for.
   */
  followEase: 0.075,
} as const;

/** Reduced motion: the surface is flat and the hover does not deform. */
export const REDUCED = {
  sheetP: 0,
  dent: 0,
} as const;

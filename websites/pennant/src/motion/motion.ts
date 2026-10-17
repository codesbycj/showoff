/**
 * Every number this hero moves by, in one file.
 *
 * The reference is a Next.js site, so its behaviour ships as chunks under
 * `/_next/static/immutable/chunks/`. Minified, but every constant below is a
 * literal in one of them — nothing here was eyeballed off a video, and the two
 * places a value is *derived* rather than written are marked with the
 * arithmetic that derives it.
 *
 * Two things are going on in the hero at once:
 *
 *   1. a looping render of ribbons is drawn into a WebGL canvas and pushed
 *      around by the pointer — ambient drift always, drag/pressure/swirl under
 *      the cursor, and a ring that spreads from a click;
 *   2. the copy in the bottom-left resolves out of blur, word by word.
 *
 * The first is the one worth reading the source for: it looks like a video and
 * it is not, and no amount of watching it would have given up the numbers.
 */

/* ------------------------------------------------------------------ the field */

/**
 * The reference's component takes these as props, and the hero uses its
 * defaults for all of them. They are kept in this shape — authored value, then
 * the derivation — because the derived numbers are meaningless on their own and
 * the authored ones are what anyone would want to change.
 */
const AUTHORED = {
  /** `strength`. Scales every displacement term. */
  strength: 0.8,
  /** `effectRadius`. How much of the frame the cursor disturbs, on hover. */
  effectRadius: 0.5,
  /** `mouseForce`. Clamped to 2.5 by the component, and the hero asks for 3. */
  mouseForce: 2.5,
  /** `smoothness` 10, divided by 10 and clamped to 1. Drives every lerp below. */
  smoothness: 1,
  /** `idleMotion`. The ambient drift, which never switches off. */
  idleMotion: 0.4,
  /** `liquidness`. Near zero: the swirl and the radial wave are almost absent. */
  liquidness: 0.01,
  /** `edgeProtection`. Keeps the displacement off the frame's own edges. */
  edgeProtection: 0.1,
} as const;

const { strength, effectRadius, mouseForce, smoothness, idleMotion, liquidness } = AUTHORED;

/** The uniform values, exactly as the reference computes them. */
export const FIELD = {
  /** 0.42 * effectRadius — the radius with the pointer away. */
  idleRadius: 0.42 * effectRadius,
  /** effectRadius itself — the radius under the pointer. */
  hoverRadius: effectRadius,
  /** 10 * strength. Turns pointer velocity into a 0..1 "speed". */
  velocityGain: 10 * strength,

  /** 0.004 * strength * idleMotion. Tiny, and the whole idle look. */
  ambientStrength: 0.004 * strength * idleMotion,
  ambientSpeed: 0.055,
  /** Written as a literal pair: the drift is finer across than down. */
  ambientFrequency: [12, 9] as const,

  /** 0.09 * strength * mouseForce. */
  dragStrength: 0.09 * strength * mouseForce,
  /** 0.28 * strength * mouseForce — the part that only appears when moving. */
  dragVelocityStrength: 0.28 * strength * mouseForce,
  /** 0.12 * strength * mouseForce. Pushes away from the cursor. */
  pressureStrength: 0.12 * strength * mouseForce,
  /** 0.025 * strength * liquidness. */
  swirlStrength: 0.025 * strength * liquidness,
  /** 0.008 * strength * liquidness. */
  radialStrength: 0.008 * strength * liquidness,
  radialFrequency: 32,
  radialSpeed: 2.4,

  /** +1 for "push", -1 for "pull". The hero pushes. */
  interactionDirection: 1,
  /** 0.03 * strength. */
  rippleStrength: 0.03 * strength,

  /** Keeps the sample inside the texture, so the clamp never smears an edge. */
  uvClampInset: 0.002,
  edgeProtection: AUTHORED.edgeProtection,
} as const;

/** The ring a click sends out. All three are constants in the shader. */
export const RIPPLE = {
  /** Seconds. The shader stops drawing a ripple at this age... */
  duration: 2.6,
  /** ...and the runtime holds the slot for 3s before reusing it. */
  slotSeconds: 3,
  speed: 0.3,
  width: 0.2,
  /** How many can be in flight at once. */
  slots: 4,
} as const;

/* --------------------------------------------------------------- the smoothing */

/** The reference's reference frame: 1000/60, used to make every lerp fps-independent. */
export const FRAME_MS = 1000 / 60;

/**
 * `1 - (1 - rate) ^ (dt / FRAME_MS)` — a per-frame lerp re-based onto the frame
 * that actually elapsed, so a 144Hz monitor and a 60Hz one chase at the same
 * speed in seconds rather than in frames.
 */
export const frameLerp = (rate: number, dtMs: number) => 1 - Math.pow(1 - rate, dtMs / FRAME_MS);

export const SMOOTHING = {
  /** 0.26 - 0.22 * smoothness. The cursor's own position. */
  pointer: 0.26 - 0.22 * smoothness,
  /** 0.48 - 0.36 * smoothness. Velocity towards its instantaneous value. */
  velocity: 0.48 - 0.36 * smoothness,
  /** 0.2 - 0.14 * smoothness, while the pointer is over the canvas. */
  hoverIn: 0.2 - 0.14 * smoothness,
  /** 0.35 of that, on the way out: it lets go more slowly than it takes hold. */
  get hoverOut() {
    return 0.35 * this.hoverIn;
  },
  /** 0.72 + 0.24 * smoothness, applied as `decay ^ (dt / FRAME_MS)`. */
  velocityDecay: 0.72 + 0.24 * smoothness,
  /** Frame deltas outside this are clamped, so a background tab cannot jump it. */
  dtClampMs: [8, 50] as const,
} as const;

/* ------------------------------------------------------------------- the copy */

/**
 * The entrance, from the same chunk. SplitText into words and lines, then one
 * timeline: the lines slide 1rem to 0, and the words come up out of blur.
 */
export const COPY = {
  /** Seconds the hero waits before any of it starts. */
  delay: 1.3,
  duration: 1.2,
  ease: 'power2.out',
  /** Per line. */
  lineStagger: 0.1,
  /** Per word — and the label and the plus sign are dealt into the same run. */
  wordStagger: 0.02,
  /** Where a line starts, and what a word resolves out of. */
  lineOffset: '1rem',
  wordBlur: 10,
  labelBlur: 8,
} as const;

/** The canvas fades in over this once the first video frame has been uploaded. */
export const CANVAS_FADE_MS = 300;

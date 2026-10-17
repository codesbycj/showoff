/**
 * Every timing, easing and measurement this build uses, in one file.
 *
 * ## Where these came from
 *
 * The reference is a Framer site. A Framer site ships its own component code as
 * a plain ES module, so most of what follows was read rather than watched:
 *
 *   index.html                       -> inline CSS: the transition vocabulary
 *   .../script_main.<hash>.mjs       -> the site's own GSAP timelines
 *
 * Both are recoverable in two commands, and `README.md` has them written out.
 * Values taken that way are marked **read**. The minified names are quoted
 * beside them so the claim can be checked rather than taken on trust.
 *
 * Two things could *not* be read, and they are marked honestly:
 *
 * - **measured** — taken off the reference screenshots with PIL. Geometry and
 *   colour only; a still cannot carry a duration.
 * - **chosen** — a judgement. The reference's loading screen is drawn into a
 *   WebGL canvas, so its choreography is not in the shipped JS at all, and
 *   headless Chrome paints the canvas black (swiftshader), so filming it gives
 *   nothing either. The *shape* of that sequence is known from two stills; its
 *   pacing is mine, built from the same easing vocabulary the rest of the site
 *   uses so it at least sits in the same world.
 *
 * Nothing here was eyeballed off a video and then rounded.
 */

/* ------------------------------------------------------------------ easings */

/**
 * The whole reference runs on two curves. Counted straight out of its inline
 * CSS — 25 occurrences of the first, 12 of the second, and nothing else. **read**
 *
 * The first is the familiar easeOutQuint. It carries anything that arrives.
 * The second is a shallower out-curve used only for colour.
 */
export const EASE = {
  /** `cubic-bezier(0.22, 1, 0.36, 1)` x25. easeOutQuint. */
  outQuint: 'cubic-bezier(0.22, 1, 0.36, 1)',
  /** `cubic-bezier(0.22, 0.61, 0.36, 1)` x12. Only ever on background-colour. */
  outColour: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
} as const;

/**
 * GSAP's names for the curves the reference's own timelines ask for, kept as
 * strings because that is how they appear in the bundle. **read**
 *
 * `power2.out` carries every entrance; `power4.out` carries anything thrown.
 */
export const GSAP_EASE = {
  entrance: 'power2.out',
  thrown: 'power4.out',
  settle: 'power3.out',
} as const;

/**
 * The transition durations in the reference's inline CSS, by how often each
 * appears. **read** Kept whole because they fix the site's sense of pace, and
 * three of them are used verbatim below.
 *
 *   opacity          320ms ease                      x33
 *   opacity          450ms cubic-bezier(.22,1,.36,1) x16
 *   background-color 520ms cubic-bezier(.22,.61,.36,1) x12
 *   opacity          220ms ease                      x8
 *   transform/width/height/bg 300ms outQuint         x2   (the cursor)
 */
export const CSS_MS = {
  /** The commonest fade on the site. Hover states. */
  hover: 320,
  /** What the index list fades on when the centred item changes. */
  focus: 450,
  /** Colour only. */
  colour: 520,
  /** The quick one, for small chrome. */
  quick: 220,
} as const;

/* ------------------------------------------------------- the loading screen */

/**
 * ### What the stills show
 *
 * Two frames of the reference's loader, measured with PIL. **measured**
 *
 *   frame A  1915x962   wall edge at x=1100  -> 0.5744 of the width
 *   frame B  1887x887   wall edge at x= 682  -> 0.3614 of the width
 *
 * Three facts came out of that, and all three are structural:
 *
 * 1. **The wall's edge is exactly vertical.** Sampled at y=40, y=120 and near
 *    the bottom of each frame, the white -> black crossing sits at the same x
 *    to the pixel. It is a straight-edged panel, not a shaped or soft wipe.
 *
 * 2. **The figure rides the edge.** The gap between the figure's leading hand
 *    and the wall is 4px in *both* frames, at two completely different edge
 *    positions. The figure is not walking and being caught up with; it is
 *    rigidly anchored to the edge and carried by it.
 *
 * 3. **The red is flat.** `rgb(255, 73, 73)` is the dominant non-grey in both
 *    frames by two orders of magnitude, with no second shade. No gradient.
 *
 * What the stills cannot show is *when* either frame happens, so the two edge
 * positions below are recorded as evidence of the path, not of its pacing.
 */
export const WALL_SAMPLES = [0.5744, 0.3614] as const;

/** `rgb(255, 73, 73)`. **measured** */
export const RED = '#ff4949';

/**
 * The page behind the loader. Sampled from the right-hand margin of the home
 * still, clear of any element: `rgb(237, 237, 237)`. **measured**
 */
export const PAPER = '#ededed';

/** The wall, and every piece of type on the light ground. **measured** */
export const INK = '#121212';

/**
 * The figure, as a fraction of the viewport. **measured** from frame B, which
 * is the one where the figure is clear of the red type and so has a clean
 * bounding box: 349 x 441 in an 1887 x 887 frame.
 *
 *   height  441/887 = 0.497
 *   aspect  349/441 = 0.791  (w/h)
 *   centre  y (259+700)/2 / 887 = 0.5405
 *
 * The vertical centre is the detail worth keeping: the figure sits a little
 * *below* the middle of the screen, not on it. Its own container in the
 * reference's DOM is centred exactly (`translate(-50%,-50%)` on a 489x514 box
 * at a 1440x900 viewport), so the drop is inside the artwork — the figure is
 * drawn low in its own box because it is standing on the ground, not floating.
 */
export const FIGURE = {
  /** Of viewport height. */
  heightRatio: 0.497,
  /** Width / height of the drawn artwork. */
  aspect: 0.791,
  /** Of viewport height, to the artwork's centre. */
  centreYRatio: 0.5405,
  /** Hand-to-wall clearance, in px at the reference's width. **measured** */
  handGapPx: 4,
} as const;

/**
 * The display word behind the wall. The reference's DOM gives its box as
 * 580 x 422 at a 1440 x 900 viewport, centred. **read** (from a DOM probe of
 * the live page, not from the bundle.)
 *
 *   580/1440 = 0.403 of the width
 *   422/900  = 0.469 of the height, across two lines
 *
 * Two lines because the box contains a single `<br>`.
 */
export const DISPLAY = {
  widthRatio: 0.403,
  /** Both lines together, of viewport height. */
  heightRatio: 0.469,
} as const;

/**
 * ### The sequence
 *
 * **chosen** — see the header. The shape is from the stills; the seconds are
 * mine. Laid out as absolute milliseconds from first paint so the whole thing
 * can be read down the page.
 *
 * The one structural decision worth defending: the push is in four shoves, not
 * one glide. A still cannot tell you which it was, but a figure braced with
 * both arms locked is a drawing of someone applying force in bursts, and a
 * single eased sweep makes that drawing meaningless — the wall would be moving
 * on its own and the figure merely attached to it. Four shoves, each one
 * `power4.out` so it leaves fast and dies slowly, with the figure compressing
 * into each and recovering between, is the reading that uses the drawing.
 *
 * It also gives the counter something honest to do: it steps with the shoves
 * rather than ticking smoothly, because it is reporting the wall's position.
 */
export const LOAD = {
  /** Nothing moves before this. The red word is simply there, on white. */
  holdMs: 420,

  /**
   * The figure walks in from beyond the right edge and plants itself. The wall
   * is already behind it, flush with the right edge of the screen, so the
   * screen is still entirely white and entirely red type.
   */
  enterMs: 620,
  enterEase: GSAP_EASE.entrance,

  /**
   * The four shoves. `at` is when the shove starts, `to` is where the wall's
   * edge lands as a fraction of the viewport width (1 = off the right edge,
   * 0 = the wall covers everything).
   *
   * The two measured frames sit inside this path rather than defining it:
   * 0.5744 falls between shoves two and three, 0.3614 just after the third.
   */
  shoves: [
    { at: 1040, ms: 540, to: 0.74 },
    { at: 1800, ms: 540, to: 0.52 },
    { at: 2520, ms: 560, to: 0.33 },
    { at: 3240, ms: 760, to: 0.0 },
  ],
  shoveEase: GSAP_EASE.thrown,

  /**
   * The figure's recoil into each shove: it compresses towards the wall and
   * springs back. A fraction of its own width, applied as a scaleX about the
   * leading hand so the hand itself never leaves the wall.
   */
  braceSquash: 0.045,

  /** The screen is fully black here. The figure keeps going and fades out. */
  exitAt: 4000,
  exitMs: 520,

  /**
   * The wall carries on left and off the screen, so its *right* edge sweeps
   * the home into view. One gesture start to finish: the wall never stops,
   * never lifts, and is never replaced by a different transition.
   */
  openAt: 4260,
  openMs: 1100,
  openEase: EASE.outQuint,
} as const;

/** Total, for anything that needs to know when the loader is out of the way. */
export const LOAD_TOTAL_MS = LOAD.openAt + LOAD.openMs;

/* ------------------------------------------------------- the home entrance */

/**
 * The reference reveals the home in groups, each group's items staggered inside
 * it, each group starting before the one before it has finished. **read** — this
 * is the one timeline in the bundle that is fully legible, so it is reproduced
 * exactly rather than approximated.
 *
 * From `script_main.mjs`:
 *
 *   G  = 0.7    per-item duration
 *   K  = 0.08   stagger between items in a group
 *   Tr = 0.6    the overlap between groups
 *   fr(n) = n <= 0 ? 0 : G + max(0, n - 1) * K        a group's own length
 *   pr(n) = max(0, fr(n) - Tr)                        what the next group waits
 *
 * so each group begins 0.6s *before* the previous one ends. With five groups
 * that is the difference between a 5s cascade and the ~1.5s one it actually is.
 *
 * Each item travels `opacity 0 -> 1`, `blur(12px) -> 0`, `y 18 -> 0`, on
 * `power2.out`. The blur is the part that would be missed by watching: it is
 * what stops the cascade reading as a plain fade-up.
 */
export const CASCADE = {
  /** `G`. **read** */
  itemSec: 0.7,
  /** `K`. **read** */
  staggerSec: 0.08,
  /** `Tr`. **read** */
  overlapSec: 0.6,
  /** The `gsap.set` the reference puts on every item before revealing it. **read** */
  fromBlurPx: 12,
  fromY: 18,
  ease: GSAP_EASE.entrance,
} as const;

/** A group of `n` items takes this long. `fr(n)` in the bundle. **read** */
export const groupSec = (n: number): number =>
  n <= 0 ? 0 : CASCADE.itemSec + Math.max(0, n - 1) * CASCADE.staggerSec;

/** ...and the next group starts this long after it did. `pr(n)`. **read** */
export const nextGroupSec = (n: number): number => Math.max(0, groupSec(n) - CASCADE.overlapSec);

/**
 * The order the reference reveals its groups in, by the `aria-label` each one
 * is selected with. **read** Kept because the order is a design decision — the
 * hero's own text first, the index last — even though the labels are renamed
 * for this build.
 *
 *   heroinfo -> seconelementon -> seconelement -> ParallaxScrollImage -> minimapscroll
 */
export const CASCADE_GROUPS = ['meta', 'menu', 'chrome', 'stage', 'index'] as const;

export type CascadeGroup = (typeof CASCADE_GROUPS)[number];

/**
 * The fourth group — the one carrying the imagery — runs longer and on a
 * different curve to the other four. **read** (`Dr = 1.6`, `kr = power4.out`.)
 */
export const STAGE_GROUP = { sec: 1.6, ease: GSAP_EASE.thrown } as const;

/* ----------------------------------------------------------------- the index */

/**
 * ### The wheel
 *
 * The reference's home does not scroll. Its `document.scrollHeight` is exactly
 * the viewport height at rest, and the hero is a full-bleed canvas. **read**
 * (DOM probe.) Movement comes from wheel events, smoothed by hand.
 *
 * The model is **not** in the compiled bundle at all — it is in a plain,
 * unminified `<!-- Snippet: ... -->` script at the bottom of the page, under
 * the key `__universalSmoothScrollV1`, with its settings written out as an
 * object literal:
 *
 *   wheelMultiplier: 1.15
 *   easing:          0.075      per-frame approach
 *   maxDelta:        240        clamp on one wheel event
 *   stopThreshold:   0.2        below this, snap and stop the loop
 *
 * All four **read**. Worth saying plainly because an earlier pass of this file
 * used `0.25` / `0.12` taken from a *different* component in the bundle — a
 * draggable card stack — and they are not the page's scroll model. The lesson
 * is that a Framer page's inline snippets are as much a part of its spec as
 * the module is, and they are easier to read.
 *
 * `maxDelta` is the one that changes how it feels under a real mouse: a single
 * notch of a wheel can report several hundred pixels, and clamping it is what
 * stops one flick throwing the scene across three projects.
 *
 * The easing is a per-frame constant, so it is tied to 60fps — at 144Hz the
 * same number converges nearly two and a half times faster. `lib/damp.ts`
 * converts it to the half-life it encodes (148ms) rather than letting the feel
 * of the page depend on the monitor it is shown on.
 */
export const SCROLL = {
  /** **read** */
  wheelMultiplier: 1.15,
  /** Per-frame approach, at the 60fps it was written for. **read** */
  easingAt60: 0.075,
  /** Clamp on a single wheel event, in its own units. **read** */
  maxDelta: 240,
  /** Below this the lerp is finished. **read** */
  stopThreshold: 0.2,
} as const;

/* ------------------------------------------------------------- the 3D scene */

/**
 * ### The collage
 *
 * The reference's home is a **scattered 3D collage**, not a list with a card
 * in the middle of it: the current project faces the camera near the centre of
 * the screen, the ones behind it fall away to the lower left at a steep angle,
 * and the ones ahead recede to the upper right. Scrolling flies the camera
 * along that diagonal.
 *
 * It is drawn into a WebGL canvas, so none of its geometry is in the DOM and
 * headless Chrome renders it black — the plates in the page's own markup are
 * nineteen 30x30 preload thumbnails parked off-screen at x = -56. So the
 * numbers below are **measured** off the two home stills and **chosen** where
 * a still could not settle them.
 *
 * One value is genuinely **read**: the scene's perspective. The only element
 * in the reference's DOM carrying a `perspective` reports `1200px`, and using
 * the same number means a plate at a given depth foreshortens by the same
 * amount here as there.
 *
 * Measured from the full-width still, converted to a 1440x900 viewport:
 *
 *   centred plate    ~306 x 248 at centre (695, 451)   -> ~21% of the width
 *   previous plate   up and to the right, ~282 wide, turned away
 *   two back         further up-right, much smaller, half off the corner
 *   next plate       down and to the left, larger, sweeping out of frame
 *
 * **Which way the diagonal runs is a reading, and the first pass had it
 * backwards.** The tell is in the index column rather than in the collage: with
 * FROMANOTHER centred the column reads DAFI / DISTRICT2 / FROMANOTHER /
 * IVENTIONS / WON J. YOU, so DISTRICT2 is the slot *above* centre — the
 * previous project. And DISTRICT2 is the plate at the **upper right** in both
 * stills. So the previous project recedes up and away, and the next one
 * arrives large and near from the lower left.
 *
 * Which makes the motion read correctly too: scrolling forward flies the
 * plates up the diagonal into the distance, each one sweeping past the camera
 * and shrinking away, rather than marching towards the viewer.
 *
 * `step` is what one project advances by: +1 is towards the next project, so
 * its x is negative (left), its y positive (down) and its z positive (nearer).
 * x and y are fractions of the viewport so the diagonal holds its shape on any
 * screen; z is in px because it has to agree with `perspective`.
 */
export const SCENE = {
  /** **read** — the reference's own perspective, off its only 3D host. */
  perspective: 1200,
  /** Plate width as a fraction of the viewport width. **measured** */
  plateW: 0.22,
  /** The reference's plates are 910x732 and 1138x915 — both ~1.243:1. **read** */
  plateAspect: 910 / 732,
  /** Where the centred plate sits, as a fraction of the viewport. **measured** */
  centre: { x: 0.483, y: 0.5 },
  /** One project's travel along the diagonal. **measured** / **chosen** */
  step: { x: -0.17, y: 0.3, z: 360 },
  /** How much each plate turns as it goes. **chosen**, to match the stills' skew. */
  turn: { y: 22, x: -5 },
  /** Beyond this many places from centre a plate is not drawn at all. */
  range: 4,
} as const;

/**
 * How visible a plate is by its distance from the centred one, and the two
 * sides are **not** symmetric.
 *
 * A plate on the near side (towards the next project) is magnified by the
 * perspective — at one step it is already half as big again, at two steps two
 * and a half times — so it has to be gone by the time it would fill the
 * screen. A plate on the far side is shrinking instead, and can stay visible
 * for twice as long without crowding anything.
 *
 * Index 0 is the centred plate in both.
 *
 * **chosen** — the stills show three plates at once plus a sliver of a fourth.
 */
export const PLATE_OPACITY = {
  /** Towards the next project: large, close, and leaving. */
  near: [1, 0.9, 0.25, 0, 0],
  /** Towards the previous one: small, far, and lingering. */
  far: [1, 0.85, 0.5, 0.18, 0],
} as const;

/**
 * ### The list
 *
 * Entry pitch, measured off the home still by finding every band of ink in the
 * right-hand column and taking the spacing of the project names. **measured**
 *
 *   names at y = 264, 458, 654, 848   ->  gaps of 194, 196, 194
 *   194.7 / 977 = 0.1993
 *
 * Which is 20vh, to within a quarter of a pixel. Pitch is in viewport heights
 * rather than pixels, so the list keeps its rhythm on any screen.
 */
export const ENTRY_PITCH_VH = 0.2;

/**
 * How legible an entry is, by how many places it sits from the centred one.
 * **measured** — the darkest pixel in each entry's name, against the `#ededed`
 * ground and a `#121212` ink:
 *
 *   distance 0   grey  30   -> 1.00
 *   distance 1   grey 187   -> 0.24
 *   distance 2   grey 204   -> 0.16
 *
 * The steepness is the whole point. Only the centred entry is readable; its
 * neighbours are present but not competing. A gentle falloff would turn the
 * column into a wall of grey text and lose the focus entirely.
 *
 * Index 0 is the centred entry; anything further than the last value gets it.
 */
export const FOCUS_OPACITY = [1, 0.24, 0.16, 0.12] as const;

/**
 * Inside one entry, the small category label sits below its name again — the
 * labels measured 211 and 218 where their own names measured 187 and 204.
 * **measured**
 */
export const LABEL_OPACITY = 0.62;

/**
 * What an entry's opacity change rides when the centred item changes.
 * `opacity 450ms cubic-bezier(.22,1,.36,1)`, the reference's second-commonest
 * transition and the only one on the right curve to be this. **read**
 */
export const FOCUS_MS = CSS_MS.focus;

/**
 * The centred entry's imagery crossfades through a blur rather than cutting.
 * **read** — `pn = 8` (px of blur), `mn = 0.5` (the whole swap, in seconds),
 * split into two halves: out on `power2.in`, in on `power2.out`.
 */
export const SWAP = { blurPx: 8, sec: 0.5, outEase: 'power2.in', inEase: 'power2.out' } as const;

/**
 * The index number beside the stage slides rather than fades: the outgoing
 * digit leaves on `power2.out` and the incoming one arrives from the other side
 * on `power3.out`, both over `Kt = 0.7`. **read**
 */
export const DIGIT = { sec: 0.7, inEase: GSAP_EASE.settle, outEase: 'power2.out' } as const;

/**
 * The reference also throws a draggable card stack on `power4.out` over
 * `jr = 1`s, between `Nr = -2` and `Mr = -38` degrees, with release velocity
 * multiplied by `Lr = 180`. **read**
 *
 * Recorded because it was read, and deliberately *not* used: an earlier pass
 * of this build put a wheel-velocity lean on a single centred card, which is
 * a different component of the reference doing a different job. The collage
 * gets its angles from its own position on the diagonal instead, so a lean on
 * top of that would be two rotations fighting over one plate.
 */

/**
 * Every timing in this episode, in one file, with where it came from.
 *
 * The reference is a hand-written bundle rather than a Webflow export, so its
 * motion is not in interaction data and not in the stylesheet -- it is in
 * `noho.bundle.min.js` as literals, which is the easiest kind of site to read:
 *
 *   curl -sL https://<reference>/assets/js/<bundle>.min.js -o bundle.js
 *   grep -o 'CustomEase.create([^)]*)' bundle.js     # the easing vocabulary
 *   grep -o 'new Lenis({[^}]*}' bundle.js            # the scroll
 *   grep -o 'duration: *[0-9.]*' bundle.js | sort | uniq -c
 *
 * What that returns is a *small* set of numbers used everywhere: three
 * durations, two staggers, seven named curves. Copying the set rather than
 * copying one animation is what makes a rebuild feel like the same hand.
 *
 * Everything below is a measurement or a decision taken from one: the design,
 * the brand, the copy and the photography in this episode are mine, and so is
 * which movement each curve is spent on.
 */

/* ------------------------------------------------------------------ scroll */

/**
 * Lenis, verbatim: `{duration: 3, smoothWheel: true, syncTouch: true,
 * syncTouchLerp: 0.075, gestureOrientation: 'vertical'}`.
 *
 * `duration: 3` is the single most distinctive number on the reference. Three
 * whole seconds of easing after the wheel stops is roughly four times the
 * usual, and it is why that site feels like it is gliding rather than
 * scrolling. It is also the number most likely to be wrong by feel: at 0.8 the
 * page is "smooth", at 3 it is a different instrument.
 */
export const SCROLL = {
  durationS: 3,
  smoothWheel: true,
  syncTouch: true,
  syncTouchLerp: 0.075,
} as const;

/* ------------------------------------------------------------------ curves */

/**
 * The curve set, named for what each one does on *this* page.
 *
 * A page with one easing curve feels mechanical and a page with nine feels
 * unplanned; the reference uses a small, consistent set, and that is the habit
 * worth copying rather than any individual animation. These four were arrived
 * at by measuring motion off the running page and then choosing, for each kind
 * of movement here, which shape suited it.
 *
 * `settle` and `glide` are given as SVG paths because the shape they need --
 * leave at once, arrive slowly, with a long quiet middle -- is not expressible
 * as a single cubic-bezier.
 */
export const EASE = {
  /** Display type and anything that arrives once: leaves hard, settles long. */
  settle: 'M0,0 C0.17,0.17 0.0,1.0 1,1',
  /** Lists and stacks: a long slow middle, so items read as one gesture. */
  glide: 'M0,0 C0.2,0 0.1,1 1,1',
  /** Anything that opens and closes again, symmetrical both ways. */
  swell: 'cubic-bezier(0.6, 0, 0, 1)',
  /** Under the cursor, where the move has to finish before you notice it. */
  quick: 'cubic-bezier(0.17, 0.17, 0.26, 0.9)',
} as const;

/* --------------------------------------------------------------- durations */

/**
 * Three durations carry the whole page: 0.2 for anything under the cursor,
 * 0.4 for anything the page does to itself, 0.6 for anything that changes what
 * you are looking at. One more, 1.5, exists once, in the preloader.
 *
 * That three-value discipline is the lesson from measuring the reference:
 * counting its durations returns 11 at .4, 9 at .2 and 3 at .6 and almost
 * nothing else. A page whose durations are all slightly different is a page
 * nobody set a rule for.
 */
export const DUR = {
  hover: 0.2,
  base: 0.4,
  major: 0.6,
  preloadOut: 1.5,
} as const;

/** Both staggers in the bundle. 0.04 for letters and tiles, 0.066 for lines. */
export const STAGGER = {
  tile: 0.04,
  line: 0.066,
} as const;

/* ----------------------------------------------------------------- the page */

/** The headline's masked lines, which is the page's signature entrance. */
export const LINES = {
  durationS: DUR.major,
  stagger: STAGGER.line,
  ease: EASE.settle,
  /** How far below its mask each line starts, as a multiple of its height. */
  from: 1.05,
} as const;

/** Blocks below the fold: the same idea, once, when they arrive. */
export const REVEAL = {
  durationS: DUR.major,
  stagger: STAGGER.tile,
  ease: EASE.settle,
  /** IntersectionObserver threshold. */
  threshold: 0.25,
  once: true,
} as const;

/**
 * The preloader: a full-bleed ink panel that lifts off the page.
 *
 * The reference holds it for a beat, then moves it on its own curve over 1.5s
 * while the hero's first line is already on its way in -- the two overlap by
 * design, so the page is never blank-then-sudden.
 */
export const PRELOAD = {
  holdS: 0.35,
  durationS: DUR.preloadOut,
  ease: EASE.settle,
  /** The hero starts this far before the panel has finished leaving. */
  overlapS: 0.75,
} as const;

/**
 * The magnetic cursor. A drawn dot that follows the pointer, swells over
 * anything interactive, and becomes a labelled pill over a few things.
 *
 * `size: '1.0417vw'` is 15px at 1440 -- a vw unit rather than px, so the dot
 * scales with the page like the type does. It is hidden until the pointer
 * moves (`opacity: 0` by default, 1 on `mouseenter`), which is what stops it
 * appearing in the corner on a page nobody has touched yet.
 */
export const CURSOR = {
  dotVw: 1.0417,
  /** Catch-up, not follow: 0.18 of the remaining distance per frame. */
  lerp: 0.18,
  hoverScale: 3.4,
  durationS: DUR.hover,
  ease: EASE.settle,
  minWidth: 992,
} as const;

/** The nav items, which fly in from off-canvas one after another. */
export const NAV = {
  durationS: DUR.base,
  stagger: STAGGER.tile,
  ease: EASE.glide,
} as const;

/** The product panels: the one you are not on steps back. */
export const PANEL = {
  dimTo: 0.55,
  scaleTo: 1.03,
  durationS: DUR.major,
  ease: EASE.settle,
  minWidth: 992,
} as const;

/** The gallery rail, which moves on its own until you touch it. */
export const RAIL = {
  speed: 1.1,
  startDelayS: 0.6,
  stopOnInteraction: false,
} as const;

/** The FAQ, which opens on the symmetrical curve. */
export const DISCLOSE = {
  durationS: DUR.base,
  ease: EASE.swell,
} as const;

/* ----------------------------------------------------------- before / after */

/** How long the whole page takes to crossfade when the toggle is hit. */
export const SWAP_MS = 520;

/**
 * Every number the services deck moves by, in one file.
 *
 * None of it was eyeballed. The reference is a Webflow site whose custom
 * behaviour ships in one bundle, and the stack is a single function in it —
 * `[data-media-stack]`. Minified, it is still plain to read: the gap is an
 * attribute on the section, the easings are GSAP names, and the fly-off is
 * four literal values. Everything below is that function, transcribed, with
 * the measurement that confirmed it beside it.
 *
 * The transcription was then checked against the running page rather than
 * trusted. Headless Chrome at 1440x900, scroll to a position, settle for the
 * scrub, read `getComputedStyle(card).transform` back as a matrix. Three of
 * the readings the model has to reproduce exactly:
 *
 *   at rest            card i   y = 150 - 30i, z = -(150 - 30i)   (staircase)
 *   mid-step           card 0   y = 153.6  - the overshoot of back.inOut(3)
 *   after the fly-off  any      y = -861.4, scale 1.2             (-80% - 50vh)
 *
 * -861.4 is the one worth spelling out: the fly tween sets `yPercent: -80` and
 * `y: "-50vh"` together, and on a 514.3px card in a 900px viewport that is
 * -0.8 x 514.3 - 450 = -861.4. Both halves are needed; either alone lands the
 * card somewhere it can still be seen.
 */

/** The deck, bottom of the stack first. The last one is the first one seen. */
export const CARD_COUNT = 6;

/**
 * How far apart the cards sit, in px, on both axes at once: each step moves a
 * card up by this much and the same amount towards the camera.
 *
 * The reference carries it as `data-media-stack-gap="30"` on the section, so
 * it is a number someone chose rather than a consequence of the layout.
 */
export const GAP = 30;

/**
 * Where every card starts: `gap * (count - 1)` down and the same distance
 * back. The whole deck is set to this, and each card is then scrolled forward
 * by its own trigger, which is what produces the staircase at rest rather than
 * any per-card offset.
 */
export const START_OFFSET = GAP * (CARD_COUNT - 1);

/** The scroll track, as a multiple of the viewport. Reference: `height: 600vh`. */
export const TRACK_VH = 600;

/**
 * ScrollTrigger's `scrub`, in seconds. Not a duration — the lag with which the
 * deck catches up to the scrollbar, and the reason the cards keep moving for a
 * beat after a flick stops.
 */
export const SCRUB = 0.5;

/**
 * Each card's window is the whole track, shifted *earlier* by this much per
 * index: `(trackHeight - viewportHeight) / count * i`.
 *
 * It is the stagger, and its sign is the thing to get right. A later card in
 * the DOM sits nearer the camera, starts earlier, and so peels off first —
 * which is why the deck empties from the front and the first card in the
 * markup is the one left standing.
 */
export const stagger = (trackPx: number, viewportPx: number, index: number) =>
  ((trackPx - viewportPx) / CARD_COUNT) * index;

/**
 * The two easings, both GSAP's own.
 *
 * `back.inOut(3)` is what makes a step read as a card being pushed rather than
 * slid: it undershoots at the start and overshoots at the end, which the
 * measurement caught as a card sitting at y=153.6 when its resting place is
 * 150.
 */
export const EASE_STEP = 'back.inOut(3)';

/** The throw. Front-loaded, so the card is gone before it has really left. */
export const EASE_FLY = 'power4.in';

/**
 * The fly-off itself. `y` is a viewport unit and `yPercent` is a share of the
 * card's own height; GSAP adds them, and the reference uses both.
 */
export const FLY = {
  yPercent: -80,
  y: '-50vh',
  scale: 1.2,
  /** Degrees, picked per card at mount: `(Math.random() - 0.5) * 50`. */
  rotationRange: 50,
} as const;

/** The deck's own geometry. Reference: `aspect-ratio: 4/5; perspective: 25vw`. */
export const CARD_ASPECT = 4 / 5;
export const PERSPECTIVE_VW = 25;

/**
 * Where the section sits in the reduced-motion build.
 *
 * The reference does not merely shorten anything: it drops the 3D stack
 * entirely and swaps one card for the next on `Math.floor(progress * count)`,
 * with no transform on any of them. That is the right shape for the setting —
 * the complaint is the movement, not the duration — so this build does the
 * same, and this constant is only here to say that the swap points are the
 * same sixths the animated version uses.
 */
export const reducedIndex = (progress: number) =>
  Math.min(CARD_COUNT - 1, Math.floor(progress * CARD_COUNT));

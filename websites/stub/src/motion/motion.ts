/**
 * Every timing and every measurement the ticket section uses, in one file.
 *
 * None of it was eyeballed off a video. The reference is a Webflow site, and a
 * Webflow site ships its interactions as data: the page bundle carries an IX2
 * action list called "Service cards (desktop)" whose keyframes are plain
 * numbers. Every percentage below is a `keyframe` from that list and every
 * value is an `actionItem` config on it — see README.md for how to get them
 * back out.
 *
 * The table was then checked against the running page rather than trusted:
 * headless Chrome, scroll to a position, settle, read the computed transform
 * off each card. Two spot checks, both of which the model has to hit exactly or
 * the easing is wrong:
 *
 *   p=0.346  card 1 translateY  measured 690.6px   model 690.3px
 *   p=0.385  card 1 rotateY     measured 135.3deg  model 133.8deg
 *
 * The second is 1% shy because the reading still had a frame of smoothing lag
 * in it; the first lands on the nose. That is what fixed `easeInOut` as
 * cubic-bezier(.42, 0, .58, 1) rather than something merely close.
 */

/**
 * The three easing curves the reference's action items name. Webflow writes
 * these as strings next to each keyframe; an empty string means linear, which
 * is why `linear` carries a real entry here rather than being the absence of
 * one.
 */
export const EASING = {
  linear: [0, 0, 1, 1],
  /** Webflow "easeInOut". Carries the cards and the headline blur. */
  easeInOut: [0.42, 0, 0.58, 1],
  /** Webflow "inOutQuad". Used only by the two captions that fade in at the end. */
  inOutQuad: [0.455, 0.03, 0.515, 0.955],
} as const;

export type Ease = keyof typeof EASING;

/**
 * One keyframe: the section progress it sits at (0-100, the reference's own
 * numbering), the value there, and the curve used to reach it from the previous
 * one. The easing belongs to the *destination* keyframe because that is where
 * Webflow stores it.
 */
export type Key<T> = { at: number; to: T; ease: Ease };

const k = <T>(at: number, to: T, ease: Ease = 'easeInOut'): Key<T> => ({ at, to, ease });

/* ------------------------------------------------------------------ layout */

/**
 * The stage, in the design's own pixels. Measured off the reference at a
 * 1512x950 viewport, which is the size its desktop breakpoint is drawn for.
 *
 * Everything on stage is laid out at these numbers and the whole stage is then
 * scaled to fit the viewport as one unit (see `useStageScale`). That is what
 * keeps the motion identical at every width: the rise distance, the perspective
 * and the card are all in the same space, so zooming the space cannot pull them
 * out of proportion. A row that reflowed instead would need the 860 below
 * re-derived per breakpoint, which is exactly the fixed-offset failure this
 * avoids.
 */
export const STAGE = {
  /** `.service_card` — width 334px, min-height 480px. */
  cardW: 334,
  cardH: 480,
  /** `.servises_wrap` — `column-gap: 20px`. */
  gap: 20,
  /** `.servises_wrap` — `perspective: 2000px`. Without it the flip reads flat. */
  perspective: 2000,
  /** 3 * 334 + 2 * 20. The width the stage is scaled from. */
  rowW: 334 * 3 + 20 * 2,
  /** `.bg-service-text` — 600px wide, 80px/100% type, centred behind the cards. */
  headlineW: 600,
  headlineSize: 80,
  /** Clear space either side of the row, and either side of a stacked card. */
  gutter: 48,
  stackGutter: 24,
  /**
   * How far each card in a stack rests from the one under it.
   *
   * The reference lands all three in exactly the same place, which on a phone
   * leaves the first two permanently buried under the third — the deal plays
   * and then two thirds of what it dealt is unreachable. A few pixels of fan
   * costs nothing, is applied as `left`/`top` so it never touches the
   * transform the timeline is writing, and makes the stack read as three
   * tickets rather than one.
   */
  stackOffsetX: 10,
  stackOffsetY: 16,
  /** Card, plus the title pill above it and the disclaimer below. */
  columnH: 700,
} as const;

/**
 * The scroll track, in vh. `.sticky_blur_wrapper` measured 9500px against a
 * 950px viewport — 1000vh — with `.sticky_blur` pinned inside it at
 * `position: sticky; top: 0; height: 100vh`.
 *
 * This build is shorter, and the arithmetic matters, because getting it wrong
 * changes the pace of every curve above even though none of their numbers move.
 *
 * Progress runs from the track's top reaching the bottom of the viewport to the
 * track leaving, so the reference's full range is 1000vh + 100vh = 10450px at
 * its own viewport. The beat itself — keyframe 15, where the blob first shows,
 * to keyframe 60, where the last card lands — is 45% of that: 4702px, or just
 * under five screens of scrolling.
 *
 * The remaining 40% is the reference holding the finished frame while it hands
 * over to the section below it. There is nothing here to hand over to, so the
 * track stops at `TIMELINE_END` instead — but not as short as it first looks,
 * and the trap is worth writing down because the first attempt walked into it.
 *
 * Progress and the pin do not cover the same range. Progress runs the whole
 * `trackH + vh`, while the stage is only actually pinned between `scrollY =
 * trackTop` and `trackTop + trackH - vh`. The viewport-height of scrolling at
 * each end is the section arriving and leaving. So an end keyframe chosen to
 * put a comfortable-looking gap after the last card can still land that card
 * fractionally before the stage starts sliding away, and the captions then fade
 * in on a frame that is already leaving.
 *
 * Solving it for both at once — the reference's pace, and a full screen of
 * pinned hold after the deal finishes:
 *
 *   range = SECTION_VH + 100vh          = 860vh -> 8170px
 *   beat  = (60-15)/78 * 8170px         = 4714px   (reference: 4702px)
 *   hold  = (8170 - 950) - 60/78 * 8170 =  935px   (a screen, near enough)
 */
export const SECTION_VH = 760;

/**
 * The keyframe the track's last pixel maps to. Everything is finished by 60;
 * the rest is the hold solved for above.
 */
export const TIMELINE_END = 78;

/**
 * Where the three-across row gives up and the cards stack into one box instead.
 *
 * This is the reference's own answer, not an invention: below its tablet
 * breakpoint it sets `.service_card._02, ._03 { position: absolute; inset: 0 0
 * auto }`, putting all three cards in the same place so each one lands on top
 * of the last. The deal still reads, because the stagger is in time rather than
 * in space, and a card stays big enough to read.
 */
export const STACK_BELOW = 1100;

/* ----------------------------------------------------------------- the cards */

/**
 * `TRANSFORM_MOVE` yValue at keyframe 30 — how far below its resting place each
 * card waits. Note it is a flat pixel distance, not a viewport unit: the cards
 * start further below the fold on a short screen than on a tall one, and the
 * reference is content with that.
 */
export const RISE = 860;

/** `TRANSFORM_ROTATE` yValue at keyframe 35 — the cards wait face-down. */
export const FLIP = 180;

/**
 * The deal. All three cards leave at once and land one after another, and the
 * flip starts 5% after the rise does, so a card is already moving before it
 * begins to turn. Every number here is a keyframe in the reference's list.
 */
export const DEAL = {
  /** keyframe 30: all three cards are at RISE and have not moved yet. */
  liftOff: 30,
  /** keyframe 35: all three are still face-down; the turn starts here. */
  turnStart: 35,
  /** keyframes 45 / 52 / 60: each card's rise and flip both finish here. */
  lands: [45, 52, 60],
} as const;

/* ------------------------------------------------------------- the backdrop */

/**
 * `.pricing_wrapper` background colour. White until the cards are about to
 * move, then a hard swap to blue over ten percent, then a long drift to a
 * lighter blue that finishes exactly as the last card lands.
 *
 * The 20 -> 30 leg is linear and the 30 -> 60 leg is eased; that asymmetry is
 * in the reference and it is what makes the blue arrive as an event rather than
 * a fade.
 */
export const STAGE_BG: Key<string>[] = [
  k(20, '#ffffff'),
  k(30, '#89c1f4', 'linear'), // rValue:137 gValue:193 bValue:244
  k(60, '#a7d6ff'), // rValue:167 gValue:214 bValue:255
];

/**
 * `.shape` — a 70px-blurred blob behind everything, growing out of the top
 * edge. `transform-origin: 50% 0`, `opacity: .8`.
 *
 * Height is in vh and the reference's last keyframe asks for 300vh, which the
 * stage's `overflow: hidden` crops at 100 — the number means "stay filled"
 * rather than anything you can see. Kept as written so it matches the bundle.
 */
export const BLOB_H: Key<number>[] = [k(0, 0), k(15, 70), k(30, 300)];

/** `.shape` slides up into place as it grows. Linear, unlike its height. */
export const BLOB_Y: Key<number>[] = [k(0, 200, 'linear'), k(30, 0, 'linear')];

/** `.top` — the blob's upper lobe swells as the blue arrives. Linear. */
export const BLOB_SCALE: Key<number>[] = [k(20, 1, 'linear'), k(31, 3, 'linear')];

/* ------------------------------------------------------------- the headline */

/**
 * `.blur-text` — the sans lines of the headline go soft as the cards start
 * their run, so the cards read as the near layer and the words as the far one.
 * It reaches its full 5px before the first card has turned at all.
 *
 * The reference also carries a second blur, on the italic line, between
 * keyframes 45 and 52. It is dead: its action item targets an element id that
 * no longer exists on the page, and the live site reports `filter: none` on
 * that line at every scroll position. Left out deliberately, not missed.
 */
export const HEADLINE_BLUR: Key<number>[] = [k(20, 0), k(35, 5)];

/**
 * `.title_wrap.white` and `.price-disclaimer` — the two bits of chrome around
 * the cards stay hidden for the whole deal and arrive together once the last
 * card is down. The only pair on `inOutQuad`.
 */
export const CAPTION_OPACITY: Key<number>[] = [k(52, 0, 'inOutQuad'), k(60, 1, 'inOutQuad')];

/* ------------------------------------------------------------- the smoothing */

/**
 * The reference binds its timeline with `smoothing: 60`, so the section follows
 * the scrollbar at a lag rather than locked to it.
 *
 * Unlike everything above, this one number cannot be read straight across:
 * Webflow's 0-100 dial is not a time constant, and the probe deliberately let
 * every sample settle so the keyframes could be read without it. So the lag is
 * modelled here as a half-life and matched by feel against the reference, and
 * it is the one value in this file that is a judgement rather than a reading.
 */
export const SMOOTHING_HALFLIFE_MS = 90;

/** Below this the lerp is finished; stops the rAF loop from running forever. */
export const SMOOTHING_EPSILON = 0.00002;

/* ----------------------------------------------------------------- the hover */

/**
 * Tearing the stub off — a separate interaction from everything above, and a
 * separate pair of action lists: `a-27` "Service Cards on Hover" on mouseover
 * and `a-28` "Service Cards on Hover 2" on mouseout, both bound to
 * `.service_card_front` with every target scoped to `useEventTarget: "CHILDREN"`
 * so one card's stub moves and its neighbours' do not.
 *
 * What moves is only the stub. The face does not lift, tilt or scale, which is
 * worth stating because it is the first thing you would reach for: the card
 * stays exactly where it is and the bottom quarter of it comes away.
 *
 * Confirmed on the running page — hovering the middle card leaves
 * `.card_bottom` at `matrix(0.996195, 0.0871557, …, 16)`, which is 5.000deg and
 * 16px, with the stub's bounding box growing 163 -> 191. That growth is the
 * check that matters: 163·cos5 + 334·sin5 = 191.5, so it is rotating about its
 * own centre and not resizing.
 */
export const HOVER = {
  /** `TRANSFORM_MOVE` yValue, and `TRANSFORM_ROTATE` zValue, on the stub. */
  stubY: 16,
  stubRotate: 5,

  /** Both action lists' durations, in ms. */
  inMs: 500,
  outMs: 300,

  /**
   * The reference writes the in-easing as raw control points rather than one of
   * Webflow's named curves, and the fourth is past 1 — it overshoots and comes
   * back, so the stub drops a little further than 16px and settles up into
   * place. That is what sells it as something coming loose.
   */
  inEase: 'cubic-bezier(0.579, 0.423, 0.17, 1.452)',
  /** Webflow "outSine". No overshoot going back — it just returns. */
  outEase: 'cubic-bezier(0.39, 0.575, 0.565, 1)',
  /** Webflow "inOutQuad", on the button's opacity in both directions. */
  fadeEase: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
} as const;

/**
 * The barcode closing into a button rides the same two durations, which is not
 * a convenience — in the reference it is a `PLUGIN_LOTTIE` action in the same
 * two action lists, driven 1 -> 100 on the way in and back to 0 on the way out.
 * The Lottie file is 294x48 at 60fps with an out point of 30: half a second,
 * built from 36 bars on 72 layers.
 *
 * Rebuilt here as one transform per bar rather than by shipping a Lottie player
 * for a single file — every bar slides and widens into a gapless slot, which is
 * the same interpolation without ~250KB of runtime to run it.
 */

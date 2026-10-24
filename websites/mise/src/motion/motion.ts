/**
 * Every timing in this episode, in one file, with where it came from.
 *
 * The reference is a Webflow site that does not leave its motion to Webflow:
 * it loads GSAP and ScrollTrigger and drives the important sections from
 * hand-written inline `<script>` blocks, with the rest in theme CSS. So there
 * are two places to read and they say different things.
 *
 *   # the hand-written half
 *   grep -oE 'duration:\s*[0-9.]+|ease:\s*.[a-z0-9.]+.|stagger:\s*[0-9.]+' home.html
 *   # the theme half
 *   grep -ohE "transition:[^;}]{1,70}" site.css | sort | uniq -c | sort -rn
 *
 * The split is the interesting part. Scripted entrances are **slow** — a full
 * second on `expo.out` with a quarter-second stagger — while everything the
 * CSS owns is 0.2–0.3s. A section arrives like a stage curtain and then
 * behaves like an interface, which is exactly right for software sold to
 * people who are busy.
 *
 * The design, brand, copy, palette and photography in this episode are mine.
 */

/* ------------------------------------------------------------------ curves */

export const EASE = {
  /**
   * `expo.out` as a cubic-bezier. Almost all of the distance is covered in the
   * first third, so a block appears to *arrive* and then ease the last few
   * pixels. It is the curve that makes a one-second entrance feel quick.
   */
  arrive: 'cubic-bezier(0.16, 1, 0.3, 1)',
  /** The theme's own expo curve, used on opacity. */
  fade: 'cubic-bezier(0.19, 1, 0.22, 1)',
  /** `power2.out`, for the small supporting moves. */
  settle: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
  /** `power2.inOut`, for anything that opens and closes again. */
  both: 'cubic-bezier(0.46, 0.03, 0.52, 0.96)',
} as const;

/* --------------------------------------------------------------- durations */

/**
 * Two registers, deliberately far apart.
 *
 * Entrances are 0.6–1s; interface responses are 0.2–0.3s. There is nothing in
 * between, and that gap is what stops a page feeling uniformly sluggish when
 * its sections are slow.
 */
export const DUR = {
  tap: 0.2,
  quick: 0.3,
  medium: 0.4,
  eyebrow: 0.6,
  entrance: 1,
  /** The reference's one long duration. */
  ambient: 3,
} as const;

/**
 * The hero photograph's breath: 4% of scale, alternating, over three times the
 * reference's longest duration.
 *
 * Nine seconds rather than three, and the multiplier is written out rather
 * than hidden in a literal so the departure is on the record. Three seconds at
 * 4% is a pulse — you see it move and then you watch for it moving again. At
 * nine it is under the threshold where a still image stops reading as a
 * background plate, which is the whole job, and it never pulls the eye off the
 * sentence in front of it.
 */
export const BREATHE = { durationS: DUR.ambient * 3, scale: 1.04 } as const;

/* ----------------------------------------------------------------- entrance */

/**
 * The signature: a stack of rows arriving a quarter of a second apart, each
 * sliding its full height up from below and fading in, on `expo.out`.
 *
 * A 0.25s stagger is very long by UI standards — four rows take a second and
 * a half to finish. It works because `expo.out` front-loads the distance, so
 * each row is visually *there* long before its tween ends, and the stagger
 * reads as a deal being dealt rather than as a queue.
 *
 * `start: 'top 80%'` and `once: true`: it plays when the section is a fifth of
 * the way up the viewport, and never again.
 */
export const ENTRANCE = {
  durationS: DUR.entrance,
  stagger: 0.25,
  ease: EASE.arrive,
  fromY: '100%',
  startAt: 0.8,
  once: true,
  /** The eyebrow goes first, 0.3s ahead of the rows. */
  eyebrowDurationS: DUR.eyebrow,
  eyebrowLeadS: 0.3,
} as const;

/** Everything else arriving on scroll: shorter, smaller, no stagger drama. */
export const REVEAL = {
  durationS: DUR.eyebrow,
  ease: EASE.arrive,
  stagger: 0.07,
  threshold: 0.2,
  once: true,
} as const;

/* ----------------------------------------------------------------- the page */

/** Buttons, chips, links: the theme's 0.2s on colour, nothing else. */
export const TAP = { durationS: DUR.tap, ease: EASE.settle } as const;

/** The product accordion: one panel open at a time, opening on the in-out curve. */
export const ACCORDION = { durationS: DUR.medium, ease: EASE.both } as const;

/** The metric counters, which count once when they arrive. */
export const COUNTER = { durationS: 1.2, ease: EASE.arrive } as const;

/** The logo rail: one row, translated by half, forever. */
export const RAIL = { durationS: 48 } as const;

/* ----------------------------------------------------------- before / after */

export const SWAP_MS = 520;

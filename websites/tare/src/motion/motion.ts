/**
 * Every timing in this episode, in one file, with where it came from.
 *
 * The reference is the fifth platform in this series and the most ordinary:
 * **WordPress with a bespoke theme**, running jQuery, Foundation 6.8, Slick,
 * fancybox, select2 and Max Mega Menu. There is no build step and no bundler,
 * so nothing is minified into a lump — the carousel configs sit in the theme's
 * own `global.js` as plain object literals and everything else is in one
 * 138kB stylesheet.
 *
 *   curl -sL <theme>/assets/js/global.js -o global.js
 *   grep -nE "speed:|autoplaySpeed|cssEase|fade:" global.js
 *   curl -sL <theme>/assets/css/custom.css -o custom.css
 *   grep -ohE "transition:[^;}]{1,80}" custom.css | sort | uniq -c | sort -rn
 *
 * What came back is the opposite of episode 5's Framer finding, and more
 * interesting for it.
 *
 *   17  transition:all .5s ease
 *    2  transition:all .2s ease-in-out
 *    1  transition:transform .3s ease-in-out
 *    1  transition:opacity .5s ease-in-out,transform 1s cubic-bezier(0.16,0.88,0.45,1)
 *    1  transition:all .15s ease-in
 *    ...and nine more one-offs
 *
 * **`transition: all .5s ease`, seventeen times**, is the whole diagnosis.
 * `all` is the shorthand you reach for when you have not decided what should
 * move, so it animates everything that changes — including the properties you
 * did not mean, which is how a hover ends up also easing a `width` or a
 * `border-width` and nudging its neighbours. And half a second is roughly
 * three times too slow for a pointer: by the time the colour has arrived the
 * pointer has gone.
 *
 * There is exactly one considered line in the file — the scroll entrance on
 * `cubic-bezier(0.16, 0.88, 0.45, 1)`, a long flat-topped curve over a full
 * second — and it is good. This episode keeps that one and throws away the
 * other seventeen.
 *
 * The design, brand, copy, palette and photography here are mine.
 */

/* ------------------------------------------------------------------ curves */

export const EASE = {
  /**
   * The reference's one deliberate curve, kept verbatim. It reaches 88% of its
   * travel at 16% of its time, so a block appears to arrive and then settle —
   * which is what lets it run for a full second without feeling slow.
   */
  arrive: 'cubic-bezier(0.16, 0.88, 0.45, 1)',
  /** For anything that opens and closes and must look the same both ways. */
  both: 'cubic-bezier(0.45, 0.05, 0.55, 0.95)',
  /** The pointer curve. Short, out-only, no overshoot. */
  tap: 'cubic-bezier(0.3, 0.7, 0.4, 1)',
} as const;

/* --------------------------------------------------------------- durations */

/**
 * Three, and the gap between them is the point.
 *
 * The reference answers a pointer in 500ms and reveals a section in 1000ms,
 * which is one register used for two jobs. Here a pointer gets 160ms — fast
 * enough that the feedback feels attached to the hand — and a section gets the
 * reference's full second, because an entrance is scenery and scenery is
 * allowed to take its time.
 */
export const DUR = {
  tap: 0.16,
  panel: 0.32,
  reveal: 1,
} as const;

/* ----------------------------------------------------------------- the page */

/** Blocks arriving on scroll: up 20px and in, siblings 90ms apart, once. */
export const REVEAL = {
  durationS: DUR.reveal,
  ease: EASE.arrive,
  stagger: 0.09,
  threshold: 0.15,
  once: true,
} as const;

/** Buttons, links, rows. Named properties only — never `all`. */
export const TAP = { durationS: DUR.tap, ease: EASE.tap } as const;

/** Disclosure rows: the FAQ, and the month notes in the year calendar. */
export const DISCLOSE = { durationS: DUR.panel, ease: EASE.both } as const;

/**
 * The reference's carousels: Slick, `speed: 500`, `autoplaySpeed: 5000`,
 * `cssEase: 'ease'`, three sliding and one fading.
 *
 * Recorded because it is measurement, and then not used. A five-second
 * autoplay takes a testimonial away mid-sentence from anyone reading at
 * ordinary speed, and three carousels on one page is three places the content
 * is hidden from search, from print and from anybody who does not wait. The
 * after sets the same content out and lets the page be long.
 */
export const REFERENCE_CAROUSEL = {
  speedMs: 500,
  autoplayMs: 5000,
  cssEase: 'ease',
  used: false,
} as const;

/* ----------------------------------------------------------- before / after */

export const SWAP_MS = 520;

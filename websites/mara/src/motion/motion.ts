/**
 * Every timing in this episode, in one file, with where it came from.
 *
 * The reference is a Framer site, which is the fourth kind of measuring job in
 * this series and much the easiest: Framer compiles a page's components into a
 * single ES module and leaves every transition in it as a plain object
 * literal. No timeline to reverse-engineer, no stylesheet to grep — one file
 * and one regex.
 *
 *   curl -sL https://<site>/script_main.<hash>.mjs -o script_main.mjs
 *   grep -oE 'transition:\{[^{}]*\}' script_main.mjs | sort -u
 *   grep -oE 'ease:\[[^]]*\]' script_main.mjs | sort -u
 *   grep -oE 'duration:[0-9.]+' script_main.mjs | sort | uniq -c
 *
 * What came back from 108kB of module was startling in its brevity: **one
 * duration used six times (0.4s), one more used once (0.6s), every delay zero,
 * and three easing curves.** A page that looks this considered is running on
 * four numbers.
 *
 * That is the lesson of this episode and it is the opposite of what a complex
 * site looks like from outside. The design, brand, copy, palette and
 * photography here are mine.
 */

/* ------------------------------------------------------------------ curves */

/**
 * The three curves, as Framer stores them — four control points apiece.
 *
 * `lead` is the workhorse: slow out of the gate, quick through the middle,
 * long settle. `even` is symmetrical, for anything that has to look the same
 * going as coming. `over` is the one with character: it ends at **1.35**, so
 * whatever moves on it overshoots by a third and comes back.
 */
export const EASE = {
  lead: 'cubic-bezier(0.27, 0, 0.51, 1)',
  even: 'cubic-bezier(0.44, 0, 0.56, 1)',
  over: 'cubic-bezier(0.15, 0.45, 0.15, 1.35)',
} as const;

/* --------------------------------------------------------------- durations */

/**
 * Four tenths of a second, for almost everything.
 *
 * It is worth sitting with how unusual this is. Most pages of this ambition
 * carry a dozen durations; this one has two, and the second appears once. The
 * discipline is what makes the site feel like one object rather than a set of
 * components that happen to share a palette — and it is free.
 */
export const DUR = {
  base: 0.4,
  slow: 0.6,
  /** Nothing on the reference is delayed. Stagger here comes from index, not from waiting. */
  delay: 0,
} as const;

/* ----------------------------------------------------------------- the page */

/**
 * The hero wordmark, which is the design's one piece of scale.
 *
 * Set at the full width of the viewport in a high-contrast serif, it arrives
 * by clipping up from its own baseline — not fading, because a word this large
 * fading in reads as a page that has not finished loading.
 */
export const WORDMARK = { durationS: DUR.slow, ease: EASE.lead, delayS: 0.1 } as const;

/** Blocks arriving on scroll: up 16px and in, siblings 60ms apart. */
export const REVEAL = {
  durationS: DUR.base,
  ease: EASE.lead,
  stagger: 0.06,
  threshold: 0.2,
  once: true,
} as const;

/**
 * Product cards. The image scales 1.04 under the pointer while the card itself
 * stays exactly where it is — the crop moves, the layout does not, which is
 * what keeps a four-up grid from feeling loose.
 */
export const CARD = {
  imageScale: 1.04,
  durationS: DUR.base,
  ease: EASE.lead,
  minWidth: 992,
} as const;

/**
 * The add-to-basket control, and the only thing on the page that uses `over`.
 *
 * A plus sign rotates to a tick and the pill widens; the overshoot lands as
 * the tick arrives, so the control appears to *snap* into its new state. Spent
 * once, on the one action the whole page is for.
 */
export const CONFIRM = { durationS: DUR.base, ease: EASE.over, holdMs: 1400 } as const;

/** The marquee strip under the hero: one row, translated by half, forever. */
export const MARQUEE = { durationS: 42 } as const;

/** Disclosure rows (ingredients, FAQ) open on the symmetrical curve. */
export const DISCLOSE = { durationS: DUR.base, ease: EASE.even } as const;

/* ----------------------------------------------------------- before / after */

export const SWAP_MS = 520;

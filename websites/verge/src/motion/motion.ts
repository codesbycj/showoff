/**
 * Every timing in this episode, in one file, with where it came from.
 *
 * The reference is a Nuxt build whose motion is almost entirely in CSS, split
 * across per-component stylesheets. That makes it the easiest of the three
 * references to read and the easiest to read *wrongly*: there is no timeline to
 * find, just transitions scattered over a dozen files, and the only way to see
 * the vocabulary is to pull them all out and count.
 *
 *   for f in *.css; do grep -ohE "transition:[^;}]*" $f; done | sort | uniq -c | sort -rn
 *
 * Four curves came back, used over and over, plus one spring. That is the
 * lesson worth taking: a site reads as considered when a handful of curves are
 * spent deliberately, not when every component invents its own.
 *
 * The design, the brand, the copy and the photography in this episode are mine.
 * What is measured here is how movement is *shaped* — and a cubic-bezier is
 * four numbers describing a shape, which is why the first thing each one gets
 * here is a name for the job it does in this page.
 */

/* ------------------------------------------------------------------ curves */

export const EASE = {
  /**
   * The workhorse. Slow out, fast middle, slow in — the curve that makes a
   * large thing moving a long way look heavy rather than flung. Everything
   * structural uses it: panel sweeps, clip-path reveals, the hero mask.
   */
  sweep: 'cubic-bezier(0.77, 0, 0.175, 1)',
  /**
   * Quick off the mark and settles immediately. Used where the movement has to
   * be over before you have finished noticing it: the layers inside a button,
   * a chip, a toggle.
   */
  snap: 'cubic-bezier(0.32, 0.72, 0, 1)',
  /** Symmetrical and unremarkable, for colour and width. */
  plain: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  /**
   * A spring, expressed as a sampled `linear()` curve because no cubic-bezier
   * overshoots. It peaks at about 1.14 around a quarter of the way through and
   * settles by 60%. Two labels swapping places on this curve is the single
   * nicest piece of craft in the reference, and it is worth understanding why
   * it works: the overshoot happens while the outgoing label is still moving,
   * so the pair reads as one object being flicked over rather than as two
   * elements crossfading.
   */
  spring:
    'linear(0, 0.5737 7.6%, 0.8382 11.87%, 0.9463 14.19%, 1.0292 16.54%, 1.0886 18.97%, 1.1258 21.53%, 1.137 22.97%, 1.1424 24.48%, 1.1423 26.1%, 1.1366 27.86%, 1.1165 31.01%, 1.0507 38.62%, 1.0219 42.57%, 0.9995 46.99%, 0.9872 51.63%, 0.9842 58.77%, 1.0011 81.26%, 1)',
} as const;

/* --------------------------------------------------------------- durations */

/**
 * Counted off the reference's stylesheets: 0.7s appears five times, 1s twice,
 * 1.2s twice, 0.3s three times, and the button's internals sit at 0.45–0.75.
 * Structural movement is slow, interface movement is fast, and there is
 * nothing in between.
 */
export const DUR = {
  /** Colour, opacity, anything that does not move. */
  tint: 0.3,
  /** Interface parts: button layers, chips, toggles. */
  part: 0.5,
  /** The label swap, which needs room for the overshoot. */
  flick: 0.75,
  /** Structural: a panel, a mask, a column. */
  sweep: 0.7,
  /** The big ones: hero mask, clip-path reveals. */
  reveal: 1.2,
} as const;

/* ------------------------------------------------------------- the button */

/**
 * The signature interaction, rebuilt from the reference's CSS.
 *
 * At rest: three fill layers sit below the button, each rotated -12deg about
 * its top-right corner and 120% wide, with a **negative** per-index delay so
 * that leaving the button pulls them away in the order they arrived.
 *
 * On hover: they sweep up to cover, each delayed `index * 64ms`, while the
 * label somersaults up and out (-60deg, -2em) and an identical label — a CSS
 * `::after` carrying `attr(data-text)` — somersaults in from below.
 *
 * Three details that make it rather than break it:
 *
 *   * **120% wide and tilted.** A straight fill sweeping up reads as a loading
 *     bar. The tilt is the whole effect, and the extra width is what stops the
 *     corner of the tilt showing inside the button.
 *   * **The delay is negative at rest and positive on hover.** Same stagger,
 *     opposite order, so the exit is not the entrance played backwards.
 *   * **The second label is a pseudo-element, not a node.** It cannot be
 *     tabbed to, read out, or selected, which is what you want from a copy of
 *     a word that exists for one second.
 */
export const SWOOSH = {
  layers: 3,
  tiltDeg: -12,
  staggerInMs: 64,
  staggerOutMs: -42,
  fillDurationS: 0.6,
  rotateDurationS: 0.5,
  labelDurationS: DUR.flick,
  labelDelayS: 0.1,
  labelOutDeg: -60,
  labelInDeg: -30,
  bgScale: [1.065, 1.095] as const,
  minWidth: 992,
} as const;

/**
 * Links carry their underline at rest and **retract it to the right** on
 * hover, which is the opposite of the usual wipe-in and much better: the link
 * looks like a link before you touch it, and the hover is a response rather
 * than an introduction.
 */
export const UNDERLINE = { durationS: DUR.part, ease: EASE.sweep } as const;

/* --------------------------------------------------------------- the page */

/** The marquee: one copy of the row translated to -50%, forever, linearly. */
export const MARQUEE = {
  durationS: 38,
  /** A second, slower row running the other way, so the band has depth. */
  slowDurationS: 54,
} as const;

/** Blocks arriving on scroll: a clip-path wipe rather than a fade. */
export const REVEAL = {
  durationS: DUR.reveal,
  ease: EASE.sweep,
  stagger: 0.08,
  threshold: 0.2,
  once: true,
} as const;

/** The hero mask, which draws itself once on load. */
export const HERO = {
  durationS: 1.4,
  ease: EASE.sweep,
  delayS: 0.15,
} as const;

/** Parallax: how far the slowest layer lags the scroll, as a fraction. */
export const PARALLAX = { depth: 0.12, minWidth: 992 } as const;

/** The plan switch, and anything else that toggles between two states. */
export const TOGGLE = { durationS: DUR.part, ease: EASE.snap, dimTo: 0.5 } as const;

/* ----------------------------------------------------------- before / after */

/** How long the whole page takes to crossfade when the toggle is hit. */
export const SWAP_MS = 520;

/**
 * Every timing on the after page, in one file, with where it came from.
 *
 * The reference is a Webflow site that carries its own behaviour in two inline
 * `<script>` blocks and the rest in its stylesheet. Nothing below was timed off
 * a video: the transitions were read as computed styles off the running page,
 * and the GSAP numbers are literals in the page source.
 *
 *   curl -sL https://<reference> -o home.html
 *   # the two blocks that matter are the only ones mentioning gsap/Swiper
 *   # then, for anything in CSS, read it back off the live DOM:
 *   #   getComputedStyle(el).transition  ->  "opacity .8s cubic-bezier(.4,0,.2,1), filter .8s ..."
 */

/* ------------------------------------------------------------ the page reveal */

/**
 * The one animation that runs everywhere: a block fades up out of a 10px blur
 * as it comes into view.
 *
 * Measured, not guessed — `.blur-animation` computes to `opacity: 0;
 * filter: blur(10px)` with an 800ms `cubic-bezier(.4,0,.2,1)` on both, and the
 * page adds `.is-act` to clear them. There is **no translate** in it, which is
 * the detail everyone adds by reflex and the reference does not: the block does
 * not rise, it resolves.
 */
export const REVEAL = {
  blurPx: 10,
  durationMs: 800,
  ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
  /** IntersectionObserver threshold, from the page's own observer. */
  threshold: 0.3,
  /** Each element plays once and is then unobserved. */
  once: true,
} as const;

/* ------------------------------------------------------ the benefit statistics */

/**
 * Five benefit blocks, each with a figure that counts up when it arrives.
 *
 * The trigger is ScrollTrigger `start: 'top 43%'`, `once: true` — so a block
 * starts when its top passes 43% of the viewport, and never replays. The
 * numbers run on `power3.out` over 0.8s, staggered 0.2s apart, and the count
 * snaps to 0.01 where the target has decimals and to 1 where it does not.
 */
export const STATS = {
  startWhenTopPasses: 0.43,
  durationS: 0.8,
  stagger: 0.2,
  ease: 'power3.out',
} as const;

/** The progress bars in the second block, and the bar in the fifth. */
export const BARS = { to: '84%', durationS: 0.8, ease: 'power3.out', stagger: 0.2 } as const;

/** The third block grows its image from nothing to 5rem wide. */
export const GROW = { to: '5rem', durationS: 0.8, ease: 'power3.out' } as const;

/* ---------------------------------------------------------------- the carousel */

/**
 * The testimonial rail. These are the reference's Swiper options verbatim; the
 * only one anybody notices is `speed: 800` against `delay: 3000`, which is a
 * slow, unhurried slide rather than a snap.
 */
export const RAIL = {
  slidesPerView: 1,
  spaceBetween: 120,
  spaceBetweenNarrow: 24,
  speed: 800,
  loop: true,
  autoplayDelay: 3000,
} as const;

/* ------------------------------------------------------------------- the rest */

/** The FAQ opens by animating its own measured content height. */
export const FAQ = { durationMs: 400, ease: 'cubic-bezier(0.4, 0, 0.2, 1)' } as const;

/**
 * Hovering one FAQ row dims the others to 0.3 over 400ms — but only above
 * 991px and only while every row is shut. The reference rebinds the handlers on
 * every click to keep that true, which is worth copying: a dimmed row under an
 * open answer reads as broken.
 */
export const FAQ_DIM = { to: 0.3, durationMs: 400, minWidth: 991 } as const;

/**
 * Hovering the product panel's "Buy now" button scales the *render* 1.03 over
 * a full second on `power2.out`. Desktop only, at 992.
 *
 * Worth being exact about what moves: the reference binds the listener to the
 * button and tweens `#kini-img`, which is the photograph of the panel behind
 * it. The button itself does not move at all. A second is a very long hover
 * for a 3% scale, and that is the point -- the panel drifts towards you while
 * you decide, rather than snapping when you arrive.
 */
export const CARD_HOVER = { scale: 1.03, durationS: 1, ease: 'power2.out', minWidth: 992 } as const;

/**
 * The frosted plates over the benefit photographs: 17% white at a 35px blur.
 *
 * The blur is the number that matters. At 35px the plate is opaque enough to
 * carry 8px type over any of the five pictures, which is what lets all five
 * use the same fill instead of one needing a darker one.
 */
export const PLATE = { blurPx: 35, fill: 'rgba(255, 255, 255, 0.17)' } as const;

/* ----------------------------------------------------------- before / after */

/** How long the whole page takes to crossfade when the toggle is hit. */
export const SWAP_MS = 520;

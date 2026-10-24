/**
 * Every timing in episode 8, in one file, with where it came from.
 *
 * Nothing here was timed off a video. The reference is a WordPress block theme
 * that ships one small script a block, and every number below is a literal in
 * one of them or a declaration in its stylesheet:
 *
 *   curl -sL <reference> -o page.html          # the stylesheet is in the page
 *   # the behaviour is one file a block, under
 *   #   /wp-content/.../themes/allinn/assets/build/blocks/acf/<block>/script.js
 *   # which are 400-2,000 bytes each and read straight through.
 *
 * The page also loads GSAP, ScrollTrigger and SplitText, so the entrances are
 * `gsap.from(...)` calls with their numbers in view.
 */

/* ------------------------------------------------------------ the hero type */

/**
 * The hero's last word types itself, holds, deletes and moves on, forever.
 *
 * From the block's own markup and script: the config is
 * `{"speed":75,"delay":500,"wordDisplayTime":1500}` and the loop types a
 * character every `speed` ms, waits `wordDisplayTime` on the complete word,
 * deletes at `speed / 2`, then pauses 500ms before the next word. Under
 * `prefers-reduced-motion` the script sets the first word as plain text and
 * never starts the timer -- copied exactly, because a caret blinking in the
 * middle of an h1 is precisely what that setting is for.
 */
export const TYPEWRITER = {
  speedMs: 75,
  delayMs: 500,
  holdMs: 1500,
  /** The script divides `speed` by two on the way back. */
  deleteDivisor: 2,
  /** The gap after a word has been fully deleted. */
  betweenWordsMs: 500,
} as const;

/* ------------------------------------------------------- the hero carousel */

/**
 * Two identical groups of shapes and media, the pair sliding one group's width
 * over 25s, so the procession is seamless. Each item also rocks to 12deg and
 * back on its own clock -- 10s for most, 8s for the third shape -- which is
 * what stops eight objects moving as one block.
 *
 *   animation: 25s linear infinite carousel;
 *   @keyframes carousel { 0% { translateX(0) } to { translateX(-100%) } }
 *   @keyframes itemRotate { 0% { rotate(0) } 50% { rotate(12deg) } to { rotate(0) } }
 */
export const HERO_RAIL = {
  durationS: 25,
  rockS: 10,
  rockFastS: 8,
  rockDeg: 12,
} as const;

/* ------------------------------------------------------- the word entrance */

/**
 * Every section heading and eyebrow arrives a word at a time. The reference
 * splits the line with GSAP SplitText, masks it, and runs:
 *
 *   gsap.from(words, { duration: 1, y: 100, autoAlpha: 0, stagger: 0.05,
 *                      scrollTrigger: { start: 'top 80%', end: 'bottom 20%',
 *                                       toggleActions: 'play none none reverse' } })
 *
 * The slogan block uses the same call with `start: 'top 70%'`. `toggleActions`
 * ending in `reverse` means it plays *back* when you scroll up past it, which
 * is unusual and is copied: the lines re-rise every time you come back down.
 */
export const RISE = {
  durationS: 1,
  y: 100,
  staggerS: 0.05,
  /** Fraction of the viewport the block's top must pass. */
  startAt: 0.8,
  startAtSlogan: 0.7,
  replayOnScrollBack: true,
} as const;

/**
 * The slogan's shapes and the apply block's stamps spin in from nothing.
 *
 *   gsap.fromTo(el, { scale: 0, rotation: 120 },
 *               { duration: 0.6, scale: 1, rotation: 0, delay: 0.1 + 0.15 * i,
 *                 ease: 'back.out(1.7)', scrollTrigger: { start: 'top 80%' } })
 */
export const POP = {
  durationS: 0.6,
  fromRotation: 120,
  delayBaseS: 0.1,
  delayStepS: 0.15,
  ease: 'back.out(1.7)',
  startAt: 0.8,
} as const;

/** The apply block's three stamps, which only scale -- no rotation. */
export const STAMP = { durationS: 0.5, delayS: 0.5, startAt: 0.5 } as const;

/**
 * And then drift. Each stamp is given a random speed between 0.2 and 0.8 and
 * scrubbed up to `-120 * speed` px across the block:
 *
 *   gsap.to(label, { y: () => -120 * (0.2 + 0.6 * Math.random()),
 *                    ease: 'none', scrollTrigger: { scrub: true } })
 *
 * `Math.random()` in the reference means the three never agree twice. This
 * build seeds them instead, so a screenshot of the apply block is reproducible
 * -- the one place a literal copy would have made the page untestable.
 */
export const STAMP_DRIFT = { maxPx: -120, speeds: [0.34, 0.71, 0.52] } as const;

/* ---------------------------------------------------------- the time bars */

/**
 * The location block's eight bars grow sideways out of nothing, 0.2s apart.
 * The growth is a CSS transition on `max-width`, not a tween; the class comes
 * from a ScrollTrigger with `start: 'top 70%'` and no reverse, so each row
 * plays once.
 *
 *   transition: max-width 0.75s cubic-bezier(0.47, 0.12, 0.5, 0.9);
 *   nth-of-type(n) { transition-delay: 0.2s * n }
 */
export const BARS = {
  durationS: 0.75,
  ease: 'cubic-bezier(0.47, 0.12, 0.5, 0.9)',
  staggerS: 0.2,
  startAt: 0.7,
} as const;

/* -------------------------------------------------------------- the rails */

/**
 * Swiper, with the reference's own options.
 *
 * The shared-spaces and extras rails: `slidesPerView: 'auto'`, `loop: true`,
 * `allowTouchMove: false` -- the arrows are the only way through it, which is
 * deliberate on a rail whose cards grow under the pointer.
 *
 * The galleries inside a card: `slidesPerView: 1`, `loop` and the pagination
 * only when there is more than one photograph in it.
 */
export const RAIL = { slidesPerView: 'auto', loop: true, allowTouchMove: false } as const;

/** The rooms gallery, which is `slidesPerView: 'auto'` and does take a drag. */
export const ROOMS_GALLERY = { slidesPerView: 'auto', loop: true } as const;

/* ----------------------------------------------------------- the marquee */

/**
 * The four-word marquee between the two rails. The reference builds it in JS:
 * it clones its own contents, measures the first copy, and writes a keyframe
 * that translates by `width + 28` over 20s.
 *
 * This build lays out two copies and translates -50%, which is the same motion
 * without a stylesheet written at runtime -- and it is the version that
 * survives a resize, which the reference's does not.
 */
export const MARQUEE = { durationS: 20, gapRem: 1.75 } as const;

/* ---------------------------------------------------------------- the rest */

/** The subnav's scroll spy. Its own IntersectionObserver, verbatim. */
export const SPY = { rootMargin: '-20% 0px -70% 0px', threshold: 0 } as const;

/** Every accordion and tab on the page. */
export const PANEL = { durationS: 0.5, ease: 'cubic-bezier(0.47, 0.12, 0.5, 0.9)' } as const;

/** The button hover: a rectangle rounding into a pill. */
export const BUTTON_HOVER = { fromRem: 0.5, toRem: 1.75, durationS: 0.2 } as const;

/**
 * The reference runs Lenis for smooth scrolling, with no options passed, and
 * only when the pointer is fine and reduced motion is off:
 *
 *   if (reduced || !matchMedia('(pointer: fine)').matches) return;
 *   const lenis = new Lenis(); requestAnimationFrame(function raf(t) { ... });
 *
 * Copied with one change, forced by rule 7: both designs are mounted at once
 * and the hidden one may not run a rAF loop, so Lenis is started when the after
 * is shown and destroyed when it is hidden.
 */
export const SMOOTH = { enabled: true, pointerFineOnly: true } as const;

/* ----------------------------------------------------------- before / after */

/** How long the whole page takes to crossfade when the toggle is hit. */
export const SWAP_MS = 520;

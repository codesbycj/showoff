/**
 * Every timing in episode 10, in one file, with where it came from.
 *
 * The reference is a Next.js site on Tailwind 4. Most of its page is CSS and
 * is readable; its entrances are not, because they come from a client bundle
 * the survey did not fetch. What the survey *did* get is the start state of
 * every one of them, because Tailwind writes it into the markup:
 *
 *     <div class="... opacity-0 scale-[1.2]">        the hero content
 *     <div class="... opacity-0">                     each cloud
 *     <div class="why-image ... opacity-0 scale-75">  each scattered object
 *     <span class="feat-word inline-block">           one per word
 *     <span class="char inline-block">                one per character
 *
 * So the *shape* of every entrance is read, and only the duration and the
 * easing are inferred from the capture. Those are flagged below and in the
 * README, per rule 5.
 */

/* ----------------------------------------------------------- read, not guessed */

/** The hero content starts at 1.2 and resolves to 1. From `scale-[1.2]`. */
export const HERO = { fromScale: 1.2, fromOpacity: 0 } as const;

/** Each scattered object starts at 0.75. From `scale-75`. */
export const WHY_OBJECT = { fromScale: 0.75, fromOpacity: 0 } as const;

/**
 * The clouds drift sideways forever, and this one *is* read — it is a keyframe
 * in the stylesheet:
 *
 *   @keyframes cloud-drift {
 *     0%,to { translate(-50%) translate(0) }
 *     25%   { translate(-50%) translate(12px) }
 *     50%   { translate(-50%) translate(-10px) }
 *     75%   { translate(-50%) translate(6px) }
 *   }
 */
export const CLOUD = { keyframe: 'cloud-drift', durationS: 24 } as const;

/** Tailwind's defaults, which are the page's hover clock. */
export const HOVER = { durationMs: 150, ease: 'cubic-bezier(0.4, 0, 0.2, 1)' } as const;

/**
 * The reference's reduced-motion rule, verbatim. It is a blanket
 * `transition-duration: .01ms !important` over every element on the page
 * rather than a decision per effect — blunt, but it does switch everything off,
 * and it is what the reference ships.
 */
export const REDUCED = { durationMs: 0.01, blanket: true } as const;

/* -------------------------------------------------------------- inferred */

/**
 * The per-word and per-character entrances. **Inferred** (rule 5): the start
 * state is in the markup, the finish is the resting page, and the clock is
 * matched to the capture. 0.45s with a 40ms stagger is what reads as the same
 * pace; the easing is the one the rest of the page uses.
 */
export const WORD = {
  durationS: 0.45,
  staggerS: 0.04,
  px: 14,
  ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
  inferred: true,
} as const;

/** The characters in the "why" paragraph, which run four times faster. */
export const CHAR = { staggerS: 0.012, inferred: true } as const;

/**
 * The three chip rows under "what is inside" scroll in alternating
 * directions. The reference ships each row's contents twice, which is how a
 * marquee is built; the speed is matched to the capture.
 */
export const CHIP_ROWS = { durationS: [46, 38, 52], inferred: true } as const;

/* ----------------------------------------------------------- before / after */

/** How long the whole page takes to crossfade when the toggle is hit. */
export const SWAP_MS = 520;

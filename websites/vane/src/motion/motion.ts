/**
 * Every timing in episode 9, in one file, with where it came from.
 *
 * The reference is a Next.js site on Tailwind 4, which means its motion is in
 * its class names and its stylesheet rather than in a tween library. Nothing
 * below was timed off a video:
 *
 *   curl -sL <reference> -o page.html     # the utility classes are the spec
 *   # and for anything that is a named class, its rule in the stylesheet:
 *   grep -o "[^{}]*:hover[^{}]*{[^}]*}" styles.css | sort -u
 *
 * The page is, by the standards of this series, remarkably still: no scroll
 * entrances on the headings, no parallax, no counters. What it has instead is
 * about forty hovers, and they are the design.
 */

/* ----------------------------------------------------------- the one button */

/**
 * The arrow kicks. Every button on the page carries a small arrow, and on
 * hover it rotates −35° on `cubic-bezier(0.33, 3.2, 0.515, 1)` — an easing
 * with a 3.2 overshoot, so the arrow snaps past its angle and settles. It is
 * the single most characteristic thing the page does.
 *
 *   .btn:hover .btn_arrow {
 *     transition-timing-function: cubic-bezier(0.33, 3.2, 0.515, 1);
 *     transform: rotate(-35deg);
 *   }
 */
export const ARROW = {
  deg: -35,
  durationMs: 200,
  ease: 'cubic-bezier(0.33, 3.2, 0.515, 1)',
} as const;

/**
 * The label rolls. The header's two buttons hold two copies of their own text
 * in one grid cell; on hover the first slides up out of the box and the second
 * comes in behind it, over 300ms.
 *
 *   *:transition-transform *:duration-300 *:last:translate-y-full
 *   group-hover/btnAnim:*:first:-translate-y-full
 *   group-hover/btnAnim:*:last:translate-y-0
 */
export const LABEL_ROLL = { durationMs: 300 } as const;

/** The fills, read off `.btn--1/2/3:hover`. */
export const BUTTON_FILL = {
  primaryHover: '#52d67e' /* primary-5 */,
  darkHover: '#2b3b37' /* primary-7 */,
  ghostHover: 'rgba(16, 16, 16, 0.1)',
  durationMs: 200,
  ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

/**
 * The text link. Its label lifts 4px and an underline scales in from nothing
 * over half a second, on an easing with a 1.325 overshoot.
 *
 *   .btn-link:hover .btn_text span { transform: translateY(-4px) }
 *   .btn-link:hover .btn_text::after {
 *     transition: transform 0.5s cubic-bezier(0.355, 1.325, 0.295, 1);
 *     transform: scaleX(1);
 *   }
 */
export const TEXT_LINK = {
  liftPx: -4,
  durationMs: 500,
  ease: 'cubic-bezier(0.355, 1.325, 0.295, 1)',
} as const;

/* ------------------------------------------------------------- the surfaces */

/** Tailwind's own `transition-colors` default, which is most of the page. */
export const COLOR = { durationMs: 200, ease: 'cubic-bezier(0.4, 0, 0.2, 1)' } as const;

/** The chips under each platform card, each with its card's own hover fill. */
export const CHIP = { durationMs: 200, rotateOnHoverDeg: -45 } as const;

/**
 * The resource cards invert: the ground goes black, the white type stays, and
 * the arrow's right margin closes to zero so it slides to the edge.
 *
 *   group-hover/card:bg-black
 *   group-hover/card:[&>img]:invert
 *   group-hover/card:mr-0
 */
export const CARD_INVERT = { durationMs: 200 } as const;

/**
 * The partner rows grow a 1.5px left rule in the brand green and shift their
 * text 10.5px right to make room for it — the only hover on the page that
 * moves type rather than colour.
 */
export const PARTNER_ROW = { borderPx: 1.5, padPx: 10.5 } as const;

/* ------------------------------------------------------------ the marquee */

/**
 * The awards strip under the logo wall.
 *
 * **Inferred, not read** (rule 5). The reference ships its five items twice in
 * a row that overflows its container, which is how a CSS marquee is built and
 * is not how anything else is; but the dump shows no animation on it, so the
 * transform is presumably attached after load by a script this build did not
 * fetch. 30s linear is chosen to match the pace in the capture. Declared.
 */
export const MARQUEE = { durationS: 30 } as const;

/* ------------------------------------------------------------- the entrance */

/**
 * There is no scroll entrance on this page's headings, and that is a finding
 * rather than an omission: the only 0.5s/0.6s transitions in the dump are on
 * `<g>` elements inside one decorative SVG, moving 5px. The `<span>`-per-word
 * markup in its statistics heading is there to carry an italic, not a stagger.
 *
 * So the after does not add one. The numbers here are the reference's own, and
 * they are used for the one thing it does animate — the shapes in that SVG.
 */
export const RISE = {
  opacityMs: 500,
  transformMs: 600,
  ease: 'cubic-bezier(0.22, 0.8, 0.24, 1)',
  px: 5,
} as const;

/* ----------------------------------------------------------- before / after */

/** How long the whole page takes to crossfade when the toggle is hit. */
export const SWAP_MS = 520;

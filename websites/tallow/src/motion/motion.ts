/**
 * Every timing and proportion on the page, in one file.
 *
 * None of these were eyeballed. The reference is a Next.js app that ships its
 * own source, so the measurement was a download: the section's component came
 * out of one chunk with every duration as a plain number, and the layout came
 * out of the styled-components stylesheet inlined in the document head. The
 * numbers were then confirmed against the live DOM — see the README for the
 * sampler and what it printed.
 */

/** The curves. Both were read off `:root` in the reference's own stylesheet. */
export const EASE = {
  /** The site's general-purpose exit curve. */
  out: 'cubic-bezier(0.2, 0.715, 0.205, 0.99)',
  /** Its symmetric counterpart, used for anything that travels and settles. */
  inOut: 'cubic-bezier(0.835, 0.12, 0.225, 0.77)',
} as const;

/** GSAP's named eases, so no component spells one itself. */
export const GSAP_EASE = {
  /** The flight between the sentence and the timeline. */
  travel: 'power2.inOut',
  /** Into the tilt. */
  tiltOut: 'power2.in',
  /** Out of the tilt, back to upright. */
  tiltBack: 'power2.out',
  /** The first tile falling in from above, the one time it happens. */
  drop: 'power1.out',
} as const;

/**
 * The transition itself.
 *
 * The thing worth knowing before reading any of it: this is **not** a scrubbed
 * animation. Scroll position does not drive the tiles frame by frame. It is a
 * boolean — "are the tiles on the timeline or in the sentence" — and a scroll
 * *downwards* anywhere over the timeline panel sets it true, upwards sets it
 * false. Each flip fires a fixed 1.5s GSAP timeline. Scrubbing it would be the
 * obvious guess and it is the wrong one: it makes the tiles stutter and reverse
 * with every twitch of the wheel, where the real thing commits to the move.
 */
export const TRANSITION = {
  /** Travel and resize. One tween; rotation rides on top of it. */
  flight: {
    duration: 1.5,
    ease: GSAP_EASE.travel,
  },

  /**
   * The wobble. Each tile picks a fresh random tilt within ±15° every time it
   * moves, tilts into it over the first half of its flight and comes back
   * upright over the second half. Random per flip, not per tile: the tiles
   * never fall the same way twice.
   */
  tilt: {
    maxDegrees: 15,
    outDuration: 0.75,
    backDuration: 0.75,
    outEase: GSAP_EASE.tiltOut,
    backEase: GSAP_EASE.tiltBack,
  },

  /**
   * Per-tile offset into the timeline. Leaving the sentence is the showy
   * direction and gets the wider spacing; coming back is tightened to half, so
   * the sentence reassembles faster than it came apart.
   *
   * Sampled live at 1440x900: tiles began moving at 107, 209, 324, 428 and
   * 523ms — ~104ms apart, against the 100ms the source asks for.
   */
  stagger: { toTimeline: 0.1, toSentence: 0.05 },

  /**
   * The first tile drops in from above, once, the first time the sentence comes
   * near the viewport. Nothing else on the page uses it.
   */
  entrance: {
    fromY: '-300px',
    fromRotation: 15,
    duration: 2,
    ease: GSAP_EASE.drop,
    /** ScrollTrigger start, relative to the sentence block. */
    start: 'top-=300px bottom',
    end: 'bottom bottom',
  },

  /** Reduced motion: no travel, no tilt, no stagger — a crossfade in place. */
  reduced: { fadeDuration: 0.3 },
} as const;

/**
 * The two panels and the boxes the tiles fly between.
 *
 * `inline.em` is the one number the whole FLIP hangs off: the slot sitting in
 * the sentence is a 1.15em square, so the tile's travelling scale is simply
 * (1.15 x font-size) / (timeline slot width) and nothing has to be hard-coded.
 * At 1440px wide that is 69.45 / 240.78 = 0.2884, which is what the live site
 * reports to four decimal places.
 */
export const LAYOUT = {
  /** The inline slot left in the sentence for each tile. */
  inline: {
    em: 1.15,
    /** Narrow screens give it a touch less, and a different optical margin. */
    emNarrow: 1,
    margin: '-0.05em 0.2em -0.2em 0.2em',
    marginNarrow: '0.1em 0.2em -0.15em 0.2em',
  },

  /** The timeline panel. Width and height are locked by this ratio. */
  timeline: {
    aspect: 1372 / 408,
    maxWidth: '140rem',
    /** The strip the tiles sit in, as a fraction of the panel's height. */
    blocksHeight: '72%',
    /** Inset of that strip, as a fraction of the panel's width. */
    blocksPadding: '1.5%',
  },

  /** Corner treatment, lifted from the reference's `figma-squircle` call. */
  squircle: { cornerRadius: 0.26, cornerSmoothing: 1 },

  /** The inner white rim on each tile: `inset 0 0 <15% of tile width> white`. */
  tileRim: 0.15,
} as const;

/** Lenis, matched to the reference's feel rather than its config. */
export const SCROLL = {
  lenis: {
    duration: 1.1,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    wheelMultiplier: 1,
    touchMultiplier: 1.6,
  },
} as const;

/**
 * Fluid type and gutters, in the reference's own shape: a value that is flat
 * below 375px, interpolates to a ceiling at 1800px, and measures against
 * `min(100vw, 100vh * 16/9)` so a short landscape window scales down with its
 * height instead of overflowing.
 */
export const fluid = (minPx: number, maxPx: number): string =>
  `min(${maxPx}px, max(${minPx}px, calc(${minPx}px + ${maxPx - minPx} * ` +
  `((min(100vw, 100vh * ${16 / 9}) - 375px) / 1425))))`;

/** Set on :root at boot, so CSS and JS cannot drift apart. */
export const cssVariables: Record<string, string> = {
  '--ease-out': EASE.out,
  '--ease-in-out': EASE.inOut,
  /** 32px at 375 wide, 70px at 1800. 60.4px at 1440, matching the reference. */
  '--statement-size': fluid(32, 70),
  /** 25px at 375 wide, 80px at 1800. */
  '--gutter': fluid(25, 80),
  '--slot-em': `${LAYOUT.inline.em}em`,
  '--slot-em-narrow': `${LAYOUT.inline.emNarrow}em`,
  '--slot-margin': LAYOUT.inline.margin,
  '--slot-margin-narrow': LAYOUT.inline.marginNarrow,
};

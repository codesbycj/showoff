/**
 * Every number this section moves by, in one file.
 *
 * These were not eyeballed off a recording. The reference ships its own source:
 * the marquee's rAF loop, the sweep's keyframe maths and the figure's crossfade
 * all sit as plain numbers in its Turbopack chunks, and the gradient that makes
 * the sweep visible sits in its stylesheet. Each block below says which it came
 * from. See README.md for how the chunks were read.
 */

/** The two inks and the two blues the whole section is drawn in. */
export const PALETTE = {
  /** Page and tile fill. */
  paper: '#ffffff',
  /** Headline, labels. Not pure black. */
  ink: '#0D0D0D',
  /** The accent. Active tile border, and the leading edge of the sweep. */
  accent: '#0456DD',
  /** The accent's pale partner, second stop in the sweep gradient. */
  accentSoft: '#8FB2FF',
  /** Resting tile border: `rgba(ink, 0.12)`. */
  hairline: 'rgba(13, 13, 13, 0.12)',
  /** The rule under the section: `rgba(ink, 0.1)`. */
  sectionRule: 'rgba(13, 13, 13, 0.1)',
} as const;

/**
 * The stage the tiles travel across, and the tiles themselves.
 *
 * `tileWidth` is the one measurement everything else is derived from — the
 * marquee's speed, its spacing and its focal point are all multiples of it, so
 * the section rescales as one piece instead of drifting apart at other widths.
 */
export const STAGE = {
  /** `clamp(430px, 50vw, 660px)` — the height tiles arc within. */
  height: 'clamp(430px, 50vw, 660px)',
  /** `clamp(80px, 10vw, 140px)` above the headline; nothing below. */
  padTop: 'clamp(80px, 10vw, 140px)',
} as const;

export const TILE = {
  /** `clamp(112px, 11.4vw, 168px)`, resolved in JS by {@link tileWidth}. */
  width: 'clamp(112px, 11.4vw, 168px)',
  /** Tiles are slightly taller than wide. */
  aspect: 1.09,
  /** `clamp(16px, 1.6vw, 32px)` of air between two tiles along the track. */
  gap: 'clamp(16px, 1.6vw, 32px)',
  /** Inner padding around the product shot. */
  pad: 'clamp(9px, 1vw, 14px)',
  /** The caption under each product. */
  label: {
    size: 'clamp(9px, 0.85vw, 13px)',
    marginTop: 'clamp(5px, 0.6vw, 9px)',
    weight: 500,
  },
  /** Resting and active borders, and how long one becomes the other. */
  border: { rest: 1, active: 2, transition: '0.2s ease' },
  /** The tiles fade in together once the first frame has placed them. */
  appear: '0.3s ease',
} as const;

/** `clamp()` in JS, so the loop can use the same width the stylesheet does. */
const clamp = (min: number, preferred: number, max: number) =>
  Math.min(Math.max(min, preferred), max);

/** `clamp(112px, 11.4vw, 168px)`. */
export const tileWidth = (viewportWidth: number) => clamp(112, 0.114 * viewportWidth, 168);

/** `clamp(16px, 1.6vw, 32px)`. */
export const tileGap = (viewportWidth: number) => clamp(16, 0.016 * viewportWidth, 32);

/**
 * The marquee.
 *
 * Tiles are laid at even intervals along a track two tile-widths longer than the
 * stage, and the whole track is wrapped with a modulo — so a tile that leaves
 * the right edge re-enters at the left with no seam to hide. Nothing tweens;
 * every frame is computed from elapsed time, which is why it survives a tab
 * going to the background.
 */
export const MARQUEE = {
  /**
   * Travel is `tileWidth / secondsPerTile` px per second — about 58px/s at a
   * desktop width. Phrasing the speed in tile-widths rather than pixels keeps
   * the cadence of products passing the figure identical at every size.
   */
  secondsPerTile: 2.9,

  /** The track runs from `-tileWidth` to `stageWidth + tileWidth`. */
  overscanTiles: 1,

  /**
   * The arc. `y = height * (base + depth * (0.5 - 0.5 cos(2π · x / (period ·
   * stageWidth))))` — one cosine trough across 1.2 stage-widths, so tiles enter
   * high on the left, bottom out just right of centre and are still climbing
   * when they leave. The period being wider than the stage is what stops it
   * reading as a repeating wave.
   */
  arc: { base: 0.03, depth: 0.55, period: 1.2 },

  /**
   * Depth. `zIndex = round((x + tileWidth) / 20)` — further right is nearer, so
   * tiles overlap consistently as they converge. Quantising to 20px steps keeps
   * this off the style recalc path for most frames.
   */
  depthStep: 20,

  /**
   * The focal point that picks the active tile, as `stageWidth / 2 + focusOffset
   * · tileWidth`. It sits right of centre, so a product is selected as it clears
   * the figure rather than while it is still behind it.
   */
  focusOffset: 0.9,

  /** Tiles per cycle; the rendered count is rounded up to a multiple of this. */
  productCount: 6,
} as const;

/**
 * The figure behind the tiles.
 *
 * Two images are stacked: the one on screen, and the one arriving. The arriving
 * one mounts transparent, is told to be opaque on the next frame so the browser
 * has a pair of values to interpolate, and is promoted to the base once the
 * fade has run — at which point the layer above it unmounts. Every variant is
 * also painted once, invisibly, so a swap never waits on a decode.
 */
export const FIGURE = {
  /** How long one product's figure takes to replace another's. */
  crossfade: 250,
  /** Taller than the stage, so it is cropped by the section rather than floating. */
  height: '108%',
  /** Above every tile. Tile z-indexes top out near 120. */
  zIndex: 500,
  /**
   * The figure is framed differently once a product is in play, and the box
   * reshapes rather than cutting. Both ratios are the source images' own.
   */
  ratio: { base: '1333 / 2000', product: '5452 / 5136', transition: '0.25s ease-out' },
} as const;

/**
 * The headline wipe.
 *
 * The text is painted by a gradient clipped to the glyphs: solid ink behind the
 * travelling edge, accent at the edge itself, nothing in front of it. Moving one
 * custom property from -30% to 130% therefore writes the line on from the left
 * with a blue nib. It is driven by rAF rather than a CSS transition because
 * `--sweep` is an unregistered custom property and so is not interpolable.
 */
export const SWEEP = {
  duration: 1300,
  from: -30,
  to: 130,
  /** Fires once, when 30% of the line has scrolled into view. */
  threshold: 0.3,
  /** easeInOutQuad. */
  ease: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  /** Gradient stops, as offsets in % from the sweep position. */
  stops: { ink: 0, accent: 8, accentSoft: 15, clear: 22 },
} as const;

/** The headline itself. */
export const HEADLINE = {
  size: 'clamp(32px, 5.5vw, 64px)',
  marginBottom: 'clamp(40px, 6vw, 72px)',
  tracking: '-0.02em',
} as const;

/** Smooth scrolling, so the sweep is reached at the reference's pace. */
export const SCROLL = {
  duration: 1.3,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  wheelMultiplier: 0.8,
} as const;

/** The values the stylesheet needs too, published to :root at boot. */
export const cssVariables: Record<string, string> = {
  '--ink': PALETTE.ink,
  '--paper': PALETTE.paper,
  '--accent': PALETTE.accent,
  '--accent-soft': PALETTE.accentSoft,
  '--hairline': PALETTE.hairline,
  '--section-rule': PALETTE.sectionRule,
  '--tile-w': TILE.width,
  '--tile-gap': TILE.gap,
  '--tile-pad': TILE.pad,
  '--stage-h': STAGE.height,
  '--sweep-ink': `${SWEEP.stops.ink}%`,
  '--sweep-accent': `${SWEEP.stops.accent}%`,
  '--sweep-accent-soft': `${SWEEP.stops.accentSoft}%`,
  '--sweep-clear': `${SWEEP.stops.clear}%`,
};

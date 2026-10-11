/**
 * ApexPay's tokens — the "Obsidian Kinetic" system.
 *
 * The reference is a Google Stitch export: `ref/apexpay/code.html`, plus the
 * `DESIGN.md` whose frontmatter carries the whole token set. The markup is the
 * authority, not the PNG. Every size in it is an explicit Tailwind px value,
 * so there is nothing to measure off a screenshot and nothing to convert.
 *
 * So these numbers were not read off `screen.png` at all. The export was
 * reloaded in headless Chrome at the harness's own 393px viewport and every
 * element's `getBoundingClientRect` and computed style taken straight out of
 * the DOM by `tools/preview/boxes.js` — exact boxes, exact resolved
 * letter-spacing, exact composited fills, none of which survives a trip
 * through a PNG.
 *
 * **`screen.png` is a 390px render upscaled to 438**, which is worth knowing
 * before trusting anything measured off it. Re-rendering the markup at
 * 375/390/393/412/430/438/440 and diffing each against the PNG picks 390 out
 * cleanly — mean channel error 6.95 against 10.73 for the next best, and 19.6
 * for the PNG's own 438. Read at face value it looks like a uniform 12% scale,
 * which is big enough to notice but small enough to mistake for sloppiness.
 * Every value below is width-independent; only the derived widths change, and
 * those are laid out rather than written down.
 *
 * **Where `DESIGN.md`'s prose and its frontmatter disagree, the frontmatter
 * wins** and the prose is commentary — the usual way round for a Stitch
 * export, and they disagree a lot here. The prose names a "Base Canvas" of
 * `#0B0F15`, "Surface Elevation 1" `#111622` and a slate `#8E9BAE`; none of
 * those three appears anywhere in the markup or the token block. What the page
 * actually renders is `#10141a`, `#181c22` and `#c0c6d8`. The one value both
 * agree on is the chartreuse, `#b6f035`.
 */

/** Colours. Each is either a literal in the markup or a resolved composite. */
export const ax = {
  // ---- canvas ------------------------------------------------------------
  /** The page: `surface` / `surface-dim`. The app bar sits over it at 80%. */
  canvas: '#10141a',
  /** The balance card and the spending row: `surface-container-low`. */
  surfaceLow: '#181c22',
  /** The notification bell in the app bar: `surface-container`. */
  surface: '#1c2026',
  /** Pills, inactive quick actions, the greeting bell: `surface-container-high`. */
  surfaceHigh: '#262a31',
  /** The progress track, and the active card's base: `surface-container-highest`. */
  surfaceHighest: '#31353c',

  // ---- ink ---------------------------------------------------------------
  /** Headings, balances, active icons: `on-surface`. */
  ink: '#dfe2eb',
  /** Labels, metadata, inactive icons: `secondary`. */
  inkMuted: '#c0c6d8',
  /** The app bar's own glyphs and the `Pro` chip: `on-surface-variant`. */
  inkVariant: '#c3c9af',

  // ---- accent ------------------------------------------------------------
  /** The chartreuse: `primary-container`. Buttons, dots, the active tab. */
  signal: '#b6f035',
  /** Ink on the chartreuse quick action: `on-primary-fixed`. */
  onSignal: '#141f00',
  /** Ink on the chartreuse nav pill — a different token, and a lighter one. */
  onSignalNav: '#4c6b00',

  // ---- composites --------------------------------------------------------
  /**
   * The card stack's container. `bg-surface-container-low/70` over the canvas,
   * which the DOM resolves to this rgba rather than a flat hex.
   */
  stackWell: 'rgba(24, 28, 34, 0.7)',
  /** A collapsed card row: `bg-surface-container-high/60`. */
  cardRow: 'rgba(38, 42, 49, 0.6)',
  /** The active card: `bg-surface-container-highest/90`. */
  cardActive: 'rgba(49, 53, 60, 0.9)',
  /** The dock: `bg-surface-container/90`. */
  dock: 'rgba(28, 32, 38, 0.9)',
  /** The app bar: `bg-surface-dim/80`. Backed by a blur on the real thing. */
  appBar: 'rgba(16, 20, 26, 0.8)',
  /** The icon well inside the chartreuse quick action: plain black at 10%. */
  onSignalWell: 'rgba(0, 0, 0, 0.1)',

  // ---- alpha inks --------------------------------------------------------
  /** The cents on a balance, and masked card digits: `secondary/70`. */
  inkMuted70: 'rgba(192, 198, 216, 0.7)',
  /** The eye toggles and the expiry date: `secondary/60`. */
  inkMuted60: 'rgba(192, 198, 216, 0.6)',
  /**
   * The three masked card numbers are three different opacities — 70, 80, 90
   * going down the stack. That rising contrast is how the stack reads as
   * depth; setting all three the same flattens it.
   */
  inkMuted80: 'rgba(192, 198, 216, 0.8)',
  inkMuted90: 'rgba(192, 198, 216, 0.9)',

  // ---- hairlines ---------------------------------------------------------
  /** The ghost border the system puts on elevated surfaces. */
  hairline: 'rgba(255, 255, 255, 0.08)',

  // ---- card networks -----------------------------------------------------
  /** Mastercard's two discs, straight out of the markup. */
  mcRed: '#EB001B',
  mcAmber: '#F79E1B',
} as const;

/**
 * Type.
 *
 * Two families, both named outright by the design, so neither is a substitute.
 * Space Grotesk carries the two balance figures and nothing else; Plus Jakarta
 * Sans carries everything else.
 *
 * React Native resolves a face by family name, never by numeric weight, so
 * each weight is its own family here and `fontWeight` is never set.
 */
export const font = {
  /** Space Grotesk 700 — `headline-xl` and `headline-xl-mobile`. */
  display: 'SpaceGrotesk_700Bold',
  body: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extrabold: 'PlusJakartaSans_800ExtraBold',
} as const;

/**
 * The type scale, as the DOM resolves it.
 *
 * `letterSpacing` is in dp, not em: the tokens set it in em and React Native
 * wants an absolute value, so each is the em figure multiplied through its own
 * size. `-0.03em` at 32px is -0.96, not -0.03.
 */
export const type = {
  /**
   * The headline balance. The token says -0.03em but the markup then sets
   * `tracking-tight` over it, which is -0.025em — so -0.8 at 32px, not -0.96.
   */
  headlineXlMobile: { fontFamily: font.display, fontSize: 32, lineHeight: 38, letterSpacing: -0.8 },
  /**
   * The card's own balance. Same face and size, but `leading-none` — so the
   * line box is 32 rather than 38, and the figure sits tight to the name above.
   */
  cardBalance: { fontFamily: font.display, fontSize: 32, lineHeight: 32, letterSpacing: -0.8 },
  /** `09/29`. 12px, `tracking-wider`, on the body's inherited 20px leading. */
  expiry: { fontFamily: font.medium, fontSize: 12, lineHeight: 20, letterSpacing: 0.6 },
  /** `ApexPay`, `Sajibur Rahman`, `Credit Card`. 18px/24, `tracking-tight`. */
  headlineSm: { fontFamily: font.semibold, fontSize: 18, lineHeight: 24, letterSpacing: -0.45 },
  /** `Spending Limit`. 14px/18 at 0.01em. */
  labelLg: { fontFamily: font.semibold, fontSize: 14, lineHeight: 18, letterSpacing: 0.14 },
  /** `My Balance`, quick-action labels, `+22.7%`. 12px/16 at 0.02em. */
  labelMd: { fontFamily: font.medium, fontSize: 12, lineHeight: 16, letterSpacing: 0.24 },
  /** `Pro`, `View Details`. 10px/14 at 0.04em. */
  labelSm: { fontFamily: font.semibold, fontSize: 10, lineHeight: 14, letterSpacing: 0.4 },
  /** `Good Morning`, `vs last month`, the spending sub-line. 12px/16. */
  bodySm: { fontFamily: font.body, fontSize: 12, lineHeight: 16 },
  /** The cardholder name and `Add Card`. 13px/20 — an explicit override. */
  body13: { fontFamily: font.body, fontSize: 13, lineHeight: 20 },
} as const;

/**
 * Radii.
 *
 * The design's scale is renamed from Tailwind's: its `rounded-lg` is 2rem and
 * its `rounded` is 1rem, so a class name here means something different from
 * what it means anywhere else. These are the resolved pixel values.
 */
export const radius = {
  /** `rounded-lg` — 2rem. The balance card. */
  card: 32,
  /** `rounded-3xl` — Tailwind's own, not the token. The card stack well. */
  well: 24,
  /** `rounded-2xl`. Card rows, the active card, the spending row. */
  panel: 16,
  /** Quick-action tiles. */
  tile: 16,
  full: 9999,
} as const;

/**
 * Shadows, as CSS strings.
 *
 * `boxShadow` rather than the `shadow*` family plus `elevation`, because two
 * of these three are *coloured*: the design's "chartreuse glow" is a halo of
 * `rgba(182, 240, 53, 0.35)` under the featured action and the active nav
 * capsule, and it is clearly visible in the reference. Android's `elevation`
 * only ever draws a black shadow, which on a near-black canvas is nothing at
 * all — so the one property that would normally carry this cannot. React
 * Native 0.76 and up accept the CSS form directly, spread included, and that
 * is what both of these need.
 */
export const shadow = {
  /** Under the featured quick action. Tighter spread than the nav's. */
  signalTile: '0px 8px 20px -6px rgba(182, 240, 53, 0.35)',
  /** Under the active dock capsule. */
  signalPill: '0px 8px 24px -4px rgba(182, 240, 53, 0.35)',
  /** The dock itself, lifting it off the canvas. */
  dock: '0px 4px 24px rgba(0, 0, 0, 0.5)',
  /** A hairline of depth under the app bar. */
  appBar: '0px 1px 8px rgba(0, 0, 0, 0.25)',
} as const;

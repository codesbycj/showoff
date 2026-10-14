/**
 * Botanic's tokens.
 *
 * The reference is a Google Stitch export — `ref/botanic/code.html` plus the
 * `DESIGN.md` whose frontmatter carries the whole token set. The markup is the
 * authority, not the PNG: every size in it is an explicit Tailwind px value,
 * so there is nothing to measure and nothing to convert.
 *
 * So none of this was read off a screenshot. The export was reloaded in
 * headless Chrome at a 390px viewport and every element's
 * `getBoundingClientRect` and computed style taken straight out of the DOM:
 * exact boxes, exact resolved letter-spacing, exact composited fills.
 *
 * **`screen.png` is a 390px render, not a 393px one.** `tools/preview/refwidth.js`
 * settles it, and the decisive signal is not the pixel diff but the aspect: the
 * markup lays out 1142px tall at 390, and 1142 x (438/390) = 1282.6 against the
 * PNG's actual 1283 — a 0.4px match that no other candidate comes near (393
 * implies 1232.6, 412 implies 1175.8). The PNG is therefore a 1.1231x render.
 * Every value here is width-independent; what changes on the 393 harness are
 * the derived widths — the content column is 353 rather than the export's 350,
 * a pod 168.5 rather than 167 — and those are laid out, not written down.
 *
 * Where `DESIGN.md`'s prose and its frontmatter disagree they are treated the
 * usual way round: **the frontmatter wins and the prose is commentary** — and
 * here they disagree about almost everything. The prose names a primary of
 * `#95D564`, a canvas of `#141714`, cards at `#1D241D`, cream text at
 * `#F4F6F0`; the frontmatter and the markup's own Tailwind config agree on
 * `#b0f27d`, `#111411`, `#1d201d` and `#e1e3de`. Two of those are the prose
 * renaming a token rather than contradicting it — its "primary" is the
 * frontmatter's `primary-container`, which is genuinely what the CTA is filled
 * with — but the rest are simply invented. Both names are kept below so a
 * value can be traced back to the file it came from.
 */

/** Colours. Each is either a literal in the markup or a fill Chrome resolved. */
export const bt = {
  // ---- canvas ------------------------------------------------------------
  /** The page. `surface`, `surface-dim` and `background` are all this hex. */
  canvas: '#111411',

  /** Tonal layers, darkest to lightest. The design elevates by tone, not shadow. */
  containerLowest: '#0c0f0c',
  /** The verified-kitchen row. */
  containerLow: '#191c19',
  /** Both metadata pods. */
  container: '#1d201d',
  /** Ingredient chips, the favourite button, the verified row's icon disc. */
  containerHigh: '#282b27',
  containerHighest: '#333632',

  // ---- ink ---------------------------------------------------------------
  /** Headings, titles, chip labels. `on-surface`. */
  ink: '#e1e3de',
  /** Body copy and the brand tag. `on-surface-variant`. */
  inkVariant: '#c1c9b6',
  /** Metadata, struck prices, review counts. `outline` — a sage grey, not a rule. */
  muted: '#8c9381',
  outlineVariant: '#42493a',

  // ---- accents -----------------------------------------------------------
  /**
   * The live green: the price, the brand leaf, the nutrition glyph, the dots
   * on two chips. `primary`.
   */
  accent: '#b0f27d',
  /**
   * The *filled* green: the CTA and the showcase panel's wash.
   * `primary-container`, and what the prose miscalls "primary".
   */
  accentFill: '#95d564',
  /** The CTA's label, on that fill. `on-primary`. */
  onAccent: '#183800',
  /** `primary-fixed` — one ingredient dot, a shade brighter than `accent`. */
  accentFixed: '#b3f57f',

  /** Buttercup: the stars, the spice badge, one chip dot. `secondary`. */
  gold: '#efc146',
  /** Blush clay: one chip dot. `tertiary-container`. */
  clay: '#ffb19b',
  /** `error`, which the favourite button takes once it is toggled on. */
  error: '#ffb4ab',
} as const;

/**
 * Fills the markup leaves to an alpha blend, taken as Chrome composited them.
 *
 * React Native has no `backdrop-filter`, so the two blurred bars carry their
 * alpha straight over the canvas instead. Both sit over the page's own colour
 * rather than over content — the header over the showcase panel's top edge,
 * the purchase bar over the page foot — so the blur has almost nothing to do
 * and dropping it costs the design very little. Said plainly in the handover
 * rather than passed off as equivalent.
 */
export const alpha = {
  /** `bg-surface/80` on the header. */
  header: 'rgba(17, 20, 17, 0.8)',
  /** `bg-surface/90` on the purchase bar. */
  purchaseBar: 'rgba(17, 20, 17, 0.9)',
  /** `bg-primary-container/30` — the showcase panel's wash. */
  showcase: 'rgba(149, 213, 100, 0.3)',
  /** `bg-surface-container/85` on both dietary badges. */
  badge: 'rgba(29, 32, 29, 0.85)',
  /** `text-on-surface-variant/90` on the chef's note. */
  noteInk: 'rgba(193, 201, 182, 0.9)',
  /** The two ambient discs behind the dish, and the glow under it. */
  glowPrimary: 'rgba(176, 242, 125, 0.2)',
  glowSecondary: 'rgba(239, 193, 70, 0.15)',
  glowUnderDish: 'rgba(176, 242, 125, 0.25)',
} as const;

/**
 * The type ramp.
 *
 * Two real Google families, so nothing is substituted: Oswald for the condensed
 * display voice, Plus Jakarta Sans for everything else. Sizes and weights come
 * from `DESIGN.md`; the line heights and letter-spacing come from the DOM,
 * because the markup overrides the token on most strings and the two disagree
 * on nearly every line. The title is the clearest case — `headline-lg` is a
 * 32px line height, and `leading-tight` on the markup makes it 35.
 */
export const type = {
  /** The watermark, at `tracking-tighter`. */
  headlineXl: { size: 44, line: 44, tracking: -2.2, family: 'Oswald_700Bold' },
  /** The product title (`leading-tight`) and the price (`leading-none`). */
  headlineLg: { size: 28, line: 35, tracking: -0.7, family: 'Oswald_600SemiBold' },
  headlineLgTight: { size: 28, line: 28, tracking: 0, family: 'Oswald_700Bold' },
  /** The app bar title (`tracking-wide`) and the rating figure. */
  headlineSm: { size: 18, line: 22, tracking: 0.45, family: 'Oswald_600SemiBold' },
  headlineSmFlat: { size: 18, line: 22, tracking: 0, family: 'Oswald_600SemiBold' },

  bodyMd: { size: 14, line: 20, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  /** The chef's note, at `leading-relaxed`. */
  note: { size: 14, line: 22.75, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  bodySm: { size: 12, line: 16, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  /** The macro split, at `tracking-tight`. */
  macro: { size: 12, line: 16, tracking: -0.3, family: 'PlusJakartaSans_500Medium' },

  /** Section headings and the CTA, at `tracking-wider`. */
  labelLg: { size: 14, line: 18, tracking: 0.7, family: 'PlusJakartaSans_700Bold' },
  /** The brand tag, at `tracking-wider`. */
  labelMdWide: { size: 12, line: 16, tracking: 0.6, family: 'PlusJakartaSans_600SemiBold' },
  /** "Nutrition facts", at `tracking-wide`. */
  labelMdBold: { size: 12, line: 16, tracking: 0.3, family: 'PlusJakartaSans_700Bold' },
  /** Chip labels and the verified row's title. */
  labelMd: { size: 12, line: 16, tracking: 0, family: 'PlusJakartaSans_600SemiBold' },
  /** The struck price — semibold, though the token calls for 600 either way. */
  labelMdPrice: { size: 12, line: 16, tracking: 0, family: 'PlusJakartaSans_600SemiBold' },
  /** The dietary badges, at `tracking-wider`. */
  labelSm: { size: 10, line: 14, tracking: 0.5, family: 'PlusJakartaSans_700Bold' },
  /** "480 kcal total" — same token, no tracking override. */
  labelSmFlat: { size: 10, line: 14, tracking: 0, family: 'PlusJakartaSans_700Bold' },
} as const;

/** Corner radii, from `DESIGN.md`'s `rounded` scale. */
export const radius = {
  /** `rounded-lg`, 2rem — both pods and the verified row. */
  lg: 32,
  /** `rounded-3xl` — the dish and the glow behind it. */
  dish: 24,
  /** `rounded-b-[2.5rem]` — the showcase panel's two bottom corners. */
  showcase: 40,
  full: 9999,
} as const;

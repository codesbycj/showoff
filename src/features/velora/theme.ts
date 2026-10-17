/**
 * Velora's tokens.
 *
 * The reference is a single design shot — one 736x736 image with two phones in
 * it — and the brief for this one was explicitly *inspiration, not pixel
 * perfect*. So the rule the other showcases here follow, that every value is
 * measured and nothing is invented, does not apply: there is no export to
 * measure, and the phones in the shot are about 290px wide, which is less than
 * a third of the density anything could be read at.
 *
 * What **was** taken from the shot are the decisions a smaller render still
 * carries honestly: the hues, and the relationships between them. Each of the
 * four below is the modal colour of a large flat region, so JPEG noise averages
 * out even at that size:
 *
 *   promo card      #abcc5b   (9201px sampled, modal by a clear margin)
 *   active tab pill #e8eed4
 *   dark pill       #111305
 *   search field    #eaeaea   against a near-white page
 *
 * The last of those is the one worth stating, because it is a relationship
 * rather than a colour: the search field and the category chips are *darker*
 * than the page, and the cards are lighter than both. The page is not grey with
 * white cards on it — it is near-white, with the inputs sunk into it.
 *
 * Everything else — the ramp, the radii, the spacing — is designed to fit, and
 * is marked as such.
 */

export const vl = {
  // ---- surfaces ----------------------------------------------------------
  /**
   * The page. A light warm grey, *not* near-white.
   *
   * This is the correction that mattered most. A first pass read the search
   * field's `#eaeaea` as a field sunk into a near-white page, and built the
   * whole screen that way round. Looking at the reference at 3x says the
   * opposite: the page is the grey one, and the search field, the icon buttons
   * and the tab bar are white *raised* off it. Inverted, the page loses its
   * depth — everything sits on one plane and the white controls stop reading
   * as controls.
   */
  canvas: '#f2f2f0',
  /** Raised: the search field, the icon buttons, the floating tab bar. */
  card: '#ffffff',
  /** Sunken: category chips, and the bed a product photograph sits on. */
  field: '#e8e8e4',
  /** Hairline, used once: the search field's divider. */
  rule: '#e2e2dd',

  // ---- ink ---------------------------------------------------------------
  /** Headings, prices, the promo headline. A near-black with an olive cast. */
  ink: '#16180e',
  /** Secondary copy, placeholder, inactive tab glyphs. */
  muted: '#8d9185',
  /** The category chips' labels. */
  inkSoft: '#3d4036',

  // ---- accent ------------------------------------------------------------
  /** The promo card. Measured. */
  lime: '#abcc5b',
  /**
   * A half-step down. The active carousel dot, the "See all" links and the
   * active tab's glyph — the reference runs its accent through all three, and
   * dropping it to grey is what made the first pass look like a wireframe.
   */
  limeDeep: '#8fae3f',
  /** A shade under the card's own green, for the soft shape behind the copy. */
  limeShade: 'rgba(122, 156, 56, 0.28)',
  /** The active tab's pill. Measured. */
  limeWash: '#e8eed4',
  /** The dark pills — badge, CTA, bag button. Measured. */
  pill: '#111305',
  /** On the dark pills. */
  onPill: '#f7f9ef',
} as const;

/**
 * The type ramp. **designed** — nothing in a 290px-wide render fixes a size.
 *
 * Plus Jakarta Sans throughout, chosen because the shot's face is a geometric
 * humanist sans with a tall x-height and a single-storey `g`, and because it is
 * already registered in `src/theme/fonts.ts` for two other showcases. Adding a
 * family there drifts every other showcase's timelapse lock, so reusing one
 * that is already present is worth a great deal more than a marginally closer
 * substitute.
 *
 * `line` is set on every entry rather than left to the platform: React Native
 * and the web harness disagree about default leading, and a ramp that is
 * explicit renders identically on both.
 */
export const type = {
  /** The promo headline, over two lines. */
  promo: { size: 17, line: 23, tracking: -0.3, family: 'PlusJakartaSans_800ExtraBold' },
  /** Section headings — "Categories", "New Arrival". */
  section: { size: 15, line: 20, tracking: -0.2, family: 'PlusJakartaSans_700Bold' },
  /** Prices under the product cards. */
  price: { size: 15, line: 20, tracking: -0.2, family: 'PlusJakartaSans_700Bold' },
  /** The "Shop Now" CTA and the active tab's label. */
  cta: { size: 13, line: 17, tracking: -0.1, family: 'PlusJakartaSans_700Bold' },
  /** Category chip labels, which wrap to two lines. */
  chip: { size: 12, line: 15, tracking: -0.1, family: 'PlusJakartaSans_600SemiBold' },
  /** The "Limited Offer" badge. */
  badge: { size: 10, line: 13, tracking: 0.2, family: 'PlusJakartaSans_700Bold' },
  /** "See all", and the search placeholder. */
  action: { size: 12, line: 16, tracking: -0.1, family: 'PlusJakartaSans_500Medium' },
  field: { size: 13, line: 17, tracking: -0.1, family: 'PlusJakartaSans_400Regular' },
} as const;

/** Corner radii. **designed** — read off the shot's proportions, not its pixels. */
export const radius = {
  /** The promo card and the product images. */
  card: 22,
  /** The search field and the icon buttons — a squircle, not a pill. */
  control: 16,
  /** Category chips. */
  chip: 14,
  /** Category thumbs, inside their chip. */
  thumb: 10,
  /** Anything that is genuinely a pill: the badge, the CTA, the tab bar. */
  full: 999,
} as const;

/**
 * The one shadow on the screen, under the floating tab bar.
 *
 * `shadowColor`/`shadowOffset`/`shadowOpacity`/`shadowRadius` and `elevation`
 * are carried together in one object rather than behind a `Platform.select`.
 * The keys the running platform does not read are inert, and a select is
 * exactly the thing the web harness cannot check — it renders the web branch
 * and says nothing about what Android would do.
 */
export const tabShadow = {
  shadowColor: '#2b3016',
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.12,
  shadowRadius: 24,
  elevation: 12,
} as const;

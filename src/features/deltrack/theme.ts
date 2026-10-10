/**
 * Deltrack's tokens, measured off the reference.
 *
 * The reference is a presentation mockup — two phones on a lilac board, the
 * left one 253px wide — so there is no clean pixel grid to read. What there is
 * is a proportion: the phone body measures 250x541px with a 3-4px bezel, which
 * puts the screen at 242x534px. Mapped onto the harness's 393x852dp that makes
 * 1px = 1.61dp, and `ref/deltrack/home-dp.png` is the screen resampled to that
 * scale so every measurement below could be read straight off it in dp.
 *
 * One pixel of the source is 1.6dp, so nothing here is better than +/-2dp. The
 * numbers that mattered — the card rectangles, the two 16dp page margins, the
 * 20dp inset the navy card and the search field share — were cross-checked
 * against each other rather than trusted one at a time.
 *
 * Every colour is a median over a flat patch, never a single pixel: the mockup
 * is soft enough that one pixel of a 1dp hairline is half background.
 */

/** Colours, each a median over a flat patch of the reference. */
export const dt = {
  // ---- canvas ------------------------------------------------------------
  /** The lilac the top of the page washes in, fading to white by ~300dp. */
  washTop: '#EAEDF9',
  washMid: '#EEF1FA',
  /** Everything below the hero. */
  bg: '#FFFFFF',
  surface: '#FFFFFF',

  // ---- the hero card -----------------------------------------------------
  // The hero's ramp, read along its own tilted axis rather than down the
  // card — see track-banner.tsx for why the axis is tilted at all.
  /** Where the "Track your package" card starts. */
  heroTop: '#B0BBE9',
  /** It barely moves over the first sixth. */
  heroMid: '#B4C0E6',
  /** A third along. */
  heroLow: '#C9D1EC',
  /** Half, and most of the way to the page. */
  heroWash: '#E9EAF6',
  /** Two thirds, where it is indistinguishable from white. */
  heroPale: '#FDFDFE',
  /** And by its foot it is the page again, which is why its edge is invisible. */
  heroFoot: '#FDFDFF',

  // ---- the in-transit card ----------------------------------------------
  // A left-to-right ramp: slate on the left shoulder, near-black navy on the
  // right, a shade darker again along the bottom.
  transitA: '#7C8296',
  transitB: '#4A5068',
  transitC: '#242C4C',
  transitD: '#060D2A',

  // ---- ink ---------------------------------------------------------------
  /** Headings and card titles. */
  ink: '#161B33',
  /** One step down from ink: a product line, a history row's note, a date. */
  inkSoft: '#434A5E',
  /** Secondary labels — "My Location", "Estimated Delivery", "Tracking ID". */
  muted: '#757C90',
  /** The lightest ink on a white surface: a placeholder, a "View all". */
  subtle: '#979DAD',
  /** The lighter grey on a dark card's small labels. */
  onDarkMuted: '#A9B0C6',
  onDark: '#FFFFFF',

  // ---- accents -----------------------------------------------------------
  /** The scan button, the "Shipped" pill, the + glyph. */
  blue: '#1E45CF',
  /** One stop brighter, for the top of the scan button. */
  blueLift: '#2F5BE8',
  /** The navy every dark surface is painted in: the dock and the arrow discs. */
  navy: '#020B2C',
  /** The progress line, the "Delivered" status, the check on a parcel disc. */
  amber: '#F0AE3C',
  /** The pin on the parcel illustration, and the bell's badge. */
  red: '#E8202A',

  // ---- card parts --------------------------------------------------------
  /** A shipment card's body, which ramps to white at its foot. */
  cardTop: '#E3E7F5',
  cardFoot: '#FAFBFD',
  /** The periwinkle band the carrier sits on. */
  carrierBand: '#D2D8EC',
  /** The hairline round a chip or the page-dot pill. */
  hairline: '#E4E7F1',
  /** The near-black disc a parcel glyph sits on. */
  parcelDisc: '#17171C',
} as const;

/**
 * Poppins, at the sizes the reference's own text measures.
 *
 * Every size here was solved rather than guessed: the glyph box of each string
 * was measured in `home-dp.png`, then Poppins was fitted to that *width* and
 * its cap height checked against the measured one. The two agree to within 4%
 * across the whole screen, which is what settled the face — Outfit needs to be
 * 12% larger to match the same widths, so it cannot match width and height at
 * once.
 *
 * The scale is small for a phone: a 14dp section heading and an 11dp body. That
 * is the design, not a conversion error — "Current Shipment" is 129dp wide in
 * the reference and Poppins Bold needs exactly 14dp to draw it that wide.
 */
export const FONT = {
  regular: 'Poppins_400Regular',
  medium: 'Poppins_500Medium',
  semibold: 'Poppins_600SemiBold',
  bold: 'Poppins_700Bold',
} as const;

export const TYPE = {
  /** IN-TRANSIT. Medium rather than SemiBold: the stems measure ~1.8dp. */
  hero: { fontFamily: FONT.medium, fontSize: 20, lineHeight: 26 },
  /** "Current Shipment", "Shipping history". */
  section: { fontFamily: FONT.bold, fontSize: 14, lineHeight: 18 },
  /** "Track your package". */
  cardTitle: { fontFamily: FONT.bold, fontSize: 13, lineHeight: 17 },
  /** "23/B Kumapara, Sylhet" — 146dp of text, which is 12.5dp of Poppins. */
  address: { fontFamily: FONT.semibold, fontSize: 12.5, lineHeight: 17 },
  /** "My Location", the only 10.5 on the screen. */
  overline: { fontFamily: FONT.medium, fontSize: 10.5, lineHeight: 14 },
  /** "One Package" — 69dp of text, smaller than the figures under it. */
  rowTitle: { fontFamily: FONT.bold, fontSize: 10.4, lineHeight: 14 },
  /** A tracking number in a history row, and the status beside it. */
  rowId: { fontFamily: FONT.bold, fontSize: 12, lineHeight: 15 },
  /** A figure on a card — a date, a tracking id. */
  value: { fontFamily: FONT.bold, fontSize: 11, lineHeight: 14 },
  /** The same size, unbolded: "#FTOP-0TKA24C", "22 May 2025". */
  valueSoft: { fontFamily: FONT.semibold, fontSize: 11, lineHeight: 14 },
  /** Running text: the hero's subtitle, the search placeholder. */
  body: { fontFamily: FONT.medium, fontSize: 11.3, lineHeight: 15 },
  /** One step down: a product name, a history row's second line. */
  bodySm: { fontFamily: FONT.medium, fontSize: 9.6, lineHeight: 13 },
  /** "FedEx Delivery Partner". */
  carrier: { fontFamily: FONT.semibold, fontSize: 10, lineHeight: 13 },
  /** A field label under its value. */
  label: { fontFamily: FONT.medium, fontSize: 9, lineHeight: 12 },
  /** The smallest things on screen: dock labels, "Origin", a status pill. */
  micro: { fontFamily: FONT.semibold, fontSize: 8.5, lineHeight: 11 },
} as const;

/** Radii, in dp. */
export const R = {
  /** The in-transit card and a shipment card. */
  card: 24,
  /** The hero. Its corner curve runs ~28dp before the edge straightens. */
  hero: 28,
  /** The dock's top corners. */
  dock: 21,
  /** Its bottom corners, which follow the phone's own. */
  dockFoot: 40,
  /** A history row. */
  row: 16,
  full: 999,
} as const;

/** The page margin, and the inset the hero's own children hold to. */
export const SP = {
  /** 16dp each side, which both the hero and the dock's content agree on. */
  margin: 16,
  /** The hero's padding: its search field and card both start at 36dp. */
  heroPad: 20,
  /** A shipment card's padding. */
  cardPad: 16,
} as const;

/**
 * Shadows.
 *
 * Each carries `shadowColor`/`shadowOpacity`/`shadowRadius`/`shadowOffset` and
 * `elevation` in one object rather than a `Platform.select`. The keys the
 * running platform does not read are inert, and a select is exactly what the
 * web harness cannot check.
 */
export const LEVEL = {
  /** A shipment card or a history row — a wide, almost invisible lift. */
  card: {
    shadowColor: '#2B3566',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  /** The bell, and the page-dot pill. */
  button: {
    shadowColor: '#2B3566',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  /** The navy in-transit card. */
  transit: {
    shadowColor: '#0B1538',
    shadowOpacity: 0.12,
    shadowRadius: 13,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  /** The dock. */
  dock: {
    shadowColor: '#020B2C',
    shadowOpacity: 0.3,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 14 },
    elevation: 16,
  },
  /** The scan button's own glow. */
  scan: {
    shadowColor: '#2F5BE8',
    shadowOpacity: 0.45,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 12,
  },
} as const;

/** Semantic overrides, so the shared primitives read on Deltrack's page. */
export const deltrackTheme = {
  '--bg': dt.bg,
  '--surface': dt.surface,
  '--fg': dt.ink,
  '--muted': dt.muted,
  '--border': dt.hairline,
  '--accent': dt.blue,
  '--accent-fg': '#FFFFFF',
} as unknown as Record<string, string>;

/**
 * Cargo's tokens.
 *
 * The reference is a design shot — three phones in one 900x675 image, so each
 * screen is about 240px wide. The brief is *inspiration, not pixel perfect*,
 * so nothing below claims to be a measurement it is not.
 *
 * The hues were taken as the modal colour of a flat region on a 3x upsample:
 *
 *   brand yellow   #f8dd4e   (1199px sampled, modal by a clear margin)
 *   title ink      #0a0a0a   — effectively black
 *   button         #ffffff
 *
 * The yellow is the whole screen. There is no second surface colour on this
 * page: the photograph washes into it and the only thing that breaks it is the
 * white button at the foot.
 */

export const cg = {
  /**
   * The page, and the colour the hero fades into.
   *
   * `tools/bake/cargo.py` ends the hero asset on this exact value, so there is
   * no seam between the photograph and the page to line up — the image's last
   * row *is* the page.
   */
  yellow: '#f8dd4e',

  /** The headline. */
  ink: '#0d0d0b',
  /**
   * The supporting sentence. A warm dark olive rather than a neutral grey —
   * grey on this yellow reads as dirty, where a colour that shares the
   * ground's warmth recedes cleanly.
   */
  muted: '#6a6340',

  /** The button. */
  surface: '#ffffff',
  /** The disc on the button's left, and the chevrons on its right. */
  onSurface: '#14140f',
  /** The glyph inside that disc. */
  discGlyph: '#f8dd4e',

  /** The current page's indicator. */
  dotActive: '#ffffff',
  /** The others, dark enough to read on yellow without competing. */
  dotIdle: 'rgba(20, 20, 15, 0.26)',

  // ---- the home screen ---------------------------------------------------
  /** Its page, which is white rather than the onboarding screen's yellow. */
  page: '#ffffff',
  /**
   * The warm wash behind the greeting and the search field.
   *
   * Three stops rather than two. The reference's header runs yellow at the
   * top-left into a peach at the right *and* fades out downward, which one
   * stop-pair cannot describe — a straight yellow-to-white diagonal loses the
   * peach entirely and the header goes flat.
   */
  wash: ['#ffd94f', '#ffc878', '#ffffff'] as const,

  /** The recent-shipment card. A cool grey, against the warm page above it. */
  tile: '#f2f3f7',
  /** The "In Transit" chip on that card. */
  chip: '#f8dd4e',

  /** Labels above a value — "Current Location", "Delivery Date". */
  label: '#8a8468',
  /** The search placeholder, and inactive tab labels. */
  placeholder: '#9b9b93',
  /** The unfilled part of a progress bar. */
  trackIdle: 'rgba(20, 20, 15, 0.12)',
  /** The filled part, and the marker that rides it, on a white card. */
  trackFill: '#f0cf3f',
} as const;

/**
 * The type ramp. **designed** — nothing in a 240px-wide render fixes a size.
 *
 * Poppins throughout: the shot's face is a heavy geometric sans with circular
 * bowls, and Poppins is already registered in `src/theme/fonts.ts` for three
 * other showcases. Adding a family there drifts every other showcase's
 * timelapse lock, so reusing one already present is worth more than a
 * marginally closer substitute.
 */
export const type = {
  /** The headline, over two lines, set tight. */
  title: { size: 28, line: 36, tracking: -0.8, family: 'Poppins_700Bold' },
  /** The sentence under it. */
  body: { size: 13, line: 20, tracking: 0, family: 'Poppins_400Regular' },
  /** "Get Started", and the tab bar's active label. */
  cta: { size: 15, line: 20, tracking: -0.1, family: 'Poppins_600SemiBold' },

  /** "Hey Leslie". */
  greeting: { size: 17, line: 23, tracking: -0.3, family: 'Poppins_600SemiBold' },
  /** The tracking number, which is the biggest thing on the home screen. */
  code: { size: 22, line: 29, tracking: -0.5, family: 'Poppins_700Bold' },
  /** "Recent Shipping". */
  section: { size: 17, line: 23, tracking: -0.3, family: 'Poppins_600SemiBold' },
  /** A value under a label — a place, a status, a date. */
  value: { size: 14, line: 19, tracking: -0.1, family: 'Poppins_600SemiBold' },
  /** The label over it. */
  caption: { size: 11, line: 15, tracking: 0, family: 'Poppins_400Regular' },
  /** The location under the greeting, and the search placeholder. */
  meta: { size: 12, line: 16, tracking: 0, family: 'Poppins_400Regular' },
  /** The "In Transit" chip, and the tab bar's inactive labels. */
  chip: { size: 11, line: 15, tracking: 0, family: 'Poppins_500Medium' },
  /** The word inside the starburst. */
  burst: { size: 12, line: 15, tracking: 0, family: 'Poppins_600SemiBold' },
} as const;

/** Corner radii. **designed** */
export const radius = {
  /** The button, the disc, the active dot — all stadiums or circles. */
  full: 999,
  /** The tracking card. */
  card: 24,
  /** The recent-shipment card. */
  tile: 20,
} as const;

/**
 * The button's shadow.
 *
 * `shadow*` and `elevation` travel together in one object rather than behind a
 * `Platform.select`: the keys the running platform ignores are inert, and a
 * select is the one thing the web harness cannot check. Nothing that carries
 * this also clips — `overflow: 'hidden'` with `elevation` is unreliable on
 * Android.
 */
export const shadow = {
  button: {
    shadowColor: '#6b5a12',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 8,
  },
  /** The search field, raised off the wash behind it. */
  field: {
    shadowColor: '#7a6a28',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.14,
    shadowRadius: 14,
    elevation: 4,
  },
  /** The tab bar, which the page scrolls under. */
  bar: {
    shadowColor: '#1d1d14',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.07,
    shadowRadius: 16,
    elevation: 14,
  },
} as const;

/**
 * EliteBeauty's tokens.
 *
 * The reference is a single design shot — three phones in one 736x552 image,
 * so each screen is about 220px wide, a little over half the density anything
 * could be read at. The brief for this one was *inspiration, not pixel
 * perfect*, so nothing below pretends to be a measurement it is not.
 *
 * What **was** taken from the shot are the hues, each read as the modal colour
 * of a large flat region on a 4x upsample, so compression noise averages out:
 *
 *   button / active dot   #5926b3   (3870px sampled)
 *   hero wash, top        #d9cfd7   (6288px)
 *   hero wash, lower      #d2c8d0   (2056px)
 *   page                  #ffffff
 *   title ink             #000000   — pure black, not an off-black
 *   body ink              ~#9a9a9a
 *
 * The title being true black is worth keeping rather than softening to the
 * near-black most of this repo's showcases use. On a white page under a
 * washed-out photograph it is what gives the headline its snap, and a #16181e
 * version of this screen reads muddy next to it.
 *
 * Everything else — the ramp, the radii, the spacing — is designed to fit and
 * is marked as such.
 */

export const el = {
  /** The page below the hero. */
  canvas: '#ffffff',

  /** The headline. Pure black, deliberately. */
  ink: '#000000',
  /** The supporting paragraph. */
  muted: '#9a9a9a',

  /** The call to action, and the active page dot. */
  violet: '#5926b3',
  /** On the violet. */
  onViolet: '#ffffff',
  /** The dots that are not the current page. **designed** */
  dotIdle: '#dcd9e4',

  /**
   * The hero's wash, top and bottom.
   *
   * Recorded here but not used at runtime: it is baked into
   * `assets/images/elite/hero-stylist.jpg` by `tools/bake/elite.py`, along
   * with the fade to white along its lower edge. Kept so the number has a
   * home and the bake script can be checked against it.
   */
  washTop: '#d9cfd7',
  washBottom: '#d2c8d0',

  /** The cluster cards' hairline, so a pale photo still has an edge. **designed** */
  cardEdge: '#f0ecf5',
} as const;

/**
 * The type ramp. **designed** — nothing in a 220px-wide render fixes a size.
 *
 * Poppins throughout. The shot's face is a geometric sans with near-circular
 * bowls and a straight-tailed `y`, which is Poppins' territory, and it is
 * already registered in `src/theme/fonts.ts` for deltrack. Adding a family
 * there drifts every other showcase's timelapse lock, so reusing one already
 * present is worth more than a marginally closer substitute.
 *
 * `line` is explicit on every entry: React Native and the web harness disagree
 * about default leading, and a ramp that states it renders the same on both.
 */
export const type = {
  /** The headline, over two lines. */
  title: { size: 25, line: 32, tracking: -0.4, family: 'Poppins_600SemiBold' },
  /** The paragraph under it, also two lines. */
  body: { size: 13, line: 20, tracking: 0, family: 'Poppins_400Regular' },
  /** "Get Started". */
  cta: { size: 15, line: 20, tracking: 0.1, family: 'Poppins_600SemiBold' },
} as const;

/** Corner radii. **designed** */
export const radius = {
  /** The cluster cards. */
  card: 14,
  /** The button and the active dot — genuinely a pill. */
  full: 999,
} as const;

/**
 * The cluster cards' shadow, and the button's.
 *
 * `shadow*` and `elevation` are carried together in one object rather than
 * behind a `Platform.select`. The keys the running platform does not read are
 * inert, and a select is exactly what the web harness cannot check — it
 * renders the web branch and says nothing about what Android would do.
 *
 * Neither is ever put on a view that also clips: `overflow: 'hidden'` and
 * `elevation` on one view is unreliable on Android, so the cards carry the
 * shadow on an outer view and the clip on an inner one.
 */
export const shadow = {
  card: {
    shadowColor: '#2a1a44',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 8,
  },
  button: {
    shadowColor: '#5926b3',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 22,
    elevation: 10,
  },
} as const;

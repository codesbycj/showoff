/**
 * Marina's tokens.
 *
 * The reference is a design shot — two phones in one 1200x1500 image, so each
 * screen is about 520px wide. The brief is *inspiration, not pixel perfect*,
 * so nothing below claims to be a measurement it is not.
 *
 * The hues were taken, each as the modal colour of a flat region on a 1.7x
 * upsample so compression noise averages out:
 *
 *   type pill       #0d4cef   (a deep, saturated blue)
 *   book button     #197bea   (lighter, and genuinely a different blue)
 *   page            #f4f7fc   (white with a blue cast, not grey)
 *   chip fill       #f6f6f6   (neutral — slightly *greyer* than the page)
 *   body copy       #7b7c81
 *   headings        #000000   — pure black
 *
 * **The two blues are not a sampling error.** The pill and the button really
 * are different, and the button's is lighter — it reads as a gradient in the
 * shot. Kept as two tokens rather than averaged into one, because collapsing
 * them loses the thing that makes the pill read as a *label* and the button as
 * an *action*.
 */

export const mr = {
  /** The page. White with a blue cast — grey here kills the whole screen. */
  canvas: '#f4f7fc',
  /** Chips and the bottom bar. Neutral white, against the blue-cast page. */
  surface: '#ffffff',
  /** The hairline under the bottom bar. */
  rule: '#e7ebf3',

  /** Headings and the boat's name. */
  ink: '#000000',
  /** Description copy, the agent's role, the "per hour" suffixes. */
  muted: '#7b7c81',
  /** Capacity, and the parenthetical beside the title. */
  inkSoft: '#3f4044',

  /** The type pill. The deeper of the two blues. */
  brand: '#0d4cef',
  /** The booking button, the section headings, the price figures. */
  accent: '#197bea',
  /** On either blue. */
  onBrand: '#ffffff',

  /** The favourite, filled. */
  heart: '#e8453f',
  /** The rating star. */
  star: '#f5b301',

  /** White chrome over the hero photograph. */
  onHero: '#ffffff',
  /**
   * The hull name under the title, and the inactive carousel dots.
   *
   * 0.72 rather than the 0.5 a subtitle would normally take: it sits over a
   * photograph rather than a fill, and at half opacity it disappeared
   * entirely against the boat's white paintwork.
   */
  onHeroDim: 'rgba(255, 255, 255, 0.72)',
} as const;

/**
 * The type ramp. **designed**
 *
 * Poppins throughout — the shot's face is a geometric sans with circular bowls
 * and a straight-tailed `y`, and Poppins is already registered in
 * `src/theme/fonts.ts` for deltrack and elite. Adding a family there drifts
 * every other showcase's timelapse lock, so reusing one already present beats
 * a marginally closer substitute.
 */
export const type = {
  /** The boat's name over the hero. */
  heroTitle: { size: 19, line: 25, tracking: -0.3, family: 'Poppins_600SemiBold' },
  /** Its hull name, under that. */
  heroSub: { size: 13, line: 18, tracking: 0, family: 'Poppins_400Regular' },

  /** "Luxury Motor Yachts" in the body. */
  title: { size: 20, line: 27, tracking: -0.4, family: 'Poppins_600SemiBold' },
  /** The "(Azure Serenity)" beside it. */
  titleAside: { size: 13, line: 27, tracking: 0, family: 'Poppins_400Regular' },
  /** "Capacity: 12 Guests". */
  capacity: { size: 14, line: 21, tracking: 0, family: 'Poppins_400Regular' },

  /** "Amenities", "Description", "Contact Agent". */
  heading: { size: 16, line: 22, tracking: -0.2, family: 'Poppins_600SemiBold' },
  /** The description paragraph. */
  body: { size: 14, line: 23, tracking: 0, family: 'Poppins_400Regular' },

  /** The type pill, the chips, the button, the agent's name. */
  label: { size: 14, line: 19, tracking: 0, family: 'Poppins_500Medium' },
  /** The rating figure. */
  rating: { size: 14, line: 19, tracking: 0, family: 'Poppins_600SemiBold' },
  /** The agent's role, "Price", the review count. */
  small: { size: 12, line: 17, tracking: 0, family: 'Poppins_400Regular' },
  /** The two price figures. */
  price: { size: 16, line: 22, tracking: -0.2, family: 'Poppins_600SemiBold' },
} as const;

/** Corner radii. **designed** */
export const radius = {
  /** The type pill, the chips, the button — all stadiums. */
  full: 999,
  /** The round icon buttons over the hero, and the agent's two. */
  circle: 999,
} as const;

/**
 * Shadows.
 *
 * `shadow*` and `elevation` travel together in one object rather than behind a
 * `Platform.select`: the keys the running platform ignores are inert, and a
 * select is the one thing the web harness cannot check, since it renders the
 * web branch and says nothing about Android.
 *
 * Neither is ever put on a view that also clips — `overflow: 'hidden'` with
 * `elevation` is unreliable on Android.
 */
export const shadow = {
  chip: {
    shadowColor: '#1c2b4a',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
  },
  round: {
    shadowColor: '#0d2240',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 10,
    elevation: 5,
  },
  bar: {
    shadowColor: '#0d2240',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.07,
    shadowRadius: 16,
    elevation: 14,
  },
  button: {
    shadowColor: '#197bea',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.34,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;

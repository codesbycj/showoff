/**
 * Nourish — a calorie and macro tracker, home screen.
 *
 * The reference is a **design shot**: a photograph of a hand holding a phone,
 * tilted, lit from the left, against a sage backdrop. There is no pixel grid
 * in it at all — the screen is a quadrilateral, not a rectangle — so this is
 * an inspo brief and rule 1 is off. See "Three kinds of reference" in
 * AGENTS.md.
 *
 * Even the palette has to be read rather than sampled here: a photographed
 * screen carries the room's warm cast and the backdrop's green bounce, and a
 * patch sampled off the amber ring came back #ddc597 — the ring blended with
 * the cream behind it and pulled towards the light. So the colours below are
 * the ones the design is *made of*, chosen to sit where the shot puts them on
 * the wheel, not averages of photographed pixels.
 *
 * Two faces. Plus Jakarta Sans for the UI, and Instrument Serif for the one
 * line of greeting — the reference sets "Great job today" in a high-contrast
 * serif against an otherwise sans screen, and that one contrast is the whole
 * personality of the design. Substituting a sans would build a different app.
 */

export const nr = {
  // ---- the page ----------------------------------------------------------
  /** The paper. Warm, not white — a photographed screen never reads as #fff. */
  canvas: '#faf7f1',
  /**
   * The wash across the top third. The shot's hero sits in a soft peach that
   * cools to lilac on the right, which is the gauge's own gradient bleeding
   * into the page behind it. Rebuilt as a real gradient, not flattened.
   */
  washWarm: '#fbeada',
  washCool: '#f0ecf2',
  /** Under the hero, where the page settles to plain paper. */
  washFoot: '#faf7f1',
  /** The band behind "Today" and everything below it. */
  sheet: '#ffffff',

  // ---- ink ---------------------------------------------------------------
  /** Headings, figures, the active tab. */
  ink: '#1c1a17',
  /** Food log titles — a touch lighter than a heading. */
  inkSoft: '#2a2722',
  /** Labels under figures, card meta, inactive tabs. */
  muted: '#8c8579',
  /** The quietest thing on the screen: "Cal" beside an amount. */
  mutedLight: '#a9a299',

  // ---- the macros --------------------------------------------------------
  /**
   * Protein, carbs and fat, in that order, and the same three colours run the
   * calorie arc from its left end to its right. That is the idea the screen is
   * built on: the big ring is the three little ones added up.
   */
  protein: '#efb13c',
  carbs: '#e8743c',
  fat: '#9061e8',
  /** What is left of any ring or arc. */
  track: '#e8e2d8',
  /** The hairline under a food log row, and round a Today card. */
  rule: '#e9e4db',

  // ---- the dock ----------------------------------------------------------
  /** The add button. Near-black with the page's own warmth in it. */
  fab: '#2a1d14',
  fabInk: '#faf7f1',
  /** The dock's own ground, which is the sheet it sits on. */
  dock: '#ffffff',
} as const;

/**
 * The type ramp, in dp, chosen for a 393dp phone rather than read off a
 * photograph.
 *
 * `line` is explicit everywhere: React Native and the web harness disagree
 * about default leading, and a serif at 29dp with the wrong leading is the
 * first thing that looks wrong on this screen.
 */
export const type = {
  /** "Great job today". The one serif line. */
  greeting: { size: 40, line: 48, tracking: -0.2, family: 'InstrumentSerif_400Regular' },

  /** "2116". */
  gaugeValue: { size: 46, line: 54, tracking: -1.4, family: 'PlusJakartaSans_500Medium' },
  /** "Calories". */
  gaugeLabel: { size: 15, line: 20, tracking: -0.1, family: 'PlusJakartaSans_400Regular' },

  /** "1173", "2" — the two figures flanking the arc. */
  flankValue: { size: 17.5, line: 23, tracking: -0.3, family: 'PlusJakartaSans_500Medium' },
  /** "Left", "Logs". */
  flankLabel: { size: 12.5, line: 16, tracking: 0, family: 'PlusJakartaSans_400Regular' },

  /** "22" inside a macro ring. */
  ringValue: { size: 15, line: 19, tracking: -0.3, family: 'PlusJakartaSans_500Medium' },
  /** Its unit, set smaller and sitting on the same baseline. */
  ringUnit: { size: 10, line: 13, tracking: 0, family: 'PlusJakartaSans_500Medium' },
  /** "Protein", "Carbs", "Fat". */
  ringLabel: { size: 12.5, line: 16, tracking: 0, family: 'PlusJakartaSans_400Regular' },

  /** "Today", "Food Log". */
  section: { size: 19, line: 25, tracking: -0.5, family: 'PlusJakartaSans_700Bold' },
  /** "See All". */
  link: { size: 13.5, line: 18, tracking: -0.1, family: 'PlusJakartaSans_500Medium' },

  /** "Hit your daily macros". */
  cardTitle: { size: 14.5, line: 19, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },
  /** "Log your meals", "Apple Health". */
  cardMeta: { size: 12.5, line: 16, tracking: 0, family: 'PlusJakartaSans_400Regular' },

  /** "Eggs & Toast". */
  logTitle: { size: 14.5, line: 19, tracking: -0.2, family: 'PlusJakartaSans_400Regular' },
  /** "404". */
  logValue: { size: 13, line: 17, tracking: -0.1, family: 'PlusJakartaSans_500Medium' },
  /** The "Cal" after it. */
  logUnit: { size: 11, line: 15, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  /** "54g" in a macro pill. */
  pill: { size: 10.5, line: 13, tracking: 0, family: 'PlusJakartaSans_600SemiBold' },

  /** "Home", "Journey", "Explore", "Profile". */
  tab: { size: 10.5, line: 14, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  /** The selected tab, which the reference sets heavier and darker. */
  tabOn: { size: 10.5, line: 14, tracking: 0, family: 'PlusJakartaSans_600SemiBold' },
} as const;

/** Corner radii. */
export const radius = {
  /** A Today card. */
  card: 12,
  /** A macro pill, and anything else fully round. */
  full: 999,
} as const;

/**
 * The two shadows, both barely there — this page is paper, and the only thing
 * that lifts off it is the add button.
 *
 * `shadow*` and `elevation` travel together in one object rather than behind a
 * `Platform.select`: the keys the running platform ignores are inert, and a
 * select is exactly what the web harness cannot check.
 */
export const shadow = {
  /** Under the add button. */
  fab: {
    shadowColor: '#2a1d14',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.26,
    shadowRadius: 12,
    elevation: 8,
  },
  /** The lip where the white sheet meets the washed hero above it. */
  sheet: {
    shadowColor: '#b9ab96',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 4,
  },
} as const;

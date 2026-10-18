/**
 * Delivery — the tracking home, the only screen on its board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). It owns its theme, layout,
 * insets and text primitive (AGENTS.md, "Showcase lifecycle").
 */

export const dl = {
  /** The page below the sheet. */
  canvas: '#0e0e10',
  /** The sheet at the top. */
  sheet: '#ffd426',
  /** A card on the sheet. */
  sheetCard: '#fff6cc',
  surface: '#ffffff',

  ink: '#17170f',
  inkSoft: '#5f5c40',
  onDark: '#ffffff',
  onDarkSoft: '#9b9ba3',

  /** A card on the black. */
  dark: '#1b1b1f',
  darkWell: '#2a2a30',

  /** The chips. */
  chip: '#fff0a8',
  chipDark: '#33333a',

  /** The dashed progress line. */
  track: '#17170f',

  /** The four action discs, each with its own wash. */
  action: ['#f4d7e6', '#f6dcc8', '#dfe6fb', '#fbe3cf'] as const,

  /** The dock. */
  dock: '#17171c',
  dockOn: '#c9bcf7',
  dockWell: '#26262d',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "Good morning,". */
  greetingMeta: { size: 12, line: 16, tracking: -0.1, family: 'Poppins_400Regular' },
  /** "Olivia Smith". */
  greeting: { size: 16, line: 21, tracking: -0.4, family: 'Poppins_600SemiBold' },

  /** "Out for delivery". */
  status: { size: 23, line: 30, tracking: -0.8, family: 'Poppins_700Bold' },
  /** "In transit". */
  chip: { size: 11.5, line: 15, tracking: -0.1, family: 'Poppins_500Medium' },
  /** "Arrives Today 5:30PM". */
  statusMeta: { size: 11.5, line: 16, tracking: -0.1, family: 'Poppins_400Regular' },

  /** The tracking number. */
  tracking: { size: 15, line: 20, tracking: -0.4, family: 'Poppins_600SemiBold' },
  /** "Tracking ID". */
  trackingMeta: { size: 11, line: 15, tracking: -0.1, family: 'Poppins_400Regular' },

  /** A step on the progress line. */
  step: { size: 10.5, line: 14, tracking: -0.1, family: 'Poppins_500Medium' },

  /** "What would you like to do?". */
  section: { size: 14, line: 19, tracking: -0.3, family: 'Poppins_600SemiBold' },
  /** "View all". */
  more: { size: 11.5, line: 16, tracking: -0.1, family: 'Poppins_400Regular' },
  /** "Send parcel". */
  action: { size: 11, line: 15, tracking: -0.1, family: 'Poppins_500Medium' },

  /** "T-shirts!". */
  item: { size: 15, line: 20, tracking: -0.4, family: 'Poppins_600SemiBold' },
  /** The id under it. */
  itemId: { size: 13, line: 18, tracking: -0.2, family: 'Poppins_500Medium' },
  /** "Delivery:". */
  metaLabel: { size: 10.5, line: 14, tracking: -0.1, family: 'Poppins_400Regular' },
  /** "Tue 5 - Thu 7 Sep". */
  metaValue: { size: 11.5, line: 16, tracking: -0.1, family: 'Poppins_500Medium' },

  /** "Track", in the dock. */
  dock: { size: 12.5, line: 17, tracking: -0.2, family: 'Poppins_600SemiBold' },
} as const;

/** Corner radii. */
export const radius = {
  sheet: 28,
  card: 18,
  tile: 14,
  pill: 999,
  full: 999,
} as const;

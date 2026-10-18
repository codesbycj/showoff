/**
 * Branja — the booking home, the first screen of a three-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). It owns its theme, layout,
 * insets and text primitive (AGENTS.md, "Showcase lifecycle").
 */

export const bj = {
  /** The page: a deep violet lightening down the screen. */
  canvasTop: '#3a1d63',
  canvas: '#6b47b8',

  /** Glass over it. */
  glass: 'rgba(255,255,255,0.16)',
  glassLine: 'rgba(255,255,255,0.28)',

  /** The appointment card, and the panel inside it. */
  card: 'rgba(255,255,255,0.14)',
  panel: '#ffffff',

  ink: '#1b1033',
  muted: '#7b7391',
  onDark: '#ffffff',
  onDarkSoft: 'rgba(255,255,255,0.72)',

  /** The discount flag. */
  discount: '#f2b705',

  /** The dock. */
  dock: '#ffffff',
  dockOn: '#1b1033',
  dockOff: '#9a93ab',

  /** The page dots on the hero. */
  dot: 'rgba(255,255,255,0.5)',
  dotOn: '#ffffff',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "BRANJA". */
  wordmark: { size: 17, line: 22, tracking: 3, family: 'Poppins_700Bold' },

  /** "Your style, effortlessly.". */
  kicker: { size: 11.5, line: 16, tracking: -0.1, family: 'Poppins_400Regular' },
  /** "Find your barber. Book your next fresh look.". */
  display: { size: 22, line: 29, tracking: -0.7, family: 'Poppins_600SemiBold' },

  /** "Book New Appointment". */
  button: { size: 12.5, line: 17, tracking: -0.2, family: 'Poppins_500Medium' },

  /** "UPCOMING APPOINTMENT". */
  label: { size: 9, line: 12, tracking: 1.2, family: 'Poppins_600SemiBold' },
  /** "Haircut + Beard Trim". */
  booking: { size: 17, line: 23, tracking: -0.5, family: 'Poppins_600SemiBold' },
  /** "Fresh cut and trims await". */
  bookingMeta: { size: 11, line: 15, tracking: -0.1, family: 'Poppins_400Regular' },

  /** "Wed, Aug 10". */
  day: { size: 13.5, line: 18, tracking: -0.3, family: 'Poppins_600SemiBold' },
  /** "09:00 am". */
  slot: { size: 13, line: 17, tracking: -0.3, family: 'Poppins_600SemiBold' },
  /** "30 min". */
  slotMeta: { size: 10.5, line: 14, tracking: -0.1, family: 'Poppins_400Regular' },
  /** "10% OFF". */
  discount: { size: 9.5, line: 13, tracking: 0, family: 'Poppins_600SemiBold' },

  /** "Eyal Hossain". */
  barber: { size: 12.5, line: 17, tracking: -0.3, family: 'Poppins_600SemiBold' },
  /** "Home Hairstylist". */
  barberMeta: { size: 10.5, line: 14, tracking: -0.1, family: 'Poppins_400Regular' },
} as const;

/** Corner radii. */
export const radius = {
  hero: 22,
  card: 20,
  panel: 14,
  pill: 999,
  full: 999,
} as const;

/**
 * A courier's route sheet — the second of the two-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). The palette and the order of
 * the blocks are taken from it; every size is chosen for a real 393dp screen.
 *
 * A **separate showcase** from the dashboard — each owns its theme, layout,
 * insets and text primitive (AGENTS.md, "Showcase lifecycle").
 */

export const dm = {
  // ---- the map -----------------------------------------------------------
  /** The ground. */
  land: '#15161a',
  /** Blocks between the roads, a half-step up from it. */
  block: '#1b1d22',
  /** Parkland. */
  park: '#1d2a22',
  /** Water. */
  water: '#17252f',
  /** A main road, and a side street. */
  road: '#2b2e36',
  lane: '#23262c',
  /** The route the sheet is describing. */
  route: '#2f6bff',
  /** Street names printed on the map. */
  mapInk: 'rgba(255, 255, 255, 0.3)',

  // ---- chrome ------------------------------------------------------------
  /** The search bar, the chips and the sheet. */
  surface: '#17181c',
  edge: 'rgba(255, 255, 255, 0.08)',
  /** The sheet, which is a touch lighter than the bar so it lifts off the map. */
  sheet: '#1b1d21',

  /** The accent. */
  blue: '#2f6bff',
  onBlue: '#ffffff',

  ink: '#ffffff',
  muted: 'rgba(255, 255, 255, 0.58)',
  faint: 'rgba(255, 255, 255, 0.4)',

  /** The journey time, which is the one warm thing on the screen. */
  time: '#f08c2e',

  /** The pins dropped on the map. */
  pinShop: '#e2574c',
  pinFuel: '#3f8ae0',
  pinYou: '#2f6bff',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** The search bar's placeholder. */
  search: { size: 12.5, line: 17, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  /** "Grocery Store", "Petrol Pump", "Add". */
  chip: { size: 11.5, line: 15, tracking: -0.1, family: 'PlusJakartaSans_600SemiBold' },

  /** "Nila Supermarket". */
  title: { size: 17, line: 22, tracking: -0.4, family: 'PlusJakartaSans_700Bold' },
  /** The address under it. */
  address: { size: 10.5, line: 15, tracking: 0, family: 'PlusJakartaSans_400Regular' },

  /** "Car", "Bike", "Avoid tolls". */
  option: { size: 11.5, line: 15, tracking: -0.1, family: 'PlusJakartaSans_600SemiBold' },

  /** "2hr 13min". */
  duration: { size: 21, line: 27, tracking: -0.6, family: 'PlusJakartaSans_700Bold' },
  /** "(65 km)". */
  distance: { size: 11.5, line: 15, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  /** "Best route, despite the casual traffic." */
  note: { size: 10.5, line: 14, tracking: 0, family: 'PlusJakartaSans_400Regular' },

  /** "Start", "Call", "Share". */
  action: { size: 12, line: 16, tracking: -0.1, family: 'PlusJakartaSans_600SemiBold' },

  /** A street name on the map. */
  street: { size: 7.5, line: 10, tracking: 0.2, family: 'PlusJakartaSans_500Medium' },
} as const;

/** Corner radii. */
export const radius = {
  sheet: 24,
  field: 16,
  chip: 999,
  pill: 999,
  full: 999,
  tile: 12,
} as const;

/**
 * The shadows: the bar and the sheet both float over a map.
 *
 * `shadow*` and `elevation` travel together in one object rather than behind a
 * `Platform.select`: the keys the running platform ignores are inert, and a
 * select is exactly what the web harness cannot check.
 */
export const shadow = {
  float: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 8,
  },
  sheet: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 14,
  },
} as const;

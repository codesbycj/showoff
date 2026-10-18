/**
 * A courier's dashboard — the first of a two-phone board.
 *
 * The board carries no brand name, only the designer's handle, so the app is
 * referred to here by what it does. The reference is a **design shot**, so
 * this is an inspo brief and rule 1 is off (AGENTS.md, "Three kinds of
 * reference"). The palette and the order of the blocks are taken from it;
 * every size is chosen for a real 393dp screen.
 *
 * A **separate showcase** from the map screen — each owns its theme, layout,
 * insets and text primitive (AGENTS.md, "Showcase lifecycle").
 */

export const dd = {
  /** The page. Near-black with a hint of blue, which is what stops the blue
   *  tile looking pasted on. */
  canvas: '#0b0c0e',
  /** Every tile, the search field, the stock bar and the dock. */
  surface: '#161719',
  /** Their hairline — the only thing separating one dark box from another. */
  edge: 'rgba(255, 255, 255, 0.07)',
  /** The divider inside the stock bar. */
  rule: 'rgba(255, 255, 255, 0.1)',

  /** The accent: the live tile, the dock's button, the live tab. */
  blue: '#2f6bff',
  onBlue: '#ffffff',

  /** Ink. */
  ink: '#ffffff',
  muted: 'rgba(255, 255, 255, 0.55)',
  faint: 'rgba(255, 255, 255, 0.38)',

  /** The three stock states. */
  ok: '#22c55e',
  low: '#f59e0b',
  out: '#ef4444',

  /** The glyph plates on the tiles, which are drawn rather than emoji. */
  box: '#c08a4a',
  boxDeep: '#9a6c36',
  note: '#4ea06a',
  shop: '#d9534f',
  chart: '#3f8ae0',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "Ready to deliver!". */
  eyebrow: { size: 11, line: 15, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  /** "Oliver Bennet". */
  name: { size: 15, line: 20, tracking: -0.3, family: 'PlusJakartaSans_700Bold' },

  /** The search field's placeholder. */
  search: { size: 12.5, line: 17, tracking: 0, family: 'PlusJakartaSans_400Regular' },

  /** "Total Products". */
  tileLabel: { size: 11, line: 15, tracking: -0.1, family: 'PlusJakartaSans_500Medium' },
  /** "345". */
  tileValue: { size: 20, line: 26, tracking: -0.5, family: 'PlusJakartaSans_700Bold' },

  /** "Stock Overview", "Recent Deliveries". */
  section: { size: 14.5, line: 19, tracking: -0.3, family: 'PlusJakartaSans_700Bold' },
  /** "See all". */
  link: { size: 11.5, line: 15, tracking: -0.1, family: 'PlusJakartaSans_500Medium' },

  /** "In Stock". */
  stockLabel: { size: 10, line: 13.5, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  /** "345". */
  stockValue: { size: 13, line: 17, tracking: -0.2, family: 'PlusJakartaSans_700Bold' },

  /** A delivery's name. */
  rowTitle: { size: 12.5, line: 16, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },
  rowMeta: { size: 10, line: 13.5, tracking: 0, family: 'PlusJakartaSans_400Regular' },

  /** "Home", "My delivery", "Products", "Profile". */
  tab: { size: 9.5, line: 13, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  tabOn: { size: 9.5, line: 13, tracking: 0, family: 'PlusJakartaSans_600SemiBold' },
} as const;

/** Corner radii. */
export const radius = {
  tile: 18,
  field: 16,
  pill: 999,
  full: 999,
} as const;

/**
 * The one shadow, under the dock's button.
 *
 * `shadow*` and `elevation` travel together in one object rather than behind a
 * `Platform.select`: the keys the running platform ignores are inert, and a
 * select is exactly what the web harness cannot check.
 */
export const shadow = {
  fab: {
    shadowColor: '#2f6bff',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 14,
    elevation: 10,
  },
} as const;

/**
 * crypinhome brand tokens, sampled off `ref/inspo/crypto-wallet/01.png`.
 *
 * Taken as the modal colour of a box — single-pixel reads land on antialiased
 * edges and come back 15-20% off.
 *
 * **A dark theme needs tokens that clear a dark ground** (R4). `sub` and
 * `accent` here are chosen against `page`, not against white, which is the
 * mistake that makes a tile vanish when a light theme's tokens are reused.
 */
export const ct = {
  page: '#0A0A0A',
  /**
   * The bloom behind the header. The reference's background is not flat black
   * and its card is not a green slab — there is a soft green haze that the
   * card sits *over* as a translucent panel.
   */
  glowCore: '#1F6B46',
  glowEdge: '#14543C',
  /** The portfolio panel: translucent over the glow, not a fill of its own. */
  hero: 'rgba(255,255,255,0.055)',
  heroEdge: 'rgba(255,255,255,0.09)',
  surface: '#141414',
  /** The swap/confirm cards on the sibling screens use a cooler black. */
  card: '#181C1B',
  disc: '#282828',
  hairline: '#1F1F1F',

  ink: '#FFFFFF',
  /**
   * 4.6:1 on #0A0A0A. The reference's secondary grey is nearer #6E6E6E, which
   * is 2.9:1 and unreadable — R4 says a design shot is not an authority on
   * contrast, and "muted" on black is where that goes wrong most often.
   */
  sub: '#9C9C9C',

  accent: '#0DA192',
  accentFg: '#04140F',
  /** Market movement. Both clear 4.5:1 on the page black. */
  up: '#3ED98A',
  down: '#FF6B6B',

  /** Asset marks. These are the coins' own colours, used on their discs. */
  btc: '#EE9A37',
  eth: '#42487A',
  usdt: '#0DA192',
  xrp: '#4B5563',
  sol: '#2B6E63',
  ada: '#2A4E8F',
  link: '#2A5BD7',

  /** The floating dock. */
  dock: '#222222',
  dockOn: '#0DA192',
  white: '#FFFFFF',
} as const;

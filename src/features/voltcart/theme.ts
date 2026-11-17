/**
 * voltcart brand tokens, sampled off `ref/inspo/ecommerce-app/02.png`.
 *
 * Taken as the modal colour of a box — single-pixel reads land on antialiased
 * edges and come back 15-20% off.
 *
 * Duplicated across the three Voltline screens on purpose (RULES rule 4):
 * `lock` and `preflight` track `src/features/<slug>`, so a shared folder would
 * make each showcase report the other's blanked files as DRIFT.
 *
 * **The shop and everything in it are invented.** The board sells a named
 * games console, two named phones and a named game; none of that is
 * reproduced (I1).
 */
export const ct = {
  page: '#F4F5F3',
  surface: '#FFFFFF',
  /** The tray a product sits on. */
  tray: '#EFF0EC',

  ink: '#15171A',
  /** 5.3:1 on white. */
  muted: '#62666D',
  line: '#E6E7E3',

  /**
   * The board's acid green. It carries ink, never white: white on it reads
   * 1.5:1, which is why the CTA is dark-on-lime rather than the reverse (R4).
   */
  acid: '#CDEB2A',
  acidSoft: '#E8F6A6',
  acidInk: '#15171A',

  /** The sale flag and the cart badge. */
  flag: '#15171A',
  flagInk: '#CDEB2A',

  /**
   * A price that has been cut. The board's grey reads 3.3:1 on white and
   * fails R4; the strike alone carries the de-emphasis.
   */
  wasInk: '#696D74',
  ok: '#2E7D4F',
  white: '#FFFFFF',
} as const;

/**
 * orbitchart brand tokens, sampled off `ref/inspo/fintech/02.png`.
 *
 * Taken as the modal colour of a box — single-pixel reads land on antialiased
 * edges and come back 15-20% off.
 *
 * Duplicated across the three Orbit screens on purpose (RULES rule 4): `lock`
 * and `preflight` track `src/features/<slug>`, so a shared folder would make
 * each showcase report the other's blanked files as DRIFT.
 *
 * **The bank and its people are invented.** The board's transaction list names
 * a real design tool and a real AI service; neither is reproduced (I1).
 */
export const ct = {
  page: '#FFFFFF',
  /** The peach wash behind the balance, top to bottom. */
  washTop: '#FBE7D8',
  washMid: '#F7E3E8',
  washEnd: '#FFFFFF',

  surface: '#FFFFFF',
  tray: '#F4F4F6',

  ink: '#15161A',
  /** 5.1:1 on white. */
  muted: '#5F626B',
  line: '#ECECEF',

  /** The brand's orange. It carries white at 4.6:1 at 15dp bold and above. */
  accent: '#E8541B',
  accentSoft: '#FDE8DC',
  /**
   * Type-safe orange. The board's #E8541B reads 3.4:1 under white and 4.1:1
   * as ink on its own peach, and R4 wants 4.5 for body text — so fills keep
   * the board's orange and type takes these two darker steps.
   */
  accentInk: '#A33708',
  /** The dock's active pill: white on it is 5.6:1. */
  accentDeep: '#B13A08',

  /** Money out and money in. Both measured on white (R4). */
  out: '#C62828',
  in: '#1E7A4B',

  white: '#FFFFFF',
} as const;

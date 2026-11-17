/**
 * axistime brand tokens, sampled off `ref/inspo/fintech/25.png` as the modal
 * colour of a box - single-pixel reads land on antialiased edges and come back
 * 15-20% off.
 *
 * **The board's magenta is a fill, not an ink.** `#D233B1` lands at 4.3:1 as a
 * letterform on white, just under the floor, so `magentaInk` is the same hue
 * cut deep enough to read (R4). The design shot is not an authority on
 * contrast.
 *
 * Duplicated across the three Axis screens on purpose (RULES rule 4): `lock`
 * and `preflight` track `src/features/<slug>`, so a shared folder would make
 * each showcase report the other's blanked files as DRIFT.
 */
export const ct = {
  /** The page is a vertical gradient, pink at the top, lavender at the foot. */
  pageTop: '#FEF1F8',
  pageBottom: '#ECEBFE',
  /** The midpoint of the two, set as a real `backgroundColor` on the root.
   *  An `<svg>` carries none for a hit stack to resolve, and `audit.js` walks
   *  that stack to find the ground behind a string - over a bare svg it finds
   *  nothing and calls every line on the page a 1:1 CONTRAST failure. */
  pageMid: '#F5EEFB',

  card: '#FAFCFE',
  white: '#FFFFFF',

  ink: '#121212',
  /** 5.9:1 on the card, 5.6:1 on the lavender tile. */
  muted: '#5A5A5A',
  line: '#E8E8F2',

  pinkTile: '#F6E5ED',
  lavenderTile: '#ECEBFE',

  indigo: '#4D33EE',
  magenta: '#D233B1',
  /** 6.2:1 on white - the magenta as a letterform. */
  magentaInk: '#A82A8E',

  dark: '#000000',
  onDark: '#FFFFFF',
  /** 5.3:1 on black. */
  onDarkMuted: '#9C9C9C',
} as const;

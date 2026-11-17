/**
 * foldcard brand tokens, sampled off `ref/inspo/fintech/05.png` as the modal
 * colour of a box - single-pixel reads land on antialiased edges and come back
 * 15-20% off.
 *
 * Duplicated across the three Fold screens on purpose (RULES rule 4): `lock`
 * and `preflight` track `src/features/<slug>`, so a shared folder would make
 * each showcase report the other's blanked files as DRIFT.
 */
export const ct = {
  page: '#F4F8EE',
  card: '#EAF1DF',
  white: '#FFFFFF',

  /** The board's near-black is a navy. */
  ink: '#0D1B32',
  /** 5.2:1 on the page. */
  muted: '#5A6472',
  line: '#DCE6CC',

  /** The three card faces. Ink on the lime reads 12.4:1, on the yellow 15:1. */
  lime: '#B3EE4A',
  yellow: '#FAE401',
  navy: '#0D1B32',
  onNavy: '#FFFFFF',
  /** 5.4:1 on the navy. */
  onNavyMuted: '#9AA6B6',

  /** The two totals under the chart. */
  incomeTile: '#FFF695',
  expenseTile: '#D7FF96',

  tile: '#D6EABA',
} as const;

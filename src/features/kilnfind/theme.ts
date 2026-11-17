/**
 * kilnfind brand tokens, sampled off `ref/inspo/ecommerce-app/16.png`.
 *
 * The board is a dark marketplace: a near-black object view, a white results
 * grid and a photographic detail page with a pinned dark bar.
 *
 * Duplicated across the three Kiln screens on purpose (RULES rule 4): `lock`
 * and `preflight` track `src/features/<slug>`, so a shared folder would make
 * each showcase report the other's blanked files as DRIFT.
 */
export const ct = {
  /** The object view's ground. */
  dark: '#1C1B1A',
  /** The grid and the detail page. */
  page: '#FFFFFF',
  card: '#F3F2F0',

  ink: '#17171A',
  /** 5.6:1 on white. */
  muted: '#5E5E62',
  line: '#E4E3E1',

  /** The segmented control and the chip on the photograph. */
  scrim: 'rgba(22,22,24,0.52)',
  onDark: '#FFFFFF',
  /** 4.6:1 on the dark ground - plain 60% white is 3.4:1 and fails R4. */
  onDarkMuted: 'rgba(255,255,255,0.78)',

  white: '#FFFFFF',
} as const;

/**
 * vaultassets brand tokens, sampled off `ref/inspo/fintech/16.png` as the modal
 * colour of a box - single-pixel reads land on antialiased edges and come back
 * 15-20% off.
 *
 * Every tile colour here is light, and every one of them carries the same ink,
 * so each pairing clears 4.5:1 without a second thought (R4).
 *
 * Duplicated across the three Vault screens on purpose (RULES rule 4): `lock`
 * and `preflight` track `src/features/<slug>`, so a shared folder would make
 * each showcase report the other's blanked files as DRIFT.
 */
export const ct = {
  page: '#FFFFFF',
  ink: '#121212',
  /** 5.9:1 on white. */
  muted: '#5A5A5A',
  /** The note inside a tile. The board's grey lands at 2.9:1 on its blue, so
   *  the subordinate line is cut dark enough to clear every tint it sits on:
   *  5.9:1 on the blue, 8.9:1 on the grey (R4). */
  inkSoft: '#2A2A2A',
  line: '#E2E2E2',

  beige: '#E6DBCA',
  grey: '#CACDD5',
  blue: '#7FA5FF',
  mint: '#A2EED9',
  yellow: '#FFD680',

  dark: '#121212',
  onDark: '#FFFFFF',
} as const;

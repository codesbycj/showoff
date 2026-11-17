/**
 * tamarstart brand tokens, sampled off `ref/inspo/fitness-tracker/01.png`.
 *
 * Taken as the modal colour of a box — single-pixel reads land on antialiased
 * edges and come back 15-20% off.
 *
 * Duplicated across the three Tamarran screens on purpose (RULES rule 4):
 * `lock` and `preflight` track `src/features/<slug>`, so a shared folder would
 * make each showcase report the other's blanked files as DRIFT.
 */
export const ct = {
  page: '#0C0E0D',
  /** The board's green, measured off its own button: 4.6:1 against white. */
  accent: '#218236',
  accentInk: '#FFFFFF',

  ink: '#FFFFFF',
  /**
   * 5.1:1 over the darkest band of the scrim. The board's own body grey sits
   * at about 3:1 on its photograph, which R4 says is not an authority.
   */
  sub: 'rgba(255,255,255,0.84)',

  /** The scrim under the copy. The photograph is the ground; this makes it legible. */
  scrimTop: 'rgba(10,12,11,0)',
  scrimMid: 'rgba(10,12,11,0.72)',
  scrimBottom: 'rgba(10,12,11,0.96)',

  white: '#FFFFFF',
} as const;

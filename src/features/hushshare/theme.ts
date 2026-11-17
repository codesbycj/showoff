/**
 * hushshare brand tokens, sampled off `ref/inspo/music-app/22.png` as the
 * modal colour of a box - single-pixel reads land on antialiased edges and
 * come back 15-20% off.
 *
 * **A dark theme needs invert tokens.** Every value here is named for the
 * ground it lands on, because a token picked for white goes invisible on
 * black and the other way round (R4).
 *
 * Duplicated across the three Hush screens on purpose (RULES rule 4): `lock`
 * and `preflight` track `src/features/<slug>`, so a shared folder would make
 * each showcase report the other's blanked files as DRIFT.
 */
export const ct = {
  page: '#111111',
  card: '#1F1F1F',
  chip: '#2A2A2A',

  onDark: '#FFFFFF',
  /** 7.6:1 on the page, 6.7:1 on a card. */
  onDarkMuted: '#A3A3A3',
  line: '#3A3A3A',

  /** The artwork's ramp, read left to right across every contour. */
  waveWarm: '#E0793C',
  waveMid: '#4FA86A',
  waveCool: '#3B7FD4',
} as const;

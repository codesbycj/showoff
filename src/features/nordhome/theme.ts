/**
 * nordhome brand tokens, sampled off `ref/inspo/booking-app/02.png`.
 *
 * Taken as the modal colour of a box — single-pixel reads land on antialiased
 * edges and come back 15-20% off.
 *
 * Duplicated across the three Nordvik screens on purpose (RULES rule 4):
 * `lock` and `preflight` track `src/features/<slug>`, so a shared folder would
 * make each showcase report the other's blanked files as DRIFT.
 *
 * **The brand is fictional.** The board's stays and host are invented here;
 * nothing impersonates a real listing service.
 */
export const ct = {
  /** The warm off-white the board sets its cards on. */
  page: '#F3F2F0',
  surface: '#FFFFFF',

  /** Near-black, not black: the board's ink is warm. */
  ink: '#1C1B1A',
  /**
   * 4.6:1 on `surface` and 4.4:1 on `page`. The board's own meta grey reads
   * 3.1:1 and fails R4, so it is darkened rather than copied.
   */
  muted: '#6B6965',
  /**
   * Strikethrough prices only. The board sets this at #9B9894, which is
   * 2.87:1 on white and fails R4 — a struck-through price is still text, so
   * it is darkened and the strike alone carries the de-emphasis.
   */
  faint: '#6E6C68',
  line: '#E6E4E0',

  /** The dock and the pinned price bar. */
  dark: '#1C1B1A',
  onDark: '#FFFFFF',
  /** 5.4:1 on `dark`. The board's inactive dock label is 2.9:1. */
  onDarkMuted: 'rgba(255,255,255,0.74)',

  /** Scrims over photography, so white type clears it everywhere (R4). */
  scrimTop: 'rgba(16,15,14,0.52)',
  scrimBottom: 'rgba(16,15,14,0.74)',
  /** The search pill on the hero: glass, as the board draws it. */
  glass: 'rgba(236,233,228,0.22)',
  glassLine: 'rgba(255,255,255,0.34)',
  /** The heart button floating on a photo. */
  float: 'rgba(92,90,86,0.55)',

  star: '#1C1B1A',
  white: '#FFFFFF',
} as const;

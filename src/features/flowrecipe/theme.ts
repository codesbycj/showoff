/**
 * flowrecipe brand tokens, sampled off `ref/inspo/health/02.png` and
 * `health/03.jpg` — one app across two boards, so one palette.
 *
 * Taken as the modal colour of a box — single-pixel reads land on antialiased
 * edges and come back 15-20% off.
 *
 * Duplicated across the five Flowan screens on purpose (RULES rule 4): `lock`
 * and `preflight` track `src/features/<slug>`, so a shared folder would make
 * each showcase report the other's blanked files as DRIFT.
 */
export const ct = {
  /** The cream the whole app sits on, and the two washes behind it. */
  page: '#FDF7F3',
  washTop: '#FBE9E4',
  washMid: '#F3E6F4',
  surface: '#FFFFFF',
  tray: '#F6EFEA',

  ink: '#2A211D',
  /** 5.4:1 on `page`. */
  muted: '#6B5F58',
  line: '#EADFD8',

  /** The cycle's own colour, and the phase it is in. */
  rose: '#E8738E',
  /**
   * The same two signals as *type*. The board's rose is 2.9:1 on the page and
   * its mint 3.2:1 — both fail R4 — so fills keep the board's colours and
   * labels take these darker steps.
   */
  roseInk: '#AE3853',
  mintInk: '#2C6B50',
  /** The lilac as type: 5.2:1 on its own soft tint. */
  lilacInk: '#5B4BB0',
  roseSoft: '#FBE4E9',
  lilac: '#8B7BD8',
  lilacSoft: '#EDE8FB',
  amber: '#E0A33C',
  mint: '#4FA07A',

  /** The primary action: near-black, as the board draws it. */
  dark: '#2A211D',
  onDark: '#FFFFFF',
  white: '#FFFFFF',
} as const;

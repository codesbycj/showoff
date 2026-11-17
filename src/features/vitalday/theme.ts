/**
 * vitalday brand tokens, sampled off `ref/inspo/health/01.webp`.
 *
 * Taken as the modal colour of a box — single-pixel reads land on antialiased
 * edges and come back 15-20% off.
 *
 * Duplicated across the five Vital screens on purpose (RULES rule 4): `lock`
 * and `preflight` track `src/features/<slug>`, so a shared folder would make
 * each showcase report the other's blanked files as DRIFT.
 */
export const ct = {
  /** The page is a gradient, not a flat fill. These are its three stops. */
  bgTop: '#F8E4F0',
  bgMid: '#FCEADF',
  bgBottom: '#FDE3C6',

  card: '#FFFFFF',
  cardEdge: '#F0E7E0',
  tile: '#FBF5F1',
  hairline: '#F0E8E2',

  ink: '#17110D',
  /** 4.9:1 on white, and 4.6:1 on the warmest band of the page gradient. */
  sub: '#6E645C',

  /**
   * Two oranges, because one cannot do both jobs. `accent` is decorative — a
   * bar, a ring, a tint — and never carries type. `accentDeep` is the one that
   * does: white on it reads 5.4:1, where white on the board's own orange is
   * 2.9:1 and fails R4 outright.
   */
  accent: '#F0802B',
  accentSoft: '#FCE4D0',
  accentDeep: '#B8500A',
  onAccent: '#FFFFFF',

  dark: '#1C1714',
  darkInk: '#FFFFFF',

  /** The chip tints. Each is a wash; the label on it is always `ink`. */
  mint: '#DFF1E6',
  blue: '#DCEBF6',
  lilac: '#E9E3F6',
  blush: '#FBE1E6',

  white: '#FFFFFF',
} as const;

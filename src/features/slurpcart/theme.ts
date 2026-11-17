/**
 * slurpcart brand tokens, sampled off `ref/inspo/food/32.png` as the modal
 * colour of a box - single-pixel reads land on antialiased edges and come back
 * 15-20% off.
 *
 * **The board's orange is a fill, not an ink.** `#FF774A` carries white text
 * on the board at 2.6:1, which is unreadable (R4), and the design shot is not
 * an authority on contrast. It is kept exactly as the board sets it wherever
 * it is a fill under dark text, and `accentInk` is the deeper cut used when
 * the orange has to be a *letterform* on a light ground.
 *
 * Duplicated across the three Slurp screens on purpose (RULES rule 4): `lock`
 * and `preflight` track `src/features/<slug>`, so a shared folder would make
 * each showcase report the other's blanked files as DRIFT.
 */
export const ct = {
  page: '#FAFAFA',
  /** 13 levels off the page. At the board's 7 the card was invisible —
   *  under the step probe's noise floor, and under the eye's too. */
  card: '#EDEDED',
  white: '#FFFFFF',

  ink: '#1F1F1F',
  /** 5.6:1 on the page. */
  muted: '#5E5E5E',
  line: '#E6E6E6',

  /** The dark hero and the pinned bar. */
  dark: '#1F1F1F',
  onDark: '#FFFFFF',
  /** 5.0:1 on the dark ground. */
  onDarkMuted: '#A6A6A6',

  /** The board's orange, as a fill. Ink on it reads 6.2:1. */
  accent: '#FF774A',
  onAccent: '#1F1F1F',
  /** The same hue cut deep enough to be read as text on the card as well as
   *  on white: 5.2:1 on `card`, 6.1:1 on white. At the lighter cut it was
   *  4.45:1 once the card tone was deepened. */
  accentInk: '#B03A0C',
} as const;

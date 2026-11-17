/**
 * lumistart brand tokens, sampled off `ref/inspo/fintech/01.jpg`.
 *
 * Taken as the modal colour of a box — single-pixel reads land on antialiased
 * edges and come back 15-20% off.
 *
 * Duplicated across the three Lumi screens on purpose (RULES rule 4): `lock`
 * and `preflight` track `src/features/<slug>`, so a shared folder would make
 * each showcase report the other's blanked files as DRIFT.
 */
export const ct = {
  /** The board's pale mint ground. */
  page: '#E6ECE1',
  card: '#C6FAA6',
  cardEdge: '#B3E97F',
  /** The card sitting behind the first one. */
  cardBack: '#15401A',

  /** The deep green the board sets its headline and its button in. */
  deep: '#1A4615',
  deepInk: '#F2F8EE',
  ink: '#132A0F',
  /**
   * 4.7:1 on the mint ground. The board's own body grey is nearer #6E7A68,
   * which is 3.4:1 — R4 says a design shot is not an authority on contrast.
   */
  sub: '#4F5A4B',

  /** The card's own type sits on lime, so it is set in the darkest green. */
  onCard: '#17330F',
  onCardSub: 'rgba(23,51,15,0.68)',

  chip: '#D6B23A',
  /** 5.1:1 on the mint ground. At the board's own green it is 4.45 and fails. */
  accent: '#2A6E1B',
  white: '#FFFFFF',
} as const;

import type { GlyphName } from '../components/glyph';

/**
 * Everything vaultperf says, so the components stay presentational.
 *
 * **Two of the board's typos are corrected here** and listed in the handover
 * (I1): "Smart Profolio" is a portfolio, and the board's own figure is a
 * return, so the caption says so.
 *
 * **Every array is annotated** (I7): a reveal fills them one entry at a time,
 * and a type inferred from whichever rows happen to be uncommented loses every
 * property that only appears on a later row.
 */
export const brand = { wordmark: 'Vaultix' };

export type Tab = { id: string; label: string; route: string; on?: boolean };

/**
 * The app's three screens, as a tab row.
 *
 * The board shows one pill reading "Performance" and nothing beside it; a lone
 * tab is a tab bar with its siblings cropped (I3). Pointing those siblings at
 * the screens that exist is what the real app does - a screen decides
 * navigation, a component never does (RULES SS6.1).
 */
export const tabs: Tab[] = [
  { id: 'performance', label: 'Performance', route: '/vaultperf', on: true },
  // STEP 1.06 "Advisor"
  // { id: 'advisor', label: 'Advisor', route: '/vaultadvisor' },
  // STEP 1.07 "Assets"
  // { id: 'assets', label: 'Assets', route: '/vaultassets' },
];

export const footer = { accounts: 'See all accounts' };

export const headline = {
  figure: '8.2%',
  /** A comparison, not a sentence (R5). An annual return with nothing to read
   *  it against is a number, not a figure. */
  compare: 'vs 6.1% last year',
  caption: 'Annual return on Smart Portfolio',
};

export type Tile = {
  id: string;
  figure: string;
  label: string;
  note: string;
  tint: 'grey' | 'blue' | 'mint' | 'beige';
  icon: GlyphName;
};

/** The board carries two of these and leaves a third of the screen empty; the
 *  third is the row it crops, which is the sanctioned fix for a short screen
 *  (I3). */
export const tiles: Tile[] = [
  {
    id: 'revenue',
    figure: '$9.1K',
    label: 'Weekly revenue snapshot',
    note: 'Seven days to Friday',
    tint: 'grey',
    icon: 'chart',
  },
  // STEP 1.18 "Operational spending"
  // {
  //   id: 'spending',
  //   figure: '$6.4K',
  //   label: 'Operational spending',
  //   note: 'Fees, custody and desk',
  //   tint: 'blue',
  //   icon: 'bolt',
  // },
  // STEP 1.19 "Dividend income"
  // {
  //   id: 'dividend',
  //   figure: '$2.8K',
  //   label: 'Dividend income',
  //   note: 'Paid on 11 holdings',
  //   tint: 'mint',
  //   icon: 'coins',
  // },
  // STEP 1.20 "Custody and fees"
  // {
  //   id: 'fees',
  //   figure: '$0.9K',
  //   label: 'Custody and fees',
  //   note: 'Billed quarterly',
  //   tint: 'beige',
  //   icon: 'bolt',
  // },
];

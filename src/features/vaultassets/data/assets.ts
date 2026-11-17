import type { GlyphName } from '../components/glyph';

/**
 * Everything vaultassets says, so the components stay presentational.
 *
 * **The board's typo is corrected** and listed in the handover (I1): "Total
 * Mange Assets" is managed.
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
 * The board draws no navigation at all; an app whose screens cannot reach each
 * other is a picture of an app. Pointing the tabs at the screens that exist is
 * what the real app does - and a screen decides navigation, a component never
 * does (RULES SS6.1 / I3).
 */
export const tabs: Tab[] = [
  { id: 'performance', label: 'Performance', route: '/vaultperf' },
  // STEP 1.06 "Advisor"
  // { id: 'advisor', label: 'Advisor', route: '/vaultadvisor' },
  // STEP 1.07 "Assets"
  // { id: 'assets', label: 'Assets', route: '/vaultassets', on: true },
];

export const footer = { accounts: 'See all accounts' };

export const headline = {
  figure: '$10.4M',
  /** A count and a state, not a sentence (R5). */
  change: '+ $420K this year',
  caption: 'Total managed assets',
};

export type Stat = {
  id: string;
  figure: string;
  label: string;
  tint: 'yellow' | 'grey' | 'blue' | 'mint' | 'beige';
  icon: GlyphName;
};

/** The board carries four and crops the fifth at the frame edge; the fifth is
 *  the row it crops, which is the sanctioned fix for a short screen (I3). */
export const stats: Stat[] = [
  {
    id: 'transfer',
    figure: '$2.5M',
    label: 'Quick transfer limit',
    tint: 'yellow',
    icon: 'bolt',
  },
  // STEP 1.18 "Approved credit lines"
  // { id: 'credit', figure: '21', label: 'Approved credit lines', tint: 'grey', icon: 'bank' },
  // STEP 1.19 "Active exchanges"
  // { id: 'exchanges', figure: '17', label: 'Active exchanges', tint: 'blue', icon: 'chart' },
  // STEP 1.20 "Secure vaults"
  // { id: 'vaults', figure: '12', label: 'Secure vaults', tint: 'mint', icon: 'shield' },
  // STEP 1.21 "Linked institutions"
  // { id: 'linked', figure: '8', label: 'Linked institutions', tint: 'beige', icon: 'link' },
];

/**
 * The nav, and which of it is real (rule 1).
 *
 * The reference's bar reads Dashboard · Trade · Market · Analytics · Portfolio
 * · OTC. The first three are built — they are the three the category standard
 * marks as the reason an exchange front end exists — and the last three stay
 * and are inert: muted, `aria-disabled`, skipped by the keyboard, not-allowed
 * under the pointer, and a click does nothing.
 */
export type TabId = 'dashboard' | 'trade' | 'market' | 'analytics' | 'portfolio' | 'otc';

export interface Tab {
  id: TabId;
  label: string;
  live: boolean;
}

export const TABS: Tab[] = [
  { id: 'dashboard', label: 'Dashboard', live: true },
  { id: 'trade', label: 'Trade', live: true },
  { id: 'market', label: 'Market', live: true },
  { id: 'analytics', label: 'Analytics', live: false },
  { id: 'portfolio', label: 'Portfolio', live: false },
  { id: 'otc', label: 'OTC', live: false },
];

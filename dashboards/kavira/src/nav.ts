/**
 * The nav, and which of it is real (rule 1).
 *
 * Two groups, as the reference draws them: HOME and POCKET. Three of the six
 * are built; the other three stay in the sidebar and stay inert.
 */
export type TabId = 'overview' | 'legality' | 'projection' | 'account' | 'savings' | 'emergency';

export interface Tab {
  id: TabId;
  label: string;
  live: boolean;
  group: 'home' | 'pocket';
}

export const TABS: Tab[] = [
  { id: 'overview', label: 'Overview', live: true, group: 'home' },
  { id: 'legality', label: 'Legality Statement', live: false, group: 'home' },
  { id: 'projection', label: 'Financial Projection', live: true, group: 'home' },
  { id: 'account', label: 'Account', live: false, group: 'home' },
  { id: 'savings', label: 'Savings', live: true, group: 'pocket' },
  { id: 'emergency', label: 'Emergency Funds', live: false, group: 'pocket' },
];

export const LIVE_TABS = TABS.filter((t) => t.live);

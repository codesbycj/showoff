/**
 * The nav, and which of it is real (rule 1).
 *
 * The reference draws two: a row of pills across the top — Investments ·
 * Syndicates · Companies — and a sidebar of six. The pills are the app and
 * carry the three live destinations; the sidebar stays and is entirely inert,
 * because a sidebar with its entries removed is a different design from the
 * picture.
 */
export type TabId = 'investments' | 'syndicates' | 'companies';

export interface Tab {
  id: TabId;
  label: string;
  live: boolean;
}

export const TABS: Tab[] = [
  { id: 'investments', label: 'Investments', live: true },
  { id: 'syndicates', label: 'Syndicates', live: true },
  { id: 'companies', label: 'Companies', live: true },
];

export const LIVE_TABS = TABS;

/** The sidebar, exactly as the picture prints it. None of it is live. */
export const SIDE_LINKS: { id: string; label: string; count?: number }[] = [
  { id: 'dashboard', label: 'Dashboard', count: 2 },
  { id: 'documents', label: 'My documents' },
  { id: 'deals', label: 'New deals' },
  { id: 'community', label: 'Community', count: 5 },
  { id: 'insights', label: 'Insights' },
  { id: 'knowledge', label: 'Knowledge base' },
];

export const TITLES: Record<TabId, string> = {
  investments: 'My portfolio',
  syndicates: 'Syndicates',
  companies: 'Companies',
};

export const SUBTITLES: Record<TabId, string> = {
  investments: 'Every position, what it cost and what it is worth today',
  syndicates: 'Allocations open to you, and the ones you have joined',
  companies: 'The businesses behind the positions',
};

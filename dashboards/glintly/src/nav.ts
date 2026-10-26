/**
 * The nav, and which of it is real (rule 1).
 *
 * Two groups, as the reference draws them: the main list and OTHERS. Three of
 * the eight are built; the other five stay in the sidebar and stay inert,
 * including the one carrying a count badge and the three with a chevron —
 * the chevrons are part of the picture, they just do not expand.
 */
export type TabId =
  | 'dashboard'
  | 'customization'
  | 'realtime'
  | 'audience'
  | 'behavior'
  | 'conversion'
  | 'settings'
  | 'help';

export interface Tab {
  id: TabId;
  label: string;
  live: boolean;
  group: 'main' | 'others';
  expandable?: boolean;
  count?: number;
}

export const TABS: Tab[] = [
  { id: 'dashboard', label: 'Dashboard', live: true, group: 'main' },
  { id: 'customization', label: 'Customization', live: false, group: 'main', expandable: true },
  { id: 'realtime', label: 'Realtime', live: true, group: 'main' },
  { id: 'audience', label: 'Audience', live: false, group: 'main', count: 10 },
  { id: 'behavior', label: 'Behavior', live: false, group: 'main', expandable: true },
  { id: 'conversion', label: 'Conversion', live: true, group: 'main' },
  { id: 'settings', label: 'Settings', live: false, group: 'others' },
  { id: 'help', label: 'Help Center', live: false, group: 'others' },
];

export const LIVE_TABS = TABS.filter((t) => t.live);

export type LiveTabId = 'dashboard' | 'realtime' | 'conversion';

/**
 * What the header's search searches.
 *
 * The reference's placeholder is a bare "Search here ...", and the honest
 * reading of a search that sits above the whole shell is a quick find over
 * the shell: type three letters, get the cards and the tabs that match, and
 * press one to go there. The per-list searches — live pages, goals — are on
 * the cards they filter, where the reference's own tabs put them.
 *
 * Only live destinations are listed. An inert tab in the results would be a
 * dead end two clicks deep, which is worse than not offering it (rule 1).
 */
export interface Findable {
  id: string;
  label: string;
  tab: LiveTabId;
  hint: string;
}

export const FINDABLE: Findable[] = [
  { id: 'kpis', label: 'Users, revenue and conversion rate', tab: 'dashboard', hint: 'Dashboard' },
  { id: 'time-of-day', label: 'User by time of day', tab: 'dashboard', hint: 'Dashboard' },
  { id: 'active', label: 'Active users', tab: 'dashboard', hint: 'Dashboard' },
  { id: 'devices', label: 'Sessions by device', tab: 'dashboard', hint: 'Dashboard' },
  { id: 'live-now', label: 'Live right now', tab: 'realtime', hint: 'Realtime' },
  { id: 'sources', label: 'Traffic sources', tab: 'realtime', hint: 'Realtime' },
  { id: 'live-pages', label: 'Live pages', tab: 'realtime', hint: 'Realtime' },
  { id: 'funnel', label: 'Conversion funnel', tab: 'conversion', hint: 'Conversion' },
  { id: 'goals', label: 'Goals and targets', tab: 'conversion', hint: 'Conversion' },
];

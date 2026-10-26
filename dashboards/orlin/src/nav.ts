/**
 * The nav, and which of it is real (rule 1).
 *
 * This design's nav is four pills in the middle of the header, so three live
 * leaves exactly one inert rather than the usual two. Inventing a fifth to
 * make the arithmetic tidier would be a different design from the one in the
 * picture.
 *
 * The icon rail down the left edge is **not** nav here — in the reference it
 * is search, share, calendar, star and shield, which are tools rather than
 * destinations. It is built as a toolbar, and every one of its controls does
 * something (see `Rail`).
 */
export type TabId = 'dashboard' | 'activity' | 'wallets' | 'settings';

export interface Tab {
  id: TabId;
  label: string;
  live: boolean;
  expandable?: boolean;
}

export const TABS: Tab[] = [
  { id: 'dashboard', label: 'Dashboard', live: true },
  { id: 'activity', label: 'Activity', live: true },
  { id: 'wallets', label: 'Wallets', live: true, expandable: true },
  { id: 'settings', label: 'Settings', live: false },
];

export const LIVE_TABS = TABS.filter((t) => t.live);

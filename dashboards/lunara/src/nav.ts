/**
 * The nav, and which of it is real (rule 1).
 *
 * The reference draws **two** navs: a left icon rail, which is the app, and a
 * row of words across the header — Cryptocurrency · Exchange · Resources ·
 * Community · Learn — which is the marketing site wearing an app's clothes.
 *
 * So the rail carries the three live destinations and the header row is
 * entirely inert: muted, `aria-disabled`, skipped by the keyboard,
 * not-allowed under the pointer, and a click does nothing. Both stay, because
 * a header with its words removed is a different design from the picture.
 */
export type TabId = 'overview' | 'markets' | 'activity' | 'earn' | 'alerts' | 'settings';

export interface Tab {
  id: TabId;
  label: string;
  live: boolean;
}

/** The left rail: the app's own nav. */
export const TABS: Tab[] = [
  { id: 'overview', label: 'Overview', live: true },
  { id: 'markets', label: 'Markets', live: true },
  { id: 'activity', label: 'Activity', live: true },
  { id: 'earn', label: 'Earn', live: false },
  { id: 'alerts', label: 'Price alerts', live: false },
  { id: 'settings', label: 'Settings', live: false },
];

export const LIVE_TABS = TABS.filter((t) => t.live);

/** The header row, exactly as the picture prints it. None of it is live. */
export const SITE_LINKS = ['Cryptocurrency', 'Exchange', 'Resources', 'Community', 'Learn'];

export const TITLES: Record<TabId, string> = {
  overview: 'Overview dashboard',
  markets: 'Markets',
  activity: 'Activity',
  earn: 'Earn',
  alerts: 'Price alerts',
  settings: 'Settings',
};

export const SUBTITLES: Record<TabId, string> = {
  overview: "Hi Fariz, here's a look at your performance and analytics",
  markets: 'Prices across the assets you follow, and the whole market',
  activity: 'Every buy, sell, transfer and reward on your accounts',
  earn: '',
  alerts: '',
  settings: '',
};

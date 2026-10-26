/**
 * The nav, and which of it is real (rule 1).
 *
 * This design's nav is a dark icon rail down the left edge: five destinations
 * with no labels at all, plus help and sign-out pinned to the bottom. Three
 * are built; People and Goals stay in the rail and stay inert.
 *
 * An icon-only rail makes the inert state harder, not easier — there is no
 * greyed label to carry it — so an inactive entry is dimmed, `aria-disabled`,
 * skipped by the keyboard and not-allowed under the pointer, and its tooltip
 * says so.
 */
export type TabId = 'home' | 'history' | 'wallet' | 'people' | 'goals';

export interface Tab {
  id: TabId;
  label: string;
  live: boolean;
}

export const TABS: Tab[] = [
  { id: 'home', label: 'Home', live: true },
  { id: 'history', label: 'History', live: true },
  { id: 'people', label: 'People', live: false },
  { id: 'wallet', label: 'Wallet', live: true },
  { id: 'goals', label: 'Goals', live: false },
];

export const LIVE_TABS = TABS.filter((t) => t.live);

/**
 * The nav, and which of it is real.
 *
 * Rule 1: exactly three tabs are built, and the rest stay in the nav and stay
 * inactive. The order is the reference's own -- Home, Messages, Discover,
 * Wallet, Projects -- because a nav with three items in it is a different
 * design from the one in the picture.
 *
 * Home, Wallet and Projects are the three. Home because it is the screen that
 * was dropped; Wallet and Projects because they are the two a freelancer's
 * dashboard actually earns its place on, and because they are the two with real
 * numbers and real lists in them -- Messages and Discover would both have been
 * another list of people, which is a tab that shows nothing the other three do
 * not already show.
 */
export type TabId = 'home' | 'messages' | 'discover' | 'wallet' | 'projects';

export interface Tab {
  id: TabId;
  label: string;
  /** Built, and switchable. Exactly three of these. */
  live: boolean;
}

export const TABS: Tab[] = [
  { id: 'home', label: 'Home', live: true },
  { id: 'messages', label: 'Messages', live: false },
  { id: 'discover', label: 'Discover', live: false },
  { id: 'wallet', label: 'Wallet', live: true },
  { id: 'projects', label: 'Projects', live: true },
];

export const LIVE_TABS = TABS.filter((t) => t.live);

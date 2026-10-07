import type { IconName } from '../components/icon';

/**
 * The dock. The bar reports which key was pressed and the screen decides where
 * it leads, so adding a destination is a line in a screen rather than a change
 * here.
 *
 * `as const` rather than an annotation: expo-router types `router.push` against
 * the literal route strings, and a `string` field here widens them away.
 */
export const TABS = [
  { key: 'home', icon: 'home' as IconName, label: 'Home', route: '/nova/home' },
  { key: 'activity', icon: 'activity' as IconName, label: 'Activity', route: '/nova/activity' },
  { key: 'wallet', icon: 'wallet' as IconName, label: 'Wallet', route: '/nova/wallet' },
  { key: 'settings', icon: 'settings' as IconName, label: 'Settings', route: '/nova/settings' },
] as const;

export type TabKey = (typeof TABS)[number]['key'];

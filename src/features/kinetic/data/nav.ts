import type { SymbolName } from '../symbols';

/**
 * The dock. The bar reports which key was pressed and the screen decides where
 * it leads, so adding a destination is a line in a screen rather than a change
 * here.
 *
 * `as const` rather than an annotation: expo-router types `router.push` against
 * the literal route strings, and a `string` field here widens them away.
 *
 * The centre FAB is not in this list — it is not a tab, it opens a dispatch
 * flow, and the dock draws it between the second and third entries.
 */
export const TABS = [
  { key: 'home', icon: 'home' as SymbolName, label: 'Home', route: '/kinetic' },
  {
    key: 'parcels',
    icon: 'inventory2' as SymbolName,
    label: 'Parcels',
    route: '/kinetic/parcels',
  },
  { key: 'track', icon: 'nearMe' as SymbolName, label: 'Track', route: '/kinetic/fleet' },
  { key: 'profile', icon: 'person' as SymbolName, label: 'Profile', route: '/kinetic/profile' },
] as const;

export type TabKey = (typeof TABS)[number]['key'];

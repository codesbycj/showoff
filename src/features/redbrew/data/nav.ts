import type { SymbolName } from '../symbols';

/**
 * The bottom tab bar. The bar reports which key was pressed and the screen
 * decides where it leads, so adding a destination is a line in a screen rather
 * than a change here.
 *
 * `as const` rather than an annotation: expo-router types `router.push` against
 * the literal route strings, and a `string` field here widens them away.
 */
export const TABS = [
  { key: 'menu', icon: 'localCafe' as SymbolName, label: 'Menu', route: '/redbrew', badge: '' },
  {
    key: 'cart',
    icon: 'shoppingBag' as SymbolName,
    label: 'Cart',
    route: '/redbrew/cart',
    badge: '2',
  },
  {
    key: 'orders',
    icon: 'receiptLong' as SymbolName,
    label: 'Orders',
    route: '/redbrew/orders',
    badge: '',
  },
  {
    key: 'profile',
    icon: 'person' as SymbolName,
    label: 'Profile',
    route: '/redbrew/profile',
    badge: '',
  },
] as const;

export type TabKey = (typeof TABS)[number]['key'];

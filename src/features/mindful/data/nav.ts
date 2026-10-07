import type { Href } from 'expo-router';

import type { SymbolName } from '../symbols';

/**
 * The four destinations in the floating dock.
 *
 * The dock's markup is byte-identical on all four screens that carry it, so
 * there is one component and the screens differ only in which key is active.
 * The export's own `data-path` values are kept as the keys — they are what tie
 * an item to the screen it opens.
 */
export type NavTab = { key: string; icon: SymbolName; route: Href };

export const TABS: readonly NavTab[] = [
  { key: 'home', icon: 'home', route: '/mindful/home' },
  { key: 'mood-analytics', icon: 'autoAwesome', route: '/mindful/insights' },
  { key: 'calendar-insights', icon: 'calendarToday', route: '/mindful/calendar' },
  { key: 'profile-settings', icon: 'gridView', route: '/mindful/profile' },
];

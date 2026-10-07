import { BarChart3, CreditCard, Home, User } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { R, SP, TYPE, au } from '../theme';

/**
 * The floating dock.
 *
 * It is detached — a pill sitting above the bottom edge with the page running
 * under it — so it is absolutely positioned by the screen rather than being the
 * last child of a column. That is also why every screen's scroll carries bottom
 * padding: the dock covers the last ~100dp and the content has to clear it.
 *
 * The active tab is a white pill wrapping the icon *and* its label, which is
 * what makes the row asymmetric: the selected item is wider than the others. So
 * the items are not flexed to equal widths — they size to content and the row
 * distributes what is left.
 */
const ICONS = { home: Home, wallet: CreditCard, analytics: BarChart3, profile: User } as const;

export function PillNav({
  items,
  active,
  onSelect,
}: {
  items: readonly { key: string; label: string }[];
  active: string;
  onSelect?: (key: string) => void;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: au.nav,
        borderRadius: R.full,
        padding: 6,
      }}
    >
      {items.map((it) => {
        const on = it.key === active;
        const Icon = ICONS[it.key as keyof typeof ICONS] ?? Home;
        return (
          <Pressable key={it.key} onPress={() => onSelect?.(it.key)}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
                backgroundColor: on ? au.surfaceLowest : 'transparent',
                borderRadius: R.full,
                paddingHorizontal: on ? 16 : 14,
                paddingVertical: 10,
              }}
            >
              <Icon
                size={20}
                color={on ? au.onSurface : au.navMuted}
                strokeWidth={2.2}
                fill={on ? au.onSurface : 'transparent'}
              />
              {on ? <Text style={[TYPE.labelLg, { color: au.onSurface }]}>{it.label}</Text> : null}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

/** How much room a screen's scroll must leave for the dock to float over. */
export const NAV_CLEARANCE = 64 + SP.lg * 2;

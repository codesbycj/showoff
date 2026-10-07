import { Pressable, Text, View } from 'react-native';

import { type NavItem } from '../data/home';
import { R, SP, TYPE, alpha, vt } from '../theme';

import { Symbol } from './symbol';

/**
 * The floating dock, on all five screens.
 *
 * Every item is the same shape — a 52dp column with its icon over its label —
 * and the active one differs only by a pill behind it and lime ink. That makes
 * it a genuine `map` with no branch, unlike the docks in the other showcases
 * here, where the active item is a different control.
 *
 * `backdrop-blur-xl` on the container is dropped: React Native has no backdrop
 * filter, and the 90% fill the export sets lands on effectively the same colour
 * over this near-black canvas.
 */
export function TabBar({
  items,
  active,
  inset,
  onSelect,
}: {
  items: readonly NavItem[];
  active: string;
  inset: number;
  onSelect?: (item: NavItem) => void;
}) {
  return (
    <View
      style={{
        position: 'absolute',
        left: SP.margin,
        right: SP.margin,
        bottom: inset + SP.sm,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          height: 64,
          borderRadius: R.full,
          backgroundColor: alpha(vt.surfaceContainerLow, 0.95),
          paddingHorizontal: SP.xs,
          shadowColor: vt.black,
          shadowOpacity: 0.5,
          shadowRadius: 32,
          shadowOffset: { width: 0, height: 8 },
          elevation: 16,
        }}
      >
        {items.map((item) => {
          const on = item.key === active;
          return (
            <Pressable
              key={item.key}
              onPress={() => onSelect?.(item)}
              accessibilityRole="button"
              accessibilityLabel={item.label}
            >
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                  minWidth: 52,
                  height: 48,
                  borderRadius: R.full,
                  backgroundColor: on ? alpha(vt.surfaceContainerHigh, 0.8) : 'transparent',
                }}
              >
                <View>
                  <Symbol name={item.icon} size={20} color={on ? vt.primaryFixed : vt.secondary} />
                  {item.pip ? (
                    <View
                      style={{
                        position: 'absolute',
                        top: -2,
                        right: -2,
                        width: 6,
                        height: 6,
                        borderRadius: R.full,
                        backgroundColor: vt.primaryFixed,
                      }}
                    />
                  ) : null}
                </View>
                <Text style={{ ...TYPE.labelSm, color: on ? vt.primaryFixed : vt.secondary }}>
                  {item.label}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

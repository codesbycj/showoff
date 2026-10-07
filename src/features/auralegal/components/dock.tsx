import { Pressable, Text, View } from 'react-native';

import { type DockItem } from '../data/explore';
import { R, SP, TYPE, al, alpha } from '../theme';

import { Symbol } from './symbol';

/**
 * The floating navigation dock.
 *
 * The active item is a different shape from the others, not a tinted version of
 * one: a lavender pill carrying an icon *and* its label, where the rest are
 * bare 48dp icon targets with no text. So it branches inside the map rather
 * than taking a tint prop.
 *
 * `backdrop-blur-2xl` on the container is dropped — React Native has no
 * backdrop filter, and `expo-blur` over a scroll view costs a frame budget this
 * does not need. The export's 90% container fill lands on effectively the same
 * colour over this canvas.
 */
export function Dock({
  items,
  active,
  inset,
  onSelect,
}: {
  items: readonly DockItem[];
  active: string;
  inset: number;
  onSelect?: (key: string) => void;
}) {
  return (
    <View
      style={{
        position: 'absolute',
        left: SP.margin,
        right: SP.margin,
        bottom: inset + SP.md,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: alpha(al.surfaceContainer, 0.95),
          borderRadius: R.full,
          padding: 6,
          shadowColor: '#000000',
          shadowOpacity: 0.6,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: 12 },
          elevation: 14,
        }}
      >
        {items.map((item) => {
          const on = item.key === active;
          return (
            <Pressable
              key={item.key}
              onPress={() => onSelect?.(item.key)}
              accessibilityRole="button"
              accessibilityLabel={item.label}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: SP.xs,
                  height: 48,
                  minWidth: 48,
                  paddingHorizontal: on ? SP.md : 0,
                  width: on ? undefined : 48,
                  borderRadius: R.full,
                  backgroundColor: on ? al.primaryContainer : 'transparent',
                }}
              >
                <Symbol
                  name={item.icon}
                  size={22}
                  color={on ? al.onPrimaryContainer : al.onSurfaceVariant}
                />
                {on ? (
                  <Text style={{ ...TYPE.labelSm, color: al.onPrimaryContainer }}>
                    {item.label}
                  </Text>
                ) : null}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

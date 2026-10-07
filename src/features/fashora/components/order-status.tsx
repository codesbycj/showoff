import { Pressable, Text, View } from 'react-native';

import type { OrderState } from '../data/profile';
import { ELEV, FONT, R, SP, TYPE, fa } from '../theme';

import { Symbol } from './symbol';

/**
 * The four order states, with their unread counts.
 *
 * The active one — "In Transit" — changes three things at once: a pale peach
 * well instead of the neutral one, the icon in the vivid orange, and the label
 * in the burnt one. Both oranges in a single cell, which is the clearest place
 * in the design to see that `primary` is ink and `primary-container` is fill.
 *
 * The count badges overhang their wells by 4dp. They are siblings of the well
 * rather than children of it, so nothing on the path to them clips — Android
 * clips an overflowing child more eagerly than the web does, and the harness
 * would not show it.
 */
export function OrderStatus({
  items,
  onSelect,
}: {
  items: readonly OrderState[];
  onSelect?: (key: string) => void;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: SP.sm,
        backgroundColor: fa.surfaceContainerLowest,
        padding: SP.gutterMobile,
        borderRadius: R.DEFAULT,
        ...ELEV.card,
      }}
    >
      {items.map((item) => (
        <Pressable
          key={item.key}
          style={{ flex: 1 }}
          onPress={() => onSelect?.(item.key)}
          accessibilityRole="button"
          accessibilityLabel={item.label}
        >
          <View style={{ alignItems: 'center' }}>
            <View style={{ marginBottom: SP.xs }}>
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: R.full,
                  backgroundColor: item.active ? fa.primaryFixed : fa.surfaceContainerLow,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Symbol
                  name={item.icon}
                  size={20}
                  color={item.active ? fa.primaryContainer : fa.onSurface}
                />
              </View>

              {item.badge ? (
                <View
                  style={{
                    position: 'absolute',
                    top: -4,
                    right: -4,
                    width: 16,
                    height: 16,
                    borderRadius: R.full,
                    backgroundColor: fa.primaryContainer,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: FONT.bold,
                      fontSize: 10,
                      lineHeight: 12,
                      color: fa.onPrimary,
                    }}
                  >
                    {item.badge}
                  </Text>
                </View>
              ) : null}
            </View>

            <Text
              style={{
                ...TYPE.labelSm,
                color: item.active ? fa.primary : fa.secondary,
              }}
            >
              {item.label}
            </Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

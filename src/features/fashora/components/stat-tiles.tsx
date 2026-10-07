import { Pressable, Text, View } from 'react-native';

import type { Stat } from '../data/profile';
import { ELEV, R, SP, TYPE, fa } from '../theme';

/**
 * Orders / Wishlist / Vouchers.
 *
 * Only the voucher count is set in the accent, which is the design doing its
 * one bit of emphasis on this row rather than a colour that got away — so it
 * travels as a flag on the data instead of a special case in the markup.
 */
export function StatTiles({ items, onSelect }: { items: readonly Stat[]; onSelect?: (key: string) => void }) {
  return (
    <View style={{ flexDirection: 'row', gap: SP.gutterMobile }}>
      {items.map((item) => (
        <Pressable
          key={item.key}
          style={{ flex: 1 }}
          onPress={() => onSelect?.(item.key)}
          accessibilityRole="button"
          accessibilityLabel={`${item.value} ${item.label}`}
        >
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: SP.gutterMobile,
              borderRadius: R.DEFAULT,
              backgroundColor: fa.surfaceContainerLowest,
              ...ELEV.card,
            }}
          >
            <Text
              style={{
                ...TYPE.headlineMd,
                color: item.accent ? fa.primaryContainer : fa.onSurface,
              }}
            >
              {item.value}
            </Text>
            <Text style={{ ...TYPE.labelSm, color: fa.secondary, marginTop: 2 }}>
              {item.label}
            </Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import type { BagItem } from '../data/bag';
import { ELEV, R, SP, TYPE, fa } from '../theme';

import { Symbol } from './symbol';

/**
 * One line in the bag: photo, title, colourway and size, price and a stepper.
 *
 * The price here is `primary` — the burnt orange — not the vivid
 * `primary-container` the feed sets its prices in. That is the export's own
 * distinction between the two oranges and it is deliberate: fills are vivid,
 * ink is burnt.
 *
 * The size chip has horizontal padding and none vertical: the export writes
 * `py-0.2`, which is not a Tailwind step and so resolves to nothing at all. Its
 * height is therefore its own 14dp line box, and the chip reads as a flat
 * lozenge rather than a pill. That is what the reference renders, so the
 * accident is kept.
 *
 * The clip and the shadow sit on two Views: `overflow: 'hidden'` rounds the
 * photo, `elevation` casts `shadow-sm`, and the pair on one View is unreliable
 * on Android.
 */
export function CartItem({
  item,
  onRemove,
  onDecrement,
  onIncrement,
}: {
  item: BagItem;
  onRemove?: () => void;
  onDecrement?: () => void;
  onIncrement?: () => void;
}) {
  return (
    <View
      style={{
        backgroundColor: fa.surfaceContainerLowest,
        borderRadius: R.lg,
        padding: 14,
        flexDirection: 'row',
        gap: 14,
        ...ELEV.card,
      }}
    >
      <View
        style={{
          width: 96,
          height: 112,
          borderRadius: R.DEFAULT,
          backgroundColor: fa.surfaceContainer,
          overflow: 'hidden',
        }}
      >
        <Image
          source={item.image}
          style={{ width: '100%', height: '100%' }}
          contentFit="cover"
        />
        <View
          style={{
            position: 'absolute',
            top: 6,
            left: 6,
            width: 8,
            height: 8,
            borderRadius: R.full,
            backgroundColor: item.dot,
          }}
        />
      </View>

      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: SP.xs }}>
            <Text
              numberOfLines={1}
              style={{ ...TYPE.headlineSm, color: fa.onSurface, flex: 1 }}
            >
              {item.name}
            </Text>
            <Pressable
              onPress={onRemove}
              accessibilityRole="button"
              accessibilityLabel={`Remove ${item.name}`}
              style={{ padding: SP.xs, marginRight: -SP.xs }}
            >
              <Symbol name="delete" size={18} color={fa.secondary} />
            </Pressable>
          </View>

          <View
            style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm, marginTop: 2 }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.xs }}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: R.full,
                  backgroundColor: item.dot,
                }}
              />
              <Text style={{ ...TYPE.bodySm, color: fa.secondary }}>{item.color}</Text>
            </View>

            <Text style={{ ...TYPE.bodySm, color: fa.secondary }}>•</Text>

            <View
              style={{
                paddingHorizontal: 6,
                borderRadius: R.full,
                backgroundColor: fa.surfaceContainerHigh,
              }}
            >
              <Text style={{ ...TYPE.labelSm, color: fa.onSurface }}>{item.size}</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: SP.sm,
          }}
        >
          <Text style={{ ...TYPE.headlineSm, color: fa.primary }}>{item.price}</Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: R.full,
              backgroundColor: fa.surfaceContainerLow,
              paddingHorizontal: SP.xs,
              paddingVertical: 2,
            }}
          >
            <Pressable
              onPress={onDecrement}
              accessibilityRole="button"
              accessibilityLabel="Decrease quantity"
            >
              <View style={stepper}>
                <Symbol name="remove" size={14} />
              </View>
            </Pressable>

            <Text
              style={{ ...TYPE.labelMd, color: fa.onSurface, width: 28, textAlign: 'center' }}
            >
              {item.qty}
            </Text>

            <Pressable
              onPress={onIncrement}
              accessibilityRole="button"
              accessibilityLabel="Increase quantity"
            >
              <View style={stepper}>
                <Symbol name="add" size={14} />
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const stepper = {
  width: 28,
  height: 28,
  borderRadius: R.full,
  backgroundColor: fa.surfaceContainerLowest,
  alignItems: 'center',
  justifyContent: 'center',
} as const;

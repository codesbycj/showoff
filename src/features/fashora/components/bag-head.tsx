import { Text, View } from 'react-native';

import { R, SP, TYPE, alpha, fa } from '../theme';

/**
 * "My Bag", the item count chip, and the free-shipping note.
 *
 * The chip is the one place the two oranges sit on top of each other: a 15%
 * `primary-container` fill under `primary` ink. Reaching for one token for both
 * gives either an orange-on-orange chip or a brown-on-brown one.
 *
 * The heading group is held at 30dp, measured off the reference. `headline-md`'s
 * own leading is 26, but the browser sizes a row to the tallest inline box in
 * it and the heading's natural font metrics overrun what the utility asks for.
 * The floor goes on the group rather than on the padded row, because Yoga's
 * `minHeight` is border-box — on the row it would have been swallowed whole by
 * the 24dp of padding and changed nothing. Four dp here moves all three bag
 * items and everything under them.
 */
export function BagHead({
  heading,
  count,
  shipping,
}: {
  heading: string;
  count: string;
  shipping: string;
}) {
  return (
    <View
      style={{
        paddingHorizontal: SP.marginMobile,
        paddingTop: SP.sm,
        paddingBottom: SP.md,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm, minHeight: 30 }}>
        <Text style={{ ...TYPE.headlineMd, color: fa.onSurface }}>{heading}</Text>
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 2,
            borderRadius: R.full,
            backgroundColor: alpha(fa.primaryContainer, 0.15),
          }}
        >
          <Text style={{ ...TYPE.labelSm, color: fa.primary }}>{count}</Text>
        </View>
      </View>

      <Text style={{ ...TYPE.labelMd, color: fa.secondary }}>{shipping}</Text>
    </View>
  );
}

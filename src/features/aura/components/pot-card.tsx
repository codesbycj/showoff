import { Text, View } from 'react-native';

import { R, SP, TYPE, au } from '../theme';

/**
 * One balance inside the net-assets card.
 *
 * `amber` marks the pot that is money earned rather than money held — the design
 * gives cashback the secondary tint so it reads as a different kind of number
 * from the two accounts beside it, which are otherwise identical in shape.
 */
export function PotCard({
  label,
  value,
  amber,
}: {
  label: string;
  value: string;
  amber?: boolean;
}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: amber ? au.secondaryFixed : au.surfaceLow,
        borderRadius: R.md,
        paddingHorizontal: SP.sm + 4,
        paddingVertical: SP.sm + 4,
      }}
    >
      <Text
        style={[TYPE.bodySm, { color: amber ? au.onSecondaryContainer : au.onSurfaceVariant }]}
        numberOfLines={1}
      >
        {label}
      </Text>
      <Text
        style={[
          TYPE.labelLg,
          { marginTop: 4, color: amber ? au.onSecondaryContainer : au.onSurface },
        ]}
        numberOfLines={1}
      >
        {value}
      </Text>
    </View>
  );
}

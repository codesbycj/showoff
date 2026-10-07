import { Pressable, Text, View } from 'react-native';

import { R, SP, TYPE, au } from '../theme';

/**
 * A savings goal and how far along it is.
 *
 * The bar is a fixed width on the right rather than flexed, so the goal's name
 * gets the elastic column — a long name should wrap, not squeeze the one element
 * whose length carries meaning.
 */
export function GoalRow({
  name,
  note,
  pct,
  onPress,
}: {
  name: string;
  note: string;
  pct: number;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: au.surfaceLow,
          borderRadius: R.lg,
          padding: SP.sm + 4,
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: au.secondaryBright,
          }}
        />

        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={[TYPE.labelLg, { color: au.onSurface }]} numberOfLines={1}>
            {name}
          </Text>
          <Text style={[TYPE.bodySm, { marginTop: 2, color: au.onSurfaceVariant }]}>{note}</Text>
        </View>

        <View
          style={{
            width: 78,
            height: 6,
            borderRadius: 3,
            marginLeft: 12,
            marginRight: SP.sm,
            backgroundColor: au.surfaceHighest,
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              width: `${Math.min(Math.max(pct, 0), 1) * 100}%`,
              height: '100%',
              borderRadius: 3,
              backgroundColor: au.primary,
            }}
          />
        </View>
      </View>
    </Pressable>
  );
}

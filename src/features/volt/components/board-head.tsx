import { Text, View } from 'react-native';

import { R, SP, TYPE, vt } from '../theme';

/**
 * "● LIVE & TODAY'S FIXTURES / 3 Matches".
 *
 * The count is a lime-on-raised pill rather than running text, which is how this
 * system marks a tally throughout. The leading dot is `animate-ping` in the
 * export and is drawn static here, as every live indicator in this showcase is.
 */
export function BoardHead({ title, count }: { title: string; count: string }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SP.xs,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.xs, flexShrink: 1 }}>
        <View
          style={{ width: 8, height: 8, borderRadius: R.full, backgroundColor: vt.primaryFixed }}
        />
        <Text numberOfLines={1} style={{ ...TYPE.labelLg, letterSpacing: 0.5, color: vt.primary }}>
          {title.toUpperCase()}
        </Text>
      </View>

      <View
        style={{
          paddingHorizontal: SP.sm,
          paddingVertical: 2,
          borderRadius: R.full,
          backgroundColor: vt.surfaceContainerHigh,
        }}
      >
        <Text style={{ ...TYPE.labelSm, color: vt.primaryFixed }}>{count}</Text>
      </View>
    </View>
  );
}

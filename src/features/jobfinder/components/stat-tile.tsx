import { Text, View } from 'react-native';

import { FONT, jf } from '../theme';

/**
 * One of the four numbers under the profile header — "4+ YRS EXP".
 *
 * The tiles are flexed to equal widths by their row rather than sized here, so
 * the fourth one runs under the card's decorative circle without the set going
 * uneven. That circle is why the row is four tiles and not a table.
 */
export function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        paddingVertical: 8,
        borderRadius: 16,
        backgroundColor: 'rgba(237,240,235,0.5)',
      }}
    >
      <Text style={{ fontFamily: FONT.extrabold, fontSize: 16, lineHeight: 21, color: jf.ink }}>
        {value}
      </Text>
      <Text
        style={{
          fontFamily: FONT.semibold,
          fontSize: 10,
          lineHeight: 14,
          letterSpacing: -0.1,
          color: jf.muted,
        }}
      >
        {label.toUpperCase()}
      </Text>
    </View>
  );
}

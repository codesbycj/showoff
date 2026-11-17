import { Pressable, View } from 'react-native';

import { advisor } from '../data/advisor';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * The line the board closes on, and the way through to the advisor.
 *
 * The board's own copy reads "wordwide"; it is corrected here and listed in
 * the handover - a design shot is not an authority on spelling (I1).
 */
export function TrustRow({ margin, height }: Props) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
      }}
    >
      <View style={{ flex: 1 }}>
        <T variant="trust">{advisor.trust}</T>
      </View>

      <Pressable accessibilityRole="button" accessibilityLabel={`Message ${advisor.name}`}>
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: ct.dark,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Glyph name="arrowOut" size={19} color={ct.onDark} strokeWidth={1.9} />
        </View>
      </Pressable>
    </View>
  );
}

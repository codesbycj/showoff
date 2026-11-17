import { Pressable, View } from 'react-native';

import { splash } from '../data/start';
import { ct } from '../theme';
import { Glyph } from './glyph';

type Props = { size: number; onPress: () => void };

/**
 * The round action the board ends on.
 *
 * The fill lives on an absolutely-filled child, so an emptied control paints
 * nothing during a reveal (SS5.5), and the arrow sits in a lifted View because
 * an `<svg>` paints BELOW a positioned sibling on web - the ground would hide
 * it outright (SS7).
 */
export function StartDisc({ size, onPress }: Props) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={splash.cta} onPress={onPress}>
      <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: size / 2,
            backgroundColor: ct.ink,
          }}
        />

        <View style={{ zIndex: 1 }}>
          <Glyph name="arrow" size={24} color={ct.onInk} strokeWidth={1.9} />
        </View>
      </View>
    </Pressable>
  );
}

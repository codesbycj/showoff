import { Pressable, View } from 'react-native';

import { ct } from '../theme';
import { Glyph } from './glyph';

type Props = { size: number };

/**
 * The menu.
 *
 * Its own component for the same reason as the wordmark beside it: a control
 * that is its own block is its own step in the reveal (I5).
 */
export function MenuButton({ size }: Props) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel="Menu">
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Glyph name="menu" size={20} color={ct.ink} strokeWidth={1.7} />
      </View>
    </Pressable>
  );
}

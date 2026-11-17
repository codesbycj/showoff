import { Pressable, View } from 'react-native';

import { ct } from '../theme';
import { Glyph } from './glyph';

type Props = { size: number; onPress: () => void };

/**
 * The way back to the session.
 *
 * Mounted from the screen rather than written inline: a screen file is a list
 * of imports and the blocks they mount, and a control written as markup
 * reveals in the same beat as whatever wraps it (rule 2 / I5).
 */
export function BackButton({ size, onPress }: Props) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel="Back" onPress={onPress}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: ct.card,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Glyph name="back" size={19} color={ct.onDark} strokeWidth={1.9} />
      </View>
    </Pressable>
  );
}

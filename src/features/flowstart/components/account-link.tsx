import { Pressable, View } from 'react-native';

import { welcome } from '../data/start';
import { T } from './text';

type Props = { height: number; onPress: () => void };

/**
 * The way back in for someone who already has an account.
 *
 * A text link's tap target is its own line height, which is 19dp here, so the
 * anchor is padded rather than left at the size of its glyphs (R7).
 */
export function AccountLink({ height, onPress }: Props) {
  return (
    <View style={{ height, alignItems: 'center' }}>
      <Pressable
        accessibilityRole="link"
        accessibilityLabel={welcome.link}
        hitSlop={{ top: 14, bottom: 14, left: 14, right: 14 }}
        onPress={onPress}
      >
        <T variant="link">{welcome.link}</T>
      </Pressable>
    </View>
  );
}

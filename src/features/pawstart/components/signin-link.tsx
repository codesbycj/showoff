import { Pressable, View } from 'react-native';

import { brand } from '../data/start';
import { T } from './text';

type Props = { height: number };

/**
 * The way in for someone who has been here before.
 *
 * A text link's tap target is its **line height**, so the anchor is padded to
 * 44dp rather than left at the 19dp the type gives it (R7).
 */
export function SigninLink({ height }: Props) {
  return (
    <View style={{ height, alignItems: 'center', justifyContent: 'center' }}>
      <Pressable accessibilityRole="link" accessibilityLabel={brand.signin}>
        <View style={{ height: 44, paddingHorizontal: 8, justifyContent: 'center' }}>
          <T variant="signin">{brand.signin}</T>
        </View>
      </Pressable>
    </View>
  );
}

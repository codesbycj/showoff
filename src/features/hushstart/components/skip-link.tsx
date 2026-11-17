import { Pressable, View } from 'react-native';

import { brand } from '../data/onboarding';
import { T } from './text';

type Props = { onPress: () => void };

/**
 * The way past the onboarding.
 *
 * A text link's tap target is its **line height**, so the anchor is padded to
 * 44dp rather than left at the 20dp the type gives it (R7).
 */
export function SkipLink({ onPress }: Props) {
  return (
    <Pressable accessibilityRole="link" accessibilityLabel={brand.skip} onPress={onPress}>
      <View style={{ height: 44, paddingHorizontal: 8, justifyContent: 'center' }}>
        <T variant="skip">{brand.skip}</T>
      </View>
    </Pressable>
  );
}

import { Pressable, View } from 'react-native';

import { brand } from '../data/start';
import { T } from './text';

type Props = { onPress: () => void };

/**
 * The way in for someone who would rather not be walked through it.
 *
 * A text link's tap target is its **line height**, so the anchor is padded to
 * 44dp rather than left at the 19dp the type gives it (R7).
 */
export function BrowseLink({ onPress }: Props) {
  return (
    <Pressable accessibilityRole="link" accessibilityLabel={brand.browse} onPress={onPress}>
      <View style={{ height: 44, paddingHorizontal: 4, justifyContent: 'center' }}>
        <T variant="browse">{brand.browse}</T>
      </View>
    </Pressable>
  );
}

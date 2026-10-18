import Search from 'lucide-react-native/icons/search';
import { Pressable, View } from 'react-native';

import { header } from '../data/brands';
import { SEARCH_HEIGHT } from '../layout';
import { ml, radius } from '../theme';
import { T } from './text';

/**
 * The search field.
 *
 * A `Pressable` rather than a `TextInput`: nothing on this screen reads what
 * is typed, and a real input would blink a caret through the whole recording.
 */
export function SearchField({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={header.searchPlaceholder}
    >
      <View
        style={{
          height: SEARCH_HEIGHT,
          borderRadius: radius.pill,
          backgroundColor: ml.glass,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          gap: 9,
        }}
      >
        <Search size={16} color={ml.onCanvasSoft} strokeWidth={1.9} />
        <T variant="search" color={ml.onCanvasSoft}>
          {header.searchPlaceholder}
        </T>
      </View>
    </Pressable>
  );
}

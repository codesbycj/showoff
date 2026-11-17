import { Image, Pressable, View } from 'react-native';

import { money, results } from '../data/find';
import { ct } from '../theme';
import { T } from './text';

type Props = { width: number; imageH: number; textH: number; onOpen: () => void };

/**
 * The results.
 *
 * **Each cell is a photograph with its caption under it** (I4) - the board
 * runs them edge to edge with no gutter, two across, and the last row is cut
 * by the dock rather than stopping short of it (I3).
 */
export function ResultGrid({ width, imageH, textH, onOpen }: Props) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {results.map((result) => (
        <Pressable
          key={result.id}
          accessibilityRole="button"
          accessibilityLabel={`${result.name} by ${result.maker}, ${money(result.price)}`}
          onPress={onOpen}
        >
          <View style={{ width }}>
            <Image source={result.image} style={{ width, height: imageH }} resizeMode="cover" />

            <View style={{ height: textH, paddingHorizontal: 14, paddingTop: 8, gap: 2 }}>
              <T variant="gridName" numberOfLines={2}>
                {result.name}
              </T>
              <T variant="gridPrice">{money(result.price)}</T>
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

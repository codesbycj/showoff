import { Image, Pressable, View } from 'react-native';

import { type Place } from '../data/home';

type Props = { place: Place; width: number; height: number; radius: number };

/**
 * One place tile — a photograph and nothing else, as the board draws it.
 *
 * **No caption.** The rail runs under the floating dock exactly where the
 * board crops it, which leaves 21dp of tile above the bar: a label there is
 * present in the DOM and invisible on the screen, and `audit.js` would pass it
 * while the recording showed a bar sitting on half a word. The name is carried
 * by `accessibilityLabel`, where it is read rather than drawn.
 */
export function PlaceTile({ place, width, height, radius }: Props) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={`${place.label}, ${place.count}`}>
      <View style={{ width, height, borderRadius: radius, overflow: 'hidden' }}>
        <Image source={place.image} style={{ width, height }} resizeMode="cover" />
      </View>
    </Pressable>
  );
}

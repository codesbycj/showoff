import { Image, Pressable, ScrollView, View } from 'react-native';

import { pets } from '../data/home';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; height: number; size: number };

/**
 * Which animal you are shopping for.
 *
 * **A horizontal scroller, not a wrap** (R2): the board crops its last chip at
 * the screen edge, and a wrap layout physically cannot reproduce that.
 * `flexGrow: 0` is load-bearing - a ScrollView carries `flexGrow: 1` and will
 * eat every spare dp of the column into the rail.
 *
 * Each chip carries a photograph, not a drawing (I4).
 */
export function PetChips({ margin, height, size }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ height, flexGrow: 0, flexShrink: 0 }}
      contentContainerStyle={{ paddingHorizontal: margin, gap: 8, alignItems: 'center' }}
    >
      {pets.map((pet) => (
        <Pressable key={pet.id} accessibilityRole="button" accessibilityLabel={pet.label}>
          <View
            style={{
              height,
              paddingLeft: 5,
              paddingRight: 11,
              borderRadius: height / 2,
              backgroundColor: ct.card,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 7,
            }}
          >
            <Image
              source={pet.image}
              style={{ width: size, height: size, borderRadius: size / 2 }}
              resizeMode="cover"
            />
            <T variant="chip">{pet.label}</T>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

import { Image, Pressable, ScrollView, View } from 'react-native';

import { categories } from '../data/home';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; width: number; height: number; labelH: number };

/**
 * The categories.
 *
 * **Each tile is a photograph** (I4). A row of round tiles reading Audio /
 * Wearables / Cameras is five pictures *of* things; drawing them in SVG
 * produces five cartoons where the board had products, and that is the single
 * thing that most makes a screen read as a toy.
 *
 * A horizontal scroller, not a wrap: the board crops its fifth tile at the
 * frame, and a wrap layout physically cannot reproduce that (R2).
 */
export function CategoryRail({ margin, width, height, labelH }: Props) {
  return (
    <View style={{ height }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: margin, gap: 14 }}
      >
        {categories.map((category) => (
          <Pressable
            key={category.id}
            accessibilityRole="button"
            accessibilityLabel={category.label}
            style={{ width, alignItems: 'center' }}
          >
            <Image
              source={category.image}
              style={{ width, height: width, borderRadius: width / 2 }}
              resizeMode="cover"
            />
            <View style={{ height: labelH, justifyContent: 'center' }}>
              <T variant="tile" numberOfLines={1}>
                {category.label}
              </T>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

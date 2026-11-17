import { Image, Pressable, ScrollView, View } from 'react-native';

import { categories } from '../data/home';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; height: number; radius: number };

/**
 * The category filter.
 *
 * **Each chip carries a photograph, not an emoji** (I4, I8). The board sets a
 * burger, a pear and a pizza slice as emoji: a chip is a picture *of* a thing,
 * and emoji differ across Windows / Android / iOS — flags are missing on
 * Windows entirely — which the web render cannot show.
 *
 * A horizontal scroller, not a wrap: the board crops its last chip at the
 * frame, which a wrap cannot reproduce (R2).
 */
export function CategoryChips({ margin, height, radius }: Props) {
  return (
    <View style={{ height }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: margin, gap: 10 }}
      >
        {categories.map((category) => (
          <Pressable
            key={category.id}
            accessibilityRole="button"
            accessibilityState={{ selected: !!category.on }}
            accessibilityLabel={category.label}
          >
            <View
              style={{
                height,
                borderRadius: radius,
                paddingLeft: category.image ? 5 : 20,
                paddingRight: 20,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 9,
                backgroundColor: category.on ? ct.greenDeep : ct.white,
                borderWidth: category.on ? 0 : 1.5,
                borderColor: ct.line,
              }}
            >
              {category.image ? (
                <Image
                  source={category.image}
                  style={{ width: 34, height: 34, borderRadius: 17 }}
                  resizeMode="cover"
                />
              ) : null}
              <T variant={category.on ? 'chipOn' : 'chipOff'}>{category.label}</T>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

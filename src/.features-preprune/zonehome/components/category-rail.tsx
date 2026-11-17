import { Image, Pressable, ScrollView, View } from 'react-native';

import { categories } from '../data/home';
import { ct } from '../theme';
import { T } from './text';

type Props = { height: number; margin: number; tile: number; gap: number };

/**
 * The category tiles.
 *
 * **Every tile is a photograph** (I4). A row of round tiles reading Burger /
 * Steak / Sea Food is six pictures *of* food, and drawing a burger, a steak
 * and a fish in SVG produces a row of cartoons where the design had food —
 * which the rules name as the single thing that most makes a screen read as a
 * toy. Small on screen does not mean small as a subject.
 *
 * **A horizontal `ScrollView`, not a wrap.** The board shows its sixth tile cut
 * by the screen edge, and a wrap layout physically cannot reproduce that (R2).
 * The rail is pinned to its own height so it cannot absorb the screen's slack.
 */
export function CategoryRail({ height, margin, tile, gap }: Props) {
  return (
    <View style={{ height }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: margin, gap }}
      >
        {categories.map((c) => (
          <Pressable key={c.id} accessibilityRole="button" accessibilityLabel={c.label}>
            {({ pressed }) => (
              <View style={{ alignItems: 'center', gap: 7, opacity: pressed ? 0.75 : 1 }}>
                <View
                  style={{
                    width: tile,
                    height: tile,
                    borderRadius: tile / 2,
                    overflow: 'hidden',
                    backgroundColor: ct.tile,
                  }}
                >
                  <Image
                    source={c.photo}
                    style={{ width: tile, height: tile }}
                    resizeMode="cover"
                  />
                </View>
                <T variant="category">{c.label}</T>
              </View>
            )}
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

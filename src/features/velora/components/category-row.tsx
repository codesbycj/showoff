import { Image, Pressable, ScrollView, View } from 'react-native';

import { T } from './text';
import type { Category } from '../data/home';
import { CHIP_GAP, CHIP_HEIGHT, CHIP_THUMB_H, CHIP_THUMB_W, CHIP_WIDTH, MARGIN } from '../layout';
import { radius, vl } from '../theme';

/**
 * The categories: a label and a thumbnail, side by side, in a row that runs
 * off the right edge of the screen.
 *
 * **A scrolling row, not a wrap.** The reference shows the third chip clipped
 * by the screen edge, and a clipped item is the signature of a horizontal
 * scroll: a wrapping layout physically cannot produce it, because it would
 * have moved that chip to a second line instead.
 */
export function CategoryRow({
  categories,
  onSelect,
}: {
  categories: Category[];
  onSelect?: (c: Category) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: MARGIN, gap: CHIP_GAP }}
    >
      {categories.map((c) => (
        <Pressable
          key={c.id}
          onPress={() => onSelect?.(c)}
          accessibilityRole="button"
          accessibilityLabel={c.label}
        >
          <View
            style={{
              width: CHIP_WIDTH,
              height: CHIP_HEIGHT,
              borderRadius: radius.chip,
              backgroundColor: vl.field,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 12,
              paddingRight: 5,
              justifyContent: 'space-between',
            }}
          >
            {/* STEP 1.24 say what each one is
            <T
              variant="chip"
              color={vl.inkSoft}
              numberOfLines={2}
              style={{ flex: 1, marginRight: 8 }}
            >
              {c.label}
            </T>
            */}
            {/* STEP 1.25 and show it
            <Image
              source={c.image}
              style={{ width: CHIP_THUMB_W, height: CHIP_THUMB_H, borderRadius: radius.thumb }}
              resizeMode="cover"
              accessibilityIgnoresInvertColors
            />
            */}
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

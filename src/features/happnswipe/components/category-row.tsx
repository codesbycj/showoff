import { Image, Pressable, ScrollView, View } from 'react-native';

import { categories } from '../data/discover';
import { CATEGORY_DISC, CATEGORY_GAP, MARGIN } from '../layout';
import { hp, radius } from '../theme';
import { FACES } from './faces';
import { T } from './text';

type Category = (typeof categories)[number];

/**
 * The ways of filtering who you see, each one a face in a coloured ring.
 *
 * A horizontal scroll and not a wrap: the reference clips the last one at the
 * screen edge, and a wrap layout physically cannot reproduce that (AGENTS.md,
 * "Verifying pixel accuracy").
 */
export function CategoryRow({ onSelect }: { onSelect?: (c: Category) => void }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginHorizontal: -MARGIN }}
      contentContainerStyle={{ paddingHorizontal: MARGIN, gap: CATEGORY_GAP }}
    >
      {/* STEP 1.08 five ways to filter
      {categories.map((c, i) => (
        <Item key={c.key} category={c} tone={i} onPress={() => onSelect?.(c)} />
      ))}
      */}
    </ScrollView>
  );
}

function Item({
  category,
  tone,
  onPress,
}: {
  category: Category;
  tone: number;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={category.label}>
      <View style={{ alignItems: 'center', width: CATEGORY_DISC + 16, gap: 5 }}>
        <View
          style={{
            width: CATEGORY_DISC,
            height: CATEGORY_DISC,
            borderRadius: radius.full,
            borderWidth: 2.4,
            borderColor: hp.ring[tone % hp.ring.length],
            padding: 2.5,
            backgroundColor: hp.surface,
          }}
        >
          <Image
            source={FACES[category.face]}
            style={{ width: '100%', height: '100%', borderRadius: radius.full }}
            resizeMode="cover"
            accessibilityIgnoresInvertColors
          />
        </View>
        <T variant="category" color={hp.ink}>
          {category.label}
        </T>
      </View>
    </Pressable>
  );
}

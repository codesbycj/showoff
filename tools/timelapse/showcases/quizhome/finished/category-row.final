import Clapperboard from 'lucide-react-native/icons/clapperboard';
import FlaskConical from 'lucide-react-native/icons/flask-conical';
import Hourglass from 'lucide-react-native/icons/hourglass';
import Trophy from 'lucide-react-native/icons/trophy';
import { Pressable, ScrollView, View } from 'react-native';

import { categories } from '../data/home';
import { CATEGORY_GAP, CATEGORY_H, CATEGORY_W, MARGIN } from '../layout';
import { qz, radius } from '../theme';
import { T } from './text';

const ICONS = {
  flask: FlaskConical,
  hourglass: Hourglass,
  clapper: Clapperboard,
  trophy: Trophy,
} as const;

type Category = (typeof categories)[number];

/**
 * The four subjects, in a row that runs off the right edge.
 *
 * A horizontal scroll and not a wrap: the reference clips the fourth card at
 * the screen edge, and a wrap layout physically cannot reproduce that
 * (AGENTS.md, "Verifying pixel accuracy"). The negative margin lets the row
 * bleed into the page gutter while its first card still lines up with
 * everything above it.
 */
export function CategoryRow({ onSelect }: { onSelect?: (c: Category) => void }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginHorizontal: -MARGIN }}
      contentContainerStyle={{ paddingHorizontal: MARGIN, gap: CATEGORY_GAP }}
    >
      {categories.map((c) => (
        <CategoryCard key={c.key} category={c} onPress={() => onSelect?.(c)} />
      ))}
    </ScrollView>
  );
}

function CategoryCard({ category, onPress }: { category: Category; onPress?: () => void }) {
  const Icon = ICONS[category.icon];

  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={category.label}>
      <View
        style={{
          width: CATEGORY_W,
          height: CATEGORY_H,
          borderRadius: radius.category,
          backgroundColor: category.color,
          padding: 12,
          justifyContent: 'space-between',
        }}
      >
        <Icon size={26} color={qz.onColor} strokeWidth={1.6} />
        <View>
          <T variant="category" color={qz.onColor}>
            {category.label}
          </T>
          <T variant="categoryMeta" color={qz.onColor} style={{ opacity: 0.72 }}>
            {category.meta}
          </T>
        </View>
      </View>
    </Pressable>
  );
}

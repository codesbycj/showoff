import { Image, Pressable, ScrollView, View } from 'react-native';

import { money, packs } from '../data/shop';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = {
  margin: number;
  width: number;
  height: number;
  radius: number;
  onOpen: () => void;
};

/**
 * The collection.
 *
 * **A horizontal scroller, not a wrap** (R2): the board crops its second card
 * at the screen edge, which is what tells you the rail scrolls.
 *
 * Each card's tint lives on an absolutely-filled child so an emptied card
 * paints nothing during a reveal (§5.5), and the cart disc is a **sibling** of
 * the card's `Pressable` — a `role="button"` inside another is torn apart by
 * the static web build's HTML parser (§7).
 */
export function PackRail({ margin, width, height, radius, onOpen }: Props) {
  const tints = { blush: ct.blush, lime: ct.lime } as const;
  const imageH = Math.max(110, height - 112);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ height, flexGrow: 0, flexShrink: 0 }}
      contentContainerStyle={{ paddingHorizontal: margin, gap: 14 }}
    >
      {packs.map((pack) => (
        <View key={pack.id} style={{ width, height }}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${pack.name}, ${money(pack.price)}`}
            onPress={onOpen}
          >
            <View style={{ width, height, borderRadius: radius, overflow: 'hidden' }}>
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: tints[pack.tint],
                }}
              />

              <View style={{ paddingHorizontal: 16, paddingTop: 16, gap: 2 }}>
                <T variant="cardName" numberOfLines={1}>
                  {pack.name}
                </T>
                <T variant="cardSub" numberOfLines={1}>
                  {pack.sub}
                </T>
              </View>

              <Image
                source={pack.image}
                style={{ width, height: imageH, marginTop: 8 }}
                resizeMode="cover"
              />

              <View style={{ position: 'absolute', left: 16, bottom: 14 }}>
                <T variant="price">{money(pack.price)}</T>
              </View>
            </View>
          </Pressable>

          <View style={{ position: 'absolute', right: 12, bottom: 12 }}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Add ${pack.name} to the cart`}
            >
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: ct.dark,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Glyph name="cart" size={18} color={ct.onDark} strokeWidth={1.8} />
              </View>
            </Pressable>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

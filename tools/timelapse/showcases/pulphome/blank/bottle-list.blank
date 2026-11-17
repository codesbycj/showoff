import { Image, Pressable, ScrollView, View } from 'react-native';

import { bottles, money } from '../data/shop';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = {
  margin: number;
  height: number;
  cardH: number;
  radius: number;
  padBottom: number;
  onOpen: () => void;
};

/**
 * The drinks.
 *
 * **The list runs under the dock** rather than stopping above it, which is how
 * the board ends - a card crossing the bottom edge, never a band of empty
 * canvas (I3). The dock's own height plus its clearance is the bottom padding.
 *
 * The caption band and the heart sit wholly inside the card, which is layering
 * by design; `audit.js` only reports a partial overlap (R3).
 */
export function BottleList({ margin, height, cardH, radius, padBottom, onOpen }: Props) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ height }}
      contentContainerStyle={{ paddingHorizontal: margin, gap: 14, paddingBottom: padBottom }}
    >
      {bottles.map((bottle) => (
        <View key={bottle.id} style={{ height: cardH }}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${bottle.name}, ${money(bottle.price)}`}
            onPress={onOpen}
          >
            <View style={{ height: cardH, borderRadius: radius, overflow: 'hidden' }}>
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: ct.card,
                }}
              />

              <Image
                source={bottle.image}
                style={{ width: '100%', height: cardH }}
                resizeMode="cover"
              />

              <View
                style={{
                  position: 'absolute',
                  left: 10,
                  right: 10,
                  bottom: 10,
                  height: 56,
                  borderRadius: 14,
                  backgroundColor: ct.white,
                  paddingHorizontal: 14,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View>
                  <T variant="cardName" numberOfLines={1}>
                    {bottle.name}
                  </T>
                  <T variant="cardSize">{bottle.size}</T>
                </View>
                <T variant="price">{money(bottle.price)}</T>
              </View>
            </View>
          </Pressable>

          <View style={{ position: 'absolute', right: 12, top: 12 }}>
            <Pressable accessibilityRole="button" accessibilityLabel={`Save ${bottle.name}`}>
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: ct.white,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Glyph
                  name="heart"
                  size={18}
                  color={ct.ink}
                  strokeWidth={bottle.saved ? 2.4 : 1.7}
                />
              </View>
            </Pressable>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

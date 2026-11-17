import { Image, Pressable, ScrollView, View } from 'react-native';

import { header, money, rings } from '../data/find';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; width: number; height: number; radius: number; onOpen: () => void };

/**
 * The collection.
 *
 * **A horizontal scroller, not a wrap** (R2): the board crops its second card
 * at the screen edge, which is what tells you the rail scrolls. A wrap layout
 * physically cannot reproduce that.
 *
 * Each card's ground lives on an absolutely-filled child so an emptied card
 * paints nothing during a reveal (SS5.5), and the heart is a **sibling** of
 * the card's `Pressable` - a `role="button"` inside another is torn apart by
 * the static web build's HTML parser (SS7).
 */
export function RingRail({ margin, width, height, radius, onOpen }: Props) {
  const imageH = Math.max(150, height - 190);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ height, flexGrow: 0, flexShrink: 0 }}
      contentContainerStyle={{ paddingHorizontal: margin, gap: 16 }}
    >
      {rings.map((ring) => (
        <View key={ring.id} style={{ width, height }}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${ring.name} ${ring.kind}, ${money(ring.price)}`}
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
                  backgroundColor: ct.cardFoot,
                }}
              />
              {/* The light band runs past the bottom of the photograph, so the
                  picture sits wholly inside it. Two boxes overlapping only in
                  part is the shape an accident has, and `audit.js` reports it
                  as COVERED (R3). */}
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  height: height * 0.84,
                  backgroundColor: ct.cardTop,
                }}
              />

              {/* The title stops short of the heart beside it: a control that
                  straddles text is a FAIL, and the fix is to inset the content
                  rather than move the control (R3). */}
              <View style={{ paddingLeft: 20, paddingRight: 64, paddingTop: 20 }}>
                <T variant="cardName">{ring.name}</T>
                <T variant="cardKind">{ring.kind}</T>
              </View>

              <Image source={ring.image} style={{ width, height: imageH }} resizeMode="contain" />

              <View
                style={{
                  position: 'absolute',
                  left: 20,
                  right: 20,
                  bottom: 18,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <T variant="price">{money(ring.price)}</T>

                <View
                  style={{
                    paddingHorizontal: 16,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: ct.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <T variant="cta">{header.cta}</T>
                </View>
              </View>
            </View>
          </Pressable>

          <View style={{ position: 'absolute', right: 13, top: 13 }}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Save ${ring.name}`}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <View
                style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}
              >
                <View
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 17,
                    backgroundColor: ct.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Glyph
                    name="heart"
                    size={16}
                    color={ring.saved ? ct.blush : ct.muted}
                    filled={!!ring.saved}
                    strokeWidth={1.8}
                  />
                </View>
              </View>
            </Pressable>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

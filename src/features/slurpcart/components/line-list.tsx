import { Image, Pressable, View } from 'react-native';

import { lines } from '../data/cart';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = {
  margin: number;
  height: number;
  image: number;
  radius: number;
  gap: number;
  step: number;
};

/**
 * What is in the cart.
 *
 * Each card's fill sits on an absolutely-filled child so an emptied card
 * paints nothing in frame one of the reveal (I9), and each stepper disc is a
 * **sibling** of the next rather than nested - a `role="button"` inside
 * another is torn apart by the static web build's HTML parser (RULES Part 7).
 */
export function LineList({ margin, height, image, radius, gap, step }: Props) {
  return (
    <View style={{ marginHorizontal: margin, gap }}>
      {lines.map((line) => (
        <View key={line.id} style={{ height, borderRadius: radius, padding: 12 }}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: ct.card,
              borderRadius: radius,
            }}
          />

          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Image
              source={line.image}
              style={{ width: image, height: image, borderRadius: 14 }}
              resizeMode="cover"
            />

            <View style={{ flex: 1, justifyContent: 'space-between' }}>
              <View style={{ gap: 2 }}>
                <T variant="lineName" numberOfLines={1}>
                  {line.name}
                </T>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Glyph name="clock" size={12} color={ct.muted} strokeWidth={1.6} />
                    <T variant="meta">{line.time}</T>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Glyph name="star" size={11} color={ct.accent} strokeWidth={1.4} />
                    <T variant="meta">{line.rating}</T>
                  </View>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 2 }}>
                  <T variant="cur" style={{ marginTop: 3 }}>
                    $
                  </T>
                  <T variant="linePrice">{line.price.toFixed(2)}</T>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`One fewer ${line.name}`}
                  >
                    <View
                      style={{
                        width: step,
                        height: step,
                        borderRadius: step / 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <View
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 14,
                          borderWidth: 1.2,
                          borderColor: ct.line,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Glyph name="minus" size={13} color={ct.ink} strokeWidth={2} />
                      </View>
                    </View>
                  </Pressable>

                  <T variant="qty">{String(line.qty).padStart(2, '0')}</T>

                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`One more ${line.name}`}
                  >
                    <View
                      style={{
                        width: step,
                        height: step,
                        borderRadius: step / 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <View
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 14,
                          backgroundColor: ct.dark,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Glyph name="plus" size={13} color={ct.onDark} strokeWidth={2} />
                      </View>
                    </View>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

import { Image } from 'expo-image';
import { useId, useState } from 'react';
import { Pressable, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { ct, radius, type } from '../theme';
import { stay } from '../data/home';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * The stay being pushed: a photograph with its name, place and rating laid
 * over the foot of it, and a save control.
 *
 * **The heart is a sibling of the card, not a child of it.** A `Pressable`
 * with `accessibilityRole="button"` inside another one renders as a nested
 * `<button>`, which the static web build's HTML parser is not allowed to
 * keep — it tears the inner one out and re-parents everything after it. The
 * card is one button; the heart is another, absolutely positioned over it.
 *
 * The overlay bar is a flat scrim over a gradient rather than `expo-blur`.
 * A backdrop filter renders one way on the web harness and another on
 * Android, and the harness cannot see the difference.
 */
export function StayCard({ height, onPress }: { height: number; onPress?: () => void }) {
  const id = `wanderStay-${useId()}`;
  const [saved, setSaved] = useState(false);

  return (
    <View style={{ height }}>
      <Pressable accessibilityRole="button" accessibilityLabel={stay.name} onPress={onPress}>
        <View style={{ height, borderRadius: radius.card, overflow: 'hidden' }}>
          <Image
            source={stay.photo}
            style={{ position: 'absolute', width: '100%', height }}
            contentFit="cover"
          />
          <Svg width="100%" height={height} style={{ position: 'absolute' }}>
            <Defs>
              <LinearGradient id={id} x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0.5" stopColor="#05060A" stopOpacity="0" />
                <Stop offset="1" stopColor="#05060A" stopOpacity="0.5" />
              </LinearGradient>
            </Defs>
            <Rect x="0" y="0" width="100%" height={height} fill={`url(#${id})`} />
          </Svg>

          <View style={{ flex: 1, padding: 12, justifyContent: 'flex-end', zIndex: 1 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 14,
                backgroundColor: 'rgba(16,16,20,0.52)',
                paddingHorizontal: 14,
                paddingVertical: 11,
              }}
            >
              <View style={{ flex: 1 }}>
                <T variant="stayName" color={ct.onPage} style={{ height: type.stayName.line }}>
                  {stay.name}
                </T>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                  <Glyph name="pin" size={13} tint="rgba(255,255,255,0.86)" strokeWidth={1.8} />
                  <T
                    variant="stayPlace"
                    color="rgba(255,255,255,0.88)"
                    style={{ height: type.stayPlace.line, marginLeft: 4 }}
                  >
                    {stay.place}
                  </T>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: ct.sheet,
                  borderRadius: 12,
                  paddingHorizontal: 10,
                  height: 32,
                }}
              >
                <Glyph name="star" size={13} tint={ct.ink} />
                <T
                  variant="rating"
                  color={ct.ink}
                  style={{ height: type.rating.line, marginLeft: 5 }}
                >
                  {stay.rating}
                </T>
              </View>
            </View>
          </View>
        </View>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={saved ? 'Saved' : 'Save this stay'}
        onPress={() => setSaved((v) => !v)}
        style={{ position: 'absolute', top: 12, right: 12 }}
      >
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            backgroundColor: 'rgba(18,18,22,0.46)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Glyph name="heart" size={21} tint={ct.onPage} filled={saved} strokeWidth={1.9} />
        </View>
      </Pressable>
    </View>
  );
}

import { Image, Pressable, View } from 'react-native';

import { drink } from '../data/item';
import { ct } from '../theme';
import { Glyph } from './glyph';

type Props = { margin: number; height: number; radius: number; topH: number; onBack: () => void };

/**
 * The photograph, and the two controls the board floats over the page above it.
 *
 * The drink is a picture of a drink, so it is a photograph; the chevron and
 * the overflow dots are interface, so they are vectors (I4).
 *
 * The card's fill sits on an absolutely-filled child, so an emptied card paints
 * nothing in frame one of the reveal (I9).
 */
export function ItemHero({ margin, height, radius, topH, onBack }: Props) {
  return (
    <View>
      <View
        style={{
          marginHorizontal: margin,
          height: topH,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Pressable accessibilityRole="button" accessibilityLabel="Back" onPress={onBack}>
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
            <Glyph name="back" size={18} color={ct.ink} strokeWidth={1.9} />
          </View>
        </Pressable>

        <Pressable accessibilityRole="button" accessibilityLabel="More">
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
            <Glyph name="more" size={18} color={ct.ink} strokeWidth={1.9} />
          </View>
        </Pressable>
      </View>

      <View style={{ height: 14 }} />

      {/* STEP 1.02 image
      <View style={{ marginHorizontal: margin, height, borderRadius: radius, overflow: 'hidden' }}>
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
          source={drink.image}
          style={{ width: '100%', height }}
          resizeMode="cover"
          accessibilityIgnoresInvertColors
        />
      </View>
      */}
    </View>
  );
}

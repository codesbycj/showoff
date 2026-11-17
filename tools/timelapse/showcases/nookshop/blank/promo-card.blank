import { Image, Pressable, View } from 'react-native';

import { promo } from '../data/shop';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number; radius: number; onPress: () => void };

/**
 * The offer the board ends its catalog on.
 *
 * The blue fill lives on an absolutely-filled child, so an emptied card paints
 * nothing during a reveal rather than opening the take on a blue slab (SS5.5).
 */
export function PromoCard({ margin, height, radius, onPress }: Props) {
  return (
    <View style={{ marginHorizontal: margin, height }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: radius,
          backgroundColor: ct.promo,
        }}
      />

      {/* The headline stops short of the piece beside it. R3: a surface may
          not straddle the content it covers, and the fix is to inset the
          content rather than nudge the control - the image ran under the last
          two words and `audit.js` reported it as covering text. */}
      <View style={{ paddingLeft: 18, paddingRight: height * 0.62 + 18, paddingTop: 16 }}>
        {/* STEP 1.20 line
        <T variant="promo">{promo.line}</T>
        */}
      </View>

      {/* STEP 1.21 image
      <Image
        source={promo.image}
        style={{
          position: 'absolute',
          right: 10,
          bottom: 44,
          width: height * 0.62,
          height: height * 0.62,
        }}
        resizeMode="contain"
      />
      */}

      {/* STEP 1.22 cta
      <View style={{ position: 'absolute', left: 14, right: 14, bottom: 14 }}>
        <Pressable accessibilityRole="button" accessibilityLabel={promo.cta} onPress={onPress}>
          <View
            style={{
              height: 44,
              borderRadius: 22,
              backgroundColor: ct.white,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
            }}
          >
            <T variant="promoCta">{promo.cta}</T>

            <View style={{ zIndex: 1 }}>
              <Glyph name="plus" size={16} color={ct.ink} strokeWidth={2} />
            </View>
          </View>
        </Pressable>
      </View>
      */}
    </View>
  );
}

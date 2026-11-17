import { Image, Pressable, View } from 'react-native';

import { NIGHTS, type Result } from '../data/search';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = {
  result: Result;
  width: number;
  photoH: number;
  radius: number;
  onPress?: () => void;
};

/**
 * One search result.
 *
 * **R9: the total is computed, never typed** — `nightly * NIGHTS`.
 *
 * **The heart is a sibling of the card's own Pressable, not a child.** A
 * `role="button"` inside another is torn apart by the static web build's HTML
 * parser, and it is the console that says so, not the screen.
 */
export function ResultCard({ result, width, photoH, radius, onPress }: Props) {
  const total = result.nightly * NIGHTS;

  return (
    <View
      style={{
        width,
        borderRadius: radius,
        backgroundColor: ct.surface,
        padding: 8,
        shadowColor: '#1C1B1A',
        shadowOpacity: 0.07,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 6 },
        elevation: 3,
      }}
    >
      <Pressable accessibilityRole="button" accessibilityLabel={result.title} onPress={onPress}>
        {/* STEP 1.19 image
        <Image
          source={result.image}
          style={{ width: width - 16, height: photoH, borderRadius: radius - 4 }}
          resizeMode="cover"
        />
        */}

        <View style={{ paddingHorizontal: 6, paddingTop: 10, paddingBottom: 2 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            {/* STEP 1.20 title
            <T variant="cardTitle" numberOfLines={1} style={{ flex: 1 }}>
              {result.title}
            </T>
            */}
            {/* STEP 1.21 glyph
            <Glyph name="star" size={14} color={ct.star} />
            */}
            {/* STEP 1.22 t
            <T variant="rating">
              {result.rating.toFixed(2)} ({result.reviews})
            </T>
            */}
          </View>

          {/* STEP 1.23 t
          <T variant="meta" numberOfLines={1}>
            {result.facts.join(' · ')}
          </T>
          */}

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            {/* STEP 1.24 t
            <T variant="priceWas">€{result.wasNight}</T>
            */}
            {/* STEP 1.25 t
            <T variant="priceNow">€{result.nightly} night</T>
            */}
            {/* STEP 1.26 t
            <T variant="priceTotal">· €{total} total</T>
            */}
          </View>
        </View>
      </Pressable>

      {/* STEP 1.27 glyph
      <View style={{ position: 'absolute', top: 18, right: 18 }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={result.saved ? 'Saved' : 'Save'}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
        >
          <View
            style={{
              width: 34,
              height: 34,
              borderRadius: 17,
              backgroundColor: ct.float,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph name="heart" size={18} color={ct.white} strokeWidth={1.9} />
          </View>
        </Pressable>
      </View>
      */}
    </View>
  );
}

import { LinearGradient } from 'expo-linear-gradient';
import { Image, Pressable, View } from 'react-native';

import { promo, promoPhoto } from '../data/shop';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; height: number; radius: number; photoW: number; ctaH: number };

/**
 * The sale banner.
 *
 * **The fill is on an absolutely-filled child**, carrying the clip with it, so
 * a reveal that stages the headline and the model does not open on a solid
 * black slab (§5.5 / I9).
 *
 * The clip lives on that child and `elevation` does not: Android is unreliable
 * with `overflow: 'hidden'` and `elevation` on the same View (Part 7), so the
 * card is flat by design rather than shadowed.
 *
 * The model is a **photograph** (I4). The board's is the brand's own; this is
 * free-licensed stock standing in for it, credited in `CREDITS.md`.
 */
export function PromoCard({ margin, height, radius, photoW, ctaH }: Props) {
  return (
    <View style={{ marginHorizontal: margin, height, padding: 18 }}>
      {/* STEP 1.08 image
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: radius,
          backgroundColor: ct.promo,
          overflow: 'hidden',
        }}
      >
        <Image
          source={promoPhoto}
          style={{ position: 'absolute', right: 0, bottom: 0, width: photoW, height }}
          resizeMode="cover"
        />
        <LinearGradient
          colors={[ct.promo, ct.promo, 'rgba(27,27,27,0)']}
          locations={[0, 0.56, 1]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
          pointerEvents="none"
        />
      </View>
      */}

      {/* STEP 1.09 t
      {promo.lines.map((line) => (
        <T key={line} variant="promo">
          {line}
        </T>
      ))}
      */}

      {/* STEP 1.10 lead
      <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 2 }}>
        <T variant="promoLead">{promo.emphasis.lead}</T>
        <T variant="promoValue">{promo.emphasis.value}</T>
      </View>
      */}

      {/* STEP 1.11 cta
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={promo.cta}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={{ alignSelf: 'flex-start' }}
        >
          {({ pressed }) => (
            <View
              style={{
                height: ctaH,
                paddingHorizontal: 18,
                borderRadius: ctaH / 2,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: ct.accent,
                opacity: pressed ? 0.8 : 1,
              }}
            >
              <T variant="promoCta">{promo.cta}</T>
            </View>
          )}
        </Pressable>
      </View>
      */}

      {/* STEP 1.12 the next block

      */}
      {/* STEP 1.13 view
      <View
        style={{
          position: 'absolute',
          right: 16,
          bottom: 12,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
        }}
      >
        {Array.from({ length: promo.pages }, (_, i) => (
          <View
            key={i}
            style={{
              width: i === promo.active ? 14 : 5,
              height: 5,
              borderRadius: 2.5,
              backgroundColor: i === promo.active ? ct.accent : ct.onDarkSub,
            }}
          />
        ))}
      </View>
      */}
    </View>
  );
}

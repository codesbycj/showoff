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
        {/* The photograph's own ground is a light studio sweep, so without this
            it meets the card's black on a hard vertical seam. The gradient runs
            left to right, which `expo-linear-gradient` handles; only a
            *diagonal* is mirrored on web (Part 7). */}
        <LinearGradient
          colors={[ct.promo, ct.promo, 'rgba(27,27,27,0)']}
          locations={[0, 0.56, 1]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
          pointerEvents="none"
        />
      </View>

      {promo.lines.map((line) => (
        <T key={line} variant="promo">
          {line}
        </T>
      ))}

      <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 2 }}>
        <T variant="promoLead">{promo.emphasis.lead}</T>
        <T variant="promoValue">{promo.emphasis.value}</T>
      </View>

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

      {/* The pager. The active dot is a bar, as the board draws it. */}
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
    </View>
  );
}

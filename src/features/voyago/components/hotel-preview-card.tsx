import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { ArrowRight, Star } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { FONT, R, SP, alpha, vy } from '../theme';

/** The photo strip is 144dp of the card's right edge, under a fade to the fill. */
const STRIP = 144;

/**
 * The single hotel teaser under "Recommended Hotels" on home.
 *
 * The photograph is not a background — it occupies a fixed 144dp strip on the
 * right and is faded back into the card by a horizontal gradient, so the name
 * and the price sit on flat fill rather than on image. That is three layers,
 * and all three are expressible here: `opacity-60` on the image, and a real
 * `LinearGradient` for the fade. Nothing needs baking, unlike the hero card.
 *
 * Shadow and clip are split across two views, as everywhere else in this
 * showcase: Android is unreliable with `overflow: 'hidden'` and `elevation` on
 * the same node, and the strip has to be cut to the 24dp corner.
 *
 * The export fills this card `#0F1722`, a fourth near-black that appears
 * nowhere else. It is drawn in the showcase's unified `night` — see `theme.ts`.
 */
export function HotelPreviewCard({
  name,
  price,
  per,
  rating,
  image,
  onPress,
}: {
  name: string;
  price: string;
  per: string;
  rating: string;
  image: number;
  onPress?: () => void;
}) {
  return (
    <View
      style={{
        borderRadius: R.xl,
        shadowColor: vy.ink,
        shadowOpacity: 0.12,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
      }}
    >
      <View
        style={{
          borderRadius: R.xl,
          overflow: 'hidden',
          backgroundColor: vy.night,
        }}
      >
        <View
          style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: STRIP, opacity: 0.6 }}
        >
          <Image source={image} style={{ width: '100%', height: '100%' }} contentFit="cover" />
          <LinearGradient
            colors={[vy.night, alpha(vy.night, 0.5), alpha(vy.night, 0)]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: SP.lg,
          }}
        >
          <View style={{ maxWidth: 210, gap: SP.xs }}>
            <Text
              style={{
                fontFamily: FONT.bold,
                fontSize: 14,
                lineHeight: 17.5,
                color: vy.white,
              }}
            >
              {name}
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm, paddingTop: 2 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'baseline',
                  gap: 3,
                  backgroundColor: alpha(vy.white, 0.1),
                  borderRadius: R.full,
                  paddingHorizontal: SP.sm,
                  paddingVertical: 2,
                }}
              >
                <Text
                  style={{
                    fontFamily: FONT.semibold,
                    fontSize: 12,
                    lineHeight: 16,
                    color: alpha(vy.white, 0.9),
                  }}
                >
                  {price}
                </Text>
                <Text
                  style={{
                    fontFamily: FONT.regular,
                    fontSize: 9,
                    lineHeight: 12,
                    color: alpha(vy.white, 0.7),
                  }}
                >
                  {per}
                </Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.xs }}>
                <Star size={10} color={vy.star} fill={vy.star} strokeWidth={0} />
                <Text
                  style={{
                    fontFamily: FONT.bold,
                    fontSize: 12,
                    lineHeight: 16,
                    color: vy.star,
                  }}
                >
                  {rating}
                </Text>
              </View>
            </View>
          </View>

          <Pressable
            onPress={onPress}
            accessibilityRole="button"
            accessibilityLabel={`View ${name}`}
          >
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: R.full,
                backgroundColor: vy.canvas,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <View style={{ transform: [{ rotate: '-45deg' }] }}>
                <ArrowRight size={14} color={vy.night} strokeWidth={2.5} />
              </View>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

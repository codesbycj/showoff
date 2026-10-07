import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Text, View } from 'react-native';

import { ELEV, R, SP, TYPE, alpha, tx } from '../theme';

import { FilledIcon } from './filled-icon';
import { Symbol } from './symbol';

/**
 * The 4:5 hero destination card.
 *
 * Its scrim is a real `LinearGradient` rather than a baked overlay: the card
 * beneath is a photograph with nothing composited over it, so nothing needs
 * flattening — unlike Voyago's hero, where CSS filters forced a bake.
 *
 * `backdrop-blur` on the two floating controls and the action capsule is
 * dropped. React Native has no backdrop filter, and over a scrim this dark the
 * fills the export sets land on effectively the same colour.
 *
 * Shadow and clip are on two different views: `overflow: 'hidden'` together
 * with `elevation` on one node is unreliable on Android, and this card needs
 * the clip for the 28dp radius and the lift for the spec's level-2 shadow.
 */
export function HeroCard({
  badge,
  country,
  tagline,
  name,
  rating,
  reviews,
  cta,
  price,
  image,
  saved,
  onToggleSave,
  onPress,
}: {
  badge: string;
  country: string;
  tagline: string;
  name: string;
  rating: string;
  reviews: string;
  cta: string;
  price: string;
  image: number;
  saved: boolean;
  onToggleSave?: () => void;
  onPress?: () => void;
}) {
  return (
    <View style={{ marginHorizontal: SP.margin, borderRadius: 28, ...ELEV.floating }}>
      <View style={{ aspectRatio: 4 / 5, borderRadius: 28, overflow: 'hidden' }}>
        <Image
          source={image}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          contentFit="cover"
        />

        <LinearGradient
          colors={[alpha(tx.primary, 0.1), alpha(tx.primary, 0.25), alpha(tx.primary, 0.9)]}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          pointerEvents="none"
        />

        <View
          style={{
            position: 'absolute',
            top: SP.md,
            left: SP.md,
            right: SP.md,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              paddingHorizontal: SP.md - 4,
              paddingVertical: 6,
              borderRadius: R.full,
              backgroundColor: alpha(tx.primary, 0.4),
            }}
          >
            <View
              style={{
                width: 6,
                height: 6,
                borderRadius: R.full,
                backgroundColor: tx.secondaryContainer,
              }}
            />
            <Text style={{ ...TYPE.labelSm, color: tx.onPrimary }}>{badge}</Text>
          </View>

          <Pressable
            onPress={onToggleSave}
            accessibilityRole="button"
            accessibilityLabel={`${saved ? 'Remove' : 'Add'} ${name} ${saved ? 'from' : 'to'} favourites`}
          >
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: R.full,
                backgroundColor: alpha(tx.primary, 0.3),
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {saved ? (
                <FilledIcon name="favorite" size={20} color={tx.secondaryContainer} />
              ) : (
                <Symbol name="favorite" size={20} color={tx.onPrimary} />
              )}
            </View>
          </Pressable>
        </View>

        <View
          style={{
            position: 'absolute',
            left: SP.md,
            right: SP.md,
            bottom: SP.md,
            gap: SP.md - 4,
          }}
        >
          <View style={{ paddingHorizontal: SP.xs }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm }}>
              <Text
                style={{ ...TYPE.labelMd, letterSpacing: 0.6, color: alpha(tx.onPrimary, 0.8) }}
              >
                {country.toUpperCase()}
              </Text>
              <View
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: R.full,
                  backgroundColor: alpha(tx.onPrimary, 0.6),
                }}
              />
              <Text style={{ ...TYPE.labelMd, color: alpha(tx.onPrimary, 0.9) }}>{tagline}</Text>
            </View>

            <Text style={{ ...TYPE.headlineXl, color: tx.onPrimary }}>{name}</Text>

            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm, marginTop: SP.xs }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.xs }}>
                <FilledIcon name="star" size={18} color={tx.star} />
                <Text style={{ ...TYPE.labelLg, color: tx.onPrimary }}>{rating}</Text>
              </View>
              <Text style={{ ...TYPE.labelMd, color: alpha(tx.onPrimary, 0.4) }}>•</Text>
              <Text
                style={{
                  ...TYPE.bodySm,
                  color: alpha(tx.onPrimary, 0.9),
                  textDecorationLine: 'underline',
                }}
              >
                {reviews}
              </Text>
            </View>
          </View>

          <Pressable onPress={onPress}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingLeft: SP.md + 4,
                paddingRight: SP.sm,
                paddingVertical: SP.sm,
                borderRadius: R.full,
                backgroundColor: alpha(tx.primary, 0.8),
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm }}>
                <Text style={{ ...TYPE.labelLg, letterSpacing: 0.3, color: tx.onPrimary }}>
                  {cta}
                </Text>
                <Text style={{ ...TYPE.bodySm, color: alpha(tx.onPrimary, 0.6) }}>{price}</Text>
              </View>

              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: R.full,
                  backgroundColor: tx.surfaceContainerLowest,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Symbol name="arrowForward" size={20} color={tx.primary} />
              </View>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

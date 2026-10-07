import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Text, View } from 'react-native';

import { type SavedCollection } from '../data/saved';
import { ELEV, R, SP, TYPE, alpha, tx } from '../theme';

import { FilledIcon } from './filled-icon';
import { Symbol } from './symbol';

/**
 * One saved collection — a 16:11 photo card with everything floating on it.
 *
 * The heart here is always filled and always terracotta: these are the saved
 * list, so the control removes rather than adds. That is the only place in the
 * showcase where the filled heart is the resting state.
 *
 * In the reference's own render the "12 tours available" pill overlaps the
 * destination name, and on the Kyoto card the photo's own caption collides with
 * the title. Both are render artifacts — the markup places the pill at the top
 * and the title at the bottom — and neither is reproduced.
 */
export function SavedCard({
  item,
  onRemove,
  onPress,
}: {
  item: SavedCollection;
  onRemove?: () => void;
  onPress?: () => void;
}) {
  return (
    <View
      style={{ marginHorizontal: SP.margin, borderRadius: R.lg, ...ELEV.card, shadowOpacity: 0.06 }}
    >
      <View style={{ aspectRatio: 16 / 11, borderRadius: R.lg, overflow: 'hidden' }}>
        <Image
          source={item.image}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          contentFit="cover"
        />

        <LinearGradient
          colors={['transparent', alpha(tx.black, 0.25), alpha(tx.black, 0.75)]}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          pointerEvents="none"
        />

        <View
          style={{
            position: 'absolute',
            top: 14,
            left: 14,
            right: 14,
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              paddingHorizontal: SP.md - 4,
              paddingVertical: SP.xs,
              borderRadius: R.full,
              backgroundColor: alpha(tx.black, 0.4),
            }}
          >
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: R.full,
                backgroundColor: item.pending ? '#fbbf24' : '#34d399',
              }}
            />
            <Text style={{ ...TYPE.labelSm, color: tx.onPrimary }}>{item.tours}</Text>
          </View>

          <Pressable
            onPress={onRemove}
            accessibilityRole="button"
            accessibilityLabel={`Remove ${item.name} from wishlist`}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: R.full,
                backgroundColor: alpha(tx.white, 0.9),
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FilledIcon name="favorite" size={20} color={tx.secondary} />
            </View>
          </Pressable>
        </View>

        <View
          style={{
            position: 'absolute',
            left: SP.md,
            right: SP.md,
            bottom: SP.md,
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: SP.sm,
          }}
        >
          <View style={{ flexShrink: 1 }}>
            <Text style={{ ...TYPE.labelSm, letterSpacing: 0.5, color: alpha(tx.white, 0.8) }}>
              {item.country.toUpperCase()}
            </Text>
            <Text style={{ ...TYPE.headlineMd, color: tx.white }}>{item.name}</Text>

            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm, marginTop: SP.xs }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: SP.xs,
                  paddingHorizontal: SP.sm,
                  paddingVertical: 2,
                  borderRadius: R.full,
                  backgroundColor: alpha(tx.white, 0.2),
                }}
              >
                <FilledIcon name="star" size={13} color={tx.star} />
                <Text style={{ ...TYPE.labelSm, color: tx.white }}>{item.rating}</Text>
              </View>

              <Text
                style={{
                  ...TYPE.bodySm,
                  color: alpha(tx.white, 0.9),
                  textDecorationLine: 'underline',
                }}
              >
                {item.reviews}
              </Text>
            </View>
          </View>

          <Pressable
            onPress={onPress}
            accessibilityRole="button"
            accessibilityLabel={`Explore ${item.name}`}
          >
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: R.full,
                backgroundColor: tx.onPrimary,
                alignItems: 'center',
                justifyContent: 'center',
                ...ELEV.floating,
              }}
            >
              <Symbol name="arrowForward" size={22} color={tx.primary} />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

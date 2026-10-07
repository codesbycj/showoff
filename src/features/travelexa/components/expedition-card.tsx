import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Text, View } from 'react-native';

import { type Expedition } from '../data/discover';
import { ELEV, R, SP, TYPE, alpha, tx } from '../theme';

import { FilledIcon } from './filled-icon';
import { Symbol } from './symbol';

/** The card's own width in the carousel, as the export's `min-w-[280px]`. */
const CARD = 280;

/**
 * One trending expedition.
 *
 * Its photo panel is 288dp tall with the overlay text inside it, and a white
 * footer strip beneath carrying the recommended stay — so the card clips once,
 * at its own 16dp radius, and the photo fills the top of that clip rather than
 * carrying a radius of its own.
 *
 * The first card's badge inverts (dark fill, light text) where the rest are
 * pale on dark; that is `badgeDark` on the datum rather than an index check,
 * because it marks the ranked entry, not the first position.
 *
 * In the reference's own render the rating line and the destination name
 * collide — "4.9 (142 experiences)" sits on top of "Kyoto, Japan". They are
 * separate rows in the markup with a 4dp gap, so that is a render artifact and
 * is not reproduced.
 */
export function ExpeditionCard({
  item,
  saved,
  onToggleSave,
  onPress,
}: {
  item: Expedition;
  saved: boolean;
  onToggleSave?: () => void;
  onPress?: () => void;
}) {
  return (
    <View
      style={{
        width: CARD,
        borderRadius: R.DEFAULT,
        overflow: 'hidden',
        backgroundColor: tx.surfaceContainerLowest,
        ...ELEV.card,
      }}
    >
      <View style={{ height: 288 }}>
        <Image
          source={item.image}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          contentFit="cover"
        />

        <LinearGradient
          colors={[alpha(tx.black, 0.3), 'transparent', alpha(tx.primary, 0.8)]}
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
              paddingHorizontal: 10,
              paddingVertical: SP.xs,
              borderRadius: R.full,
              backgroundColor: item.badgeDark ? tx.primary : alpha(tx.surfaceContainerHighest, 0.9),
            }}
          >
            <Text
              style={{
                ...TYPE.labelSm,
                letterSpacing: 0.4,
                color: item.badgeDark ? tx.onPrimary : tx.onSurface,
              }}
            >
              {item.badgeDark ? item.badge.toUpperCase() : item.badge}
            </Text>
          </View>

          <Pressable
            onPress={onToggleSave}
            accessibilityRole="button"
            accessibilityLabel={`${saved ? 'Unsave' : 'Save'} ${item.name}`}
          >
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: R.full,
                backgroundColor: alpha(tx.surface, 0.9),
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {saved ? (
                <FilledIcon name="favorite" size={20} color={tx.secondary} />
              ) : (
                <Symbol name="favorite" size={20} color={tx.onSurface} />
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
            gap: SP.xs,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <FilledIcon name="star" size={16} color={tx.star} />
            <Text style={{ ...TYPE.labelSm, color: alpha(tx.onPrimary, 0.9) }}>{item.rating}</Text>
            <Text style={{ ...TYPE.labelSm, color: alpha(tx.onPrimary, 0.75) }}>
              {item.experiences}
            </Text>
          </View>

          <Text style={{ ...TYPE.headlineSm, color: tx.onPrimary }}>{item.name}</Text>
          <Text numberOfLines={1} style={{ ...TYPE.bodySm, color: alpha(tx.onPrimary, 0.8) }}>
            {item.blurb}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: SP.md,
          gap: SP.sm,
        }}
      >
        <View style={{ flexShrink: 1 }}>
          <Text style={{ ...TYPE.labelSm, color: tx.onSurfaceVariant }}>{item.stayLabel}</Text>
          <Text numberOfLines={1} style={{ ...TYPE.labelMd, color: tx.onSurface }}>
            {item.stay}
          </Text>
        </View>

        <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel="Open itinerary">
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: R.full,
              backgroundColor: tx.primary,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Symbol name="arrowForward" size={20} color={tx.onPrimary} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

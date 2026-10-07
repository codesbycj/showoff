import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { type UpcomingTour } from '../data/destination';
import { ELEV, R, SP, TYPE, alpha, tx } from '../theme';

import { FilledIcon } from './filled-icon';
import { Symbol } from './symbol';

/** The card's own width in the carousel, as the export's `w-[240px]`. */
const CARD = 240;

/**
 * One upcoming tour on the destination screen.
 *
 * Narrower than home's tour card and with a shorter photo, which is why the two
 * are separate components: sharing them would mean threading four size props
 * through a card whose whole shape is those sizes. The copy and the controls are
 * the same; nothing else is.
 */
export function UpcomingCard({
  tour,
  saved,
  onToggleSave,
  onPress,
}: {
  tour: UpcomingTour;
  saved: boolean;
  onToggleSave?: () => void;
  onPress?: () => void;
}) {
  return (
    <View
      style={{
        width: CARD,
        borderRadius: R.DEFAULT,
        backgroundColor: tx.surfaceContainerLowest,
        padding: SP.sm + 2,
        ...ELEV.card,
      }}
    >
      <View>
        <View style={{ height: 148, borderRadius: 12, overflow: 'hidden' }}>
          <Image source={tour.image} style={{ width: '100%', height: '100%' }} contentFit="cover" />
        </View>

        <Pressable
          onPress={onToggleSave}
          style={{ position: 'absolute', top: 10, right: 10 }}
          accessibilityRole="button"
          accessibilityLabel={`${saved ? 'Unsave' : 'Save'} ${tour.name}`}
        >
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: R.full,
              backgroundColor: alpha(tx.surfaceContainerLowest, 0.85),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {saved ? (
              <FilledIcon name="favorite" size={16} color={tx.secondary} />
            ) : (
              <Symbol name="favorite" size={16} color={tx.onSurface} />
            )}
          </View>
        </Pressable>
      </View>

      <View style={{ marginTop: SP.md - 4 }}>
        <Text
          numberOfLines={1}
          style={{ ...TYPE.headlineSm, fontSize: 16, lineHeight: 22, color: tx.onSurface }}
        >
          {tour.name}
        </Text>
        <Text style={{ ...TYPE.bodySm, marginTop: 2, color: tx.onSurfaceVariant }}>
          {tour.meta}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: SP.sm,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.xs }}>
            <FilledIcon name="star" size={14} color={tx.onSurface} />
            <Text style={{ ...TYPE.labelMd, color: tx.onSurface }}>{tour.rating}</Text>
            <Text
              style={{
                ...TYPE.labelSm,
                marginLeft: SP.xs,
                color: tx.onSurfaceVariant,
                textDecorationLine: 'underline',
              }}
            >
              {tour.reviews}
            </Text>
          </View>

          <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel="View tour">
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: R.full,
                backgroundColor: tx.primary,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Symbol name="arrowForward" size={16} color={tx.onPrimary} />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

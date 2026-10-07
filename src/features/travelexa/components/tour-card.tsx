import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { type Tour } from '../data/home';
import { ELEV, R, SP, TYPE, alpha, tx } from '../theme';

import { FilledIcon } from './filled-icon';
import { Symbol } from './symbol';

/** The card's own width in the carousel, as the export's `w-64`. */
const CARD = 256;

/**
 * One tour in the horizontal carousel.
 *
 * The photo is clipped to a 12dp radius inside the card's 16dp one, which is
 * the design system's "rounded content tiles" rule — the image never shares the
 * card's corner. The save button sits over the photo, so the photo carries its
 * own clip and the button is a sibling of the clipping view rather than a child.
 *
 * The heart is outlined when unsaved and filled terracotta when saved. The
 * outlined one comes from the icon font; the filled one from the path set,
 * because the packaged Material Symbols static has no FILL axis.
 */
export function TourCard({
  tour,
  saved,
  onToggleSave,
  onPress,
}: {
  tour: Tour;
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
        padding: SP.sm,
        ...ELEV.card,
      }}
    >
      <View>
        <View style={{ aspectRatio: 4 / 3, borderRadius: 12, overflow: 'hidden' }}>
          <Image source={tour.image} style={{ width: '100%', height: '100%' }} contentFit="cover" />
        </View>

        <Pressable
          onPress={onToggleSave}
          style={{ position: 'absolute', top: SP.sm, right: SP.sm }}
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

      <View style={{ paddingHorizontal: SP.xs, marginTop: SP.sm }}>
        <Text numberOfLines={1} style={{ ...TYPE.headlineSm, color: tx.onSurface }}>
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
            marginTop: SP.md - 4,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.xs }}>
            <FilledIcon name="star" size={16} color={tx.star} />
            <Text style={{ ...TYPE.labelMd, color: tx.onSurface }}>{tour.rating}</Text>
            <Text style={{ ...TYPE.bodySm, color: tx.onSurfaceVariant }}>{tour.reviews}</Text>
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

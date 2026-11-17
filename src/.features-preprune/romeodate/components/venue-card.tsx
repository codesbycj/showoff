import { View } from 'react-native';

import { venue } from '../data/book';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number; radius: number };

/**
 * The navy card naming what is being booked.
 *
 * **The fill is an absolutely-filled child, not the container.** Staging the
 * card's three lines would otherwise leave its `backgroundColor` live and the
 * take would open on an empty navy slab (§5.5, I9). The shadow rides on the
 * same child, or an emptied card paints its padding as a strip with a shadow.
 */
export function VenueCard({ margin, height, radius }: Props) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        paddingHorizontal: 16,
        justifyContent: 'center',
        gap: 5,
      }}
    >
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: radius,
          backgroundColor: ct.navy,
          shadowColor: '#0B1220',
          shadowOpacity: 0.12,
          shadowRadius: 14,
          shadowOffset: { width: 0, height: 6 },
          elevation: 3,
        }}
      />

      <T variant="venueName">{venue.name}</T>
      <T variant="venueMeta">{venue.tags}</T>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
        <Glyph name="pin" size={13} color={ct.navySub} strokeWidth={1.7} />
        <T variant="venueMeta">{venue.address}</T>
      </View>
    </View>
  );
}

import { View } from 'react-native';

import { Icon } from './icon';
import { T } from './text';
import type { Amenity } from '../data/boat';
import { radius, shadow, mr } from '../theme';

/**
 * What comes with the boat.
 *
 * **A wrap, not a scrolling row.** The reference shows four chips on two
 * lines, with the fourth starting a new line rather than being clipped by the
 * screen edge — which is the signature of a wrap.
 */
export function AmenityChips({ amenities }: { amenities: Amenity[] }) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
      {amenities.map((a) => (
        <View
          key={a.id}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            backgroundColor: mr.surface,
            borderRadius: radius.full,
            // MISTAKE 1.22 they came in one to a line
            flexBasis: '100%',
            paddingHorizontal: 13,
            paddingVertical: 10,
            ...shadow.chip,
          }}
        >
          <Icon name={a.icon} size={16} color={mr.ink} />
          <T variant="label" color={mr.ink}>
            {a.label}
          </T>
        </View>
      ))}
    </View>
  );
}

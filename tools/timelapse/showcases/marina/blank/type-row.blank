import { View } from 'react-native';

import { Icon } from './icon';
import { T } from './text';
import { radius, mr } from '../theme';

/**
 * The boat's category on the left, its rating on the right.
 *
 * The pill takes the deeper of the two blues and the button downstairs takes
 * the lighter one. That difference is in the reference and it is doing work:
 * the pill is a *label* and the button is an *action*.
 */
export function TypeRow({
  kind,
  rating,
  reviews,
}: {
  kind: string;
  rating: string;
  reviews: string;
}) {
  return (
    <View
      style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
    >
      {/* STEP 1.10 what kind of boat it is
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          backgroundColor: mr.brand,
          borderRadius: radius.full,
          paddingHorizontal: 18,
          paddingVertical: 11,
        }}
      >
        <Icon name="boat" size={18} color={mr.onBrand} />
        <T variant="label" color={mr.onBrand}>
          {kind}
        </T>
      </View>
      */}

      {/* STEP 1.11 and what people made of it
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        <Icon name="star" size={17} color={mr.star} filled />
        <T variant="rating" color={mr.ink}>
          {rating}
        </T>
        <T variant="small" color={mr.inkSoft}>
          ({reviews})
        </T>
      </View>
      */}
    </View>
  );
}

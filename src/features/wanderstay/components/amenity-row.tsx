import { View } from 'react-native';

import { AMENITY_H } from '../layout';
import { ct, type } from '../theme';
import { amenities } from '../data/stay';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * What the place has: four tiles of equal width, sized from the window so
 * they stay equal at another screen width instead of the last one wrapping.
 */
export function AmenityRow({ tileW }: { tileW: number }) {
  return (
    <View style={{ flexDirection: 'row', height: AMENITY_H }}>
      {amenities.map((a, i) => (
        <View
          key={a.id}
          style={{
            width: tileW,
            height: AMENITY_H,
            marginLeft: i === 0 ? 0 : 8,
            borderRadius: 14,
            backgroundColor: '#F2F3F5',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Glyph name={a.icon} size={22} tint={ct.ink} strokeWidth={1.7} />
          <T
            variant="amenity"
            color={ct.ink}
            numberOfLines={1}
            style={{ height: type.amenity.line, marginTop: 8 }}
          >
            {a.label}
          </T>
        </View>
      ))}
    </View>
  );
}

import { View } from 'react-native';

import {
  PRICE,
  about,
  amenities,
  facts,
  pricing,
  usd,
  venue,
  yearSaving,
  yearly,
} from '../data/gym';
import { ct } from '../theme';
import { T } from './text';

import { FactProps } from './_gym-body-shared';

/**
 * Hours, size, and how much is on.
 *
 * **Mine, not the board's.** The board fills this space with more of the same
 * paragraph, cropped. I3's lever is the row the board cut, and these are the
 * three facts a venue page genuinely carries — labels and measurements, not
 * prose (R5).
 */
export function FactStrip({ margin, height, radius }: FactProps) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: radius,
        backgroundColor: ct.field,
      }}
    >
      {/* STEP 1.23 value
      {facts.map((f, i) => (
        <View
          key={f.id}
          style={{
            flex: 1,
            alignItems: 'center',
            gap: 2,
            borderLeftWidth: i === 0 ? 0 : 1,
            borderLeftColor: ct.fieldEdge,
          }}
        >
          <T variant="factValue">{f.value}</T>
          <T variant="factLabel">{f.label}</T>
        </View>
      ))}
      */}
    </View>
  );
}

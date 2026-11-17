import { View } from 'react-native';

import { amenities, amenityTitle } from '../data/stay';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; titleH: number; chipH: number; gap: number };

/**
 * What the cabin has.
 *
 * This one **wraps** rather than scrolling: the board sets its amenities as
 * two full rows that both end inside the frame, so nothing is cropped at the
 * edge and R2's "a row that runs off the screen is a scroller" does not apply.
 */
export function Amenities({ margin, titleH, chipH, gap }: Props) {
  return (
    <View style={{ marginHorizontal: margin, borderTopWidth: 1, borderTopColor: ct.line }}>
      {/* STEP 1.18 view
      <View style={{ height: titleH, justifyContent: 'flex-end' }}>
        <T variant="section">{amenityTitle}</T>
      </View>
      */}

      {/* STEP 1.19 label
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap, marginTop: 10 }}>
        {amenities.map((item) => (
          <View
            key={item.id}
            style={{
              height: chipH,
              paddingHorizontal: 13,
              borderRadius: chipH / 2,
              backgroundColor: ct.page,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <T variant="chip">{item.label}</T>
          </View>
        ))}
      </View>
      */}
    </View>
  );
}

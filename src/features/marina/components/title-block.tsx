import { View } from 'react-native';

import { T } from './text';
import { mr } from '../theme';

/**
 * The boat's name, its hull name, and who it holds.
 *
 * The bullet is its own `Text` rather than part of either string. Joined to
 * the name it would take the title's weight and size, which makes it a full
 * stop rather than a separator.
 */
export function TitleBlock({
  name,
  hull,
  capacity,
}: {
  name: string;
  hull: string;
  capacity: string;
}) {
  return (
    <View style={{ gap: 2 }}>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', flexWrap: 'wrap' }}>
        {/* STEP 1.14 the name, the bullet, and the hull
        <T variant="title" color={mr.ink}>
          {name}
        </T>
        <T variant="titleAside" color={mr.ink} style={{ marginHorizontal: 8 }}>
          {'•'}
        </T>
        <T variant="titleAside" color={mr.inkSoft}>
          ({hull})
        </T>
        */}
      </View>

      <T variant="capacity" color={mr.inkSoft}>
        Capacity: {capacity}
      </T>
    </View>
  );
}

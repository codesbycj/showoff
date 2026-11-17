import { Image, Pressable, ScrollView, View } from 'react-native';

import {
  about,
  actions,
  gallery,
  hero,
  includes,
  overview,
  stay,
  total,
  unit,
  usd,
} from '../data/stay';
import { ct } from '../theme';
import { RailProps } from './_stay-parts-shared';

/**
 * The other shots.
 *
 * **Mine, not the board's.** Its sheet ends on two buttons with the paragraph
 * cropped above them; I3's lever for that space is the section the board cut.
 *
 * **A horizontal `ScrollView`, not a wrap** (R2), pinned to its own height so
 * it cannot absorb the screen's slack.
 */
export function ShotRail({ margin, height, width, radius }: RailProps) {
  return (
    <View style={{ height }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: margin, gap: 10 }}
      >
        {gallery.map((g) => (
          <Image
            key={g.id}
            source={g.photo}
            style={{ width, height, borderRadius: radius, backgroundColor: ct.tile }}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
    </View>
  );
}

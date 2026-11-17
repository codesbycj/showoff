import { Image, Pressable, View } from 'react-native';

import { clock, controls, progress, screen, track } from '../data/player';
import { ct } from '../theme';
import { CoverProps } from './_player-parts-shared';

/**
 * The sleeve.
 *
 * **A photograph standing in for a fictional release** (I4). The board's own
 * is a real album cover, and shipping that would be impersonation.
 *
 * The `Image` carries explicit numeric width and height: absolute insets alone
 * make an `Image` paint nothing on native, silently (Part 7).
 */
export function CoverArt({ margin, size, radius }: CoverProps) {
  return (
    <View style={{ marginHorizontal: margin, alignItems: 'center' }}>
      <Image
        source={track.cover}
        style={{ width: size, height: size, borderRadius: radius, backgroundColor: ct.card }}
        resizeMode="cover"
      />
    </View>
  );
}

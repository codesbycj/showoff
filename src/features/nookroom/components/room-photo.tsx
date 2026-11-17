import { Image, View } from 'react-native';

import { scene } from '../data/room';
import { ct } from '../theme';

type Props = { width: number; height: number };

/**
 * The room the piece is being placed into.
 *
 * **A full-bleed photograph is the page's own ground** (SS5.5), so it is the
 * one thing allowed to paint in frame one - everything else on this screen is
 * a control that floats on it.
 *
 * The `Image` carries a numeric width and height: absolute insets alone make
 * it paint nothing, silently (SS7).
 */
export function RoomPhoto({ width, height }: Props) {
  return (
    <View
      style={{ position: 'absolute', top: 0, left: 0, width, height, backgroundColor: ct.panel }}
    >
      <Image source={scene.image} style={{ width, height }} resizeMode="cover" />
    </View>
  );
}

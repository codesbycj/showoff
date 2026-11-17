import { Image, View } from 'react-native';

import { hero } from '../data/start';
import { ct } from '../theme';

type Props = { width: number; height: number; radius: number };

/**
 * The opening photograph — the dominant element on the screen (R8).
 *
 * **A cat is a picture *of* a cat** (I4), so it is free-licensed stock rather
 * than a drawing. The board shows the animal with the product it is selling;
 * this frame keeps both.
 *
 * The `Image` carries a numeric width and height: absolute insets alone make
 * it paint nothing, silently (§7).
 */
export function HeroPhoto({ width, height, radius }: Props) {
  return (
    <View
      style={{
        width,
        height,
        borderBottomLeftRadius: radius,
        borderBottomRightRadius: radius,
        overflow: 'hidden',
        backgroundColor: ct.sheet,
      }}
    >
      <Image source={hero.image} style={{ width, height }} resizeMode="cover" />
    </View>
  );
}

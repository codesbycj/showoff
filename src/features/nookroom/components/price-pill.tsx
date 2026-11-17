import { Image, View } from 'react-native';

import { money, scene } from '../data/room';
import { ct } from '../theme';
import { T } from './text';

type Props = { height: number };

/**
 * The piece being placed, with its price.
 *
 * The pill carries its **own white ground** because it sits on photography,
 * where the frame behind a string cannot be relied on for 4.5:1 (R4).
 */
export function PricePill({ height }: Props) {
  return (
    <View
      style={{
        height,
        paddingLeft: 6,
        paddingRight: 16,
        borderRadius: height / 2,
        backgroundColor: ct.white,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
      }}
    >
      {/* STEP 1.05 image
      <Image
        source={scene.thumb}
        style={{ width: height - 12, height: height - 12, borderRadius: (height - 12) / 2 }}
        resizeMode="contain"
      />
      */}
      {/* STEP 1.06 t
      <T variant="price">{money(scene.price)}</T>
      */}
    </View>
  );
}

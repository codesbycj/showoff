import { Image, View } from 'react-native';

import { lines, money } from '../data/cart';
import { ct } from '../theme';
import { T } from './text';

type Props = { height: number; thumb: number; radius: number };

/**
 * What is in the cart.
 *
 * Each line's price pill carries its own pale ground, because the sheet behind
 * it is near-black and a pale figure on it is the only thing that clears
 * 4.5:1 at this size (R4).
 */
export function CartLines({ height, thumb, radius }: Props) {
  return (
    <View style={{ gap: 10 }}>
      {lines.map((line) => (
        <View key={line.id} style={{ height, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Image
            source={line.image}
            style={{ width: thumb, height: thumb, borderRadius: radius }}
            resizeMode="cover"
          />

          <View style={{ flex: 1, gap: 2 }}>
            <T variant="lineName" numberOfLines={1}>
              {line.name}
            </T>
            <T variant="lineSub" numberOfLines={1}>
              {line.sub}
            </T>
          </View>

          <View
            style={{
              paddingHorizontal: 12,
              height: 32,
              borderRadius: 16,
              backgroundColor: 'rgba(255,255,255,0.12)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <T variant="linePrice">{money(line.price)}</T>
          </View>
        </View>
      ))}
    </View>
  );
}

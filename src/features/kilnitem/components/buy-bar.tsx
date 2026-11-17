import { Pressable, View } from 'react-native';

import { money, piece } from '../data/item';
import { ct } from '../theme';
import { T } from './text';

type Props = { height: number; onPress: () => void };

/**
 * The way to buy it.
 *
 * **The fill sits on an absolutely-filled child**, never on the bar itself.
 * Descending a container to stage its children leaves the container's own
 * `backgroundColor` live, so an emptied bar paints a dark strip in frame one
 * of the reveal - which is exactly what `blank.js` reported here (I9 / SS5.5).
 *
 * The bar is pinned flush to the foot and does not reserve the indicator's
 * strip: when the app is not edge-to-edge the system already holds that space
 * (I11).
 */
export function BuyBar({ height, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${piece.cta}, ${money(piece.price)}`}
      onPress={onPress}
    >
      <View
        style={{
          height,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 22,
        }}
      >
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: ct.ink,
          }}
        />

        {/* STEP 1.19 cta
        <T variant="buy">{piece.cta}</T>
        */}
        {/* STEP 1.20 t
        <T variant="buyPrice">{money(piece.price)}</T>
        */}
      </View>
    </Pressable>
  );
}

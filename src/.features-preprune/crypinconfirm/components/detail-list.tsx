import { View } from 'react-native';

import { details } from '../data/confirm';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; height: number; rowH: number; pad: number; radius: number };

/**
 * Network, fee, slippage, delivery.
 *
 * **The fill is on an absolutely-filled child** so a staged reveal does not
 * open on an empty card (§5.5 / I9).
 *
 * The fee string is computed in `data/confirm.ts` from the rate beside it: the
 * reference charges "0.2% (≈ 0.97 USDT)" on a 110.43 USDT trade, which is four
 * times its own stated rate (R9).
 */
export function DetailList({ margin, height, rowH, pad, radius }: Props) {
  return (
    <View style={{ marginHorizontal: margin, height, paddingHorizontal: 14, paddingVertical: pad }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: radius,
          backgroundColor: ct.card,
          borderWidth: 1,
          borderColor: ct.cardEdge,
        }}
      />

      {details.map((d) => (
        <View
          key={d.id}
          style={{
            height: rowH,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <T variant="rowLabel">{d.label}</T>
          <T variant="rowValue" numberOfLines={1}>
            {d.value}
          </T>
        </View>
      ))}
    </View>
  );
}

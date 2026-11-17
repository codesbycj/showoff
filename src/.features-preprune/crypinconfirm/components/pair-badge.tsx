import { View } from 'react-native';

import { deal, type Coin } from '../data/confirm';
import { ct } from '../theme';
import { Glyph } from './glyph';

const FILL: Record<Coin, string> = { btc: ct.btc, usdt: ct.usdt };

type Props = { size: number; disc: number };

/**
 * The two assets, side by side, with the route dots between them.
 *
 * Each disc carries a ring in the page's own black so the pair reads as two
 * tokens on one chain rather than two circles that happen to touch — which is
 * exactly how the reference draws it.
 *
 * The dots are drawn as three small views rather than a dashed border: a
 * dashed border's gap is rendered differently on Android and the web render
 * cannot see that (§4.4).
 */
export function PairBadge({ size, disc }: Props) {
  return (
    <View
      style={{ height: size, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
    >
      <View
        style={{
          width: disc,
          height: disc,
          borderRadius: disc / 2,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: FILL[deal.from],
          borderWidth: 3,
          borderColor: ct.page,
        }}
      >
        <Glyph name={deal.from} size={disc * 0.52} color={ct.white} strokeWidth={2.2} />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3, marginHorizontal: 5 }}>
        <View style={{ width: 3, height: 3, borderRadius: 1.5, backgroundColor: ct.rail }} />
        <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: ct.sub }} />
        <View style={{ width: 3, height: 3, borderRadius: 1.5, backgroundColor: ct.rail }} />
      </View>

      <View
        style={{
          width: disc,
          height: disc,
          borderRadius: disc / 2,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: FILL[deal.to],
          borderWidth: 3,
          borderColor: ct.page,
        }}
      >
        <Glyph name={deal.to} size={disc * 0.52} color={ct.white} />
      </View>
    </View>
  );
}

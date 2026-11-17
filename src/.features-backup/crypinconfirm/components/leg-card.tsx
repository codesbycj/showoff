import { View } from 'react-native';

import { PRICE, TICKER, legs, units, usd, type Coin } from '../data/confirm';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

const FILL: Record<Coin, string> = { btc: ct.btc, usdt: ct.usdt };

type Props = { margin: number; height: number; rowH: number; radius: number; coin: number };

/**
 * From and To, with what each side is worth.
 *
 * **The fill is on an absolutely-filled child**, carrying the border with it,
 * so a reveal that stages the two rows does not open on an empty bordered box
 * (§5.5 / I9).
 *
 * Each amount's dollar value is `units × price` from `data/confirm.ts`, so the
 * two legs cannot disagree about what is being traded (R9).
 */
export function LegCard({ margin, height, rowH, radius, coin }: Props) {
  return (
    <View style={{ marginHorizontal: margin, height, paddingHorizontal: 14 }}>
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

      {legs.map((leg, i) => (
        <View
          key={leg.id}
          style={{
            height: rowH,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomWidth: i === legs.length - 1 ? 0 : 1,
            borderBottomColor: ct.hairline,
          }}
        >
          <T variant="legLabel">{leg.label}</T>

          <View style={{ alignItems: 'flex-end' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <View
                style={{
                  width: coin,
                  height: coin,
                  borderRadius: coin / 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: FILL[leg.coin],
                }}
              >
                <Glyph name={leg.coin} size={12} color={ct.white} strokeWidth={2.2} />
              </View>
              <T variant="legAmount">{`${units(leg.amount, leg.coin)} ${TICKER[leg.coin]}`}</T>
            </View>
            <T variant="legApprox">{`≈ ${usd(leg.amount * PRICE[leg.coin])}`}</T>
          </View>
        </View>
      ))}
    </View>
  );
}

import type { ReactNode } from 'react';
import { View } from 'react-native';

import { TICKER, units, usd, type Coin } from '../data/swap';
import { ct } from '../theme';
import { CoinPill } from './coin-pill';
import { Glyph } from './glyph';
import { T } from './text';

type Props = {
  label: string;
  coin: Coin;
  figure: string;
  approx: number;
  balance: number;
  margin: number;
  height: number;
  radius: number;
  pillH: number;
  coinSize: number;
  /** The pay side carries a caret; the receive side does not. */
  caret?: boolean;
  dim?: boolean;
  /** The chips row, on the pay panel only. */
  footer?: ReactNode;
};

/**
 * One side of the swap: a label, an asset, a figure and what it is worth.
 *
 * **The fill is on an absolutely-filled child**, carrying the border with it,
 * so a reveal that stages this panel's contents does not open on an empty
 * translucent box with a stroke around it (§5.5 / I9).
 *
 * The panel is translucent over the page's own bloom rather than a solid card,
 * which is what the reference does and what the first pass of this board got
 * wrong by painting a flat slab.
 */
export function AmountPanel({
  label,
  coin,
  figure,
  approx,
  balance,
  margin,
  height,
  radius,
  pillH,
  coinSize,
  caret = false,
  dim = false,
  footer,
}: Props) {
  return (
    <View style={{ marginHorizontal: margin, height, padding: 14 }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: radius,
          backgroundColor: ct.panel,
          borderWidth: 1,
          borderColor: ct.panelEdge,
        }}
      />

      <T variant="panelLabel">{label}</T>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 6,
        }}
      >
        <CoinPill coin={coin} height={pillH} disc={coinSize} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <T variant={dim ? 'amountDim' : 'amount'}>{figure}</T>
          {caret ? (
            <View
              style={{
                width: 2,
                height: 30,
                marginLeft: 2,
                borderRadius: 1,
                backgroundColor: ct.caret,
              }}
            />
          ) : null}
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 4,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <Glyph name={coin} size={12} color={ct.sub} strokeWidth={1.7} />
          <T variant="balance">{`${units(balance)} ${TICKER[coin]}`}</T>
        </View>
        <T variant="approx">{`≈ ${usd(approx)}`}</T>
      </View>

      {footer ? <View style={{ marginTop: 10 }}>{footer}</View> : null}
    </View>
  );
}

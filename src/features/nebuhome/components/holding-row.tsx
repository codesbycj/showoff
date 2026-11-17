import { View } from 'react-native';

import { type Holding } from '../data/home';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { holding: Holding; height: number; radius: number; onLight?: boolean };

/**
 * One asset.
 *
 * **R9: the dollar value is `price * amount`**, formatted here rather than
 * typed in the data — the board prints $3.51 against 0.0018 of a $2,115.88
 * coin, and $5.02 against 0.028 of an $83,240.71 one.
 *
 * `onLight` switches the whole row's ink for the white panel inside the
 * featured card: a dark theme needs invert tokens, because a label made of
 * `ct.ink` goes invisible the moment it lands on white (R4).
 */
export function HoldingRow({ holding, height, radius, onLight = false }: Props) {
  const value = holding.price * holding.amount;
  const up = holding.change >= 0;

  return (
    <View
      style={{
        height,
        borderRadius: radius,
        backgroundColor: onLight ? ct.white : ct.card,
        paddingHorizontal: 14,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
      }}
    >
      {/* STEP 1.24 glyph
      <View
        style={{
          width: 42,
          height: 42,
          borderRadius: 21,
          backgroundColor: onLight ? ct.ctaInk : ct.cardSoft,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Glyph name={holding.mark} size={20} color={ct.white} strokeWidth={1.7} />
      </View>
      */}

      {/* STEP 1.25 symbol
      <View style={{ flex: 1 }}>
        <T variant={onLight ? 'symbolDark' : 'symbol'}>{holding.symbol}</T>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
          <T variant={onLight ? 'priceDark' : 'price'}>
            ${holding.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </T>
          <T
            variant="delta"
            style={{
              color: onLight ? (up ? ct.upLight : ct.downLight) : up ? ct.up : ct.down,
            }}
          >
            {up ? '+' : ''}
            {holding.change}%
          </T>
        </View>
      </View>
      */}

      {/* STEP 1.26 amount
      <View style={{ alignItems: 'flex-end' }}>
        <T variant={onLight ? 'amountDark' : 'amount'}>{holding.amount}</T>
        <T variant={onLight ? 'valueDark' : 'value'}>
          ${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}
        </T>
      </View>
      */}
    </View>
  );
}

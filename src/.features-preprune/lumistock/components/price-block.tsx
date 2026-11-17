import { View } from 'react-native';

import { blurb, changeAbs, changePct, pct, price, usd, window } from '../data/stock';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

import { Props } from './_price-block-shared';

/**
 * The price and the move.
 *
 * **Both computed from the series** (R9). The board prints "+$2090.25 ▲56.07%"
 * beside a $168.99 share price — a move twelve times the price — and the arrow
 * and the colour here follow the sign of the datum rather than being set by
 * hand, so the picture cannot disagree with the number.
 */
export function PriceBlock({ margin, priceH, moveH }: Props) {
  const down = changeAbs < 0;
  return (
    <View style={{ marginHorizontal: margin }}>
      <View style={{ height: priceH, justifyContent: 'center' }}>
        <T variant="price">{usd(price)}</T>
      </View>

      <View style={{ height: moveH, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        <T variant={down ? 'moveDown' : 'moveUp'}>
          {`${down ? '' : '+'}${usd(changeAbs)}`}
        </T>
        <Glyph
          name={down ? 'trendDown' : 'trendUp'}
          size={13}
          color={down ? ct.down : ct.up}
          strokeWidth={2.2}
        />
        <T variant={down ? 'moveDown' : 'moveUp'}>{pct(changePct)}</T>
        <T variant="moveMeta">{`| ${window.label}`}</T>
      </View>
    </View>
  );
}

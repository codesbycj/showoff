import { View } from 'react-native';

import { blurb, changeAbs, changePct, pct, price, usd, window } from '../data/stock';
import { T } from './text';

import { BlurbProps } from './_price-block-shared';

/**
 * What the holding is.
 *
 * **R5: one run, 70 characters.** The board's own run here is 118 and is
 * marketing copy ("Start your investment journey with tailored solutions…"),
 * which is prose a holding page does not have.
 */
export function StockBlurb({ margin, height }: BlurbProps) {
  return (
    <View style={{ marginHorizontal: margin, height, justifyContent: 'center' }}>
      <T variant="blurb">{blurb}</T>
    </View>
  );
}

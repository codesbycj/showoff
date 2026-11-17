import { View } from 'react-native';

import { PRICE, TICKER, swap, usd } from '../data/swap';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * The rate the swap is being quoted at, and what it costs.
 *
 * **Mine, not the board's.** The reference crops this screen off below its
 * receive panel and leaves the gap to the keypad empty. I3's lever for empty
 * space is to add the row the board cut, never to spread the blocks out — and
 * a rate line is the row a swap screen genuinely has. Named in the handover.
 *
 * Both figures derive from the one price table (R9), so this line cannot
 * disagree with the panels above it.
 */
export function RateRow({ margin, height }: Props) {
  const rate = PRICE[swap.from] / PRICE[swap.to];

  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <T variant="balance">
        {`1 ${TICKER[swap.from]} ≈ ${rate.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} ${TICKER[swap.to]}`}
      </T>
      <T variant="approx">{`Fee ${usd(0.002 * (swap.payUnits * PRICE[swap.from]))}`}</T>
    </View>
  );
}

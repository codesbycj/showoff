import { View } from 'react-native';

import { TICKER, deal, netUnits, summary, units, usd } from '../data/confirm';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * What actually lands, after the fee.
 *
 * **Mine, not the board's.** The reference lists a fee and then never subtracts
 * it, so its "To" figure and the amount that arrives are not the same number.
 * Stating the net once, derived (R9), is the honest version of the line the
 * board implies.
 */
export function ReceiveTotal({ margin, height }: Props) {
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
      <T variant="totalLabel">{summary.label}</T>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 6 }}>
        <T variant="totalValue">{`${units(netUnits, deal.to)} ${TICKER[deal.to]}`}</T>
        <T variant="legApprox">{`≈ ${usd(netUnits)}`}</T>
      </View>
    </View>
  );
}

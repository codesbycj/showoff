import { View } from 'react-native';

import { amount, copy } from '../data/home';
import { AMOUNT_TOP, UNDER_TOP } from '../layout';
import { tl, type } from '../theme';
import { T } from './text';

/**
 * What you are sending, and what that leaves.
 *
 * The cents are smaller and lighter than the dollars and share one line box —
 * both runs are 54dp — so the decimal sits on the baseline without a nudge at
 * any text size.
 *
 * The balance under it names itself rather than being a bare figure: "$3,198"
 * alone beneath "$200" is two numbers with nothing to say which is which.
 */
export function AmountHead() {
  return (
    <View style={{ alignItems: 'center' }}>
      <T variant="display" color={tl.ink} style={{ height: type.display.line }}>
        {copy.title}
      </T>

      <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: AMOUNT_TOP }}>
        <T variant="big" color={tl.ink} style={{ height: type.big.line }}>
          {amount.major}
        </T>
        <T variant="bigMinor" color={tl.ink} style={{ height: type.bigMinor.line }}>
          {amount.minor}
        </T>
      </View>

      <View style={{ flexDirection: 'row', marginTop: UNDER_TOP }}>
        <T variant="under" color={tl.body} style={{ height: type.under.line }}>
          {copy.balanceLabel}{' '}
        </T>
        <T variant="underStrong" color={tl.violet} style={{ height: type.underStrong.line }}>
          {copy.balance}
        </T>
      </View>
    </View>
  );
}

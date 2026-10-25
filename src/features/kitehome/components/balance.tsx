import { View } from 'react-native';

import { balance, copy, money } from '../data/start';
import { BALANCE_TOP } from '../layout';
import { kt, type } from '../theme';
import { T } from './text';

/**
 * What is in the wallet.
 *
 * The pennies are set in the same size but a dimmer colour, which is the
 * reference's own idea and a good one: the eye takes the dollars at a glance
 * and the exact figure is still there to read.
 *
 * The string is formatted from `balance` (pennies) rather than typed, so the
 * screen cannot print a total its own data does not hold.
 */
export function Balance() {
  const text = money(balance);
  const dot = text.lastIndexOf('.');
  const dollars = text.slice(0, dot);
  const cents = text.slice(dot);

  return (
    <View style={{ alignItems: 'center', marginTop: BALANCE_TOP }}>
      <T variant="balanceLabel" color={kt.dim} style={{ height: type.balanceLabel.line }}>
        {copy.balanceLabel}
      </T>
      <View style={{ flexDirection: 'row' }}>
        <T variant="balance" color={kt.ink} style={{ height: type.balance.line }}>
          {dollars}
        </T>
        <T variant="balance" color={kt.faint} style={{ height: type.balance.line }}>
          {cents}
        </T>
      </View>
    </View>
  );
}

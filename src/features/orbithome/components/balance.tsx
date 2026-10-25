import { Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { balance, copy, money } from '../data/start';
import { AMOUNT_TOP } from '../layout';
import { ob, radius, type } from '../theme';
import { T } from './text';

/**
 * What is in the account, and the two controls that qualify it.
 *
 * The figure is formatted from `balance` (pennies) rather than typed, so the
 * screen cannot print a total its own data does not hold. The currency sign
 * is its own, smaller run set to the digits' baseline — a `$` at 34dp is a
 * column of ink beside the number rather than a sign in front of it.
 */
export function Balance() {
  const text = money(balance);
  const sign = text.slice(0, 1);
  const digits = text.slice(1);

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <T variant="label" color={ob.body} style={{ flex: 1, height: type.label.line }}>
          {copy.balanceLabel}
        </T>
        <Pressable accessibilityRole="button" accessibilityLabel={copy.statistics}>
          <View
            style={{
              paddingHorizontal: 14,
              paddingVertical: 7,
              borderRadius: radius.pill,
              backgroundColor: ob.chip,
              borderWidth: 1,
              borderColor: ob.cardEdge,
            }}
          >
            <T variant="chip" color={ob.ink} style={{ height: type.chip.line }}>
              {copy.statistics}
            </T>
          </View>
        </Pressable>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: AMOUNT_TOP }}>
        <T
          variant="balanceSign"
          color={ob.body}
          style={{ marginBottom: 6, height: type.balanceSign.line }}
        >
          {sign}
        </T>
        <T
          variant="balance"
          color={ob.ink}
          style={{ flex: 1, marginLeft: 6, height: type.balance.line }}
        >
          {digits}
        </T>
        <Pressable accessibilityRole="button" accessibilityLabel="Change currency">
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 8,
              paddingHorizontal: 12,
              paddingVertical: 7,
              borderRadius: radius.pill,
              backgroundColor: ob.chip,
              borderWidth: 1,
              borderColor: ob.cardEdge,
            }}
          >
            <T variant="chip" color={ob.ink} style={{ height: type.chip.line }}>
              {copy.currency}
            </T>
            <Svg width={12} height={12} viewBox="0 0 24 24" style={{ marginLeft: 5 }}>
              <Path
                d="m7 10 5 5 5-5"
                stroke={ob.body}
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </Svg>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

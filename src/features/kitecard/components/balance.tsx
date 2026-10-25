import { Pressable, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { balance, copy, money } from '../data/start';
import { BALANCE_TOP, REVEAL_HEIGHT, REVEAL_TOP } from '../layout';
import { kt, radius, type } from '../theme';
import { T } from './text';

/**
 * What is left on the card, and the way to see the rest of its numbers.
 *
 * The pennies are set in the same size but a dimmer colour, which is the
 * reference's idea and a good one. The figure is formatted from `balance`
 * (pennies) rather than typed.
 *
 * "Show card details" is a real control with a 34dp target rather than a line
 * of text — the reference's version is 17dp tall, which is half a thumb.
 */
export function Balance({ onReveal }: { onReveal?: () => void }) {
  const text = money(balance);
  const dot = text.lastIndexOf('.');

  return (
    <View style={{ alignItems: 'center', marginTop: BALANCE_TOP }}>
      <T variant="balanceLabel" color={kt.dim} style={{ height: type.balanceLabel.line }}>
        {copy.balanceLabel}
      </T>
      <View style={{ flexDirection: 'row' }}>
        <T variant="balance" color={kt.ink} style={{ height: type.balance.line }}>
          {text.slice(0, dot)}
        </T>
        <T variant="balance" color={kt.faint} style={{ height: type.balance.line }}>
          {text.slice(dot)}
        </T>
      </View>

      <Pressable onPress={onReveal} accessibilityRole="button" accessibilityLabel={copy.reveal}>
        <View
          style={{
            height: REVEAL_HEIGHT,
            marginTop: REVEAL_TOP,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 12,
            borderRadius: radius.pill,
          }}
        >
          <Svg width={15} height={15} viewBox="0 0 24 24">
            <Path
              d="M2.8 12S6.6 5.8 12 5.8 21.2 12 21.2 12 17.4 18.2 12 18.2 2.8 12 2.8 12Z"
              stroke={kt.dim}
              strokeWidth={1.6}
              fill="none"
            />
            <Circle cx={12} cy={12} r={2.7} stroke={kt.dim} strokeWidth={1.6} fill="none" />
          </Svg>
          <T variant="reveal" color={kt.dim} style={{ marginLeft: 7, height: type.reveal.line }}>
            {copy.reveal}
          </T>
        </View>
      </Pressable>
    </View>
  );
}

import { Pressable, View } from 'react-native';

import { balance, usd, wallet } from '../data/wallet';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; labelH: number; height: number };

/**
 * The balance, and the currency it is in.
 *
 * **Computed, never typed** (R9): `data/wallet.ts` adds the opening balance to
 * every transaction in the list beneath, so the headline figure and the rows
 * cannot disagree — the board's do.
 *
 * The figure is the dominant element on the screen (R8): 33dp extra-bold
 * against a 13dp label, everything below visibly subordinate.
 */
export function BalanceBlock({ margin, labelH, height }: Props) {
  return (
    <View style={{ marginHorizontal: margin }}>
      <View style={{ height: labelH, justifyContent: 'center' }}>
        <T variant="balanceLabel">{wallet.label}</T>
      </View>

      <View style={{ height, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <T variant="balance">{usd(balance)}</T>

        <Pressable
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={`Currency, ${wallet.currency}`}
        >
          {({ pressed }) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                height: 30,
                paddingHorizontal: 8,
                borderRadius: 15,
                backgroundColor: ct.tile,
                opacity: pressed ? 0.7 : 1,
              }}
            >
              <Glyph name="flag" size={17} />
              <T variant="currency">{wallet.currency}</T>
              <Glyph name="chevronDown" size={13} color={ct.sub} strokeWidth={2.1} />
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
}

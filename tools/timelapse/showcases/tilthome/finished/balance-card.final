import { Pressable, View } from 'react-native';

import { balance, copy } from '../data/home';
import { BALANCE_HEIGHT, CARD_PAD } from '../layout';
import { radius, tl, type } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * What you have.
 *
 * The pence are set smaller and lighter than the pounds and share one
 * baseline: the line height on both runs is the same 40dp, so the two sit on
 * that baseline without any nudging — which is the only way the decimal lines
 * up at every text size.
 */
export function BalanceCard({ onSeeAll }: { onSeeAll?: () => void }) {
  return (
    <View
      style={{
        height: BALANCE_HEIGHT,
        borderRadius: radius.card,
        backgroundColor: tl.sky,
        padding: CARD_PAD,
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <T variant="cardLabel" color={tl.ink} style={{ flex: 1, height: type.cardLabel.line }}>
          {copy.balanceLabel}
        </T>
        <Pressable accessibilityRole="button" accessibilityLabel={`Currency: ${copy.currency}`}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 10,
              paddingRight: 6,
              paddingVertical: 5,
              borderRadius: radius.pill,
              backgroundColor: tl.violet,
            }}
          >
            <T variant="chip" color={tl.onNavy} style={{ height: type.chip.line }}>
              {copy.currency}
            </T>
            <Glyph name="caret" size={13} tint={tl.onNavy} />
          </View>
        </Pressable>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
        <T variant="amount" color={tl.ink} style={{ height: type.amount.line }}>
          {balance.major}
        </T>
        <T variant="amountMinor" color={tl.ink} style={{ height: type.amountMinor.line }}>
          {balance.minor}
        </T>
      </View>

      <Pressable onPress={onSeeAll} accessibilityRole="button" accessibilityLabel={copy.seeAll}>
        <View
          style={{
            alignSelf: 'flex-start',
            paddingHorizontal: 12,
            paddingVertical: 7,
            borderRadius: radius.pill,
            backgroundColor: tl.lime,
          }}
        >
          <T variant="chip" color={tl.ink} style={{ height: type.chip.line }}>
            {copy.seeAll}
          </T>
        </View>
      </Pressable>
    </View>
  );
}

import { View } from 'react-native';

import { spending } from '../data/stats';
import { CARD_PAD } from '../layout';
import { ps, radius } from '../theme';
import { CardBadge } from './card-badge';
import { Icon } from './icon';
import { PrismArt } from './prism-art';
import { T } from './text';

/**
 * The right-hand stat card: what the month has spent, and where from.
 *
 * The amount and its cents sit on a shared baseline rather than being one
 * string — the reference sets the pence small, and one string at one size
 * would read as a different number.
 *
 * The legend's two dots are the same colour. That is the reference's own
 * doing and it is kept: the prism behind them is the thing carrying the split,
 * and giving the dots two colours would promise a key the picture does not
 * have.
 */
export function SpendingCard({ height }: { height: number }) {
  return (
    <View
      style={{
        flex: 1,
        height,
        borderRadius: radius.card,
        backgroundColor: ps.ink,
        padding: CARD_PAD,
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon name="down" size={13} color={ps.onInk} strokeWidth={2.2} />
        <T variant="cardKind" color={ps.onInk} style={{ marginLeft: 5 }}>
          {spending.kind}
        </T>
        <View style={{ flex: 1 }} />
        <CardBadge fill={ps.lime} ink={ps.text} />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
        <T variant="cardMoney" color={ps.onInk}>
          {spending.amount}
        </T>
        <T variant="cardCents" color={ps.onInkMuted}>
          {spending.cents}
        </T>
      </View>

      <View style={{ alignItems: 'center' }}>
        <PrismArt size={76} shades={ps.prism} />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {spending.legend.map((label) => (
          <View key={label} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <View
              style={{
                width: 5,
                height: 5,
                borderRadius: radius.full,
                backgroundColor: ps.prism[2],
              }}
            />
            <T variant="cardLegend" color={ps.onInkMuted}>
              {label}
            </T>
          </View>
        ))}
      </View>
    </View>
  );
}

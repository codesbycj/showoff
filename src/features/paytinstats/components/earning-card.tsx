import { View } from 'react-native';

import { earning } from '../data/stats';
import { CARD_PAD } from '../layout';
import { ps, radius } from '../theme';
import { CardBadge } from './card-badge';
import { GoalDots } from './goal-dots';
import { Icon } from './icon';
import { T } from './text';

/**
 * The left-hand stat card: what the month has earned, against its goal.
 *
 * `justifyContent: 'space-between'` over a fixed height rather than stacked
 * margins: the card is one of a pair and the pair must be the same height
 * whatever either one says, so the air inside gives rather than the box.
 */
export function EarningCard({ height }: { height: number }) {
  return (
    <View
      style={{
        flex: 1,
        height,
        borderRadius: radius.card,
        backgroundColor: ps.lime,
        padding: CARD_PAD,
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon name="up" size={13} color={ps.text} strokeWidth={2.2} />
        <T variant="cardKind" color={ps.text} style={{ marginLeft: 5 }}>
          {earning.kind}
        </T>
        <View style={{ flex: 1 }} />
        <CardBadge fill={ps.ink} ink={ps.lime} />
      </View>

      <View>
        <T variant="cardFigure" color={ps.text}>
          {earning.figure}
        </T>
        <T variant="cardBody" color={ps.limeInk}>
          {earning.body}
        </T>
      </View>

      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <T variant="cardMeta" color={ps.text}>
            {earning.goalLabel}
          </T>
          <View style={{ flex: 1 }} />
          <T variant="cardMeta" color={ps.text}>
            {earning.goal}
          </T>
        </View>
        <View style={{ marginTop: 7 }}>
          <GoalDots count={earning.dots} fraction={earning.fraction} />
        </View>
      </View>
    </View>
  );
}

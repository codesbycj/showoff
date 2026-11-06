import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { SPEND_CARD_H } from '../layout';
import { ct, radius, type } from '../theme';
import { copy, deltaPct, spend, week } from '../data/stats';
import { T } from './text';

/** The little up-arrow beside the percentage. Drawn, like every other glyph. */
function Caret({ tint }: { tint: string }) {
  return (
    <Svg width={10} height={10} viewBox="0 0 10 10">
      <Path d="M5 1.6 9 8.4H1Z" fill={tint} />
    </Svg>
  );
}

/**
 * This week's spending, with the week itself beside it.
 *
 * The bars are scaled to the largest day in the data rather than to a
 * constant, so the tallest bar is always the biggest day — the chart cannot
 * quietly disagree with the series it is drawn from.
 */
export function SpendCard() {
  const peak = Math.max(...week.map((d) => d.value));
  const barMax = 54;

  return (
    <View
      style={{
        height: SPEND_CARD_H,
        borderRadius: radius.card,
        backgroundColor: ct.card,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 18,
      }}
    >
      <View style={{ flex: 1 }}>
        <T variant="cardLabel" color={ct.muted} style={{ height: type.cardLabel.line }}>
          {copy.spendLabel}
        </T>
        <T
          variant="cardFigure"
          color={ct.ink}
          style={{ height: type.cardFigure.line, marginTop: 2 }}
        >
          {spend}
        </T>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
          <Caret tint={ct.up} />
          <T variant="delta" color={ct.up} style={{ height: type.delta.line, marginLeft: 4 }}>
            {`${deltaPct}%`}
          </T>
          <T
            variant="deltaNote"
            color={ct.muted}
            style={{ height: type.deltaNote.line, marginLeft: 6 }}
          >
            {copy.deltaNote}
          </T>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: barMax + 21 }}>
        {week.map((d) => (
          <View key={d.id} style={{ alignItems: 'center', marginLeft: 7 }}>
            <View
              style={{
                width: 9,
                height: Math.round((d.value / peak) * barMax),
                borderRadius: radius.bar,
                backgroundColor: 'on' in d && d.on ? ct.lime : ct.wash,
              }}
            />
            <T
              variant={'on' in d && d.on ? 'axisOn' : 'axis'}
              color={'on' in d && d.on ? ct.ink : ct.muted}
              style={{ height: type.axis.line, marginTop: 5 }}
            >
              {d.label}
            </T>
          </View>
        ))}
      </View>
    </View>
  );
}

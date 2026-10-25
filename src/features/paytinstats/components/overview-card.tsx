import { View } from 'react-native';

import { overview } from '../data/stats';
import { CHART_PAD } from '../layout';
import { ps, radius, shadow } from '../theme';
import { BlockChart } from './block-chart';
import { T } from './text';

/**
 * The card the chart sits in: the balance it is all measured against, a key,
 * and the plot.
 *
 * The key's two swatches are squares rather than dots because they stand for
 * the chart's own blocks, and a key whose marks are a different shape from the
 * thing they label is a key you have to think about.
 */
export function OverviewCard() {
  return (
    <View
      style={{
        borderRadius: radius.card,
        backgroundColor: ps.surface,
        padding: CHART_PAD,
        ...shadow.soft,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <View style={{ flex: 1 }}>
          <T variant="chartLabel" color={ps.muted}>
            {overview.label}
          </T>
          <T variant="chartValue" color={ps.text}>
            {overview.total}
          </T>
        </View>

        <View style={{ gap: 5 }}>
          {overview.keys.map((label, i) => (
            <View key={label} style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <T variant="chartKey" color={ps.muted}>
                {label}
              </T>
              <View
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: 2,
                  backgroundColor: i === 0 ? ps.lime : ps.ink,
                }}
              />
            </View>
          ))}
        </View>
      </View>

      <View style={{ marginTop: 14 }}>
        <BlockChart />
      </View>

      <View
        style={{
          marginTop: 14,
          paddingTop: 12,
          borderTopWidth: 1,
          borderTopColor: ps.rule,
          flexDirection: 'row',
          alignItems: 'baseline',
        }}
      >
        <T variant="chartLabel" color={ps.muted} style={{ flex: 1 }}>
          {overview.summaryLabel}
        </T>
        <T variant="chartValue" color={ps.text} style={{ fontSize: 13 }}>
          {overview.summary}
        </T>
      </View>
    </View>
  );
}

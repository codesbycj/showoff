import { Pressable, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { balance, copy, money, monthSpend, periodLabel } from '../data/start';
import { DELTA_TOP, HEADER_SIZE, HEADER_TOP, PERIOD_TOP } from '../layout';
import { ob, radius, type } from '../theme';
import { T } from './text';

/**
 * The way back, the month, and what the month came to.
 *
 * The delta under the total is `monthSpend` — the same number the chart's
 * tooltip reads — rather than a second figure typed beside it. The reference
 * has three totals on this screen and no two of them agree.
 */
export function Summary({ onBack }: { onBack?: () => void }) {
  const text = money(balance);
  const sign = text.slice(0, 1);
  const digits = text.slice(1);

  const disc = {
    width: HEADER_SIZE,
    height: HEADER_SIZE,
    borderRadius: radius.pill,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  return (
    <View style={{ marginTop: HEADER_TOP }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Pressable onPress={onBack} accessibilityRole="button" accessibilityLabel="Go back">
          <View style={disc}>
            <Svg width={20} height={20} viewBox="0 0 24 24">
              <Path
                d="M19 12H5.4M11 5.6 4.6 12l6.4 6.4"
                stroke={ob.ink}
                strokeWidth={1.9}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </Svg>
          </View>
        </Pressable>

        <T
          variant="title"
          color={ob.ink}
          style={{ flex: 1, textAlign: 'center', height: type.title.line }}
        >
          {copy.title}
        </T>

        <Pressable accessibilityRole="button" accessibilityLabel="More">
          <View style={disc}>
            <Svg width={20} height={20} viewBox="0 0 24 24">
              <Circle cx={12} cy={5.6} r={1.7} fill={ob.ink} />
              <Circle cx={12} cy={12} r={1.7} fill={ob.ink} />
              <Circle cx={12} cy={18.4} r={1.7} fill={ob.ink} />
            </Svg>
          </View>
        </Pressable>
      </View>

      <T
        variant="period"
        color={ob.body}
        style={{ marginTop: PERIOD_TOP, textAlign: 'center', height: type.period.line }}
      >
        {periodLabel}
      </T>

      <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' }}>
        <T
          variant="totalSign"
          color={ob.body}
          style={{ marginBottom: 7, marginRight: 6, height: type.totalSign.line }}
        >
          {sign}
        </T>
        <T variant="total" color={ob.ink} style={{ height: type.total.line }}>
          {digits}
        </T>
      </View>

      <T
        variant="delta"
        color={ob.body}
        style={{ marginTop: DELTA_TOP, textAlign: 'center', height: type.delta.line }}
      >
        {money(-monthSpend)}
      </T>
    </View>
  );
}

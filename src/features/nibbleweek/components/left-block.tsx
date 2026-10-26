import { View } from 'react-native';

import { copy, left, restShare, segments } from '../data/start';
import { BAR_HEIGHT, BAR_TOP, LEFT_TOP, LEGEND_TOP } from '../layout';
import { nb, radius, type } from '../theme';
import { T } from './text';

const TONES = [nb.blue, nb.mint, nb.yellow] as const;

/**
 * What is left of the day, and what has gone.
 *
 * **The bar's segments and the figure are the same two numbers.** Each
 * segment is one macro's share of what has been logged, scaled by what the
 * day has used — so the filled part of the bar is exactly `logged / goal`
 * and the figure above it is the rest. The reference draws a bar at about a
 * third over a figure that says more than half is left.
 *
 * The segments are flex boxes rather than percentage widths: a percentage
 * needs a definite parent and a `flex` row is not one.
 */
export function LeftBlock() {
  const seg = (i: number) => (
    <View
      style={{
        flex: segments[i].share,
        backgroundColor: TONES[i],
        borderTopLeftRadius: i === 0 ? radius.pill : 0,
        borderBottomLeftRadius: i === 0 ? radius.pill : 0,
      }}
    />
  );

  return (
    <View style={{ marginTop: LEFT_TOP }}>
{/* STEP 1.17 what it measures
      <T variant="leftLabel" color={nb.muted} style={{ height: type.leftLabel.line }}>
        {copy.left}
      </T>
*/}

{/* STEP 1.18 the figure
      <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
        <T variant="huge" color={nb.ink} style={{ height: type.huge.line }}>
          {left.toLocaleString('en-US')}
        </T>
        <T
          variant="hugeUnit"
          color={nb.muted}
          style={{ marginLeft: 8, marginBottom: 10, height: type.hugeUnit.line }}
        >
          {copy.kcal}
        </T>
      </View>
*/}

{/* STEP 1.19 the bar it came off
      <View
        style={{
          height: BAR_HEIGHT,
          marginTop: BAR_TOP,
          borderRadius: radius.pill,
          backgroundColor: nb.well,
          flexDirection: 'row',
          overflow: 'hidden',
        }}
      >
        {seg(0)}
        {seg(1)}
        {seg(2)}
        <View style={{ flex: restShare }} />
      </View>
*/}

{/* STEP 1.20 and what the colours mean
      <View style={{ flexDirection: 'row', marginTop: LEGEND_TOP }}>
        {segments.map((s, i) => (
          <View key={s.id} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }}>
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: radius.pill,
                backgroundColor: TONES[i],
              }}
            />
            <T
              variant="legend"
              color={nb.muted}
              style={{ marginLeft: 6, height: type.legend.line }}
            >
              {s.label}
            </T>
          </View>
        ))}
      </View>
*/}
    </View>
  );
}

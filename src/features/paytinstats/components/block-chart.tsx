import { View } from 'react-native';

import { overview } from '../data/stats';
import {
  AXIS_WIDTH,
  BLOCK_GAP,
  BLOCK_HEIGHT,
  MONTH_TOP,
  PLOT_HEIGHT,
  TOOLTIP_HEIGHT,
} from '../layout';
import { ps, radius } from '../theme';
import { T } from './text';

/**
 * Six months of spending, stacked out of blocks.
 *
 * Blocks rather than a bar: the reference builds each column out of little
 * rounded squares, and the texture is the point — a stack you can count is a
 * different chart from a bar you have to measure against an axis.
 *
 * The columns are `flex: 1` and the axis has its own fixed column, so the plot
 * is whatever the card leaves after it and nothing is pinned to a width.
 *
 * The callout sits in a layer over the plot rather than inside the live
 * column. Inside, a pill reading "$2,410.00" would set that column's width and
 * May would come out three times its neighbours'.
 */
export function BlockChart() {
  const liveIndex = overview.months.findIndex((m) => m.key === overview.live);

  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        {/* STEP 1.30 something to read against
        <View
          style={{
            width: AXIS_WIDTH,
            height: PLOT_HEIGHT,
            justifyContent: 'space-between',
          }}
        >
          {overview.axis.map((label) => (
            <T key={label} variant="axis" color={ps.muted}>
              {label}
            </T>
          ))}
        </View>
        */}

        <View style={{ flex: 1 }}>
          {/* STEP 1.31 a stack a month
          <View style={{ height: PLOT_HEIGHT, flexDirection: 'row', alignItems: 'flex-end' }}>
            {overview.months.map((m) => (
              <View key={m.key} style={{ flex: 1, alignItems: 'center', gap: BLOCK_GAP }}>
                {Array.from({ length: m.debit }, (_, i) => (
                  <Block key={`d${i}`} color={ps.lime} />
                ))}
                {Array.from({ length: m.credit }, (_, i) => (
                  <Block key={`c${i}`} color={ps.ink} />
                ))}
              </View>
            ))}
          </View>
          */}

          {/* STEP 1.32 which month each is
          <View style={{ flexDirection: 'row', marginTop: MONTH_TOP }}>
            {overview.months.map((m) => (
              <View key={m.key} style={{ flex: 1, alignItems: 'center' }}>
                <T variant="axis" color={ps.muted}>
                  {m.key}
                </T>
              </View>
            ))}
          </View>
          */}
        </View>
      </View>

      {/* STEP 1.33 and call out the big one
      <View
        style={{ position: 'absolute', left: AXIS_WIDTH, right: 0, top: 0, flexDirection: 'row' }}
        pointerEvents="none"
      >
        {overview.months.map((m, i) => (
          <View key={m.key} style={{ flex: 1, alignItems: 'center' }}>
            {i === liveIndex ? (
              <View
                style={{
                  height: TOOLTIP_HEIGHT,
                  paddingHorizontal: 9,
                  borderRadius: radius.pill,
                  backgroundColor: ps.ink,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <T variant="tooltip" color={ps.onInk}>
                  {overview.callout}
                </T>
              </View>
            ) : null}
          </View>
        ))}
      </View>
      */}
    </View>
  );
}

/** One square of a stack. Width is 80% of its column, so the air between two
 *  columns is wider than the air between two blocks. */
function Block({ color }: { color: string }) {
  return (
    <View
      style={{
        width: '72%',
        // MISTAKE 1.34 the blocks came in washed out
        opacity: 0.45,
        height: BLOCK_HEIGHT,
        borderRadius: radius.block,
        backgroundColor: color,
      }}
    />
  );
}

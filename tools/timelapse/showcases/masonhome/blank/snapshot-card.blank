import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { completion, copy, weeks } from '../data/start';
import { CARD_PAD, SNAP_HEIGHT, SNAP_TOP } from '../layout';
import { ms, radius, type } from '../theme';
import { BarChart } from './bar-chart';
import { T } from './text';

/**
 * How far through the project is.
 *
 * The figure is `completion`, computed from the work logged in `areas` — the
 * same number the statistics screen reads. The reference prints 72% here and
 * 66% there for the same measurement, which is what happens when a headline
 * is placed rather than derived.
 *
 * The card carries `shadow*` and `elevation` together in one object; a
 * `Platform.select` is exactly what the web harness cannot check (AGENTS.md).
 */
export function SnapshotCard() {
  return (
    <View
      style={{
        height: SNAP_HEIGHT,
        marginTop: SNAP_TOP,
        borderRadius: radius.card,
        backgroundColor: ms.card,
        padding: CARD_PAD,
        flexDirection: 'row',
        shadowColor: '#2A1B12',
        shadowOpacity: 0.08,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 8 },
        elevation: 4,
      }}
    >
      <View style={{ flex: 1 }}>
{/* STEP 1.11 what it is
        <T variant="cardTitle" color={ms.ink} style={{ height: type.cardTitle.line }}>
          {copy.snapshot}
        </T>
*/}

{/* STEP 1.12 counted from the work
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <T variant="big" color={ms.ink} style={{ height: type.big.line }}>
              {String(completion)}
            </T>
            <T
              variant="bigUnit"
              color={ms.ink}
              style={{ marginTop: 10, height: type.bigUnit.line }}
            >
              %
            </T>
          </View>
          <T variant="sub" color={ms.muted} style={{ height: type.sub.line }}>
            {copy.completionLabel}
          </T>
        </View>
*/}

{/* STEP 1.15 and whether it is on track
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'flex-start',
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: radius.chip,
            backgroundColor: ms.well,
          }}
        >
          <Svg width={8} height={8} viewBox="0 0 8 8">
            <Circle cx={4} cy={4} r={4} fill={ms.green} />
          </Svg>
          <T variant="chip" color={ms.ink} style={{ marginLeft: 6, height: type.chip.line }}>
            {copy.onTrack}
          </T>
        </View>
*/}
      </View>

{/* STEP 1.16 week by week
      <View style={{ justifyContent: 'flex-end' }}>
        <BarChart values={weeks} w={132} h={86} />
      </View>
*/}
    </View>
  );
}

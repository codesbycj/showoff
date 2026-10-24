import { Image, View } from 'react-native';
import Svg, { Line } from 'react-native-svg';

import { readings } from '../data/intro';
import { CHIP_H, LEADER_H } from '../layout';
import { nl, radius } from '../theme';
import { T } from './text';

const VEG = require('../../../../assets/images/nutrione/veg.jpg');

/**
 * The photograph the screen stands on, with two readings pinned over it.
 *
 * A pile of vegetables is a photograph: it is a specific subject and out of
 * drawing range (AGENTS.md). The chips and the dashed leaders that drop from
 * them are drawn, which is what they are — flat marks.
 *
 * Each chip sits at a fraction of the stage rather than at a dp offset, so the
 * pair keeps its spread on a 360dp phone as well as a 430dp one.
 */
export function VegStage({ width, height }: { width: number; height: number }) {
  return (
    <View style={{ width, height }}>
      {/* STEP 1.10 the vegetables
      <Image
        source={VEG}
        style={{ position: 'absolute', left: 0, top: CHIP_H / 2, width, height }}
        resizeMode="cover"
        accessibilityIgnoresInvertColors
      />
      */}

      {/* STEP 1.11 and what they come to
      {readings.map((r) => (
        <View key={r.key} style={{ position: 'absolute', left: width * r.x, top: 0 }}>
          <View
            style={{
              // MISTAKE 1.14 the chips came in dropped
              marginTop: 18,
              height: CHIP_H,
              paddingHorizontal: 13,
              borderRadius: radius.pill,
              backgroundColor: nl.chip,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <T variant="chip" color={nl.ink}>
              {r.label}
            </T>
          </View>

          <Svg width={2} height={LEADER_H} style={{ alignSelf: 'center' }}>
            <Line
              x1={1}
              y1={0}
              x2={1}
              y2={LEADER_H}
              stroke={nl.leader}
              strokeWidth={1.2}
              strokeDasharray="3 4"
            />
          </Svg>
        </View>
      ))}
      */}
    </View>
  );
}

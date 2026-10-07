import { Text, View } from 'react-native';
import Svg, { Ellipse, Path } from 'react-native-svg';

import { ELEV, R, SP, TYPE, fa } from '../theme';

import { Symbol } from './symbol';

const W = 280;
/** `h-10` — the height the arc occupies in layout, before it overflows. */
const BOX_H = 40;
/** How far the ellipse reaches above that box: `cy 8 - ry 24`. */
const BLEED = 18;

/**
 * The turntable arc under the hero, and its angle badge.
 *
 * The export draws this as one `overflow-visible` SVG: a dashed ellipse at
 * `cy 8, ry 24` that reaches 16 units above the viewBox's own top, and a solid
 * curve across the front of it. `react-native-svg` clips to the viewBox instead
 * of overflowing, so the viewBox is opened upward by 18 and the element is
 * pulled back up by the same amount — the drawing lands where the export puts
 * it, and the 40dp the arc occupies in layout is unchanged.
 */
export function Turntable({ angle }: { angle: string }) {
  return (
    <View style={{ width: W, height: BOX_H, marginTop: -SP.lg, alignItems: 'center' }}>
      <Svg
        width={W}
        height={BOX_H + BLEED}
        viewBox={`0 ${-BLEED} ${W} ${BOX_H + BLEED}`}
        style={{ position: 'absolute', top: -BLEED }}
      >
        <Ellipse
          cx={140}
          cy={8}
          rx={136}
          ry={24}
          stroke={fa.primaryContainer}
          strokeDasharray="3 3"
          strokeOpacity={0.35}
          strokeWidth={1.5}
          fill="none"
        />
        <Path
          d="M 30,19 C 75,34 205,34 250,19"
          stroke={fa.primaryContainer}
          strokeLinecap="round"
          strokeWidth={2}
          fill="none"
        />
      </Svg>

      <View
        style={{
          position: 'absolute',
          top: SP.md,
          flexDirection: 'row',
          alignItems: 'center',
          gap: SP.xs,
          paddingHorizontal: 10,
          paddingVertical: 2,
          borderRadius: R.full,
          backgroundColor: fa.primaryContainer,
          ...ELEV.glow,
          shadowOpacity: 0.3,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 4 },
        }}
      >
        <Symbol name="icon360" size={13} color={fa.onPrimary} />
        <Text style={{ ...TYPE.labelSm, color: fa.onPrimary }}>{angle}</Text>
      </View>
    </View>
  );
}

import { Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { TYPE, pf } from '../theme';

/** The export's own geometry: a 100-unit box, r 40, 9 units of stroke. */
const R = 40;
const CX = 50;
const CY = 50;
const STROKE = 9;

/** The arc from twelve o'clock, clockwise, as a share of the circle. */
function arc(progress: number) {
  const t = Math.min(Math.max(progress, 0), 0.9999);
  const theta = t * 2 * Math.PI;
  const x = CX + R * Math.sin(theta);
  const y = CY - R * Math.cos(theta);
  return `M ${CX} ${CY - R} A ${R} ${R} 0 ${t > 0.5 ? 1 : 0} 1 ${x.toFixed(3)} ${y.toFixed(3)}`;
}

/**
 * The hero's streak gauge: 6 of 7 days, as a ring.
 *
 * Drawn on the export's own 100-unit viewBox so the gauge keeps its
 * proportions from one `size`. The markup sets the sweep as a dash against a
 * 251.2-unit circumference — `stroke-dashoffset: 38`, so 84.9% — which the
 * subtitle rounds up to 86%.
 *
 * The arc is a path rather than a dashed circle under a quarter turn, which is
 * what the markup does. Two reasons, and the second is the one that bit:
 * React Native rotates a view about its own centre whatever `transformOrigin`
 * says, so a rotation belongs inside the SVG rather than on its host — and
 * react-native-svg's own way of writing that, `<G rotation origin>`, emits a
 * `transform-origin` DOM attribute that React rejects. The ring still drew,
 * but every render logged the warning and LogBox put a red bar across the foot
 * of the screen, which is the last thing a recording needs.
 */
export function ProgressRing({
  progress,
  value,
  unit,
  size = 96,
}: {
  progress: number;
  value: string;
  unit: string;
  size?: number;
}) {
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <Circle cx={CX} cy={CY} r={R} fill="none" stroke={pf.ringTrack} strokeWidth={STROKE} />
        <Path
          d={arc(progress)}
          fill="none"
          stroke={pf.lime}
          strokeWidth={STROKE}
          strokeLinecap="round"
        />
      </Svg>

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        pointerEvents="none"
      >
        <Text style={[TYPE.ringValue, { color: pf.ink, includeFontPadding: false }]}>{value}</Text>
        {/* -mt-0.5: the unit tucks up under the figure rather than clearing it. */}
        <Text style={[TYPE.micro, { color: pf.muted, marginTop: -2, includeFontPadding: false }]}>
          {unit}
        </Text>
      </View>
    </View>
  );
}

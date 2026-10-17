import { View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { arcPath } from '../arc';
import { RING_LABEL_TOP, RING_SIZE, RING_STROKE } from '../layout';
import { nr } from '../theme';
import { T } from './text';

/**
 * One macro: a ring, what is left of it in grams, and the macro's name.
 *
 * The track is a full circle and the progress is drawn over it, so the grey
 * that shows is exactly the part not yet eaten. A ring that drew only the
 * remainder would leave a hairline seam at each end where the two arcs meet,
 * and round caps make that seam wider, not narrower.
 *
 * The figure and its unit sit on a shared baseline rather than being one
 * string: "22g" set at one size reads as a number with a letter stuck to it,
 * and the reference clearly sets the g smaller. `alignItems: 'baseline'` is
 * what keeps the two from drifting apart when either size changes.
 */
export function MacroRing({
  value,
  unit,
  label,
  fraction,
  color,
}: {
  value: string;
  unit: string;
  label: string;
  /** How much of this macro's target is already eaten, 0 to 1. */
  fraction: number;
  color: string;
}) {
  const r = (RING_SIZE - RING_STROKE) / 2;
  const c = RING_SIZE / 2;

  return (
    <View style={{ alignItems: 'center' }}>
      <View style={{ width: RING_SIZE, height: RING_SIZE }}>
        <Svg width={RING_SIZE} height={RING_SIZE}>
          {/* STEP 1.16 a ring for the macro
          <Circle cx={c} cy={c} r={r} stroke={nr.track} strokeWidth={RING_STROKE} fill="none" />
          */}
          {/* STEP 1.17 filled as far as it has got
          <Path
            d={arcPath(c, c, r, 0, 360 * Math.min(1, Math.max(0, fraction)))}
            stroke={color}
            strokeWidth={RING_STROKE}
            strokeLinecap="round"
            fill="none"
          />
          */}
        </Svg>

        {/*
          Two boxes, not one. `alignItems: 'baseline'` on a row that is
          stretched to its parent's height pins the baseline to the *top* of
          that height — so the pair has to be centred by an outer column and
          aligned by an inner row.
        */}
        {/* STEP 1.18 how many grams are left
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            // MISTAKE 1.19 the grams came in sitting low in the ring
            marginTop: 16,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <T variant="ringValue" color={nr.ink}>
              {value}
            </T>
            <T variant="ringUnit" color={nr.ink}>
              {unit}
            </T>
          </View>
        </View>
        */}
      </View>

      {/* STEP 1.20 and which macro it is
      <T variant="ringLabel" color={nr.muted} style={{ marginTop: RING_LABEL_TOP }}>
        {label}
      </T>
      */}
    </View>
  );
}

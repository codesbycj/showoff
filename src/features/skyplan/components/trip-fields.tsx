import { Pressable, View } from 'react-native';

import { trip } from '../data/plan';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { height: number };

/**
 * Where the trip starts and where it ends, with the swap control on the rule
 * between them.
 *
 * The swap button is 44dp of real box (R7) — the board draws it at 36dp — and
 * it is a sibling of the two rows rather than a child of either, so it can sit
 * centred on the divider without a `role="button"` ending up inside another.
 *
 * **Both rows are inset by 56dp on the right**, which is the fix R3 asks for:
 * a control may sit inside a surface but not straddle the content it covers,
 * and the fix is to inset the content rather than to nudge the control. The
 * strings are short enough that nothing looked wrong — the audit measures the
 * boxes, which is the point of it.
 */
export function TripFields({ height }: Props) {
  return (
    <View>
      {/* STEP 1.07 from label
      <View style={{ height, justifyContent: 'center', paddingRight: 56 }}>
        <T variant="fieldLabel">{trip.fromLabel}</T>
        <T variant="fieldValue">{trip.from}</T>
      </View>
      */}

      {/* STEP 1.08 view
      <View style={{ height: 1, backgroundColor: ct.line }} />
      */}

      {/* STEP 1.09 to label
      <View style={{ height, justifyContent: 'center', paddingRight: 56 }}>
        <T variant="fieldLabel">{trip.toLabel}</T>
        <T variant="fieldValue">{trip.to}</T>
      </View>
      */}

      {/* STEP 1.10 "Swap origin and destination"
      <View style={{ position: 'absolute', right: 0, top: height - 22 }}>
        <Pressable accessibilityRole="button" accessibilityLabel="Swap origin and destination">
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: ct.surface,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#0B1220',
              shadowOpacity: 0.14,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 4 },
              elevation: 4,
            }}
          >
            <Glyph name="swap" size={19} color={ct.accent} strokeWidth={1.9} />
          </View>
        </Pressable>
      </View>
      */}
    </View>
  );
}

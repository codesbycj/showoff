import { Pressable, View } from 'react-native';

import { intensity, session } from '../data/session';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { radius: number; height: number; width: number };

/**
 * How hard the session pushes.
 *
 * **The knob reads the value** (R9): its position is `intensity` across the
 * track, so the picture and the setting cannot disagree. The value is clamped,
 * so a figure outside 0-1 cannot push the knob off the end of its own rail.
 *
 * The card's fill sits on an absolutely-filled child so an emptied card paints
 * nothing in frame one of the reveal (I9).
 */
export function ControlsCard({ radius, height, width }: Props) {
  const track = width - 36;
  const knob = 18;
  const at = Math.min(1, Math.max(0, intensity));

  return (
    <View style={{ height, borderRadius: radius }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: ct.card,
          borderRadius: radius,
        }}
      />

      {/* STEP 1.20 controls label
      <Pressable accessibilityRole="button" accessibilityLabel={session.controlsLabel}>
        <View
          style={{
            paddingHorizontal: 18,
            paddingTop: 10,
            height: 44,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View style={{ flex: 1 }}>
            <T variant="rowTitle">{session.controlsLabel}</T>
          </View>
          <Glyph name="chevron" size={16} color={ct.onDarkMuted} strokeWidth={1.8} />
        </View>
      </Pressable>
      */}

      <View style={{ paddingHorizontal: 18, paddingTop: 16 }}>
        <View style={{ height: knob, justifyContent: 'center' }}>
          {/* STEP 1.21 view
          <View style={{ height: 3, borderRadius: 1.5, backgroundColor: ct.line }} />
          */}

          {/* STEP 1.22 view
          <View
            style={{
              position: 'absolute',
              left: 0,
              width: Math.max(knob / 2, track * at),
              height: 3,
              borderRadius: 1.5,
              backgroundColor: ct.onDark,
            }}
          />
          */}

          {/* STEP 1.23 view
          <View
            style={{
              position: 'absolute',
              left: Math.max(0, track * at - knob / 2),
              width: knob,
              height: knob,
              borderRadius: knob / 2,
              backgroundColor: ct.onDark,
            }}
          />
          */}
        </View>

        {/* STEP 1.24 relaxed
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
          <T variant="edge">{session.relaxed}</T>
          <T variant="edge">{session.intense}</T>
        </View>
        */}
      </View>
    </View>
  );
}

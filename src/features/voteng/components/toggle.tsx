import { useEffect } from 'react';
import { Pressable } from 'react-native';
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { R, vt } from '../theme';

const TRACK_W = 44;
const TRACK_H = 26;
const KNOB = 20;
const PAD = (TRACK_H - KNOB) / 2;

/**
 * The switch on an alerts row.
 *
 * The track's colour is interpolated rather than swapped, so it passes through
 * the intermediate greens as the knob travels instead of snapping under it —
 * at 180ms a hard swap reads as a flicker.
 *
 * The knob is a sibling of the track, not a child: giving one view both
 * `overflow: 'hidden'` for the track's radius and an `elevation` for the knob's
 * shadow is the Android combination that renders unreliably.
 */
export function Toggle({ on, onChange }: { on: boolean; onChange?: (next: boolean) => void }) {
  const t = useSharedValue(on ? 1 : 0);

  useEffect(() => {
    t.value = withTiming(on ? 1 : 0, { duration: 180, easing: Easing.out(Easing.quad) });
  }, [on, t]);

  const track = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(t.value, [0, 1], [vt.lineStrong, vt.primary]),
  }));

  const knob = useAnimatedStyle(() => ({
    transform: [{ translateX: PAD + t.value * (TRACK_W - KNOB - PAD * 2) }],
  }));

  return (
    <Pressable onPress={() => onChange?.(!on)} hitSlop={8}>
      <Animated.View
        style={[
          { width: TRACK_W, height: TRACK_H, borderRadius: R.full, justifyContent: 'center' },
          track,
        ]}
      >
        <Animated.View
          style={[
            {
              width: KNOB,
              height: KNOB,
              borderRadius: KNOB / 2,
              backgroundColor: vt.card,
              shadowColor: '#000000',
              shadowOpacity: 0.18,
              shadowRadius: 2,
              shadowOffset: { width: 0, height: 1 },
              elevation: 2,
            },
            knob,
          ]}
        />
      </Animated.View>
    </Pressable>
  );
}

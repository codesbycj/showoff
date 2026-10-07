import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { EM, FONT, R, alpha, vt } from '../theme';

/** The bar's own run, independent of how long the splash is held. */
const FILL_MS = 2200;
/** Where through the fill each status line takes over. */
const STATUS_AT = [0, 0.3, 0.6, 0.88];

/**
 * The splash's tally loader: a filling track, a pinging dot and a line of copy
 * that keeps pace with it.
 *
 * The export's fill is a four-stop keyframe — 0, 55%, 88%, 100% — rather than a
 * linear sweep, which is what makes it read as work being done rather than as a
 * timer. That shape is kept by easing hard out of the start, so the bar is more
 * than half full in the first third and then crawls.
 *
 * The dot is two views, not one: a solid core and a ring that scales out and
 * fades, which is what a CSS `animate-ping` is. Doing it with a single view's
 * own scale would take the core with it.
 */
export function BootLoader({ status, width = 240 }: { status: readonly string[]; width?: number }) {
  const fill = useSharedValue(0);
  const ping = useSharedValue(0);
  const [line, setLine] = useState(0);

  useEffect(() => {
    fill.value = withTiming(1, { duration: FILL_MS, easing: Easing.bezier(0.2, 0.8, 0.25, 1) });
    ping.value = withRepeat(withTiming(1, { duration: 1000, easing: Easing.out(Easing.ease) }), -1);

    const timers = STATUS_AT.map((at, i) => setTimeout(() => setLine(i), at * FILL_MS));
    return () => timers.forEach(clearTimeout);
  }, [fill, ping]);

  const bar = useAnimatedStyle(() => ({ width: `${fill.value * 100}%` }));
  const ring = useAnimatedStyle(() => ({
    opacity: 1 - ping.value,
    transform: [{ scale: 1 + ping.value }],
  }));

  return (
    <View style={{ width, alignItems: 'center' }}>
      <View
        style={{
          width: '100%',
          height: 6,
          borderRadius: R.full,
          backgroundColor: alpha(EM[950], 0.8),
          borderWidth: 1,
          borderColor: alpha(EM[500], 0.3),
          padding: 1,
          overflow: 'hidden',
        }}
      >
        <Animated.View style={[{ height: '100%', borderRadius: R.full, overflow: 'hidden' }, bar]}>
          <LinearGradient
            colors={[EM[400], vt.neon, EM[200]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
          />
        </Animated.View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 12 }}>
        <View style={{ width: 6, height: 6, alignItems: 'center', justifyContent: 'center' }}>
          <Animated.View
            style={[
              {
                position: 'absolute',
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: vt.neon,
              },
              ring,
            ]}
          />
          <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: vt.neon }} />
        </View>

        <Text
          style={{
            fontFamily: FONT.medium,
            fontSize: 10.5,
            lineHeight: 14,
            letterSpacing: 0.26,
            color: EM[200],
          }}
        >
          {status[line]}
        </Text>
      </View>
    </View>
  );
}

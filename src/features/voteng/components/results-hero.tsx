import { LinearGradient } from 'expo-linear-gradient';
import { Clock } from 'lucide-react-native';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { EM, FONT, R, SP, alpha, vt } from '../theme';
import { BallotGraphic } from './ballot-graphic';

/** How wide the copy runs before the ballot graphic starts behind it. */
const COPY_WIDTH = 240;

/**
 * The results hero: the election, how much of it has been counted, and when
 * that number last moved.
 *
 * The two metrics sit on a rule that the copy above does not touch, and they
 * are bottom-aligned rather than top-aligned — the percentage is much taller
 * than the clock, and aligning their tops would leave the clock floating in the
 * middle of nothing.
 */
export function ResultsHero({
  live,
  title,
  blurb,
  pct,
  pctLabel,
  share,
  elapsed,
  updated,
}: {
  live: string;
  title: string;
  blurb: string;
  pct: string;
  pctLabel: string;
  share: number;
  elapsed: string;
  updated: string;
}) {
  const pulse = useSharedValue(1);

  useEffect(() => {
    pulse.value = withRepeat(
      withTiming(0.35, { duration: 900, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [pulse]);

  const dot = useAnimatedStyle(() => ({ opacity: pulse.value }));

  return (
    <View
      style={{
        borderRadius: R.lg,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: alpha(EM[950], 0.4),
        backgroundColor: vt.heroVia,
      }}
    >
      <LinearGradient
        colors={[vt.heroFrom, vt.heroVia, vt.heroTo]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ position: 'absolute', inset: 0 }}
      />

      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          right: SP.sm,
          top: SP.md,
          bottom: SP.md,
          justifyContent: 'center',
          opacity: 0.75,
        }}
      >
        <BallotGraphic />
      </View>

      <View style={{ padding: SP.margin, maxWidth: COPY_WIDTH }}>
        <View
          style={{
            alignSelf: 'flex-start',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            backgroundColor: vt.card,
            borderRadius: R.full,
            paddingHorizontal: 10,
            paddingVertical: 2,
          }}
        >
          <Animated.View
            style={[{ width: 8, height: 8, borderRadius: 4, backgroundColor: vt.live }, dot]}
          />
          <Text style={{ fontFamily: FONT.bold, fontSize: 11, lineHeight: 16, color: vt.live }}>
            {live}
          </Text>
        </View>

        <Text
          style={{
            marginTop: 14,
            fontFamily: FONT.black,
            fontSize: 22,
            lineHeight: 28,
            letterSpacing: -0.55,
            color: vt.card,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            marginTop: 6,
            fontFamily: FONT.regular,
            fontSize: 12,
            lineHeight: 17,
            color: alpha(EM[200], 0.9),
          }}
        >
          {blurb}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            gap: SP.margin,
            marginTop: SP.margin,
            paddingTop: SP.xs,
            borderTopWidth: 1,
            borderTopColor: alpha(EM[800], 0.4),
          }}
        >
          <View style={{ flex: 1, paddingTop: SP.sm }}>
            <Text
              style={{
                fontFamily: FONT.black,
                fontSize: 26,
                lineHeight: 26,
                letterSpacing: -0.65,
                color: vt.card,
              }}
            >
              {pct}
            </Text>
            <Text
              style={{
                marginTop: 4,
                fontFamily: FONT.medium,
                fontSize: 10,
                lineHeight: 14,
                letterSpacing: -0.1,
                color: EM[200],
              }}
            >
              {pctLabel}
            </Text>
            <View
              style={{
                width: 110,
                height: 6,
                marginTop: SP.sm,
                borderRadius: R.full,
                backgroundColor: alpha(EM[950], 0.8),
                padding: 1,
                overflow: 'hidden',
              }}
            >
              <View
                style={{
                  width: `${share}%`,
                  height: '100%',
                  borderRadius: R.full,
                  backgroundColor: EM[400],
                }}
              />
            </View>
          </View>

          <View
            style={{
              paddingLeft: SP.md,
              paddingTop: SP.sm,
              borderLeftWidth: 1,
              borderLeftColor: alpha(EM[700], 0.6),
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Clock size={14} color={EM[300]} strokeWidth={2} />
              <Text style={{ fontFamily: FONT.bold, fontSize: 13, lineHeight: 17, color: vt.card }}>
                {elapsed}
              </Text>
            </View>
            <Text
              style={{
                marginTop: 2,
                fontFamily: FONT.regular,
                fontSize: 10,
                lineHeight: 13,
                color: alpha(EM[200], 0.8),
              }}
            >
              {updated}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

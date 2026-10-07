import { ChevronRight } from 'lucide-react-native';
import { type ReactNode, useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { EM, FONT, vt } from '../theme';

/**
 * A section title with its way out on the right.
 *
 * `live` adds the breathing dot in front of the action. It is a real animation
 * rather than a static swatch because it is the screen's only signal that the
 * numbers under it are moving — the design leans on it hard enough that a still
 * dot would change what the screen says.
 *
 * `right` replaces the action link outright, for the one head that carries a
 * control rather than a way out — National Results and its metric selector.
 */
export function SectionHead({
  title,
  size = 16,
  action,
  live,
  right,
  onPress,
}: {
  title: string;
  size?: number;
  action?: string;
  live?: boolean;
  right?: ReactNode;
  onPress?: () => void;
}) {
  const pulse = useSharedValue(1);

  useEffect(() => {
    if (!live) return;
    pulse.value = withRepeat(
      withTiming(0.4, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [live, pulse]);

  const dot = useAnimatedStyle(() => ({ opacity: pulse.value }));

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <Text
        style={{
          fontFamily: FONT.bold,
          fontSize: size,
          lineHeight: size + 6,
          letterSpacing: -0.025 * size,
          color: vt.ink,
        }}
      >
        {title}
      </Text>

      {right}

      {action ? (
        <Pressable onPress={onPress} hitSlop={8}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {live ? (
              <Animated.View
                style={[
                  {
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginRight: 6,
                    backgroundColor: EM[500],
                  },
                  dot,
                ]}
              />
            ) : null}
            <Text
              style={{
                fontFamily: FONT.bold,
                fontSize: 11,
                lineHeight: 15,
                color: live ? vt.primary : EM[700],
              }}
            >
              {action}
            </Text>
            <ChevronRight size={12} color={live ? vt.primary : EM[700]} strokeWidth={2.5} />
          </View>
        </Pressable>
      ) : null}
    </View>
  );
}

import { useId } from 'react';
import { Pressable, View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

import { copy } from '../data/start';
import { BUTTON_HEIGHT } from '../layout';
import { ob, radius, type } from '../theme';
import { T } from './text';

/**
 * The way on: a holographic pill, and two other ways in beside it.
 *
 * The pill's fill is drawn in react-native-svg rather than with
 * `expo-linear-gradient`, because a diagonal there comes out mirrored on web
 * (AGENTS.md) — and a gradient the recording shows flipped is worse than one
 * drawn by hand. The `Rect` sits under the label as an absolute fill, so the
 * text keeps its own layout.
 *
 * **The two square buttons are not brand marks.** The reference puts an
 * Apple and a Google logo there; this is a passkey and an email sign-in,
 * which is the same affordance without wearing someone else's mark.
 */
export function Actions({ onStart }: { onStart?: () => void }) {
  const fill = useId();

  const square = {
    width: BUTTON_HEIGHT,
    height: BUTTON_HEIGHT,
    marginLeft: 10,
    borderRadius: radius.card,
    backgroundColor: ob.card,
    borderWidth: 1,
    borderColor: ob.cardEdge,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Pressable
        onPress={onStart}
        accessibilityRole="button"
        accessibilityLabel={copy.action}
        style={{ flex: 1 }}
      >
        <View
          style={{
            height: BUTTON_HEIGHT,
            borderRadius: radius.pill,
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Svg
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <Defs>
              <LinearGradient
                id={fill}
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="0"
                x2="250"
                y2={String(BUTTON_HEIGHT)}
              >
                <Stop offset="0" stopColor={ob.holo2} />
                <Stop offset="0.55" stopColor={ob.holo1} />
                <Stop offset="1" stopColor={ob.holo3} />
              </LinearGradient>
            </Defs>
            <Rect x={0} y={0} width="100%" height="100%" rx={radius.card} fill={`url(#${fill})`} />
          </Svg>
          <T variant="action" color={ob.onHolo} style={{ height: type.action.line }}>
            {copy.action}
          </T>
        </View>
      </Pressable>

      <Pressable accessibilityRole="button" accessibilityLabel="Sign in with a passkey">
        <View style={square}>
          <Svg width={21} height={21} viewBox="0 0 24 24">
            <Path
              d="M12 3.5c-3 0-5.5 2.4-5.5 5.4v1.6M6.5 13.6v2.1M9.4 9a2.6 2.6 0 0 1 5.2 0v3.2a9 9 0 0 1-.9 4M12 9v4.4M17.5 9.2v3.4a15 15 0 0 1-1.3 6M9.3 16.4a13 13 0 0 1-.4 4"
              stroke={ob.ink}
              strokeWidth={1.7}
              strokeLinecap="round"
              fill="none"
            />
          </Svg>
        </View>
      </Pressable>

      <Pressable accessibilityRole="button" accessibilityLabel="Sign in with email">
        <View style={square}>
          <Svg width={21} height={21} viewBox="0 0 24 24">
            <Rect
              x={3}
              y={5.6}
              width={18}
              height={12.8}
              rx={3}
              stroke={ob.ink}
              strokeWidth={1.7}
              fill="none"
            />
            <Path
              d="m4.6 8 6.5 4.6a1.6 1.6 0 0 0 1.8 0L19.4 8"
              stroke={ob.ink}
              strokeWidth={1.7}
              strokeLinecap="round"
              fill="none"
            />
          </Svg>
        </View>
      </Pressable>
    </View>
  );
}

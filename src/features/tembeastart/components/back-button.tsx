import { Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { BACK_SIZE } from '../layout';
import { radius, tb } from '../theme';

/**
 * The way back, in the panel's top-left corner.
 *
 * The arrow is drawn, and that is the right call under the rule rather than an
 * exception to it: an arrow is a piece of interface, not a picture of
 * anything, so it is a vector here exactly as it would be a vector in the real
 * app.
 *
 * The visual box is an inner `View` rather than the `Pressable` itself.
 * `style={({pressed}) => …}` on a `Pressable` is silently dropped in a static
 * render, which costs the control its fill and its height in every screenshot
 * the harness takes.
 */
export function BackButton({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Go back"
      hitSlop={10}
    >
      {({ pressed }) => (
        <View
          style={{
            width: BACK_SIZE,
            height: BACK_SIZE,
            borderRadius: radius.button,
            backgroundColor: tb.scrim,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: pressed ? 0.7 : 1,
          }}
        >
          <Svg width={17} height={17} viewBox="0 0 24 24" fill="none">
            <Path
              d="M15 5 8 12l7 7"
              stroke={tb.deep}
              strokeWidth={2.6}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </View>
      )}
    </Pressable>
  );
}

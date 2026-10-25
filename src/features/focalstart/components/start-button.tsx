import { Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { copy } from '../data/start';
import { BUTTON_HEIGHT, BUTTON_TOP, FOOT_TOP } from '../layout';
import { fc, radius, type } from '../theme';
import { T } from './text';

/**
 * The way on, and the way back in.
 *
 * The lime disc inside the button is decoration, not a second target: the
 * whole 60dp pill is one press. Two controls that look like one is the
 * commonest way a pretty button becomes an unusable one.
 *
 * "Sign in" gets its own 40dp row rather than being a line of text — a link
 * is only as tall as its line, which here would be 16dp.
 */
export function StartButton({
  onStart,
  onSignIn,
}: {
  onStart?: () => void;
  onSignIn?: () => void;
}) {
  return (
    <View>
      <Pressable onPress={onStart} accessibilityRole="button" accessibilityLabel={copy.action}>
        <View
          style={{
            height: BUTTON_HEIGHT,
            marginTop: BUTTON_TOP,
            borderRadius: radius.pill,
            backgroundColor: fc.black,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 6,
          }}
        >
          <T
            variant="action"
            color={fc.onBlack}
            style={{ flex: 1, textAlign: 'center', marginLeft: 46, height: type.action.line }}
          >
            {copy.action}
          </T>
          <View
            style={{
              width: 46,
              height: 46,
              borderRadius: radius.pill,
              backgroundColor: fc.lime,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Svg width={18} height={18} viewBox="0 0 24 24">
              <Path
                d="m9.6 5.6 6.4 6.4-6.4 6.4"
                stroke={fc.onLime}
                strokeWidth={2.4}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </Svg>
          </View>
        </View>
      </Pressable>

      <Pressable onPress={onSignIn} accessibilityRole="button" accessibilityLabel={copy.footLink}>
        <View
          style={{
            height: 40,
            marginTop: FOOT_TOP,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <T variant="foot" color={fc.muted} style={{ height: type.foot.line }}>
            {copy.foot + '  '}
          </T>
          <T variant="footLink" color={fc.ink} style={{ height: type.footLink.line }}>
            {copy.footLink}
          </T>
        </View>
      </Pressable>
    </View>
  );
}

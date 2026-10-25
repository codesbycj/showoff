import { Image, Pressable, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { avatar, copy } from '../data/start';
import { AVATAR, HEAD_TOP } from '../layout';
import { fc, radius, type } from '../theme';
import { T } from './text';

/**
 * Who is signed in, and the one notification control.
 *
 * The avatar is a photograph, per AGENTS.md, with numeric width and height —
 * absolute insets alone make an `Image` paint nothing, silently.
 */
export function GreetRow() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: HEAD_TOP }}>
      <View style={{ flex: 1 }}>
        {copy.greetLines.map((line) => (
          <T key={line} variant="greet" color={fc.ink} style={{ height: type.greet.line }}>
            {line}
          </T>
        ))}
      </View>

      <Pressable accessibilityRole="button" accessibilityLabel="Notifications">
        <View style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
          <Svg width={20} height={20} viewBox="0 0 24 24">
            <Path
              d="M12 3.6a5.6 5.6 0 0 0-5.6 5.6c0 3.5-1 5-1.8 5.9-.4.4-.1 1.1.5 1.1h13.8c.6 0 .9-.7.5-1.1-.8-.9-1.8-2.4-1.8-5.9A5.6 5.6 0 0 0 12 3.6Z"
              fill={fc.ink}
            />
            <Path
              d="M10.1 19.2a2 2 0 0 0 3.8 0"
              stroke={fc.ink}
              strokeWidth={1.7}
              strokeLinecap="round"
              fill="none"
            />
            <Circle cx={17.4} cy={6} r={2.6} fill={fc.lime} />
          </Svg>
        </View>
      </Pressable>

      <Image
        source={avatar}
        style={{ width: AVATAR, height: AVATAR, marginLeft: 6, borderRadius: radius.pill }}
        accessibilityIgnoresInvertColors
      />
    </View>
  );
}

import { Image, Pressable, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { copy, faces } from '../data/start';
import { AVATAR, BELL } from '../layout';
import { ob, radius, type } from '../theme';
import { T } from './text';

/**
 * Who is signed in, and the one notification control.
 *
 * The avatar is a photograph, per AGENTS.md: a person's face is a picture,
 * not an icon, and initials on a disc is the fallback state rather than the
 * design. The `Image` carries numeric width and height — absolute insets
 * alone make it paint nothing, silently.
 */
export function Header() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image
        source={faces[0]}
        style={{ width: AVATAR, height: AVATAR, borderRadius: radius.pill }}
        accessibilityIgnoresInvertColors
      />
      <T
        variant="greeting"
        color={ob.ink}
        style={{ flex: 1, marginLeft: 12, height: type.greeting.line }}
      >
        {copy.greeting}
      </T>
      <Pressable accessibilityRole="button" accessibilityLabel="Notifications">
        <View
          style={{
            width: BELL,
            height: BELL,
            borderRadius: radius.pill,
            backgroundColor: ob.card,
            borderWidth: 1,
            borderColor: ob.cardEdge,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Svg width={18} height={18} viewBox="0 0 24 24">
            <Path
              d="M12 4.2a5.4 5.4 0 0 0-5.4 5.4c0 3.4-1 4.9-1.7 5.7-.4.4-.1 1.1.5 1.1h13.2c.6 0 .9-.7.5-1.1-.7-.8-1.7-2.3-1.7-5.7A5.4 5.4 0 0 0 12 4.2Z"
              stroke={ob.ink}
              strokeWidth={1.6}
              strokeLinejoin="round"
              fill="none"
            />
            <Path
              d="M10.2 19a1.9 1.9 0 0 0 3.6 0"
              stroke={ob.ink}
              strokeWidth={1.6}
              strokeLinecap="round"
              fill="none"
            />
            <Circle cx={17.4} cy={6.6} r={2.6} fill={ob.holo1} />
          </Svg>
        </View>
      </Pressable>
    </View>
  );
}

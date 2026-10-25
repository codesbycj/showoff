import { Image, Pressable, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { copy, faces } from '../data/start';
import { AVATAR, BELL } from '../layout';
import { kt, radius, type } from '../theme';
import { T } from './text';

/**
 * Who is signed in, and the one notification control.
 *
 * The avatar is a photograph, per AGENTS.md — a face is a picture, not an
 * icon. The `Image` carries numeric width and height, because absolute
 * insets alone make it paint nothing, silently.
 */
export function PanelHeader() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image
        source={faces[0]}
        style={{ width: AVATAR, height: AVATAR, borderRadius: radius.pill }}
        accessibilityIgnoresInvertColors
      />
      <T
        variant="greeting"
        color={kt.ink}
        style={{ flex: 1, marginLeft: 10, height: type.greeting.line }}
      >
        {copy.greeting}
      </T>
      <Pressable accessibilityRole="button" accessibilityLabel="Notifications">
        <View
          style={{
            width: BELL,
            height: BELL,
            borderRadius: radius.pill,
            backgroundColor: kt.panelCard,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Svg width={17} height={17} viewBox="0 0 24 24">
            <Path
              d="M12 4.4a5.2 5.2 0 0 0-5.2 5.2c0 3.3-1 4.7-1.6 5.5-.4.4-.1 1.1.5 1.1h12.6c.6 0 .9-.7.5-1.1-.6-.8-1.6-2.2-1.6-5.5A5.2 5.2 0 0 0 12 4.4Z"
              stroke={kt.ink}
              strokeWidth={1.5}
              strokeLinejoin="round"
              fill="none"
            />
            <Path
              d="M10.3 18.8a1.8 1.8 0 0 0 3.4 0"
              stroke={kt.ink}
              strokeWidth={1.5}
              strokeLinecap="round"
              fill="none"
            />
            <Circle cx={17} cy={7} r={2.4} fill={kt.coral} />
          </Svg>
        </View>
      </Pressable>
    </View>
  );
}

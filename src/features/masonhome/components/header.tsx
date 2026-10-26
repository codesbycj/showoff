import { Image, Pressable, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { avatar } from '../data/start';
import { AVATAR, HEAD_DISC, HEAD_TOP, LOGO } from '../layout';
import { ms, radius } from '../theme';

/**
 * The brand, the bell and who is signed in.
 *
 * The mark is a tower drawn as three stacked bars — a small flat shape, which
 * is the side of the drawing-range rule that *is* vectors. The avatar is a
 * photograph, with numeric width and height.
 */
export function Header({ onBell }: { onBell?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: HEAD_TOP }}>
{/* STEP 1.03 a tower, drawn
      <View
        style={{
          width: LOGO,
          height: LOGO,
          borderRadius: 15,
          backgroundColor: ms.orange,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Svg width={22} height={22} viewBox="0 0 24 24">
          <Rect x={4} y={9} width={5} height={11} rx={1.4} fill={ms.onOrange} />
          <Rect x={10.5} y={5} width={5} height={15} rx={1.4} fill={ms.onOrange} />
          <Rect x={17} y={12} width={3.4} height={8} rx={1.2} fill={ms.onOrange} opacity={0.8} />
        </Svg>
      </View>
*/}

      <View style={{ flex: 1 }} />

{/* STEP 1.04 the bell
      <Pressable onPress={onBell} accessibilityRole="button" accessibilityLabel="Notifications">
        <View
          style={{
            width: HEAD_DISC,
            height: HEAD_DISC,
            marginRight: 8,
            borderRadius: radius.pill,
            backgroundColor: ms.well,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Svg width={19} height={19} viewBox="0 0 24 24">
            <Path
              d="M12 4a5.4 5.4 0 0 0-5.4 5.4c0 3.3-1 4.7-1.7 5.6-.4.4-.1 1 .5 1h13.2c.6 0 .9-.6.5-1-.7-.9-1.7-2.3-1.7-5.6A5.4 5.4 0 0 0 12 4Z"
              stroke={ms.ink}
              strokeWidth={1.7}
              strokeLinejoin="round"
              fill="none"
            />
            <Path
              d="M10.3 18.6a1.9 1.9 0 0 0 3.4 0"
              stroke={ms.ink}
              strokeWidth={1.7}
              strokeLinecap="round"
              fill="none"
            />
            <Circle cx={17} cy={7} r={2.4} fill={ms.orange} />
          </Svg>
        </View>
      </Pressable>
*/}

{/* STEP 1.07 and their photograph
      <Image
        source={avatar}
        style={{ width: AVATAR, height: AVATAR, borderRadius: radius.pill }}
        accessibilityIgnoresInvertColors
      />
*/}
    </View>
  );
}

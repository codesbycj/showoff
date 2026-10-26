import { Pressable, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { copy } from '../data/start';
import { HEAD_DISC, HEAD_TOP } from '../layout';
import { cr, type } from '../theme';
import { T } from './text';

/** The way back, what the screen is, and the overflow. */
export function TopBar({ onBack }: { onBack?: () => void }) {
  const disc = {
    width: HEAD_DISC,
    height: HEAD_DISC,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: HEAD_TOP }}>
{/* STEP 1.03 a chevron
      <Pressable onPress={onBack} accessibilityRole="button" accessibilityLabel="Go back">
        <View style={disc}>
          <Svg width={20} height={20} viewBox="0 0 24 24">
            <Path
              d="M19 12H5.4M11 5.6 4.6 12l6.4 6.4"
              stroke={cr.ink}
              strokeWidth={1.9}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </Svg>
        </View>
      </Pressable>
*/}

{/* STEP 1.04 the title
      <T
        variant="title"
        color={cr.ink}
        style={{ flex: 1, textAlign: 'center', height: type.title.line }}
      >
        {copy.title}
      </T>
*/}

{/* STEP 1.05 and the overflow
      <Pressable accessibilityRole="button" accessibilityLabel="More">
        <View style={disc}>
          <Svg width={20} height={20} viewBox="0 0 24 24">
            <Circle cx={8} cy={12} r={1.7} fill={cr.ink} />
            <Circle cx={16} cy={12} r={1.7} fill={cr.ink} />
          </Svg>
        </View>
      </Pressable>
*/}
    </View>
  );
}

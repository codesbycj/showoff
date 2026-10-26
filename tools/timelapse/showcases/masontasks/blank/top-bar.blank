import { Pressable, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { copy } from '../data/start';
import { HEAD_DISC, HEAD_TOP } from '../layout';
import { ms, radius, type } from '../theme';
import { T } from './text';

/** The way back, what the screen is, and the filter. */
export function TopBar({ onBack, onFilter }: { onBack?: () => void; onFilter?: () => void }) {
  const disc = {
    width: HEAD_DISC,
    height: HEAD_DISC,
    borderRadius: radius.pill,
    backgroundColor: ms.well,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: HEAD_TOP }}>
{/* STEP 1.03 a chevron
      <Pressable onPress={onBack} accessibilityRole="button" accessibilityLabel="Go back">
        <View style={disc}>
          <Svg width={18} height={18} viewBox="0 0 24 24">
            <Path
              d="M14.4 5.6 8 12l6.4 6.4"
              stroke={ms.ink}
              strokeWidth={2}
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
        color={ms.ink}
        style={{ flex: 1, textAlign: 'center', height: type.title.line }}
      >
        {copy.title}
      </T>
*/}

{/* STEP 1.05 and the filter
      <Pressable onPress={onFilter} accessibilityRole="button" accessibilityLabel="Filter tasks">
        <View style={disc}>
          <Svg width={18} height={18} viewBox="0 0 24 24">
            <Path
              d="M4 8h12M18 8h2M4 16h4M12 16h8"
              stroke={ms.ink}
              strokeWidth={1.8}
              strokeLinecap="round"
            />
            <Circle cx={17} cy={8} r={2.2} fill={ms.ink} />
            <Circle cx={10} cy={16} r={2.2} fill={ms.ink} />
          </Svg>
        </View>
      </Pressable>
*/}
    </View>
  );
}

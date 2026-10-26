import { Pressable, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { copy } from '../data/start';
import { HEAD_DISC, HEAD_TOP } from '../layout';
import { ms, radius, type } from '../theme';
import { T } from './text';

/** One of the three round controls on the right of the bar. */
function Disc({ kind, onPress }: { kind: 'add' | 'home' | 'more'; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={kind}>
      <View
        style={{
          width: HEAD_DISC,
          height: HEAD_DISC,
          marginLeft: 8,
          borderRadius: radius.pill,
          backgroundColor: ms.well,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Svg width={18} height={18} viewBox="0 0 24 24">
          {kind === 'add' ? (
            <Path
              d="M12 5.6v12.8M5.6 12h12.8"
              stroke={ms.ink}
              strokeWidth={2}
              strokeLinecap="round"
            />
          ) : null}
          {kind === 'home' ? (
            <Path
              d="M4.4 10.4 12 4.6l7.6 5.8v8a1.6 1.6 0 0 1-1.6 1.6H6a1.6 1.6 0 0 1-1.6-1.6Z"
              stroke={ms.ink}
              strokeWidth={1.8}
              strokeLinejoin="round"
              fill="none"
            />
          ) : null}
          {kind === 'more' ? (
            <>
              <Circle cx={6} cy={12} r={1.7} fill={ms.ink} />
              <Circle cx={12} cy={12} r={1.7} fill={ms.ink} />
              <Circle cx={18} cy={12} r={1.7} fill={ms.ink} />
            </>
          ) : null}
        </Svg>
      </View>
    </Pressable>
  );
}

/** The way back, what the screen is, and the three controls. */
export function TopBar({ onBack, onHome }: { onBack?: () => void; onHome?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: HEAD_TOP }}>
{/* STEP 1.03 a chevron
      <Pressable onPress={onBack} accessibilityRole="button" accessibilityLabel="Go back">
        <View
          style={{
            width: HEAD_DISC,
            height: HEAD_DISC,
            borderRadius: radius.pill,
            backgroundColor: ms.well,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
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
        style={{ flex: 1, marginLeft: 12, height: type.title.line }}
      >
        {copy.title}
      </T>
*/}

{/* STEP 1.05 add one
      <Disc kind="add" />
*/}
{/* STEP 1.06 go home, and the rest
      <Disc kind="home" onPress={onHome} />
      <Disc kind="more" />
*/}
    </View>
  );
}

import { Pressable, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { HEAD_DISC, HEAD_TOP } from '../layout';
import { nb, radius } from '../theme';

/** One round control. Written out in `TopBar` so the reveal lands them singly. */
function Disc({
  kind,
  dot,
  onPress,
}: {
  kind: 'back' | 'search' | 'bell';
  dot?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={kind}>
      <View
        style={{
          width: HEAD_DISC,
          height: HEAD_DISC,
          marginLeft: kind === 'back' ? 0 : 10,
          borderRadius: radius.pill,
          backgroundColor: nb.well,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Svg width={19} height={19} viewBox="0 0 24 24">
          {kind === 'back' ? (
            <Path
              d="M14.4 5.6 8 12l6.4 6.4"
              stroke={nb.ink}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          ) : null}
          {kind === 'search' ? (
            <>
              <Circle cx={10.8} cy={10.8} r={6.4} stroke={nb.ink} strokeWidth={1.9} fill="none" />
              <Path d="m15.6 15.6 4 4" stroke={nb.ink} strokeWidth={1.9} strokeLinecap="round" />
            </>
          ) : null}
          {kind === 'bell' ? (
            <>
              <Path
                d="M6 10.4a6 6 0 0 1 12 0c0 3.2.8 4.6 1.5 5.4.4.5 0 1.2-.6 1.2H5.1c-.6 0-1-.7-.6-1.2.7-.8 1.5-2.2 1.5-5.4Z"
                stroke={nb.ink}
                strokeWidth={1.8}
                strokeLinejoin="round"
                fill="none"
              />
              <Path
                d="M10 19.4a2.2 2.2 0 0 0 4 0"
                stroke={nb.ink}
                strokeWidth={1.8}
                strokeLinecap="round"
                fill="none"
              />
            </>
          ) : null}
        </Svg>

        {dot ? (
          <View
            style={{
              position: 'absolute',
              top: 8,
              right: 9,
              width: 8,
              height: 8,
              borderRadius: radius.pill,
              backgroundColor: '#F0607A',
            }}
          />
        ) : null}
      </View>
    </Pressable>
  );
}

/** The way back, and the two things every screen can reach. */
export function TopBar({ onBack }: { onBack?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: HEAD_TOP }}>
{/* STEP 1.03 a chevron
      <Disc kind="back" onPress={onBack} />
*/}
      <View style={{ flex: 1 }} />
{/* STEP 1.04 and the two every screen has
      <Disc kind="search" />
      <Disc kind="bell" dot />
*/}
    </View>
  );
}

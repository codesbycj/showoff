import { Pressable, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { HEAD_DISC, HEAD_TOP } from '../layout';
import { ls, radius } from '../theme';

/** One round control. Written out in `TopBar` so the reveal lands them singly. */
function Disc({ kind, onPress }: { kind: 'back' | 'chart' | 'more'; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={kind}>
      <View
        style={{
          width: HEAD_DISC,
          height: HEAD_DISC,
          marginLeft: kind === 'back' ? 0 : 10,
          borderRadius: radius.pill,
          backgroundColor: ls.card,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Svg width={19} height={19} viewBox="0 0 24 24">
          {kind === 'back' ? (
            <Path
              d="M19.4 12H4.6m0 0 6-6m-6 6 6 6"
              stroke={ls.ink}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          ) : null}
          {kind === 'chart' ? (
            <>
              <Rect x={4} y={11} width={3.6} height={9} rx={1.4} fill={ls.ink} />
              <Rect x={10.2} y={4} width={3.6} height={16} rx={1.4} fill={ls.ink} />
              <Rect x={16.4} y={8} width={3.6} height={12} rx={1.4} fill={ls.ink} />
            </>
          ) : null}
          {kind === 'more' ? (
            <>
              <Circle cx={12} cy={5.4} r={1.8} fill={ls.ink} />
              <Circle cx={12} cy={12} r={1.8} fill={ls.ink} />
              <Circle cx={12} cy={18.6} r={1.8} fill={ls.ink} />
            </>
          ) : null}
        </Svg>
      </View>
    </Pressable>
  );
}

/** The way back, and the two things this screen can switch to. */
export function TopBar({ onBack }: { onBack?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: HEAD_TOP }}>
{/* STEP 1.03 a way back
      <Disc kind="back" onPress={onBack} />
*/}
      <View style={{ flex: 1 }} />
{/* STEP 1.04 a way to switch chart
      <Disc kind="chart" />
*/}
{/* STEP 1.05 and the rest
      <Disc kind="more" />
*/}
    </View>
  );
}

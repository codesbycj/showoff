import { Image, Pressable, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { avatar, copy } from '../data/start';
import { AVATAR, HEAD_DISC, HEAD_TOP } from '../layout';
import { nb, radius, type } from '../theme';
import { T } from './text';

/** One of the two round controls on the right. */
function Disc({
  kind,
  dot,
  onPress,
}: {
  kind: 'search' | 'bell';
  dot?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={kind}>
      <View
        style={{
          width: HEAD_DISC,
          height: HEAD_DISC,
          marginLeft: 10,
          borderRadius: radius.pill,
          backgroundColor: nb.well,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Svg width={19} height={19} viewBox="0 0 24 24">
          {kind === 'search' ? (
            <>
              <Circle cx={10.8} cy={10.8} r={6.4} stroke={nb.ink} strokeWidth={1.9} fill="none" />
              <Path d="m15.6 15.6 4 4" stroke={nb.ink} strokeWidth={1.9} strokeLinecap="round" />
            </>
          ) : (
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
          )}
        </Svg>

        {/*
          The unread dot is a sibling of the Svg rather than a <Circle> inside
          it, so it can sit outside the glyph's 19dp box. It is drawn, not a
          badge character: an emoji is whatever font the platform has.
        */}
        {dot ? (
          <View
            style={{
              position: 'absolute',
              top: 7,
              right: 8,
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

/** Who is here, and the two things every screen can reach. */
export function TopBar({ onSearch }: { onSearch?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: HEAD_TOP }}>
{/* STEP 1.03 a face
      <Image source={avatar} style={{ width: AVATAR, height: AVATAR, borderRadius: radius.pill }} />
*/}

{/* STEP 1.04 and a greeting
      <T
        variant="greet"
        color={nb.ink}
        style={{ flex: 1, marginLeft: 12, height: type.greet.line }}
      >
        {copy.greet}
      </T>
*/}

{/* STEP 1.05 something to find
      <Disc kind="search" onPress={onSearch} />
*/}
{/* STEP 1.06 and something waiting
      <Disc kind="bell" dot />
*/}
    </View>
  );
}

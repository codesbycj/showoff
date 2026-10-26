import { Image, Pressable, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { avatar, copy, stats } from '../data/start';
import { AVATAR, HEAD_DISC, HEAD_TOP } from '../layout';
import { lk, radius, type } from '../theme';
import { T } from './text';

/** The streak flame and the gem, drawn — an emoji differs on every platform. */
function Mark({ kind }: { kind: 'flame' | 'gem' }) {
  if (kind === 'flame') {
    return (
      <Svg width={13} height={13} viewBox="0 0 24 24">
        <Path
          d="M12 2.6c4 4 7 6.4 7 11a7 7 0 0 1-14 0c0-2.3 1-3.8 2.4-5.2.3 2 1.3 3 2.6 3 0-3 .7-6 2-8.8Z"
          fill="#F2A33C"
        />
      </Svg>
    );
  }
  return (
    <Svg width={13} height={13} viewBox="0 0 24 24">
      <Path d="M7 4h10l4 6-9 11L3 10Z" fill="#6AC8F2" />
      <Path d="M3 10h18M12 4l-3 6 3 11 3-11-3-6Z" stroke="#11343F" strokeWidth={1.1} fill="none" />
    </Svg>
  );
}

/**
 * Who is signed in, their streak, and the one menu control.
 *
 * The avatar is a photograph, per AGENTS.md — a face is a picture, not an
 * icon — with numeric width and height, because absolute insets alone make an
 * `Image` paint nothing.
 */
export function Header({ onMore }: { onMore?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: HEAD_TOP }}>
{/* STEP 1.03 their photograph
      <Image
        source={avatar}
        style={{ width: AVATAR, height: AVATAR, borderRadius: radius.pill }}
        accessibilityIgnoresInvertColors
      />
*/}

      <View style={{ flex: 1, marginLeft: 10 }}>
{/* STEP 1.04 their name
        <T variant="name" color={lk.ink} style={{ height: type.name.line }}>
          {copy.name}
        </T>
*/}
{/* STEP 1.05 the streak and the gems
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 1 }}>
          <Mark kind="flame" />
          <T variant="stat" color="#F2A33C" style={{ marginLeft: 3, height: type.stat.line }}>
            {String(stats.streak)}
          </T>
          <View style={{ width: 10 }} />
          <Mark kind="gem" />
          <T variant="stat" color="#6AC8F2" style={{ marginLeft: 3, height: type.stat.line }}>
            {String(stats.gems)}
          </T>
        </View>
*/}
      </View>

{/* STEP 1.06 and the menu
      <Pressable onPress={onMore} accessibilityRole="button" accessibilityLabel="More">
        <View
          style={{
            width: HEAD_DISC,
            height: HEAD_DISC,
            borderRadius: radius.pill,
            backgroundColor: lk.pill,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Svg width={17} height={17} viewBox="0 0 24 24">
            <Circle cx={6} cy={12} r={1.7} fill={lk.ink} />
            <Circle cx={12} cy={12} r={1.7} fill={lk.ink} />
            <Circle cx={18} cy={12} r={1.7} fill={lk.ink} />
          </Svg>
        </View>
      </Pressable>
*/}
    </View>
  );
}

import { Image, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { copy, podium } from '../data/start';
import { BLOCK_W, POD_AVATAR, POD_AVATAR_FIRST, PODIUM_TOP } from '../layout';
import { radius, type, vl } from '../theme';
import { T } from './text';

/** A crown, drawn, for whoever is first. */
function Crown() {
  return (
    <Svg width={28} height={20} viewBox="0 0 28 20">
      <Path
        d="M2 17 4 4l6 5 4-7 4 7 6-5 2 13Z"
        fill={vl.gold}
        stroke={vl.gold}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/** A lightning bolt, the mark the XP figures carry. */
function Bolt({ size = 12, tint }: { size?: number; tint: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M13.4 2.6 5.6 13.4h5.2l-.6 8 7.8-10.8h-5.2Z" fill={tint} />
    </Svg>
  );
}

/** One of the three. Written out in `Podium` so the reveal lands them singly. */
function Place({ which }: { which: 'first' | 'second' | 'third' }) {
  const p = podium[which];
  const first = which === 'first';
  const size = first ? POD_AVATAR_FIRST : POD_AVATAR;
  const rank = first ? 1 : which === 'second' ? 2 : 3;

  return (
    <View style={{ alignItems: 'center', width: BLOCK_W }}>
      <View style={{ height: 22, justifyContent: 'flex-end' }}>{first ? <Crown /> : null}</View>

      <Image
        source={p.photo}
        style={{
          width: size,
          height: size,
          borderRadius: radius.pill,
          borderWidth: 3,
          borderColor: first ? vl.gold : vl.onGreen,
        }}
      />

      <T variant="podName" color={vl.onGreen} style={{ marginTop: 8, height: type.podName.line }}>
        {p.name}
      </T>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
        <Bolt tint={vl.gold} />
        <T variant="podXp" color={vl.gold} style={{ marginLeft: 4, height: type.podXp.line }}>
          {p.xp.toLocaleString('en-US')}
        </T>
      </View>

      <View
        style={{
          width: BLOCK_W,
          height: first ? 86 : 58,
          marginTop: 10,
          borderTopLeftRadius: radius.card,
          borderTopRightRadius: radius.card,
          backgroundColor: first ? vl.gold : '#FFFFFF1F',
          alignItems: 'center',
          paddingTop: 12,
        }}
      >
        <T
          variant="podRank"
          color={first ? vl.onGold : vl.onGreen}
          style={{ height: type.podRank.line }}
        >
          {`#${rank}`}
        </T>
      </View>
    </View>
  );
}

/**
 * The top three.
 *
 * The order comes from the sorted roster, so the crown is always on the
 * player with the most XP — the reference's podium is laid out by hand and
 * its figures happen to agree.
 *
 * The three sit on a baseline with the blocks rising to meet it, which is
 * why each column is written out rather than mapped: the middle one is a
 * different size and carries the crown.
 */
export function Podium() {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginTop: PODIUM_TOP,
      }}
    >
{/* STEP 1.07 second
      <Place which="second" />
*/}
{/* STEP 1.08 first, with the crown
      <Place which="first" />
*/}
{/* STEP 1.22 and third
      <Place which="third" />
*/}
    </View>
  );
}

export { Bolt };
export const xpLabel = copy.xp;

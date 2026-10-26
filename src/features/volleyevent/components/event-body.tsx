import { Image, Pressable, View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { useId } from 'react';

import { about, avatars, badges, copy, event, host, joinedShare, spotsLeft } from '../data/start';
import { BADGE_H, BAR_HEIGHT } from '../layout';
import { radius, type, vl } from '../theme';
import { Chevron, People, Trophy } from './glyphs';
import { T } from './text';

const TONES = {
  gold: ['#F3DEAE', '#E6C878'],
  lime: ['#DDEFA8', '#C6E372'],
  sky: ['#CFE2F2', '#A8CCEA'],
  butter: ['#F7E9BE', '#EFD88F'],
} as const;

/**
 * How full it is.
 *
 * **The bar is `joinedShare`** — joined over capacity — and the caption is
 * the remainder of the same pair, so the picture and the figures are one
 * measurement. The reference draws a bar at roughly three-quarters over
 * "12/16", which is not the same thing.
 */
export function JoinedBlock() {
  const fill = useId();

  return (
    <View>
{/* STEP 1.10 how many are in
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <People size={17} tint={vl.ink} />
        <T
          variant="statLabel"
          color={vl.ink}
          style={{ flex: 1, marginLeft: 8, height: type.statLabel.line }}
        >
          {copy.joinedLabel}
        </T>
        <T variant="statValue" color={vl.ink} style={{ height: type.statValue.line }}>
          {String(event.joined)}
        </T>
        <T variant="rowMeta" color={vl.muted} style={{ height: type.rowMeta.line }}>
          {`/${event.capacity}`}
        </T>
      </View>
*/}

{/* STEP 1.11 the bar
      <View
        style={{
          height: BAR_HEIGHT,
          marginTop: 10,
          borderRadius: radius.pill,
          backgroundColor: vl.hairline,
          overflow: 'hidden',
        }}
      >
        <Svg width="100%" height={BAR_HEIGHT}>
          <Defs>
            <LinearGradient id={fill} x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor={vl.green} />
              <Stop offset="1" stopColor={vl.lime} />
            </LinearGradient>
          </Defs>
          <Rect
            x="0"
            y="0"
            width={`${joinedShare * 100}%`}
            height={BAR_HEIGHT}
            rx={BAR_HEIGHT / 2}
            fill={`url(#${fill})`}
          />
        </Svg>
      </View>
*/}

{/* STEP 1.12 and who they are
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
        <T variant="rowMeta" color={vl.muted} style={{ flex: 1, height: type.rowMeta.line }}>
          {`${spotsLeft}${copy.spotsTail}`}
        </T>

        {avatars.map((a, i) => (
          <Image
            key={i}
            source={a}
            style={{
              width: 24,
              height: 24,
              marginLeft: i === 0 ? 0 : -8,
              borderRadius: radius.pill,
              borderWidth: 1.5,
              borderColor: vl.canvas,
            }}
          />
        ))}
      </View>
*/}
    </View>
  );
}

/** What the event is, and what it costs. */
export function AboutBlock() {
  return (
    <View style={{ marginTop: 18 }}>
      <T variant="statValue" color={vl.ink} style={{ height: type.statValue.line }}>
        {copy.about}
      </T>

      <T variant="body" color={vl.muted} style={{ marginTop: 6 }}>
        {about}
      </T>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
        <Svg width={15} height={15} viewBox="0 0 24 24">
          <Path
            d="m12 3.2 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.7l6.1-.9Z"
            fill={vl.lime}
          />
        </Svg>
        <T
          variant="statLabel"
          color={vl.ink}
          style={{ marginLeft: 6, height: type.statLabel.line }}
        >
          {event.rating.toFixed(1)}
        </T>
        <T variant="rowMeta" color={vl.muted} style={{ marginLeft: 6, height: type.rowMeta.line }}>
          {`${event.reviews}${copy.reviewsTail}`}
        </T>

        <View style={{ width: 16 }} />

        <T variant="statLabel" color={vl.ink} style={{ height: type.statLabel.line }}>
          {`€${event.fee}`}
        </T>
        <T variant="rowMeta" color={vl.muted} style={{ marginLeft: 4, height: type.rowMeta.line }}>
          {copy.feeTail}
        </T>
      </View>
    </View>
  );
}

/** One badge. Written out in `RewardBlock` so the reveal lands them singly. */
function Badge({ i }: { i: number }) {
  const b = badges[i];
  const [soft, deep] = TONES[b.tone];

  return (
    <View
      style={{
        flex: 1,
        height: BADGE_H,
        marginRight: 8,
        borderRadius: radius.card,
        backgroundColor: soft,
        // MISTAKE 1.22 the badges came in squared off
        borderTopLeftRadius: 0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 4,
      }}
    >
      <Trophy size={20} tint={deep} />
      <T variant="badgeName" color={vl.ink} style={{ marginTop: 6, height: type.badgeName.line }}>
        {b.name}
      </T>
      <T variant="badgeXp" color={vl.muted} style={{ height: type.badgeXp.line }}>
        {`+${b.xp} XP`}
      </T>
    </View>
  );
}

/** The four of them, which the hero's badge adds up. */
export function RewardBlock() {
  return (
    <View style={{ marginTop: 18 }}>
      <T variant="statValue" color={vl.ink} style={{ height: type.statValue.line }}>
        {copy.rewards}
      </T>

      <View style={{ flexDirection: 'row', marginTop: 10, marginRight: -8 }}>
{/* STEP 1.16 the champion
        <Badge i={0} />
*/}
{/* STEP 1.17 fair play
        <Badge i={1} />
*/}
{/* STEP 1.18 the defender
        <Badge i={2} />
*/}
{/* STEP 1.19 and the top scorer
        <Badge i={3} />
*/}
      </View>
    </View>
  );
}

/** Who is running it, and a way to see what else they run. */
export function HostBlock({ onPress }: { onPress?: () => void }) {
  return (
    <View style={{ marginTop: 18 }}>
      <T variant="statValue" color={vl.ink} style={{ height: type.statValue.line }}>
        {copy.organiser}
      </T>

      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={host.name}
        style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
            padding: 12,
            borderRadius: radius.card,
            backgroundColor: vl.well,
          }}
        >
          <Image source={host.photo} style={{ width: 44, height: 44, borderRadius: radius.pill }} />

          <View style={{ flex: 1, marginLeft: 12 }}>
            <T variant="rowName" color={vl.ink} style={{ height: type.rowName.line }}>
              {host.name}
            </T>
            <T variant="rowMeta" color={vl.muted} style={{ height: type.rowMeta.line }}>
              {copy.hostRole}
            </T>
          </View>

          <Chevron size={16} tint={vl.faint} />
        </View>
      </Pressable>
    </View>
  );
}

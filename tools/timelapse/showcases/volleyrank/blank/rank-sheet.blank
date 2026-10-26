import { Image, Pressable, ScrollView, View } from 'react-native';

import { copy, me, myRank, rankOf, rest } from '../data/start';
import { MINE_HEIGHT, ROW_HEIGHT, SHEET_PAD, SHEET_RADIUS } from '../layout';
import { radius, type, vl } from '../theme';
import { Bolt } from './podium';
import { T } from './text';
import { Trophy } from './glyphs';

/** One ranked player. */
function Row({ i, onPress }: { i: number; onPress?: (id: string) => void }) {
  const p = rest[i];
  const mine = Boolean(p.isMe);

  return (
    <Pressable
      onPress={() => onPress?.(p.id)}
      accessibilityRole="button"
      accessibilityLabel={`${rankOf(p)}, ${p.name}, ${p.xp} XP`}
    >
      <View
        style={{
          height: ROW_HEIGHT,
          marginBottom: 8,
          paddingHorizontal: 10,
          borderRadius: radius.card,
          backgroundColor: mine ? vl.greenSoft : vl.well,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: radius.pill,
            backgroundColor: mine ? vl.gold : vl.hairline,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <T
            variant="rowRank"
            color={mine ? vl.onGold : vl.muted}
            style={{ height: type.rowRank.line }}
          >
            {`#${rankOf(p)}`}
          </T>
        </View>

        <Image
          source={p.photo}
          style={{ width: 40, height: 40, marginLeft: 8, borderRadius: radius.pill }}
        />

        <View style={{ flex: 1, marginLeft: 12 }}>
          <T variant="rowName" color={vl.ink} style={{ height: type.rowName.line }}>
            {p.name}
          </T>
          <T variant="rowMeta" color={vl.muted} style={{ height: type.rowMeta.line }}>
            {`${copy.level}${p.level}  ·  ${p.events}${copy.events}`}
          </T>
        </View>

        <View style={{ alignItems: 'flex-end' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Bolt size={14} tint={vl.gold} />
            <T variant="rowXp" color={vl.ink} style={{ marginLeft: 4, height: type.rowXp.line }}>
              {p.xp.toLocaleString('en-US')}
            </T>
          </View>
          <T variant="rowMeta" color={vl.muted} style={{ height: type.rowMeta.line }}>
            {copy.xp}
          </T>
        </View>
      </View>
    </Pressable>
  );
}

/** Where you stand, pinned under the list. */
export function MyRank() {
  return (
    <View
      style={{
        height: MINE_HEIGHT,
        borderRadius: radius.card,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
      }}
    >
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: radius.card,
          backgroundColor: vl.green,
        }}
      />

      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: 14,
          backgroundColor: vl.goldSoft,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Trophy size={22} tint={vl.gold} />
      </View>

      <View style={{ flex: 1, marginLeft: 12 }}>
        <T variant="mine" color={vl.onGreenDim} style={{ height: type.mine.line }}>
          {copy.mine}
        </T>
        <T variant="mineRank" color={vl.onGreen} style={{ height: type.mineRank.line }}>
          {`#${myRank}`}
        </T>
      </View>

      <View style={{ alignItems: 'flex-end' }}>
        <T variant="mine" color={vl.onGreenDim} style={{ height: type.mine.line }}>
          {copy.cheer}
        </T>
        <T variant="mineXp" color={vl.gold} style={{ height: type.mineXp.line }}>
          {`${me.xp.toLocaleString('en-US')} ${copy.xp}`}
        </T>
      </View>
    </View>
  );
}

/**
 * Everyone below the podium.
 *
 * The sheet rides up over the green block, which is the reference's shape.
 * The rows scroll inside it, so the "your rank" card stays pinned above the
 * dock however many players there are.
 */
export function RankSheet({ onPress }: { onPress?: (id: string) => void }) {
  return (
    <View
      style={{
        flex: 1,
        borderTopLeftRadius: SHEET_RADIUS,
        borderTopRightRadius: SHEET_RADIUS,
        backgroundColor: vl.canvas,
        paddingHorizontal: SHEET_PAD,
        paddingTop: SHEET_PAD,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
{/* STEP 1.11 fourth
        <Row i={0} onPress={onPress} />
*/}
{/* STEP 1.12 fifth
        <Row i={1} onPress={onPress} />
*/}
{/* STEP 1.13 sixth
        <Row i={2} onPress={onPress} />
*/}

        <Pressable accessibilityRole="button" accessibilityLabel={copy.seeAll}>
          <T
            variant="rowMeta"
            color={vl.gold}
            style={{ textAlign: 'center', paddingVertical: 10, height: type.rowMeta.line + 20 }}
          >
            {copy.seeAll}
          </T>
        </Pressable>
      </ScrollView>

{/* STEP 1.14 and where you stand
      <MyRank />
*/}
    </View>
  );
}

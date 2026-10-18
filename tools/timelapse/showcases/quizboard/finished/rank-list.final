import { Image, Pressable, View } from 'react-native';

import { ranking } from '../data/board';
import { RANK_WELL, ROW_AVATAR, ROW_HEIGHT, SCORE_DISC, SHEET_PAD } from '../layout';
import { qz, radius } from '../theme';
import { FACES } from './faces';
import { T } from './text';

type Entry = (typeof ranking)[number];

/**
 * Everyone below the podium, on a sheet that runs off the bottom of the page.
 *
 * The sheet is only rounded at the top: it is the head of a list that
 * continues past the screen edge, and rounding its foot would tell the eye the
 * list had ended.
 */
export function RankList({ onSelect }: { onSelect?: (e: Entry) => void }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: qz.sheet,
        borderTopLeftRadius: radius.sheet,
        borderTopRightRadius: radius.sheet,
        paddingHorizontal: SHEET_PAD,
      }}
    >
      {ranking.map((e, i) => (
        <RankRow key={e.key} entry={e} first={i === 0} onPress={() => onSelect?.(e)} />
      ))}
    </View>
  );
}

function RankRow({
  entry,
  first,
  onPress,
}: {
  entry: Entry;
  first: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={entry.name}>
      <View
        style={{
          height: ROW_HEIGHT,
          flexDirection: 'row',
          alignItems: 'center',
          borderTopWidth: first ? 0 : 1,
          borderTopColor: qz.rule,
        }}
      >
        <View
          style={{
            width: RANK_WELL,
            height: RANK_WELL,
            borderRadius: radius.full,
            backgroundColor: qz.rankWell,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <T variant="rank" color={qz.ink}>
            {String(entry.rank)}
          </T>
        </View>

        <Image
          source={FACES[entry.face]}
          style={{
            width: ROW_AVATAR,
            height: ROW_AVATAR,
            borderRadius: radius.full,
            marginLeft: 12,
          }}
          resizeMode="cover"
          accessibilityIgnoresInvertColors
        />

        <View style={{ flex: 1, marginLeft: 12 }}>
          <T variant="name" color={qz.ink}>
            {entry.name}
          </T>
          <T variant="points" color={qz.muted}>
            {entry.points}
          </T>
        </View>

        <View
          style={{
            width: SCORE_DISC,
            height: SCORE_DISC,
            borderRadius: radius.full,
            backgroundColor: entry.color,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <T variant="score" color="#ffffff">
            {entry.score}
          </T>
        </View>
      </View>
    </Pressable>
  );
}

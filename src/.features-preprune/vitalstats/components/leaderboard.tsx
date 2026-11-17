import { Image, Pressable, View } from 'react-native';

import { leaderStats, pts, ranked, screen, tabs } from '../data/stats';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

import { BoardProps } from './_stats-parts-shared';

/**
 * The leaderboard.
 *
 * **The rank is derived from the score** (R9) — the board ranks 1,500 points
 * above 2,458, which is not a leaderboard. `ranked()` sorts, so the order and
 * the numbers cannot disagree.
 *
 * The leader's stat strip sits *inside* the leader's own card rather than
 * floating between two rows, so nothing straddles an edge (R3).
 *
 * Each avatar is a **photograph** (I4): initials on a coloured disc is a
 * fallback state, not a substitute.
 */
export function Leaderboard({ margin, height, rowH, stripH, radius, avatar }: BoardProps) {
  const rows = ranked();

  return (
    <View style={{ marginHorizontal: margin, height, gap: 10 }}>
      {rows.map((a, i) => {
        const leader = i === 0;
        return (
          <Pressable
            key={a.id}
            accessibilityRole="button"
            accessibilityLabel={`${i + 1}. ${a.name}, ${pts(a.score)}`}
          >
            {({ pressed }) => (
              <View
                style={{
                  borderRadius: radius,
                  backgroundColor: ct.white,
                  paddingHorizontal: 14,
                  opacity: pressed ? 0.85 : 1,
                }}
              >
                <View
                  style={{
                    height: rowH,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <T variant="rank">{i + 1}</T>
                  <View
                    style={{
                      width: avatar,
                      height: avatar,
                      borderRadius: avatar / 2,
                      overflow: 'hidden',
                      backgroundColor: ct.tile,
                      borderWidth: leader ? 2 : 0,
                      borderColor: ct.accent,
                    }}
                  >
                    <Image
                      source={a.avatar}
                      style={{ width: avatar, height: avatar }}
                      resizeMode="cover"
                    />
                  </View>

                  <View style={{ flex: 1 }}>
                    <T variant="athlete" numberOfLines={1}>
                      {a.name}
                    </T>
                    <T variant="score">{`Score: ${pts(a.score)}`}</T>
                  </View>

                  <Glyph name="chevronRight" size={16} color={ct.sub} />
                </View>

                {leader ? (
                  <View
                    style={{
                      height: stripH,
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderTopWidth: 1,
                      borderTopColor: ct.hairline,
                    }}
                  >
                    {leaderStats().map((st, j) => (
                      <View
                        key={st.id}
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          gap: 2,
                          borderLeftWidth: j === 0 ? 0 : 1,
                          borderLeftColor: ct.hairline,
                        }}
                      >
                        <T variant="stripValue">{st.value}</T>
                        <T variant="stripLabel">{st.label}</T>
                      </View>
                    ))}
                  </View>
                ) : null}
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

import { Image, Pressable, ScrollView, View } from 'react-native';

import { brand, stories } from '../data/feed';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

import { RailProps } from './_feed-parts-shared';

/**
 * The stories.
 *
 * **A horizontal `ScrollView`, not a wrap.** The board shows its last avatar
 * cut by the screen edge, and a wrap layout physically cannot reproduce that
 * (R2). The rail is pinned to its own height so it cannot absorb the screen's
 * slack.
 *
 * Every face is a **photograph** (I4): initials on a coloured disc is a
 * fallback state, not a substitute. The add badge sits **wholly inside** the
 * first avatar's ring, so it cannot straddle an edge (R3).
 */
export function StoryRail({ margin, height, avatar }: RailProps) {
  const ring = avatar + 7;

  return (
    <View style={{ height }}>
      {/* STEP 1.05 label
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: margin, gap: 14 }}
      >
        {stories.map((s) => (
          <Pressable key={s.id} accessibilityRole="button" accessibilityLabel={s.label}>
            {({ pressed }) => (
              <View style={{ alignItems: 'center', gap: 6, opacity: pressed ? 0.78 : 1 }}>
                <View
                  style={{
                    width: ring,
                    height: ring,
                    borderRadius: ring / 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: s.seen ? 1 : 2,
                    borderColor: s.seen ? ct.hairline : ct.ring,
                  }}
                >
                  <Image
                    source={s.photo}
                    style={{
                      width: avatar,
                      height: avatar,
                      borderRadius: avatar / 2,
                      backgroundColor: ct.tile,
                    }}
                  />
                  {s.create ? (
                    <View
                      style={{
                        position: 'absolute',
                        right: 2,
                        bottom: 2,
                        width: 17,
                        height: 17,
                        borderRadius: 8.5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: ct.brand,
                        borderWidth: 2,
                        borderColor: ct.white,
                      }}
                    >
                      <Glyph name="plus" size={9} color={ct.brandInk} />
                    </View>
                  ) : null}
                </View>
                <T variant="storyLabel">{s.label}</T>
              </View>
            )}
          </Pressable>
        ))}
      </ScrollView>
      */}
    </View>
  );
}

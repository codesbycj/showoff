import { Image, Pressable, ScrollView, View } from 'react-native';

import { explore, features, genres, moods, search, tabs } from '../data/explore';
import { T } from './text';

import { GridProps } from './_explore-parts-shared';

/**
 * The genre tiles.
 *
 * Laid out as explicit rows rather than a wrap, so a reveal can stage one tile
 * at a time without the rest reflowing underneath it.
 *
 * Each tile's artwork sits **wholly inside** its own tile, so nothing straddles
 * an edge (R3) — the board's own thumbnails hang off the right of theirs.
 */
export function GenreGrid({ margin, height, gutter, rowH, radius, art }: GridProps) {
  const rows = [genres.slice(0, 2), genres.slice(2, 4), genres.slice(4)];

  return (
    <View style={{ marginHorizontal: margin, height, gap: gutter }}>
      {rows.map((row) => (
        <View key={row[0]?.id ?? 'empty'} style={{ flexDirection: 'row', gap: gutter }}>
          {row.map((g) => (
            <Pressable key={g.id} accessibilityRole="button" accessibilityLabel={g.label} style={{ flex: 1 }}>
              {({ pressed }) => (
                <View
                  style={{
                    height: rowH,
                    borderRadius: radius,
                    backgroundColor: g.tint,
                    paddingHorizontal: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                    opacity: pressed ? 0.85 : 1,
                  }}
                >
                  <T variant="genre" style={{ flex: 1 }} numberOfLines={1}>
                    {g.label}
                  </T>
                  <Image
                    source={g.art}
                    style={{ width: art, height: art, borderRadius: 8 }}
                    resizeMode="cover"
                  />
                </View>
              )}
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
}

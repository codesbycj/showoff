import { Image, Pressable, ScrollView, View } from 'react-native';

import {
  categories,
  collection,
  collectionLine,
  greeting,
  playlist,
  popular,
  songs,
  tabs,
  tracks,
} from '../data/home';
import { T } from './text';

import { RailProps } from './_home-parts-shared';

/**
 * The popular songs.
 *
 * **A horizontal `ScrollView`, not a wrap** (R2) — the board shows its third
 * sleeve cut by the screen edge. Every sleeve is a **photograph** standing in
 * for a fictional release; the board's own are real album covers.
 */
export function SongRail({ margin, height, art, onSelect }: RailProps) {
  return (
    <View style={{ height }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: margin, gap: 12 }}
      >
        {songs.map((song) => (
          <Pressable
            key={song.id}
            onPress={onSelect}
            accessibilityRole="button"
            accessibilityLabel={`${song.title} by ${song.artist}`}
          >
            {({ pressed }) => (
              <View style={{ width: art, opacity: pressed ? 0.85 : 1 }}>
                <Image
                  source={song.cover}
                  style={{ width: art, height: art, borderRadius: 12 }}
                  resizeMode="cover"
                />
                <View style={{ marginTop: 8 }}>
                  <T variant="songTitle" numberOfLines={1}>
                    {song.title}
                  </T>
                  <T variant="songArtist" numberOfLines={1}>
                    {song.artist}
                  </T>
                </View>
              </View>
            )}
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

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
import { ct } from '../theme';
import { Glyph, type GlyphName } from './glyph';
import { T } from './text';

import { CardProps } from './_home-parts-shared';

/**
 * The collection card.
 *
 * **The fill is on an absolutely-filled child**, carrying the clip with it, so
 * a reveal that stages the copy and the photograph does not open on a solid
 * white slab (§5.5 / I9). The clip lives on that child and `elevation` does
 * not: Android is unreliable with `overflow: 'hidden'` and `elevation` on the
 * same View (Part 7).
 *
 * The song count comes from `data/home.ts` (R9).
 */
export function CollectionCard({ margin, height, width, radius }: CardProps) {
  return (
    <View style={{ height }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: margin, gap: 12 }}
      >
        <Pressable accessibilityRole="button" accessibilityLabel={collectionLine()}>
          {({ pressed }) => (
            <View style={{ width, height, padding: 16, opacity: pressed ? 0.9 : 1 }}>
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: radius,
                  overflow: 'hidden',
                  backgroundColor: ct.sheet,
                }}
              >
                <Image
                  source={collection.photo}
                  style={{ position: 'absolute', right: 0, top: 0, width: width * 0.46, height }}
                  resizeMode="cover"
                />
              </View>

              {collection.cardTitle.map((line) => (
                <T key={line} variant="cardTitle">
                  {line}
                </T>
              ))}
              <T variant="cardLine">{collectionLine()}</T>

              <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <Glyph name="arrowRight" size={20} color={ct.onSheet} />
              </View>
            </View>
          )}
        </Pressable>
      </ScrollView>
    </View>
  );
}

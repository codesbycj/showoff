import { Image, View } from 'react-native';

import { brand, nextPost, post } from '../data/feed';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

import { NextProps } from './_feed-parts-shared';

/**
 * The next post, beginning.
 *
 * **Mine in its detail, the board's in its shape.** The board shows the next
 * card's header peeking above its tab bar, which is what tells you the feed
 * continues — R6 allows exactly that. Reproducing it keeps the screen from
 * ending on a hard edge.
 */
export function NextPost({ margin, height, avatar }: NextProps) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderTopWidth: 1,
        borderTopColor: ct.hairline,
      }}
    >
      {/* STEP 1.29 image
      <Image
        source={nextPost.avatar}
        style={{ width: avatar, height: avatar, borderRadius: avatar / 2 }}
      />
      */}
      {/* STEP 1.30 author
      <View style={{ flex: 1 }}>
        <T variant="author">{nextPost.author}</T>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <T variant="when">{nextPost.when}</T>
          <Glyph name="globe" size={11} color={ct.sub} strokeWidth={1.5} />
        </View>
      </View>
      */}
      {/* STEP 1.31 glyph
      <View
        style={{
          width: 32,
          height: 32,
          borderRadius: 16,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: ct.brand,
        }}
      >
        <Glyph name="share" size={15} color={ct.brandInk} strokeWidth={1.7} />
      </View>
      */}
    </View>
  );
}

import { Image, Pressable, View } from 'react-native';

import { post } from '../data/feed';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

import { AuthorProps } from './_feed-parts-shared';

/** Who posted it, when, and the overflow. */
export function PostAuthor({ margin, height, avatar }: AuthorProps) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
      }}
    >
      {/* STEP 1.13 image
      <Image
        source={post.avatar}
        style={{ width: avatar, height: avatar, borderRadius: avatar / 2 }}
      />
      */}
      {/* STEP 1.14 author
      <View style={{ flex: 1 }}>
        <T variant="author">{post.author}</T>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <T variant="when">{post.when}</T>
          <Glyph name="globe" size={11} color={ct.sub} strokeWidth={1.5} />
        </View>
      </View>
      */}
      {/* STEP 1.15 "More options"
      <Pressable hitSlop={10} accessibilityRole="button" accessibilityLabel="More options">
        {({ pressed }) => (
          <View style={{ padding: 4, opacity: pressed ? 0.6 : 1 }}>
            <Glyph name="more" size={17} color={ct.sub} />
          </View>
        )}
      </Pressable>
      */}
    </View>
  );
}

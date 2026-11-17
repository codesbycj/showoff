import { Image, Pressable, ScrollView, View } from 'react-native';

import { brand, count, likedLine, nextPost, post, savedLine, stories, tabs } from '../data/feed';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

import { ActionProps } from './_feed-parts-shared';

/** Comment, share, save. Each is 44dp by hit slop (R7). */
export function PostActions({ margin, height }: ActionProps) {
  const items: { id: string; glyph: 'comment' | 'share'; value: number }[] = [
    { id: 'comment', glyph: 'comment', value: post.comments },
    { id: 'share', glyph: 'share', value: post.shares },
  ];

  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 22,
        borderTopWidth: 1,
        borderTopColor: ct.hairline,
      }}
    >
      {items.map((it) => (
        <Pressable
          key={it.id}
          hitSlop={{ top: 12, bottom: 12, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel={`${it.id}, ${count(it.value)}`}
        >
          {({ pressed }) => (
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 6, opacity: pressed ? 0.6 : 1 }}
            >
              <Glyph name={it.glyph} size={17} color={ct.sub} strokeWidth={1.7} />
              <T variant="action">{count(it.value)}</T>
            </View>
          )}
        </Pressable>
      ))}

      <View style={{ flex: 1 }} />

      <Pressable
        hitSlop={{ top: 12, bottom: 12, left: 10, right: 10 }}
        accessibilityRole="button"
        accessibilityLabel="Save this post"
      >
        {({ pressed }) => (
          <View style={{ opacity: pressed ? 0.6 : 1 }}>
            <Glyph name="bookmark" size={17} color={ct.sub} strokeWidth={1.7} />
          </View>
        )}
      </Pressable>
    </View>
  );
}

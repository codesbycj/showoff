import { Image } from 'expo-image';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { ct, radius, type } from '../theme';
import { T } from './text';
import { Glyph } from './glyph';

type Post = {
  id: string;
  name: string;
  avatar: number;
  photo: number;
  likes: string;
  comments: string;
  caption: string;
  tags: string;
  reactors: number[];
};

/**
 * One post: the photograph with the poster's name over it, the reaction
 * cluster, and the caption under it.
 *
 * **Every control here is a sibling, never a child of another control.** A
 * `Pressable` with `accessibilityRole="button"` inside another renders as a
 * nested `<button>`, which the web build's parser is not allowed to keep: it
 * tears the inner one out and re-parents everything after it.
 *
 * The reaction cluster overlaps the photograph's corner on purpose, which is
 * layering rather than collision — it sits wholly inside the frame.
 */
export function PostCard({ post, photoH }: { post: Post; photoH: number }) {
  const [liked, setLiked] = useState(false);

  return (
    <View>
      <View
        style={{
          height: photoH,
          borderRadius: radius.card,
          overflow: 'hidden',
          backgroundColor: '#15151A',
        }}
      >
        <Image
          source={post.photo}
          style={{ position: 'absolute', width: '100%', height: photoH }}
          contentFit="cover"
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            margin: 12,
            alignSelf: 'flex-start',
            paddingRight: 14,
            paddingVertical: 5,
            paddingLeft: 5,
            borderRadius: 20,
            backgroundColor: 'rgba(12,12,16,0.46)',
          }}
        >
          <View style={{ width: 28, height: 28, borderRadius: 14, overflow: 'hidden' }}>
            <Image source={post.avatar} style={{ width: 28, height: 28 }} contentFit="cover" />
          </View>
          <T variant="poster" color={ct.onPage} style={{ height: type.poster.line, marginLeft: 8 }}>
            {post.name}
          </T>
        </View>

        <View style={{ flex: 1 }} />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 12,
            // Clear of the caption sheet, which is pulled up over the foot of
            // the photograph by the card's own radius. At a flat 12 the sheet
            // painted across the bottom of this pill.
            marginBottom: radius.card + 10,
            alignSelf: 'flex-start',
            height: 38,
            paddingHorizontal: 14,
            borderRadius: 19,
            backgroundColor: 'rgba(12,12,16,0.46)',
          }}
        >
          <Glyph name="heart" size={16} tint={ct.like} filled />
          <T variant="count" color={ct.onPage} style={{ height: type.count.line, marginLeft: 6 }}>
            {post.likes}
          </T>
          <View style={{ width: 12 }} />
          <Glyph name="comment" size={16} tint={ct.onPage} strokeWidth={1.9} />
          <T variant="count" color={ct.onPage} style={{ height: type.count.line, marginLeft: 6 }}>
            {post.comments}
          </T>
        </View>

        {post.reactors.length > 0 ? (
          <View style={{ position: 'absolute', right: 12, bottom: 44, alignItems: 'flex-end' }}>
            {post.reactors.map((r, i) => (
              <View
                key={i}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: i === 0 ? 0 : 6,
                  marginRight: i === 1 ? 26 : 0,
                }}
              >
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    overflow: 'hidden',
                    borderWidth: 2,
                    borderColor: 'rgba(255,255,255,0.9)',
                  }}
                >
                  <Image source={r} style={{ width: 26, height: 26 }} contentFit="cover" />
                </View>
                <View style={{ marginLeft: -6, marginTop: -10 }}>
                  <Glyph name="heart" size={13} tint={ct.like} filled />
                </View>
              </View>
            ))}
          </View>
        ) : null}
      </View>

      {post.caption ? (
        <View
          style={{
            marginTop: -radius.card,
            paddingTop: radius.card + 14,
            paddingHorizontal: 16,
            paddingBottom: 16,
            borderBottomLeftRadius: radius.card,
            borderBottomRightRadius: radius.card,
            backgroundColor: ct.card,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 30, height: 30, borderRadius: 15, overflow: 'hidden' }}>
              <Image source={post.avatar} style={{ width: 30, height: 30 }} contentFit="cover" />
            </View>
            <T
              variant="poster"
              color={ct.cardInk}
              style={{ height: type.poster.line, marginLeft: 9 }}
            >
              {post.name}
            </T>
            <View style={{ flex: 1 }} />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={liked ? 'Liked' : 'Like'}
              onPress={() => setLiked((v) => !v)}
              style={{ width: 44, height: 44, alignItems: 'flex-end', justifyContent: 'center' }}
            >
              <Glyph
                name="heart"
                size={21}
                tint={liked ? ct.like : ct.muted}
                filled={liked}
                strokeWidth={1.9}
              />
            </Pressable>
          </View>

          <T variant="body" color={ct.muted} style={{ marginTop: 6 }}>
            {post.caption}
          </T>
          <T variant="tags" color={ct.cardInk} style={{ marginTop: 6 }}>
            {post.tags}
          </T>
        </View>
      ) : null}
    </View>
  );
}

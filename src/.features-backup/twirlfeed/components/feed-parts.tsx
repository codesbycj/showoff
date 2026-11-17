import { Image, Pressable, ScrollView, View } from 'react-native';

import { brand, count, likedLine, nextPost, post, savedLine, stories, tabs } from '../data/feed';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type BarProps = { margin: number; height: number; control: number };

/** The wordmark and the bell. */
export function FeedBar({ margin, height, control }: BarProps) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <T variant="wordmark">{brand.name}</T>
      <Pressable hitSlop={8} accessibilityRole="button" accessibilityLabel="Notifications">
        {({ pressed }) => (
          <View
            style={{
              width: control,
              height: control,
              borderRadius: control / 2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: ct.tile,
              opacity: pressed ? 0.7 : 1,
            }}
          >
            <Glyph name="bell" size={18} color={ct.ink} />
          </View>
        )}
      </Pressable>
    </View>
  );
}

type RailProps = { margin: number; height: number; avatar: number };

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
    </View>
  );
}

type AuthorProps = { margin: number; height: number; avatar: number };

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
      <Image
        source={post.avatar}
        style={{ width: avatar, height: avatar, borderRadius: avatar / 2 }}
      />
      <View style={{ flex: 1 }}>
        <T variant="author">{post.author}</T>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <T variant="when">{post.when}</T>
          <Glyph name="globe" size={11} color={ct.sub} strokeWidth={1.5} />
        </View>
      </View>
      <Pressable hitSlop={10} accessibilityRole="button" accessibilityLabel="More options">
        {({ pressed }) => (
          <View style={{ padding: 4, opacity: pressed ? 0.6 : 1 }}>
            <Glyph name="more" size={17} color={ct.sub} />
          </View>
        )}
      </Pressable>
    </View>
  );
}

type CopyProps = { margin: number; titleH: number; bodyH: number };

/** The post's words. One run of body copy, 88 characters — R5's ceiling is
 *  110, and the board's own line is illegible and misspelt (I1). */
export function PostCopy({ margin, titleH, bodyH }: CopyProps) {
  return (
    <View style={{ marginHorizontal: margin }}>
      <View style={{ height: titleH, flexDirection: 'row', alignItems: 'baseline', gap: 6 }}>
        <T variant="postTitle">{post.title}</T>
        <T variant="postYear">{post.year}</T>
      </View>
      <View style={{ height: bodyH }}>
        <T variant="postBody">{post.body}</T>
      </View>
    </View>
  );
}

type CollageProps = { margin: number; height: number; gap: number; radius: number };

/**
 * The collage.
 *
 * **Photographs, because food is a picture *of* something** (I4). Laid out as
 * one large frame and two stacked beside it, which is what the board does; the
 * columns are explicit rather than a wrap, so a reveal can stage one frame at
 * a time.
 *
 * Each `Image` carries a numeric height — absolute insets alone make an
 * `Image` paint nothing on native, silently (Part 7).
 */
export function PostCollage({ margin, height, gap, radius }: CollageProps) {
  const small = (height - gap) / 2;

  return (
    <View style={{ marginHorizontal: margin, height, flexDirection: 'row', gap }}>
      <View style={{ flex: 2, borderRadius: radius, overflow: 'hidden', backgroundColor: ct.tile }}>
        <Image source={post.photos[0]} style={{ width: '100%', height }} resizeMode="cover" />
      </View>
      <View style={{ flex: 1, gap }}>
        <View style={{ borderRadius: radius, overflow: 'hidden', backgroundColor: ct.tile }}>
          <Image source={post.photos[1]} style={{ width: '100%', height: small }} resizeMode="cover" />
        </View>
        <View style={{ borderRadius: radius, overflow: 'hidden', backgroundColor: ct.tile }}>
          <Image source={post.photos[2]} style={{ width: '100%', height: small }} resizeMode="cover" />
        </View>
      </View>
    </View>
  );
}

type StatProps = { margin: number; height: number };

/**
 * Who liked it and how many saved it.
 *
 * **"You and N others" is the like count less the viewer** (R9), so the
 * sentence and the number cannot disagree.
 */
export function PostStats({ margin, height }: StatProps) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <T variant="liked">{likedLine()}</T>
      <T variant="saved">{savedLine()}</T>
    </View>
  );
}

type ActionProps = { margin: number; height: number };

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

type NextProps = { margin: number; height: number; avatar: number };

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
      <Image
        source={nextPost.avatar}
        style={{ width: avatar, height: avatar, borderRadius: avatar / 2 }}
      />
      <View style={{ flex: 1 }}>
        <T variant="author">{nextPost.author}</T>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <T variant="when">{nextPost.when}</T>
          <Glyph name="globe" size={11} color={ct.sub} strokeWidth={1.5} />
        </View>
      </View>
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
    </View>
  );
}

type TabProps = {
  height: number;
  bottomInset: number;
  value: string;
  onSelect: (id: string) => void;
};

/**
 * The tab bar.
 *
 * **`bottomInset` is padding inside the bar, not a strip under it.** R1b, the
 * rule that put an empty band under four screens of a deleted batch: when the
 * app is not edge-to-edge the system already reserves its navigation strip, so
 * a bar that *also* sits on top of `insets.bottom` counts it twice.
 *
 * The unread badge sits **wholly inside** its glyph's box, so it cannot
 * straddle an edge (R3).
 */
export function TabBar({ height, bottomInset, value, onSelect }: TabProps) {
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingBottom: bottomInset,
        backgroundColor: ct.white,
        borderTopWidth: 1,
        borderTopColor: ct.hairline,
      }}
    >
      <View style={{ height, flexDirection: 'row', alignItems: 'center' }}>
        {tabs.map((t) => {
          const on = t.id === value;
          return (
            <Pressable
              key={t.id}
              onPress={() => onSelect(t.id)}
              accessibilityRole="button"
              accessibilityState={{ selected: on }}
              accessibilityLabel={t.badge ? `${t.label}, ${t.badge} unread` : t.label}
              style={{ flex: 1 }}
            >
              {({ pressed }) => (
                <View style={{ alignItems: 'center', gap: 4, opacity: pressed ? 0.7 : 1 }}>
                  <View style={{ width: 26, height: 22, alignItems: 'center', justifyContent: 'center' }}>
                    <Glyph name={t.glyph} size={21} color={on ? ct.brand : ct.sub} strokeWidth={1.8} />
                    {t.badge ? (
                      <View
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 3,
                          minWidth: 14,
                          height: 14,
                          borderRadius: 7,
                          paddingHorizontal: 3,
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: ct.badge,
                        }}
                      >
                        <T variant="badge">{t.badge}</T>
                      </View>
                    ) : null}
                  </View>
                  <T variant={on ? 'tabOn' : 'tab'}>{t.label}</T>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

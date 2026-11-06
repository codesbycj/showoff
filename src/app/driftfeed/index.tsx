import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { T } from '@/features/driftfeed/components/text';
import { copy, posts, tabs } from '@/features/driftfeed/data/feed';
import { ct, radius, type } from '@/features/driftfeed/theme';
import { useInsets } from '@/features/driftfeed/use-insets';

const MARGIN = 16;
const DOCK_H = 58;

function Glyph({
  name,
  size = 20,
  tint = ct.onPage,
  filled = false,
}: {
  name: 'bell' | 'heart' | 'comment' | 'pin' | 'wave' | 'plus' | 'bookmark' | 'person' | 'kebab';
  size?: number;
  tint?: string;
  filled?: boolean;
}) {
  const s = {
    stroke: tint,
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'bell' && (
        <>
          <Path {...s} d="M18 9.2a6 6 0 1 0-12 0c0 5-1.4 6.4-1.4 6.4h14.8S18 14.2 18 9.2Z" />
          <Path {...s} d="M13.7 19a2 2 0 0 1-3.4 0" />
        </>
      )}
      {name === 'heart' && (
        <Path
          fill={filled ? tint : 'none'}
          stroke={tint}
          strokeWidth={filled ? 0 : 1.8}
          d="M12 20.4s-7.8-4.6-7.8-10a4.5 4.5 0 0 1 7.8-3.1 4.5 4.5 0 0 1 7.8 3.1c0 5.4-7.8 10-7.8 10Z"
        />
      )}
      {name === 'comment' && (
        <Path
          {...s}
          d="M20.2 11.4c0 3.9-3.7 7-8.2 7a9.5 9.5 0 0 1-2.5-.3L4.8 20l1.4-3.5a6.8 6.8 0 0 1-2.4-5.1c0-3.9 3.7-7 8.2-7s8.2 3.1 8.2 7Z"
        />
      )}
      {name === 'pin' && (
        <>
          <Path {...s} d="M12 20.8s5.8-5 5.8-9.4a5.8 5.8 0 1 0-11.6 0c0 4.4 5.8 9.4 5.8 9.4Z" />
          <Circle {...s} cx="12" cy="11.2" r="2.1" />
        </>
      )}
      {name === 'wave' && (
        <>
          <Path {...s} d="M2.6 15.4c2-2.4 4-2.4 6 0s4 2.4 6 0 4-2.4 6.8 0" />
          <Path {...s} d="M2.6 10c2-2.4 4-2.4 6 0s4 2.4 6 0 4-2.4 6.8 0" opacity={0.6} />
        </>
      )}
      {name === 'plus' && <Path {...s} strokeWidth={2.2} d="M12 5.6v12.8M5.6 12h12.8" />}
      {name === 'bookmark' && (
        <Path {...s} fill={filled ? tint : 'none'} d="M6.4 4.6h11.2v15.2L12 15.8l-5.6 4Z" />
      )}
      {name === 'person' && (
        <>
          <Circle {...s} cx="12" cy="8.4" r="3.4" />
          <Path {...s} d="M5.8 19.8a6.4 6.4 0 0 1 12.4 0" />
        </>
      )}
      {name === 'kebab' && (
        <>
          <Circle cx="5.6" cy="12" r="1.7" fill={tint} />
          <Circle cx="12" cy="12" r="1.7" fill={tint} />
          <Circle cx="18.4" cy="12" r="1.7" fill={tint} />
        </>
      )}
    </Svg>
  );
}

function Post({ post, photoH }: { post: (typeof posts)[number]; photoH: number }) {
  const [liked, setLiked] = useState(false);

  return (
    <View
      style={{
        marginTop: 12,
        marginHorizontal: MARGIN,
        borderRadius: radius.card,
        backgroundColor: ct.card,
        padding: 12,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            width: 38,
            height: 38,
            borderRadius: 19,
            overflow: 'hidden',
            backgroundColor: ct.tile,
          }}
        >
          <Image source={post.avatar} style={{ width: 38, height: 38 }} contentFit="cover" />
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <T variant="name" color={ct.onPage} style={{ height: type.name.line }}>
            {post.name}
          </T>
          <T variant="when" color={ct.faint} style={{ height: type.when.line }}>
            {post.when}
          </T>
        </View>
        <Pressable accessibilityRole="button" accessibilityLabel={`Options for ${post.name}`}>
          <View style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}>
            <Glyph name="kebab" size={18} tint={ct.faint} />
          </View>
        </Pressable>
      </View>

      <T variant="body" color={ct.dim} style={{ marginTop: 8 }}>
        {post.caption}
      </T>

      <View
        style={{
          height: photoH,
          borderRadius: radius.photo,
          overflow: 'hidden',
          marginTop: 10,
          backgroundColor: ct.tile,
        }}
      >
        <Image
          source={post.photo}
          style={{ position: 'absolute', width: '100%', height: photoH }}
          contentFit="cover"
        />
        <View
          style={{
            alignSelf: 'flex-start',
            flexDirection: 'row',
            alignItems: 'center',
            margin: 10,
            height: 30,
            paddingHorizontal: 10,
            borderRadius: 15,
            backgroundColor: 'rgba(10,10,12,0.56)',
          }}
        >
          <Glyph name="pin" size={13} tint={ct.accent} />
          <T variant="chip" color={ct.onPage} style={{ height: type.chip.line, marginLeft: 5 }}>
            {post.place}
          </T>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={liked ? 'Liked' : 'Like'}
          onPress={() => setLiked((v) => !v)}
          style={{ flexDirection: 'row', alignItems: 'center', height: 44, paddingRight: 14 }}
        >
          <Glyph name="heart" size={19} tint={liked ? ct.like : ct.dim} filled={liked} />
          <T variant="count" color={ct.dim} style={{ height: type.count.line, marginLeft: 6 }}>
            {post.likes}
          </T>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Comments"
          style={{ flexDirection: 'row', alignItems: 'center', height: 44, paddingRight: 14 }}
        >
          <Glyph name="comment" size={19} tint={ct.dim} />
          <T variant="count" color={ct.dim} style={{ height: type.count.line, marginLeft: 6 }}>
            {post.comments}
          </T>
        </Pressable>

        <View style={{ flex: 1 }} />

        <Pressable accessibilityRole="button" accessibilityLabel="Save">
          <View style={{ width: 44, height: 44, alignItems: 'flex-end', justifyContent: 'center' }}>
            <Glyph name="bookmark" size={19} tint={ct.dim} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

/**
 * Drift — the feed.
 *
 * Assembly only: the brand, and the posts.
 *
 * The page scrolls under a pinned dock, so the bottom of the first frame is
 * the second post beginning rather than a band of black.
 */
export default function DriftfeedScreen() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="light" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 14 }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: insets.top + 6,
            paddingHorizontal: MARGIN + 4,
          }}
        >
          {/* STEP 1.01 brand
          <T variant="brand" color={ct.onPage} style={{ flex: 1, height: type.brand.line }}>
            {copy.brand}
          </T>
          */}
          {/* STEP 1.02 "Notifications"
          <Pressable accessibilityRole="button" accessibilityLabel="Notifications">
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: ct.tile,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Glyph name="bell" size={20} />
            </View>
          </Pressable>
          */}
        </View>

        {/* STEP 1.03 post
        {posts.map((p, i) => (
          <Post key={p.id} post={p} photoH={i === 0 ? 300 : 260} />
        ))}
        */}
      </ScrollView>

      {/* STEP 1.04 glyph
      <View
        style={{
          height: DOCK_H + insets.bottom,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: ct.card,
          borderTopWidth: 1,
          borderTopColor: ct.hairline,
        }}
      >
        {tabs.map((tab, i) => {
          const on = i === 0;
          return (
            <Pressable
              key={tab.id}
              accessibilityRole="button"
              accessibilityLabel={tab.label}
              accessibilityState={{ selected: on }}
              style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}
            >
              <Glyph name={tab.icon} size={22} tint={on ? ct.accent : ct.faint} filled={on} />
            </Pressable>
          );
        })}
      </View>
      */}
      {/* STEP 1.05 a stray gap under it | FIX 1.06 take the gap back out
      <View style={{ height: 23 }} />
      */}
    </View>
  );
}

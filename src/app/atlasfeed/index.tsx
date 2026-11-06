import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { useId } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

// STEP 1.01 import glyph
// import { Glyph } from '@/features/atlasfeed/components/glyph';
// STEP 1.02 import post card
// import { PostCard } from '@/features/atlasfeed/components/post-card';
import { T } from '@/features/atlasfeed/components/text';
import { copy, posts, stories, tabs } from '@/features/atlasfeed/data/feed';
import { ct, radius, type, wordmarkStops } from '@/features/atlasfeed/theme';
import { useInsets } from '@/features/atlasfeed/use-insets';

const MARGIN = 18;
const STORY_W = 76;
const STORY_H = 94;
const DOCK_H = 58;

/**
 * The wordmark, painted with a gradient.
 *
 * React Native cannot fill text with a gradient, so the gradient is a rect
 * masked by the word — drawn here as a coloured Text with the gradient
 * behind it and `mixBlendMode` nowhere in sight, because that is not
 * reliable on Android either. Three solid spans instead: one per stop, which
 * reads as the same ramp at this size and renders identically everywhere.
 */
function Wordmark() {
  const parts = ['Atl', 'ant', 'is'];
  return (
    <View style={{ flexDirection: 'row' }}>
      {parts.map((p, i) => (
        <T
          key={p}
          variant="wordmark"
          color={wordmarkStops[i]}
          style={{ height: type.wordmark.line }}
        >
          {p}
        </T>
      ))}
    </View>
  );
}

/**
 * Atlas — the feed.
 *
 * Assembly only: the brand, who has posted stories, and the posts.
 *
 * The page scrolls under a floating dock, so the bottom of the first frame
 * is a post passing under the bar rather than a band of black.
 */
export default function AtlasfeedScreen() {
  const insets = useInsets();
  const ringId = `atlasRing-${useId()}`;

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="light" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + DOCK_H + 24 }}
      >
        {/* STEP 1.03 "Notifications"
        <View
          style={{
            paddingTop: insets.top + 6,
            paddingHorizontal: MARGIN,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View style={{ flex: 1 }}>
            <Wordmark />
          </View>
          <Pressable accessibilityRole="button" accessibilityLabel="Notifications">
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: ct.dock,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Glyph name="bell" size={20} tint={ct.onPage} strokeWidth={1.7} />
            </View>
          </Pressable>
        </View>
        */}

        {/* STEP 1.04 atlases strong
        <View style={{ flexDirection: 'row', paddingHorizontal: MARGIN, marginTop: 6 }}>
          <T variant="atlases" color={ct.dim} style={{ height: type.atlases.line }}>
            {`${copy.yourAtlases} `}
          </T>
          <T variant="atlasesStrong" color={ct.onPage} style={{ height: type.atlases.line }}>
            {copy.atlasesStrong}
          </T>
        </View>
        */}

        {/* STEP 1.05 add atlas
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ height: STORY_H + 26, flexGrow: 0, marginTop: 10 }}
          contentContainerStyle={{ paddingHorizontal: MARGIN, alignItems: 'flex-start' }}
        >
          <Pressable accessibilityRole="button" accessibilityLabel={copy.addAtlas}>
            <View style={{ alignItems: 'center', marginRight: 12 }}>
              <View
                style={{
                  width: STORY_W,
                  height: STORY_H,
                  borderRadius: radius.story,
                  backgroundColor: ct.dock,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Glyph name="plus" size={22} tint={ct.dim} />
              </View>
              <T variant="story" color={ct.dim} style={{ height: type.story.line, marginTop: 6 }}>
                {copy.addAtlas}
              </T>
            </View>
          </Pressable>

          {stories.map((s) => (
            <Pressable key={s.id} accessibilityRole="button" accessibilityLabel={s.name}>
              <View style={{ alignItems: 'center', marginRight: 12 }}>
                <View
                  style={{
                    width: STORY_W,
                    height: STORY_H,
                    borderRadius: radius.story,
                    padding: 2.5,
                    overflow: 'hidden',
                  }}
                >
                  <Svg
                    width={STORY_W}
                    height={STORY_H}
                    style={{ position: 'absolute', left: 0, top: 0 }}
                  >
                    <Defs>
                      <LinearGradient id={`${ringId}-${s.id}`} x1="0" y1="0" x2="1" y2="1">
                        <Stop offset="0" stopColor="#F0803C" />
                        <Stop offset="0.5" stopColor={ct.ring} />
                        <Stop offset="1" stopColor="#5B3BE8" />
                      </LinearGradient>
                    </Defs>
                    <Rect
                      x="0"
                      y="0"
                      width={STORY_W}
                      height={STORY_H}
                      rx={radius.story}
                      fill={`url(#${ringId}-${s.id})`}
                    />
                  </Svg>
                  <View
                    style={{
                      flex: 1,
                      borderRadius: radius.story - 3,
                      overflow: 'hidden',
                      zIndex: 1,
                    }}
                  >
                    <Image
                      source={s.photo}
                      style={{ width: STORY_W - 5, height: STORY_H - 5 }}
                      contentFit="cover"
                    />
                  </View>
                </View>
                <T
                  variant="story"
                  color={ct.onPage}
                  numberOfLines={1}
                  style={{ height: type.story.line, marginTop: 6, maxWidth: STORY_W }}
                >
                  {s.name}
                </T>
              </View>
            </Pressable>
          ))}
        </ScrollView>
        */}

        {/* STEP 1.06 post card
        {posts.map((p, i) => (
          <View key={p.id} style={{ paddingHorizontal: MARGIN, marginTop: i === 0 ? 14 : 16 }}>
            <PostCard post={p} photoH={i === 0 ? 340 : 300} />
          </View>
        ))}
        */}
      </ScrollView>

      {/* STEP 1.07 glyph
      <View
        style={{
          position: 'absolute',
          left: MARGIN,
          right: MARGIN,
          bottom: Math.max(10, insets.bottom - 20),
          height: DOCK_H,
          borderRadius: 30,
          backgroundColor: ct.dock,
          flexDirection: 'row',
          alignItems: 'center',
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
              style={{ flex: 1, height: DOCK_H, alignItems: 'center', justifyContent: 'center' }}
            >
              <View
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 23,
                  backgroundColor: on ? ct.onPage : 'transparent',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Glyph
                  name={tab.icon}
                  size={21}
                  tint={on ? ct.page : ct.dim}
                  filled={on}
                  strokeWidth={1.8}
                />
              </View>
            </Pressable>
          );
        })}
      </View>
      */}
      {/* STEP 1.08 a stray gap under it | FIX 1.09 take the gap back out
      <View style={{ height: 23 }} />
      */}
    </View>
  );
}

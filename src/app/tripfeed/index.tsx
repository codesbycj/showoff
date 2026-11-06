import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

// STEP 1.01 import text
// import { T } from '@/features/tripfeed/components/text';
import { copy, me, posts, stories, tabs } from '@/features/tripfeed/data/feed';
import { ct, radius, type } from '@/features/tripfeed/theme';
import { useInsets } from '@/features/tripfeed/use-insets';

const MARGIN = 14;
const STORY_W = 92;
const STORY_H = 124;
const DOCK_H = 58;

function Glyph({
  name,
  size = 20,
  tint = ct.ink,
}: {
  name: 'bell' | 'plus' | 'kebab' | 'thumb' | 'comment' | 'plane' | 'compass' | 'map' | 'chat';
  size?: number;
  tint?: string;
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
      {name === 'plus' && <Path {...s} strokeWidth={2.2} d="M12 5.6v12.8M5.6 12h12.8" />}
      {name === 'kebab' && (
        <>
          <Circle cx="5.6" cy="12" r="1.7" fill={tint} />
          <Circle cx="12" cy="12" r="1.7" fill={tint} />
          <Circle cx="18.4" cy="12" r="1.7" fill={tint} />
        </>
      )}
      {name === 'thumb' && (
        <Path
          fill={tint}
          d="M9 21.2H6.4A2.4 2.4 0 0 1 4 18.8v-6a2.4 2.4 0 0 1 2.4-2.4H9Zm1.6 0V10.4l3-7.2a1.4 1.4 0 0 1 2.6.6v4.6h3.2a2 2 0 0 1 2 2.4l-1.4 8a2 2 0 0 1-2 1.6Z"
        />
      )}
      {name === 'comment' && (
        <Path
          {...s}
          d="M20.2 11.4c0 3.9-3.7 7-8.2 7a9.5 9.5 0 0 1-2.5-.3L4.8 20l1.4-3.5a6.8 6.8 0 0 1-2.4-5.1c0-3.9 3.7-7 8.2-7s8.2 3.1 8.2 7Z"
        />
      )}
      {name === 'plane' && (
        <Path
          fill={tint}
          d="M20.6 11.1 14.4 9.4l-3.3-5.8a1 1 0 0 0-1.8.1L7.9 8.1 4.6 7.2a.8.8 0 0 0-.9 1.2l2.1 3.5-2.1 3.5a.8.8 0 0 0 .9 1.2l3.3-.9 1.4 4.4a1 1 0 0 0 1.8.1l3.3-5.8 6.2-1.7a1 1 0 0 0 0-1.6Z"
        />
      )}
      {name === 'compass' && (
        <>
          <Circle {...s} cx="12" cy="12" r="8.4" />
          <Path {...s} d="m15.2 8.8-1.8 4.6-4.6 1.8 1.8-4.6Z" />
        </>
      )}
      {name === 'map' && (
        <>
          <Path {...s} d="M9 4.4 3.8 6.6v13l5.2-2.2 6 2.2 5.2-2.2v-13L15 6.6Z" />
          <Path {...s} d="M9 4.4v13.2M15 6.6v13" />
        </>
      )}
      {name === 'chat' && (
        <>
          <Circle {...s} cx="12" cy="12" r="8.4" />
          <Path {...s} d="M8.4 10.4h7.2M8.4 13.6h4.6" />
        </>
      )}
    </Svg>
  );
}

/**
 * Trip — the feed.
 *
 * Assembly only: who you are, the stories, and the posts.
 *
 * The page scrolls under a pinned dock, so the bottom of the first frame is
 * a post passing under the bar rather than a band of page. Each post's photo
 * strip is a horizontal rail whose last frame is clipped by the screen edge
 * — which is what tells you it scrolls.
 */
export default function TripfeedScreen() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 14 }}
      >
        {/* STEP 1.02 "Your profile"
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: insets.top + 6,
            paddingHorizontal: MARGIN + 4,
          }}
        >
          <Pressable accessibilityRole="button" accessibilityLabel="Your profile">
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                overflow: 'hidden',
                backgroundColor: ct.hairline,
              }}
            >
              <Image source={me} style={{ width: 44, height: 44 }} contentFit="cover" />
            </View>
          </Pressable>
          <View style={{ flex: 1 }} />
          <Pressable accessibilityRole="button" accessibilityLabel="Notifications">
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: ct.card,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Glyph name="bell" size={20} />
            </View>
          </Pressable>
        </View>
        */}

        {/* STEP 1.03 "Open story"
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ height: STORY_H + 12, flexGrow: 0, marginTop: 10 }}
          contentContainerStyle={{ paddingHorizontal: MARGIN, alignItems: 'center' }}
        >
          <Pressable accessibilityRole="button" accessibilityLabel={copy.addStory}>
            <View
              style={{
                width: STORY_W,
                height: STORY_H,
                borderRadius: radius.story,
                backgroundColor: ct.card,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 8,
              }}
            >
              <View
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 17,
                  backgroundColor: ct.page,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Glyph name="plus" size={18} tint={ct.muted} />
              </View>
              <T variant="story" color={ct.muted} style={{ height: type.story.line, marginTop: 8 }}>
                {copy.addStory}
              </T>
            </View>
          </Pressable>

          {stories.map((st) => (
            <Pressable key={st.id} accessibilityRole="button" accessibilityLabel="Open story">
              <View
                style={{
                  width: STORY_W,
                  height: STORY_H,
                  borderRadius: radius.story,
                  overflow: 'hidden',
                  marginRight: 8,
                  backgroundColor: ct.hairline,
                }}
              >
                <Image
                  source={st.photo}
                  style={{ position: 'absolute', width: STORY_W, height: STORY_H }}
                  contentFit="cover"
                />
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    margin: 7,
                    overflow: 'hidden',
                    borderWidth: 2,
                    borderColor: ct.card,
                  }}
                >
                  <Image source={me} style={{ width: 26, height: 26 }} contentFit="cover" />
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
        */}

        {/* STEP 1.04 name
        {posts.map((post) => (
          <View
            key={post.id}
            style={{
              marginTop: 12,
              marginHorizontal: MARGIN,
              borderRadius: radius.card,
              backgroundColor: ct.card,
              paddingTop: 12,
              paddingBottom: 10,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12 }}>
              <View
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 19,
                  overflow: 'hidden',
                  backgroundColor: ct.hairline,
                }}
              >
                <Image source={post.avatar} style={{ width: 38, height: 38 }} contentFit="cover" />
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <T variant="name" color={ct.ink} style={{ height: type.name.line }}>
                  {post.name}
                </T>
                <View style={{ flexDirection: 'row' }}>
                  <T variant="action" color={ct.muted} style={{ height: type.action.line }}>
                    {`${post.verb}${post.tailLead}`}
                  </T>
                  <T
                    variant="actionLink"
                    color={ct.blue}
                    numberOfLines={1}
                    style={{ height: type.actionLink.line }}
                  >
                    {post.trip}
                  </T>
                </View>
              </View>
              <Pressable accessibilityRole="button" accessibilityLabel={`Options for ${post.name}`}>
                <View
                  style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}
                >
                  <Glyph name="kebab" size={18} tint={ct.faint} />
                </View>
              </Pressable>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ flexGrow: 0, marginTop: 10 }}
              contentContainerStyle={{ paddingHorizontal: 12 }}
            >
              {post.photos.map((p, i) => (
                <View
                  key={i}
                  style={{
                    width: 172,
                    height: 196,
                    borderRadius: radius.photo,
                    overflow: 'hidden',
                    marginRight: 8,
                    backgroundColor: ct.hairline,
                  }}
                >
                  <Image source={p} style={{ width: 172, height: 196 }} contentFit="cover" />
                </View>
              ))}
            </ScrollView>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 14,
                marginTop: 12,
              }}
            >
              <Glyph name="thumb" size={17} tint={ct.like} />
              <T variant="count" color={ct.ink} style={{ height: type.count.line, marginLeft: 5 }}>
                {String(post.likes)}
              </T>
              <View style={{ width: 14 }} />
              <Glyph name="comment" size={17} tint={ct.faint} />
              <T variant="count" color={ct.ink} style={{ height: type.count.line, marginLeft: 5 }}>
                {String(post.comments)}
              </T>
              <View style={{ width: 14 }} />
              <Glyph name="plane" size={16} tint={ct.faint} />
              <T variant="count" color={ct.ink} style={{ height: type.count.line, marginLeft: 5 }}>
                {String(post.trips)}
              </T>
              <View style={{ flex: 1 }} />
              <T variant="when" color={ct.faint} style={{ height: type.when.line }}>
                {post.when}
              </T>
            </View>
          </View>
        ))}
        */}
      </ScrollView>

      {/* STEP 1.05 glyph
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
              <Glyph name={tab.icon} size={22} tint={on ? ct.blue : ct.faint} />
              <View style={{ height: 8, justifyContent: 'center' }}>
                {on ? (
                  <View
                    style={{ width: 5, height: 5, borderRadius: 3, backgroundColor: ct.blue }}
                  />
                ) : null}
              </View>
            </Pressable>
          );
        })}
      </View>
      */}
      {/* STEP 1.06 a stray gap under it | FIX 1.07 take the gap back out
      <View style={{ height: 23 }} />
      */}
    </View>
  );
}

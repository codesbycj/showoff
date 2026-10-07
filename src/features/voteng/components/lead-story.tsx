import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import type { Story } from '../data/news';
import { FONT, R, SP, vt } from '../theme';

/** Tall enough to carry a crowd scene; the rail's thumbnails are 96. */
const BANNER = 180;

/**
 * The story the desk is leading on, at full width.
 *
 * It is the home rail's `NewsCard` scaled up, and deliberately the same object:
 * same 12dp radius, same tag pill pinned into the same corner of the banner,
 * same hairline and shadow. Only three things change — the banner is 180dp
 * instead of 96, the headline steps from 12dp to 18dp, and it gains a
 * standfirst and a byline, which are the two things there is no room for at
 * rail width.
 *
 * The banner keeps the clip and the card keeps the shadow, for the same reason
 * as the rail card: `overflow: 'hidden'` and `elevation` together are
 * unreliable on Android.
 */
export function LeadStory({ story, onPress }: { story: Story; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          backgroundColor: vt.card,
          borderRadius: R.md,
          borderWidth: 1,
          borderColor: vt.line,
          shadowColor: '#000000',
          shadowOpacity: 0.05,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 2 },
          elevation: 2,
        }}
      >
        <View
          style={{
            height: BANNER,
            borderTopLeftRadius: R.md - 1,
            borderTopRightRadius: R.md - 1,
            overflow: 'hidden',
            backgroundColor: vt.line,
          }}
        >
          <Image source={story.image} style={{ flex: 1 }} contentFit="cover" />
          <View
            style={{
              position: 'absolute',
              left: 10,
              bottom: 10,
              backgroundColor: story.tagInk,
              borderRadius: R.sm,
              paddingHorizontal: 8,
              paddingVertical: 3,
            }}
          >
            <Text style={{ fontFamily: FONT.bold, fontSize: 9, lineHeight: 13, color: vt.card }}>
              {story.tag}
            </Text>
          </View>
        </View>

        <View style={{ padding: SP.lg }}>
          <Text
            numberOfLines={2}
            style={{
              fontFamily: FONT.black,
              fontSize: 18,
              lineHeight: 24,
              letterSpacing: -0.45,
              color: vt.ink,
            }}
          >
            {story.title}
          </Text>

          {story.blurb ? (
            <Text
              numberOfLines={2}
              style={{
                marginTop: 6,
                fontFamily: FONT.regular,
                fontSize: 12,
                lineHeight: 18,
                color: vt.body,
              }}
            >
              {story.blurb}
            </Text>
          ) : null}

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: SP.md }}>
            <Text
              style={{ fontFamily: FONT.bold, fontSize: 11, lineHeight: 15, color: vt.primary }}
            >
              {story.source}
            </Text>
            <View style={{ width: 3, height: 3, borderRadius: 1.5, backgroundColor: vt.ghost }} />
            <Text
              style={{ fontFamily: FONT.medium, fontSize: 11, lineHeight: 15, color: vt.faint }}
            >
              {story.when}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
